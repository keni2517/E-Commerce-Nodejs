const express = require('express');
const reviewRoutes = express.Router();
const { verifyToken } = require('../helpers/tokenVerify');
const {
    addReview,
    getAllReview,
    getReview,
    // updateReview,
    deleteReview
} = require('../controller/review.controller');

reviewRoutes.post('/add-Review', verifyToken, addReview);
reviewRoutes.get('/get-All-Review', verifyToken, getAllReview);
// reviewRoutes.put('/update-Review', verifyToken, updateReview);
reviewRoutes.delete('/delete-Review', verifyToken, deleteReview);

module.exports = reviewRoutes;