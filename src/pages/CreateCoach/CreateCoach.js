import './CreateCoach.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CreateCoach = () => {

    const navigate = useNavigate();
    const gymAddress = useParams().id;
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState('');
    const [insta, setInsta] = useState('');
    const [facebook, setFacebook] = useState('');
    const [tapology, setTapology] = useState('');
    const [smoothcomp, setSmoothcomp] = useState('');

    useEffect(()=>{
        axios.get(`https://king-prawn-app-9vmwa.ondigitalocean.app/gyms/${gymAddress}`)
            .then((response) => {
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err);
                navigate('/')
            });
    }, []);

    const saveChanges = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("name", name);
        formData.append("bio", bio);
        formData.append("insta", insta);
        formData.append("facebook", facebook);
        formData.append("smoothcomp", smoothcomp);
        formData.append("tapology", tapology);
        formData.append("gymAddress", gymAddress);

        // Check if the image state is not empty and append it to the FormData
        if (image) {
            formData.append("image", image);
        }
        axios.post(`https://king-prawn-app-9vmwa.ondigitalocean.app/coaches/newcoach`, formData)
        .then((res)=>{
            console.log(res)
            alert('Changes Saved Succesfully!')
            navigate(-1)
        })
        .catch((err)=>{
            console.log(`error on step 1: ${err}`)
        })
    }

    const chooseImage = (e) => {
        e.preventDefault();
        setImage(e.target.files[0]);
        console.log(image)
    }

    return (
        <form className='edit' onSubmit={saveChanges}>
        <div className='edit__top'>
            <h1 className='edit__title'>dojodream</h1>
            <h2 className='edit__heading'>Provide Info About The Coach:</h2>
            <p className='edit__description'>Prepare an image with 1:1 dimensions. Make sure it has png, jpeg, jpg or gif format.</p>
        </div>
        <div className='edit__inputs'>
            <div className='edit__section'>
                <div className='edit__input-div'>
                    <input required onChange={(e)=>{setName(e.target.value)}} minLength='3' type='text' className='edit__input' name='name' id='name' defaultValue={name && name}/>
                    <label className='edit__label' htmlFor='name'>Name:</label>
                </div>
                <div className='create__input-div'>
                    <textarea required className='edit__input edit__input--textarea' rows='12' name='bio' id='bio' minLength="50" maxLength="330" defaultValue={bio && bio} onChange={(e)=>{setBio(e.target.value)}}>
                    </textarea>
                    <label className='edit__label' htmlFor='bio'>About:</label>
                </div>
                <div className='addImages__button-div'>
                <input className='addImages__input' type="file" id="image" name='image' accept=".jpg, .jpeg, .png, .gif" onChange={chooseImage}/>
                    <button className={`addImages__Imagebutton`} type='button' onClick={()=>{document.getElementById('image').click()}}>Image</button>
                    <div className='addImages__status'>
                        <img className={`addImages__okay ${image? 'addImages__accepted' : ''}`} src={require('../../assets/images/check.png')} />
                    </div>
                </div>
            </div>
            <div className='edit__section'>
            
            <div className='edit__input-div'>
                <input required onChange={(e)=>{setInsta(e.target.value)}} type='text' className='edit__input' name='insta' id='insta' defaultValue={insta?insta:`https://`}/>
                <label className='edit__label' htmlFor='insta'>Insta:</label>
            </div>
            <div className='edit__input-div'>
                <input required onChange={(e)=>{setFacebook(e.target.value)}} type='text' className='edit__input' name='facebook' id='facebook' defaultValue={facebook?facebook:`https://`}/>
                <label className='edit__label' htmlFor='facebook'>Facebook:</label>
            </div>
            <div className='edit__input-div'>
                <input required onChange={(e)=>{setSmoothcomp(e.target.value)}} type='text' className='edit__input' name='smoothcomp' id='smoothcomp' defaultValue={smoothcomp?smoothcomp:`https://`}/>
                <label className='edit__label' htmlFor='smoothcomp'>Smoothcomp:</label>
            </div>
            <div className='edit__input-div'>
                <input required onChange={(e)=>{setTapology(e.target.value)}} type='text' className='edit__input' name='tapology' id='tapology' defaultValue={tapology?tapology:`https://`}/>
                <label className='edit__label' htmlFor='tapology'>Tapology:</label>
            </div>
            </div>
        </div>
        <nav className='editname__buttons'>
                <button className='edit__button edit__button--secondary' type='button' onClick={()=>{navigate(-1)}}>Back</button>
                <button className='edit__button edit__button--cta' type='submit'>Save Changes</button>
            </nav>
    </form>
    );
}

export default CreateCoach;