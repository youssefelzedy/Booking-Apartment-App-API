const Apartment = require("../models/apartmentModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Helper function to filter object properties
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// Get all apartments
exports.getAllApartments = catchAsync(async (req, res, next) => {
  const apartments = await Apartment.find();

  res.status(200).json({
    status: "success",
    results: apartments.length,
    data: {
      apartments,
    },
  });
});

// Get a single apartment by ID
exports.getApartment = catchAsync(async (req, res, next) => {
  const apartment = await Apartment.findById(req.params.id).populate({ path: 'reviews' });

  if (!apartment) {
    return next(new AppError("No apartment found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      apartment,
    },
  });
});

// Create a new apartment
exports.createApartment = catchAsync(async (req, res, next) => {
  const {
    name,
    description,
    location,
    pricePerNight,
    amenities,
    images,
    availability,
    maxGuests,
    rooms,
  } = req.body;
  const newApartment = await Apartment.create({
    name,
    description,
    location,
    pricePerNight,
    amenities,
    images,
    availability,
    maxGuests,
    rooms,
  });

  res.status(201).json({
    status: "success",
    data: {
      apartment: newApartment,
    },
  });
});

// Update an apartment by ID
exports.updateApartment = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    "name",
    "description",
    "location",
    "pricePerNight",
    "amenities",
    "images",
    "availability",
    "maxGuests",
    "rooms"
  ); // Only update allowed fields

  const apartment = await Apartment.findByIdAndUpdate(
    req.params.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!apartment) {
    return next(new AppError("No apartment found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      apartment,
    },
  });
});

// Delete an apartment by ID
exports.deleteApartment = catchAsync(async (req, res, next) => {
  const apartment = await Apartment.findByIdAndDelete(req.params.id);

  if (!apartment) {
    return next(new AppError("No apartment found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
