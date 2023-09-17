import "./EditAddress.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const EditAddress = () => {

    const navigate = useNavigate();
    const gymAddress = useParams().id;
    
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    
    useEffect(()=>{
        axios.get(`https://king-prawn-app-9vmwa.ondigitalocean.app/gyms/${gymAddress}`)
            .then((response) => {
                console.log(response.data);
                setState(response.data.state);
                setZip(response.data.zip);
                setCity(response.data.city);
                setStreet(response.data.street);
            })
            .catch((err) => {
                console.log(err);
                navigate('/')
            });
    }, [])

    const saveChanges = (e) => {
        e.preventDefault()
        const apiKey = 'AIzaSyBJcR7SgvoNRntpoA0YbVsxFPxcI9RPl8M';
        const address = `${street}, ${city}, ${state} ${zip}`;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
        axios.get(url)
        .then((response)=>{
            const target = response.data.results[0].geometry.location;
            console.log(target);
            axios.post('https://king-prawn-app-9vmwa.ondigitalocean.app/gyms/editaddress', {gymAddress, state, street, city, zip, location: {
                type: "Point",
                coordinates: [target.lng, target.lat],
            }})
            .then((res)=>{
                console.log(res.data)
                alert('Changes Saved!')
            })
            .catch((err)=>{
                console.log(err)
            })
        })
    }

    return ( <>
  <form className="create" onSubmit={saveChanges}>
    <div className="create__top">
      <h1 className="create__title">dojodream</h1>
      <h2 className="create__heading">Edit Address:</h2>
    </div>
    <div className="create__form-section">

        <div className="create__input-div">
          <input
            required
            className="create__input"
            name="street"
            id="street"
            onChange={(e)=>setStreet(e.target.value)}
            defaultValue={street}
          />
          <label className="create__label" htmlFor="street">
            Street:
          </label>
        </div>
        <div className="create__input-div">
          <input
            required
            className="create__input"
            name="city"
            id="city"
            onChange={(e)=>setCity(e.target.value)}
            defaultValue={city}
          />
          <label className="create__label" htmlFor="city">
            City:
          </label>
        </div>

      <div className="create__container">
        <div className="create__input-div">
          <input
            required
            className="create__input"
            name="state"
            id="state"
            onChange={(e)=>setState(e.target.value)}
            defaultValue={state}
          />
          <label className="create__label" htmlFor="state">
            State:
          </label>
        </div>
        <div className="create__input-div">
          <input
            required
            className="create__input"
            name="zip"
            id="zip"
            minLength={5}
            maxLength="5"
            onChange={(e)=>setZip(e.target.value)}
            defaultValue={zip}
          />
          <label className="create__label" htmlFor="zip">
            Zip:
          </label>
        </div>
      </div>
    </div>
    <nav className="editname__buttons">
      <button
        className="edit__button edit__button--secondary"
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
      <button className="edit__button edit__button--cta" type="submit">
        Save Changes
      </button>
    </nav>
  </form>;
  </>);
};

export default EditAddress;
