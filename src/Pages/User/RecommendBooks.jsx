import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import { Form } from 'react-bootstrap'
import Footer from '../../Components/Footer'
import { useNavigate } from 'react-router'
import { recommendBookAPI } from '../../Services/allAPI'

const RecommendBooks = () => {

  const [recommendbooks, setRecommendBooks] = useState({
    title: "", author: "", publisher: "", studentName: "", studentBranch: ""
  })

  const navigate = useNavigate()

  // role validation 
  useEffect(() => {
    const logged = JSON.parse(sessionStorage.getItem("users"))
    if (logged.role != "student") {
      navigate('/*')
    }
  }, [])

  useEffect(() => {
    const logged = JSON.parse(sessionStorage.getItem("users"))
    setRecommendBooks({ ...recommendbooks, studentName: logged.name, studentBranch: logged.branch })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { title, author, publisher, studentName, studentBranch } = recommendbooks
    if (title && author && publisher && studentName && studentBranch) {
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Authorization": `Bearer ${token}`
        }
        try {
          const result = await recommendBookAPI(recommendbooks, reqHeader)
          if (result.status == 200) {
            alert("Book recommended successfully")
            setRecommendBooks({
              title: "", author: "", publisher: "", studentName: "", studentBranch: ""
            })
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("Token Missing Please Login!!!")
      }
    } else {
      alert("Please Fill The Form Completely!!!")
    }
  }

  return (
    <div>
      <Header />
      <div style={{ paddingTop: "170px", backgroundColor: "black", minHeight: "100vh" }} className='d-flex justify-content-center align-items-center'>
        <div className='border p-5 rounded'>
          <div className='text-center'>
            <h1 className='text-light text-center fw-bolder'>Recommend A Book</h1>
            <Form>
              <Form.Group className="mt-5 mb-3" controlId="Title">
                <Form.Control value={recommendbooks.title ? recommendbooks.title : ""} onChange={(e) => setRecommendBooks({ ...recommendbooks, title: e.target.value })} style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="text" placeholder="Title" />
              </Form.Group>
            </Form>
            <Form>
              <Form.Group className="mb-3" controlId="Author">
                <Form.Control value={recommendbooks.author ? recommendbooks.author : ""} onChange={(e) => setRecommendBooks({ ...recommendbooks, author: e.target.value })} style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="text" placeholder="Author" />
              </Form.Group>
            </Form>
            <Form>
              <Form.Group className="mb-3" controlId="Publisher">
                <Form.Control value={recommendbooks.publisher ? recommendbooks.publisher : ""} onChange={(e) => setRecommendBooks({ ...recommendbooks, publisher: e.target.value })} style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="text" placeholder="Publisher" />
              </Form.Group>
            </Form>
            <button onClick={handleSubmit} style={{ border: "none", borderRadius: "10px", backgroundColor: "lightseagreen" }} className='fw-bolder text-light w-50 py-2 mt-2'>Send Request</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default RecommendBooks