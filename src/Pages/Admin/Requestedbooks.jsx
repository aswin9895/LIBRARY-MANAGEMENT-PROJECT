import React, { useContext, useEffect, useState } from 'react'
import Header from '../../Components/Header'
import mystyle from '../../Components/Style.module.css'
import Footer from '../../Components/Footer'
import { getRequestedBookAPI, issueBookAPI, rejectrequestBookAPI, singlebookrequestdetailAPI, updateCopies } from '../../Services/allAPI'
import { useNavigate } from 'react-router'
import SERVER_URL from '../../Services/SERVER_URL'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'

const Requestedbooks = () => {

  // bookCopies update response function
  const [acceptedRequestId, setAcceptedRequestId] = useState("")
  // all requested books getting
  const [requestedBooks, setRequestedBooks] = useState([])
  // issuing book details getting 
  const [issuebook, setissuebook] = useState({
    bookId: "", title: "", author: "", publisher: "", bookPic: "", studentName: "", studentBranch: "", studentId: "", issuedDate: "", returnDate: ""
  })

  const navigate = useNavigate()

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  // getting current date 
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const date = today.getDate()
  const currentdate = year + '-' + month + '-' + date

  // getting issuing book details function
  const handleShow = async (id) => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const response = await singlebookrequestdetailAPI(id, reqHeader)
        if (response.status == 200) {
          const res = response.data
          setAcceptedRequestId(res._id)
          setissuebook({
            bookId: res.bookId, title: res.title, author: res.author, publisher: res.publisher, bookPic: res.bookPic, studentName: res.studentName, studentBranch: res.studentBranch, studentId: res.studentId, issuedDate: currentdate, returnDate: ""
          })
          // console.log(issuebook);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("token missing please login!!!")
    }
    setShow(true);
  }

  // rejecting user to access the page
  useEffect(() => {
    const isAdmin = JSON.parse(sessionStorage.getItem("users"))
    if (isAdmin.role != "admin") {
      navigate('/login')
    }
  }, [])

  // calling getAllRequestedBooks function 
  useEffect(() => {
    getAllRequestedBooks()
  }, [])

  // getting all requested books function
  const getAllRequestedBooks = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const getRequestedBooks = await getRequestedBookAPI(reqHeader)
        if (getRequestedBooks.status == 200) {
          setRequestedBooks(getRequestedBooks.data)
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  // reject requestedBooks function
  const rejectrequestBook = async (id) => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const rejectRequest = await rejectrequestBookAPI(id, reqHeader)
        if (rejectRequest.status == 200) {
          getAllRequestedBooks()
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Token is Missing... Please Login!!!")
    }
  }

  // accepting request function 
  const handleissuebook = async (e) => {
    if (issuebook.returnDate) {
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Authorization": `Bearer ${token}`
        }
        try {
          const updateBookCopies = await updateCopies(issuebook.bookId, reqHeader)
          if (updateBookCopies.status == 200) {
            // post issuing book
            const result = await issueBookAPI(issuebook, reqHeader)
            if (result.status == 200) {
              alert("Book Issued Successfully")
              // updating book copies when admin accepts the request 
              handleClose()
              // removing issued books from requested books
              const removeAcceptrequest = await rejectrequestBookAPI(acceptedRequestId, reqHeader)
              if (removeAcceptrequest.status == 200) {
                getAllRequestedBooks()
              }
            } else if (result.status == 406) {
              alert(result.response.data)
            }
          }else{
            if (updateBookCopies.status==400) {
             alert(updateBookCopies.response.data.message)
            }
          }

        } catch (error) {
          console.log(error);
        }
      } else {
        alert("Token Missing... Please Login!!!")
      }

    } else {
      alert("please Fill the field!!!")
    }
  }

  return (
    <div>
      <Header AdminHeader={true} />
      <div style={{ paddingTop: "170px", backgroundColor: "black", minHeight: "100vh" }}>
        <h1 style={{ backgroundColor: "#3D3D4A", border: "none", borderRadius: "10px" }} className='container text-center d-flex justify-content-center text-light py-1 fw-bolder w-75'>
          STUDENT REQUESTED BOOKS
        </h1>

        <div className='mt-5 container-fluid'>
          {requestedBooks?.length > 0 ?
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
                      <tr key={index} className='border'>
                        <td className='p-3'>{index + 1}</td>
                        <td className='p-3'>{book?.title}</td>
                        <td className='p-3'>{book?.author}</td>
                        <td className='p-3'>{book?.publisher}</td>
                        <td className='p-3'>
                          <img
                            width={'100px'}
                            height={'120px'}
                            src={`${SERVER_URL}/uploads/${book?.bookPic}`}
                            alt="no-image"
                          />
                        </td>
                        <td className='p-3'>{book?.studentName}</td>
                        <td className='p-3'>{book?.studentBranch}</td>
                        <td className='p-3'>

                          <button onClick={() => handleShow(book?._id)} style={{ border: "solid", borderWidth: "4px" }} className='px-2 py-1 rounded text-center text-dark bg-success'><i class="fa-solid fa-check"></i></button>

                          <Modal centered size='md' show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                            <Modal.Body>
                              <FloatingLabel controlId="floatingInput" label="Return Date" className="mb-3 mt-3">
                                <Form.Control onChange={e => setissuebook({ ...issuebook, returnDate: e.target.value })} type="date" placeholder="" />
                              </FloatingLabel>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                Close
                              </Button>
                              <Button onClick={handleissuebook} variant="primary">Accept</Button>
                            </Modal.Footer>
                          </Modal>

                          <button onClick={() => rejectrequestBook(book?._id)} style={{ border: "solid", borderWidth: "4px" }} className='px-2 ms-2 py-1 rounded text-center text-dark bg-danger'><i class="fa-solid fa-x"></i></button>
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
      <Footer />
    </div>
  )
}

export default Requestedbooks