const mongoose = require("mongoose");

const MonthlySchema = mongoose.Schema({
	movieTitle: String,
	streamingService: String,
	date: String,
});
mongoose.pluralize(null);

module.exports = mongoose.model("new-streaming", MonthlySchema);
