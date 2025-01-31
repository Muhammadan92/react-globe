import { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import countries from 'src/data/smcCountries.json';
import cities from 'src/data/smcCities.json';
import earthNight from 'src/assets/earth-night.jpg';
import starrySky from 'src/assets/night-sky.png';
import ImageWithDetails from 'jci18/ImageWithDetails';
import nigeriaFood from 'src/assets/nigeriaFood.webp';
import theme from 'jci18/theme';
import Slider from 'react-slick';
import CloseIcon from '@mui/icons-material/Close';
import Button from 'jci18/Button';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const CarouselContainer = styled('div')<{ visible: boolean }>(({ visible }) => ({
  ...css`
    width: 100vw;
    height: 100vh;
    background-color: ${theme.colors.charcoal}99;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    right: 0;
    opacity: ${visible ? 1 : 0};
    transition: opacity 313ms ease-in-out;
    z-index: ${visible ? 7007 : 0};
  `,
}));

const HomePage = () => {
  const globeEl = useRef(undefined);
  const [altitude, setAltitude] = useState(0.01);
  const [transitionDuration, setTransitionDuration] = useState(1000);
  const [carouselVisible, setCarouselVisible] = useState(false);
  const [amount, setAmount] = useState('313000');
  const [location, setLocation] = useState('Los Angeles');

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
    console.log(globeItem);
    if (globeItem?.properties?.ADMIN === 'United States of America' || globeItem?.properties?.ADMIN === 'Canada')
      return;
    if (globeItem) {
      globeEl.current.controls().autoRotate = false;
      setCarouselVisible(true);
    } else {
      globeEl.current.controls().autoRotate = true;
      setCarouselVisible(false);
    }
  };

  const sliderSettings = {};

  const SampleImg = () => (
    <div>
      <ImageWithDetails
        containerHeight="calc(100vh - 150px)"
        title={`${amount} Pounds of Food`}
        imageUrl={nigeriaFood}
        description={`Alhamdulillah, with the barakah of Shaykh Nurjan Mirahmadi ق, the blessed FZHH volunteers of ${location} have successfully rescued ${amount} pounds of food, saving it from being thrown away and delivering it into the hands of the hungry.`}
        imageAlt="Food Rescue Volunteers"
      />
    </div>
  );
  const ImgCarousel = () => (
    <Slider {...sliderSettings}>
      <SampleImg key={1} />
      <SampleImg key={2} />
      <SampleImg key={3} />
    </Slider>
  );

  const CarouselWrapper = () => {
    return (
      <CarouselContainer visible={carouselVisible}>
        <Button
          onClick={() => setCarouselVisible(false)}
          variant="icon"
          style={{ position: 'absolute', top: '5px', right: '5px' }}
        >
          <CloseIcon />
        </Button>
        <SampleImg />
      </CarouselContainer>
    );
  };

  return (
    <>
      <CarouselWrapper />
      <Globe
        width="100%"
        height="100%"
        ref={globeEl}
        globeImageUrl={earthNight}
        backgroundImageUrl={starrySky}
        //countries
        polygonsData={countries}
        polygonAltitude={altitude}
        polygonCapColor={() => 'rgba(0, 114, 255, 0.72)'}
        polygonSideColor={() => 'rgba(0, 92, 0, 0.36)'}
        // polygonLabel={({ properties: d }) => (
        //   <CarouselWrapper />
        // )}
        polygonsTransitionDuration={transitionDuration}
        onPolygonHover={(polygon, prevPolygon) => stopHover(polygon)}
        //cities
        labelsData={cities}
        labelLat={(d) => d.properties.latitude}
        labelLng={(d) => d.properties.longitude}
        labelText={(d) => d.properties.name}
        labelAltitude={0.014}
        labelSize={(d) => Math.sqrt(d.properties.pop_max) * 4e-4}
        labelDotRadius={(d) => Math.sqrt(d.properties.pop_max) * 4e-4}
        labelColor={() => 'rgba(250, 255, 250, 0.92)'}
        // labelLabel={({ properties: d }) => (
        //   <CarouselWrapper />
        // )}
        labelResolution={2}
        onLabelHover={stopHover}
      />
    </>
  );
};

export default HomePage;
