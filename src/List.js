import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ items, removeItem, editItem }) => {
  return (
    <>
      <div className="listed--items">
        {items.map((item) => {
          const { id, title } = item;
          return (
            <article className=" p-3 flex items-center justify-center">
              <div key={id} className="bg-slate-100 rounded w-1/2 p-4 border-b">
                <div className="listItems flex items-center justify-between">
                  <div className="title">{title}</div>
                  <div className="actions flex space-x-2">
                    <button type="button" onClick={() => editItem(id)}>
                      <FaEdit className="text-blue-600" />
                    </button>
                    <button type="button" onClick={() => removeItem(id)}>
                      <FaTrash className="text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
};

export default List;
