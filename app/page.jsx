// import Image from "next/image"

import FeaturedBooks from "../app/components/featuredBooks";
import HeroSection from "../app/components/heroSection";
import Navbar from "../app/components/navbar"
import Footer from "./components/footer";
import ImageRow from "./components/imageRow";
import WhatsAppButton from "./components/whatsAppButton";
export default function Home() {
  return (
    <>
    <Navbar/>
   <HeroSection/>
   <FeaturedBooks/>
      <ImageRow />
      {/* <BlogImage  /> */}
      <WhatsAppButton/>
    <Footer/>


    </>
  );
}









