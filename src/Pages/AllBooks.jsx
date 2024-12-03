import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import mystyle from '../Components/Style.module.css'
import EditBook from '../Components/EditBook'
import Footer from '../Components/Footer'
import { getBookAPI } from '../Services/allAPI'
import SERVER_URL from '../Services/SERVER_URL'
import { useNavigate } from 'react-router'
import { bookRemovedResponseContext } from '../ContextAPI/ResponseAPI'
import SearchBook from '../Components/SearchBook'


const AllBooks = ({ insideAdmin }) => {
const{bookRemovedResponse, setBookRemoveResponse}=useContext(bookRemovedResponseContext)
  const [allBooks, setAllBooks] = useState([])

  const navigate = useNavigate()
  
  useEffect(() => {
    getAllBooks()
  }, [bookRemovedResponse])

  // getallbook function
  const getAllBooks = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const allBooks = await getBookAPI(reqHeader)
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
        <SearchBook/>
        <div className='mt-3 container-fluid'>
          {allBooks?.length>0?
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
                          <EditBook allBooks={books}/>
                          :
                          <button disabled={books?.copies == 0} style={{ backgroundColor: "lightgreen" }} className='px-2 py-1 rounded fw-bolder'>Request</button>
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