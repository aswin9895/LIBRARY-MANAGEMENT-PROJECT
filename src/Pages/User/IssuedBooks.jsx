import React from 'react'
import Header from '../../Components/Header'
import mystyle from '../../Components/Style.module.css'
import Footer from '../../Components/Footer'

const IssuedBooks = () => {
  return (
    <div>
      <Header />
      <div style={{ paddingTop: "170px", backgroundColor: "black", minHeight: "100vh" }}>
        <h1 style={{ backgroundColor: "#3D3D4A", border: "none", borderRadius: "10px" }} className='container text-center d-flex justify-content-center text-light py-1 fw-bolder w-75'>
          MY ISSUED BOOKS
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
                  <th className='p-3'>Issued Date</th>
                  <th className='p-3'>Return Date</th>
                  <th className='p-3'>Fine</th>
                  <th className='p-3'>...</th>
                </tr>
              </thead>
              <tbody>
                <tr>
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
                  <td className='p-3'>20-10-2009</td>
                  <td className='p-3'>20-10-2009</td>
                  <td className='p-3'>₹<span>20</span></td>
                  <td className='p-3'>
                  <button style={{ backgroundColor: "red", border: "none" }} className='text-light px-2 py-1 rounded fw-bolder'>Return</button>                 
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

export default IssuedBooks