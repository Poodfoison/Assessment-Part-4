import './App.css';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"

import  Home  from './components/Home.jsx';
import Dashboard from './components/Dashboard';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const setAuth = boolean => {

    setIsAuthenticated(boolean)

  }
  return (

<Router>
  
    <Routes>
    <Route exact path='/' element={!isAuthenticated ? (<Home setAuth={setAuth}/> ): (
        <Navigate to='/dashboard'/>
      ) } ></Route>
    <Route exact path='/dashboard' element={isAuthenticated ? (<Dashboard setAuth={setAuth}/> ): (
        <Navigate to='/'/> 
      ) } ></Route>
    </Routes>
    

</Router>

  );
}

export default App;