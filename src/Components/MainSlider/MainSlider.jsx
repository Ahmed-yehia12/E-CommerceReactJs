import React from 'react';
import styles from './MainSlider.module.css';
import Slider from "react-slick";
import slide1 from '../../Assets/images/slider-image-1.jpeg';
import slide2 from '../../Assets/images/slider-image-2.jpeg';
import slide3 from '../../Assets/images/slider-image-3.jpeg';
import blog1 from '../../Assets/images/grocery-banner-2.jpeg';
import blog2 from '../../Assets/images/slider-2.jpeg';



export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  return <>
  <div className="row gx-0 ">
    <div className="col-md-9">
    <Slider {...settings}>
    <img className='w-100' height={400} src={slide1} alt="brand1" />
    <img className='w-100' height={400} src={slide2} alt="brand2" />
    <img className='w-100' height={400} src={slide3} alt="brand3" />
    </Slider>
    </div>
    <div className="col-md-3">
    <img className='w-100' height={200} src={blog1} alt="blog1" />
    <img className='w-100' height={200} src={blog2} alt="blog2" />

    </div>
  </div>

  </>
}
