import './AddLinks.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddLinks = () => {

    const navigate = useNavigate();
    const gymAddress = useParams().id;
    const [website, setWebsite] = useState('');
    const [insta, setInsta] = useState('');
    const [facebook, setFacebook] = useState('');
    const [smoothcomp, setSmoothcomp] = useState('');
    const [tapology, setTapology] = useState('');


    useEffect(()=>{
        axios.get(`http://localhost:4000/gyms/${gymAddress}`)
            .then((response) => {
                console.log(response.data)
                setWebsite(response.data.website);
                setInsta(response.data.insta);
                setFacebook(response.data.facebook)
                setSmoothcomp(response.data.smoothcomp);
                setTapology(response.data.tapology);
            })
            .catch((err) => {
                console.log(err);
                navigate('/')
            });
    }, [])

    const saveChanges = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:4000/gyms/addlinks`, {website, insta, facebook, smoothcomp, tapology, gymAddress})
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
            <h2 className='edit__heading'>Edit Media Links:</h2>
            <p className='edit__description'>This is the example of the link: <span className='true'>https://dojodream.com</span><br/>Make sure it is not just: <span className='false'>dojodream.com</span></p>
        </div>
        <div className='edit__inputs'>
            <div className='edit__input-div'>
                <input onChange={(e)=>{setWebsite(e.target.value)}} required className='edit__input' name='website' id='website' type='text' value={website?website:`https://`}/>
                <label className='edit__label' htmlFor='website'>Website:</label>
            </div>
            <div className='edit__input-div'>
                <input required onChange={(e)=>{setInsta(e.target.value)}} type='text' className='edit__input' name='insta' id='insta' value={insta?insta:`https://`}/>
                <label className='edit__label' htmlFor='insta'>Insta:</label>
            </div>
            <div className='edit__input-div'>
                <input required onChange={(e)=>{setFacebook(e.target.value)}} type='text' className='edit__input' name='facebook' id='facebook' value={facebook?facebook:`https://`}/>
                <label className='edit__label' htmlFor='facebook'>Facebook:</label>
            </div>
            <div className='edit__input-div'>
                <input required onChange={(e)=>{setSmoothcomp(e.target.value)}} type='text' className='edit__input' name='smoothcomp' id='smoothcomp' value={smoothcomp?smoothcomp:`https://`}/>
                <label className='edit__label' htmlFor='smoothcomp'>Smoothcomp:</label>
            </div>
            <div className='edit__input-div'>
                <input required onChange={(e)=>{setTapology(e.target.value)}} type='text' className='edit__input' name='tapology' id='tapology' value={tapology?tapology:`https://`}/>
                <label className='edit__label' htmlFor='tapology'>Tapology:</label>
            </div>
            <nav className='editname__buttons'>
                <button className='edit__button edit__button--secondary' type='button' onClick={()=>{navigate(-1)}}>Back</button>
                <button className='edit__button edit__button--cta' type='submit'>Save Changes</button>
            </nav>
        </div>
    </form>
    );
}

export default AddLinks;