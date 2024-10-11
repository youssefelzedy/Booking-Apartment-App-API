const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.setApartmentUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.apartment) req.body.apartment = req.params.apartmentId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = catchAsync(async (req, res, next) => {
  // To allow for nested GET reviews on Apartment (hack)
  let filter = {};
  if (req.params.apartmentId) filter = { apartment: req.params.apartmentId };

  const features = await Review.find(filter);
  //   .filter()
  //   .sort()
  //   .limitFields()
  //   .paginate();
  // const doc = await features.query.explain();
  // const doc = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: features.length,
    data: {
      data: features
    }
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  let doc = await Review.findById(req.params.id);

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const doc = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  console.log(req.body);
  console.log(req.params.id);
  console.log(req.user);
  const doc = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const doc = await Review.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
