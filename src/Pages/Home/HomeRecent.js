import React, { useState } from 'react';
import Slider from 'react-slick-slider'

// images
import iPhone from '../../images/client/iPhone.png';
import samsung from '../../images/client/samsung.jpeg';
import symphony from '../../images/client/symphony.png';
import itel from '../../images/client/itel.jpg';
import walton from '../../images/client/WALTON.jpg';
import rog from '../../images/client/rog.jpg';
import realme from '../../images/client/Realme.webp';
import onePlus from '../../images/client/oneplus.png';

const HomeRecent = () => {

    const [slider] = useState([iPhone, samsung, symphony, itel, walton, rog, realme, onePlus])

    const settings = {
        dots: true,
        infinite: true,
        centerMode: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    return (
        <div className='homeRecent mb-5 overflow-hidden'>
            <Slider {...settings}>
                {
                    slider.map((item, ind) => (
                        <div className="px-4" key={ind}>
                            <img src={item} height='100' alt="img" />
                        </div>
                    ))
                }
            </Slider>
        </div>
    );
};

export default HomeRecent;