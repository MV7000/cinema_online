import React, { useContext } from "react";
import { useEffect, useState } from "react";
import Context from "../Context/Context";
import Films from "../Films";

import "./moviesPeopleData.css";
import Slider from "../Slider/Slider";
import GetData from "../../Methods/GetData/GetData";
import Offcanvas from "react-bootstrap/Offcanvas";

export const SeansContext = React.createContext();

export default function MoviesPeopleData() {
  const [modalId, setModalId] = useState(null),
    [show, setShow] = useState(false),
    handleShow = () => {
      setShow(!show);
    };

  // Отримуємо контекст методів встановлення стейтів
  const context = useContext(Context);

  // Отримуємо бази даних зірок та фільмів і заносимо їх у відповідні стейти
  useEffect(() => {
    GetData("https://api.themoviedb.org/3/person/popular", context.setStars);
    GetData("https://api.themoviedb.org/3/discover/movie", context.setFilms);
  }, [context.setFilms, context.setStars]);
  // Відображення кінозірок і фільмів з бази даних
  return (
    <>
      <Slider />
      <div className="movies_stars_container">
        <Films></Films>

        <h2 className="stars_title">Trending Stars</h2>
        <div className="imgWrapper">
          {context.stars.results?.map((elem, index) => {
            return (
              <img
                src={`https://image.tmdb.org/t/p/w500` + elem.profile_path}
                alt={elem.name}
                key={elem.id + index}
                onClick={() => {
                  handleShow();
                  setModalId({ elem });
                }}
              />
            );
          })}
        </div>
      </div>
      {/* Модальне вікно деталей кінозірки */}
      {modalId ? (
        <Offcanvas
          show={show}
          onHide={handleShow}
          placement={"bottom"}
          className="mymodal"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="modal_name">
              {modalId.elem.name}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="modal_text">
              Films:
              {modalId.elem.known_for?.map((e) => {
                return e.title ? (
                  <div key={e.id}>
                    {e.title} ({e.release_date})
                  </div>
                ) : null;
              })}
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      ) : null}
    </>
  );
}
