import React from 'react'
import Header from '../../Components/Header'
import { Form } from 'react-bootstrap'
import Footer from '../../Components/Footer'

const RecommendBooks = () => {

  return (
    <div>
      <Header/>
      <div style={{ paddingTop: "170px", backgroundColor: "black", minHeight: "100vh" }}className='d-flex justify-content-center align-items-center'>
        <div className='border p-5 rounded'>
          <div className='text-center'>
            <h1 className='text-light text-center fw-bolder'>Recommend A Book</h1>
            <Form>
        <Form.Group className="mt-5 mb-3" controlId="Title">
        <Form.Control style={{color:"black",padding:"15px",borderRadius:"10px"}} className='fw-bold bg-light' type="text" placeholder="Title" />
      </Form.Group>
      </Form>
      <Form>
        <Form.Group className="mb-3" controlId="Author">
        <Form.Control style={{color:"black",padding:"15px",borderRadius:"10px"}} className='fw-bold bg-light' type="text" placeholder="Author" />
      </Form.Group>
      </Form>
      <Form>
        <Form.Group className="mb-3" controlId="Publisher">
        <Form.Control style={{color:"black",padding:"15px",borderRadius:"10px"}} className='fw-bold bg-light' type="text" placeholder="Publisher" />
      </Form.Group>
      </Form>
      <button style={{border:"none",borderRadius:"10px",backgroundColor:"lightseagreen"}} className='fw-bolder text-light w-50 py-2 mt-2'>Send Request</button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default RecommendBooks