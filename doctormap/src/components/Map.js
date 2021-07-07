import React,{useState} from 'react';
import {
    GoogleMap,
    Marker,
    InfoWindow,
    useLoadScript
} from '@react-google-maps/api';
import * as doctors from '../data/doctors.json';
import {AgeFromDateString} from 'age-calculator';
import mapStyle from './mapStyle';
import '../css/Map.css';


export default function Map() {
    const center = {
        lat: 37.9744464,
        lng: 23.7478837
    }
    const options = {
      styles: mapStyle,
      disableDefaultUI: true,
      zoomControl: true
    }
    const[selectedDoctor, setSelectedDoctor] = useState(null);
  
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    });

    if(loadError) {
       return <div>Map cannot be loaded right now.</div>
    }
    if(!isLoaded) {
        return <div>Loading Maps</div>
    }
    const ageConvert = () => {
        const age = `${selectedDoctor.date_of_birth}`;
        const ageFromDate = new AgeFromDateString(age).age;
        return ageFromDate;
    }
    const practiceDateConvert = () => {
        const practiceDate = `${selectedDoctor.practice_start_date}`;
        const practiceDateFromString = new AgeFromDateString(practiceDate).age;
        return practiceDateFromString;
    }
    
    return (
        <div>
            <GoogleMap
              mapContainerClassName="mapStyle"
              zoom={12}
              center={center}
              options={options}
            >
              {doctors.results.map((doctor) => (
                <Marker
                  key={doctor.id}
                  id={doctor.id}
                  position={{
                    lat: doctor.latitude,
                    lng: doctor.longitude
                  }}
                  onClick={() => {
                    setSelectedDoctor(doctor);
                  }}
                  icon={{
                    url: '/marker.svg',
                    scaledSize: new window.google.maps.Size(28,28),
                    origin: new window.google.maps.Point(0,0),
                    anchor: new window.google.maps.Point(14,-5)
                  }}
                />
               ))}
              {selectedDoctor ? (
                <InfoWindow
                  position={{
                    lat: selectedDoctor.latitude,
                    lng: selectedDoctor.longitude
                   }}
                   onCloseClick={() => {
                    setSelectedDoctor(null)
                    }}
                >
                 <div className="doctorsInformation">
                   <div className="row-1">
                      <p>{selectedDoctor.first_name}</p>
                      <p>{selectedDoctor.last_name}</p>
                    </div>
                    <div className="row-2">
                        <p>{selectedDoctor.street_address},</p>
                        <p>{selectedDoctor.city},</p>
                        <p>{selectedDoctor.country},</p>
                        <p>{selectedDoctor.zip_code}</p>
                    </div>
                    <div className="row-3">
                      <p>{ageConvert()} ετών,</p>
                      <p>{practiceDateConvert()} χρόνια εμπειρίας,</p>
                      <p>{selectedDoctor.languages}</p>
                    </div>
                 </div>
               </InfoWindow>
              ) : null }
            </GoogleMap>
        </div>
    )
}
