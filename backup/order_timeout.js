/**
 * New node file
 */

var mongoModels = require('../dbutil/monogo_models.js');

var spInfoModel = mongoModels.spInfoModel;
var gameInfoModel = mongoModels.gameInfoModel;
var cpInfoModel = mongoModels.cpInfoModel;
var userinfoModel = mongoModels.userInfoModel ;
var orderInfoModel = mongoModels.OrderInfoModel;
var configureModel = mongoModels.configureModel;
var serverCenterAddressModel = mongoModels.serverCenterAddressModel;
var backupOrderModel = mongoModels.backupOrderModel;

var hour2 = 60 * 60 * 1000*2;

exports.order_timeout = function(){

	var  now = new Date();
	orderInfoModel.find({'date':{$lt : now.setTime(now.getTime()+hour2)}}, function(err,docs){
		if( !err && !docs){
			backupOrderModel.save( docs);
		}
		
	});
	
	orderInfoModel.remove({'date': {$lt : new Date()}});

	
	
};