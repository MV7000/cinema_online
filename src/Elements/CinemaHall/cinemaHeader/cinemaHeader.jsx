import { useContext } from "react";
import Context from "../../Context/Context";
import CalendarIcon from "../icon/Calendar.png";
import "./cinemaHeader.css";
import cloze from "../../../Methods/Cloze";

// Хедер віртуального кінозала
const CinemaHeader = () => {
  const context = useContext(Context);
  return (
    <header className="header max-screen">
      <div className="header__container">
        <span
          className={context.clozeHall ? "close cloze__true" : "close"}
          onClick={() => cloze(context)}
        >
          X
        </span>
        <div className="header__title">Оберіть місце</div>
        <span className="calendar">
          <img src={CalendarIcon} alt="calendar" />
        </span>
      </div>
    </header>
  );
};
export default CinemaHeader;
