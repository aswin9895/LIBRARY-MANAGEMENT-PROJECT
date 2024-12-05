import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import mystyle from '../../Components/Style.module.css'
import Footer from '../../Components/Footer'
import { getRequestedBookAPI } from '../../Services/allAPI'
import { useNavigate } from 'react-router'

const Requestedbooks = () => {

const [requestedBooks,setRequestedBooks]=useState([])
const navigate = useNavigate()
console.log(requestedBooks);

useEffect(()=>{
  const isAdmin = JSON.parse(sessionStorage.getItem("users"))
  if (isAdmin.role!="admin") {
    navigate('/login')
  }
},[])

useEffect(()=>{
  getAllRequestedBooks()
},[])

const getAllRequestedBooks = async () => {
  const token = sessionStorage.getItem("token")
  if (token) {
    const reqHeader ={
      "Authorization":`Bearer ${token}`
    }
    try {
      const getRequestedBooks = await getRequestedBookAPI(reqHeader)
      if (getRequestedBooks.status==200) {
        setRequestedBooks(getRequestedBooks.data)
      }
    } catch (error) {
      console.log(error);
      
    }
  }
}

  return (
    <div>
        <Header AdminHeader={true}/>
        <div style={{ paddingTop: "170px", backgroundColor: "black", minHeight: "100vh" }}>
        <h1 style={{ backgroundColor: "#3D3D4A", border: "none", borderRadius: "10px" }} className='container text-center d-flex justify-content-center text-light py-1 fw-bolder w-75'>
          STUDENT REQUESTED BOOKS
        </h1>

        <div className='mt-5 container-fluid'>
          {requestedBooks?.length>0?
            <div className={mystyle.tableresponsive}>
            <table className='table bg-light'>
              <thead style={{ fontSize: "18px" }} className='text-dark fw-bolder border shadow'>
                <tr>
                  <th className='p-3'>Sl.No</th>
                  <th className='p-3'>Title</th>
                  <th className='p-3'>Author</th>
                  <th className='p-3'>Publisher</th>
                  <th className='p-3'>Image</th>
                  <th className='p-3'>Student Name</th>
                  <th className='p-3'>Student Branch</th>
                  <th className='p-3'>...</th>
                </tr>
              </thead>
              <tbody >
                {
                  requestedBooks.map((book, index) => (
                    <tr className='border'>
                  <td className='p-3'>{index+1}</td>
                  <td className='p-3'>{book?.title}</td>
                  <td className='p-3'>{book?.author}</td>
                  <td className='p-3'>{book?.publisher}</td>
                  <td className='p-3'>
                    <img
                      width={'100px'}
                      height={'120px'}
                      src={book?.bookPic}
                      alt="no-image"
                    />
                  </td>
                  <td className='p-3'>{book?.studentName}</td>
                  <td className='p-3'>{book?.studentBranch}</td>
                  <td className='p-3'>
                  <button style={{ border: "solid", borderWidth: "4px" }} className='px-2 py-1 rounded text-center text-dark bg-success'><i class="fa-solid fa-check"></i></button>  
                  <button style={{ border: "solid", borderWidth: "4px" }} className='px-2 ms-2 py-1 rounded text-center text-dark bg-danger'><i class="fa-solid fa-x"></i></button>               
                  </td>
                </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        :
        <div className='text-danger text-center fs-5 fw-bolder mt-5 pt-5'>No Requested Books!!!</div>  
        }
        </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Requestedbooks