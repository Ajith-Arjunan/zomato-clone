import express from "express";
import passport from "passport";
import { UserModel } from "../../database/allModels";
import { validateSignup, validateSignin } from "../../validation/auth.validation";


const Router = express.Router();

Router.post("/signup", async (req, res) => {
    try {
        await validateSignup(req.body.credentials);

        await UserModel.findByEmailAndPhone(req.body.credentials);

        const newUser = await UserModel.create(req.body.credentials);

        const token = newUser.generateJwtTocken;

        return res.status(200).json({ token, status: "success" });

    } catch (error) {
        return res.status(500).json({ status: "failed", error: error.message });
    }
});


Router.post("/signin", async (req, res) => {
    try {
        await validateSignin(req.body.credentials);

        const user = await UserModel.findByEmailAndPassword(req.body.credentials);

        const token = user.generateJwtTocken();

        return res.status(200).json({ token, status: "success" });

    } catch (error) {
        return res.status(500).json({ status: "failed", error: error.message });
    }
});

// Google Auth
Router.get("/google", passport.authenticate('google', {
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
    ],
}));

Router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        return res.status(200).json({ token: req.session.passport.user.token });
    }
);


export default Router;