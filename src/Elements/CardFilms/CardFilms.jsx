import { useState, useContext, useEffect,useRef } from "react";
import NavBar from "../NavBar/NavBar";
import Star from "../../Images/ant-design_star-filled.png";
import CheckVisit from "../../Methods/CheckVisit";

import "./cardfilms.css";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import CinemaHall from "../CinemaHall/CinemaHall";
import Context from "../Context/Context";
// Сторінка з обраним фільмом та вибором місць і купівлею квитка
export default function CardFilms() {
  const data = JSON.parse(localStorage.getItem("films")).films,
    [seans, setSeans] = useState(),
    [radioValue, setRadioValue] = useState(""),
    [sent, setSent] = useState(false);
  // Контекст проекту
  const context = useContext(Context),
  ref=useRef();
  // Масив об'єктів для кнопок обрання сеансу
  const radios = [
    { name: "ніч 60грн", value: "60" },
    { name: "ранок 70грн", value: "70" },
    { name: "день 90грн", value: "90" },
    { name: "вечір 120грн", value: "120" },
    { name: `прем'єра 170грн`, value: "170" },
  ];
  // Зчитуємо дані, коли натискаємо на кнопку обрання сеансу картки фільму на головній сторінці
  useEffect(() => {
    CheckVisit(sent, setSent, context);
  }, [context, sent]);

  function click(e) {
    setRadioValue(e.currentTarget.value);
    localStorage.setItem("seans", "");
    setSeans(` ${e.target.value}грн`);
  }

  function onsent() {
    localStorage.setItem("seans", seans.match(/\d\d\d|\d\d/)[0]);
    setSent(true);
    context.setClozeHall(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    if (context.search.length === 1) {
      localStorage.setItem(
        "film_chosen_search",
        JSON.stringify({
          title: context.search[0].title,
          date: context.search[0].release_date,
          image: context.search[0].poster_path,
        })
      );
    } else if (context.search !== 1) {
      localStorage.setItem("film_chosen_search", null);
    }
  }, [context.search]);

  return (
    <>
      <NavBar />
      {context.clozeHall ? (
        <div className="wrapper">
          <div className="backgrWrapper">
            <img
              src={`https://image.tmdb.org/t/p/original/${
                context.search.length === 1
                  ? context.search[0].backdrop_path
                  : data.backdrop_path
              }`}
              alt={data.title}
              className="back_img"
            />
          </div>
          <div className="film-title">
            <div className="film_poster">
              <img
               ref={ref}
                src={`https://image.tmdb.org/t/p/w500${
                  context.search.length === 1
                    ? context.search[0].poster_path
                    : data.poster_path
                }`}
                alt={data.title}
                className="film_poster_img"
              />
            </div>

            <div className="name">
              <div className="film_name">
                {context.search.length === 1
                  ? context.search[0].original_title
                  : data.original_title}{" "}
              </div>
              <div className="rating">
                <div>
                  <img src={Star} alt="rate" className="rating_star" />
                </div>

                <div className="rating_text">
                  {context.search.length === 1
                    ? context.search[0].vote_average
                    : data.vote_average}
                </div>
              </div>
              <div className="film_text">
                {context.search.length === 1
                  ? context.search[0].overview
                  : data.overview}
              </div>
            </div>
          </div>
          <div className="btn_seans">
            <div className="btnWrappers">
              <ButtonGroup>
                {radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant="outline-primary"
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={click}
                    className="btn_radio"
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
              {seans ? (
                <Button
                  className="btn_seans_text"
                  variant="primary"
                  onClick={onsent}
                >
                  Обрати місце
                </Button>
              ) : (
                <Button
                  className="btn_seans_text"
                  variant="primary"
                  onClick={onsent}
                  disabled
                >
                  Обрати місце
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <CinemaHall />
      )}
    </>
  );
}


