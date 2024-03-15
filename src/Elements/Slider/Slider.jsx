import React, { useContext } from "react";
import Carousel from "react-bootstrap/Carousel";
import Context from "../Context/Context";

import "./slider.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Star from "../../Images/ant-design_star-filled.png";
// Слайдер головної сторінки
export default function Slider() {
  const context = useContext(Context);
  return (
    <>
      <Carousel>
        {context.randomArr.map((elem, index) => {
          return (
            <Carousel.Item key={elem.id + index}>
              <img
                className="d-block w-100"
                src={
                  `https://image.tmdb.org/t/p/original/` + elem.backdrop_path
                }
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3>{elem.original_title}</h3>
                <p>{elem.overview}</p>
                <p>
                  <img src={Star} alt="star" />
                  Rate : {elem.vote_average}
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </>
  );
}
