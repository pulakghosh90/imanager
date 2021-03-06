//Dependencies
var router = require('express').Router(),
	ApiLogger = require('../common/ApiLogger'),
	printer = require('../util/PrintOrder'),
	moment = require('moment');

var logger = ApiLogger.getLogger();

var downloadReport = function (req, res, next) {
	var date = req.query.date;
	printer.createReport(date, function (err, report) {
		if (err) {
			logger.error('Eror generating report.', err);
			res.send('Failed generate report. Try again after some time.');
		} else {
			res.download(report, moment().format('YYYYMMDDHmmss') + '.pdf');
		}
	});
};

var streamReport = function (req, res, next) {
	var date = req.query.date;
	printer.createReport(date, function (err, report) {
		if (err) {
			logger.error('Eror generating report.', err);
			res.send('Failed generate report. Try again after some time.');
		} else {
			res.sendFile(report);
		}
	});
};

// publish endpoints
router.get('/order/view', streamReport);
router.get('/order/download', downloadReport);

module.exports = router;