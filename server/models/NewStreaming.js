const mongoose = require("mongoose");

const MonthlySchema = mongoose.Schema({
	"Movie Title": String,
	"Streaming Service": String,
	Date: String,
});

module.exports = mongoose.model("new-streaming", MonthlySchema);
