


var mongoModels = require('../dbutil/monogo_models.js');

var spInfoModel = mongoModels.spInfoModel;
var gameInfoModel = mongoModels.gameInfoModel;
var cpInfoModel = mongoModels.cpInfoModel;
var userinfoModel = mongoModels.userInfoModel ;
var orderInfoModel = mongoModels.OrderInfoModel;
var configureModel = mongoModels.configureModel;
var serverCenterAddressModel = mongoModels.serverCenterAddressModel;

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
		this.spid = 0;
		this.payment = 0;
		
	}
	
	
	var spArr = new Array( spInfos.length);
	
	for( var i = 0 ; i < spInfos.length; i ++){
		
		SPData oneSp = new SPData();
		oneSp.Spid = spInfos[i].spid;
		oneSp.payment = spInfos[i].payment;
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
	var areacode = req.query.areacode;
	var phonenumber = req.query.phonenumber;
	
	var province = '';
	var ydwlCode ='';
	////////////////////////////////////////////
	/////////////验证开始
	/////////////
	
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

	
	
	
	
	gameInfoModel.find({'gameid': gameid, 'gamekey': gamekey }, function( err, gameDocs){
		
		if( err || gameDocs){
			/**todo**/
			console.log('no game matched!');
			res.send(setPayDefault());
			
		}
		else
		{
			 ///////////////////////////////////////////////////////////
            //   验证完毕  查询 地区 表
            //////////////////////////////////////////////////////////
	
		
		     userinfoModel.find({'uuid':uuid,'imsi':imsi}, function(err,docs){
			
		      if(err){
			         console.error(err);
		       }
		      else if(docs)
		      {
			     	 console.log('user already exist');
			 
		      }
    		  else
    		  {
    			
    		
				
    				var userinfoEntity = new userinfoMode({'createdate':new Date(),	'imsi' :imsi , 'imei' : imei , 'uuid' : uuid , 'phonenumber':phonenumber});
    				
    				userinfoEntity.save();

				    
		      }
			  });
		
		     serverCenterAddressModel.find({'areacode':areacode},function(err,docs)
                {
                    if(err || docs)
                    {
                       console.log('no areacode matched!');
                    }
                
                    province =  docs[0].province;
                    ydwlCode = docs[0].typename;

                    console.log(province+ydwlCode);

                 	var nowTM = new Date();

					spInfoModel.find({'spmnc': spmnc , province : { $in: [province] }} , function( err, spDocs){
			
					if( !err && docs)
					{
	 					var allSp = [];
						var fixPayment = 0;			
					    orderModel.find( {'userid': userid ,'date': { $lt : [nowTM.getMonth() + 1]}} , function( err, orderDocs)
						{
						        
						    if( !err && docs)
							{
								 for(var i = 0; i < spDocs.length;i++)
								 {  
							        var totalPay =0;
	                                var dayPay = 0; 
							  /////////////月限查询
								   for( var j = 0 ; j < orderDocs.length; j ++)
								   {
										if (spDocs[i].spid in orderDocs.spid)
										{
										   totalPay += orderDocs[j].spinfo.payment;
										/////////////日限查询
										   if( nowTM.getDay ==orderDocs[j].date.getDay())
										   {
										       dayPay += orderDocs[j].spinfo.payment;
										   }
										}
										
									}
								//////////////////判断
									if( totalPay < spDocs[i].monthlimit && dayPay < spDocs[i].daylimit)
									{
									    var tempCanPayment  = spDocs[i].daylimit - dayPay;
									    fixPayment  +=  tempCanPayment;
									    
									    console.log(fixPayment);
									    
									    var obj = new Object();
									     obj.id = spDocs[i].spid;
									     obj.payment = tempCanPayment;
										allSp.push( obj );
										if(fixPayment >= payment)
										 {
										 	   orderModel.save( { date : new Date(), 
                                               spNum : 0,
                                               states : allSp.length,
                                               uuid : uuid,
                                               payment : payment,
                                               spinfo : allSp,
                                               gameid :gameid

                                           }, function( err, docs)
                                           {
                                
                                			if( !err){
                                    		var token = docs[0]._id;
                                   			 res.send( packageSpAndPutInCache(allSp, token));
                                			}
										 });
										 }
										
									}
								}
							}
							else
							{
							      console.log('查询order error');
							}
								
							
						});
					   
					}
				     else
					{
					        console.log('查询sp error');
					}		
						
					});


                }); 
		}
	        
	        });
}
	     



exports.reportMessage = function( req, res){
	

	
	
};



exports.queryMessage = function( req, res){
	
	
	
};