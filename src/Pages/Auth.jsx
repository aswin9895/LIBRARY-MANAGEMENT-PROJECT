import React, { useContext, useEffect, useState } from 'react'
import mystyle from '../Components/Style.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { loginUserAPI, registerUserAPI } from '../Services/allAPI'
import { newUserRegisterResponseContext } from '../ContextAPI/ResponseAPI'
import { adminAuthContext, tokenAuthContext, userAuthContext } from '../ContextAPI/AuthContet'

const Auth = ({ insideRegister }) => {
  const { isUser, setisUser } = useContext(userAuthContext)
  const { isAdmin, setisAdmin } = useContext(adminAuthContext)
  const { isAuthorised, setIsAuthorised } = useContext(tokenAuthContext)
  const { newUserRegisterResponse, setNewUserRegisterResponse } = useContext(newUserRegisterResponseContext)

  const [userDetails, setuserDetails] = useState({
    name: "", email: "", phn: "", password: "", branch: "", admnum: "", admyear: ""
  })
  // console.log(userDetails);

  const [userEmailInvalid, setUserEmailInvalid] = useState(false)
  const [userPhnInvalid, setUserPhnInvalid] = useState(false)

  const navigate = useNavigate()

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
          {insideRegister &&
            <Form.Group className="mb-3" controlId="Name">
              <Form.Control value={userDetails.name} onChange={(e) => setuserDetails({ ...userDetails, name: e.target.value })} style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="text" placeholder="Name" />
            </Form.Group>
          }
          <Form.Group className="mb-3" controlId="Email">
            <Form.Control value={userDetails.email} onChange={(e) => setuserDetails({ ...userDetails, email: e.target.value })} style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="email" placeholder="Email" />
          </Form.Group>
          {userEmailInvalid && <p className='text-danger fw-bold'>*Invalid EmailID</p>}
          {insideRegister &&
            <Form.Group className="mb-3" controlId="phn">
              <Form.Control value={userDetails.phn} onChange={(e) => setuserDetails({ ...userDetails, phn: e.target.value })} style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="text" placeholder="Phnone Number" />
            </Form.Group>
          }
          {userPhnInvalid && <p className='text-danger fw-bold'>*Invalid Number</p>}
          <Form.Group className="mb-3" controlId="password">
            <Form.Control value={userDetails.password} onChange={(e) => setuserDetails({ ...userDetails, password: e.target.value })} style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="password" placeholder="Password" />
          </Form.Group>
          {insideRegister &&
            <>
              <Form.Group className="mb-3" controlId="Branch">
                <Form.Control value={userDetails.branch} onChange={(e) => setuserDetails({ ...userDetails, branch: e.target.value })} style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="text" placeholder="Branch" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="admnum">
                <Form.Control value={userDetails.admnum} onChange={(e) => setuserDetails({ ...userDetails, admnum: e.target.value })} style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="text" placeholder="Admission Number" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="admyear">
                <Form.Control value={userDetails.admyear} onChange={(e) => setuserDetails({ ...userDetails, admyear: e.target.value })} style={{ color: "black", padding: "15px", borderRadius: "10px" }} className='fw-bold bg-light' type="text" placeholder="Admission Year" />
              </Form.Group>
            </>
          }
        </Form>
        <div>
          {
            insideRegister ?
              <>
                <button disabled={userEmailInvalid || userPhnInvalid} onClick={handleRegister} style={{ width: "100%", backgroundColor: "red", border: "none", borderRadius: "5px" }} className='fw-bolder py-2 text-light'>SignUp</button>
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