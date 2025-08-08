
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import WhyChooseUs from '../components/WhyChooseUs';
import PremiumFleet from '../components/PremiumFleet';
import BookingSection from '../components/BookingSection';
import BookingProcess from '../components/BookingProcess';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <WhyChooseUs />
        <PremiumFleet />
        <BookingSection />
        <BookingProcess />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
