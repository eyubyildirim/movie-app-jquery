// @ts-check
import { generateMovieCard, getFavorites } from "./movies.js";

/**
 *
 * @param {number[]} movieIds
 * @returns {Promise<import("./typedefs/movies.js").MovieDetail[]>}
 */
export const fetchFavorites = async (movieIds) => {
  const requests = movieIds.map((m) => {
    const url = `https://api.themoviedb.org/3/movie/${m}`;
    const headers = {
      Authorization: "replace-api-token",
    };

    const movieReq = fetch(url, {
      method: "GET",
      headers,
    });
    return movieReq.then((v) => v.json());
  });

  return await Promise.all(requests);
};

const mainGrid = $(".movies-grid");
$("#favorites-button").css("color", "var(--primary-text)");

fetchFavorites(getFavorites()).then((v) => {
  v.forEach((m) => {
    // @ts-ignore
    mainGrid.append(generateMovieCard(m));
  });
});
