import React from 'react'
import Header from '../../Components/Header'
import mystyle from '../../Components/Style.module.css'
import Footer from '../../Components/Footer'
import SearchBook from '../../Components/SearchBook'

const IssuedBooks = () => {
  return (
    <div>
      <Header AdminHeader={true} />
      <div style={{ paddingTop: "170px", backgroundColor: "black", minHeight: "100vh" }}>
        <h1 style={{ backgroundColor: "#3D3D4A", border: "none", borderRadius: "10px" }} className='container d-flex justify-content-center text-light text-center py-1 w-75 fw-bolder'>
          ISSUED BOOKS
        </h1>
        <SearchBook />
        <div className='mt-3 container-fluid'>
          <div className={mystyle.tableresponsive}>
            <table className='table bg-light'>
              <thead style={{ fontSize: "18px" }} className='text-dark fw-bolder border shadow'>
                <tr>
                  <th className='p-3'>Sl.No</th>
                  <th className='p-3'>Title</th>
                  <th className='p-3'>Author</th>
                  <th className='p-3'>Image</th>
                  <th className='p-3'>Student name</th>
                  <th className='p-3'>Branch</th>
                  <th className='p-3'>Issued date</th>
                  <th className='p-3'>Return date</th>
                  <th className='p-3'>Dues</th>
                  <th className='p-3'>...</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='p-3'>1</td>
                  <td className='p-3'>Data Structure</td>
                  <td className='p-3'>Martin Joz</td>
                  <td className='p-3'>
                    <img
                      width={'100px'}
                      height={'120px'}
                      src="https://rukminim1.flixcart.com/image/1664/1664/book/6/8/0/data-structures-original-imaddm9qk9rehehn.jpeg?q=90"
                      alt="no-image"
                    />
                  </td>
                  <td className='p-3'>Aswin</td>
                  <td className='p-3'>Computer Science</td>
                  <td className='p-3'>20-10-29</td>
                  <td className='p-3'>21-11-22</td>
                  <td className='p-3'>120</td>

                  <td className='p-3'>
                    <button style={{ backgroundColor: "lightseagreen" }} className='text-light px-2 py-1 rounded fw-bolder'>Returned</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}

export default IssuedBooks