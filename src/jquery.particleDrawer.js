/*
 *jquery.particleDrawer
 *
 *Copyright 2014, takama okazaki
 *Licensed under the MIT license.
 *
 *Original Script is:
 *http://jsdo.it/hide1/fWqL
 */

;(function($){
  var RATIO = 6,
      COLOR = "rgba(0, 255, 0, 0.5)",
      FONT = "24px 'Times New Roman'",
      ALIGN = "center",
      BASELINE = "middle";

  var ParticleManager = function(){
    this._init();
    return this;
  };
  ParticleManager.prototype = {
    _init: function(){
      this.first = null;
      this.old = null;
    },

    addParticle: function(particle){
      if(!this.first) this.first = this.old = particle;
      else{
        this.old.next = particle;
        this.old = particle;
      }
    },

    removeAllParticle: function(){
      var node = this.first;
      if(!node) return;

      var delNode = null;

      do{
        delNode = node.next;
        delete node;
        if(!delNode) break;
      }while(node = delNode.next);

      this.first = null;
      this.old = null;
    },

    getFirstParticle: function(){
      return this.first;
    }
  };

  var Particle = function(x, y){
    this.x = x;
    this.y = y;
  };

  var ParticleDrawer = function(canvas, options){
    this._init(canvas, options);
    return this;
  };
  ParticleDrawer.prototype = {
    _init: function(canvas, options){
      this.canvas = canvas;
      this.options = options;
      this.ctx = canvas.getContext("2d");
      this.ctx.particleManager = new ParticleManager();
      this.canvasColor = [0, 0, 0, 0];

      if(options.webfont) this.webFontLoaded();
      else this.textToParticleText();
    },

    webFontLoaded: function(){
      var cv1 = this.canvas, cv2 = cv1.cloneNode(false);
      var ctx1 = this.ctx, ctx2 = cv2.getContext("2d");
      var text = "loaded test of webfont";

      ctx1.font = "30px '"+ this.options.webfont + "', serif";
      ctx2.font = "30px serif";

      var self = this;
      var interval_id = setInterval(function(){
        var tm1 = ctx1.measureText(text);
        var tm2 = ctx2.measureText(text);

        if(tm1.width != tm2.width){
          clearInterval(interval_id);
          self.textToParticleText();
        }
      }, 10);
    },

    textToParticleText: function(){
      this.ctx.particleManager.removeAllParticle();
      this.stopParticleDraw();
      this.clearCanvas();

      this.drawText();
      var onIsDrawListener = function(m){
        m.ctx.fillStyle = "rgb(255, 255, 255)";
        m.ctx.fillRect(m.x, m.y, 1, 1);
        this.ctx.particleManager.addParticle(new Particle(m.x, m.y));
      };
      this.getDrawPosition(onIsDrawListener);

      this.setDrawTimer(40);
      this.startParticleDraw();
    },

    getTextAlign: function(){
      var x;

      switch(this.options.align){
        case "left": x = 0;break;
        case "center": x = (this.canvas.width/2)/this.options.ratio;break;
        case "right": x = this.canvas.width/this.options.ratio;break;
        default: x = (this.canvas.width/2)/this.options.ratio;break;
      }

      return x;
    },

    getBaseline: function(h){
      var y;

      switch(this.options.baseline){
        case "top": y = 0;break;
        case "middle": y = (this.canvas.height/2)/this.options.ratio;break;
        case "bottom": y = this.canvas.height/this.options.ratio;break;
        default: y = (this.canvas.height/2)/this.options.ratio;break;
      }

      return y;
    },

    drawText: function(){
      this.clearCanvas();

      this.ctx.font= this.options.font;
      this.ctx.fillStyle = "rgb(0, 0, 0)";
      this.ctx.textAlign = this.options.align;
      this.ctx.textBaseline = this.options.baseline;
      this.ctx.fillText(this.options.text, this.getTextAlign(), this.getBaseline());
    },

    _isDrawCanvas: function(px, i){
      var alpha = 3;
      if(px[i+alpha]!=this.canvasColor[alpha]) return true;

      return false;
    },

    getDrawPosition: function(listener){
      if(!listener) return;
      var imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

      for(var x=0; x<this.canvas.width; x++){
        for(var y=0; y<this.canvas.height; y++){
          var i = (x+y*this.canvas.width)*4;

          if(this._isDrawCanvas(imageData.data, i)) listener.call(this, {ctx: this.ctx, x: x, y: y});
        }
      }
    },

    setDrawTimer: function(msec){
      this.drawTextTimer = msec;
    },

    startParticleDraw: function(){
      var self = this;

      this.ctx.drawTextId = setInterval(function(){
        return function(){
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.ctx.font = "10px Arial";
          this.ctx.fillStyle = this.options.color;

          var node = this.ctx.particleManager.getFirstParticle();
          if(!node) return;

          do{
            this.ctx.fillText(String.fromCharCode(Math.round(Math.random()*42+48)),
                              node.x*this.options.ratio, node.y*this.options.ratio);
          }while(node = node.next);
        }.call(self);
      }, this.drawTextTimer);
    },

    stopParticleDraw: function(){
      clearInterval(this.ctx.drawTextId);
    },

    clearCanvas: function(){
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  };

  $.fn.particleDrawer = function(){
    var canvas = this[0], options = {};
    var arg = arguments;

    if(arg.length>1){
      options.text = typeof arg[0]==="string" ? arg[0] : "";

      options.ratio = arg[1].ratio ? arg[1].ratio : RATIO;
      options.color = arg[1].color ? arg[1].color : COLOR;
      options.font = arg[1].font ? arg[1].font : FONT;
      options.align = arg[1].align ? arg[1].align : ALIGN;
      options.baseline = arg[1].baseline ? arg[1].baseline : BASELINE;
      options.webfont = typeof arg[1].webfont==="string" ? arg[1].webfont : false;

    }else if(typeof arg[0]==="object"){
      options.text = typeof arg[0].text==="string" ? arg[0].text : "";

      options.ratio = arg[0].ratio ? arg[0].ratio : RATIO;
      options.color = arg[0].color ? arg[0].color : COLOR;
      options.font = arg[0].font ? arg[0].font : FONT;
      options.align = arg[0].align ? arg[0].align : ALIGN;
      options.baseline = arg[0].baseline ? arg[0].baseline : BASELINE;
      options.webfont = typeof arg[0].webfont==="string" ? arg[0].webfont : false;

    }else{
      options.text = typeof arg[0]==="string" ? arg[0] : "";

      options.ratio = RATIO;
      options.color = COLOR;
      options.font = FONT;
      options.align = ALIGN;
      options.baseline = BASELINE;
      options.webfont = false;
    }

    var pd =  new ParticleDrawer(canvas, options);
    return this;
  };
})(jQuery);