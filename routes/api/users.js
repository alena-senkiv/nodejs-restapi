const express = require("express");

const { users: ctrl } = require("../../controllers");
const { subscriptionJoiSchema } = require("../../models/user");
const { auth, validation, ctrlWrapper } = require("../../middlewares");
const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch(
  "/",
  auth,
  validation(subscriptionJoiSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
