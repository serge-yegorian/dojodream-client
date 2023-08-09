import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ZipContext } from '../../App';
import './Header.scss';
import {VscAccount, VscArrowRight} from "react-icons/vsc";
const Header = () => {

    const navigate = useNavigate()

    const {zip, setZip} = useContext(ZipContext)
    const [input, setInput] = useState(null);

    const ctaSubmit = (e) => {
        e.preventDefault();
        setZip(input)
    }

    const setInputZip = (e) => {
        setInput(e.target.value);
        e.preventDefault();
    }

    return (
        <header className='header'>
            <Link to="/profile" className='header__profile'>
                <VscAccount/>
            </Link>
            <form className='header__form' onSubmit={ctaSubmit}>
                <input type="text" minLength="5" maxLength="5" placeholder={zip} onChange={setInputZip}/>
                <button className='header__cta'><VscArrowRight/></button>
            </form>
        </header>
    );
}

export default Header;