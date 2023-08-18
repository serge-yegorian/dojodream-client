import './App.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import Main from './pages/Main/Main.js'
import Gyms from './pages/Gyms/Gyms';
import Enter from './pages/Enter/Enter';
import Profile from './pages/Profile/Profile';
import GymPage from './pages/GymPage/GymPage';
import Create from './pages/Create/Create';
import axios from 'axios';

export const ZipContext = createContext();
export const UserContext = createContext();

function App() {

  const [userId, setUserId] = useState(undefined)
  const [zip, setZip] = useState(null)
  const id = localStorage.dojodreamUserId

  useEffect(() => {
    axios.post('http://localhost:4000/users/profile', {id})
    .then((response) => {
      setUserId(response.data.id);
    }).catch((err) => {
      setUserId(undefined)
    })
  }, [])

  return (
    <ZipContext.Provider value={{zip, setZip}}>
      <UserContext.Provider value={{userId, setUserId}}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/gyms' element={<Gyms/>}/>
            <Route path='/gyms/:id' element={<GymPage/>}/>
            <Route path='/enter' element={<Enter/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/create' element={<Create/>}/>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </ZipContext.Provider>
  );
}

export default App;

