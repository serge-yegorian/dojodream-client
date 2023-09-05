import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ZipContext } from '../../App';
import './Header.scss';
import {VscAccount, VscArrowRight,} from "react-icons/vsc";
import { BiLogOut, BiArrowBack } from "react-icons/bi";
import { MdAddCircle } from "react-icons/md";

import Cookies from 'js-cookie';

const Header = ({profile}) => {

    const navigate = useNavigate();

    const logout = () => {
        Cookies.remove('token')
        localStorage.removeItem('dojodreamUserId')
        navigate('/enter')
      }

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
            {profile ? <p className="header__icon header__icon--secondary" onClick={()=>{navigate(-1)}}><BiArrowBack/></p> : 
            <Link to="/profile" className='header__profile-link'>
                <VscAccount className='header__profile'/>
            </Link>}
            {profile ? <p className='header__icon header__icon--center' onClick={()=>{navigate('/create')}}><span className="header__icon-text">Add </span><MdAddCircle className='header__icon--primary'/></p> : ''}
            {profile ? <p className='header__icon header__icon--secondary' onClick={logout}><BiLogOut/></p> : <form className='header__form' onSubmit={ctaSubmit}>
                <input className="header__input" type="text" minLength="5" maxLength="5" placeholder={zip} onChange={setInputZip}/>
                <button className='header__cta'><VscArrowRight/></button>
            </form>}

        </header>
    );
}

export default Header;