const News = require("../db/models/News");

exports.getAll= ()=>News.find();
exports.delete= (objectID)=>News.deleteOne({objectID});

