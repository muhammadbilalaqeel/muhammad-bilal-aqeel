import React, { useContext, useState } from "react";
import { userContextValue } from "../context/USERContext";
import Button from "../components/Button";
import StatusBadge from "../components/StatusBadge";
import { TbEditCircle } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { taskContextValue } from "../context/TasksContext";
import ModalBox from "../components/ModalBox";
const Dashboard = () => {
  const { userData } = useContext(userContextValue);
  const { tasks, taskStats } = useContext(taskContextValue);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [deleteAll, setDeleteAll] = useState(false);
  const handleEditBtn = (task) => {
    setDeleteData(null);
    setEditData(task);
    setModalOpen(true);
  };
  const handleAddBtn = () => {
    setDeleteData(null);
    setEditData(null);
    setDeleteAll(false);
    setModalOpen(true);
  };
  const handleDeleteBtn = (task) => {
    setEditData(null);
    setDeleteData(task);
    setModalOpen(true);
  };

  const handleAllDelete = () => {
    setEditData(null);
    setDeleteData(null);
    setDeleteAll(true);
    setModalOpen(true);
  };
  return (
    <div className="sm:px-8 px-4 py-8">
      <div className="pb-8">
        <h1 className="text-center md:text-5xl text-3xl">
          Welcome <span className="grad">{userData?.name}</span>
        </h1>
      </div>
      <div className="grid sm:grid-cols-3 md:gap-8 gap-5 py-8">
        <div className="flex flex-col min-w-[150px] border border-gray-700 md:p-6 p-3 rounded-xl">
          <h3 className="text-left md:text-xl text-base text-gray-500">
            Total Tasks
          </h3>
          <span className="text-right grad md:text-3xl text-xl">
            {taskStats?.totalTasks}
          </span>
        </div>
        <div className="flex flex-col min-w-[150px] border border-gray-700 md:p-6 p-3 rounded-xl">
          <h3 className="text-left md:text-xl text-base text-gray-500">
            Completed Tasks
          </h3>
          <span className="text-right grad md:text-3xl text-xl">
            {taskStats?.totalCompletedTasks}
          </span>
        </div>
        <div className="flex flex-col min-w-[150px] border border-gray-700 md:p-6 p-3 rounded-xl">
          <h3 className="text-left md:text-xl text-base text-gray-500">
            Pending Tasks
          </h3>
          <span className="text-right grad md:text-3xl text-xl">
            {taskStats?.totalPendingTasks}
          </span>
        </div>
      </div>

      <div>
        <div className="flex sm:flex-row flex-col sm:items-center  gap-3 justify-between">
          <h2 className="sm:text-3xl text-2xl grad font-semibold">
            Your Tasks
          </h2>
          <div className="flex items-center gap-2 sm:ml-0 ml-auto">
            <Button
              text={"Delete All"}
              className={"btn-red"}
              onClick={handleAllDelete}
            />
            <Button
              text={"Add Task"}
              className={"btn-grad"}
              onClick={handleAddBtn}
            />
          </div>
        </div>

        {tasks?.length > 0 ? (
          <div className="flex w-full mt-4 border  border-gray-700 rounded-xl overflow-x-auto">
            <table className="w-full   text-gray-500 min-w-[500px]">
              <thead>
                <tr className="border-b border-gray-700 [&>th]:p-4">
                  <th className="text-left sm:text-lg text-base">No.</th>
                  <th className="text-left sm:text-lg text-base">Task</th>
                  <th className="text-left sm:text-lg text-base">Status</th>
                  <th className="text-left sm:text-lg text-base">Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => {
                  return (
                    <tr className=" [&>td]:p-4 " key={index}>
                      <td className=" sm:text-base text-sm">{index + 1}</td>
                      <td className=" sm:text-base text-sm">{task.title}</td>
                      <td>
                        {task.completed ? (
                          <StatusBadge status={"completed"} />
                        ) : (
                          <StatusBadge status={"pending"} />
                        )}
                      </td>
                      <td className="flex gap-3">
                        <button onClick={() => handleEditBtn(task)}>
                          <TbEditCircle className="text-green-600 text-xl" />
                        </button>
                        <button onClick={() => handleDeleteBtn(task)}>
                          <MdDeleteOutline className="text-red-600 text-xl" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center mt-8 text-gray-500">No task found</p>
        )}

        {modalOpen && (
          <ModalBox
            setModalOpen={setModalOpen}
            editData={editData}
            deleteData={deleteData}
            deleteAll={deleteAll}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
