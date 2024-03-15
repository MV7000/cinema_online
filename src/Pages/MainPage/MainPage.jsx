import React from "react";
import NavBar from "../../Elements/NavBar/NavBar";

import "./mainPage.css";
import MoviesPeopleData from "../../Elements/MoviesPeopleData/MoviesPeopleData";
import Footer from "../../Elements/Footer/Footer";
// Головна сторінка проекту
export default function MainPage() {
  return (
    <>
      <NavBar />
      <MoviesPeopleData />
      <Footer />
    </>
  );
}
