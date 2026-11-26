import { Route, Routes } from 'react-router-dom'
import Home from './pages/adminPages/Home'
import Login from './pages/adminPages/Login'
import Register from './pages/adminPages/Register'
import { Toaster } from "react-hot-toast"
import Dashboard from './pages/adminPages/Dashboard'
import Profile from './pages/adminPages/Profile'
import Skills from './pages/adminPages/Skills'
import Projects from './pages/adminPages/Projects'
import Experience from './pages/adminPages/Experience'
import Certifications from './pages/adminPages/Certifications'

const App = () => {
  return (
    <>
    <Toaster />
      <Routes>
        <Route path="/admin" element={<Home />}>
        <Route index element={<Dashboard />} />
        <Route path='profile' element={<Profile />} />
        <Route path='experience' element={<Experience />} />
        <Route path='projects' element={<Projects />} />
        <Route path='skills' element={<Skills />} />
         <Route path='certifications' element={<Certifications />} />

        </Route>

        {/** Separate Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/register" element={<Register />} />
      </Routes> 
    </>
  );
};

export default App;