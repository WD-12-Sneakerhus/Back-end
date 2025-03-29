
import HeroSection from "../../components/user/HeroSection";
import FeaturedCategories from "../../components/user/FeaturedCategories";
import NewArrivals from "../../components/user/NewArrivals";

const Home = () => {
  return (
    <div className="bg-gray-100">
      <HeroSection />
      <NewArrivals />
      <FeaturedCategories />

    </div>
  );
};

export default Home;
