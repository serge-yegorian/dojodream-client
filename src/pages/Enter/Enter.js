import './Enter.scss'
import { useNavigate } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import axios from 'axios';

const Enter = () => {

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
        axios.post('http://localhost:4000/users/register', {username, password})
        .then(() => {

        })
        .catch((err) => {
            alert(`Registration Failed: ${err}`)
        })
        formRef.current.reset()
    }

    // login function
    const login = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/users/login', { username, password })
            .then((response) => {
                console.log('great success!');
                window.localStorage.setItem('dojodreamUserId', response.data);
                formRef.current.reset();
                navigate('/profile');
            })
            .catch((err) => {
                if (err.response && err.response.data && err.response.data.error) {
                    alert(err.response.data.error);
                } else {
                    alert('An error occurred during login.');
                }
            });
    };
    

    // navigate
    const navigate = useNavigate();

    
    return (
        <form className='enter' ref={formRef} onSubmit={state ? register : login}>
            <div className='enter__top'>
                <h1 className='enter__title'>dojodream</h1>
                <h2 className='enter__heading'>{state ? 'Registration' : 'Login'}</h2>
                <div className='enter__input-div'>
                    <input className='enter__input' type="email" id='email' name='email' onChange={changeUsername} required/>
                    <label className='enter__label' htmlFor='email'>Email:</label>  
                </div>
                <div className='enter__input-div'>
                    <input className='enter__input' type="password" id='password' name='password' onChange={changePassword} minLength='4' required/>
                    <label className='enter__label' htmlFor='password'>Password:</label>  
                </div>
            </div>
            <div className='enter__footer'>
                {state ? <p className='enter__description-footer'>Already registered? <span onClick={toggleState} className='enter__link'>Log in!</span></p>: <p className='enter__description-footer'>Don't have an account? <span onClick={toggleState} className='enter__link'>Register!</span></p>}
                <div className='enter__buttons'>
                    <button className='enter__button enter__button--secondary' type='button' onClick={() => {navigate(-1)}}>Back</button>
                    <button className='enter__button enter__button--cta' type='submit'>{state ? 'Register' : 'Log in'}</button>
                </div>
            </div>
        </form>
    );
}

export default Enter;