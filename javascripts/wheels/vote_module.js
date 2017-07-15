'use strict';

var Vote = function(options){
  this.initial(options);
  this.render();
  this.bindEventToButton();
};

Vote.prototype.initial = function(options){
  if(!options){ return }
  this.voteData = options.initialData;
  this.activityId = options.activityId;
  this.fetchVoteDetail();
};

Vote.prototype.render = function(){
  for(var key in this.voteData){
    this.renderNode(this.voteData[key]);
  }
};

Vote.prototype.renderNode = function(data){
  if(!data||!data.target) return;
  var target = data.target +"";
  var node = document.querySelector(target);
  if(!node) return;
  node.innerHTML = data.count;
};

Vote.prototype.onVote = function(data){
  if(!data||!data.id||!this.voteData[data.id]){return;} 
  // this.voteData[data.id].count += 1;
  this.submitVoteResult([data.id]);
};

Vote.prototype.bindEventToButton = function(){
  for(var key in this.voteData){
    var voteObj = this.voteData[key];
    var node = document.querySelector(voteObj.button);
    if(!node) continue;
    node.addEventListener?node.addEventListener("click", this.onVote.bind(this, voteObj)): node.onclick = this.onVote.bind(this, voteObj);
  }
};

Vote.prototype.fetchVoteDetail = function(){
  var items = [];
  for(var key in this.voteData){
    items.push(key);
  }
  $.ajax({
    url: "/votes/"+this.activityId+".json",
    type: "get",
    dataType: "json",
    context: this,
    data:JSON.stringify({vote_items: items}),
    success: function(res){
      if(res.status === "success"){
        var vote_items = res.data.vote_items;
        for(var i=0, len=vote_items.length; i<len; i++){
          this.voteData[vote_items[i].id].count = vote_items[i].count;
        }
        this.render();
      }
    },
    error: function(){

    }
  });
};

Vote.prototype.submitVoteResult = function(items){
  $.ajax({
    url: "/votes/" + this.activityId + "/apply.json",
    type: "post",
    dataType: "json",
    context: this,
    data: JSON.stringify({vote_items: items}),
    success: function(res){
      if(res.status === "success"){
        for(var i=0,len=items.length; i<len; i++){
          if(this.voteData[items[i]]){
            this.voteData[items[i]].count+=1;
          }
        }
        this.render();
      }
    },
    error: function(){
      
    }
  });
}



