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
            <h1 className='gyms__heading'>Near {zip}:</h1>
            <GymCard/>
        </section>
    );
}

export default Gyms;