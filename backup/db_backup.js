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

/***
 * mongodb 备份机制
 */
exports.db_backup = function(){
	
	
};