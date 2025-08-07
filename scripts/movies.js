// @ts-check

export const FAVORITES_KEY = "user_favorites";

export const getPopularMovies = async () => {
  const url = "https://api.themoviedb.org/3/movie/popular";
  const headers = {
    Authorization: "replace-api-token",
  };

  return await fetch(url, {
    method: "GET",
    headers,
  });
};

/**
 *
 * @param {string} query
 * @returns {Promise<import("./typedefs/movies").SearchResponse>}
 */
export const searchMovies = async (query) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}`;
  const headers = {
    Authorization: "replace-api-token",
  };

  return await (
    await fetch(url, {
      method: "GET",
      headers,
    })
  ).json();
};

/**
 *
 * @param {string} movieId
 * @returns {Promise<import("./typedefs/movies").SearchResponse>}
 */
export const getSimilarMovies = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/similar`;
  const headers = {
    Authorization: "replace-api-token",
  };

  return await (
    await fetch(url, {
      method: "GET",
      headers,
    })
  ).json();
};

/**
 *
 * @param {string} movieId
 * @returns {Promise<import("./typedefs/movies").CreditsResponse>}
 */
export const getCredits = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
  const headers = {
    Authorization: "replace-api-token",
  };

  return await (
    await fetch(url, {
      method: "GET",
      headers,
    })
  ).json();
};

/**
 * @returns {number[]}
 */
export const getFavorites = () => {
  const favorites = localStorage.getItem(FAVORITES_KEY) ?? "";

  if (favorites) {
    /**
     * @type {string[]}
     */
    return JSON.parse(favorites);
  }

  return [];
};

/**
 * @param {number} movieId
 */
export const toggleFavorite = (movieId) => {
  const favorites = getFavorites();

  let isFavorite = false;
  const movieIndex = favorites.findIndex((v) => v === movieId);
  if (movieIndex > -1) {
    favorites.splice(movieIndex, 1);
    isFavorite = false;
  } else {
    favorites.push(movieId);
    isFavorite = true;
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  return isFavorite;
};

/**
 * @param {import("./typedefs/movies").Movie} movie
 * @returns {JQuery<HTMLElement>}
 */
export const generateMovieCard = (movie) => {
  const favorites = getFavorites();
  const isFavorite = favorites.includes(movie.id);

  const movieCardHtml = `
        <div class="movie-item-container" id="${movie.id}">
            <div class="movie-item">
                <img
                draggable="false"
                class="movie-item-image"
                src="${
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://placehold.co/463x695"
                }"
                />
                <!-- <hr class="solid" /> -->
                <span class="movie-item-title-container">
                <span
                    class="movie-item-title"
                    title="${movie.title}"
                    >${movie.title}</span
                >
                <a class="fav-icon-container">
                    <i class="${
                      isFavorite ? "fa-solid" : "fa-regular"
                    } fa-heart fav-on-hover"></i>
                </a>
                </span>
                <div>
                    <i class="fa-solid fa-star rating-icon"></i>
                    <span class="movie-item-rating">${movie.vote_average.toFixed(
                      1
                    )}</span>
                </div>
            </div>
        </div>`;

  return $(movieCardHtml)
    .on("click", () => {
      window.location.href = `/pages/movie.html?id=${movie.id}`;
    })
    .find(".fav-icon-container")
    .on("click", (e) => {
      e.stopPropagation();
      const isFavorite = toggleFavorite(movie.id);
      $(`#${movie.id}`)
        .find(".fav-icon-container")
        .html(
          `<i class="${
            isFavorite ? "fa-solid" : "fa-regular"
          } fa-heart fav-on-hover"></i>`
        );
    })
    .end();
};

/**
 * @param {import("./typedefs/movies").CastMember} castMember
 * @returns {JQuery<HTMLElement>}
 */
export const generateCastCard = (castMember) => {
  const castMemberCardHtml = `
        <div class="movie-item-container" id="${castMember.id}">
            <div class="movie-item">
                <img
                draggable="false"
                class="movie-item-image"
                src="${
                  castMember.profile_path
                    ? `https://image.tmdb.org/t/p/w500${castMember.profile_path}`
                    : "https://placehold.co/463x695"
                }"
                />
                <!-- <hr class="solid" /> -->
                <div class="card-details-container">
                  <span class="movie-item-title-container">
                  <span
                      class="movie-item-title"
                      title="${castMember.name}"
                      >${castMember.name}</span
                  >
                  </span>
                  <span class="movie-item-title-container">
                      <span class="cast-character" title="${
                        castMember.character
                      }">${castMember.character}</span>
                  </span>
                </div>
            </div>
        </div>`;

  return $(castMemberCardHtml);
};

/**
 * @param {import("./typedefs/movies").Movie} movie
 * @returns {JQuery<HTMLElement>}
 */
export const generateMovieSliderCard = (movie) => {
  const favorites = getFavorites();
  const isFavorite = favorites.includes(movie.id);

  const movieCardHtml = `
        <div class="movie-item-container" id="${movie.id}">
            <div class="movie-item">
                <img
                draggable="false"
                class="movie-item-image"
                src="${
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://placehold.co/463x695"
                }"
                />
                <!-- <hr class="solid" /> -->
                <div class="card-details-container">
                  <span class="movie-item-title-container">
                  <span
                      class="movie-item-title"
                      title="${movie.title}"
                      >${movie.title}</span
                  >
                  <a class="fav-icon-container">
                      <i class="${
                        isFavorite ? "fa-solid" : "fa-regular"
                      } fa-heart fav-on-hover"></i>
                  </a>
                  </span>
                  <div>
                      <i class="fa-solid fa-star rating-icon"></i>
                      <span class="movie-item-rating">${movie.vote_average.toFixed(
                        1
                      )}</span>
                  </div>
                </div>
            </div>
        </div>`;

  return $(movieCardHtml)
    .on("click", () => {
      window.location.href = `/pages/movie.html?id=${movie.id}`;
    })
    .find(".fav-icon-container")
    .on("click", (e) => {
      e.stopPropagation();
      const isFavorite = toggleFavorite(movie.id);
      $(`#${movie.id}`)
        .find(".fav-icon-container")
        .html(
          `<i class="${
            isFavorite ? "fa-solid" : "fa-regular"
          } fa-heart fav-on-hover"></i>`
        );
    })
    .end();
};
