import { getInitialName } from "../../utils/helper";

// eslint-disable-next-line react/prop-types
const ProfileInfo = ({ onLogout }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
        {getInitialName("Aditya Basak")}
      </div>

      <div className="flex items-center gap-3">
        <p className="text-sm font-medium">Aditya</p>
        <button
          className="text-sm text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded cursor-pointer"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
