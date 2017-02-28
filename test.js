console.log('Testing redis-serverclient ...');

var redis=require('./index');

var expireT=3; //seconds
var expireTms=(expireT+1)*1000; //milliseconds to test expiration
var item={name:'name',value:'shaktiman'}; //test key:value pair


console.log('initiating redis ...');
redis.init(6379,function(err){
	if(err){
		console.log('err : ',err);
		return;
	}

	console.log('initiating redis ... done');

	//Set a value
	redis.client.set(item.name,item.value);
	
	//Get a value
	get(function(err,reply){
		if(err){
			reply=null;
		}

		test('> Get Simple Value for '+item.name,item.value,reply);
		err=reply=undefined; //reset vars

		//set expire
		redis.client.expire('name',expireT);
		get(function(err,reply){
			if(err){
				reply=null;
			}
			test('> Get immediate expire Value for '+item.name,item.value,reply);
			err=reply=undefined; //reset vars

			setTimeout(function() {
				get(function (err,reply) {
					test('> Get delayed expire Value for '+item.name,null,reply);

					redis.close();
					console.log('Testing finished ...');
					process.exit();
				});
			}, expireTms);
		});
	});

});


function get (callback) {
	redis.client.get('name',function(err,reply){
		callback(err,reply);
	});
};









/*
	TEST Utilities
 */
function testAsync(topic,expected,func){
	func(function(err,data){
		if(err){
			console.log(topic+': \u2613 FAIL! :(');
		}else{
			console.log(test(topic,expected,data));
		}
	});
	
}

function test(topic,expected,result){
	var res=topic+': ';
	if(expected===result){
		res+= '\u2713 PASS :)';
	}
	else{
		res+='\u2613 FAIL! :(';
	}

	console.log(res);
	return res;
}
