import './GymCard.scss'

const GymCard = (props) => {
    const { name, bio, email, phone, street, city, state, zip, location } = props;
    return (
        <section className='gymCard'>
            <h1 className='gymCard__heading'>{name}</h1>
            <p className='gymCard__bio'>bio</p>
            <p className='gymCard__address'>{street}, {city}, {state} {zip}</p>
        </section>
    );
}

export default GymCard