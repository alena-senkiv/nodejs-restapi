const express = require("express");
const { users: ctrl } = require("../../controllers");
const {
  subscriptionJoiSchema,
  sendEmailJoiSchema,
} = require("../../models/user");
const { auth, upload, validation, ctrlWrapper } = require("../../middlewares");
const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
router.post(
  "/verify",
  validation(sendEmailJoiSchema),
  ctrlWrapper(ctrl.resendVerifyEmail)
);
router.patch(
  "/",
  auth,
  validation(subscriptionJoiSchema),
  ctrlWrapper(ctrl.updateSubscription)
);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
