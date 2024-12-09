import React, { useEffect, useId, useState } from 'react'
import Header from '../../Components/Header'
import mystyle from '../../Components/Style.module.css'
import Footer from '../../Components/Footer'
import { useNavigate } from 'react-router'
import { getIssuedUserAPI } from '../../Services/allAPI'
import SERVER_URL from '../../Services/SERVER_URL'

const IssuedBooks = () => {

  const [issuedBooks, setissuedBooks] = useState([])
  const [loggedIn, setloggedId] = useState("")

  const navigate = useNavigate()
  useEffect(() => {
    const logged = JSON.parse(sessionStorage.getItem("users"))
    setloggedId(logged._id)

    if (logged.role != "student") {
      navigate('/login')
    }
  }, [])

  useEffect(() => {
    getIssuedBooks()
  }, [loggedIn])

  const getIssuedBooks = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      const result = await getIssuedUserAPI(loggedIn, reqHeader)
      if (result.status == 200) {
        setissuedBooks(result.data)
      }
    } else {
      alert("token missing please login")
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

  return (
    <div>
      <Header />
      <div style={{ paddingTop: "170px", backgroundColor: "black", minHeight: "100vh" }}>
        <h1 style={{ backgroundColor: "#3D3D4A", border: "none", borderRadius: "10px" }} className='container text-center d-flex justify-content-center text-light py-1 fw-bolder w-75'>
          MY ISSUED BOOKS
        </h1>
        <div className='mt-5 container-fluid'>
          {issuedBooks?.length>0?
            <div className={mystyle.tableresponsive}>
            <table className='table bg-light'>
              <thead style={{ fontSize: "18px" }} className='text-dark fw-bolder border shadow'>
                <tr>
                  <th className='p-3'>Sl.No</th>
                  <th className='p-3'>Title</th>
                  <th className='p-3'>Author</th>
                  <th className='p-3'>Publisher</th>
                  <th className='p-3'>Image</th>
                  <th className='p-3'>Issued Date</th>
                  <th className='p-3'>Return Date</th>
                  <th className='p-3'>Fine</th>
                </tr>
              </thead>
              <tbody>
                {
                  issuedBooks?.map((books,index)=>(
                    <tr key={index}>
                  <td className='p-3'>{index+1}</td>
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
                  <td className='p-3'>{books?.issuedDate}</td>
                  <td className='p-3'>{books?.returnDate}</td>
                  <td className='p-3'>₹<span>{fineCalculation(books?.returnDate)}</span></td>
                </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        :
        <div className="mt-5 pt-5 fw-bolder fs-5 text-danger text-center">No Books Issued!!!</div>  
        }
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default IssuedBooks