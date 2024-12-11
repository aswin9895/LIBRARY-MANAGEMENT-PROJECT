import { Link, useNavigate } from 'react-router-dom';
import mystyle from '../Components/Style.module.css';
import { Dropdown } from 'react-bootstrap';
import { useContext } from 'react';
import { adminAuthContext, tokenAuthContext, userAuthContext } from '../ContextAPI/AuthContet';

const Header = ({ AdminHeader, GuestHeader }) => {

  const { isAuthorised, setIsAuthorised } = useContext(tokenAuthContext)
  const { isAdmin, setisAdmin } = useContext(adminAuthContext)
  const { isUser, setisUser } = useContext(userAuthContext)
  const navigate = useNavigate()

  // logoutFunction
  const handleLogout = () => {
    sessionStorage.clear()
    setIsAuthorised(false)
    setisAdmin(false)
    setisUser(false)
    navigate('/login')
  }

  return (
    <div style={{ backgroundColor: "red", position: "fixed", width: "100%" }} className='d-flex justify-content-between align-items-center px-4 py-2'>
      <div >
        {AdminHeader ?
          <Link style={{ textDecoration: 'none' }} to={'/allbooksadmin'}><h5 className={mystyle.headerheading} style={{ fontWeight: "400", fontSize: "35px", color: "white" }}>Library Management System</h5></Link>
          :
          <Link style={{ textDecoration: 'none' }} to={'/allbooks'}><h5 className={mystyle.headerheading} style={{ fontWeight: "400", fontSize: "35px", color: "white" }}>Library Management System</h5></Link>}
      </div>
      <div className='d-flex align-items-center'>
        <div>
          {GuestHeader ?
            <Link style={{ textDecoration: "none" }} to={'/login'}><button style={{ border: "none" }} className='text-light fw-bolder  bg-transparent'>Login</button></Link>
            :
            <Dropdown>
              <Dropdown.Toggle style={{ border: "none" }} className='bg-dark text-light' id="dropdown-basic">
                <i class="fa-solid fa-bars"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {
                  AdminHeader ?
                    <>
                      <Dropdown.Item><Link to={'/allbooksadmin'} style={{ textDecoration: "none" }}><button style={{ border: "none", backgroundColor: "transparent" }} className='w-100 text-start'><i class="fa-solid fa-book"></i> All Books</button></Link></Dropdown.Item>
                      <Dropdown.Item><Link to={'/requestedbooks'} style={{ textDecoration: "none" }}><button style={{ border: "none", backgroundColor: "transparent" }} className='w-100 text-start'><i class="fa-solid fa-hand"></i>Requested Books</button></Link></Dropdown.Item>
                      <Dropdown.Item><Link to={'/recommendedbooks'} style={{ textDecoration: "none" }}><button style={{ border: "none", backgroundColor: "transparent" }} className='w-100 text-start'><i class="fa-solid fa-book-open"></i> Recommended Books</button></Link></Dropdown.Item>
                      <Dropdown.Item><Link to={'/issuedbooksbyadmin'} style={{ textDecoration: "none" }}><button style={{ border: "none", backgroundColor: "transparent" }} className='w-100 text-start'><i class="fa-solid fa-book-open-reader"></i> Issued Books</button></Link></Dropdown.Item>
                      <Dropdown.Item><Link to={'/addbook'} style={{ textDecoration: "none" }}><button style={{ border: "none", backgroundColor: "transparent" }} className='w-100 text-start'><i class="fa-solid fa-plus"></i> Add Books</button></Link></Dropdown.Item>
                      <Dropdown.Item><Link to={'/managestudent'} style={{ textDecoration: "none" }}><button style={{ border: "none", backgroundColor: "transparent" }} className='w-100 text-start'><i class="fa-solid fa-people-roof"></i> Manage Students</button></Link></Dropdown.Item>
                    </>
                    :
                    <>
                      <Dropdown.Item><Link to={'/allbooks'} style={{ textDecoration: "none" }}><button style={{ border: "none", backgroundColor: "transparent" }} className='w-100 text-start'><i class="fa-solid fa-book"></i> All Books</button></Link></Dropdown.Item>
                      <Dropdown.Item><Link to={'/recommendbooks'} style={{ textDecoration: "none" }}><button style={{ border: "none", backgroundColor: "transparent" }} className='w-100 text-start'><i class="fa-solid fa-book-open"></i> Recommend Books</button></Link></Dropdown.Item>
                      <Dropdown.Item><Link to={'/issuedbooks'} style={{ textDecoration: "none" }}><button style={{ border: "none", backgroundColor: "transparent" }} className='w-100 text-start'><i class="fa-solid fa-book-open-reader"></i> Issued Books</button></Link></Dropdown.Item>
                    </>
                }
              </Dropdown.Menu>
            </Dropdown>}
        </div>
        <div className='ms-3'>
          {!GuestHeader &&
            <Dropdown>
              <Dropdown.Toggle style={{ border: "none" }} className='bg-dark text-light' id="dropdown-basic">
                <i class="fa-regular fa-user"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {
                  AdminHeader ?
                    <Dropdown.Item><button onClick={handleLogout} style={{ border: "none", backgroundColor: "transparent" }}><i class="fa-solid fa-power-off"></i> Logout</button></Dropdown.Item>
                    :
                    <>
                      <Dropdown.Item><Link to={'/updateprofile'}><button style={{ border: "none", backgroundColor: "transparent" }}><i class="fa-solid fa-id-card-clip"></i> Update Profile</button></Link></Dropdown.Item>
                      <Dropdown.Item><button onClick={handleLogout} style={{ border: "none", backgroundColor: "transparent" }}><i class="fa-solid fa-power-off"></i> Logout</button></Dropdown.Item>
                    </>
                }
              </Dropdown.Menu>
            </Dropdown>}
        </div>
      </div>
    </div>
  );
};

export default Header;
