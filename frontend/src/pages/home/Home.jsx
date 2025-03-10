import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Carousel from "../../components/section/home/BannerArea/carousel";
import WorkArea from "../../components/section/home/WorkArea/WorkArea";

export default function Home() {
  let slides = [

    "https://file.hstatic.net/200000201805/article/a_9a1cb7cc4120473d99c61950a785ef43.jpg",
    "https://file.hstatic.net/200000201805/article/1_ba82ef60041c4672b2463fe18c2e6f5f.jpg",
    "https://heartfulflavours.com/cdn/shop/articles/Healthy_Dietary_Pattern.png?v=1694096108",
    "https://file.hstatic.net/200000827051/article/thuc-don-giam-can-trong-7-ngay-2_d3f0b02957444ff3b6018d6c6314137e.jpg",
  ];
  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-[100%] m-auto ">
        <Carousel slides={slides} />
      </div>
      <WorkArea />
      {/* <Footer /> */}
    </div>
  );
}
