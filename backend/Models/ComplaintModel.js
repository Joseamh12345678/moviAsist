import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
title: String,
description: String,
date:{type:Date,default:Date.now},
image: String
});

export default mongoose.model("Complaint", complaintSchema);