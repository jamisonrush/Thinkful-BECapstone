const knex = require("../db/connection");

async function list(is_showing = false) {
  const query = knex("movies").select("*");

  if (is_showing) {
    query
      .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
      .where({ "movies_theaters.is_showing": true })
      .groupBy("movies.movie_id");
  }

  return query;
}

async function read(movie_id) {
  return knex("movies").select("*").where({ movie_id }).first();
}

async function getTheaters(movie_id) {
  return knex("theaters")
    .join(
      "movies_theaters",
      "theaters.theater_id",
      "movies_theaters.theater_id"
    )
    .where({ "movies_theaters.movie_id": movie_id });
}

async function getReviews(movie_id) {
  return knex("movies")
    .join("reviews", "reviews.movie_id", "movies.movie_id")
    .where({ "movies.movie_id": movie_id })
    .groupBy("reviews.review_id");
}

async function getCriticInfo(review_id) {
  return knex("reviews")
    .join("critics", "critics.critic_id", "reviews.critic_id")
    .select({
      organization_name: "critics.organization_name",
      preferred_name: "critics.preferred_name",
      surname: "critics.surname",
    })
    .where({ "reviews.review_id": review_id })
    .first();
}

module.exports = {
  list,
  read,
  getTheaters,
  getReviews,
  getCriticInfo,
};
