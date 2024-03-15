import React, { useState, useEffect, useRef, useContext } from "react";

import "./hall.css";
import whiteChair from "../img/Seat_white.png";
import redChair from "../img/Seat_red.png";
import checkChair from "../img/Seat_check.png";

import "../cinemaFooter/cinemaFooter";
import imgCalendar from "../icon/Calendar.png";
import ticketImg from "../icon/Ticket.png";
import imgCost from "../icon/Buy.png";
import Context from "../../Context/Context";

// Елемент віртуального кінозалу з можливістю резервування вільних місць,купівлі білетів і т.ін.
export default function Hall() {
  //?Отримуємо з локала тайтл і реліз
  const films = JSON.parse(localStorage.getItem("films")).films,
    cost = parseFloat(localStorage.getItem("seans")),
    context = useContext(Context),
    ref = useRef(),
    [count, setCount] = useState(0),
    arrPlacesInRow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    arrRowsAll = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const filmName = films.title,
    filmDate = films.release_date,
    filmPoster = films.poster_path;
  useEffect(() => {
    const checkSeatSeans = () => {
      const jsonString = localStorage.getItem("buyTicket"),
        myArray = jsonString ? JSON.parse(jsonString) : [];
      Array.from(ref.current.querySelectorAll(".white__chair")).forEach(
        (elem) => {
          const elemRowId = elem.parentElement.id,
            elemChairId = elem.id;
          myArray.forEach((items) => {
            items.forEach((item) => {
              const { rowId, chairId, film, price } = item;
              if (
                rowId === elemRowId &&
                chairId === elemChairId &&
                filmName === film &&
                price === cost
              ) {
                elem.src = redChair;
                elem.className = "chair redChair";
              }
            });
          });
        }
      );
    };
    checkSeatSeans();
  }, [context.cinemaHall, filmName, cost]);

  //?Рандомне обирання крісел Працює поки є вільні місця
  function randomChecked() {
    Array.from(ref.current.querySelectorAll(".white__chair")).map(
      (elem, index, arr) => {
        const randomIndex = Math.floor(Math.random() * Math.floor(arr.length));
        if (randomIndex === index && !elem.className.includes("checkCair")) {
          elem.src = redChair;
          elem.className = "chair redChair";
        }
        return elem;
      }
    );
  }

  //? Сет інтервал запускається разом з лічильником,одночасно запускаючи функцію рандомного бронювання
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
      randomChecked();
    }, 5000);
    return () => clearInterval(interval);
  }, [count, setCount]);

  //?Обирання крісла по кліку
  const clickHandler = (e) => {
    const chairId = e.target.id;
    const parentRowId = e.target.parentElement.id;
    if (e.target.className.includes("white__chair")) {
      context.setTicket((prevTicket) => [
        ...prevTicket,
        {
          film: filmName,
          rowId: parentRowId,
          chairId,
          time: "",
          price: cost,
          filmDate: filmDate,
          filmPoster:
            JSON.parse(localStorage.film_chosen_search) !== null
              ? JSON.parse(localStorage.film_chosen_search).image
              : filmPoster,
        },
      ]);
      e.target.src = checkChair;
      e.target.className = "chair checkCair";
    } else if (e.target.className.includes("checkCair")) {
      context.setTicket((prevTicket) =>
        prevTicket.filter(
          (item) => !(item.rowId === parentRowId && item.chairId === chairId)
        )
      );
      e.target.className = "chair white__chair";
      e.target.src = whiteChair;
    } else if (e.target.className.includes("redChair")) {
      //?Всерівно викликається
      e.stopPropagation();
      e.preventDefault();
    }
  };
  function handleDeleteTicket(item, index) {
    context.setTicket((prevTicket) =>
      prevTicket.filter((item, i) => i !== index)
    );
    deletColorchair(item);
  }

  function deletColorchair(item) {
    Array.from(ref.current.querySelectorAll(".checkCair")).forEach(
      (elem, index, arr) => {
        if (item.chairId === elem.id && item.rowId === elem.parentElement.id) {
          elem.className = "chair white__chair";
          elem.src = whiteChair;
        }
      }
    );
  }

  function buyTicket() {
    if (context.ticket.length > 0) {
      context.setCloseModalTicket(true);
      context.setClozeHall();
    }
  }
  return (
    <>
      {
        <div className="chair__hall" ref={ref}>
          {arrRowsAll.map((el, ind) => {
            return (
              <div key={ind} className="chair__row" id={ind + 1}>
                {arrPlacesInRow.map((elem, index, arr) => {
                  return (
                    <img
                      id={index + 1}
                      key={index + elem}
                      className="chair white__chair"
                      onClick={clickHandler}
                      src={whiteChair}
                      alt="chair"
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      }
      <div className="box__info">
        <ul className="info__list">
          <li className="info__list-item">Вільно</li>
          <li className="info__list-item">Занято</li>
          <li className="info__list-item">Обрано</li>
        </ul>
      </div>
      <footer className="footer ">
        <div className="box-f">
          <div className="footer__detai detail">
            <div className="detail__data-hour">
              <div className="box__img-calendar">
                <img src={imgCalendar} alt="calendar" />
              </div>
              <div className="box__data-hour">
                <div className="box__data">
                  <span>{filmDate}</span>
                </div>
                <div className="box__hour">
                  <span className="hour"> година 18:00</span>
                </div>
              </div>
            </div>
            <div className="detail__name-film-seat">
              <div className="box__img-ticket">
                <img src={ticketImg} alt="ticket" />
              </div>
              <div className="box__name-film-seat">
                <div className="box__name-film">
                  <span className="name-film">
                    {localStorage.film_chosen_search.length === 4
                      ? filmName
                      : JSON.parse(localStorage.film_chosen_search).title}
                  </span>
                </div>
                <div className="box__seat">
                  {context.ticket.map((item, index) => (
                    <div key={index} className="ticket">
                      <span className="seat-row">Ряд {item.rowId}</span>
                      <span className="seat-place">Місце {item.chairId}</span>
                      <span
                        className="delete-icon"
                        onClick={() => handleDeleteTicket(item, index)}
                      >
                        ✕
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="detail__cost">
              <div className="box__cost">
                <img src={imgCost} alt="imgCost" />
                <span className="cost">
                  Вартість{" "}
                  {context.ticket.reduce((acc, elem) => {
                    return acc + elem.price;
                  }, 0)}{" "}
                  грн
                </span>
              </div>
            </div>
          </div>
          <div className="detail__box-button">
            <button
              type="button"
              className="batoon__buy"
              onClick={() => buyTicket()}
            >
              Купити
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
