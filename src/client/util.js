exports.formatDate = function(rawDate) {
	let date = new Date(rawDate);
	return (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear()
		+ " " + date.getHours() + ":" + date.getMinutes() + " PST";
};
