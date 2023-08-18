import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './GymPage.scss';

const GymPage = () => {

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
            });
    }, [gymAddress]);

    return(
        <section className='gym'>
            <h1 className='gym__title'>{gymData.name}</h1>
            <p className='gym__description'>{gymData.bio}</p>
            <p className='gym__info'>{gymData.phone}</p>
            <p className='gym__info'>{gymData.email}</p>
        </section>
    );
}

export default GymPage;