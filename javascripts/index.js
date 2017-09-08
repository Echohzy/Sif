
SIF.require(["javascripts/Promise", "javascripts/Fetch", "javascripts/Observer", "javascripts/Lazyload", "javascripts/Template"], function(Promise, Fetch, Observer, Lazyload, Template){
  
  var t = Template(document.getElementById("template").innerHTML,{});
  console.log(t);
 
});