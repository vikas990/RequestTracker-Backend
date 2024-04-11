const express = require("express");
const router = express.Router();
require("../db/mongoose");
const RequestModel = require("../models/requestModel");
const CounterModel = require("../models/counterModel");

router.post("/request", (req, res) => {
  // Auto Increment Function
  CounterModel.findOneAndUpdate(
    { id: "autoval" },
    { $inc: { seq: 1 } },
    { new: true }
  ).then((cd) => {
    let seqId;
    if (cd === null) {
      const newVal = new CounterModel({ id: "autoval", seq: 1 });
      newVal.save();
      seqId = 1;
    } else {
      seqId = cd.seq;
    }

    // Request Data Post
    const {
      partyName,
      description,
      quantity,
      amount,
      date,
      time,
      senderName,
      option,
    } = req.body;

    if (
      !partyName ||
      !description ||
      !quantity ||
      !amount ||
      !date ||
      !time ||
      !senderName ||
      !option
    ) {
      return res.status(422).json({ error: "All field are required!!" });
    }

    const RequestData = new RequestModel({
      id: seqId,
      partyName,
      description,
      quantity,
      amount,
      date,
      time,
      senderName,
      option,
    });

    RequestData.save()
      .then((result) => {
        res.send({ Request: result });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

router.get("/allRequest", (req, res) => {
  RequestModel.find()
    .then((requests) => {
      res.status(200).json({ requests });
    })
    .catch((err) => console.log(err));
});

router.get("/edit/:id", (req, res) => {
  RequestModel.findOne({ id: req.params.id })
    .then((request) => {
      return res.status(200).json({ request });
    })
    .catch((err) => console.log(err));
});

router.put("/editRequest", (req, res) => {
  const {
    partyName,
    description,
    quantity,
    amount,
    date,
    time,
    senderName,
    option,
    id,
  } = req.body;

  if (
    !partyName ||
    !description ||
    !quantity ||
    !amount ||
    !date ||
    !time ||
    !senderName ||
    !option
  ) {
    return res.status(422).json({ error: "All field are required!!" });
  } else if (!id) {
    return res
      .status(422)
      .json({ error: "Some Error occured! id is not passed down" });
  }

  RequestModel.findOneAndUpdate(
    { id: id },
    {
      $set: {
        partyName,
        description,
        quantity,
        amount,
        date,
        time,
        senderName,
        option,
      },
    },
    { new: true }
  )
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(422).json({ err: "Request did not updated!", err });
    });
});

module.exports = router;
