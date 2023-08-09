import { useContext } from 'react';
import { ZipContext } from '../../App';
import GymCard from '../../components/GymCard/GymCard';
import Header from '../../components/Header/Header';
import './Gyms.scss'
const Gyms = () => {
    const {zip, setZip} = useContext(ZipContext)
    return (
        <section className='gyms'>
            <Header/>
            <GymCard/>
        </section>
    );
}

export default Gyms;