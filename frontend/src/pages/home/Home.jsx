import React from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Carousel from '../../components/section/home/BannerArea/carousel';
import WorkArea from '../../components/section/home/WorkArea/WorkArea';

export default function Home() {
  let slides = [
    "https://i.pinimg.com/originals/51/82/ac/5182ac536727d576c78a9320ac62de30.jpg",
    "https://wallpapercave.com/wp/wp3386769.jpg",
    "https://wallpaperaccess.com/full/809523.jpg",
    "https://getwallpapers.com/wallpaper/full/5/c/0/606489.jpg",
  ];
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className="w-[100%] m-auto ">
        <Carousel slides={slides} />
      </div>
      <WorkArea />
      <Footer />
    </div>
  );
}
