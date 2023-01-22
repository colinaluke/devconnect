import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Alert from './components/layout/Alert'

import { Provider } from 'react-redux'
import store from './store'


const App = () => {
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
          </Routes>
        </section>
      </Router>
    </Provider>
  )
}

export default App;
