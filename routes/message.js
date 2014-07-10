


var mongoModels = require('../dbutil/monogo_models.js');

var spInfoModel = mongoModels.spInfoModel;
var gameInfoModel = mongoModels.gameInfoModel;
var cpInfoModel = mongoModels.cpInfoModel;
var orderModel = mongoModels.orderModel;


function isNullOrEmpty( reqParam){
	return reqParam !== "" && reqParam !== null;
}


function filterSp(){
	 
	var i = 0;
	var filterObj  = arguments[0];
	for( i = 1; i < arguments.length; i ++){
		
		filterObj = arguments[i]( filterObj);
	}
	
	return filterObj;
}

function getAllSpByMnc(imsi){
	
	
	spInfoModel.find({'pmnc': imsi} , function( err, docs){
		
	});
	
}



/***
 * @param spObj
 * @returns
 */
function getSpOnDayLimit( spObj){
	
	return spObj;
}


/***
 * @param spObj
 * @returns
 */
function getSpOnMonthLimit( spObj){
	return spObj;
}



function setPayDefault(){
	
	var defaultMessage = {
			Result :  -1,
			Msg :""
	};
	
	
	return JSON.stringify( defaultMessage);
}


function packageSpAndPutInCache( spInfos, token){
	
	
	function SPData(){
		this.Spid = 0;
		this.Spcount = 0;
		
	}
	
	
	var spArr = new Array( spInfos.length);
	
	for( var i = 0 ; i < spInfos.length; i ++){
		
		SPData oneSp = new SPData();
		oneSp.Spid = spInfos[i].Spid;
		spArr[i] = oneSp;
		
	}
	
	var retVal  = {
		Result :1,
		Token : token,
		sp : spArr
	};
	
	retVal = JSON.stringify( retVal);
	
	/***
	 * cache table 
	 */
	
	return retVal;
}


exports.payMessage = function(req, res){

	 
	var retMessage = "";
	
	var cpid = req.query.cpid;
	var gameid = req.query.gameid;
	var gamekey = req.query.gamekey;
	var extra = req.query.extra;
	var payment = req.query.payment;
	var uuid = req.query.uuid;
	var imsi = req.query.imsi;
	var imei = req.query.imei;
	var province = req.query.province;
	
	var phonenumber = req.query.phonenumber;
	
	
	if( !isNullOrEmpty(cpid) 
			|| !isNullOrEmpty(gameid)
			|| !isNullOrEmpty(gamekey)
			|| !isNullOrEmpty(payment)
			|| !isNullOrEmpty(uuid)
			|| !isNullOrEmpty(imsi)
			|| !isNullOrEmpty(imei) ){
		
		/** todo**/
		
		console.log("all except phonenumber must not be null");
		retMessage = setPayDefault();
	}
	
	gameInfoModel.find({'gameid': gameid, 'gamekey': gamekey }, function( err, docs){
		
		if( err || docs){
			/**todo**/
			console.log('no game matched!');
			res.send(setPayDefault());
			
		}else{
			
			var tmpImsi = imsi.substr(4,2);
			var nowTM = new Date();
			spInfoModel.find({'pmnc': tmpImsi , province : { $in: [province] }} , function( err, spDocs){
				
				if( !err && docs){
					orderModel.find( {'cpid': cpid, 'date': { $lt : [nowTM.getMonth() + 1]}} , function( err, orderDocs){
						
						if( !err){

							var allSp = [];
							
							/***
							 * 日线
							 */
							for( var i = 0 ; i < spDocs.length; i ++){
								var totalPay =0;
								for( var j = 0 ; orderDocs !== null && j < orderDocs.length; j ++){
									if( spDocs[i].spid in orderDocs[j].spinfo){
										totalPay += orderDocs[j].spinfo.payment;
									}
								}
								/*if( totalPay < spDocs[i].dailylimit
										&& spDocs[i].dailylimit - totalPay > payment 
										&& ){
									allSp.push( spDocs[i]);
								}*/
								
								if( totalPay < spDocs[i].dailylimit
										&& spDocs[i].dailylimit - totalPay > payment ){
									allSp.push( spDocs[i]);
								}
								
							}
							orderModel.save( { date : new Date(), 
								               spNum : 0,
								               states : allSp.length,
								               cpid : cpid,
								               payment : payment,
								               spinfo : allSp}, function( err, docs){
								
								if( !err){
									var token = docs[0]._id;
									res.send( packageSpAndPutInCache(allSp, token));
								}
								
							});
							/***
							 * 月线
							 */
							
							
						}
						
					});

					
				}
			});

		}
		
	});
	
	
	
};

/**:
 * ��ѯ�����Ƿ�ɹ�
 */
exports.reportMessage = function( req, res){
	

	
	
};


/**
 * ��ѯ֧���Ƿ�ɹ�
 */
exports.queryMessage = function( req, res){
	
};