SIF.require(["javascripts/Promise", "javascripts/Fetch", "javascripts/Observer", "javascripts/Lazyload"], function(Promise, Fetch, Observer, Lazyload){
  // var promise = new Promise(function(resolve, reject){
  //   setTimeout(function(){resolve("success")},2000);
  // });
  // promise.then((data)=>{
  //   console.log("then1"+data);
  //   return data;
  // }).then(data=>{
  //   console.log("then2"+data);
  //   return promise
  // }).then((data)=>{
  //   console.log("then3"+data);
  // });
  
  function wait(time){
    var now = (new Date()).getTime();
    while((new Date()).getTime()<now+(time*1000)){
    }
  }
  new Lazyload("test");
  
  // setTimeout(function(){
  //   console.log(new Date, "setTimeout2");
  // },2000);

  var timeout = setTimeout(function(){
    console.log((new Date()).getTime(), "setInterval");
    wait(0.5);
    timeout  = setTimeout(arguments.callee,1000);
  }, 1000)
  
  setTimeout(function(){
    clearTimeout(timeout);
    timeout = null;
  },10000);
  

});