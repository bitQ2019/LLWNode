/**
 * New node file
 */

var mongoModels = require('../dbutil/monogo_models.js');

var spInfoModel = mongoModels.spInfoModel;
var gameInfoModel = mongoModels.gameInfoModel;
var cpInfoModel = mongoModels.cpInfoModel;
var orderModel = mongoModels.orderModel;



exports.query = function( req, res){
	var cpid = req.query.cpid;
	var token = req.query.token;
	
	orderModel.find({ "_id" : token}, function(err, docs){
		if( !err && docs){
			
			if( docs[0].SpNum === docs[0].states){
				
				var retVal = {
					"Result" : 1,
					"RequestedPayment" : docs[0].payment
				};
				res.send( JSON.stringify( retVal));
			}else{
				var retVal = {
						"Result" : -1
					};
				res.send( JSON.stringify( retVal));
			}
			
		}
	});
	
	
};