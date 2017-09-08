'use strict';

SIF.define("javascripts/Template", function(){
  
  function parseJs(str){
    var reg = /^=(.*)$/,match;
    if(match=str.match(reg)){
      return match[0];
    }
    return str;
  }
  function parse(tpl){
    var code = 'var _code = "";\n';
    tpl = tpl.replace(/('|")/g, "\$1").replace(/(\n|\r)/g, " ");
    var lines = tpl.split("<%");
    var reg = /^=(.*)$/;
    for(var i=0,len=lines.length;i<len;i++){
      var pices = lines[i].split("%>");
      if(pices.length===1){
        code += '_code+="'+pices[0]+'";\n';
      }else{
        code += parseJs(pices[0])+"\n";
        if(pices[1]){
          code += '_code+="'+pices[1]+'";\n';
        }
      }
    }
    code += 'return _code;';
    return code;
    
  }

  function compile(tpl, data){
    var header = 'var html = (function(data){\n'+
    'var str = "";'+
    'for(var key in data){'+
    'str+="var "+ key + "="+ data[key]+";";'+
    '}\neval(str);';
    var footer = '\n})(data);'+
    'return html;';
    var mainCode = parse(tpl);
    return new Function("data", header+mainCode+footer);
  }


  function template(tpl, data){
    var Render = compile(tpl);
    return Render(data);
  }


  return template;
});