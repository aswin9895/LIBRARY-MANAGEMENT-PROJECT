import React from 'react'

const SearchBook = () => {
    return (
        <div>
            <input type="text" placeholder='Search Book By Name' className='container w-50 mt-3 py-2 rounded fw-bold d-flex justify-content-center' style={{ borderWidth: "5px" }} />
        </div>
    )
}

export default SearchBook