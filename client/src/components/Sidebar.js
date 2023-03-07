import {
  MdDashboard,
  MdOutlineLocalPostOffice,
  MdHelpOutline,
  MdPeopleOutline,
} from "react-icons/md";
import { SiOpensourceinitiative, SiGoogleanalytics } from "react-icons/si";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <main className="hidden md:block sticky top-0 box-border h-screen lg:w-2/12 text-center bg-sidebg">
      <section className="h-12 flex items-center justify-center border-b border-gray-200">
        <h3 className="text-xl font-bold ">Ubuntu Dao</h3>
      </section>
      <section className="h-[calc(100vh_-_48px)] flex flex-col justify-between">
        <section className="">
          <ul className="flex flex-col gap-5">
            <p className="text-lg flex items-center gap-2 font-bold text-sideText">
              <MdDashboard /> Dashboard
            </p>

            <li className="flex items-center gap-1  font-semibold cursor-pointer p-1 text-sideText py-1 px-3 hover:bg-sideHover">
              <MdOutlineLocalPostOffice /> <Link to="/create_post">Create Post</Link>
            </li>
            <li className="flex items-center gap-1  font-semibold cursor-pointer p-1 text-sideText py-1 px-3 hover:bg-sideHover">
              <SiOpensourceinitiative /> Initiatives
            </li>
            <li className="flex items-center gap-1  font-semibold cursor-pointer p-1 text-sideText py-1 px-3 hover:bg-sideHover">
              <SiGoogleanalytics /> <Link to="/trending">Trending</Link>
            </li>
            <li className="flex items-center gap-1  font-semibold cursor-pointer p-1 text-sideText py-1 px-3 hover:bg-sideHover">
              <MdPeopleOutline /> Community
            </li>
          </ul>
        </section>
        <section className="py-5">
          <article className="flex flex-col items-center gap-2">
            <MdHelpOutline className="text-2xl bg-white rounded-full" />
            <p className="text-white">Help Center</p>
          </article>
          <article className="p-5">
            <p className="text-gray-600 font-medium text-sm">
              Having trouble in UbuntuDao? Please contact us for more question
            </p>
          </article>
          <article>
            <span className="bg-dashboardButton px-3 py-2 text-white cursor-pointer">
              Go To Help Center
            </span>
          </article>
        </section>
      </section>
    </main>
  );
};

export default Sidebar;
