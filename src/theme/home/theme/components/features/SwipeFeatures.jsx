import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import dashboard from "./assets/dashboard.jpg";
import Cal from "./assets/Cal.jpg";
import CE from "./assets/CE.jpg";
import Account from "./assets/Account.jpg";
import home from "./assets/home.jpg";
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
          <img style={{ width: "100%" }} src={dashboard} alt="Dashboard" />{" "}
        </SwiperSlide>
        <SwiperSlide>
          <img style={{ width: "77%" }} src={Cal} alt="Cal" />{" "}
        </SwiperSlide>
        <SwiperSlide>
          <img style={{ width: "76%" }} src={CE} alt="CE" />{" "}
        </SwiperSlide>
        <SwiperSlide>
          <img style={{ width: "80%" }} src={Account} alt="Account" />{" "}
        </SwiperSlide>
        <SwiperSlide>
          <img style={{ width: "76%" }} src={home} alt="home" />{" "}
        </SwiperSlide>
      </Swiper>
    </>
  );
};
