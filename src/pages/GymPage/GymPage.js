import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './GymPage.scss';
import { FiCopy } from "react-icons/fi";
import { BsLink45Deg } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const GymPage = () => {
    
    const navigate = useNavigate()

    const [gymData, setGymData] = useState(null);
    const [publicId, setPublicId] = useState(null);
    const [coaches, setCoaches] = useState(null)

    const gymAddress = useParams().id

    useEffect(() => {
        axios.get(`https://king-prawn-app-9vmwa.ondigitalocean.app/gyms/${gymAddress}`)
            .then((response) => {
                setGymData(response.data);
                if (response.data.logo){setPublicId(response.data.logo.public_id)};
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

    const toggleSchedule = (e) => {
        e.preventDefault()
        const cta = document.querySelector('.gym__show-schedule')
        const schedule = document.querySelector('.gym__schedule')
        const imageDiv = document.querySelector('.gym__image-div')

        schedule.classList.toggle('gym__schedule--open')
        cta.classList.toggle('gym__show-schedule--active')
        imageDiv.classList.toggle('gym__image-div--active')

    }

    const toggleIcon = (e) => {
        e.preventDefault();
        const icon = document.querySelector('.gym__icon')
        icon.classList.toggle('gym__icon--active')
    }

    const copyAddress = (e) => {
        e.preventDefault()
        copy(`${gymData.street}, ${gymData.city}, ${gymData.state}, ${gymData.zip}`);
    }

    const copy = (text) => {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        // Make the textarea out of the viewport to prevent it from being visible
        textArea.style.position = 'fixed';
        textArea.style.top = '-9999px';
      
        document.body.appendChild(textArea);
        textArea.select();
      
        // Copy the text to the clipboard
        document.execCommand('copy');
      
        // Clean up by removing the textarea
        document.body.removeChild(textArea);
      
        toast.success('Address Copied!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
            });
      };

    const deleteGym = (e) => {
        e.preventDefault();
        axios.post('https://king-prawn-app-9vmwa.ondigitalocean.app/gyms/deletegym', {gymAddress})
        .then((res)=>{
            console.log(res)
            alert('Deleted Successfully!')
            navigate(-1)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    

    return( gymData ? 
        <section className='gym'>
            <div className='gym__data'>
                <div className='gym__top'>
                    <img alt="background" className='gym__background' src={gymData.background? gymData.background.url : require('../../assets/images/square.jpeg')}/>
                    <div className='gym__absolute'>
                        <div className='gym__middle'>
                            <div className='gym__logo' style={{ backgroundImage: `url(${gymData.logo? gymData.logo.url : '../../assets/images/logo-type.png'})` }}></div>
                            <h1 className='gym__title'>{gymData.name}</h1>
                        </div>
                    </div>
                </div>
                <div className='gym__bottom'>
                    <div className='gym__content'>
                    <div className='gym__address-div' onMouseEnter={toggleIcon} onMouseLeave={toggleIcon} onClick={copyAddress}>
                        <p className='gym__description gym__description--address'>{`${gymData.street},`}</p>
                        <p className='gym__description gym__description--address'>{`${gymData.city},`}</p>
                        <p className='gym__description gym__description--address'>{`${gymData.state} ${gymData.zip}`} <span className='gym__icon'><FiCopy/></span></p>
                    </div>
                    <p className='gym__description'>{gymData.bio}</p>
                    {gymData.schedule && <button type='button' onClick={toggleSchedule} className='gym__show-schedule'>Schedule</button>}
                    {gymData.schedule && <div className='gym__image-div'><img alt="schedule" className='gym__schedule' src={gymData.schedule.url} /></div>}
                    </div>
                    { gymData.insta || gymData.facebook || gymData.website ?
                        <div className='gym__media'>
                        <h3 className='gym__subheading gym__subheading--contact'>Contact:</h3>
                        <div className='gym__media-content'>
                            <div className='gym__button--regular' onClick={copyAddress}>Share URL</div>
                            {gymData.website && <a href={gymData.website} target="_blank" className="gym__website">Website<BsLink45Deg className='gym__link-icon'/></a>}
                            <div className='gym__media-icons'>
                                {gymData.insta && <a href={gymData.insta} target="_blank" className="gym__media-link"><img alt="insta" className='gym__media-icon' src={require('../../assets/images/insta.png')}/></a>}
                                {gymData.facebook && <a href={gymData.insta} target="_blank" className="gym__media-link"><img alt="facebook" className='gym__media-icon' src={require('../../assets/images/facebook.png')}/></a>}
                                {gymData.smoothcomp && <a href={gymData.smoothcomp} target="_blank" className="gym__media-link"><img alt="smoothcomp" className='gym__media-icon' src={require('../../assets/images/smoothcomp.png')}/></a>}
                                {gymData.tapology && <a href={gymData.tapology} target="_blank" className="gym__media-link"><img alt="tapology" className='gym__media-icon' src={require('../../assets/images/tapology.png')}/></a>}
                            </div>
                        </div>
                    </div> : ''
                    } 
                    {coaches && coaches.map((coach)=>(
                        <div className='gym__coaches'>
                            <h2 className='gym__subheading'>Coaches:</h2>
                            <div className='gym__coach'>
                                <img alt="coach" className='gym__coach-image' src={coach.image.url}/>
                                <div className='gym__coach-description'>
                                    <p className='gym__coach-name'>{coach.name}</p>
                                    <p className='gym__coach-bio'>{coach.bio}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='gym__choices'>
                    <p className='gym__choice gym__choice--delete'onClick={deleteGym}>Delete Gym</p>
                    <p className='gym__choice' onClick={() => navigate(`/editnameandbio/${gymAddress}`)}>Name, About</p>
                    <p className='gym__choice' onClick={() => navigate(`/editphoneandemail/${gymAddress}`)}>Phone, Email</p>
                    <p className='gym__choice' onClick={() => navigate(`/addimages/${gymAddress}`)}>Logo, Background, Schedule</p>
                    <p className='gym__choice' onClick={() => navigate(`/editaddress/${gymAddress}`)}>Address</p>
                    <p className='gym__choice' onClick={() => navigate(`/addlinks/${gymAddress}`)}>Social Media Links</p>
                    <p className='gym__choice'onClick={() => navigate(`/addcoaches/${gymAddress}`)}>Coaches</p>
                </div>
            
            <nav className='gym__nav'>
                <button onClick={()=>{navigate(-1)}} type='button' className='gym__button gym__button--secondary'>Back</button>
                <button className='gym__button gym__button--cta' onClick={toggleChoices}>Edit Gym</button>
            </nav>
            <ToastContainer/>
        </section> : ''
        
    )}

export default GymPage;