import React from "react";
interface Props {
  handleCancel: () => void;
  handleSave: () => void;
  isEditing: boolean;
}
const Button: React.FC<Props> = ({ handleCancel, handleSave, isEditing }) => {
  return (
    <div className="fixed top-0 text-center mt-2 w-full">
      <button
        onClick={handleSave}
        disabled={!isEditing}
        type="submit"
        className={`${
          !isEditing
            ? "bg-white cursor-default text-black"
            : " bg-blue-600 text-white"
        } bg-gradient-to-r via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 `}
      >
        Confirm
      </button>
      <button
        type="submit"
        onClick={handleCancel}
        disabled={!isEditing}
        // disabled={!photos.some((photo) => photo.title !== photo.originalTitle)}
        className={`${
          !isEditing
            ? "bg-white cursor-default text-black"
            : " bg-red-600 text-white"
        }  bg-gradient-to-r via-red-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`}
      >
        Reset
      </button>
    </div>
  );
};

export default Button;
