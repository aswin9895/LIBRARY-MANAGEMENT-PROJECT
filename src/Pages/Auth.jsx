import React, { useContext, useEffect, useState } from 'react'
import mystyle from '../Components/Style.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'
import { getStudentAPI, loginUserAPI, registerUserAPI } from '../Services/allAPI'
import { newUserRegisterResponseContext } from '../ContextAPI/ResponseAPI'
import { adminAuthContext, tokenAuthContext, userAuthContext } from '../ContextAPI/AuthContet'

const Auth = ({ insideRegister }) => {
  const { isUser, setisUser } = useContext(userAuthContext)
  const { isAdmin, setisAdmin } = useContext(adminAuthContext)
  const { isAuthorised, setIsAuthorised } = useContext(tokenAuthContext)
  const { newUserRegisterResponse, setNewUserRegisterResponse } = useContext(newUserRegisterResponseContext)
  const [field, setField] = useState("phn")

  const [userDetails, setuserDetails] = useState({
    name: "", email: "", phn: "", password: "", branch: "", admnum: "", admyear: ""
  })
  console.log(userDetails);

  const [userEmailInvalid, setUserEmailInvalid] = useState(false)
  const [userPhnInvalid, setUserPhnInvalid] = useState(false)

  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setuserDetails({
      name: "", email: "", phn: "", password: "", branch: "", admnum: "", admyear: ""
    })
    setShow(false);
  }
  const handleShow = async () => {
    if (userDetails.phn) {
      try {
        const student = await getStudentAPI(field, userDetails.phn)
        if (student.status == 200) {
          setShow(true);
          setuserDetails({
            ...userDetails,
            name: student.data.name, email: student.data.email, branch: student.data.branch, admnum: student.data.admnum, admyear: student.data.admyear
          })
        } else {
          if (student.status == 406) {
            alert(student.response.data)
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please Provide Your Number")
    }
  }

  // validating email and phn number
  useEffect(() => {
    if (userDetails.email) {
      !!userDetails.email.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/) ? setUserEmailInvalid(false) : setUserEmailInvalid(true)
    }
    if (userDetails.phn) {
      !!userDetails.phn.match(/^[6789]\d{9}$/) ? setUserPhnInvalid(false) : setUserPhnInvalid(true)
    }
  }, [userDetails.email, userDetails.phn])

  useEffect(() => {
    sessionStorage.clear()
    setIsAuthorised(false)
  }, [])

  // registeration function
  const handleRegister = async (e) => {
    e.preventDefault()
    const { name, email, phn, password, branch, admnum, admyear } = userDetails
    if (name && email && phn && password && branch && admnum && admyear) {
      // alert("api call")
      try {
        const register = await registerUserAPI(userDetails)
        // console.log(register);
        if (register.status == 200) {
          alert("Registration Successfull")
          setNewUserRegisterResponse(register)
          setuserDetails({
            name: "", email: "", password: "", phn: "", branch: "", admnum: "", admyear: ""
          })
          navigate('/login')
        } else {
          if (register.status == 406) {
            alert(register.response.data)
            setuserDetails({
              name: "", email: "", password: "", phn: "", branch: "", admnum: "", admyear: ""
            })
            navigate('/login')
          }
        }

      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please Fill The Form Completely!!!")
    }
  }

  // login function 
  const handleLogin = async (e) => {
    e.preventDefault()
    const { email, password } = userDetails
    if (email && password) {
      // alert("api call")
      const login = await loginUserAPI(userDetails)
      // console.log(login);
      if (login.status == 200) {
        // alert("success")
        sessionStorage.setItem("users", JSON.stringify(login.data.user))
        sessionStorage.setItem("token", login.data.token)
        const loginedRole = login.data.user.role
        setIsAuthorised(true)
        // console.log(loginedRole);
        if (loginedRole == "student") {
          setisUser(true)
          navigate('/allbooks')
        } else {
          if (loginedRole == "admin") {
            setisAdmin(true)
            navigate('/allbooksadmin')
          }
        }
      } else {
        if (login.status == 406) {
          alert(login.response.data)
        }
      }
    } else {
      alert("Please Fill The Form Comletely!!!")
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "120vh", fontFamily: "Inter" }} className={mystyle.bg}>
      <div style={{ paddingTop: "25px", paddingBottom: "25px", paddingLeft: "10%", paddingRight: "10%", borderRadius: "25px" }} className={mystyle.loginbgclr}>
        <div className='d-flex justify-content-center align-items-center'>
          <div style={{ backgroundColor: "red", width: '70px', height: "70px", borderRadius: "50%", textAlign: "center" }}>
            <Link style={{ textDecoration: "none" }} to={'/'}><h1 className='ms-2 ps-4 pt-3 text-center fw-normal text-light'>LMS</h1></Link>
          </div>
        </div>
        <p style={{ fontSize: "18px" }} className='text-light text-center mt-2 fw-normal'>
          Welcome to Library Management System</p>
        <Form>
          {
            !insideRegister &&
            <>
              <Form.Group className="mb-3" controlId="Email">
                <Form.Control value={userDetails.email} onChange={(e) => setuserDetails({ ...userDetails, email: e.target.value })} style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="email" placeholder="Email" />
              </Form.Group>
              {userEmailInvalid && <p className='text-danger fw-bold'>*Invalid EmailID</p>}
              <Form.Group className="mb-3" controlId="password">
                <Form.Control value={userDetails.password} onChange={(e) => setuserDetails({ ...userDetails, password: e.target.value })} style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="password" placeholder="Password" />
              </Form.Group>
            </>
          }
          {insideRegister &&
            <Form.Group className="mb-3" controlId="phn">
              <Form.Control value={userDetails.phn} onChange={(e) => setuserDetails({ ...userDetails, phn: e.target.value })} style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="text" placeholder="Phnone Number" />
            </Form.Group>
          }
          {userPhnInvalid && <p className='text-danger fw-bold'>*Invalid Number</p>}
        </Form>
        <div>
          {
            insideRegister ?
              <>
                <button disabled={userPhnInvalid} onClick={handleShow} style={{ width: "100%", backgroundColor: "red", border: "none", borderRadius: "5px" }} className='fw-bolder py-2 text-light'>Submit</button>
                <Modal className='rounded' centered show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                  <Modal.Header className='p-3' style={{ backgroundColor: "rgba(16, 15, 15, 0.764)" }} closeButton>
                    <Modal.Title className='text-center text-light fw-bolder'>Confirm Your Details</Modal.Title>
                  </Modal.Header>
                  <Modal.Body style={{ backgroundColor: "rgba(16, 15, 15, 0.764)" }}>
                    <FloatingLabel controlId="Name" label="Name" className="mb-3">
                      <Form.Control value={userDetails.name} readOnly type="text" placeholder="Name" />
                    </FloatingLabel>
                    <FloatingLabel controlId="Email" label="Email" className="mb-3">
                      <Form.Control value={userDetails.email} readOnly type="text" placeholder="Email" />
                    </FloatingLabel>
                    <FloatingLabel controlId="PhoneNumber" label="PhoneNumber" className="mb-3">
                      <Form.Control value={userDetails.phn} readOnly type="text" placeholder="PhoneNumber" />
                    </FloatingLabel>
                    <FloatingLabel controlId="Branch" label="Branch" className="mb-3">
                      <Form.Control value={userDetails.branch} readOnly type="text" placeholder="Branch" />
                    </FloatingLabel>
                    <FloatingLabel controlId="AdmNumber" label="AdmNumber" className="mb-3">
                      <Form.Control value={userDetails.admnum} readOnly type="text" placeholder="AdmNumber" />
                    </FloatingLabel>
                    <FloatingLabel controlId="AdmYear" label="AdmYear" className="mb-3">
                      <Form.Control value={userDetails.admyear} readOnly type="text" placeholder="AdmYear" />
                    </FloatingLabel>
                    <FloatingLabel controlId="Password" label="Password" className="mb-3">
                      <Form.Control onChange={(e) => setuserDetails({ ...userDetails, password: e.target.value })} type="password" placeholder="Password" />
                    </FloatingLabel>
                  </Modal.Body>
                  <Modal.Footer style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", backgroundColor: "rgba(16, 15, 15, 0.764)" }}>
                    <button onClick={handleClose} style={{ width: "40%", backgroundColor: "red", border: "none", borderRadius: "5px" }} className='fw-bolder py-2 text-light'>Close</button>
                    <button onClick={handleRegister} style={{ width: "40%", backgroundColor: "red", border: "none", borderRadius: "5px" }} className='fw-bolder py-2 text-light'>SignUp</button>
                  </Modal.Footer>
                </Modal>
                <p className='text-light mt-3'>Already A User? Please Click Here To  <Link style={{ textDecoration: "underline", color: "lightBlue" }} to={'/login'}> Login</Link></p>
              </>
              :
              <>
                <button disabled={userEmailInvalid} onClick={handleLogin} style={{ width: "100%", backgroundColor: "red", border: "none", borderRadius: "5px" }} className='fw-bolder py-2 text-light'>LogIn</button>
                <p className='text-light mt-3'>New User? Please Click Here To <Link style={{ textDecoration: "underline", color: "lightBlue" }} to={'/register'}> Register</Link></p>
              </>
          }
        </div>
      </div>
    </div>
  )
}

export default Auth