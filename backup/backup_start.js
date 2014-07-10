/**
 * New node file
 */
var db_backup = require('../backup/db_backup.js').db_backup;
var order_backup = require('../backup/order_backup.js').order_backup;
var order_timeout = require('../backup/order_timeout.js').order_timeout;


exports.backup_start = function(){
	
	var later = require('later');
	var sched_db_backup = later.parse.recur().every().month();
	var t_db_backup = later.setInterval(db_backup, sched_db_backup);
	

	var sched_order_backup = later.parse.recur().every().day();
	var t_order = later.setInterval(order_backup, sched_order_backup);

	
	var sched_order_timeout = later.parse.recur().every(2).hour();
	var t_order_timeout = later.setInterval(order_timeout, sched_order_timeout);
	
};