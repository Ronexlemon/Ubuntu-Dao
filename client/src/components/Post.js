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

const Post = ({ post,index,upvote }) => {
  return (
    <main className="w-[90%] mx-auto bg-white shadow-lg round-lg p-5">
      <section  className="flex items-center w-full">
        <article className="w-1/12">
          <img
            className="h-16 w-16 object-cover rounded-full"
            src={post.imageurl}
            alt="profile"
          />
        </article>
        <article className="w-11/12 flex items-center justify-between">
          <article className="flex flex-col gap-2">
            <h3 className="text-dashHeading font-semibold">
              {/* {post.message} */}
              <span className="text-black font-normal">{post.owner}</span>
            </h3>
            <p>{post.message}</p>
            <img src={post.imageurl} alt="" className="h-[300px] object-cover w-[600px]" />
            <article className="flex text-gray-500 text-sm items-center gap-10">
              <div className="flex gap-1 items-center">
                <BiMessageRounded /> <span>{Number(post.Approvecount)}</span>
              </div>
              <div className="flex  gap-x-40 items-center ">
                {console.log("index",index)}
                <BiHeart /> <span>{post.likes}</span>
                <div className="flex gap-x-5 justify-evenly items-center">

                <span className="text-green-400 text-sm">{Number(post.Approvecount)}</span><BiUpArrow onClick={()=>{upvote(true,index)}} />
            
             <BiDownArrow onClick={()=>{upvote(false,index)}} /> <span className="text-red-400 text-sm">{Number(post.declineCount)}</span>
                
                </div>
                
                
              </div>
            </article>
          </article>
          <article className="flex flex-col gap-1 justify-center items-center">
           
          </article>
        </article>
      </section>
    </main>
  );
};

export default Post;
