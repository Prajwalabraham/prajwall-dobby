import './App.css';
import React, {useState} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './components/Login'
import Protected from './Protected'
import Upload from './components/Upload'
import { AuthProvider } from './components/auth'
import View from './components/View'

function App() {

  /*const [isLoggedIn, setisLoggedIn] = useState({
    isLoggedIn: localStorage.getItem('isLoggedIn')
  });*/
  

  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route
          path="/Upload"
          element={
            <Protected>
              <Upload />
            </Protected>
          }
        />
        <Route
          path="/View"
          element={
            <Protected>
              <View />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
    </AuthProvider>


  );
}

export default App;
