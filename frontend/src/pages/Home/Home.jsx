/* eslint-disable react-hooks/exhaustive-deps */
import TodoCard from "../../components/Cards/TodoCard";
import Navbar from "../../components/Navbar/Navbar";
import { MdAdd } from "react-icons/md";
import AddEditTodos from "./AddEditTodos";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/ToastMessage/Toast";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMessage, setShowToastMessage] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const showToastMessageFunction = (message, type) => {
    setShowToastMessage({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMessage({
      isShown: false,
      message: "",
    });
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/users/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/users/get-all-notes");
      if (response.data && response.data.allNotes) {
        setAllNotes(response.data.allNotes);
      }
    } catch (error) {
      console.log(`an unespected error accurred: ${error}`);
    }
  };

  const deleteTodo = async (data) => {
    const noteId = data._id;

    try {
      const response = await axiosInstance.delete(
        `/users/delete-note/${noteId}`
      );

      if (response?.data?.note) {
        showToastMessageFunction("Todo deleted Successfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    getUserInfo();
    getAllNotes();
    return () => {};
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />

      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-3 gap-4 mt-8">
          {allNotes.length > 0 ? (
            allNotes.map((item) => (
              <TodoCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteTodo(item)}
                onPinTodo={() => {}}
              />
            ))
          ) : (
            <p>No notes available.</p>
          )}
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
          getAllNotes={getAllNotes}
          showToastMessageFunction={showToastMessageFunction}
        />
      </Modal>

      <Toast
        isShown={showToastMessage.isShown}
        message={showToastMessage.message}
        type={showToastMessage.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
