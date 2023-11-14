import React, { useEffect, useState } from 'react'
import './Slider.scss'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { sliderData } from './SliderData'
import { useNavigate } from 'react-router-dom'

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const navigate = useNavigate();
  const sliderLength = sliderData.length;
  const autoScroll = true;
  let slideInterval;
  const intervalTime = 8000;


  const prevSlider = () => {
    setCurrentSlide(currentSlide === 0 ? sliderLength - 1 : currentSlide - 1)
  }
  const nextSlider = () => {
    setCurrentSlide(currentSlide === sliderLength - 1 ? 0 : currentSlide + 1)
  }


  useEffect(() => {
    setCurrentSlide(0);
  }, [])

  useEffect(() => {
    if (autoScroll) {
      const auto = () => {
        slideInterval = setInterval(nextSlider, intervalTime)
      }
      auto();
    }

    //memory leackeage
    return () => clearInterval(slideInterval);

  }, [currentSlide, intervalTime, autoScroll])
  return (
    <div className='slider'>
      <AiOutlineArrowLeft className='arrow prev' onClick={prevSlider} />
      <AiOutlineArrowRight className='arrow next' onClick={nextSlider} />

      {sliderData.map((slide, index) => {
        const { image, heading, desc } = slide;

        return (
          <div key={index} className={index === currentSlide ? "slide current" : "slide"}>
            {index === currentSlide && (
              <>
                <img src={image} alt="" />
                <div className="content">
                  {/* <span className='span1'></span>
                  <span className='span2'></span>
                  <span className='span3'></span>
                  <span className='span4'></span> */}
                  <h2>{heading}</h2>
                  <p>{desc}</p> <hr />
                  <button className='--btn --btn-primary' onClick={() => navigate('/shop')}>
                    Shop Now
                  </button>
                </div>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Slider 