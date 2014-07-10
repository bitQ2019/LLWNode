/**
 * New node file
 */


var mongoModels = require('../dbutil/monogo_models.js');
var spInfoModel = mongoModels.spInfoModel;
var gameInfoModel = mongoModels.gameInfoModel;
var cpInfoModel = mongoModels.cpInfoModel;
var orderModel = mongoModels.orderModel;

exports.report = function( req, res){
	var cpid = req.query.cpid;
	var gameid = req.query.gameid;
	var token = req.query.token;
	var spArr =  req.query.sp.split(',');

	orderModel.find({ "_id" : token}, function(err, docs){
		if( !err && docs){
			var result = {
				"Result": 1,
				"Wait" : 10
			};
			
			res.send( JSON.stringify( result));
		}
	});
};