// Функція переведення користувача на екран залу кінотеатра з подальшою можливістю обрання місця з ціною
export default function CheckVisit(sent, setSent, cont) {
  if (localStorage.getItem("seans") && sent === false) {
    setSent(true);
    cont.setClozeHall(false);
  }
}
