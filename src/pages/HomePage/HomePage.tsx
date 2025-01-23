import { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import countries from './countries.json';
import cities from './cities.json';
import earthNight from 'src/assets/earth-night.jpg';
import starrySky from 'src/assets/night-sky.png';

const HomePage = () => {
  const globeEl = useRef(undefined);
  const [altitude, setAltitude] = useState(0.01);
  const [transitionDuration, setTransitionDuration] = useState(1000);

  const filteredCountries = ['United States of America', 'India', 'Pakistan', 'Canada', 'Nigeria'];
  const filteredCities = ['Los Angeles', 'Vancouver', 'Chicago', 'San Francisco'];

  // useEffect(() => {
  //   // load data
  //   fetch(polygons).then(res => res.json())
  //     .then(countries=> {
  //       setCountries(countries);

  //       setTimeout(() => {
  //         setTransitionDuration(4000);
  //         setAltitude(() => feat => Math.max(0.1, Math.sqrt(+feat.properties.POP_EST) * 7e-5));
  //       }, 3000);
  //     });
  // }, []);

  useEffect(() => {
    // Auto-rotate
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = -0.72;
    globeEl.current.pointOfView({ lat: 34.0549, lng: -135.2426, altitude: 0.9 }, 3600);
  }, []);

  const stopHover = (globeItem) => {
    if (globeItem) {
      globeEl.current.controls().autoRotate = false;
    } else {
      globeEl.current.controls().autoRotate = true;
    }
  };

  return (
    <Globe
      ref={globeEl}
      globeImageUrl={earthNight}
      backgroundImageUrl={starrySky}
      //countries
      polygonsData={countries.features.filter(
        (d) => d.properties.ISO_A2 !== 'AQ' && filteredCountries.includes(d.properties.ADMIN),
      )}
      polygonAltitude={altitude}
      polygonCapColor={() => 'rgba(0, 114, 255, 0.6)'}
      polygonSideColor={() => 'rgba(0, 92, 0, 0.15)'}
      polygonLabel={({ properties: d }) => (
        <div>
          <div>
            <b>
              {d.ADMIN} ({d.ISO_A2})
            </b>
          </div>
          <div>
            Population: <i>{Math.round(+d.POP_EST / 1e4) / 1e2}M</i>
          </div>
        </div>
      )}
      polygonsTransitionDuration={transitionDuration}
      onPolygonHover={stopHover}
      //cities
      labelsData={cities.features.filter((city) => filteredCities.includes(city.properties.name))}
      labelLat={(d) => d.properties.latitude}
      labelLng={(d) => d.properties.longitude}
      labelText={(d) => d.properties.name}
      labelAltitude={0.014}
      labelSize={(d) => Math.sqrt(d.properties.pop_max) * 4e-4}
      labelDotRadius={(d) => Math.sqrt(d.properties.pop_max) * 4e-4}
      labelColor={() => 'rgba(250, 255, 250, 0.92)'}
      labelLabel={({ properties: d }) => (
        <div>
          <div>
            <b>{d.name}</b>
          </div>
          <div>
            Population: <i>{Math.round(+d.pop_max / 1e4) / 1e2}M</i>
          </div>
        </div>
      )}
      labelResolution={2}
      onLabelHover={stopHover}
    />
  );
};

export default HomePage;
