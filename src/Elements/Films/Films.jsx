import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import { useContext, useState } from "react";
import Context from "../Context/Context";
import "./films.css";

// Картка фільму головної сторінки
export default function Films() {
  // Стейт кнопки
  const [btn, setBtn] = useState(false),
    // Контекст проекту
    context = useContext(Context),
    //обьект сеансу
    myseans = { films: "", visit: {} };

  const dataFilms = context.search;

  // Занесення даних в локал сторідж
  function seansClick(e) {
    const s = e.target.getAttribute("data");
    // myseans.films = context.films.results[s];
    myseans.films = dataFilms[s];
    myseans.visit[dataFilms[s].original_title] = e.target.text;
    localStorage.setItem("films", JSON.stringify(myseans));
    setBtn(true);
    localStorage.setItem("seans", e.target.text);
  }
  function localclear(e) {
    const s = e.target.closest(".cards");
    const id = s.getAttribute("data");
    localStorage.setItem("seans", "");
    myseans.films = dataFilms[id];
    localStorage.setItem("films", JSON.stringify(myseans));
  }

  return (
    <>
      <div className="movies">
        <div className="film_title">Trending Movies</div>
        <div className="mov">
          {dataFilms?.map((elem, index) => {
            return (
              <div key={elem.id + index}>
                <div className="cards" data={index}>
                  <Link
                    to={`/movies/${elem.original_title}`}
                    onClick={localclear}
                  >
                    <div>
                      <img
                        className="card_img"
                        src={
                          `https://image.tmdb.org/t/p/w300` + elem.backdrop_path
                        }
                        alt={elem.original_title}
                        key={elem.id + index}
                      />
                      <div>
                        <div className="card_text" key={elem.id + index + 1}>
                          {elem.original_title}
                        </div>
                        <div className="card_yers" key={elem.id + index + 2}>
                          {elem.release_date}
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="btn">
                    <div className="seans">
                      <Pagination>
                        <Pagination.Item onClick={seansClick} data={index}>
                          60
                        </Pagination.Item>
                        <Pagination.Item onClick={seansClick} data={index}>
                          70
                        </Pagination.Item>
                        <Pagination.Item onClick={seansClick} data={index}>
                          90
                        </Pagination.Item>
                        <Pagination.Item onClick={seansClick} data={index}>
                          120
                        </Pagination.Item>
                        <Pagination.Item onClick={seansClick} data={index}>
                          170
                        </Pagination.Item>
                      </Pagination>
                    </div>

                    {!btn ? (
                      <Button disabled>Seat</Button>
                    ) : (
                      <Link to={`/movies/${elem.original_title}`}>
                        <Button>Seat</Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
