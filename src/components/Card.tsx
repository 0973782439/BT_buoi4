import React, { useRef, useState, useEffect } from "react";
import { IAlbum } from "../interface/IAlbum";
interface Props {
  dataAlbum: IAlbum[];
  selectedPhotoId: any;
  editedTitle: any;
  handleTitleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => void;
  handleEdit: (id: number, title: string) => void;
  handleReset: () => void;
  isEditing: boolean;
}
const Card: React.FC<Props> = ({
  handleEdit,
  dataAlbum,
  selectedPhotoId,
  editedTitle,
  handleTitleChange,
  handleReset,
  isEditing,
}) => {
  const inputRef = useRef<any>(null);
  useEffect(() => {
    inputRef?.current?.focus();
  }, [editedTitle]);

  return (
    <div className="flex justify-center items-center flex-col mt-10">
      {dataAlbum.map((item: IAlbum, ind) => {
        return (
          <div
            key={item.id}
            className={`flex flex-col items-center ${
              item.id % 2 === 0 ? "bg-gray-300" : "bg-white"
            } border my-3 border-gray-200 rounded-lg shadow md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 w-1/2 animation `}
          >
            <img
              className="object-cover w-[100px] h-[100px] p-2 rounded-full"
              src={item.thumbnailUrl}
              alt="avatar"
            />
            <div className="flex flex-col flex-grow justify-between p-4 leading-normal">
              {isEditing && selectedPhotoId.has(item.id) ? (
                <input
                  onBlur={() => handleReset()}
                  ref={inputRef}
                  onChange={(e) => handleTitleChange(e, item.id)}
                  value={editedTitle[item.id]}
                  type="text"
                  id="first_name"
                  className={`border-none outline-0 border-gray-300 ${
                    item.id % 2 === 0 ? "bg-gray-300" : "bg-white"
                  } text-gray-900 text-sm rounded-lg block w-full p-2.5 hover:bg-gray-100 dark:text-white cursor-pointer`}
                />
              ) : (
                <label
                  onClick={() => handleEdit(item.id, item.title)}
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white cursor-pointer"
                >
                  {item.title}
                </label>
              )}
              <i>{new Date().toLocaleString()}</i>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
