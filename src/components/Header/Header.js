import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ZipContext } from '../../App';
import './Header.scss';
import {VscAccount, VscArrowRight,} from "react-icons/vsc";
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
            {profile ? <p onClick={()=>{navigate(-1)}}>BACK</p> : 
            <Link to="/profile" className='header__profile'>
                <VscAccount/>
            </Link>}
            {profile ? <p onClick={()=>{navigate('/create')}}>ADD GYM</p> : ''}
            {profile ? <p onClick={logout}>LOGOUT</p> : <form className='header__form' onSubmit={ctaSubmit}>
                <input type="text" minLength="5" maxLength="5" placeholder={zip} onChange={setInputZip}/>
                <button className='header__cta'><VscArrowRight/></button>
            </form>}

        </header>
    );
}

export default Header;