import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import mystyle from '../../Components/Style.module.css'
import Footer from '../../Components/Footer'
import { useNavigate } from 'react-router'
import { getrecomendbooksAPI, removerecomendbookAPI } from '../../Services/allAPI'

const RecommendedBooks = () => {

  const [recomendedBooks, setrecomendedbooks] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const logged = JSON.parse(sessionStorage.getItem("users"))
    if (logged.role != "admin") {
      navigate('/login')
    }
  }, [])
  useEffect(() => {
    getRecomendBooks()
  }, [])

  const getRecomendBooks = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await getrecomendbooksAPI(reqHeader)
        if (result.status == 200) {
          setrecomendedbooks(result.data)
        }
      } catch (error) {
        console.log(error);

      }
    } else {
      alert("token missing please login!!!")
    }
  }

  const removeRecomendBook = async (id) => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await removerecomendbookAPI(id, reqHeader)
        if (result.status == 200) {
          getRecomendBooks()
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div>
      <Header AdminHeader={true} />
      <div style={{ paddingTop: "170px", backgroundColor: "black", minHeight: "100vh" }}>
        <h1 style={{ backgroundColor: "#3D3D4A", border: "none", borderRadius: "10px" }} className='container text-center d-flex justify-content-center text-light py-1 fw-bolder w-75'>
          BOOKS RECOMMENDED BY STUDENTS
        </h1>
        <div className='mt-5 container-fluid'>
          {recomendedBooks?.length > 0 ?
            <div className={mystyle.tableresponsive}>
              <table className='table bg-light'>
                <thead style={{ fontSize: "18px" }} className='text-dark fw-bolder border shadow'>
                  <tr>
                    <th className='p-3'>Sl.No</th>
                    <th className='p-3'>Title</th>
                    <th className='p-3'>Author</th>
                    <th className='p-3'>Publisher</th>
                    <th className='p-3'>Requested Student</th>
                    <th className='p-3'>Student Branch</th>
                    <th className='p-3'>...</th>
                  </tr>
                </thead>
                <tbody >
                  {
                    recomendedBooks?.map((books, index) => (
                      <tr key={index} className='border'>
                        <td className='p-3'>{index + 1}</td>
                        <td className='p-3'>{books?.title}</td>
                        <td className='p-3'>{books?.author}</td>
                        <td className='p-3'>{books?.publisher}</td>
                        <td className='p-3'>{books?.studentName}</td>
                        <td className='p-3'>{books?.studentBranch}</td>
                        <td className='p-3'>
                          <button onClick={() => removeRecomendBook(books?._id)} style={{ border: "solid", borderWidth: "4px" }} className='px-2 py-1 rounded text-center text-dark bg-danger'><i class="fa-solid fa-trash"></i></button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
            :
            <div className="text-center mt-5 pt-5 fw-bolder text-danger fs-5">No Recommended Books!!!</div>
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default RecommendedBooks