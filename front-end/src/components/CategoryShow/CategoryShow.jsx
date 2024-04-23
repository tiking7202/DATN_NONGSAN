import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function CategoryShow() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/category')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div className='my-10'>
      <Slider {...settings}>
        {categories.map(category => (
          <div key={category.categoryid} className='flex flex-col items-center mx-3 space-x-4'>
            <div className='mr-7 bg-fourth p-2 rounded-md'>
              <img src={category.categoryimage} alt={category.categoryname} className='w-full h-44 object-cover rounded-lg' />
              <p className='text-center text-primary text-xl'>{category.categoryname}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CategoryShow;