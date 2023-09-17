import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createContext, useState } from 'react';
import Main from './pages/Main/Main.js'
import Gyms from './pages/Gyms/Gyms';
import Enter from './pages/Enter/Enter';
import Profile from './pages/Profile/Profile';
import GymPage from './pages/GymPage/GymPage';
import Create from './pages/Create/Create';
import AddImages from './pages/AddImages/AddImages';
import EditNameBio from './pages/EditNameBio/EditNameBio';
import AddLinks from './pages/AddLinks/AddLinks';
import EditPhoneEmail from './pages/EditPhoneEmail/EditPhoneEmail';
import EditAddress from './pages/EditAddress/EditAddress';
import EditCoach from './pages/EditCoach/EditCoach';
import CheckCoaches from './pages/CheckCoaches/CheckCoaches';
import CreateCoach from './pages/CreateCoach/CreateCoach';
import Landing from './pages/Landing/Landing';

export const ZipContext = createContext();

function App() {

  const [zip, setZip] = useState('33062')

  return (
      <ZipContext.Provider value={{zip, setZip}}>
          <BrowserRouter>
          <Routes>
            <Route path='/' element={<Landing/>}/>
          </Routes>
          <main className='app'>
            <Routes>
              <Route path='/main' element={<Main/>}/>
              <Route path='/gyms' element={<Gyms/>}/>
              <Route path='/gyms/:id' element={<GymPage/>}/>
              <Route path='/enter' element={<Enter/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/create' element={<Create/>}/>
              <Route path='/addimages/:id' element={<AddImages/>}/>
              <Route path='/editnameandbio/:id' element={<EditNameBio/>}/>
              <Route path='/addlinks/:id' element={<AddLinks/>}/>
              <Route path='/editphoneandemail/:id' element={<EditPhoneEmail/>}/>
              <Route path='/addlinks/:id' element={<AddLinks/>}/>
              <Route path='/editaddress/:id' element={<EditAddress/>}/>
              <Route path='/coaches/:id' element={<EditCoach/>}/>
              <Route path='/addcoaches/:id' element={<CheckCoaches/>}/>
              <Route path='/createcoach/:id' element={<CreateCoach/>}/>
            </Routes>
            </main>
          </BrowserRouter>
          
      </ZipContext.Provider>
  );
}

export default App;

