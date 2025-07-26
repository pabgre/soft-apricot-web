(function() {
  
var set = function(x, opts) {
    var _pt = [{
      x: 0,
      y: 0
    }, {
      x: 0,
      y: 0
    }, {
      x: 0,
      y: 0
    }];
    var rnd1 = [Math.random() + 1, Math.random() + 1, Math.random() + 1];
    var rnd2 = [0, 0, 0];
    var cnt = 0;
    var arr = [];
    var loop = null;
    var t = null;
    var _h = opts._h;
    var _w = opts._w;
    var hover_target = opts.hover_target
    var img = opts.img;
    var mshov = false;

    x.css({
      position: "relative"
    });

    for (var i = 0; i < _h; i++) {
      var pos = -i + "px";
      x.append("<div></div>");
      x.find("div").eq(i).css({
        backgroundImage: "url(" + img + ")",
        backgroundPosition: "0px " + pos,
        height: "1px",
        width: "100%",
        position: "absolute",
        top: i + "px",
        backgroundSize: "cover"
      });
      arr.push(x.find("div").eq(i));
    }

    if (opts.auto) {
      t = setInterval(function() {
        if (mshov) return;
        go();

        setTimeout(pause, opts.delay / 2 * Math.random());
      }, opts.delay);
    }

    hover_target.mouseover(go);
    hover_target.mouseout(pause);

    function go() {        
      mshov = true;
      clearInterval(loop);
      loop = setInterval(run, 30);
    }

    function pause() {
      mshov = false;
      clearInterval(loop);
      loop = null;

      for (var i = 0; i < _h; i++) {
        arr[i].css({
          left: 0
        });
      }
    }

    function run() {
      var i;
      for (i = 0; i < 3; i++) {
        if (rnd1[i] >= 1) {
          --rnd1[i];
          rnd2[i] = Math.random() / 4 + 0.03;
        }
        rnd1[i] += rnd2[i];
        cnt += (38 - cnt) * 0.25;
        _pt[i].x = Math.ceil(Math.sin(rnd1[i] * Math.PI * 2) * rnd2[i] * cnt * 2);
        _pt[i].y = 0;
      }
      var num = (Math.abs(_pt[0].x) + Math.abs(_pt[1].x) + Math.abs(_pt[2].x) + 8) / 4;

      i = _h;
      while (i -= 1) {
        var _off = Math.sin(i / _h * Math.PI * (Math.random() / 8 + 1)) * 0.8 * num * num;
        arr[i].css({
          left: _off + "px "
        });
      }
    }
  };

  jQuery.fn.noisy = function(opts) {
    this.each(function() {
      opts = jQuery.extend({}, jQuery.fn.noisy.defs, opts);
      set(jQuery(this), opts);
    });
  };

})();


$(function() {
  $("#img").noisy({
    _w: 1920,
    _h: 1080,
    img: "src/3soft_apricot_trans100.png",
    hover_target: $("#hover-target")
  });
});




