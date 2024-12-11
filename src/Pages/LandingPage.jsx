import React, { useEffect, useState } from 'react'
import mystyle from '../Components/Style.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'

const LandingPage = () => {
    const [loading, setloading] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        sessionStorage.clear()
    },[])
    const landingLoading = () => {
        setloading(true)
        setTimeout(() => {
            navigate('/allbooksguest')
        }, 1000);
    }
    return (
        <div className={mystyle.bglanding} style={{ minHeight: "100vh" }}>
            <div className='d-flex justify-content-between align-items-center pt-3 shadow container'>
                <div className=''>
                    <Link to={'/'} style={{ textDecoration: "none" }}><h5 className='fw-bolder text-light'>LMS</h5></Link>
                </div>
                <div className='d-flex align-items-center'>
                    <Link to={'/login'} style={{ textDecoration: "none" }}><p className="text-light fw-normal me-3">Login</p></Link>
                    <Link to={'/register'} style={{ textDecoration: "none" }}><p className="text-light fw-normal">Register</p></Link>
                </div>
            </div>
            <div style={{ marginTop: "12%" }} className='container'>
                <h1 className='fw-bolder text-light' style={{ fontSize: "60px" }}>LIBRARY <span className='text-warning'>MANAGEMENT</span> <br /> <span style={{ lineHeight: "50px" }}>SYSTEM</span><br /></h1>
                <p className='fw-bold text-light fs-5'>LMS offers students to check all available boks in the library and reserve <br />them for a certain period of time.</p>
                <button onClick={landingLoading} style={{ backgroundColor: "lightblue" }} className='fw-bolder px-2 py-2 rounded d-flex align-items-center'>Get Started{loading &&
                        <Spinner className='ms-2 fw-bolder' animation="border" variant="light" />
                    }</button>
            </div>
        </div>
    )
}

export default LandingPage