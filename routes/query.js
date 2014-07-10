/**
 * New node file
 */
var http = require('http');
var url = require("url");


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



				gameInfoModel.find({ "gameid": docs[0].gameid }, function (err, gameDocs) {

				    if (err || gameDocs) {

				        console.log("gameid found err");

				    }
				    else {
				        if (gameDocs[0].ishttpget) {

				            http.get(gameDocs[0].callbackurl , function (res) {
				                res.setEncoding("utf-8");
				                var resData = [];
				                res.on("data", function (chunk) {

				                    resData.push(chunk);

				                })
                                .on("end", function () {
                                   


                                });
				            });


				        }
				        else {

				        }

				    }


				});

				res.send( JSON.stringify( retVal));
			}else{
				var retVal = {
						"Result" : -1
					};
				res.send(JSON.stringify(retVal));

			}
			
		}
	});
	
	
};



var strUrl = "http://jser.zeroplace.cn/";
