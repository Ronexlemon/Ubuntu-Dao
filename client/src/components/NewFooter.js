const NewFooter = () => {
  return (
    <footer className="flex flex-col md:flex-row justify-around items-center font-kumbh h-auto ">
      <article className="w-[45%]">
        <h1 className="text-3xl font-bold">Interested in Helping out? Join with us now</h1>
        <h5 className="text-sm">Receive updates on our progress, community initiatives</h5>
        <h4 className="text-sm">Newsletter</h4>
        <div className="bg-[#EFEFFF] p-5 rounded-lg">
          <h3 className="font-bold">Get monthly updates on your inbox</h3>
          <span className="flex items-center justify-center bg-white rounded-md">
              <input
                type="email"
                name=""
                id=""
                placeholder="Enter your Email.."
                className="p-3 w-[80%]"
              />
              <button className="rounded-2xl border text-white bg-gradient-to-r from-[#2B59FF] to-[#BB2BFF] border-none px-5 py-3 my-2">
                Subscribe
              </button>
            </span>
          <h4>We wont spam you promise</h4>
        </div>
      </article>
      <article className="w-[45%]">
        <h3 className="font-bold">Ubuntu Dao</h3>
        <p className="text-sm font-semibold">
          Ubuntu DAO is a Decentralized verification system that uses a DAO and
          blockchain technology to enable transparent and secure consensus,
          allowing users to easily verify real-world scenarios online and start
          community initiatives
        </p>
        <div>
          <i class="bx bxl-twitter bx-md"></i>
          <i class="bx bxl-facebook bx-md"></i>
          <i class="bx bxl-instagram bx-md"></i>
        </div>
        <div className="flex flex-col md:flex-row justify-around w-[100%]">
        <div className="my-2">
          <h3 className="font-bold mb-3">About Us</h3>
          <h4 className="text-sm my-1 ">Home</h4>
          <h4 className="text-sm my-1 ">Features</h4>
          <h4 className="text-sm my-1 ">Contact Us</h4>
        </div>
        <div className="my-2">
          <h3 className="font-bold mb-3">Community</h3>
          <h4 className="text-sm my-1 ">Twitter</h4>
          <h4 className="text-sm my-1 ">Discord</h4>
          <h4 className="text-sm my-1 ">Telegram</h4>
        </div>
        <div className="my-2">
          <h3 className="font-bold mb-3">Contact Us</h3>
          <h4 className="text-sm my-1 ">+254 799 559 285</h4>
          <h4 className="text-sm my-1 ">ubuntuDao@gmail.com</h4>
        </div>
      </div>
      </article>
    </footer>
  );
};

export default NewFooter;
