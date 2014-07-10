
function  monogoConn( ){
	
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	mongoose.connect('mongodb://localhost:27017/nodetest1' ,
			function( err){
		if( err){
			console.log("fail connect!!!");
		}
	});


	var spinfoSchema = new Schema({
		_id : String, // id 
		callbacktokenfiled : String,
		dailylimit : Number,
		monthlimit: Number,
		ison : Number,//是否激活
		province : String,
		spcode : String,
		spid : Number,
		spkey : String,
		spmnc : String,//移动网络号
		spname : String,
		spnumber : String,
		sppayment : Number// 每次支付的金额
	});
	
	
	var gameinfoSchema = new Schema({
		_id:String,
		gameid : String,
		gamename : String,
		gamekey : String,
		ishttpget : Number,//是否http
		callbackurl : String,//回调地址
		ison : Number,//是否激活
		extra : String,//备用字段
		cpid : String
		
	});
	
	
	var cpinfoSchema = new Schema({
		_id : String,
		cpid : Number,
		cpkey :String,
		cpname :String,
		ison : Number,//是否激活
		callbackurl: String //
	});

	var userinfo = new Schema(
	{
		_id : String,
		createdate :Date, //创建时间
		imsi:String,
		imei:String,
		uuid:String,
		name:String,
		areaid:String ,//地区码
		phonenum:String  
		
		
	});
	
	var orderinfoSchema = new Schema(
	{
		_id:String,
		date :Date,
		logid: String,
		spNum: Number,  // sp 数量
		spstates:Number,// 确认的sp 数量
		token: String,
		payment:Number,
		timeOut: Number,// time out
		gameid :String,
		uuid:String, //更改
		spinfo: []
	});



	
	var backupOrderSchema = new Schema(
	{
		_id:String,
		date :Date,
		logid: String,
		spNum: Number,  // sp 数量
		spstates:Number,// 确认的sp 数量
		token: String,
		payment:Number,
		timeOut: Number,// time out

		gameid :String,
		cpid :Number,
		spinfo: []

	});

	var configureSchema = new Schema(
	{
		_id:String,
		date:Date, //添加时间
		measurement: String,// 单位
		name : String , // 
		value : Number 

	});


	var serverCenterAddressSchema = new Schema(
	{
		_id:String,
		city:String ,
		name:String,
		areacode:String,
		province:String,
		typename:String

	});

	var SpInfoModel = mongoose.model('spinfo', spinfoSchema);
	var GameInfoModel = mongoose.model('gameinfo', gameinfoSchema);
	var CpInfoModel = mongoose.model('cpinfo', cpinfoSchema);
	var UserInfoModel = mongoose.model('userinfo', userinfo);
	var OrderModel = mongoose.model('orderinfo',orderinfoSchema);
	var BackupOrderModel = mongoose.model ('backup_orderinfo',backupOrderSchema);
	var ConfigureModel = mongoose.model ('configure',configureSchema);
	var ServerCenterAddressModel = mongoose.model ('configure',serverCenterAddressSchema);


	return [SpInfoModel, GameInfoModel, CpInfoModel,UserInfoModel,OrderModel,BackupOrderModel,ConfigureModel,ServerCenterAddressModel];
	
}


var models = monogoConn();

exports.spInfoModel = models[0];
exports.gameInfoModel = models[1];
exports.cpInfoModel = models[2];
exports.userInfoModel = models[3];
exports.orderModel = models[4];
exports.backupOrderModel = models[5];
exports.configureModel = models[6];
exports.serverCenterAddressModel = models[7];