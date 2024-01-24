const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  const { movieId } = request.params;
  const movie = await service.read(movieId);

  if (movie) {
    response.locals.movie = movie;
    return next();
  }

  next({ status: 404, message: "Movie cannot be found." });
}

async function read(request, response) {
  const { movie: data } = response.locals;
  response.json({ data });
}

async function list(request, response) {
  const { is_showing } = request.query;
  const data = is_showing ? await service.list(true) : await service.list();

  response.json({ data });
}

async function getTheaters(request, response) {
  const { movie: data } = response.locals;
  const theaters = await service.getTheaters(data.movie_id);
  response.json({ data: theaters });
}

async function getReviews(request, response) {
  const { movie: data } = response.locals;
  const reviews = await service.getReviews(data.movie_id);
  const reviewsWithCritic = await Promise.all(
    reviews.map(async (review) => {
      const criticInfo = await service.getCriticInfo(review.review_id);
      return { ...review, critic: criticInfo };
    })
  );
  response.json({ data: reviewsWithCritic });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  getTheaters: [asyncErrorBoundary(movieExists), getTheaters],
  getReviews: [asyncErrorBoundary(movieExists), getReviews],
};
