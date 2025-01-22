import { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import polygons from './polygons.json';
import earthNight from 'src/assets/earth-night.jpg';

const HomePage = () => {
  const globeEl = useRef(undefined);
  const [countries, setCountries] = useState(polygons);
  const [altitude, setAltitude] = useState(0.1);
  const [transitionDuration, setTransitionDuration] = useState(1000);

  const filteredCountries = ['United States of America', 'India', 'Pakistan', 'Canada', 'Nigeria'];

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
    globeEl.current.controls().autoRotateSpeed = -1.8;

    globeEl.current.pointOfView({ altitude: 4 }, 5000);
  }, []);

  return (
    <Globe
      ref={globeEl}
      globeImageUrl={earthNight}
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
    />
  );
};

export default HomePage;
