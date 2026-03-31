const Folder = require("../models/Folder");

// CREATE
exports.createFolder = async (req, res) => {
  const folder = new Folder({ name: req.body.name });
  await folder.save();
  res.json(folder);
};

// READ
exports.getFolders = async (req, res) => {
  const folders = await Folder.find();
  res.json(folders);
};

// DELETE
exports.deleteFolder = async (req, res) => {
  await Folder.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};