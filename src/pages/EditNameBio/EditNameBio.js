import './EditNameBio.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditNameBio = () => {

    const navigate = useNavigate();
    const gymAddress = useParams().id;
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');

    useEffect(()=>{
        axios.get(`http://localhost:4000/gyms/${gymAddress}`)
            .then((response) => {
                setName(response.data.name);
                setBio(response.data.bio);
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
                navigate('/')
            });
    }, [])

    const saveChanges = (e) => {
        e.preventDefault()
        console.log(name, bio)
        axios.post(`http://localhost:4000/gyms/editnameandbio`, {name, bio, gymAddress})
        .then((res)=>{
            console.log(res)
            alert('Changes Saved Succesfully!')
                navigate(-1)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return (
        <form className='editname' onSubmit={saveChanges}>
            <div className='addImages__top'>
                <h1 className='editname__title'>dojodream</h1>
                <h2 className='editname__heading'>Edit Name and Bio:</h2>
                <p className='editname__description'>Make sure that your bio is short and explains core values of your gym and how it is different from others.</p>
            </div>
            <div className='editname__inputs'>
                <div className='editname__input-div'>
                    <input onChange={(e)=>{setName(e.target.value)}} required className='editname__input' name='name' id='name' type='text' defaultValue={name}/>
                    <label className='editname__label' htmlFor='name'>Name:</label>
                </div>
                <div className='editname__input-div'>
                    <textarea required onChange={(e)=>{setBio(e.target.value)}} className='editname__input editname__input--textarea' minLength="120" maxLength="330" rows='12' name='bio' id='bio' defaultValue={bio}></textarea>
                    <label className='editname__label' htmlFor='name'>Bio:</label>
                </div>
                <nav className='editname__buttons'>
                    <button className='editname__button editname__button--secondary' type='button' onClick={()=>{navigate(-1)}}>Back</button>
                    <button className='editname__button editname__button--cta' type='submit'>Save Changes</button>
                </nav>
            </div>
        </form>
    );
}

export default EditNameBio;