import React, { useContext } from "react";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { taskContextValue } from "../context/TasksContext";
const ModalBox = ({ setModalOpen, editData, deleteData, deleteAll }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { addTask, updateTask, deleteTask, deleteAllTasks } =
    useContext(taskContextValue);
  const onSubmit = (data) => {
    console.log(editData);
    if (editData) {
      let bool = data.completed === "true";
      // console.log(bool);
      let d = {
        title: data.title,
        completed: bool,
      };
      updateTask(d, editData._id);
    }
    if (!editData && !deleteData) {
      addTask(data);
    }

    if (deleteData) {
      deleteTask(deleteData._id);
    }
    if (deleteAll) {
      deleteAllTasks();
    }
    handleClose();
  };

  const onError = (errors) => {
    toast.error(Object.values(errors)[0].message);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="absolute min-h-screen min-w-[320px] w-full top-0 left-0 flex items-center justify-center px-4">
      <div
        className="absolute bg-black/65 z-20 min-h-screen w-full"
        onClick={handleClose}
      ></div>

      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="relative z-30 bg-dark backdrop-blur-md max-w-[440px] w-full min-h-64 rounded-lg border border-gray-700 sm:p-8 p-5  flex flex-col justify-between gap-4"
      >
        <div
          className="absolute top-3 right-3 p-2 z-30 g rounded-full"
          onClick={handleClose}
        >
          <RxCross1 className="  text-lg  " />
        </div>
        {!deleteData && !deleteAll ? (
          <>
            <div className="flex flex-col gap-3">
              <label htmlFor="task" className="text-lg text-gray-500">
                Task Title
              </label>
              <input
                type="text"
                id="task"
                placeholder="e.g Complete the Navbar"
                className="w-full px-2 py-3 bg-[#1B1E24]  border border-gray-700 rounded-lg"
                defaultValue={editData?.title}
                {...register("title", {
                  required: "Title is required",
                  validate: (value) => {
                    let trimmedValue = value.trim();

                    if (trimmedValue.length === 0) {
                      return "Title cannot be empty or spaces";
                    }
                    if (trimmedValue.length < 3) {
                      return "Title must be at least 3 characters";
                    }
                    if (trimmedValue.length > 20) {
                     
                      return "Title cannot be more than 20 characters";
                    }
                    return true;
                  },
                })}
              />
            </div>
            {editData && (
              <div className="flex flex-col gap-3">
                <p>Completed</p>
                <div className="flex items-center gap-8">
                  <label htmlFor="true" className="flex items-center gap-1">
                    <input
                      type="radio"
                      id="true"
                      value={true}
                      {...register("completed")}
                      defaultChecked={editData.completed === true}
                    />
                    True
                  </label>
                  <label htmlFor="false" className="flex items-center gap-1">
                    <input
                      type="radio"
                      id="false"
                      value={false}
                      {...register("completed")}
                      defaultChecked={editData.completed === false}
                    />
                    False
                  </label>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <Button
                text={editData ? "Update" : "Add"}
                className={"btn-grad"}
              />
            </div>
          </>
        ) : (
          <div className="my-auto flex flex-col gap-4">
            <p className="text-lg text-center text-gray-500">
              You really want to delete {deleteData?.title}
            </p>
            <div className="flex justify-center">
              <Button text={"Yes"} className={"btn-red"} />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ModalBox;
