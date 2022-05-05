import { Carousel } from 'react-bootstrap';
import NewPhone from '../../images/slider/cool-new-mobile.jpg'
import Iphone from '../../images/slider/iphone.png'

import './Home.css'

const HomeBanner = () => {


    return (
        <>
            <Carousel fade>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={NewPhone}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Iphone}
                        alt="Second slide"
                    />
                </Carousel.Item>
            </Carousel>
        </>
    );
};

export default HomeBanner;