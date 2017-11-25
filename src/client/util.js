exports.formatDate = function(rawDate) {
	let date = new Date(rawDate);
	return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear()
		+ " " + date.getHours() + ":" + date.getMinutes() + " PST";
};
