import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createContext, useState } from 'react';
import Main from './pages/Main/Main.js'
import Gyms from './pages/Gyms/Gyms';

export const ZipContext = createContext();


function App() {

  const [zip, setZip] = useState('null')

  return (
    <ZipContext.Provider value={{zip, setZip}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/gyms' element={<Gyms/>}/>
        </Routes>
      </BrowserRouter>
    </ZipContext.Provider>
  );
}

export default App;

