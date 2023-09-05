import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AddImages.scss';

const AddImages = () => {

    const gymAddress = useParams().id;
    const [logoPublicId, setLogoPublicId] = useState(null);
    const [backgroundPublicId, setBackgroundPublicId] = useState(null);
    const [schedulePublicId, setSchedulePublicId] = useState(null);

    const [inputLogo, setInputLogo] = useState(null);
    const [inputBackground, setInputBackground] = useState(null);
    const [inputSchedule, setInputSchedule] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:4000/gyms/${gymAddress}`)
            .then((response) => {
                response.data.logo && setLogoPublicId(response.data.logo.public_id);
                response.data.background && setBackgroundPublicId(response.data.background.public_id);
                response.data.schedule && setSchedulePublicId(response.data.schedule.public_id);
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
                navigate('/')
            });
    }, [gymAddress, logoPublicId, schedulePublicId, backgroundPublicId]);

    // server needs multer in order for this to work
    const sendLogo = (e) => {
        e.preventDefault();
        const formData = new FormData();
        setInputLogo(e.target.files[0]);
        const file = e.target.files[0];
        formData.append("logo", file);
        formData.append("gymAddress", gymAddress);
        formData.append("logoPublicId", logoPublicId)
        formData.append("upload_preset", "ml_default");
        axios.post('http://localhost:4000/gyms/uploadLogo/', formData)
        .then((res) => {
            console.log(res)
            setLogoPublicId(res.data.logo.public_id)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const sendBackground = (e) => {
        e.preventDefault();
        const formData = new FormData();
        setInputBackground(e.target.files[0]);
        const file = e.target.files[0];
        formData.append("background", file);
        formData.append("gymAddress", gymAddress);
        formData.append("backgroundPublicId", backgroundPublicId)
        formData.append("upload_preset", "ml_default");
        axios.post('http://localhost:4000/gyms/uploadBackground/', formData)
        .then((res) => {
            console.log(res)
            setBackgroundPublicId(res.data.background.public_id)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const sendSchedule = (e) => {
        e.preventDefault();
        const formData = new FormData();
        setInputSchedule(e.target.files[0]);
        const file = e.target.files[0];
        formData.append("schedule", file);
        formData.append("gymAddress", gymAddress);
        formData.append("schedulePublicId", schedulePublicId)
        formData.append("upload_preset", "ml_default");
        axios.post('http://localhost:4000/gyms/uploadSchedule/', formData)
        .then((res) => {
            console.log(res)
            setSchedulePublicId(res.data.schedule.public_id)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const navigate = useNavigate();

    return (
        <form className='addImages'>
            <div className='addImages__top'>
                <h1 className='addImages__title'>dojodream</h1>
                <h2 className='addImages__heading'>Upload Images:</h2>
                <p className='addImages__description'>Files should have png, jpeg, or jpg format. Make sure your Logo is square and has all sides even. Maximum file size is 1MB.</p>
            </div>
            <div className='addImages__inputs'>
                <input className='addImages__input' type="file" id="logo" name='logo' accept=".jpg, .jpeg, .png, .gif" onChange={sendLogo}/>
                <div className='addImages__button-div'>
                    <button className={`addImages__Imagebutton`} type='button' onClick={()=>{document.getElementById('logo').click()}}>Logo</button>
                    <div className={`addImages__status`}>
                        <img className={`addImages__okay ${inputLogo? 'addImages__accepted' : ''}`} src={require('../../assets/images/check.png')} />
                    </div>
                </div>
                <input className='addImages__input' type="file" id="background" name='background' accept=".jpg, .jpeg, .png, .gif" onChange={sendBackground}/>
                <div className='addImages__button-div'>
                    <button className={`addImages__Imagebutton`} type='button' onClick={()=>{document.getElementById('background').click()}}>Background</button>
                    <div className='addImages__status'>
                        <img className={`addImages__okay ${inputBackground? 'addImages__accepted' : ''}`} src={require('../../assets/images/check.png')} />
                    </div>
                </div>
                <input className='addImages__input' type="file" id="schedule" name='schedule' accept=".jpg, .jpeg, .png, .gif" onChange={sendSchedule}/>
                <div className='addImages__button-div'>
                    <button className={`addImages__Imagebutton`} type='button' onClick={()=>{document.getElementById('schedule').click()}}>Schedule</button>
                    <div className='addImages__status'>
                        <img className={`addImages__okay ${inputSchedule? 'addImages__accepted' : ''}`} src={require('../../assets/images/check.png')} />
                    </div>
                </div>
            </div>
            <nav className='addImages__nav'>
                <button className='addImages__button addImages__button--secondary' type='button' onClick={()=>{navigate(-1)}}>Back</button>
            </nav>
        </form>
    );
}

export default AddImages;