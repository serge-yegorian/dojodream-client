import axios from 'axios';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Create.scss';

const Create = () => {

    const [gym, setGym] = useState({
        name: '',
        email: '',
        phone: '',
        bio: ''
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGym({ ...gym, [name]: value });
    }

    const createGym = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/gyms/creategym', gym)
        .then((response) =>{
            const gymAddress = response.data._id;
            navigate(`/gyms/${gymAddress}`)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <form className='create' onSubmit={createGym}>
            <div className='create__content'>
                <h1 className='create__title'>Publish Your Gym:</h1>
                <div className='create__form'>
                    <div className='create__input-div'>
                        <input className='create__input' name='name' id='name' onChange={handleChange}/>
                        <label htmlFor='name'>Name:</label>
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
                        <textarea className='create__input' name='bio' id='bio' onChange={handleChange}>
                        </textarea>
                        <label htmlFor='bio'>About:</label>
                    </div>
                </div>
            </div>
            <nav className='create__nav'>
                <button className='create__back' type='button' onClick={()=>{navigate(-1)}}>Back</button>
                <button className='create__cta' type='submit'>Add</button>
            </nav>
        </form>
    );
}

export default Create;