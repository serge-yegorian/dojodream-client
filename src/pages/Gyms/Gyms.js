import { useContext } from 'react';
import { ZipContext } from '../../App';
import './Gyms.scss'
const Gyms = () => {
    const {zip, setZip} = useContext(ZipContext)
    return (
        <section className='gyms'>
            
        </section>
    );
}

export default Gyms;