import Button from "./Button";
import { data } from "../../data";
export default function SideBar({
  show,
  handleAddProjectBtn,
  setShow,
  setActiveItem,
  activeItemIndex,
}) {
  const handleAddProjectClick = () => {
    handleAddProjectBtn("createProject");
    setActiveItem(null);
    setShow(!show);
  };
  const handleSidebarListCLick = (index) => {
    handleAddProjectBtn("displayProduct");
    setShow(!show);
    setActiveItem(index);
  };

  return (
    <aside
      className={`absolute flex flex-col items-center h-full overflow-y-auto w-[65vw] max-w-[600px] bg-slate-950 dark:bg-slate-950 p-5 z-[10] top-0 ${
        show ? "left-0" : "-left-full"
      } ease-in duration-200`}>
      <h1 className="text-2xl font-poppins text-slate-50 dark:text-slate-50 font-semibold uppercase">
        your projects
      </h1>
      <Button
        styles={
          "bg-slate-800 dark:bg-slate-50 cursor-pointer rounded-md m-5 text-lg font-semibold text-slate-300 dark:text-slate-700 hover:bg-slate-600 dark:hover:bg-slate-200 p-3 text-center font-poppins"
        }
        handleClick={handleAddProjectClick}>
        +Add Project
      </Button>
      <ul className="w-full">
        {data
          .slice()
          .reverse()
          .map((note, index) => (
            <li
              onClick={() => handleSidebarListCLick(index)}
              className={`${
                index != data.length - 1 && "mb-5"
              } rounded-md hover:bg-slate-700 p-5 text-dimWhite dark:text-slate-900 font-semibold font-poppins cursor-pointer ${
                index === activeItemIndex
                  ? "bg-slate-700 dark:bg-slate-200"
                  : "bg-slate-900 dark:bg-slate-400"
              }`}
              key={index}>
              {note.title}
            </li>
          ))}
      </ul>
    </aside>
  );
}
