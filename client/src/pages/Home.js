import About from "../components/About";
import Footer from "../components/Footer";
import Join from "../components/Join";
import LandingPage from "../components/LandingPage";
import NewFooter from "../components/NewFooter";

const Home = () => {
  return (
    <main className="font-poppins">
      <LandingPage />
      <About />

      <NewFooter />
      {/* <Footer /> */}
    </main>
  );
};

export default Home;
