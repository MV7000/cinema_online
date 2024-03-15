import Hall from "../hall/hall";
import CinemaScreen from "../cinemaScreen/cinemaScreen";
import "./main.css";
// Основний елемент віртуального кінозалу
const Main = () => {
  return (
    <main className="main ">
      <div className="box__holl-screen">
        <CinemaScreen />
        <Hall />
      </div>
    </main>
  );
};

export default Main;
