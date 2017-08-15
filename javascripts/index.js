SIF.require(["javascripts/Promise", "javascripts/Fetch"], function(Promise, Fetch){
  // var promise1 = new Promise(function(resolve, reject){
  //   setTimeout(function(){
  //     reject("promise1");
  //   },2000)
  // }, "promise1");

  // var promise2 = new Promise(function(resolve, reject){
  //   setTimeout(function(){
  //     resolve("promise2");
  //   },1000)
  // }, "promise2");

  // Promise.reject().then(null,() => promise1).then(null, function(error){console.log(error);return error;}).then(()=>promise2, function(error){console.log(error);return error;}).then(text=>console.log(text), function(error){console.log(error);return error}).catch(function(error){console.log(error);});

  setTimeout(function () {
    console.log('three');
  }, 0);

  Promise.resolve().then(function () {
    console.log('two');
  });

  console.log('one');
});