const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    //Build the QUERY
    //1a) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1b) Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = await Tour.find(JSON.parse(queryStr));
    //gte - grater then or equal, gt - greater then , lte - les then or equal, lt - less then

    // 2) Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    //Execute the QUERY
    const tours = await query;

    //SEND RESPONSE
    res.status(200).json({
      status: 'Success',
      result: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'Fail...',
      message: error,
    });
  }
}; // Get All Tours

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    //Tour.findOne({ _id: req.params.id}) as a reference
    res.status(200).json({
      status: 'Success',
      data: {
        tour: tour,
      },
    });
  } catch (error) {
    req.status(404).json({
      status: 'Fail...',
      message: error,
    });
  }
}; // Get One Tour

exports.createTour = async (req, res) => {
  try {
    //const newTour = new Tour({});
    //newTour.save();

    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'Success',
      data: {
        tour: newTour,
      },
    }); // (201) means it is created
  } catch (err) {
    res.status(400).json({
      status: 'Fail...',
      message: err,
    });
  }
}; // end of Create Tour method

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'Success',
      data: {
        tour: tour,
      },
    }); // 200 means OKEJ
  } catch (error) {
    res.status(404).json({
      status: 'Fail...',
      message: error,
    });
  }
}; // end of Update Tour method

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'Success',
      data: null,
    }); // 204 means no content
  } catch (error) {
    res.status(404).json({
      status: 'Fail...',
      message: error,
    });
  }
}; // End of delete tour method

//const tours = await Tour.find({
//duration: 5,
//difficulty: 'easy',
//});

//const tours = await Tour.find()
//.where('duration')
//.equals(5)
// .where('difficulty')
//.equals('easy');
