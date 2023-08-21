import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GymCard from '../../components/GymCard/GymCard';
import Header from '../../components/Header/Header';
import axios from 'axios';
import './Profile.scss';

const Profile = () => {

    const navigate = useNavigate();

    const [userId, setUserId] = useState(null)
    const id = localStorage.dojodreamUserId

    useEffect(() => {
        axios.post('http://localhost:4000/users/profile', {id})
        .then((response) => {
          setUserId(response.data.id);
        }).catch((err) => {
            console.log(err)
            navigate('/enter')
        })
      }, [])

    return (
       userId ? 
       <section className='profile'>
            <div className='profile__section'>
                <h1 className='profile__title'>Your Gyms:</h1>
                <GymCard/>
            </div>
            <Header profile={true}/>
        </section> : ''
    );
}

export default Profile;