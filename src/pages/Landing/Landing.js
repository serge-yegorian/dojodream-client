import './Landing.scss';
import { BiLinkExternal } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';


const Landing = () => {
    const navigate = useNavigate()
    return (
        <section className='landing'>
            <div className='landing__top'>
                <h1 className='landing__title'>dojodream</h1>
                <h2 className='landing__heading'> Find a dream dojo</h2>
            </div>
            <div className='landing__section'>
                <p className='landing__description'>Find martial arts gyms around you within one click. Find info about gym's coaches, schedule, membership cost and more...</p>
                <button className='landing__cta' onClick={()=>{navigate('/main')}}>Try dojodream <BiLinkExternal/></button>
            </div>
        </section>
    );
}

export default Landing;