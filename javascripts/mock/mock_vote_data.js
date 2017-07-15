'use strict';
var Random = Mock.Random;
Mock.mock(/\/votes\/[0-9]+?\.json/, "get", function(options){
  var vote_items = JSON.parse(options.url.split("?")[1]).vote_items;
  var result = [];
  for(var i=0, len=vote_items.length; i<len; i++){
    result.push({id: vote_items[i], count: Random.integer(0,20)});
  }
  return {
    status: "success",
    data:{
      vote_items: result
    }
  }
});

Mock.mock(/\/votes\/[0-9]+?\/apply\.json/, "post", function(options){
  return {
    status: "success"
  }
});