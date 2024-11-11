import React from 'react'
import uselogo from '../../assets/userlogo.png'
import Header from '../../Components/Header'
import { Form } from 'react-bootstrap'
import Footer from '../../Components/Footer'

const UpdateProfile = () => {
  return (
    <div>
      <Header />
      <div style={{ paddingTop: "170px", paddingBottom:"100px", backgroundColor: "black", minHeight: "100vh" }} className='d-flex justify-content-center align-items-center'>
        <div className='w-50 w-sm-75 border rounded p-5 text-center'>
          <h1 className='text-light fw-bolder text-center'>UPDATE PROFILE</h1>
          <hr className='text-light fw-bolder' />
          <label>
            <input type="file" className='d-none' />
            <img style={{ borderWidth: "5px", borderRadius: "50%", border: "solid", borderColor: "white" }} width={'200px'} height={'200px'} src={uselogo} alt="" className='' />
          </label>
          <p className='mt-2 text-warning'>(Upload Only JPG, PNG, JPEG formats!!!)</p>
          <Form>
            <Form.Group className="mb-3" controlId="Name">
              <Form.Control style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="text" placeholder="Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="EmailId">
              <Form.Control style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="email" placeholder="Email-Id" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="PhoneNumber">
              <Form.Control style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="text" placeholder="Phone Number" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Branch">
              <Form.Control style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="text" placeholder="Branch" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="AdmissionNumber">
              <Form.Control style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="text" placeholder="Admission-Number" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="AdmissionYear">
              <Form.Control style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="text" placeholder="Admission-Year" />
            </Form.Group>
          </Form>
          <button style={{backgroundColor:"red"}} className='fw-bolder text-light px-3 rounded py-2'>Cancel</button>

          <button style={{backgroundColor:"lightseagreen"}} className='fw-bolder text-light px-3 rounded py-2'>Submit</button>
          </div>
      </div>
      <Footer/>
    </div>
  )
}

export default UpdateProfile