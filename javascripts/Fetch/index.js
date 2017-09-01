'use strict';

SIF.define("javascripts/Fetch", ["javascripts/Promise"], function(Promise){

  function fetch(url, config){
    console.log(arguments);
    config = config||{};
    return new Promise(function (resolve, reject){
      var client = new XMLHttpRequest();
      client.open(config.type||"GET", url);
      client.onreadystatechange = function(){
        if(this.readyState !== 4){
          return;
        }
        if(this.status===200){
          resolve(this.response);
        }else{
          reject(new Error(this.statusText));
        }
      };
      console.log(client);
      client.responseType = "json";
      client.setRequestHeader("Accept", "application/json");  
      client.send(config.data||{});
    });
  }

  return fetch;
});