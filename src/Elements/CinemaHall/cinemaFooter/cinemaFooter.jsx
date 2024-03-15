import "../cinemaModal/cinemaModal";
import ClockImg from "../img/clock.png";
import Scan from "../img/scan.png";
import { useContext } from "react";
import Context from "../../Context/Context";
import "./cinemaFooter.css";

const CinemaFooter = () => {
  const jsonString = localStorage.getItem("reserveTicket"),
    myArray = jsonString ? JSON.parse(jsonString) : [];
  const context = useContext(Context);

  const handleCardClose = (index) => {
    // Отримуємо масив об'єктів з localStorage
    const jsonString = localStorage.getItem("reserveTicket");
    let myArray = jsonString ? JSON.parse(jsonString) : [];
    // Видаляємо відповідний елемент з масиву за індексом
    myArray.splice(index, 1);
    // Оновлюємо масив у localStorage
    localStorage.setItem("reserveTicket", JSON.stringify(myArray));
    context.setMyArr(myArray);
  };

  return (
    <div className="footer sub__footer">
      {myArray.map((e, i) => {
        const filmPost = e[0];
        return (
          <div className="ticket__container" key={i}>
            <span className="cloze__reserve" onClick={() => handleCardClose(i)}>
              ✕
            </span>
            <div className="box__ticket-poster">
              <img
                src={`https://image.tmdb.org/t/p/w500${filmPost.filmPoster}`}
                alt={e.film}
                className="ticket__poster"
              />
            </div>
            <div className="box__ticket-detail">
              <div className="box__hour-date">
                <div className="date">{filmPost.filmDate}</div>
                <div className="hour">
                  <img src={ClockImg} alt="clock" />
                  <span>18:00</span>
                </div>
              </div>
              {e.map((e, i) => {
                return (
                  <div className="box__ticet-seat" key={i}>
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
                );
              })}
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
export default CinemaFooter;
