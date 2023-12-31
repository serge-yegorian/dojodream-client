import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GymCard from '../../components/GymCard/GymCard';
import Header from '../../components/Header/Header';
import axios from 'axios';
import './Profile.scss';

const Profile = () => {

    const navigate = useNavigate();

    const [gyms, setGyms] = useState([])
    const [userId, setUserId] = useState(null)
    const id = localStorage.dojodreamUserId
    console.log(id)

    const create = () => {
      navigate('/create')
    }
    
    useEffect(() => {
        axios.post('https://king-prawn-app-9vmwa.ondigitalocean.app/users/profile', {id})
        .then((response) => {
          setUserId(response.data.id)
          console.log(response.data)
          console.log(userId)
          axios.get('https://king-prawn-app-9vmwa.ondigitalocean.app/gyms/mygyms/' + response.data.id)
          .then((res)=>{
            setGyms(res.data)
          })
          .catch((error)=>{
            console.log(error)
          })
        }).catch((err) => {
            console.log(err)
            navigate('/enter')
        })
      }, [])

    return (
       <section className='profile'>
            <div className='profile__section'>
                <h1 className='profile__title'>dojodream</h1>
               {gyms.length >= 1
               ?
               <>
                <h2 className='profile__heading'>Your Gyms:</h2>
                  <div className='profile__gyms'>
                      {gyms.map((gym) => (
                          <GymCard key={gym._id} {...gym}/>
                      ))}
                      {gyms === null ? <h2 className='profile__heading'>You do not have any gyms, but can always add one</h2> : ''}
                  </div>
                </> 
                : 
                <>
                  <h2 className='profile__heading'>You have no gyms:</h2>
                  <button onClick={create} className='profile__cta'>Add Gym</button>
                </>
                } 
            </div>
            <Header profile={true}/>
        </section>
    );
}

export default Profile;