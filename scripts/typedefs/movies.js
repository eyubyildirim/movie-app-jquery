/**
 * Represents a single movie object returned from a TMDb search query.
 * It is similar to the basic Movie object but includes an array of genre IDs.
 * @typedef {object} Movie
 * @property {boolean} adult - Indicates if the movie is intended for an adult audience.
 * @property {string | null} backdrop_path - The path to the backdrop image. Can be null.
 * @property {number[]} genre_ids - An array of genre IDs associated with the movie.
 * @property {number} id - The unique identifier for the movie.
 * @property {string} original_language - The original language of the movie (e.g., "en").
 * @property {string} original_title - The original title of the movie.
 * @property {string} overview - A brief summary of the movie's plot.
 * @property {number} popularity - A numeric value representing the movie's popularity.
 * @property {string | null} poster_path - The path to the poster image. Can be null.
 * @property {string} release_date - The release date of the movie in "YYYY-MM-DD" format.
 * @property {string} title - The display title of the movie.
 * @property {boolean} video - Indicates if there is a video trailer available.
 * @property {number} vote_average - The average user rating (e.g., out of 10).
 * @property {number} vote_count - The total number of user votes.
 */

/**
 * Represents the complete structure of an API response from a TMDb movie search.
 * @typedef {object} SearchResponse
 * @property {number} page - The current page number of the results.
 * @property {Movie[]} results - An array of movie objects matching the search.
 * @property {number} total_pages - The total number of pages available for the query.
 * @property {number} total_results - The total number of movies that match the query.
 */

/**
 * Represents the structure of the API response when fetching a list of movies.
 * @typedef {object} MovieListResponse
 * @property {number} page - The current page number of the results.
 * @property {Movie[]} results - An array of movie objects for the current page.
 * @property {number} total_pages - The total number of pages available.
 * @property {number} total_results - The total number of movies that match the query.
 */

/**
 * Represents a detailed movie object from The Movie Database (TMDb) API.
 * @typedef {object} MovieDetail
 * @property {boolean} adult - Indicates if the movie is rated for adults.
 * @property {string|null} backdrop_path - The path for the movie's backdrop image.
 * @property {object|null} belongs_to_collection - The collection this movie belongs to.
 * @property {number} budget - The movie's budget in US dollars.
 * @property {Array<{id: number, name: string}>} genres - A list of genres associated with the movie.
 * @property {string} homepage - The URL of the movie's official homepage.
 * @property {number} id - The unique TMDb identifier for the movie.
 * @property {string|null} imdb_id - The IMDb identifier for the movie.
 * @property {string[]} origin_country - The original countries of production, as two-letter codes.
 * @property {string} original_language - The original language of the movie, as a two-letter code.
 * @property {string} original_title - The title of the movie in its original language.
 * @property {string} overview - A brief synopsis of the movie.
 * @property {number} popularity - The popularity score of the movie on TMDb.
 * @property {string|null} poster_path - The path for the movie's poster image.
 * @property {Array<{id: number, logo_path: string|null, name: string, origin_country: string}>} production_companies - A list of companies that produced the movie.
 * @property {Array<{iso_3166_1: string, name: string}>} production_countries - A list of countries where the movie was produced.
 * @property {string} release_date - The release date of the movie in "YYYY-MM-DD" format.
 * @property {number} revenue - The total revenue of the movie in US dollars.
 * @property {number|null} runtime - The runtime of the movie in minutes.
 * @property {Array<{english_name: string, iso_639_1: string, name: string}>} spoken_languages - A list of languages spoken in the movie.
 * @property {string} status - The release status of the movie (e.g., "Released", "Post Production").
 * @property {string} tagline - The movie's tagline.
 * @property {string} title - The common title of the movie.
 * @property {boolean} video - Indicates if a video trailer is available on TMDb.
 * @property {number} vote_average - The average user rating (from 0 to 10).
 * @property {number} vote_count - The total number of user ratings.
 */

/**
 * Represents a cast member (actor) in a movie's credits.
 * @typedef {object} CastMember
 * @property {boolean} adult - Indicates if the actor is in an adult film.
 * @property {number} gender - The gender of the actor (e.g., 1 for female, 2 for male).
 * @property {number} id - The unique identifier for the actor.
 * @property {string} known_for_department - The primary department the person is known for (e.g., "Acting").
 * @property {string} name - The actor's name.
 * @property {string} original_name - The actor's name in their native language.
 * @property {number} popularity - A popularity score.
 * @property {string} profile_path - The path to the actor's profile image.
 * @property {number} cast_id - The ID for this specific cast credit.
 * @property {string} character - The name of the character played by the actor.
 * @property {string} credit_id - The unique identifier for this credit record.
 * @property {number} order - The order of appearance in the credits.
 */

/**
 * Represents a crew member in a movie's credits.
 * @typedef {object} CrewMember
 * @property {boolean} adult - Indicates if the crew member is associated with adult films.
 * @property {number} gender - The gender of the crew member (e.g., 1 for female, 2 for male).
 * @property {number} id - The unique identifier for the crew member.
 * @property {string} known_for_department - The primary department the person is known for (e.g., "Editing").
 * @property {string} name - The crew member's name.
 * @property {string} original_name - The crew member's name in their native language.
 * @property {number} popularity - A popularity score.
 * @property {string | null} profile_path - The path to the crew member's profile image.
 * @property {string} credit_id - The unique identifier for this credit record.
 * @property {string} department - The department the crew member worked in (e.g., "Editing").
 * @property {string} job - The specific job title (e.g., "Editor").
 */

/**
 * Represents the full credits response for a movie, including cast and crew.
 * @typedef {object} CreditsResponse
 * @property {number} id - The movie's unique identifier.
 * @property {CastMember[]} cast - An array of cast members.
 * @property {CrewMember[]} crew - An array of crew members.
 */

// You can leave this export statement here. It helps editors understand this is a module.
export {};
