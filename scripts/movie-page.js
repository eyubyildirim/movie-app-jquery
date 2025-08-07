import {
  toggleFavorite,
  getFavorites,
  getSimilarMovies,
  generateMovieCard,
  getCredits,
  generateCastCard,
  generateMovieSliderCard,
} from "./movies.js";

// @ts-check
const urlParams = new URLSearchParams(window.location.search);

const movieId = urlParams.get("id");

/**
 *
 * @param {number} movieId
 */
export const getMovie = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}`;
  const headers = {
    Authorization: "replace-api-token",
  };

  const movieRes = await fetch(url, {
    method: "GET",
    headers,
  });

  /** @type {import("./typedefs/movies").MovieDetail} */
  const movieDetail = await movieRes.json();

  return movieDetail;
};

/**
 *
 * @param {import("./typedefs/movies").MovieDetail} movieDetail
 * @param {boolean} isFavorite
 * @returns
 */
export const generateHeroCard = (movieDetail, isFavorite) => {
  return $(`
      <div class="hero-container" id="${movieDetail.id}">
        <img
          class="hero-poster"
          src="https://image.tmdb.org/t/p/w500${movieDetail.poster_path}"
        />
        <div class="hero-details">
          <div class="hero-title-container">
            <span class="hero-title">${movieDetail.title}</span>
            <span class="hero-release-year">${
              movieDetail.release_date.split("-")[0]
            }</span>
          </div>
          <span class="hero-tagline">${movieDetail.tagline}</span>
          <div class="hero-essential">
            <div>
              <i class="fa-solid fa-star rating-icon"></i>
              <span class="movie-item-rating">${movieDetail.vote_average.toFixed(
                1
              )}</span>
            </div>
            <div class="vertical-divider"></div>
            <span class="genre-name">${movieDetail.genres[0].name}</span>
            <div class="vertical-divider"></div>
            <span class="genre-name">${
              movieDetail.genres[1] ? movieDetail.genres[1].name : ""
            }</span>
            <div class="vertical-divider"></div>
            <span class="runtime">${
              parseInt(String(movieDetail.runtime / 60)) +
              "h " +
              (movieDetail.runtime % 60) +
              "m"
            }</span>
          </div>
          <div class="hero-actions">
            <a class="fav-icon-container">
                    <i class="${
                      isFavorite ? "fa-solid" : "fa-regular"
                    } fa-heart fav-on-hover"></i>
            </a>
            <span class="hero-favorites">Add to Favorites</span>
            <a
              class="go-to-homepage"
              href="${movieDetail.homepage}"
            >
              <i class="fa-solid fa-film"></i>
              <span>Go to Homepage</span>
            </a>
          </div>
        </div>
      </div>
    `);
};

/**
 *
 * @param {import("./typedefs/movies").MovieDetail} movieDetails
 * @returns
 */
export const generateDetailsCard = (movieDetails) => {
  return $(`
      <div class="details">
        <div class="details-left">
          <div class="details-container">
            <span class="details-title">Overview</span>
            <span class="details-overview">
              ${movieDetails.overview}
            </span>
          </div>
          <div class="details-container">
            <span class="details-title">Production Companies</span>
            <div class="production-companies">
              ${movieDetails.production_companies.map((v) => {
                if (!v.logo_path) return null;
                return `
                    <img
                        class="production-image"
                        src="https://image.tmdb.org/t/p/w500${v.logo_path}"
                    />
                `;
              })}
            </div>
          </div>
        </div>
        <div class="details-left">
          <div class="details-container">
            <span class="details-title">Status</span>
            <span class="details-overview">${movieDetails.status}</span>
          </div>
          <div class="details-container">
            <span class="details-title">Original Title</span>
            <span class="details-overview">${movieDetails.original_title}</span>
          </div>
          <div class="details-container">
            <span class="details-title">Budget & Revenue</span>
            <span class="details-overview">${Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(movieDetails.budget)} & ${Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(movieDetails.revenue)}</span>
          </div>
        </div>
      </div>
    `);
};

/**
 *
 * @param {string} title
 * @param {string} id
 * @returns
 */
export const generateHorizontalSlider = (title, id) => {
  return $(`
      <div class="horizontal-slider-container">
        <span class="horizontal-slider-title">${title}</span>
        <div class="horizontal-slider" id="${id}">
        </div>
      </div>
    `);
};

let isSliding = false;
let latestX = 0;
let goToMovie = true;

export const generateMovieDetailPage = async (
  /** @type {number} */ movieId
) => {
  const movieDetailsMain = $(".movie-details-main");
  const movieDetails = await getMovie(movieId);

  const favorites = getFavorites();
  const isFavorite = favorites.includes(movieDetails.id);

  const heroCard = generateHeroCard(movieDetails, isFavorite);
  const detailsCard = generateDetailsCard(movieDetails);
  const similarMoviesSlider = generateHorizontalSlider(
    "More Like This",
    "similar-movies"
  );
  const castSlider = generateHorizontalSlider("Cast", "cast-slider");

  movieDetailsMain
    .append(heroCard)
    .append(detailsCard)
    .append(castSlider)
    .append(similarMoviesSlider);

  const heroContainer = $(`#${movieDetails.id}`);
  const similarMoviesContainer = $("#similar-movies");

  const similarMovies = await getSimilarMovies(movieDetails.id);

  similarMoviesContainer.html("");
  similarMovies.results.forEach((v) => {
    similarMoviesContainer.append(
      generateMovieSliderCard(v)
        .css({
          width: "200px",
          margin: 0,
          padding: 0,
        })
        .find("img")
        .css({
          "border-radius": 0,
        })
        .end()
    );
  });

  const castAndCrew = await getCredits(movieId);
  const castContainer = $("#cast-slider");
  castContainer.html("");
  castAndCrew.cast.forEach((c) => {
    castContainer.append(
      generateCastCard(c)
        .css({
          width: "200px",
          margin: 0,
          padding: 0,
        })
        .find("img")
        .css({
          "border-radius": 0,
        })
        .end()
    );
  });

  similarMoviesContainer
    .on("mousedown", function (e) {
      latestX = e.pageX;
      isSliding = true;
    })
    .on("mouseup", function (e) {
      e.preventDefault();

      latestX = 0;
      isSliding = false;
    })
    .on("mouseleave", function () {
      isSliding = false;
    })
    .on("mousemove", function ({ pageX }) {
      const change = latestX - pageX;
      latestX = pageX;

      if (isSliding) {
        $(this).animate(
          {
            scrollLeft: `+=${change}`,
          },
          0
        );
      }
    });

  castContainer
    .on("mousedown", function (e) {
      latestX = e.pageX;
      isSliding = true;
    })
    .on("mouseup", function (e) {
      latestX = 0;
      isSliding = false;
    })
    .on("mouseleave", function () {
      isSliding = false;
    })
    .on("mousemove", function ({ pageX }) {
      const change = latestX - pageX;
      latestX = pageX;

      if (isSliding) {
        $(this).animate(
          {
            scrollLeft: `+=${change}`,
          },
          0
        );
      }
    });

  const imageUrl = `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`;
  const gradient =
    "linear-gradient(to right, rgba(0, 0, 0, 0.7) 25%, rgba(0, 0, 0, 0.6) 100%)";
  heroContainer.css("background-image", `${gradient}, url("${imageUrl}")`);
  heroContainer.find(".fav-icon-container").on("click", function (e) {
    e.stopPropagation();
    const isFavorite = toggleFavorite(movieDetails.id);

    const iconHtml = `<i class="${
      isFavorite ? "fa-solid" : "fa-regular"
    } fa-heart fav-on-hover"></i>`;
    $(this).html(iconHtml);
  });
};

await generateMovieDetailPage(Number(movieId));
