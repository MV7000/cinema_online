import React from "react";
import { useState } from "react";

import { RouterProvider } from "react-router-dom";
import Context from "./Elements/Context/Context";

import router from "./router";
function App() {
  // Прописуємо основні стейти проекта
  const [stars, setStars] = useState([]),
    [search, setSearch] = useState([]),
    [films, setFilms] = useState([]),
    [closeModalTicket, setCloseModalTicket] = useState(false),
    [clozeHall, setClozeHall] = useState(true),
    [ticket, setTicket] = useState([]),
    [checkBuyTicket, setCheckBuyTicket] = useState(true),
    [myArr, setMyArr] = useState([]);

  // Функція рандомного обрання фільмів для слайдера головної сторінки
  const randomArr = [];
  if (films.results) {
    const randomIndex = (max) => Math.floor(Math.random() * Math.floor(max));
    for (let i = 0; i < 4; i++) {
      const index = randomIndex(20);
      randomArr.push(films.results[index]);
    }
  }
  // Дані для контексту проекта
  const methodsData = {
    stars,
    films,
    setStars,
    setFilms,
    randomArr,
    closeModalTicket,
    setCloseModalTicket,
    clozeHall,
    setClozeHall,
    ticket,
    setTicket,
    checkBuyTicket,
    setCheckBuyTicket,
    search,
    setSearch,
    myArr,
    setMyArr,
  };

  return (
    <Context.Provider value={methodsData}>
      <RouterProvider router={router}></RouterProvider>
    </Context.Provider>
  );
}

export default App;
