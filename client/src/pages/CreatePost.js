import Form from "../components/Form";
import Sidebar from "../components/Sidebar";

const CreatePost = () => {
  return (
    <main className="flex">
      <Sidebar />
      <section className="lg:w-10/12">
        <Form />
      </section>
    </main>
  );
};

export default CreatePost;
