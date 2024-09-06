import Home from "./components/home/Home";
import GradientDivider from "./components/home/subComponents/GradientDivider";
import HomeCarousel from "./components/home/subComponents/HomeCarousel";
import Title from "./components/home/Title";
import "./globals.css";
import carouselData from "./components/home/subComponents/carousel.json";
import Navbar from "./components/navbar/Navbar";

export default function Page() {
  return (
    <>
      <Navbar />
      <Home />
      <GradientDivider />
      <Title />
      <HomeCarousel 
        title="LivingRoom"
        autoplay={false}
        carousel={carouselData.carousels}
      />
      <HomeCarousel 
        title="Kitchen"
        autoplay={false}
        carousel={carouselData.carousels}
      />
      <HomeCarousel 
        title="Bedroom"
        autoplay={false}
        carousel={carouselData.carousels}
      />
      <HomeCarousel 
        title="Bathroom"
        autoplay={false}
        carousel={carouselData.carousels}
      /> 
    </>
  );
}