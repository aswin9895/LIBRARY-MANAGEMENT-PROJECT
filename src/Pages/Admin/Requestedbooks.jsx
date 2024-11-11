import React from 'react'
import Header from '../../Components/Header'
import mystyle from '../../Components/Style.module.css'
import Footer from '../../Components/Footer'

const Requestedbooks = () => {
  return (
    <div>
        <Header AdminHeader={true}/>
        <div style={{ paddingTop: "170px", backgroundColor: "black", minHeight: "100vh" }}>
        <h1 style={{ backgroundColor: "#3D3D4A", border: "none", borderRadius: "10px" }} className='container text-center d-flex justify-content-center text-light py-1 fw-bolder w-75'>
          STUDENT REQUESTED BOOKS
        </h1>

        <div className='mt-5 container-fluid'>
          <div className={mystyle.tableresponsive}>
            <table className='table bg-light'>
              <thead style={{ fontSize: "18px" }} className='text-dark fw-bolder border shadow'>
                <tr>
                  <th className='p-3'>Sl.No</th>
                  <th className='p-3'>Title</th>
                  <th className='p-3'>Author</th>
                  <th className='p-3'>Publisher</th>
                  <th className='p-3'>Image</th>
                  <th className='p-3'>Student Name</th>
                  <th className='p-3'>Student Branch</th>
                  <th className='p-3'>...</th>
                </tr>
              </thead>
              <tbody >
                <tr className='border'>
                  <td className='p-3'>1</td>
                  <td className='p-3'>Data Structure</td>
                  <td className='p-3'>Martin Joz</td>
                  <td className='p-3'>AC Books</td>
                  <td className='p-3'>
                    <img
                      width={'100px'}
                      height={'120px'}
                      src="https://rukminim1.flixcart.com/image/1664/1664/book/6/8/0/data-structures-original-imaddm9qk9rehehn.jpeg?q=90"
                      alt="no-image"
                    />
                  </td>
                  <td className='p-3'>aswin</td>
                  <td className='p-3'>computer science</td>
                  <td className='p-3'>
                  <button style={{ border: "solid", borderWidth: "4px" }} className='px-2 py-1 rounded text-center text-dark bg-success'><i class="fa-solid fa-check"></i></button>  
                  <button style={{ border: "solid", borderWidth: "4px" }} className='px-2 ms-2 py-1 rounded text-center text-dark bg-danger'><i class="fa-solid fa-x"></i></button>               
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

export default Requestedbooks