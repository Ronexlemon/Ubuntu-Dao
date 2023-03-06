import { MdOutlineSearch } from "react-icons/md";
import Posts from "../components/Posts";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <main>
      <section className="flex">
        <Sidebar />
        <section className="lg:w-10/12 bg-section">
          <section>
            <article className="flex justify-between items-center p-5 bg-white">
              <form className="flex py-0.5 px-2 items-center border border-gray-300 overflow-hidden rounded-xl justify-between ">
                <MdOutlineSearch fontSize={26} className="text-gray-500" />
                <input
                  type="text"
                  className="py-1.5  px-2 w-full outline-none bg-transparent  text-sm  placeholder:text-gray-400 placeholder:text-sm"
                  placeholder="Search for posts"
                  name="search"
                />
              </form>
              <button className="px-3 py-1 w-fit cursor-pointer rounded-full hover:rounded-none bg-button text-white">
                Connect Wallet
              </button>
            </article>
          </section>
          <section className="w-[90%] mx-auto bg-dashHeading rounded-md text-dashHeading m-5 p-5">
            <article className="flex flex-col gap-3">
              <h1 className="font-bold text-xl">
                Verify Real-World Scenarios through our platform{" "}
              </h1>
              <p className="w-[80%]">
                A Decentralized verification system using DAO and blockchain
                technology to enable transparent and secure consensus, allowing
                users to easily verify real-world scenarios online and start
                community initiatives
              </p>
              <button className="px-3 py-1 bg-white font-medium w-fit cursor-pointer rounded-lg">
                Find Out now
              </button>
            </article>
          </section>
          <section>
            <Posts />
          </section>
        </section>
      </section>
    </main>
  );
};

export default Dashboard;
