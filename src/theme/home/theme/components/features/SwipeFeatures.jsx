// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export const SwipeFeatures = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            style={{ width: "100%" }}
            src="/helpers/dashboard.jpg"
            alt="Dashboard"
          />{" "}
        </SwiperSlide>
        <SwiperSlide>
          <img style={{ width: "77%" }} src="/helpers/Cal.jpg" alt="Cal" />{" "}
        </SwiperSlide>
        <SwiperSlide>
          <img style={{ width: "76%" }} src="/helpers/CE.jpg" alt="CE" />{" "}
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{ width: "80%" }}
            src="/helpers/Account.jpg"
            alt="Account"
          />{" "}
        </SwiperSlide>
        <SwiperSlide>
          <img style={{ width: "76%" }} src="/helpers/home.jpg" alt="home" />{" "}
        </SwiperSlide>

      </Swiper>
    </>
  );
};
