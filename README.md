# redis-serverclient
A no-brainer Redis server + client singleton for node Apps


This npm package uses ['redis-server'](https://www.npmjs.com/package/redis-server) and ['redis'](https://www.npmjs.com/package/redis) npm packages and seves as a singleton wrapper over these awesome npm packages. 


## Installation
1. Install redis server first  
	a. [Windows](https://github.com/rgl/redis/downloads)  
	b. Mac OS X   ``brew install redis``  
    c. [Linux](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-redis)

2. Test Redis installation and port  
	a. Run `` redis-server`` on a terminal   
    b. Run `` redis-cli`` on another terminal and check if it connects  
    c. If everything goes well, close both the terminals.
3. Install redis-serverclient package ``npm i --save redis-serverclient``


## Usage
You can check the ``test.js`` file on how to use it. This is pretty simple and straight-forward.


### Initiation
``// file: app.js``
```
  const redis=require('redis-serverclient');
  redis.init(function(err){
  	if(err)
    	console.log('Redis Error: ',err);
    console.log('Redis running successfully!');
  });
```

This will initiate redis server and client. You can pass an optional port `` redis.init(6379,function(err){...``.  
If port is not passed, the default port used will be ``6379``.

Since **redis-serverclient** is singleton, you need to initialize it only once in main/index.js file. Require it anywhere and it would maintain the same state.


---

### Set a value
```
  const redis=require('redis-serverclient');
  
  redis.client.set('name','Gangadhar');
```

**redis.client** exposes a **redis** object from the respective npm package. So, use it as you would use ``var redisClient=require('redis');``.   

---


### Get a value
```
  const redis=require('redis-serverclient');
  
  redis.client.get('name',function(err,reply){
  	console.log('reply: ',reply);
  });
```


---

### Close Redis instance
```
redis.close();
```

This will close the active redis server AND client instance and any firther commands will be halted. Use this when your server is shutting down else, you may end up with error 'Address already in use'.


---

### Access client & server seperately
You may want to individually access the redis client and server, which you can easily get by 
**redis.client** and **redis.server**, respectively.


## Copyright Notice
This package is free to use both commercially and personally without any limitations. However, the author shall not be liable for any damage occured during usage of this software.

['redis-server'](https://www.npmjs.com/package/redis-server) and ['redis'](https://www.npmjs.com/package/redis) packages are fully owned by their own authors(whose links are provided with the hyperlinks) and not me.

