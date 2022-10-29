const mongoose = require("mongoose");

const MonthlySchema = mongoose.Schema({
	MovieTitle: String,
	StreamingService: String,
	Date: String,
});
mongoose.pluralize(null);

module.exports = mongoose.model("new-streaming", MonthlySchema);
