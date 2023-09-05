import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './GymPage.scss';

const GymPage = () => {
    
    const navigate = useNavigate()

    const [gymData, setGymData] = useState(null);
    const [publicId, setPublicId] = useState(null);

    const gymAddress = useParams().id

    useEffect(() => {
        axios.get(`http://localhost:4000/gyms/${gymAddress}`)
            .then((response) => {
                setGymData(response.data);
                setPublicId(response.data.logo.public_id)
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
                navigate('/')
            });
    }, [gymAddress]);

    
    const toggleChoices = () => {
        const cta = document.querySelector('.gym__button--cta');
        const choices = document.querySelector('.gym__choices');
        const data = document.querySelector('.gym__data');
    
        choices.classList.toggle('gym__choices--display');
        data.classList.toggle('gym__data--hidden');
    
        if (choices.classList.contains('gym__choices--display')) {
            cta.textContent = 'View Gym';
        } else {
            cta.textContent = 'Edit Gym';
        }
    }
    

    return( gymData ? 
        <section className='gym'>
            <div className='gym__data'>
                <div className='gym__top'>
                    <img className='gym__background' src={require('../../assets/images/square.jpeg')}/>
                    <div className='gym__absolute'>
                        <div className='gym__empty'></div>
                        <div className='gym__middle'>
                            <img className='gym__logo' src={require('../../assets/images/logo-type.png')}/>
                            <h1 className='gym__title'>{gymData.name}</h1>
                        </div>
                        <p className='gym__description'>{`${gymData.street}, ${gymData.city}, ${gymData.state} ${gymData.zip}`}</p>
                    </div>
                </div>
                <div className='gym__bottom'>
                    <p className='gym__description'>{gymData.bio}</p>
                </div>
            </div>
            <div className='gym__choices'>
                    <p className='gym__choice' onClick={() => navigate(`/editnameandbio/${gymAddress}`)}>Name, About</p>
                    <p className='gym__choice' onClick={() => navigate(`/editphoneandemail/${gymAddress}`)}>Phone, Email</p>
                    <p className='gym__choice' onClick={() => navigate(`/addimages/${gymAddress}`)}>Logo, Background, Schedule</p>
                    <p className='gym__choice'>Address</p>
                    <p className='gym__choice' onClick={() => navigate(`/addlinks/${gymAddress}`)}>Social Media Links</p>
                    <p className='gym__choice'>Coaches</p>
                </div>
            
            <nav className='gym__nav'>
                <button onClick={()=>{navigate(-1)}} type='button' className='gym__button gym__button--secondary'>Back</button>
                <button className='gym__button gym__button--cta' onClick={toggleChoices}>Edit Gym</button>
            </nav>
        </section> : ''
    )}

export default GymPage;