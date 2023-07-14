import { Router } from "express";
import passport from "passport";
const authRouter = Router();
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/success",
    session: false,
  }),
  (req, res) => {
    res.send("Successfully logged in");
  }
);

authRouter.get("/failure", (req, res) => {
  res.send("Failed to login");
});
export default authRouter;
