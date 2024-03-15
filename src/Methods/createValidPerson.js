export async function req(url, b) {
  const rez = await fetch(url);
  return await rez.json();
}
// Функції відображення фільму з інфо про ціну сеансу
export function createValidPerson(oldArray) {
  if (Array.isArray(oldArray)) return null;
  let [...arr] = oldArray.results;
  arr = arr.map((obj) => {
    return {
      name: obj.name,
      id: obj.id,
      films: obj.known_for.map((film) => {
        return {
          name: film.title,
          id: film.id,
          release_date: film.release_date,
          image: `https://image.tmdb.org/t/p/w500${film.poster_path}`,
          backdrop: `https://image.tmdb.org/t/p/w500${film.backdrop_path}`,
          overview: film.overview,
          rate: film.vote_average,
          price: [
            { point: "night", price: 60 },
            { point: "day", price: 90 },
            { point: "morning", price: 70 },
            { point: "evening", price: 120 },
            { point: "premiere", price: 170 },
          ],
        };
      }),
      image: `https://image.tmdb.org/t/p/w500${obj.profile_path}`,
    };
  });
  return arr;
}

export function createvalidMovie(oldArray) {
  if (Array.isArray(oldArray)) return null;
  let [...arr] = oldArray.results;
  arr = arr.map((obj) => {
    return {
      name: obj.title,
      id: obj.id,
      release_date: obj.release_date,
      image: `https://image.tmdb.org/t/p/w500${obj.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/w500${obj.backdrop_path}`,
      overview: obj.overview,
      rate: obj.vote_average,
      price: [
        { point: "night", price: 60 },
        { point: "day", price: 90 },
        { point: "morning", price: 70 },
        { point: "evening", price: 120 },
        { point: "premiere", price: 170 },
      ],
    };
  });
  return arr;
}
