import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import mystyle from '../Components/Style.module.css'
import EditBook from '../Components/EditBook'
import Footer from '../Components/Footer'
import { getBookAPI, getSingleBookAPI, requestBookAPI } from '../Services/allAPI'
import SERVER_URL from '../Services/SERVER_URL'
import { useNavigate } from 'react-router'
import { bookRemovedResponseContext, bookUpdateResponseContext } from '../ContextAPI/ResponseAPI'


const AllBooks = ({ insideAdmin }) => {
  const { bookUpdateResponse, setBookUpdateResponse } = useContext(bookUpdateResponseContext)
  const { bookRemovedResponse, setBookRemoveResponse } = useContext(bookRemovedResponseContext)

  const [filterValue, setFilterValue] = useState("title")
  const [searchKey, setSearchKey] = useState("")
  const [allBooks, setAllBooks] = useState([])
  const [requestedBookDetails, setRequestedBookDetails] = useState({
    bookId: "", title: "", author: "", publisher: "", bookPic: "", studentName: "", studentBranch: "", studentId: ""
  })
  // const [proceedRequest, setProceedRequest] = useState(false)

  // console.log(proceedRequest);
  console.log(requestedBookDetails);

  const navigate = useNavigate()

  // get all books call
  useEffect(() => {
    getAllBooks()
  }, [bookRemovedResponse, filterValue, searchKey, bookUpdateResponse])

  // getallbook function
  const getAllBooks = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      const field = filterValue
      const value = searchKey
      // console.log(reqHeader, field, value);

      try {
        const allBooks = await getBookAPI(field, value, reqHeader)
        if (allBooks.status == 200) {
          setAllBooks(allBooks.data)
        }
      } catch (error) {
        console.log(error);

      }
    } else {
      navigate('/login')
      // alert("Token Missing... Please Login!!!")
    }
  }

  // Bookrequest function 
  const handleRequest = async (id) => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const requestedBooks = await getSingleBookAPI(id, reqHeader)
        if (requestedBooks.status == 200) {
          const requestedData = requestedBooks.data
          // console.log(requestedData);
          const userDetail = JSON.parse(sessionStorage.getItem("users"))
          setRequestedBookDetails({
            bookId: requestedData._id, title: requestedData.title, author: requestedData.author, publisher: requestedData.publisher, bookPic: requestedData.bookPic, studentName: userDetail.name, studentBranch: userDetail.branch, studentId: userDetail._id
          })
        // }
          const postRequestfunction = await requestBookAPI(requestedBookDetails, reqHeader)
          // console.log(postRequestfunction);
          if (postRequestfunction.status == 200) {
            alert("Request Sent Successfully!!!")
          } else {
            if (postRequestfunction.status == 406) {
              alert(postRequestfunction.response.data)
            }
          }}
        } catch (error) {
          console.log(error);

        }
      // }


    } else {
      alert("Token is missing Please Login")
      setProceedRequest(false)
    }
  }

  return (
    <div>
      {
        insideAdmin ?
          <Header AdminHeader={true} />
          :
          <Header />
      }
      <div style={{ paddingTop: "170px", backgroundColor: "black", minHeight: "100vh" }}>
        <h1 style={{ backgroundColor: "#3D3D4A", border: "none", borderRadius: "10px" }} className='container d-flex justify-content-center text-light text-center py-1 w-75 fw-bolder'>
          ALL AVAILABLE BOOKS IN LIBRARY
        </h1>
        <div style={{ width: "100%" }} className='d-flex justify-content-start container ps-5 align-items-center mt-3'>
          <div className='mx-2'>
            <input onChange={(e) => setSearchKey(e.target.value)} type="text" placeholder={`Search Book By ${filterValue}`} className='container py-2 rounded fw-bold' style={{ borderWidth: "5px", width: "" }} />
          </div>
          <div>
            <select onChange={(e) => setFilterValue(e.target.value)} style={{ border: "none" }} className='w-25 bg-light text-dark' name="" id="">
              <option selected hidden disabled className='text-dark' value=""></option>
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="publisher">Publisher</option>
            </select>
          </div>
        </div>
        <div className='mt-3 container-fluid'>
          {allBooks?.length > 0 ?
            <div className={mystyle.tableresponsive}>
              <table className='table bg-light'>
                <thead style={{ fontSize: "18px" }} className='text-dark fw-bolder border shadow'>
                  <tr>
                    <th className='p-3'>Sl.No</th>
                    <th className='p-3'>Title</th>
                    <th className='p-3'>Author</th>
                    <th className='p-3'>Publisher</th>
                    <th className='p-3'>Image</th>
                    <th className='p-3'>Copies</th>
                    <th className='p-3'>Status</th>
                    <th className='p-3'>...</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    allBooks?.length > 0 &&
                    allBooks?.map((books, index) => (
                      <tr>
                        <td className='p-3'>{index + 1}</td>
                        <td className='p-3'>{books?.title}</td>
                        <td className='p-3'>{books?.author}</td>
                        <td className='p-3'>{books?.publisher}</td>
                        <td className='p-3'>
                          <img
                            width={'100px'}
                            height={'120px'}
                            src={`${SERVER_URL}/uploads/${books?.bookPic}`}
                            alt="no-image"
                          />
                        </td>
                        <td className='p-3'>{books?.copies}</td>
                        <td className='p-3'>{books?.copies > 0 ? "Available" : "Not Available"}</td>
                        <td className='p-3'>

                          {insideAdmin ?
                            <EditBook allBooks={books} />
                            :
                            <button onClick={() => handleRequest(books?._id)} disabled={books?.copies <= 0} style={{ backgroundColor: "lightgreen" }} className='px-2 py-1 rounded fw-bolder'>Request</button>
                          }
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
            :
            <p className='fw-bolder fs-1 text-danger text-center mt-5'>*No Books Available <i class="fa-regular fa-face-sad-tear"></i></p>
          }
        </div>

      </div>
      <Footer />
    </div>
  )
}

export default AllBooks