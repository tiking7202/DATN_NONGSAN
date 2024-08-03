import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import slider1 from '../../../assets/slider/slider1.jpg';
import slider2 from '../../../assets/slider/slider2.jpg';
import slider3 from '../../../assets/slider/slider3.jpg';

const imgs = [
  slider1,
  slider2,
  slider3
]

const SlideShow = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <>
      <style>
        {`
          .slick-next:before, .slick-prev:before {
            font-size: 30px;
            color: #07bc0c;
          }

          .slick-next, .slick-prev {
            height: 50px;
            width: 50px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            border-radius: 50%;
            z-index: 1;
          }

          .slick-next {
            right: 10px;
          }

          .slick-prev {
            left: 10px;
          }
        `}
      </style>
      <Slider {...settings} className="w-1/2 h-96 bg-fourth">
        {imgs.map((image, index) => (
          <div key={index} className="h-96  rounded-lg">
            <img src={image} alt={`Slide ${index}`} className="w-full h-full" />
          </div>
        ))}
      </Slider>
    </>
  );
};

export default SlideShow;
