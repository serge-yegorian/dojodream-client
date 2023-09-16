import { useContext, useEffect, useState } from 'react';
import { ZipContext } from '../../App';
import GymCard from '../../components/GymCard/GymCard';
import Header from '../../components/Header/Header';
import axios from 'axios';
import './Gyms.scss';
const Gyms = () => {
    
    const {zip, setZip} = useContext(ZipContext)
    const [gyms, setGyms] = useState([])

    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    const apiKey = 'AIzaSyBJcR7SgvoNRntpoA0YbVsxFPxcI9RPl8M';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(zip)}&key=${apiKey}`;

    useEffect(() => {
        axios.get(url)
  .then((response) => {
    const target = response.data.results[0].geometry.location;
    setLat(target.lat);
    setLng(target.lng);

    // Now that you have valid lat and lng values, send the request to find nearby gyms
    axios.post('http://localhost:4000/gyms/find', { lat: target.lat, lng: target.lng })
      .then((response) => {
        setGyms(response.data);
        console.log(response.data);
        console.log(gyms);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });

    }, [zip])

    console.log(gyms)
    return (
        <section className='gyms'>
            <div className='gyms__content'>
                <div className='gyms__top'>
                    <h1 className='main__title'>dojodream</h1>
                    <h2 className='gyms__heading'>Near {zip}:</h2>
                </div>
                <div className='gyms__array'>
                {gyms.map((gym) => (
                    <GymCard key={gym._id} {...gym}/>
                ))}
                </div>
            </div>
            <Header/>
        </section>
    );
}

export default Gyms;