import Post from "./Post";
import { data } from "../helpers/postSource";

const Posts = () => {
  return (
    <main className="flex flex-col gap-5">
      {data.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </main>
  );
};

export default Posts;
