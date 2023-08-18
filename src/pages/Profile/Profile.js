import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GymCard from '../../components/GymCard/GymCard';
import Header from '../../components/Header/Header';
import { UserContext } from '../../App';
import { useContext } from 'react';
import './Profile.scss';

const Profile = () => {

    const navigate = useNavigate();

    const {userId, setUserId} = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true);
    console.log(userId)
    useEffect(() => {
        if (userId) {
            setIsLoading(false);
            if (!userId) {
                navigate('/enter');
            }
        }
    }, [userId, navigate]);

    return (
       isLoading? <h1>LOADING</h1> : 
       <section className='profile'>
            <div className='profile__section'>
                <h1 className='profile__title'>Your Gyms:</h1>
                <GymCard/>
            </div>
            <Header profile={true}/>
        </section>
    );
}

export default Profile;