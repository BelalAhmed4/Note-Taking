import { forwardRef } from "react";
import { FcCheckmark } from "react-icons/fc";

let ResultModal = forwardRef(function ({ handleFormBtnClick }, ref) {
  let handleClick = () => {
    handleFormBtnClick("hero");
  };
  return (
    <dialog
      ref={ref}
      className="result-modal text-center bg-slate-900 absolute top-[50%] left-[50%] py-28 min-w-[380px] translate-y-[-50%] translate-x-[-50%] rounded-md">
      <h2 className="font-bold mb-5 w-[100%] text-2xl font-poppins text-slate-50 flex justify-center items-end gap-1">
        Done <FcCheckmark size={35} />
      </h2>

      <p className="text-lg sm:text-sm font-poppins text-slate-400 font-semibold">
        Project has been added successfully!
      </p>
      <form method="dialog">
        <button
          className="font-poppins text-slate-50 text-xl font-semibold rounded-md bg-slate-800 outline-none px-5 py-3 mt-5 hover:bg-slate-700 duration-200 ease-in"
          onClick={handleClick}>
          Close
        </button>
      </form>
    </dialog>
  );
});
export default ResultModal;
