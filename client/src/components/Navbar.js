import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const expand = () => {
    setIsExpanded((isExpanded) => !isExpanded);
  };

  return (
    <main className="w-full h-[50px]">
      <section className="container mx-auto py-5  flex items-center">
        <article className="flex items-center w-3/12">
          <h1 className="text-orange font-bold text-3xl cursor-pointer">
            Ubuntu Dao
          </h1>
        </article>
        <article className="hidden md:flex items-center justify-center w-6/12">
          <ul className="flex items-center md:gap-4 gap-10  font-bold text-md cursor-pointer">
            <NavLink to="/">
              <li className="text-text">Home</li>
            </NavLink>
            <NavLink to="/posts">
              <li className="hover:text-textHeavy">Platform</li>
            </NavLink>
            <NavLink to="/about">
              <li className="">About</li>
            </NavLink>
          </ul>
        </article>
        <article className="flex items-center justify-end w-3/12">
          <button className="py-2 px-4 rounded-3xl cursor-pointer w-fit bg-button text-white font-medium">
            Get Started
          </button>
        </article>
        <article className="md:hidden">
          <div
            onClick={expand}
            className="space-y-1 p-1.5 bg-white md:hidden cursor-pointer z-50"
          >
            <div className="w-6 h-0.5 bg-black"></div>
            <div className="w-6 h-0.5 bg-black"></div>
            <div className="w-6 h-0.5 bg-black"></div>
          </div>
          {isExpanded && (
            <div>
              <ul className=" absolute top-0 left-0 bg-button text-white text-center rounded-b-1xl w-full space-y-10 p-10 z-20">
                <div className="flex justify-start" onClick={expand}>
                  {" "}
                  <i className="bx bx-x bx-md text-white"></i>
                </div>
                <li
                  className="cursor-pointer hover:text-textLight"
                  onClick={expand}
                >
                  <a href={`#home`}>Home</a>
                </li>
                <li
                  className="cursor-pointer hover:text-textLight"
                  onClick={expand}
                >
                  <a href={`#about`}>Reports</a>
                </li>
                <li
                  className="cursor-pointer hover:text-textLight"
                  onClick={expand}
                >
                  <a href={`#skills`}>About</a>
                </li>
              </ul>
            </div>
          )}
        </article>
      </section>
    </main>
  );
};

export default Navbar;
