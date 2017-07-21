'use strict';


$(document).ready(function(){
  var activity = new Vote({
    activityId: 12,
    initialData: {
      "1": {id: 1, target: ".vote-result-1", button: ".vote-button-1", count: 0},
      "2": {id: 2, target: ".vote-result-2", button: ".vote-button-2", count: 0}
    },
    getDetailSuccess: function(data){
      console.log("Get detail!");
    },
    getDetailError: function(xhr){
      console.log("Get detail error!");
    },
    voteSuccess: function(data){
      console.log("Vote success");
    },
    voteError: function(xhr){
      console.log("Vote error");
    }
  });

  KISSY.use("button", function(S, Button){
    var b = new Button({
        content: "我是类Google按钮1",
        render: "#vote-submit",
        tooltip: "点击我有惊喜~"
    });
    b.render();
  });

  function getRequiresFromFn(fn) {
      var requires = [];
      // Remove comments from the callback string,
      // look for require calls, and pull them into the dependencies,
      // but only if there are function args.
      fn.toString()
          .replace(commentRegExp, '')
          .replace(requireRegExp, function (match, dep) {
              requires.push(getRequireVal(dep));
          });
      return requires;
  }
  var commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,
        requireRegExp = /[^.'"]\s*require\s*\(([^)]+)\)/g;

  function getRequireVal(str) {
      var m;
      // simple string
      if (!(m = str.match(/^\s*["']([^'"\s]+)["']\s*$/))) {
          S.error('can not find required mod in require call: ' + str);
      }
      return  m[1];
  }

  function test(){}

});