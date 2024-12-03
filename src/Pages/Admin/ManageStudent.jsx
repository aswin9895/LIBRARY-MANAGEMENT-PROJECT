import React, { useContext, useEffect, useState } from 'react'
import Header from '../../Components/Header'
import mystyle from '../../Components/Style.module.css'
import Footer from '../../Components/Footer'
import { deleteUserAPI, getAllUsers } from '../../Services/allAPI'
import { useNavigate } from 'react-router'
import { newUserRegisterResponseContext } from '../../ContextAPI/ResponseAPI'

const ManageStudent = () => {

  const { newUserRegisterResponse, setNewUserRegisterResponse } = useContext(newUserRegisterResponseContext)

  const [studentDetails, setStudentDetails] = useState([])
  console.log(studentDetails);

  const navigate = useNavigate()

  useEffect(() => {
    getAllStudents()
  }, [newUserRegisterResponse])

  // get all student function
  const getAllStudents = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      const admin = JSON.parse(sessionStorage.getItem("users"))
      // console.log(token,admin);
      const isAdmin = admin.role == "admin"
      // console.log(isAdmin);
      try {
        if (isAdmin == true) {
          const allStudents = await getAllUsers(reqHeader)
          if (allStudents.status == 200) {
            setStudentDetails(allStudents.data)
            // console.log(allStudents.data);
          }
        } else {
          navigate('/login')
          // alert("You are not allowed in this page!!!")
          // sessionStorage.clear()
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  // remove student function
  const removeUser = async (id) => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      const admin = JSON.parse(sessionStorage.getItem("users"))
      // console.log(token,admin);
      const isAdmin = admin.role == "admin"
      // console.log(isAdmin);
      try {
        if (isAdmin == true) {
          const removeStudent = await deleteUserAPI(id, reqHeader)
          if (removeStudent.status == 200) {
            getAllStudents()
          }
        } else {
          alert("You are not allowed Here!!!")
        }
      } catch (error) {

      }
    }
  }

  return (
    <div>
      <Header AdminHeader={true} />
      <div style={{ paddingTop: "170px", backgroundColor: "black", minHeight: "100vh" }}>
        <h1 style={{ backgroundColor: "#3D3D4A", border: "none", borderRadius: "10px" }} className='container text-center d-flex justify-content-center text-light py-1 fw-bolder w-75'>
          MANAGE STUDENTS
        </h1>
        <div className='mt-5 container-fluid'>
          {studentDetails?.length > 0 ?
            <div className={mystyle.tableresponsive}>
              <table className='table bg-light'>
                <thead style={{ fontSize: "18px" }} className='text-dark fw-bolder border shadow'>
                  <tr>
                    <th className='p-3'>Sl.No</th>
                    <th className='p-3'>Name</th>
                    <th className='p-3'>Phone Number</th>
                    <th className='p-3'>Admission Number</th>
                    <th className='p-3'>Branch</th>
                    <th className='p-3'>Join Year</th>
                    <th className='p-3'>...</th>
                  </tr>
                </thead>

                <tbody >
                  {studentDetails?.length > 0 &&
                    studentDetails?.map((students, index) => (
                      <tr key={students?.admnum} className='border'>
                        <td className='p-3'>{index + 1}</td>
                        <td className='p-3'>{students?.name}</td>
                        <td className='p-3'>{students?.phn}</td>
                        <td className='p-3'>{students?.admnum}</td>
                        <td className='p-3'>{students?.branch}</td>
                        <td className='p-3'>{students?.admyear}</td>
                        <td className='p-3'>
                          <button onClick={() => removeUser(students?._id)} style={{ border: "solid", borderWidth: "4px", borderColor: "black" }} className='px-2 py-1 rounded text-center text-light bg-danger'>Remove</button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
            :
            <div className='fw-bolder fs-1 text-center text-danger mt-5'>No Students Found</div>
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ManageStudent