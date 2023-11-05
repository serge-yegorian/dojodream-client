import './Enter.scss'
import { redirect, useNavigate } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Enter = () => {

    const check = (e) => {
        e.target.classList.add('enter__checked');
    }


    const formRef = useRef();

    // default state of the page is true (registration)
    const [state, setState] = useState(true);

    // change to login configuration
    const toggleState = () => {
        state ? setState(false) : setState(true);
    }

    // setUsername
    const [username, setUsername] = useState('');
    const changeUsername = (e) => {setUsername(e.target.value)}

    // setPassword
    const [password, setPassword] = useState('');
    const changePassword = (e) => {setPassword(e.target.value)}

    // register function
    const register = (e) => {
        e.preventDefault();
        //send username and password
        axios.post('https://king-prawn-app-9vmwa.ondigitalocean.app/users/register', {username, password})
        .then(() => {
            toast.success(`Registered successfully!`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                });
                formRef.current.reset()
                axios.post('https://king-prawn-app-9vmwa.ondigitalocean.app/users/login', { username, password })
            .then((response) => {
                console.log('great success!');
                window.localStorage.setItem('dojodreamUserId', response.data);
                formRef.current.reset();
                toast.success(`Logged in as ${username}!`, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    });
                navigate('/create');
            })
        })
        .catch((err) => {
            if (err.response.status == 400 ) {
                toast.error('This email address is registered, try to login!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                }) 
            }
        })
        
    }

    // login function
    const login = (e) => {
        e.preventDefault();
        axios.post('https://king-prawn-app-9vmwa.ondigitalocean.app/users/login', { username, password })
            .then((response) => {
                console.log('great success!');
                window.localStorage.setItem('dojodreamUserId', response.data);
                toast.success(`Logged in as ${username}!`, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    });
                formRef.current.reset();
                navigate('/profile');
            })
            .catch((err) => {
                    if (err.response.status == 401 ) {
                        toast.error('The email is not registered!', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: false,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: "light",
                        }) 
                    } else if (err.response.status == 402 ) {
                        toast.error('Wrong password!', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: false,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: "light",
                        }) 
                    } else {
                        toast.error('Connection error!', {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: true,
                            closeOnClick: false,
                            pauseOnHover: false,
                            draggable: false,
                            progress: undefined,
                            theme: "light",
                            }) 
                    }
                    console.log(err)
            });
    };
    

    // navigate
    const navigate = useNavigate();

    
    return (
        <>
        <form className='enter' ref={formRef} onSubmit={state ? register : login}>
            <div className='enter__top'>
                <h1 className='enter__title'>dojodream</h1>
                <h2 className='enter__heading'>{state ? 'Registration' : 'Login'}</h2>
                <div className='enter__input-div'>
                    <input className='enter__input' type="email" id='email' name='email' onBlur={check} onChange={changeUsername} required/>
                    <label className='enter__label' htmlFor='email'>Email:</label>  
                </div>
                <div className='enter__input-div'>
                    <input className='enter__input' type="password" id='password' name='password' onBlur={check} onChange={changePassword} minLength='4' required/>
                    <label className='enter__label' htmlFor='password'>Password:</label>  
                </div>
                    <button className='enter__button enter__button--cta' type='submit'>{state ? 'Register' : 'Log in'}</button>
                    <button className='enter__button enter__button--secondary' type='button' onClick={() => {navigate(-1)}}>Back</button>
            </div>
            {state ? <p className='enter__description-footer'>Already registered? <span onClick={toggleState} className='enter__link'>Log in!</span></p>: <p className='enter__description-footer'>Don't have an account? <span onClick={toggleState} className='enter__link'>Register!</span></p>}
            
        </form>
        <ToastContainer/>
        </>
    );
}

export default Enter;