'use strict';

SIF.define("Promise", function(){
  var STATUS = {
    PENDING: 0,
    FULFILLED: 1,
    REJECTED: 2
  };
  function EMPTY(){}
  
  function evalResolver(self, then){
    var called = true;
    
    try{
      then(function(value){
        if(called){return}
        called = true;
        resolve(self, value);
      }, function(error){
        if(called){
          return
        }
        called = true;
        reject(self, error)
      })
    }catch(error){
      if(called){
        return;
      }
      called = true;
      reject(self, error);
    }
  }
  
  function reject(self, error){
    self.status = STATUS['REJECTED'];
    self.value = error;
    self.queue.forEach(function(item){
      item.rejectCallback(error);
    });
    return self;
  }
  
  function resolve(self, value){
    self.status = STATUS['RESOLVED'];
    self.value = value;
    self.queue.forEach(function(item){
      item.resolveCallback(value);
    });
    return self;
  }
  
  
  var Promise = function(resolver){
    if(!SIF.isFunction(resolver)){
      throw new TypeError("resolver must be function");
    }
    this.status = STATUS['PENDING'];
    this.queue = [];
    this.value = void 0;
    
    if(resolver!==EMPTY){
      
    }
    
  }
  
  Promise.prototype.then = function(){
    
  };
  
  Promise.prototype.catch = function(){
    
  };
  
  Promise.resolve = function(){
    
  };
  
  Promise.reject = function(){
    
  };
  
  Promise.race = function(){
    
  };
  
  Promise.all = function(){
    
  }
});