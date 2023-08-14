import './Enter.scss'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Enter = () => {

    // default state of the page is true (registration)
    const [state, setState] = useState(true);

    // change to login configuration
    const toggleState = () => {
        state ? setState(false) : setState(true);
    }

    //navigate
    const navigate = useNavigate();
    
    return (
        <section className='enter'>
            <div className='enter__section'>
                <h1 className='enter__heading'>{state ? 'Registration' : 'Login'}</h1>
                <div className='enter__input-div'>
                    <input className='enter__input' type="email" id='email' name='email'/>
                    <label className='enter__label' htmlFor='email'>Email</label>  
                </div>
                <div className='enter__input-div'>
                    <input className='enter__input' type="password" id='password' name='password'/>
                    <label className='enter__label' htmlFor='password'>Password</label>  
                </div>
            </div>
            <div className='enter__section'>
                {state ? <p className='enter__description'>Already registered? <span onClick={toggleState} className='enter__link'>Log in!</span></p>: <p className='enter__description'>Don't have an account? <span onClick={toggleState} className='enter__link'>Register!</span></p>}
                <div className='enter__buttons'>
                    <button className='enter__button' onClick={() => {navigate(-1)}}>Back</button>
                    <button className='enter__button enter__cta'>{state ? 'Register' : 'Log in'}</button>
                </div>
            </div>
        </section>
    );
}

export default Enter;