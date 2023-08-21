import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createContext, useState } from 'react';
import Main from './pages/Main/Main.js'
import Gyms from './pages/Gyms/Gyms';
import Enter from './pages/Enter/Enter';
import Profile from './pages/Profile/Profile';
import GymPage from './pages/GymPage/GymPage';
import Create from './pages/Create/Create';

export const ZipContext = createContext();

function App() {

  const [zip, setZip] = useState(null)

  return (
    <ZipContext.Provider value={{zip, setZip}}>
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
    </ZipContext.Provider>
  );
}

export default App;

