import { BiMessageRounded, BiHeart } from "react-icons/bi";
import { TbArrowBigUp, TbArrowBigDown } from "react-icons/tb";
import { AiOutlineGift } from "react-icons/ai";

// address owner;
//         string message;
//         string imageurl;
//         Status _status;
//         uint Approvecount;
//         uint declineCount;
//         bool trending;

const Post = ({ post, index, upvote, Reward }) => {
  return (
    <main className="w-[90%] mx-auto bg-white shadow-lg rounded-md p-5">
      <section className="flex w-full">
        <article className="w-1/12">
          <div className="flex flex-col items-center gap-2">
            <span className="text-green-400 text-sm">
              {Number(post.Approvecount)}
            </span>
            <TbArrowBigUp
              className="cursor-pointer text-[#39425C]"
              fontSize={26}
              onClick={() => {
                upvote(true, index);
              }}
            />
            <TbArrowBigDown
              className="cursor-pointer text-[#39425C]"
              fontSize={26}
              onClick={() => {
                upvote(false, index);
              }}
            />{" "}
            <span className="text-red-400 text-sm">
              {Number(post.declineCount)}
            </span>
          </div>
        </article>
        <article className="w-7/12 pl-3 flex items-center justify-between">
          <article className="flex flex-col  gap-2">
            <article className="flex gap-2">
              <img
                className="h-10 w-10 object-cover rounded-full"
                src={post.imageurl}
                alt="profile"
              />
              <h3 className="text-dashHeading font-semibold">
                <span className="text-black font-normal">{post.owner}</span>
              </h3>
            </article>

            <article className="w-full h-[400px] flex item-center justify-center">
              <img
                src={post.imageurl}
                alt=""
                className="w-[600px] max-h-full object-cover"
              />
            </article>
            <article className="flex justify-between text-gray-500 text-sm items-center">
              <div className="flex gap-3 items-center">
                <BiMessageRounded /> <span>{Number(post.comments)}</span>
                <BiHeart /> <span>{post.likes}</span>
              </div>
              <div
                onClick={() => {
                  Reward(index);
                }}
                className="flex gap-1 items-center cursor-pointer"
              >
                <AiOutlineGift fontSize={22} /> Reward
              </div>
            </article>
          </article>
        </article>
        <article className="w-4/12 flex p-2 items-center">
          <p>{post.message}</p>
        </article>
      </section>
    </main>
  );
};

export default Post;
