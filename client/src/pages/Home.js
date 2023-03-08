import About from "../components/About";
import Footer from "../components/Footer";
import Join from "../components/Join";
import LandingPage from "../components/LandingPage";

const Home = () => {
  return (
    <main className="font-poppins">
      <LandingPage />
      <About />

      <Footer />
    </main>
  );
};

export default Home;
