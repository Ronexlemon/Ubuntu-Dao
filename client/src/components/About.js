import { ourPromiseSource } from "../helpers/aboutSource";

const About = () => {
  return (
    <main className="bg-about font-kumbh bg-no-repeat bg-cover h-auto flex flex-col justify-center items-center p-2 md:p-5">
      <section className="container mx-auto h-full flex flex-col justify-around">
        <article className="flex flex-col md:flex-row py-4">
          <article className="w-full md:w-6/12 p-5">
            <h3 className="font-semibold text-text text-center md:text-left text-2xl md:text-5xl">
              A Platform built for the Community
            </h3>
          </article>
          <article className="w-full md:w-6/12 p-5">
            <p className="text-text text-center md:text-left text-lg font-bold">
              A Decentralized verification system that uses a DAO and blockchain
              technology to enable transparent and secure consensus, allowing
              users to easily verify real-world scenarios online and start
              community initiatives
            </p>
          </article>
        </article>
        <article className="p-5 mt-5 md:0 flex gap-4 md:gap-10 justify-evenly md:justify-between flex-wrap">
          {ourPromiseSource.map((data) => (
            <article
              key={data.id}
              className="md:w-[30%] flex flex-col gap-1 shadow-2xl md:shadow-none p-2 rounded-md"
            >
              <div className="flex justify-start">
                <img src={data.image} alt="promise" />
              </div>
              <div className="">
                <h1 className="font-semibold text-2xl pb-2">{data.title}</h1>
                <p className=" text-base py-2">{data.content}</p>
              </div>
            </article>
          ))}
        </article>
      </section>
    </main>
  );
};

export default About;
