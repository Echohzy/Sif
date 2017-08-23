'use strict';

SIF.define("javascripts/Observer", function(){
  var Observer = (function(){
    var _message = {};
    return {
      register: function(type, fn){
        if(_message[type]){
          _message[type].push(fn);
        }else{
          _message[type] = [fn];
        }
      },
      fire: function(type){
        if(_message[type&&SIF.isArray(_message[type]){
          for(var i=0,len=_message[type].length; i<len; i++){
            _message[type][i].apply(this, arguments.slice(1));
          }
        }
      },
      remove: function(type, fn){
        if(_message[type]&&SIF.isArray(_message[type])){
          for(var i=_message[type]-1;i>=0;i-){
            if(_message[type][i]===fn){
              _message[type].splice(i,1);
            }
          }
        }
      }
    }
  })();
});