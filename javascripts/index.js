SIF.require(["javascripts/Promise"], function(Promise){
  var promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve("promise1");
      console.log("1");
    },2000)
  });

  var promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve("promise2");
      console.log("2")
    },1000)
  });

  Promise.resolve().then(() => promise1).then(text => console.log(text)).then(()=>promise2).then(text=>console.log(text));
});