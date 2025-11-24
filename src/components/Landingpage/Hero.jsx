import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import slideOne from "../../assets/Hero/DemoSlideOne.jpg";
import slideThree from "../../assets/Hero/DemoSlideThree.webp";
import slideTwo from "../../assets/Hero/DemoSlideTwo.webp";

const slides = [slideOne, slideTwo, slideThree];

const Hero = () => {
  return (
    <div className="my-5">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        // 2. ADD THE AUTOPLAY PROP
        autoplay={{
          delay: 3500, // Time in milliseconds between slides (e.g., 3.5 seconds)
          disableOnInteraction: false, // Continue autoplay after user interaction (like clicking nav buttons)
        }}
        // 3. INCLUDE AUTOPLAY IN MODULES ARRAY
        modules={[Keyboard, Pagination, Navigation, Autoplay]}
        className="mySwiper">
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img src={slide} alt={`slider-image-${index}`} style={{ width: "100%", height: "auto" }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
