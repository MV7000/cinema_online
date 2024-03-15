import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import MainPage from "./Pages/MainPage";
import ErrorPage from "./Pages/ErrorPage";
import CardFilms from "./Elements/CardFilms/CardFilms";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainPage />} errorElement={<ErrorPage />} />
      <Route
        path="/movies/:id"
        element={<CardFilms />}
        errorElement={<ErrorPage />}
      />
    </>
  )
);

export default router;
