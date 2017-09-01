SIF.define("javascripts/Lazyload", function(){
  var addEventListener = SIF.Env.host&&SIF.Env.host.addEventListener,
    removeEventListener = SIF.Env.host&&SIF.Env.host.removeEventListener,
    STATUS = {
      "ERROR":-1,
      "INIT": 0,
      "LOADING": 1,
      "LOADED": 2,
    },
    tmpCheckImages;


  function Lazyload(className){
    if(!SIF.isString(className) || !document.getElementsByClassName||!addEventListener){
      return;
    }
    this.images = SIF.toArray(document.getElementsByClassName(className));
    this.complete_count = 0;
    this.init();
  }
  Lazyload.prototype.init = function(){
    this.images.forEach(function(el){
      el.status = STATUS['INIT'];
      el.totalOffsetTop = getOffsetTop(el);
    });
    tmpCheckImages = this.checkImages.bind(this);
    addEventListener('scroll', tmpCheckImages, true);
    addEventListener('resize', tmpCheckImages, true);
  };

  Lazyload.prototype.cancel = function(){
    removeEventListener('scroll', tmpCheckImages, true);
    removeEventListener('resize', tmpCheckImages, true);
  }
  Lazyload.prototype.checkImages = SIF.debounce(function(){
    var that = this,
      currentViewportTop = getViewportTop();

      this.images.forEach(function(item){
        if(item.status === STATUS['INIT']){
          if(item.totalOffsetTop<currentViewportTop){
            item.status = STATUS['LOADING'];
            item.src = item.getAttribute("data-src");

            item.onload = function(){
              item.status = STATUS['LOADED'];
              item.className += " loaded";
              that.complete_count++;
              if(that.complete_count===that.images.length){
                that.cancel();
              }
            };

            item.onerror = function(){
              item.status = STATUS['ERROR'];
            };
          }
        }
      });
  }, 500);

  function getOffsetTop(element){
    var offsetTop = element.offsetTop,
      current = element.offsetParent;

    while(current){
      offsetTop += current.offsetTop;
      current = current.offsetParent;
    }

    return offsetTop;
  }

  function getViewportTop(){
    return window.innerHeight + document.body.scrollTop;
  }


  return Lazyload;
});