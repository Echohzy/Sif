

var SIF = (function(undefined){
  var host = this

  var S = {

    version: "1.0.0",

    Env:{

      host: host,

      mods: {}

    }

  }

  return S;

})();

(function(S, undefined){

  var TRUE = true,
    toString  = Object.prototype.toString,
    types = ["Function", "String", "Array", "RegExp", "Object", "Undefined", "Null", "Number"];

  (function(){
    var i=0,
      len=types.length;

    for(;i<len;i++){
      mix(S, {
        ["is" + types[i]] : (function(j){
          return function(o){
            return toString.call(o) === "[object " + types[j] + "]";
          }
        })(i)
      });
    }
  })()

  mix(S, {

    keys: Object.keys || function (o){
      var results = [], key;

      for(key in o){
        if(o.hasOwnPrototype(key)){
          results.push(key);
        }
      }

      return results;
    },

    mix: function(r, s, ov){
      if(!r || !s){
        return
      }

      if(S.isUndefined(ov)){
        ov = TRUE;
      }
      mixInternal(r, s, ov);
    }
  });

  function mix (r, s) {
    for(var key in s){
      r[key] = s[key]
    }
  }

  function mixInternal(r, s, ov){
    var keys = S.keys(s);
    for(var i=0, len=keys.length; i<len; i++){
      var p = keys[i];
      _mix(p, r, s, ov);
    }
  }

  function _mix(p, r, s, ov) {
    if(ov || !(p in r)){
      var target = r[p],
        src = s[p];
      if(S.isArray(src) || S.isObject(src)){
        var clone = target ? target : (S.isArray(src)?[]:{});
        r[p] = clone;
        mixInternal(clone, src, ov);
      }else{
        r[p] = src;
      }
    }
  }

})(SIF);

(function(S, undefined){
  var win = S.Env.host,
      navigator = win.navigator,
      ua = navigator.userAgent || "";
      
  function toNumber(str){
    var count = 0;
    str.replace(/\./g, function(){
      count++;
      return count===1?".":"";
    });
    return parseFloat(str);
  }
  
  S.mix(S,{
    UA:{
      shell: undefined,
      os: undefined,
      core: undefined
    }
  });
  
  
  
  
  
})(SIF)






