import {
  BiMessageRounded,
  BiHeart,
  BiUpArrow,
  BiDownArrow,
} from "react-icons/bi";
// address owner;
//         string message;
//         string imageurl;
//         Status _status;
//         uint Approvecount;
//         uint declineCount;
//         bool trending;

const Post = ({ post }) => {
  return (
    <main className="w-[90%] mx-auto bg-white shadow-lg round-lg p-5">
      <section className="flex items-center w-full">
        <article className="w-1/12">
          <img
            className="h-16 w-16 object-cover rounded-full"
            src={console.log("image url",post.image)}
            alt="profile"
          />
        </article>
        <article className="w-11/12 flex items-center justify-between">
          <article className="flex flex-col gap-2">
            <h3 className="text-dashHeading font-semibold">
              {post.message}
              <span className="text-black font-normal">{post.owner}</span>
            </h3>
            <p>{post.content}</p>
            <img src={post.imageurl.toString()} alt="" className="h-[300px] object-cover w-[600px]" />
            <article className="flex text-gray-500 text-sm items-center gap-10">
              <div className="flex gap-1 items-center">
                <BiMessageRounded /> <span>{post.message}</span>
              </div>
              <div className="flex gap-1 items-center">
                <BiHeart /> <span>{post.likes}</span>
              </div>
            </article>
          </article>
          <article className="flex flex-col gap-1 justify-center items-center">
            <BiUpArrow />
            <span>{post.votes}</span>
            <BiDownArrow />
          </article>
        </article>
      </section>
    </main>
  );
};

export default Post;
