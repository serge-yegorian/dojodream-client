import './CheckCoaches.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const CheckCoaches = () => {

    const navigate = useNavigate();
    const gymAddress = useParams().id;
    const [coaches, setCoaches] = useState([]);

    useEffect(() => {
        axios.get(`https://king-prawn-app-9vmwa.ondigitalocean.app/gyms/${gymAddress}`)
            .then((response) => {
                console.log(response.data);
                const coachIds = (response.data.coaches);
                coachIds && axios.post(`https://king-prawn-app-9vmwa.ondigitalocean.app/coaches/findcoaches`, coachIds)
                .then((res)=>{
                    setCoaches(res.data)
                })
                .catch((err)=>{
                    console.log(err)
                })
            })
            .catch((error) => {
                console.log(`step 1 error: ${error}`);
                // navigate('/')
            });
    }, []);
    console.log(coaches)
    return (

        <section className='check'>
            <div className='check__top'>
                <h1 className='check__title'>dojodream</h1>
                <h2 className='check__heading'>Current Coaches:</h2>
            </div>
            <div className='check__content'>
                {coaches.map((coach)=>(
                    <div className='check__coach' key={coach._id} onClick={()=>{navigate(`/coaches/${coach._id}`)}}>
                        <h3 className='check__coach-name'>{coach.name}</h3>
                        <img className='check__coach-image' src={coach.image.url}/>
                    </div>
                ))}
            </div>
            <nav className='create__buttons'>
                <button className='create__button create__button--secondary' type='button' onClick={()=>{navigate(-1)}}>Back</button>
                <button className='create__button create__button--cta' type='submit' onClick={()=>{navigate(`/createcoach/${gymAddress}`)}}>Add</button>
            </nav>
        </section>
        
    );
}

export default CheckCoaches;