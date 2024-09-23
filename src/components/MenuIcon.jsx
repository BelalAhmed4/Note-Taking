import { close, menu } from "../assets/index";

export default function MenuIcon({ show, handleClick }) {
  return (
    <div
      onClick={handleClick}
      className="bg-slate-950 dark:bg-transparent hover:bg-slate-800 cursor-pointer flex justify-center items-center h-[39px] w-[39px] rounded-md">
      <img src={show ? close : menu} alt="menu" />
    </div>
  );
}
