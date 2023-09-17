import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Create.scss';

const Create = () => {
    const navigate = useNavigate()
    const [userId, setUserId] = useState(null)
    const id = localStorage.dojodreamUserId

    useEffect(() => {
        axios.post('https://king-prawn-app-9vmwa.ondigitalocean.app/users/profile', {id})
        .then((response) => {
          setUserId(response.data.id);
        }).catch((err) => {
            console.log(err)
            navigate('/enter')
        })
      }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGym({ ...gym, [name]: value });
    }

    // get lat and lng
    const getlnglat = (e) => {
        const apiKey = 'AIzaSyBJcR7SgvoNRntpoA0YbVsxFPxcI9RPl8M';
        const address = `${gym.street}, ${gym.city}, ${gym.state} ${gym.zip}`;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
        e.preventDefault()
        axios.get(url)
        .then((response) => {
            const target = response.data.results[0].geometry.location;
            setGym((prevGym)=>({
                ...prevGym,
                location: {
                    type: "Point",
                    coordinates: [target.lng, target.lat], // Notice the order: [longitude, latitude]
                },
                gymOwner: userId,
            }))
            console.log(gym)
            // send the gym
            axios.post('https://king-prawn-app-9vmwa.ondigitalocean.app/gyms/creategym', gym)
            .then((res) =>{
                const gymAddress = res.data._id;
                navigate(`/gyms/${gymAddress}`)
            })
            .catch((err) => {
                console.log(err)
            })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const [gym, setGym] = useState({
        name: '',
        bio: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zip: '',
    })

    return (
        userId ? <form className='create' onSubmit={getlnglat}>
            <div className='create__content'>
                <div className='create__top'>
                    <h1 className='create__title'>dojodream</h1>
                    <h2 className='create__heading'>Publish Your Gym:</h2>
                </div>
                <div className='create__form'>
                    <div className='create__form-section'>
                        <div className='create__input-div'>
                            <input required minLength='3' className='create__input' name='name' id='name' onChange={handleChange}/>
                            <label className='create__label' htmlFor='name'>Name:</label>
                        </div>
                        <div className='create__input-div'>
                            <textarea required className='create__input create__input--textarea' rows='12' name='bio' id='bio' maxLength="330" onChange={handleChange}>
                            </textarea>
                            <label className='create__label' htmlFor='bio'>About:</label>
                        </div>
                    </div>
                    <div className='create__form-section'>
                        <div className='create__input-div'>
                            <input required className='create__input' type="email" name='email' id='email' onChange={handleChange}/>
                            <label className='create__label' htmlFor='email'>Email:</label>
                        </div>
                        <div className='create__input-div'>
                            <input required className='create__input' name='phone' minLength={10} maxLength="10" id='phone' onChange={handleChange}/>
                            <label className='create__label' htmlFor='phone'>Phone:</label>
                        </div>
                    </div>
                    <div className='create__form-section'>
                        <div className='create__container'>
                            <div className='create__input-div'>
                                <input required className='create__input' name='street' id='street' onChange={handleChange}/>
                                <label className='create__label' htmlFor='street'>Street:</label>
                            </div>
                            <div className='create__input-div'>
                                <input required className='create__input' name='city' id='city' onChange={handleChange}/>
                                <label className='create__label' htmlFor='city'>City:</label>
                            </div>
                        </div>
                        <div className='create__container'>
                            <div className='create__input-div'>
                                <input required className='create__input' name='state' id='state' onChange={handleChange}/>
                                <label className='create__label' htmlFor='state'>State:</label>
                            </div>
                            <div className='create__input-div'>
                                <input required className='create__input' name='zip' id='zip' minLength={5} maxLength="5" onChange={handleChange}/>
                                <label className='create__label' htmlFor='zip'>Zip:</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <nav className='create__buttons'>
                <button className='create__button create__button--secondary' type='button' onClick={()=>{navigate(-1)}}>Back</button>
                <button className='create__button create__button--cta' type='submit'>Add</button>
            </nav>
        </form> : ''
    );
}

export default Create;