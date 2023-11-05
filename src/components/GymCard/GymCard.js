import './GymCard.scss'
import { useNavigate } from 'react-router-dom';

const GymCard = (props) => {

    const navigate = useNavigate()
    const { name, bio, email, phone, street, city, state, zip, location, _id, logo } = props;
    return (
        <section className='gymCard' onClick={()=>{navigate(`/gyms/${_id}`)}}>
            <div className='gymCard__content'>
                <img alt="gym logo"className='gymCard__image' src={ logo ? logo.secure_url : require('../../assets/images/square.jpeg')}/>
                <div className='gymCard__bottom'>
                    <h1 className='gymCard__heading'>{name}</h1>
                </div>
            </div>
        </section>
    );
}

export default GymCard