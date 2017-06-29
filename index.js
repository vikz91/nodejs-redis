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
		redisClient = RedisClient.createClient();

		redisClient.on("error", function (err) {
			callback(err);
		});

		Redis.prototype.client = redisClient;

		if (err === null) {
			Redis.prototype.server = redisServer;
			callback(null);
		}else{
			if(err.toString().search('Error: Address already in use')>-1){
				console.log('REDIS already running .');
				Redis.prototype.server = null;
				callback(null);
			}else{
				callback(err);
			}
			
		}
	});
};


//CLose redis server instance
Redis.prototype.close=function (callback) {
	redisClient.end(true);
	if(redisServer && redisServer.close){
		redisServer.close((err)=>{
			if(err){return callback(err);}
			callback(null);
		});
	}else{
		callback(null);
	}
	
}; 



var redis=new Redis();

module.exports=redis;