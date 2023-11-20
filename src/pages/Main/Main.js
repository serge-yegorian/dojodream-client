import './Main.scss';
import { useContext, useEffect, useState } from 'react';
import { ZipContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const Main = () => {

    const { zip, setZip } = useContext(ZipContext);
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
      const value = e.target.value;
      const numericValue = value.replace(/[^0-9]/g, '');
      setInputValue(numericValue);
    }

    const submit = (e) => {
        e.preventDefault();
        setZip(inputValue)
        navigate('/gyms')
    }

    return (
        <form className='main' onSubmit={submit}>
                <div className='main__top'>
                    <h1 className='main__title'>dojodream</h1>
                    <h2 className='main__heading'> Find best dojos near you</h2>
                </div>
                <div className='main__bottom'>
                        <div className='main__input-div'>
                            <label className='main__label' htmlFor='zip'>Zip Code:</label>
                            <input
                                className='main__input'
                                onChange={handleInputChange}
                                type="text"
                                minLength="5"
                                maxLength="5"
                                name='zip'
                                id='zip'
                                placeholder={33062}
                                value={inputValue}
                                required
                            />
                        
                        </div>
                        <button className='main__button'>Find dojos</button>
                </div>
            <footer className='main__footer'>
                <p className='main__description'>If you want to add your gym to the app, <span className='main__link' onClick={() => { navigate('/enter') }}>register!</span></p>
            </footer>
        </form>
    );
};

export default Main;
