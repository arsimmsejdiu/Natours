const express = require('express');

const {
  getAllTours,
  getTour,
  createTour,
  deleteTour,
  updateTour,
} = require('../controllers/tourController');

//Routers

const router = express.Router();

//router.param('id', checkID);

//Create a checkBody middleware
//Check if the body containes the name and the price property
//if not, send back 400 (bad reuest)
//Add it to the post handler stack

router.route('/').get(getAllTours).post(createTour);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
