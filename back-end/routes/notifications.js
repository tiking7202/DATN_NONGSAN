const router = require("express").Router();
const notificationsController = require("../controllers/notificationsController");

router.get("/get-notification-distributor/:distributorid", notificationsController.getAllNotificationsDistributor);
router.get("/get-notification-user/:userid", notificationsController.getAllNotificationsUser);
router.put("/update-notification/:notificationid", notificationsController.updateNotification);
router.get("/get-notification/:notificationid", notificationsController.getNotificationById);
module.exports = router;
