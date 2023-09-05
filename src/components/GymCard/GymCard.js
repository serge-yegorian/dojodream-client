import './GymCard.scss'
import { useNavigate } from 'react-router-dom';

const GymCard = (props) => {

    const navigate = useNavigate()
    const { name, bio, email, phone, street, city, state, zip, location, _id } = props;
    return (
        <section className='gymCard' onClick={()=>{navigate(`/gyms/${_id}`)}}>
            <div className='gymCard__content'>
                <img className='gymCard__image' src={require('../../assets/images/square.jpeg')}/>
                <div className='gymCard__bottom'>
                    <h1 className='gymCard__heading'>{name}</h1>
                </div>
            </div>
        </section>
    );
}

export default GymCard