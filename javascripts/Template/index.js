'use strict';

SIF.define("javascripts/Template", function(){
  
  function parse(tpl){
    var code = 'var _code = "";\n';
    var lines = tpl.split("<%");
    for(var i=0,len=lines.length;i<len;i++){
      var pices = lines[i].split("%>");
      for(var j=0,l=pices.length;j<l;j++){
        code += '_code+="'+pices[j].replace(/\n/g,"").replace(/r/g,"")+'";\n';
      }
    }
    return code;
    
  }

  function compile(tpl, data){
    var header = '(function(){\n'+
    'var str = ""'+
    'for(var key in data){'+
    'str+="var "+ key + "="+ data[key]+";"'+
    '}\neval(str)';
    var footer = '\n})(tpl)';
    var mainCode = parse(tpl);
    return new Function("tpl", header+mainCode+footer);
  }


  function template(tpl, data){
    var Render = compile(tpl);
    Render(tpl);
  }


  return template;
});