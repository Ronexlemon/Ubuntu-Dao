import About from "../components/About";
import NewFooter from "../components/NewFooter";
import Join from "../components/Join";
import LandingPage from "../components/LandingPage";

const Home = () => {
  return (
    <main className="font-poppins">
      <LandingPage />
      <About />
      <Join />
      <NewFooter />
    </main>
  );
};

export default Home;
