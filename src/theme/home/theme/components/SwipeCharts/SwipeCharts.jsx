// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { AreaCharts } from "./charts/AreaCharts";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { CandleCharts } from "./charts/CandleCharts";

export const SwipeCharts = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 7000,
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
          <CandleCharts instrument ={"MSFT  |  MICROSOFT CORPORATION."} />
        </SwiperSlide>
        <SwiperSlide>
          <AreaCharts instrument ={"BTCUSD  |  BITCOIN / US DOLLAR"}/>
        </SwiperSlide>
        <SwiperSlide>
          <CandleCharts instrument ={"USDCOP  |  US DOLLAR / COLOMBIAN PESOS"}/>
        </SwiperSlide>
        <SwiperSlide>
          <AreaCharts instrument ={"IBM  |  INTERNATIONAL BUSINESS MACHINES CORPORATION"}/>
        </SwiperSlide>
        <SwiperSlide>
          <AreaCharts instrument ={"ETHUSD  |  ETHEREUM / US DOLLAR"}/>
        </SwiperSlide>
      </Swiper>
    </>
  );
};
