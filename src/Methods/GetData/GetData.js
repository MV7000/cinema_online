import ErrorToLocalStorage from "../ErrorToLocalStorage";
// Функція для отримання даних з API
export default function GetData(url, method) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTYzNzc0MDk5MTkwZTdlZTEyMmRlZTM1MzVlOGU3NSIsInN1YiI6IjY0YjI5ODVkMjNkMjc4MDBjOTNiYTI0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Jbemps_MCpCT-LruA9-XfhO2sKJCdCwTF2q_7M7lSgU",
    },
  };
  fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        ErrorToLocalStorage(response.status);
        throw new Response("", {
          status: response.status,
          statusText: "Something wrong with page",
        });
      }
      return response.json();
    })
    .then((response) => method(response))
    .catch((err) => console.error(err));
}
