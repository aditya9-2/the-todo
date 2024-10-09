const AddEditTodos = () => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <label className="input-lable">TITLE</label>

        <input
          type="text"
          className="text-xl text-slate-950 outline-none"
          placeholder="Add title"
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-lable">CONTENT</label>

        <textarea
          type="text"
          className="text-xl text-slate-950 outline-none bg-slate-100 p-2 rounded"
          placeholder="Add description"
          rows={5}
        ></textarea>
      </div>

      <button className="btn-primary font-medium mt-5 p-3" onClick={() => {}}>
        ADD
      </button>
    </div>
  );
};

export default AddEditTodos;
