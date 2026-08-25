import React, { useEffect } from 'react'
import { NavLink, useNavigate, Routes, Route  } from "react-router-dom";import Homepage from './pages/Home'
import Doctor from './pages/Doctor'
import Login from "./pages/Login"
import Contact from './pages/Contact'
import Myprofile from './pages/Myprofile'
import MyAppointment from './pages/MyAppointment'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import About from './pages/About'
import Logout from './pages/Logout'
import Footer from './components/Footer';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import AddDoctorAdmin from './pages/AddDoctorAdmin';
import { useDispatch, useSelector} from "react-redux"
import { checkAdminAuth } from './adminAuthSlice';
import AdminDashborad from './pages/AdminDashborad';
import DoctorsList from './pages/DoctorsList';
import { checkUserAuth } from './userAuthSlice';
import AdminAppointments from './pages/AdminAppointments';
const App = () => {
const {isAdminAuthenticated,loading,errors,user}  = useSelector((state)=>state.adminAuth)
const dispatch = useDispatch()

useEffect(() => {
  dispatch(checkAdminAuth());
  dispatch(checkUserAuth())
}, [dispatch]);



// useEffect(() => {
//   dispatch(checkUser());
// }, [dispatch]);

// if(loading){
//   return <div className="min-h-screen flex items-center justify-center">
//     <span className="loading loading-spinner loading-lg"></span>
//   </div>

// }
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar></Navbar>
    <Routes>
      <Route path='/' element={ <Homepage></Homepage>}></Route>
      <Route path='/doctors' element={<Doctor></Doctor>}></Route>
      <Route path='/doctors/:speciality' element={<Doctor></Doctor>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/contact' element={<Contact></Contact>}></Route>
      <Route path='/my-profile' element={<Myprofile></Myprofile>}></Route>
      <Route path='/my-appointments' element={<MyAppointment></MyAppointment>}></Route>
      {/* <Route path='/my-appointments' element={<MyAppointment></MyAppointment>}></Route> */}
      <Route path='/appointment/:docId' element={<Appointment></Appointment>}></Route>
      <Route path='/about' element={<About></About>}></Route>
      <Route path='/logout' element={<Logout></Logout>}></Route>
      <Route path='/signup' element={<Signup></Signup>}></Route>
      <Route path='/admin' element={<Admin></Admin>}></Route>
      <Route path='/adddoctoradmin' element={<AddDoctorAdmin></AddDoctorAdmin>}></Route>
      <Route path='/admindashboard' element={<AdminDashborad></AdminDashborad>}></Route>
      <Route path='/admin/doctors' element={<DoctorsList></DoctorsList>}></Route>
      <Route path='/admin/appointments' element={<AdminAppointments></AdminAppointments>}></Route>
    </Routes>
    <Footer></Footer>
    </div>
    
  )
}

export default App