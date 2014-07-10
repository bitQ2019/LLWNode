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


var day31 = 31 * 24 * 60 * 60 * 1000;
/***
 * 备份订单
 */
exports.order_backup = function(){
	
	
	 var now = new Date()
	orderInfoModel.find({'date': {$lt : now.setTime(now.getTime()-day31) }}, function(err,docs){
		if( !err && !docs){
			backupOrderModel.save( docs);
		}
		
	});
	
	orderInfoModel.remove({'date': {$lt : new Date()}});
	
	
};