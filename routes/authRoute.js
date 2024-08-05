const { Router } = require("express");
const authController = require("../controllers/authController");

const routes = Router();

routes.get("/api/auth/signup", authController.signup_get);
routes.post("/api/auth/signup", authController.singup_post);
routes.get("/api/auth/login", authController.login_get);
routes.get("/api/auth/logout", authController.logout_get);
routes.post("/api/auth/login", authController.login_post);

module.exports = routes;
