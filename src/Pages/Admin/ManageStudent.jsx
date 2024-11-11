import React from 'react'
import Header from '../../Components/Header'
import mystyle from '../../Components/Style.module.css'
import Footer from '../../Components/Footer'

const ManageStudent = () => {
  return (
    <div>
<Header AdminHeader={true}/>
<div style={{ paddingTop: "170px", backgroundColor: "black", minHeight: "100vh" }}>
        <h1 style={{ backgroundColor: "#3D3D4A", border: "none", borderRadius: "10px" }} className='container text-center d-flex justify-content-center text-light py-1 fw-bolder w-75'>
         MANAGE STUDENTS
        </h1>

        <div className='mt-5 container-fluid'>
          <div className={mystyle.tableresponsive}>
            <table className='table bg-light'>
              <thead style={{ fontSize: "18px" }} className='text-dark fw-bolder border shadow'>
                <tr>
                  <th className='p-3'>Sl.No</th>
                  <th className='p-3'>Name</th>
                  <th className='p-3'>Admission Number</th>
                  <th className='p-3'>Branch</th>
                  <th className='p-3'>Join Year</th>
                  <th className='p-3'>...</th>
                </tr>
              </thead>
              <tbody >
                <tr className='border'>
                  <td className='p-3'>1</td>
                  <td className='p-3'>Aswin</td>
                  <td className='p-3'>20158</td>
                  <td className='p-3'>Computer Scince</td>
                  <td className='p-3'>2019</td>
                  <td className='p-3'>
                  <button style={{ border: "solid", borderWidth: "4px", borderColor:"black"}} className='px-2 py-1 rounded text-center text-light bg-danger'>Remove</button>               
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        </div>
        <Footer/>
    </div>
  )
}

export default ManageStudent