import { useContext, useEffect, useState } from 'react';
import { ZipContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import axios from 'axios';
import './Gyms.scss';
const Gyms = () => {
    
    const navigate = useNavigate();

    const {zip, setZip} = useContext(ZipContext)
    const [gyms, setGyms] = useState([])

    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    const apiKey = 'AIzaSyBJcR7SgvoNRntpoA0YbVsxFPxcI9RPl8M';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(zip)}&key=${apiKey}`;

    useEffect(() => {
      if (zip === '') {
        navigate('/main')
      }
      axios.get(url)
        .then((response) => {
          console.log(`google reponse ${response.data}`)
          const target = response.data.results[0].geometry.location;
          setLat(target.lat);
          setLng(target.lng);
          axios.post('https://king-prawn-app-9vmwa.ondigitalocean.app/gyms/find', { lat: target.lat, lng: target.lng })
            .then((response) => {
              setGyms(response.data);
              console.log(`response.data === ${response.data}`);
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
                    <h2 className='gyms__heading'>Gyms Near {zip}:</h2>
                </div>
                <div className='gyms__array'>
                {gyms.map((gym) => (
                  <section key={gym._id} className='gymCard' onClick={()=>{navigate(`/gyms/${gym._id}`)}}>
                    <div className='gymCard__content'>
                      <img alt="gym logo"className='gymCard__image' src={gym.logo ? gym.logo.url : require('../../assets/images/square.jpeg')}/>
                      <div className='gymCard__bottom'>
                          <h1 className='gymCard__heading'>{gym.name}</h1>
                      </div>
                    </div>
                  </section>
                ))}
                </div>
            </div>
            <Header/>
        </section>
    );
}

export default Gyms;