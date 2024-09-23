import { useRef, useState } from "react";
import { logo } from "../assets/index.js";
import { Button } from "../components/index.js";
import ResultModal from "./ResultModal.jsx";
import { data, updateLocalStorageData, addTask } from "../../data.js";
import styles from "../../style.js";
export default function ProjectBoard({
  shownBoard,
  setShownBoard,
  activeItemIndex,
  toggleSideBar,
}) {
  const handleClick = (value) => {
    setShownBoard(value);
  };
  let closeAside = () => toggleSideBar(false);
  function Hero() {
    return (
      <div
        onClick={closeAside}
        className="flex flex-col w-full justify-center items-center">
        <img src={logo} alt="logo" width={100} height={100} />
        <h2 className="mt-3 text-3xl text-slate-950 dark:text-slate-50 font-semibold font-poppins">
          No Projects Selected
        </h2>
        <p className="mt-3 font-poppins text-sm text-slate-800 dark:text-slate-100">
          Select a Project or Select a New One
        </p>
        <Button
          styles={
            "bg-slate-900 dark:bg-slate-50 mt-5 cursor-pointer rounded-md m-5 text-lg font-semibold text-slate-300 dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-slate-200 p-3 text-center font-poppins"
          }
          handleClick={() => handleClick("createProject")}>
          Creat New Project
        </Button>
      </div>
    );
  }
  return (
    <section className="md:w-[85vw] w-[95vw] m-auto flex items-center min-h-[90vh]">
      {shownBoard === "hero" ? (
        <Hero />
      ) : shownBoard === "createProject" ? (
        <CreatProject
          setShownBoard={setShownBoard}
          toggleSideBar={toggleSideBar}
        />
      ) : shownBoard === "displayProduct" ? (
        <DisplayProject
          activeItemIndex={activeItemIndex}
          setShownBoard={handleClick}
          toggleSideBar={toggleSideBar}
        />
      ) : null}
    </section>
  );
}

function DisplayProject({ activeItemIndex, setShownBoard, toggleSideBar }) {
  let closeAside = () => toggleSideBar(false);
  let [newTask, setNewTaskAdded] = useState(false);
  let [submitBtn, setSubmitBtn] = useState(true);
  let taskInput = useRef();
  let handleDeleteProject = (activeItemIndex) => {
    data.splice(activeItemIndex, 1);
    updateLocalStorageData();
    setShownBoard("hero");
  };
  let handleDeleteTask = (activeItemIndex, taskIndex) => {
    data[activeItemIndex].tasks.splice(taskIndex, 1);
    updateLocalStorageData();
    setNewTaskAdded((prev) => !prev);
  };
  const [tempActiveItemIndex, setTempActiveItemIndex] = useState(null);
  const [tempTaskIndex, setTempTaskIndex] = useState(null);
  const handleUpdateTask = (activeItemIndex, taskIndex) => {
    if (data[activeItemIndex] && data[activeItemIndex].tasks) {
      setTempActiveItemIndex(activeItemIndex);
      setTempTaskIndex(taskIndex);
      taskInput.current.value = data[activeItemIndex].tasks[taskIndex];
      setSubmitBtn((prev) => !prev);
    }
  };

  const handleUpdatingInputBtn = () => {
    if (tempActiveItemIndex !== null && tempTaskIndex !== null) {
      let updatedTask = taskInput.current.value;
      if (updatedTask !== "") {
        data[tempActiveItemIndex].tasks[tempTaskIndex] = updatedTask;
        updateLocalStorageData(); // Ensure data persistence
        taskInput.current.value = ""; // Clear input after update
        setSubmitBtn((prev) => !prev); // Toggle button state or trigger re-render
      }
    }
  };

  function handleAddingTask() {
    if (taskInput.current.value !== "" && taskInput.current.value !== "") {
      addTask(`${taskInput.current.value}`, activeItemIndex);
      setNewTaskAdded((prev) => !prev);
      taskInput.current.value = "";
    }
  }
  return (
    <section onClick={closeAside} className="w-full">
      <div
        onClick={() => setToggleThemeFunc(false)}
        className="flex flex-col w-full md:p-16 p-6 h-auto justify-center">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between mt-5">
            <h1 className="text-slate-900 dark:text-slate-100 text-6xl font-semibold font-poppins">
              {data[activeItemIndex].title}
            </h1>
            <Button
              styles={
                "font-semibold text-lg text-slate-800 dark:text-slate-100 py-3 px-4 cursor-pointer hover:bg-red-400 hover:text-slate-100 duration-200 ease-in rounded-md"
              }
              handleClick={() => handleDeleteProject(activeItemIndex)}>
              Delete
            </Button>
          </div>
          <span className="text-sm font-poppins text-slate-600 dark:text-slate-200">
            {data[activeItemIndex].date}
          </span>

          <p className="mt-5 h-16 font-poppins text-slate-900 dark:text-slate-100 text-lg">
            {data[activeItemIndex].description}
          </p>
        </div>
        <hr className="w-full bg-gray-200 rounded-md h-1 mb-7" />
        <div className="flex flex-col">
          <h2 className="text-4xl font-semibold text-slate-900 dark:text-slate-100 font-poppins mb-5">
            Tasks
          </h2>
          <div className="flex items-center gap-3">
            <input
              ref={taskInput}
              type="text"
              className="font-poppins text-slate-900 outline-none p-2 bg-slate-300 rounded-md"
            />
            <Button
              handleClick={
                submitBtn
                  ? handleAddingTask
                  : () => handleUpdatingInputBtn(activeItemIndex)
              }
              styles={
                "font-poppins text-lg py-2 md:px-4 px-1 hover:bg-slate-600 rounded-md cursor-pointer dark:text-slate-50 "
              }>
              <span className="text-center">
                {submitBtn ? "Add Task" : "Update"}
              </span>
            </Button>
          </div>
          <ul className={`bg-slate-200 rounded-md mt-5 p-5 overflow-y-auto`}>
            {data[activeItemIndex].tasks.length < 1 ? (
              <p className="font-poppins text-sm text-slate-900">
                No Tasks Yet
              </p>
            ) : (
              data[activeItemIndex].tasks.map((task, taskIndex) => (
                <li
                  className={`flex justify-between items-center font-poppins text-slate-900 text-lg p-3 rounded-lg ${
                    taskIndex !== data[activeItemIndex].tasks.length - 1 &&
                    "mb-4"
                  } `}
                  key={taskIndex}>
                  {task}
                  <div className="flex gap-3">
                    <Button
                      styles={
                        "text-lg text-slate-600 py-2 px-3 cursor-pointer hover:text-green-600 duration-200 ease-in"
                      }
                      handleClick={() =>
                        handleUpdateTask(activeItemIndex, taskIndex)
                      }>
                      Update
                    </Button>
                    <Button
                      styles={
                        "text-lg text-slate-600 py-2 px-3 cursor-pointer hover:text-red-400 duration-200 ease-in"
                      }
                      handleClick={() =>
                        handleDeleteTask(activeItemIndex, taskIndex)
                      }>
                      Clear
                    </Button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
export function CreatProject({ setShownBoard, toggleSideBar }) {
  let dialogRef = useRef();
  let closeAside = () => toggleSideBar(false);
  let [warning, setWarning] = useState(false);
  const titleInputRef = useRef();
  const descInputRef = useRef();
  const dateInputRef = useRef();
  function pushNewProject() {
    if (
      (titleInputRef.current.value !== "") &
      (descInputRef.current.value !== "") &
      (dateInputRef.current.value !== "")
    ) {
      let title = titleInputRef.current.value;
      let description = descInputRef.current.value;
      let date = dateInputRef.current.value;
      data.push({
        title: title,
        description: description,
        date: date,
        tasks: [],
      });
      updateLocalStorageData();
      dialogRef.current.showModal();
    } else {
      setWarning((prev) => !prev);
    }
  }
  const handleClick = (value) => {
    setShownBoard(value);
  };
  return (
    <>
      <ResultModal
        ref={dialogRef}
        handleFormBtnClick={() => {
          handleClick("hero");
        }}
      />
      <div
        className={"flex flex-col w-[100%] md:p-16 p-6 h-full justify-center"}
        onClick={closeAside}>
        <div className={`mb-5`}>
          <h2
            className={`${styles.heading2} uppercase text-slate-900 dark:text-slate-50`}>
            title
          </h2>
          <input
            ref={titleInputRef}
            type="text"
            className="bg-slate-300 text-slate-800 border-b-2 border-transparent outline-none focus-within:border-slate-900 sm:w-[700px] w-[330px] p-1 font-poppins font-semibold"
          />
        </div>
        <div className={`mb-5`}>
          <h2
            className={`${styles.heading2} uppercase text-slate-900 dark:text-slate-50`}>
            description
          </h2>
          <textarea
            ref={descInputRef}
            rows={6}
            className="bg-slate-300 text-slate-800 border-b-2 border-transparent outline-none focus-within:border-slate-900 p-1 sm:w-[700px] w-[330px] font-poppins font-semibold"
          />
        </div>
        <div>
          <h2
            className={`${styles.heading2} uppercase text-slate-900 dark:text-slate-50`}>
            due date
          </h2>
          <input
            ref={dateInputRef}
            type="date"
            className="bg-slate-300 p-1 text-slate-800  border-b-2 border-transparent outline-none focus-within:border-slate-900 sm:w-[700px] w-[330px] font-poppins font-semibold"
          />
        </div>
        <div className="flex justify-between items-center mt-6 sm:w-[700px] w-[330px]">
          <span
            className={`${
              warning ? "block" : "invisible"
            } text-red-500 text-lg font-semibold italic`}>
            - Please Fill All The Empty Input Fields -
          </span>
          <div className="flex gap-2 items-center">
            <Button
              styles={
                "py-3 px-6 cursor-pointer text-slate-700 dark:text-slate-50 font-semibold rounded-md hover:bg-slate-500"
              }
              handleClick={() => handleClick("hero")}>
              Cancel
            </Button>
            <Button
              styles={
                "py-3 px-6 cursor-pointer text-slate-50 font-semibold bg-slate-950 rounded-md hover:bg-slate-900"
              }
              handleClick={pushNewProject}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
