import Navbar from './components/shared/Navbar';
import Home from './pages/Home';
import './styles/tailwind.css'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import Payment from './pages/Payment';
import MyLibrary from './pages/MyLibrary';
import MyCourse from './pages/MyCourse';
import Video from './pages/Video';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { profile } from './api';
import { setAuth } from './store/authSlice';
import Loading from './components/shared/Loading';

function App() {

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function getUserDetails() {
      try {
        const { data } = await profile()
        dispatch(setAuth({ isAuth: true, user: data.user }))
        setLoading(false)

      } catch (error) {
        setLoading(false)
      }
    }
    
    getUserDetails()

  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/courses' element={<Courses />} />
          <Route exact path='/details/:_id' element={<CourseDetails />} />
          <Route exact path='/payment/:_id' element={
            <AuthRoute>
              <Payment />
            </AuthRoute>
          } />
          <Route exact path='/my-library' element={
            <AuthRoute>
              <MyLibrary />
            </AuthRoute>
          } />
          <Route exact path='/my-courses/:_id' element={
            <AuthRoute>
              <MyCourse />
            </AuthRoute>
          } />
          <Route exact path='/video/:_id' element={
            <AuthRoute>
              <Video />
            </AuthRoute>
          } />
        </Routes>
      </Router>
    </>
  );
}

const AuthRoute = ({ children }) => {

  const { isAuth } = useSelector((state) => state.auth)
  console.log(isAuth);

  if (isAuth) {
    return children
  }

  return <Navigate to={'/login'} />

}

export default App;
