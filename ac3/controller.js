const Location = require("./model");

// get all Locations
const getLocations = async (req, res) => {
  try {
    const locations = await Location.find({});
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ location: error.location });
  }
};

// Add one Location
const addLocation = async (req, res) => {
  try {
    const { sender, recipient, content } = req.body;
    const newLocation = new Location({ sender, recipient, content });
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(500).json({ location: error.location });
  }
};

// Get Location by ID
const getLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const location = await Location.findById(id);
    if (!location) {
      return res.status(404).json({ location: "No lacation is there" });
    }
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ location: error.location });
  }
};

// Delete Location by ID
const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const location = await Location.findByIdAndDelete({ _id: id });
    if (!location) {
      return res.status(404).json({ location: "No lacation is there" });
    }
    res.status(200).json({ location: "Location deleted successfully" });
  } catch (error) {
    res.status(500).json({ location: error.location });
  }
};

// Delete all Locations
const deleteAllLocations = async (req, res) => {
  try {
    const result = await Location.deleteMany({});
    res
      .status(200)
      .json({ location: `Deleted ${result.deletedCount} books successfully` });
  } catch (error) {
    res.status(500).json({ location: error.location });
  }
};

// Update Location by ID
const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedLocation = req.body;
    const location = await Location.findOneAndUpdate({ _id: id }, updatedLocation);
    if (!location) {
      return res.status(404).json({ location: "No lacation is there" });
    }
    res.status(200).json(location);
  } catch (error) {console.error("Error getLocations:", error.location);
  process.exit(1); // Exit with failure

    // res.status(500).json({ location: error.location });
  }
};

module.exports = {
  getLocations,
  addLocation,
  getLocation,
  deleteLocation,
  deleteAllLocations,
  updateLocation,
};