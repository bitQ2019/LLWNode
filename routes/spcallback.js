var mongoModels = require('../dbutil/monogo_models.js');
var spInfoModel = mongoModels.spInfoModel;
var gameInfoModel = mongoModels.gameInfoModel;
var cpInfoModel = mongoModels.cpInfoModel;
var orderModel = mongoModels.orderModel;


exports.updateCallback = function (req, res) {
    var spid = req.query.spid;

    spInfoModel.find({ 'spid': spid }, function (err, spDocs) {

        if (err || spDocs) {

            console.log("can't find sp");

        }
        else {
            var content = sp.spDocs[0].callbacktokenfield;
            /////////////////Í¨¹ýcontentÄÃµ½token;
            var token ='';
           
            orderModel.find({ 'token': token }, function (err, orderDocs) {

                if (err || docs) {
                    console.log('no order found  error')
                }
                else {

                    orderDocs[0].spnum++;
                    orderDocs[0].save(function (err) {
                        console.log('update orderdocs error');
                    });

                }

            });



        }

    });


};