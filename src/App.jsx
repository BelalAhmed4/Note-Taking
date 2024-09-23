import React, { useState } from "react";
import { ProjectBoard, SideBar, MenuIcon, Header } from "./components/index";
import { CiDark } from "react-icons/ci";
import { MdLightMode } from "react-icons/md";
function App() {
  const [toggleTheme, setToggleTheme] = useState(true);
  const [showAside, setShowAside] = useState(false);
  const [displayedInProjectBoard, setDisplayedInProjectBoard] =
    useState("hero");
  const [active, setActive] = useState(null);
  function handleMenuClick() {
    setShowAside((prev) => !prev);
  }
  let handleToggleTheme = () => {
    setToggleTheme((prev) => !prev);
  };

  return (
    <div className={`${toggleTheme ? "dark" : ""}`}>
      <section
        className={`dark:bg-slate-800 relative max-w-[100vw] bg-slate-50`}>
        <Header>
          <div
            className={`w-[36px] h-[36px] rounded-full flex justify-center items-center `}>
            <span className={`cursor-pointer`}>
              {toggleTheme ? (
                <div className="p-2 bg-slate-50 rounded-full">
                  <MdLightMode size={30} onClick={handleToggleTheme} />
                </div>
              ) : (
                <CiDark size={30} onClick={handleToggleTheme} />
              )}
            </span>
          </div>

          <MenuIcon show={showAside} handleClick={handleMenuClick} />
        </Header>
        <SideBar
          show={showAside}
          setShow={setShowAside}
          handleAddProjectBtn={setDisplayedInProjectBoard}
          setShownBoard={setDisplayedInProjectBoard}
          setActiveItem={setActive}
          activeItemIndex={active}
        />
        <ProjectBoard
          shownBoard={displayedInProjectBoard}
          setShownBoard={setDisplayedInProjectBoard}
          activeItemIndex={active}
          toggleSideBar={setShowAside}
        />
      </section>
    </div>
  );
}

export default App;
