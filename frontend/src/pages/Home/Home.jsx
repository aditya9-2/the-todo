import TodoCard from "../../components/Cards/TodoCard";
import Navbar from "../../components/Navbar/Navbar";
import { MdAdd } from "react-icons/md";
import AddEditTodos from "./AddEditTodos";
import { useState } from "react";
import Modal from "react-modal";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  return (
    <>
      <Navbar />

      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <TodoCard
            title="go to gym"
            date="09 Sep 2024"
            content="Go to gym after office"
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinTodo={() => {}}
          />
        </div>
      </div>

      <button
        className="w-14 h-14 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLable=""
        className="w-[40%] max-h-3/4 bg-white mx-auto mt-16 p-5 overflow-scrol rounded-md"
      >
        <AddEditTodos
          type={openAddEditModal.type}
          todoData={openAddEditModal.data}
          onclose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", date: null });
          }}
        />
      </Modal>
    </>
  );
};

export default Home;
