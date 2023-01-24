import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/layout/Dashboard';
import Alert from './components/layout/Alert'
import PrivateRoute from './components/routing/PrivateRoute'
import CreateProfile from './components/profile-form/CreateProfile';
import EditProfile from './components/profile-form/EditProfile';
import { useEffect } from 'react';
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import AddExperience from './components/profile-form/AddExperience';
import AddEducation from './components/profile-form/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Post from './components/posts/Post';

if(localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, []);

  return (
    <Provider store = { store }>
      <Router>
        <Navbar />
        <section className="container">
          <Alert />
          <Routes>
              <Route exact path='/' element={<Landing />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/register' element={<Register />} />
              <Route exact path='/profiles' element={<Profiles />} />
              <Route exact path='/profile/:id' element={<Profile />} />
              <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute> } />
              <Route path='/create-profile' element={<PrivateRoute><CreateProfile /></PrivateRoute> } />
              <Route path='/edit-profile' element={<PrivateRoute><EditProfile /></PrivateRoute> } />
              <Route path='/add-experience' element={<PrivateRoute><AddExperience /></PrivateRoute> } />
              <Route path='/add-education' element={<PrivateRoute><AddEducation /></PrivateRoute> } />
              <Route path='/posts' element={<PrivateRoute><Post /></PrivateRoute> } />
          </Routes>
        </section>
      </Router>
    </Provider>
  )
}

export default App;
