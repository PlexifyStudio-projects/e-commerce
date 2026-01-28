import HeroBackground from '@components/Hero/HeroBackground';
import Hero from '@components/Hero';
import FeaturedProducts from '@components/FeaturedProducts';
import Categories from '@components/Categories';
import Deals from '@components/Deals';
import Brands from '@components/Brands';
const Home = () => {
  return (
    <>
      <HeroBackground
        accentColor="#B8944F"
        gradient="radial-gradient(ellipse at 30% 50%, rgba(184,148,79,0.12) 0%, transparent 70%)"
      />
      <Hero />
      <FeaturedProducts />
      <Categories />
      <Deals />
      <Brands />
    </>
  );
};

export default Home;
