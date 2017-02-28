var RedisServer = require('redis-server');
var RedisClient = require('redis');

var redisServer = {};//new RedisServer(6379);
var redisClient = {};//RedisClient.createClient();

var Redis=function () {
	this.port=6379; //default port. chainge it through init
};


//Starts Redis Server and client and sends callback as err
//port is optional
Redis.prototype.init = function(port,callback){

	if(port===null || port===undefined){
		this.port=port;
	}
	
	redisServer = new RedisServer(this.port);

	// Start REDIS Server
	redisServer.open((err) => {
		if (err === null) {
			redisClient = RedisClient.createClient();

			redisClient.on("error", function (err) {
				callback(err);
			});

			Redis.prototype.server = redisServer;
			Redis.prototype.client = redisClient;

			callback(null);
		}else{
			callback(err);
		}
	});
};


//CLose redis server instance
Redis.prototype.close=function (callback) {
	redisClient.end(true);
	redisServer.close((err)=>{
		if(err){return callback(err);}
		callback(null);
	});
}; 



var redis=new Redis();

module.exports=redis;