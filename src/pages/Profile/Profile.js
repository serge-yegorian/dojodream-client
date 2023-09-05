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

    useEffect(() => {
        axios.post('http://localhost:4000/users/profile', {id})
        .then((response) => {
          setUserId(response.data.id)
          console.log(response.data)
          console.log(userId)
          console.log(userId)
          axios.get('http://localhost:4000/gyms/mygyms/' + response.data.id)
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
                <h2 className='profile__heading'>Your Gyms:</h2>
                <div className='profile__gyms'>
                    {gyms.map((gym) => (
                        <GymCard key={gym._id} {...gym}/>
                    ))}
                    {gyms === null ? <h2 className='profile__heading'>You do not have any gyms, but can always add one</h2> : ''}
                </div>
            </div>
            <Header profile={true}/>
        </section>
    );
}

export default Profile;