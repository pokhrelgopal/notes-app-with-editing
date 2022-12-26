import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // display empty alert
      showAlert(true, "red", "You must add an item.");
    } else if (name && isEditing) {
      // we will deal later
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "green", "Item edited Successfully");
    } else {
      showAlert(true, "green", "Added Successfully");
      // adding items to the list
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show: show, type, msg });
  };
  const clearList = () => {
    showAlert(true, "red", "List Cleared");
    setList([]);
  };
  const removeItem = (id) => {
    showAlert(true, "red", "Item Removed");
    setList(list.filter((item) => item.id != id));
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };
  return (
    <>
      <section>
        <div className="container mx-auto flex items-center justify-center">
          <div className=" my-20 p-5 w-full md:w-2/3 bg-white shadow-md">
            <p className="text-xl text-center text-green-600">Note Buddy</p>
            <div className="container-form pt-14">
              <form
                className="flex items-center justify-center space-x-3"
                onSubmit={handleSubmit}
              >
                {alert.show && (
                  <Alert {...alert} removeAlert={showAlert} list={list} />
                )}
                <div className="form--control relative">
                  <input
                    type="text"
                    className="border-b px-3 py-2 focus:outline-0"
                    placeholder="e.g. finish assignments"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <button type="submit" className="absolute mt-1">
                    {isEditing ? (
                      <i class="fa-solid fa-pen-to-square text-blue-600 text-xl"></i>
                    ) : (
                      <i class="fa-solid fa-circle-plus text-green-600 text-xl"></i>
                    )}
                  </button>
                </div>
              </form>
            </div>
            {list.length > 0 && (
              <div>
                <List
                  items={list}
                  removeItem={removeItem}
                  editItem={editItem}
                />
                <div className="flex justify-center pb-5 pt-16">
                  <button
                    onClick={clearList}
                    className="bg-red-400 px-2 py-1 text-sm rounded text-white"
                  >
                    Clear Items
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
