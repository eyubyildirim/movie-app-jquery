// @ts-check

import { mockPopularMoviesResponse } from "./scripts/mock/movies.js";
import { generateMovieCard, searchMovies } from "./scripts/movies.js";

const mainGrid = $(".movies-grid");
$("#home-button").css("color", "var(--primary-text)");

mockPopularMoviesResponse.results.forEach((mov) => {
  mainGrid.append(generateMovieCard(mov));
});

let timeout;

const searchQuery = async (currentText) => {
  const searchRes = await searchMovies(currentText);

  if (searchRes.results.length < 1) {
    return;
  }

  mainGrid.html("");
  searchRes.results.forEach((mov) => {
    mainGrid.append(generateMovieCard(mov));
  });
};

$("#search-input").on("input", function () {
  const currentText = String($(this).val());

  if (!currentText) {
    if (timeout) {
      clearTimeout(timeout);
    }

    mainGrid.html("");
    mockPopularMoviesResponse.results.forEach((mov) => {
      mainGrid.append(generateMovieCard(mov));
    });
  }

  if (timeout) {
    clearTimeout(timeout);
  }

  timeout = setTimeout(async () => await searchQuery(currentText), 3000);
});

$(".search-bar").on("submit", async function (e) {
  e.preventDefault();
  if (timeout) clearTimeout(timeout);

  const currentQuery = $("#search-input").val();

  await searchQuery(currentQuery);
});
