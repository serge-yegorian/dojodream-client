import './Main.scss';
import { useContext, useState } from 'react';
import { ZipContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const { zip, setZip } = useContext(ZipContext);
    const navigate = useNavigate();

    const changeZip = (e) => {
        const inputValue = e.target.value;
        // Allow only numeric characters
        if (/^\d*$/.test(inputValue) && inputValue.length <= 5) {
            setZip(inputValue);
            if (inputValue.length === 5) {

                setTimeout(() => {
                    navigate("/gyms");
                }, 1000)

                
            }
        }
    };

    return (
        <form className='main'>
                <div className='main__top'>
                    <h1 className='main__title'>dojodream</h1>
                    <h2 className='main__heading'> Find best martial arts schools near you</h2>
                </div>
                <div className='main__input-div'>
                    <label className='main__label' htmlFor='zip'>Zip Code:</label>
                    <input
                        className='main__input'
                        onChange={changeZip}
                        type="text"
                        minLength="5"
                        maxLength="5"
                        name='zip'
                        id='zip'
                        placeholder={zip}
                    />
                </div>
            <footer className='main__footer'>
                <p className='main__description'>If you want to add your gym to the app, <span className='main__link' onClick={() => { navigate('/enter') }}>register!</span></p>
            </footer>
        </form>
    );
};

export default Main;
