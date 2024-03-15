import "./cinemaModal.css";
import Context from "../../Context/Context";
import { useContext } from "react";

import ClockImg from "../img/clock.png";
import Scan from "../img/scan.png";
const CinemaModal = () => {
  const context = useContext(Context);

  const films = JSON.parse(localStorage.getItem("films")).films;
  let filmName = films.title,
    filmDate = films.release_date,
    filmPoster = films.poster_path;

  function updateMyArray(newObj) {
    const jsonString = localStorage.getItem("buyTicket");
    let myArray = jsonString ? JSON.parse(jsonString) : [];
    myArray.push(newObj);
    const updatedJsonString = JSON.stringify(myArray);
    localStorage.setItem("buyTicket", updatedJsonString);
  }
  function closeModal() {
    context.setCloseModalTicket(false);
    let newTicket = context.ticket;
    updateMyArray(newTicket);
    context.setTicket([]);
  }

  return (
    <div
      className={
        context.closeModalTicket
          ? "box__ticket-modal open__modal-ticket"
          : "box__ticket-modal"
      }
    >
      <span className="close__ticket-modal" onClick={() => closeModal()}>
        ✕
      </span>
      {context.ticket.map((e, i, arr) => {
        return (
          <div className="ticket__container" key={i}>
            <div className="box__ticket-poster">
              <img
                src={`https://image.tmdb.org/t/p/w500${
                  localStorage.film_chosen_search.length === 4
                    ? filmPoster
                    : JSON.parse(localStorage.film_chosen_search).image
                }`}
                alt={filmName}
                className="ticket__poster"
              />
            </div>
            <div className="box__ticket-detail">
              <div className="box__hour-date">
                <div className="date">{filmDate}</div>
                <div className="hour">
                  <img src={ClockImg} alt="clock" />
                  <span>18:00</span>
                </div>
              </div>
              <div className="box__ticet-seat">
                <div className="ticket__hall">
                  <div className="hall">Hall</div>
                  <div className="hall-number">01</div>
                </div>
                <div className="ticket__row">
                  <div className="row">Row</div>
                  <div className="row-number">{e.rowId}</div>
                </div>
                <div className="ticket__seats">
                  <div className="seats">Seats</div>
                  <div className="seats-number">{e.chairId}</div>
                </div>
              </div>
              <div className="box__scan">
                <img src={Scan} alt="scan" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default CinemaModal;
