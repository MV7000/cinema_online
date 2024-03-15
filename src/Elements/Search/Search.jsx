import React, { useEffect, useState } from "react";
import { useContext } from "react";
import Context from "../Context/Context";
import "./search.css";
import cancel from "../../Images/cancel.png";

export default function Search() {
  const context = useContext(Context),
    [value, setValue] = useState(""),
    // Отримуємо всі фільми з бази даних
    data = context.films.results;
  // Якщо не вводимо пошук фільма ,рендерим всі фільми з API
  useEffect(() => {
    if (!value) {
      context.setSearch(data);
    }
  });
  // При пошуку переводимио користувача, на знайдений фільм
  function search(event) {
    setValue(event.target.value);
    if (event.target.value !== "") {
      window.scrollTo({
        top: 500,
        behavior: "smooth",
      });
    }
    const arr = data.filter((obj) =>
      obj.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    if (arr.length === 0) {
      context.setSearch([]);
    } else {
      context.setSearch(arr);
    }
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  return (
    <>
      <form action="search" className="searchWrapper">
        {value && (
          <img
            className="cancel"
            src={cancel}
            alt="cancel"
            onClick={() => setValue("")}
          />
        )}
        <input
          value={value}
          type="search"
          name="search"
          id="search"
          onChange={search}
          onKeyDown={search}
        />
      </form>
    </>
  );
}
