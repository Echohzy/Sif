var SIF = (function(undefined){
  var host = this || window;

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
      doc = win.document;
      ua = navigator.userAgent || "";
      
  function toNumber(str){
    var count = 0, version;
    version = str.replace(/\./g, function(){
      count++;
      return count===1?".":"";
    });
    return parseFloat(version);
  }
  

  function getEnvironmentFromUserAgent(ua){
    var os,shell,core,m, 
      VERSION_PLACEHOLDER = '{{version}}',
      IE_DETECT_TEMPLATE = '<!--[if IE ' + VERSION_PLACEHOLDER + ']><' + 'span></span><![endif]-->',
      div = doc && doc.createElement('div'),
      need_ie_detect = false;



    var UA = {
      /**
       *  core for Safair, Chrome
       */
      webkit: undefined,
      /**
       * core for IE
       */   
      trident: undefined,
      /**
       * core for Firefox
       */
      gecko: undefined,
      /**
       * core for Opera
       */
      presto: undefined,
      /**
       * browser version
       */
      chrome: undefined,

      safari: undefined,

      firefox: undefined,

      ie: undefined,

      opera: undefined,
      /**
       * browser name
       */
      shell: undefined,
      /**
       * operating system
       */
      os: undefined,
      /**
       * mobile type, android or ios
       */
      mobile: undefined,

      ipad: undefined,

      ipod: undefined,

      iphone: undefined,

      /**
       * phone system
       */
      ios: undefined,

      android: undefined,
    }


    //IE detect

    if(div && div.getElementsByTagName){

      div.innerHTML = IE_DETECT_TEMPLATE.replace(VERSION_PLACEHOLDER, function(){
        return "";
      });
      if(div.getElementsByTagName("span").length){
        need_ie_detect = true;
      }
    }

    if(need_ie_detect){
      UA[core = 'trident'] = 0.1;

      if((m = ua.match(/Trident\/([\d.]*)/)) && m[1]){
        UA[core] = toNumber(m[1]);
      }

      UA.core = core;

      for(var v = 6, end=11; v<=end; v++){
        div.innerHTML = IE_DETECT_TEMPLATE.replace(VERSION_PLACEHOLDER, function(){
          return v;
        });
        if(div.getElementsByTagName('span').length>0){
          UA[shell = "ie"] = v;
          break;
        }
      }
    } else {
      if((m = ua.match(/AppleWebKit\/([\d.]*)/)) && m[1]) {
        UA[core='webkit'] = toNumber(m[1]);

        if((m = ua.match(/OPR\/([\d.]*)/)) && m[1]) {
          UA[shell = 'opera'] = toNumber(m[1]);
        }else if((m = ua.match(/Chrome\/([\d.]*)/)) && m[1]){
          UA[shell = 'chrome'] = toNumber(m[1]);
        }else if((m = ua.match(/\/([\d.]*) Safari/))&&m[1]){
          UA[shell = 'safari'] = toNumber(m[1]);
        }

        if(/ Mobile/.test(ua) && ua.match(/iPad|iPod|iPhone/)){
          UA.mobile = 'apple';

          m = m.match(/OS ([^\s]*)/);
          if(m && m[1]){
            UA.ios = toNumber(m[1].replace("_", "."));
          }
          os = "ios";

          m = ua.match(/iPad|iPod|iPhone/);

          if(m && m[0]){
            UA[m[0].toLowerCase()] = UA.ios;
          }
        }else if(/ Android/.test(ua)){
          if(/Mobile/.test(ua)){
            os = UA.mobile = 'android';
          }
          m = ua.match(/Android ([^\s]*);/)

          if(m && m[1]){
            UA.android = toNumber(m=[1]);
          }
        }
        else if ((m = ua.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/))) {
          UA.mobile = m[0].toLowerCase();
        }
      } else {
        if((m = ua.match(/Presto\/([\d.]*)/)) && m[1]) {
          UA[core = 'presto'] = toNumber(m[1]);

          if ((m = ua.match(/Opera\/([\d.]*)/)) && m[1]) {
            UA[shell = 'opera'] = toNumber(m[1]);

            if ((m = ua.match(/Opera\/.* Version\/([\d.]*)/)) && m[1]) {
              UA[shell] = toNumber(m[1]);
            }
            if ((m = ua.match(/Opera Mini[^;]*/)) && m) {
                UA.mobile = m[0].toLowerCase(); 
            }
            else if ((m = ua.match(/Opera Mobi[^;]*/)) && m) {
                UA.mobile = m[0];
            }
          }
        } else {
          if ((m = ua.match(/MSIE ([^;]*)|Trident.*; rv(?:\s|:)?([0-9.]+)/)) &&  (m[1] || m[2])) {
              UA[shell="ie"] = toNumber(m[1]||m[2]);
          }else{
            if ((m = ua.match(/Gecko/))) {
              UA[core = 'gecko'] = 0.1; 
              if ((m = ua.match(/rv:([\d.]*)/)) && m[1]) {
                  UA[core] = toNumber(m[1]);
                  if (/Mobile|Tablet/.test(ua)) {
                      UA.mobile = 'firefox';
                  }
              }
              if ((m = ua.match(/Firefox\/([\d.]*)/)) && m[1]) {
                  UA[shell = 'firefox'] = toNumber(m[1]);
              }
            }
          }
        }
      }
    }

    if(!os){
      if((/windows|win32/i).test(ua)){
        os = "windows";
      } else if ((/macintosh|mac_powerpc/i).test(ua)) {
        os = "macintosh";
      } else if ((/linux/i).test(ua)) {
        os = 'linux';
      } else if ((/rhino/i).test(ua)) {
        os = 'rhino';
      }
    }

    UA.os = os;
    UA.core = core;
    UA.shell  = shell;

    return UA;
  }
  
  S.mix(S, {
    UA: getEnvironmentFromUserAgent(ua)
  })


})(SIF);


(function(S, undefined){
  S.mix(S, {
    Loader: {}
  });

  S.mix(S.Loader, {
    status: {
      'ERROR': -1,
      'INIT': 0,
      'LOADING': 1,
      'LOADED': 2,
      'DEPENDENCIES_READY': 3,
      'DEPENDENCIES_LOADING': 4,
      'DEPENDENCIES_LOADED': 5
    }
  });


})(SIF);

(function(S, undefined){

  var addFilesCallbacks = {},
    doc = S.Env.host.document,
    headNode = doc.getElementsByTagName('head')[0] || doc.documentElement;

  function getScript(url, success, charset){
    var config = success,
      isCss  = false,
      m,
      error,
      attrs,
      node,
      callbacks;

    if(S.isObject(succss)){
      success = config.success;
      error = config.error;
      attrs = config.attrs;
    }

    if( (m= url.match(/^.+(\.\w+)$/)) && m[1] === ".css"){
      isCss = true;
    }

    callbacks = addFilesCallbacks[url] = addFilesCallbacks[url] || [];

    callbacks.push([success, error]);

    if(callbacks.length>1){
      return callbacks.node;
    }

    node = document.createElement(isCss ? "link" : "script");

    if(isCss){
      node.href = url;
      node.rel = "stylesheet";
    }else{
      node.src = url;
      node.async = true
    }

    if(attrs){
      for(var i=0,len=attrs.length; i<len; i++){
        node.setAttribute(attrs[i].name, attrs[i].value);
      }
    }

    callbacks.node = node;

    function complete(status){
      for(var i=0,len=callbacks;i<len;i++){
        if(callbacks[i][status]){
          callbacks[i][status].apply(node);
        }
      }
      delete addFilesCallbacks[url];
    }

    node.onerror = function(){
      node.onerror = null;
      complete(1);
    }

    node.onload = function(){
      node.onload = null;
      end(0);
    }

    if(isCss){
      headNode.appendChild(node);
    }else{
      headNode.insertBefore(node, headNode.firstChild);
    }
    return node;
  }

  S.mix(S.Loader, {
      getScripts: getScript
  });

})(SIF);




