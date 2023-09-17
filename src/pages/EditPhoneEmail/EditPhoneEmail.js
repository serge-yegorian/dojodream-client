import './EditPhoneEmail.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditPhoneEmail = () => {

    const navigate = useNavigate();
    const gymAddress = useParams().id;
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    useEffect(()=>{
        axios.get(`https://king-prawn-app-9vmwa.ondigitalocean.app/gyms/${gymAddress}`)
            .then((response) => {
                setPhone(response.data.phone);
                setEmail(response.data.email);
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
                navigate('/')
            });
    }, [])

    const saveChanges = (e) => {
        e.preventDefault()
        axios.post(`https://king-prawn-app-9vmwa.ondigitalocean.app/gyms/editphoneandemail`, {phone, email, gymAddress})
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
        <form className='edit' onSubmit={saveChanges}>
        <div className='edit__top'>
            <h1 className='edit__title'>dojodream</h1>
            <h2 className='edit__heading'>Edit Phone Number and Email Address:</h2>
            <p className='edit__description'>Use only 10 digits for the phone number and no other characters.</p>
        </div>
        <div className='edit__inputs'>
            <div className='edit__input-div'>
                <input onChange={(e)=>{setPhone(e.target.value)}} required className='edit__input' name='phone' id='phone' type='text' defaultValue={phone}/>
                <label className='edit__label' htmlFor='name'>Phone:</label>
            </div>
            <div className='edit__input-div'>
                <input required onChange={(e)=>{setEmail(e.target.value)}} type='email' className='edit__input' name='email' id='email' defaultValue={email}/>
                <label className='edit__label' htmlFor='name'>Email:</label>
            </div>
            <nav className='editname__buttons'>
                <button className='edit__button edit__button--secondary' type='button' onClick={()=>{navigate(-1)}}>Back</button>
                <button className='edit__button edit__button--cta' type='submit'>Save Changes</button>
            </nav>
        </div>
    </form>
    );
}

export default EditPhoneEmail;