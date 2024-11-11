import React from 'react'
import mystyle from '../Components/Style.module.css'
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'

const Auth = ({ insideRegister }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "120vh", fontFamily: "Inter" }} className={mystyle.bg}>
      <div style={{paddingTop:"25px",paddingBottom:"25px",paddingLeft:"10%",paddingRight:"10%",borderRadius:"25px"}} className={mystyle.loginbgclr}>
<div className='d-flex justify-content-center align-items-center'>
  <div style={{backgroundColor:"red",width:'70px', height:"70px",borderRadius:"50%", textAlign:"center"}}>
    <Link style={{textDecoration:"none"}} to={'/'}><h1 className='ms-2 ps-4 pt-3 text-center fw-normal text-light'>LMS</h1></Link>
    </div>
</div>
<p style={{fontSize:"18px"}} className='text-light text-center mt-2 fw-normal'>
 Welcome to Library Management System</p>
      <Form>
      {insideRegister&&
        <Form.Group className="mb-3" controlId="Name">
        <Form.Control style={{color:"black",padding:"15px",borderRadius:"10px"}} className='fw-bold bg-light' type="text" placeholder="Name" />
      </Form.Group>
      }
      <Form.Group className="mb-3" controlId="Email">
        <Form.Control style={{color:"black",padding:"15px",borderRadius:"10px"}} className='fw-bold bg-light' type="email" placeholder="Email" />
      </Form.Group>
      {insideRegister&&
        <Form.Group className="mb-3" controlId="phn">
        <Form.Control style={{color:"black",padding:"15px",borderRadius:"10px"}} className='fw-bold bg-light' type="text" placeholder="Phnone Number" />
      </Form.Group>
      }
      <Form.Group className="mb-3" controlId="password">
        <Form.Control style={{color:"black",padding:"15px",borderRadius:"10px"}} className='fw-bold bg-light' type="password" placeholder="Password" />
      </Form.Group>
      {insideRegister&&
        <>
          <Form.Group className="mb-3" controlId="Branch">
          <Form.Control style={{color:"black",padding:"15px",borderRadius:"10px"}} className='fw-bold bg-light' type="text" placeholder="Branch" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="admnum">
          <Form.Control style={{color:"black",padding:"15px",borderRadius:"10px"}} className='fw-bold bg-light' type="text" placeholder="Admission Number" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="admyear">
          <Form.Control style={{color:"black",padding:"15px",borderRadius:"10px"}} className='fw-bold bg-light' type="text" placeholder="Admission Year" />
        </Form.Group>
        </>
        }
    </Form>
<div>
{
  insideRegister?
  <>
    <button style={{width:"100%", backgroundColor:"red", border:"none",borderRadius:"5px"}} className='fw-bolder py-2 text-light'>SignUp</button>
    <p className='text-light mt-3'>Already A User? Please Click Here To  <Link style={{textDecoration:"underline",color:"lightBlue"}}  to={'/login'}> Login</Link></p>
  </>
  :
  <>
    <button style={{width:"100%", backgroundColor:"red", border:"none",borderRadius:"5px"}} className='fw-bolder py-2 text-light'>LogIn</button>
    <p className='text-light mt-3'>New User? Please Click Here To <Link style={{textDecoration:"underline",color:"lightBlue"}}  to={'/register'}> Register</Link></p>
  </>
}
</div>
      </div>
    </div>
  )
}

export default Auth