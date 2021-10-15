const express = require("express");
const ItemsModel = require("../Models/itemsModel.js");

const router = new express.Router();

router.get("/", async (req, res) => {
  try {
    const items = await ItemsModel.find();
    res.status(200).json(items);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Unable to fetch items (Internal server error)" });
  }
});

router.post("/", async (req, res) => {
  const addItem = new ItemsModel(req.body);
  try {
    await addItem.save();
    res.status(201).json(addItem);
  } catch (error) {
    console.log(error.message);
    response.status(409).json({ message: error.message });
  }
});

router.patch("/:id/update", async (req, res) => {
  const { id: _id } = req.params;
  const item = req.body;
  try {
    const updatedItem = await ItemsModel.findByIdAndUpdate(
      _id,
      { ...item, _id },
      {
        new: true,
      }
    );
    res.status(200).json(updatedItem);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
});

router.delete("/:id/delete", async (req, res) => {
  const { id: _id } = req.params;
  try {
    await ItemsModel.findByIdAndRemove(_id);
    res.status(200).json({ message: "Item removed" });
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
});

module.exports = router;
