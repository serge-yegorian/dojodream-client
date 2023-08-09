import './Main.scss';
import { useContext } from 'react';
import { ZipContext } from '../../App' 
import { useNavigate } from 'react-router-dom';

const Main = () => {

    const {zip, setZip} = useContext(ZipContext)
    const navigate = useNavigate();

    const changeZip = (e) => {
        setZip(e.target.value);
        e.preventDefault()
    }

    const ctaSubmit = (e) => {
        e.preventDefault();
        navigate("/gyms")
    }
    
    return (
            <form className='main' onSubmit={ctaSubmit}>
                <header className='main__header'>
                    <h1 className='main__title'>Welcome to dojodream</h1>
                    <h2 className='main__heading'>Find best martial arts gyms near you:</h2>
                    <div className='main__input-div'>
                        <input onChange={changeZip} type="text" minLength="5" maxLength="5" name='zip' id='zip'/>
                        <label htmlFor="zip">Zip code:</label>
                    </div>
                </header>
                <footer className='main__footer'>
                    <p className='main__description'>If you want to add your gym to the app, register!</p>
                    <button className='main__cta'>Find</button>
                </footer>
            </form>
    )
}

export default Main;