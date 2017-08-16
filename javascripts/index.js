SIF.require(["javascripts/Promise", "javascripts/Fetch"], function(Promise, Fetch){
  var promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve("promise1");
    },2000)
  });

  var promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve("promise2");
    },1000);
  });

  Promise.all([promise1, promise2]).then(function(data){
    console.log(data);
  });

 
});