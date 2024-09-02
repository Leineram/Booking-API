import { Router } from "express";
import getReviews from "../services/reviews/getReviews.js";
import getreviewById from "../services/reviews/getReviewById.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import createReview from "../services/reviews/createReview.js";
import deleteReviewById from "../services/reviews/deleteReviewById.js";
import errorHandler from "../middleware/errorHandler.js";
import authmiddleware from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const reviews = await getReviews();
        res.status(200).json(reviews);
    } catch (err) {
        next(err);
    }
}, errorHandler);

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const review = await getreviewById(id);
        res.status(200).json(review);
    } catch (err) {
        next(err);
    }
}, errorHandler);

router.put("/:id", authmiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;
        const reviewToUpdate = await updateReviewById(id, rating, comment);
        res.status(200).json(reviewToUpdate);
    } catch (err) {
        next(err);
    }
}, errorHandler);

router.delete("/:id", authmiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const reviewToDelete = await deleteReviewById(id);
        res.status(200).json({ message: `Review with ${reviewToDelete} id was deleted` })
    } catch (err) {
        next(err);
    }
}, errorHandler);

router.post("/", authmiddleware, async (req, res, next) => {
    try {
        const { rating, comment, propertyId, userId } = req.body;
        const newReview = await createReview(rating, comment, propertyId, userId);
        res.status(201).json(newReview);
    } catch (err) {
        next(err);
    }
}, errorHandler);

export default router;
