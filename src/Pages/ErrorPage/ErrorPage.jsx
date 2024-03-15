import { useRouteError } from "react-router-dom";

// Сторінка для відображення ,якщо помилки на сторінці
export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div style={{ color: "red", textAlign: "center", margin: "10vh auto" }}>
      <h1>💥ERROR ON PAGE!!!💥</h1>
      <p>{error.status}</p>
      <p>{error.statusText || "Something wrong with loading this page"}</p>
    </div>
  );
}
