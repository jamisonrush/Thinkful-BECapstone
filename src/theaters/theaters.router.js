const router = require("express").Router({ mergeParams: true });
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

const corsGet = cors({ methods: "GET" });

// TODO: Add your routes here
router
  .route("/")
  .get(corsGet, controller.list)
  .options(corsGet)
  .all(methodNotAllowed);

module.exports = router;
