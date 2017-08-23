SIF.require(["javascripts/Promise", "javascripts/Fetch"], function(Promise, Fetch){
  var promise = new Promise(function(resolve, reject){
    setTimeout(function(){resolve("success")},2000);
  });
  promise.then((data)=>{
    console.log("then1"+data);
    return data;
  }).then(data=>{
    console.log("then2"+data);
    return promise
  }).then((data)=>{
    console.log("then3"+data);
  });

 
});