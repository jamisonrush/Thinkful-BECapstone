const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

const corsGet = cors({ methods: "GET" });

const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

// TODO: Add your routes here
router
  .route("/")
  .get(corsGet, controller.list)
  .options(corsGet)
  .all(methodNotAllowed);

router
  .route("/:movieId")
  .get(corsGet, controller.read)
  .options(corsGet)
  .all(methodNotAllowed);

router
  .route("/:movieId/theaters")
  .get(corsGet, controller.getTheaters)
  .options(corsGet)
  .all(methodNotAllowed);

router
  .route("/:movieId/reviews")
  .get(corsGet, controller.getReviews)
  .options(corsGet)
  .all(methodNotAllowed);

module.exports = router;
