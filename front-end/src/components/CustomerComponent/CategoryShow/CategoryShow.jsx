import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../../config/config";
import Loading from "../../Loading.jsx"; // Import the Loading component

function CategoryShow() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true); // Set loading to true before API call
      try {
        const response = await axios.get(`${API_BASE_URL}/category`);
        setCategories(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      } finally {
        setLoading(false); // Set loading to false after API call
      }
    };

    fetchCategories();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-2">
      {loading ? (
        <Loading /> 
      ) : (
        <Slider {...settings}>
          {categories.map((category) => (
            <div
              key={category.categoryid}
              className="flex flex-col items-center mx-3 space-x-4"
            >
              <div className="mr-7 p-3 bg-fourth rounded-md shadow-lg transition-transform transform hover:scale-105">
                <Link to={`/category/${category.categoryid}`}>
                  <img
                    src={category.categoryimage}
                    alt={category.categoryname}
                    className="w-full h-44 object-cover rounded-lg"
                  />
                  <p className="text-center font-semibold text-primary text-xl mt-2">
                    {category.categoryname}
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}

export default CategoryShow;