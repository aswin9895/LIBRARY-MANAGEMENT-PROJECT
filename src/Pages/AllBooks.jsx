import React from 'react'
import Header from '../Components/Header'
import mystyle from '../Components/Style.module.css'
import EditBook from '../Components/EditBook'
import Footer from '../Components/Footer'

const AllBooks = ({ insideAdmin }) => {
  return (
    <div>
      {
        insideAdmin ?
          <Header AdminHeader={true} />
          :
          <Header />
      }
      <div style={{ paddingTop: "170px", backgroundColor: "black", minHeight: "100vh" }}>
        <h1 style={{ backgroundColor: "#3D3D4A", border: "none", borderRadius: "10px" }} className='container d-flex justify-content-center text-light text-center py-1 w-75 fw-bolder'>
          ALL AVAILABLE BOOKS IN LIBRARY
        </h1>
        <input type="text" placeholder='Search Book By Name' className='container w-50 mt-3 py-2 rounded fw-bold d-flex justify-content-center' style={{ borderWidth: "5px" }} />

        <div className='mt-3 container-fluid'>
          <div className={mystyle.tableresponsive}>
            <table className='table bg-light'>
              <thead style={{ fontSize: "18px" }} className='text-dark fw-bolder border shadow'>
                <tr>
                  <th className='p-3'>Sl.No</th>
                  <th className='p-3'>Title</th>
                  <th className='p-3'>Author</th>
                  <th className='p-3'>Publisher</th>
                  <th className='p-3'>Image</th>
                  <th className='p-3'>Copies</th>
                  <th className='p-3'>Status</th>
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
                  <td className='p-3'>15</td>
                  <td className='p-3'>Available</td>
                  <td className='p-3'>

                    {insideAdmin ?
                      <EditBook />
                      :
                      <button style={{ backgroundColor: "lightgreen" }} className='px-2 py-1 rounded fw-bolder'>Request</button>
                    }
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

export default AllBooks