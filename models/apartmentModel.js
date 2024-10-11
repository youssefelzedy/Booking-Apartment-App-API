const mongoose = require("mongoose");

// Apartment Schema
const apartmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "An apartment must have a name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "An apartment must have a description"],
      trim: true,
    },
    location: {
      city: {
        type: String,
        required: [true, "An apartment must have a city"],
      },
      country: {
        type: String,
        required: [true, "An apartment must have a country"],
      },
      address: {
        type: String,
        required: [true, "An apartment must have an address"],
      },
      coordinates: {
        lat: {
          type: Number,
          required: [true, "An apartment must have latitude"],
        },
        lng: {
          type: Number,
          required: [true, "An apartment must have longitude"],
        },
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    pricePerNight: {
      type: Number,
      required: [true, "An apartment must have a price per night"],
      min: [0, "Price per night must be at least 0"],
    },
    amenities: {
      type: [String], // List of amenities
      default: [],
    },
    images: {
      type: [String], // URLs to apartment images
      default: [],
    },
    availability: [
      {
        startDate: {
          type: Date,
          required: [true, "Availability must have a start date"],
        },
        endDate: {
          type: Date,
          required: [true, "Availability must have an end date"],
        },
      },
    ],
    maxGuests: {
      type: Number,
      required: [true, "An apartment must have a max guest number"],
      min: [1, "Maximum guests must be at least 1"],
    },
    rooms: {
      bedrooms: {
        type: Number,
        required: [true, "An apartment must have a number of bedrooms"],
      },
      bathrooms: {
        type: Number,
        required: [true, "An apartment must have a number of bathrooms"],
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate
apartmentSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "apartment",
  localField: "_id",
});

// Exporting the model
const Apartment = mongoose.model("Apartment", apartmentSchema);
module.exports = Apartment;
