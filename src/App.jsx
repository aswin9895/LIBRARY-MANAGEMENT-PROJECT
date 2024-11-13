import { Route, Routes } from 'react-router'
import './App.css'
import LandingPage from './Pages/LandingPage'
import Auth from './Pages/Auth'
import AllBooks from './Pages/AllBooks'
import RecommendBooks from './Pages/User/RecommendBooks'
import IssuedBooks from './Pages//User/IssuedBooks'
import UpdateProfile from './Pages/User/UpdateProfile'
import Requestedbooks from './Pages/Admin/Requestedbooks'
import IssuedBooksAdmin from './Pages/Admin/IssuedBooksAdmin'
import ManageStudent from './Pages/Admin/ManageStudent'
import RecommendedBooks from './Pages/Admin/RecommendedBooks'
import AddBook from './Pages/Admin/AddBook'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth insideRegister={true} />} />
        <Route path='/allbooks' element={<AllBooks />} />
        <Route path='/allbooksadmin' element={<AllBooks insideAdmin={true}/>} />
        <Route path='/recommendbooks' element={<RecommendBooks />} />
        <Route path='/issuedbooks' element={<IssuedBooks />} />
        <Route path='/updateprofile' element={<UpdateProfile />} />
        <Route path='/requestedbooks' element={<Requestedbooks />} />
        <Route path='/issuedbooksbyadmin' element={<IssuedBooksAdmin />} />
        <Route path='/managestudent' element={<ManageStudent />} />
        <Route path='/recommendedbooks' element={<RecommendedBooks />} />
        <Route path='/addbook' element={<AddBook />} />
      </Routes>
    </>
  )
}

export default App
