function updateMyArray(newObj) {
  const jsonString = localStorage.getItem("reserveTicket");
  let myArray = jsonString ? JSON.parse(jsonString) : [];
  myArray.push(newObj);
  const updatedJsonString = JSON.stringify(myArray);
  localStorage.setItem("reserveTicket", updatedJsonString);
}
// Функція резервування місць з записом в стейти контексту
export default function Cloze(context) {
  context.setClozeHall(true);
  let newReserveTicket = context.ticket;
  if (newReserveTicket.length > 0) {
    updateMyArray(newReserveTicket);
    context.setTicket([]);
  }
  context.setTicket([]);
}
