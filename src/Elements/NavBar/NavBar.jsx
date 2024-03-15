import React, { useContext } from "react";
import Search from "../Search/Search";
import Context from "../Context/Context";
import Cloze from "../../Methods/Cloze";

import "./navBar.css";
import { Link } from "react-router-dom";
// Навігаційна панель з лого
export default function NavBar() {
  const context = useContext(Context);
  return (
    <>
      <div className="navBarWrapper">
        <Link onClick={() => Cloze(context)} to={"/"} className="headerEmblem">
          Vilm
        </Link>
        <Search />
      </div>
    </>
  );
}
