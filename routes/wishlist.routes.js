const express = require('express');
const favoriteRoutes = express.Router();
const { verifyToken } = require('../helpers/tokenVerify');

const {
    addToFavorite,
    getAllFavorite,
    deleteFavorite
} = require('../controller/wishlist.controller')

favoriteRoutes.post('/add-To-Favorite', verifyToken, addToFavorite);
favoriteRoutes.get('/get-All-Favorites', verifyToken, getAllFavorite);
favoriteRoutes.delete('/delete-Favorite', verifyToken, deleteFavorite);

module.exports = favoriteRoutes;