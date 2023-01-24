import express from "express";
import { ReviewModel } from "../../database/allModels";
import passport from "passport";

const Router = express.Router();

/**
 * Route : /:restId
 * Desc  : Get all reviews for a particular rest.
 * Params: restId
 * access: public
 * Method: GET
 */

Router.get("/:restId", async (req, res) => {

    try {
        const { restId } = req.params;
        const reviews = await ReviewModel.find({ Restaurants: restId }).sort({
            createdAt: -1
        });
        return res.json({ reviews })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
});

/**
 * Route : /new
 * Desc  : add new food / rest. review
 * Params: 
 * access: private
 * Method: post
 */

Router.post("/new", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {

        const { _id } = req.user;
        const { reviewData } = req.body;

        const newReview = await ReviewModel.create({ ...reviewData, user: _id });

        return res.json({ newReview })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

/**
 * Route : /delete/:_id
 * Desc  : delete a review
 * Params: 
 * access: private
 * Method: delete
 */

Router.post("/delete", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {

        const { user } = req;
        const { id } = req.params;
        const data = await ReviewModel.findOneAndDelete({
            _id: id,
            user: user._id,
        });

        if (!data) {
            return res.status(404).json({ message: "Review was not deleted" })
        }

        return res.json({ message: "Successfully deleted the review", data });


    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

export default Router;