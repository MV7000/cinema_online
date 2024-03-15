import Hall from "./hall/hall";
import CinemaHeader from "./cinemaHeader/cinemaHeader";
import CinemaFooter from "./cinemaFooter/cinemaFooter";
import CinemaModal from "./cinemaModal/cinemaModal";
import Main from "./main/main";
import Context from "../Context/Context";
import { useContext } from "react";
import "./CinemaHall.css";

// Друга сторінка проекту з обраним фільмом та віртуальним кінозалом
const CinemaHall = () => {
  const context = useContext(Context);

  return (
    <>
      <CinemaModal />
      <div
        className={
          context.clozeHall
            ? "cinemaHall cinema__cloze"
            : context.closeModalTicket
            ? "cinemaHall cloze"
            : "cinemaHall"
        }
      >
        <CinemaHeader></CinemaHeader>
        <Main>
          <Hall />
        </Main>
        <CinemaFooter></CinemaFooter>
      </div>
    </>
  );
};

export default CinemaHall;
