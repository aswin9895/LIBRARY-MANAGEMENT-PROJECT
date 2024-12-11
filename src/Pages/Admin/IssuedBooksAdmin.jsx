import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import mystyle from '../../Components/Style.module.css'
import Footer from '../../Components/Footer'
import { getIssuedBooksAPI, getSingleIssuedBookAPI, IncrementBookCopiesAPI, removeIssuedBooksAPI } from '../../Services/allAPI'
import { useNavigate } from 'react-router'
import SERVER_URL from '../../Services/SERVER_URL'

const IssuedBooks = () => {
  const [searchKey, setSearchKey] = useState("")
  const [filterValue, setFilterValue] = useState("title")
  const [issuedBooks, setIssuedBooks] = useState([])

  const navigate = useNavigate()
  // console.log(issuedBooks);

 // role validation
 useEffect(() => {
  const logged = JSON.parse(sessionStorage.getItem("users"))
  if (logged.role != "admin") {
      navigate('/*')
  }
}, [])

  // get all isuued book function call 
  useEffect(() => {
    getIssuedBooks()
  }, [filterValue, searchKey])

  // getting all issued books function 
  const getIssuedBooks = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      const field = filterValue
      const value = searchKey
      try {
        const result = await getIssuedBooksAPI(field, value, reqHeader)
        if (result.status == 200) {
          setIssuedBooks(result.data)
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please Login Token is Missing!!!")
    }

  }

  // fine calculation function 
  const fineCalculation = (returnDate) => {
    const fine = 3
    const today = new Date()
    const returnDateObj = new Date(returnDate)
    // console.log(returnDateObj);
    const diffTime = today - returnDateObj;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays * fine : 0;

  }

  // removeissuedbooks
  const handleRemove = async (id) => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const updateBookDetail = await getSingleIssuedBookAPI(id, reqHeader)
        if (updateBookDetail.status == 200) {
          const updateCopy = await IncrementBookCopiesAPI(updateBookDetail.data.bookId, reqHeader)
          if (updateCopy.status == 200) {
            const removeBook = await removeIssuedBooksAPI(id, reqHeader)
            if (removeBook.status == 200) {
              getIssuedBooks()
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Token missing. please Login!!!")
    }
  }

  return (
    <div>
      <Header AdminHeader={true} />
      <div style={{ paddingTop: "170px", backgroundColor: "black", minHeight: "100vh" }}>
        <h1 style={{ backgroundColor: "#3D3D4A", border: "none", borderRadius: "10px" }} className='container d-flex justify-content-center text-light text-center py-1 w-75 fw-bolder'>
          ISSUED BOOKS
        </h1>
        <div style={{ width: "100%" }} className='d-flex justify-content-start container ps-5 align-items-center mt-3'>
          <div className='mx-2'>
            <input onChange={(e) => setSearchKey(e.target.value)} type="text" placeholder={`Search Book By ${filterValue}`} className='container py-2 rounded fw-bold' style={{ borderWidth: "5px" }} />
          </div>
          <div>
            <select onChange={(e) => setFilterValue(e.target.value)} style={{ border: "none", width: "20px" }} className=' bg-light text-dark' name="" id="">
              <option selected hidden disabled className='text-dark' value=""></option>
              <option value="title">Title</option>
              <option value="studentName">StudentName</option>
            </select>
          </div>
        </div>
        <div className='mt-3 container-fluid'>
          {issuedBooks?.length > 0 ?
            <div className={mystyle.tableresponsive}>
              <table className='table bg-light'>
                <thead style={{ fontSize: "18px" }} className='text-dark fw-bolder border shadow'>
                  <tr>
                    <th className='p-3'>Sl.No</th>
                    <th className='p-3'>Title</th>
                    <th className='p-3'>Author</th>
                    <th className='p-3'>Image</th>
                    <th className='p-3'>Student name</th>
                    <th className='p-3'>Branch</th>
                    <th className='p-3'>Issued date</th>
                    <th className='p-3'>Return date</th>
                    <th className='p-3'>Dues</th>
                    <th className='p-3'>...</th>
                  </tr>
                </thead>
                <tbody>
                  {issuedBooks?.map((books, index) => (
                    <tr key={index}>
                      <td className='p-3'>{index + 1}</td>
                      <td className='p-3'>{books?.title}</td>
                      <td className='p-3'>{books?.author}</td>
                      <td className='p-3'>
                        <img
                          width={'100px'}
                          height={'120px'}
                          src={`${SERVER_URL}/uploads/${books?.bookPic}`}
                          alt="no-image"
                        />
                      </td>
                      <td className='p-3'>{books?.studentName}</td>
                      <td className='p-3'>{books?.studentBranch}</td>
                      <td className='p-3'>{books?.issuedDate}</td>
                      <td className='p-3'>{books?.returnDate}</td>
                      <td className='p-3'>{fineCalculation(books?.returnDate)}</td>

                      <td className='p-3'>
                        <button onClick={() => handleRemove(books?._id)} style={{ backgroundColor: "red" }} className='text-light px-2 py-1 rounded fw-bolder'>Clear</button>
                      </td>
                    </tr>
                  ))
                  }
                </tbody>
              </table>
            </div>
            :
            <div className='fs-5 fw-bolder text-danger text-center mt-5 pt-5'>No Issued Books!!!</div>
          }
        </div>

      </div>
      <Footer />
    </div>
  )
}

export default IssuedBooks