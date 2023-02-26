import { ourPromiseSource } from "../helpers/aboutSource";

const About = () => {
  return (
    <main className="bg-about p-5">
      <section className="container mx-auto">
        <article className="flex p-5 justify-center">
          <h1 className="font-bold text-2xl">How it works</h1>
        </article>
        <article className="flex">
          <article className="w-6/12 p-5">
            <h3 className="font-bold text-text text-4xl">
              A Platform built for the community
            </h3>
          </article>
          <article className="w-6/12 p-5">
            <p className="text-text font-medium">
              A Decentralized verification system that uses a DAO and blockchain
              technology to enable transparent and secure consensus, allowing
              users to easily verify real-world scenarios online and start
              community initiatives
            </p>
          </article>
        </article>
        <article className="p-5 mt-5 md:0 flex gap-4 md:gap-10 justify-evenly md:justify-between flex-wrap">
          {ourPromiseSource.map((data) => (
            <article key={data.id} className="md:w-[30%] flex flex-col gap-1">
              <div className="w-2/12">
                <img src={data.image} alt="promise" />
              </div>
              <div className="w-10/12">
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
