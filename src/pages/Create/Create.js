import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Create.scss';

const Create = () => {
    const navigate = useNavigate()
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
            }))
            console.log(gym)
            // send the gym
            axios.post('http://localhost:4000/gyms/creategym', gym)
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
        zip: ''
    })

    return (
        userId ? <form className='create' onSubmit={getlnglat}>
            <div className='create__content'>
                <h1 className='create__title'>Publish Your Gym:</h1>
                <div className='create__form'>
                    <div className='create__input-div'>
                        <input className='create__input' name='name' id='name' onChange={handleChange}/>
                        <label htmlFor='name'>Name:</label>
                    </div>
                    <div className='create__input-div'>
                        <textarea className='create__input' name='bio' id='bio' onChange={handleChange}>
                        </textarea>
                        <label htmlFor='bio'>About:</label>
                    </div>
                    <div className='create__input-div'>
                        <input className='create__input' name='email' id='email' onChange={handleChange}/>
                        <label htmlFor='email'>Email:</label>
                    </div>
                    <div className='create__input-div'>
                        <input className='create__input' name='phone' id='phone' onChange={handleChange}/>
                        <label htmlFor='phone'>Phone:</label>
                    </div>
                    <div className='create__input-div'>
                        <input className='create__input' name='street' id='street' onChange={handleChange}/>
                        <label htmlFor='street'>Street:</label>
                    </div>
                    <div className='create__input-div'>
                        <input className='create__input' name='city' id='city' onChange={handleChange}/>
                        <label htmlFor='city'>City:</label>
                    </div>
                    <div className='create__input-div'>
                        <input className='create__input' name='state' id='state' onChange={handleChange}/>
                        <label htmlFor='state'>State:</label>
                    </div>
                    <div className='create__input-div'>
                        <input className='create__input' name='zip' id='zip' onChange={handleChange}/>
                        <label htmlFor='zip'>Zip:</label>
                    </div>
                </div>
            </div>
            <nav className='create__nav'>
                <button className='create__back' type='button' onClick={()=>{navigate(-1)}}>Back</button>
                <button className='create__cta' type='submit'>Add</button>
            </nav>
        </form> : ''
    );
}

export default Create;