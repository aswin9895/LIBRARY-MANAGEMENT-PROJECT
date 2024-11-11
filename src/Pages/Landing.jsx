import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import admimg from '../assets/adm.jpg'
import stdimg from '../assets/std.jpg'
import mystyle from '../Components/Style.module.css'

const Landing = () => {


    useEffect(() => {
        clearSession()
    }, [])
    const clearSession = () => {
        sessionStorage.clear()
    }
    const handleAdminLogin = () => {
        sessionStorage.setItem("requestFrom", "Admin")
    }
    const handleStudentLogin = () => {
        sessionStorage.setItem("requestFrom", "Student")
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontFamily: "Inter" }} className={mystyle.bg}>
            <div style={{ backgroundColor: "black" }} className='rounded p-5 d-flex justify-content-between flex-wrap'>
                <div>
                    <Link onClick={handleAdminLogin} to={'/login'} style={{ textDecoration: "none" }}>
                        <div className='text-center bg-light rounded'>
                            <img className='p-4' width={'300px'} height={'300px'} src={admimg} alt="" />
                            <h5 className='text-dark fw-bolder mt-3 pb-5 fs-3'>SignIn As Admin</h5>
                        </div>
                    </Link>
                </div>
                <div className='ms-3'>
                    <Link onClick={handleStudentLogin} to={'/login'} style={{ textDecoration: "none" }}>
                        <div className='text-center bg-light rounded'>
                            <img className='p-4' width={'300px'} height={'300px'} src={stdimg} alt="" />
                            <h5 className='text-dark fw-bolder mt-3 pb-5 fs-3'>SignIn As Student</h5>
                        </div>
                    </Link>
                </div>
            </div>

        </div>


    )
}

export default Landing