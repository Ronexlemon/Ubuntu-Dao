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
  
  const DisplayTrending = ({ post,index }) => {
    return (
      <main className="w-[90%] mx-auto bg-white shadow-lg round-lg p-5">
        <section  className="flex items-center  w-full">
          
          <article className="w-11/12 flex items-center justify-between">
            <article className="flex flex-col gap-2">
              <h3 className="text-dashHeading font-semibold">
                {/* {post.message} */}
                <span className="px-5">From:</span>
                <span className="text-black font-normal">{post.owner}</span>
              </h3>
              <p>{post.message}</p>
              
              <article className="flex text-gray-500 text-sm items-center gap-10">
                
               
                  
                
                  <div className="flex gap-x-40 justify-evenly items-center">
                    <div>
                        {Number(post.Approvecount)>=Number(post.declineCount)?<h3>Likes: <span className="text-green-400 px-5">{Number(post.Approvecount)}</span> </h3>:<h3>DisLikes: <span className="text-red-400 px-5">{Number(post.declineCount)}</span></h3> }
                    
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
  
  export default DisplayTrending;
  