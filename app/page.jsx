import CartDrawerClient from "./components/cartDrawerClient";
import FeaturedBooks from "./components/featuredBooks";
import Footer from "./components/footer";
import HeroSection from "./components/heroSection";
import NavbarClient from "./components/navbarClient";
import WhatsAppButton from "./components/whatsAppButton";
import WishlistDrawerClient from "./components/wishlistDrawerClient";

export default function Home() {
  return (
    <>
      <NavbarClient />
      <HeroSection />
      <FeaturedBooks />
      <CartDrawerClient />
      <WishlistDrawerClient />
      <WhatsAppButton />
      <Footer />
    </>
  );
}






