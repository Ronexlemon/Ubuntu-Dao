import { useState } from "react";
import MainScreen from "../assets/mainScreen.svg";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  const [ active, setActive ] = useState(false);

  return (
    <main className="bg-landing bg-no-repeat bg-cover h-screen">
      <Navbar />
      <section className="md:h-screen overflow-hidden flex items-center">
        <section className="container mx-auto flex flex-col justify-between md:flex-row items-center">
          <article className="w-full flex items-center flex-col p-5 md:w-6/12 text-center md:text-left md:block">
            <h1 className="font-extrabold text-text text-3xl md:text-5xl lg:text-6xl p-2 md:p-0 md:pb-5">
              Verify Real-World Scenarios through Ubuntu DAO
            </h1>
            <p className="font-semibold p-2  md:py-5 md:text-lg text-text font-sans">
              Bridging the real-world communities to the Online communities
            </p>
            <article className="flex items-center gap-10">
              <button className="flex items-center mt-5 bg-button text-white rounded-3xl font-bold  py-2 px-4 w-fit">
                Get Started
              </button>
              <button className="flex items-center mt-5 border border-black text-black rounded-3xl font-bold  py-2 px-4 w-fit">
                Browse Features
              </button>
            </article>
          </article>
          <article className="w-full  p-5 md:w-6/12">
            <img className="w-full md:w-5/6" src={MainScreen} alt="landing" />
          </article>
        </section>
      </section>
    </main>
  );
};

export default LandingPage;
