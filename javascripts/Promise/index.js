'use strict';

SIF.define("javascripts/Promise", function(){
  var STATUS = {
    PENDING: 0,
    RESOLVED: 1,
    REJECTED: 2
  };
  function EMPTY(){}
  
  function evalResolver(self, then){
    var called = false;
    
    try{
      then(function(value){
        if(called){
            return
        }
        called = true;
        resolve(self, value);
      }, function(error){
        if(called){
          return
        }
        called = true;
        reject(self, error)
      });
    }catch(error){
      if(called){
        return;
      }
      called = true;
      reject(self, error);
    }
  }

  function getThen(value){
    var then = value&&value.then;
    if(SIF.isFunction(then)){
      return function(){
        then.apply(value, arguments);
      }
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
    var then = getThen(value)
    if(SIF.isFunction(then)){
      evalResolver(self, then);
    }else{
      self.status = STATUS['RESOLVED'];
      self.value = value;
      self.queue.forEach(function(item){
        item.resolveCallback(value);
      });
    }
    return self;
  }

  function unwrap(promise, resolver, value){
    SIF.setImmediate(function(){
      var returnValue;
      try{
        returnValue = resolver(value);
      }catch(error){
        return reject(promise, error);
      }

      if(returnValue===promise){
        return;
      }else{
        return resolve(promise, returnValue);
      }
    });
  }

  function promiseQueueItem(promise, onResolved, onRejected){
    this.promise = promise;
    this.resolveCallback = function(value){
      resolve(this.promise, value);
    };

    this.rejectCallback = function(error){
      reject(this.promise, error);
    };

    if(SIF.isFunction(onResolved)){
      this.resolveCallback = function(value){
        unwrap(this.promise, onResolved, value);
      }
    }

    if(SIF.isFunction(onRejected)){
      this.rejectCallback = function(error){
        unwrap(this.promise, onRejected, error);
      }
    }
  }
  
  
  var Promise = function(resolver){
    if(!SIF.isFunction(resolver)){
      throw new TypeError("resolver must be function");
    }
    this.status = STATUS['PENDING'];
    this.queue = [];
    this.value = void 0;
    
    if(resolver!==EMPTY){
      evalResolver(this, resolver);
    }
  }
  
  Promise.prototype.then = function(onResolved, onRejected){
      if(this.status===STATUS['RESOLVED']&&!SIF.isFunction(onResolved) || this.status===STATUS['REJECTED']&&!SIF.isFunction(onRejected)){
        return this;
      }
      var promise = new Promise(EMPTY);
      if(this.status === STATUS['PENDING']){
        this.queue.push(new promiseQueueItem(promise, onResolved, onRejected));
      }else{
        var resolver = this.status===STATUS['RESOLVED'] ? onResolved : onRejected;
        unwrap(promise, resolver, this.value);
      }
      return promise;
  };
  
  Promise.prototype.catch = function(onRejected){
      this.then(null, onRejected);
  };
  
  Promise.resolve = function(value){
    if(value instanceof this){
      return value;
    }
    var promise = new this(EMPTY);
    return resolve(promise, value);
  };
  
  Promise.reject = function(error){
    var promise = new this(EMPTY);
    return reject(promise, error);
  };
  
  Promise.race = function(iterable){
    var self = this;
    if(!SIF.isArray(iterable)){
      return reject(this, new TypeError("must be an array"));
    }
    var len = iterable.length,
      called = false,
      i=-1;
    if(!len){
      return this.resolve([]);
    }

    var promise = new this(EMPTY);

    function resolver(value){
      self.resolve(value).then(function(response){
        if(!called){
          called = true;
          resolve(promise, value);
        }
      }, function(error){
        if(!called){
          called = true;
          reject(promise, error);
        }
      });
    }

    while(++i<len){
      resolver(iterable[i]);
    }

    return promise;

  };
  
  Promise.all = function(iterable){
    var self = this;

    if(!SIF.isArray(iterable)){
      return this.reject(new TypeError("must be an iterable!"));
    }

    var len = iterable.length,
      resolved = 0,
      called = false,
      values = new Array(len),
      i=-1;
    if(!len){
      return this.resolve([]);
    }

    var promise = new this(EMPTY);

    function allResolved(value, i){
      self.resolve(value).then(function(response){
        values[i] = response;
        resolved++;
        if(resolved===len&&!called){
          called = true;
          resolve(promise, values);
        }
      }, function(error){
        if(!called){
          called = true;
          reject(promise, error);
        }
      });
    }
    while(++i<len){
      allResolved(iterable[i], i);
    }
    return promise;
  };
  
  return Promise;
});