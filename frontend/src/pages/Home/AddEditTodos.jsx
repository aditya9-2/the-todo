import { useState } from "react";
import { MdClose } from "react-icons/md";

// todoData -> will add in prop when i need

// eslint-disable-next-line react/prop-types
const AddEditTodos = ({ type, onclose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, SetError] = useState(null);

  const addNewTodo = async () => {};
  const editTodo = async () => {};

  const handleAddTodo = () => {
    if (!title) {
      SetError("Please enter the title");
      return;
    }

    if (!content) {
      SetError("Please add description");
      return;
    }

    SetError("");

    if (type === "edit") {
      editTodo();
    } else {
      addNewTodo();
    }
  };

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute top-3 right-3 hover:bg-slate-50"
        onClick={onclose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>
      <div className="flex flex-col gap-2">
        <label className="input-lable">TITLE</label>

        <input
          type="text"
          className="text-xl text-slate-950 outline-none"
          placeholder="Add title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-lable">CONTENT</label>

        <textarea
          type="text"
          className="text-xl text-slate-950 outline-none bg-slate-100 p-2 rounded"
          placeholder="Add description"
          rows={5}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        ></textarea>
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddTodo}
      >
        ADD
      </button>
    </div>
  );
};

export default AddEditTodos;
