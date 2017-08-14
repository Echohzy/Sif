SIF.require(["javascripts/Promise"], function(Promise){
  var promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve("promise1");
    }, 1000)
  }).then(function(data){return data+"ext"});
  var promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve("jajaja")
    }, 2000)
  });

  Promise.race([promise1, promise2]).then(function(data){
    console.log(data+" is winner");
  });
});