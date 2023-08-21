import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './GymPage.scss';

const GymPage = () => {
    
    const navigate = useNavigate()

    const [gymData, setGymData] = useState(null)

    const gymAddress = useParams().id

    useEffect(() => {
        axios.get(`http://localhost:4000/gyms/${gymAddress}`)
            .then((response) => {
                setGymData(response.data);
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
                navigate('/')
            });
    }, [gymAddress]);

    return(
        <section className='gym'>
            <div className='gym__data'>
                <h1 className='gym__title'>{gymData? gymData.name : ''}</h1>
                <p className='gym__description'>{gymData?gymData.bio : ''}</p>
                <p className='gym__info'>{gymData?gymData.phone : ''}</p>
                <p className='gym__info'>{gymData?gymData.email : ''}</p>
                <p className='gym__info'>{gymData?gymData.street : ''}</p>
                <p className='gym__info'>{gymData?gymData.city : ''}</p>
                <p className='gym__info'>{gymData?gymData.state : ''}</p>
                <p className='gym__info'>{gymData?gymData.zip : ''}</p>
            </div>
            <nav className='gym__nav'>
                <button onClick={()=>{navigate(-1)}} type='button' className='gym__button'>Back</button>
                <button className='gym__button gym__button--cta'>Edit Gym</button>
            </nav>
        </section>
    );
}

export default GymPage;