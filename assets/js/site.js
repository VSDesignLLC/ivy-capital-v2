/* site.js — 通用行为 (reveal · rails · count-up · nav-tuck · bgop · p-scroll)
   与页面无关，靠 data-attr/class 钩子工作；缺元素自动跳过。 */
(function(){
  /* ---------- reveal ---------- */
  function revealCb(entries, observer){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); observer.unobserve(e.target); } });
  }
  var io = new IntersectionObserver(revealCb, { threshold:0.12, rootMargin:'0px 0px -8% 0px' });
  /* 标题卡 + section 段落：等整条标题横线已进入视口更深一点（约 75% 处）再触发 */
  var ioLate = new IntersectionObserver(revealCb, { threshold:0, rootMargin:'0px 0px -25% 0px' });
  var lateSel = '.sec-anim, .intro[data-reveal], .about__p[data-reveal]';
  var lateSet = new Set(Array.prototype.slice.call(document.querySelectorAll(lateSel)));
  document.querySelectorAll('[data-reveal], .sec-anim').forEach(function(el){
    (lateSet.has(el) ? ioLate : io).observe(el);
  });

  /* full-height side rails fade in on load */
  var rails=document.getElementById('rails'); if(rails) requestAnimationFrame(function(){ rails.classList.add('in'); });

  /* ---------- count-up ---------- */
  function countUp(el){
    var target=parseInt(el.getAttribute('data-count'),10), dur=1400, start=null;
    var ease=function(t){return 1-Math.pow(1-t,3);};
    function step(ts){ if(!start)start=ts; var p=Math.min((ts-start)/dur,1); el.textContent=Math.round(ease(p)*target); if(p<1)requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }
  var statIO=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ countUp(e.target); statIO.unobserve(e.target);} }); },{threshold:0.6});
  if(!matchMedia('(prefers-reduced-motion:reduce)').matches){ document.querySelectorAll('[data-count]').forEach(function(el){ statIO.observe(el); }); }

  /* ---------- nav ---------- */
  var nav=document.getElementById('nav');
  var navLastY=window.scrollY;
  function onScroll(){
    var y=window.scrollY;
    nav.classList.toggle('scrolled', y>40);
    var dy=y-navLastY;
    if(y<8){ nav.classList.remove('tuck'); }            // 回到顶部：始终显示
    else if(dy>4){ nav.classList.add('tuck'); }         // 向下滚：收起
    else if(dy<-4){ nav.classList.remove('tuck'); }     // 向上滚：出现
    navLastY=y;
  }
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

  /* ---------- scroll-driven background video opacity ----------
     每个带 data-bgop 的 section 经过视口中线时，把其值写给 #pagebg。
     图片卡 section 值低(视频淡，凸显图)；breather/空 section 值高(视频 solid，动感)。
     CSS transition 负责平滑过渡。 */
  (function(){
    var bg = document.getElementById('pagebg');
    if(!bg) return;
    var blocks = [].slice.call(document.querySelectorAll('[data-bgop]'));
    if(!blocks.length) return;

    function apply(op){ bg.style.setProperty('--pgop', op); }

    var bgIO = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ apply(e.target.getAttribute('data-bgop')); }
      });
    }, { rootMargin:'-49% 0px -49% 0px', threshold:0 });
    blocks.forEach(function(b){ bgIO.observe(b); });

    // initialise to whichever block already spans the center (top of page → hero=0)
    (function initPick(){
      var mid = window.innerHeight/2, picked=blocks[0];
      blocks.forEach(function(b){ var r=b.getBoundingClientRect(); if(r.top<=mid && r.bottom>=mid) picked=b; });
      apply(picked.getAttribute('data-bgop'));
    })();

    /* pause bg video for reduced-motion */
    if(matchMedia('(prefers-reduced-motion:reduce)').matches){ try{ bg.removeAttribute('autoplay'); bg.pause(); }catch(e){} }
  })();

  /* ---------- P5-K：段落逐行随 scroll 上浮（关于/策略/代表项目/奖项）----------
     单位拆分：每个 CJK 字 = 1 单位，连续 ASCII（如 AI、2007）= 1 单位 → 不破词；
     保留 .b 强调色与 <br>；逐行（按 offsetTop 分组）随 scroll 进度错峰上浮，往回滚沉回。 */
  (function(){
    if(matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    var els=[].slice.call(document.querySelectorAll('.p-scroll, .p-scroll-blur'));
    if(!els.length) return;
    var CJK=/[　-〿㐀-鿿＀-￯]/;
    function splitUnits(el){
      var out=[];
      (function walk(node){
        Array.prototype.slice.call(node.childNodes).forEach(function(n){
          if(n.nodeType===3){
            var t=n.textContent, frag=document.createDocumentFragment(), i=0;
            while(i<t.length){
              var c=t[i];
              if(/\s/.test(c)){ frag.appendChild(document.createTextNode(c)); i++; continue; }
              var unit;
              if(CJK.test(c)){ unit=c; i++; }
              else { unit=''; while(i<t.length && !/\s/.test(t[i]) && !CJK.test(t[i])){ unit+=t[i]; i++; } }
              var s=document.createElement('span'); s.className='u'; s.textContent=unit;
              frag.appendChild(s); out.push(s);
            }
            node.replaceChild(frag,n);
          } else if(n.nodeType===1){ if(n.tagName==='BR') return; walk(n); }
        });
      })(el);
      return out;
    }
    function assignLines(p){
      var curTop=null, li=-1;
      p._units.forEach(function(u){
        var tp=Math.round(u.getBoundingClientRect().top);
        if(curTop===null || Math.abs(tp-curTop)>3){ li++; curTop=tp; }
        u._li=li;
      });
      p._lines=li+1;
    }
    function clamp01(x){ return x<0?0:(x>1?1:x); }
    function update(){
      var vh=window.innerHeight;
      els.forEach(function(p){
        if(!p._units) return;
        var top=p.getBoundingClientRect().top;
        var g=clamp01((vh*0.95 - top)/(vh*0.95 - vh*0.42));   // top 从 95%vh 升到 42%vh → 0→1
        var n=p._lines, st=n>1?0.45/(n-1):0, dur=1-st*(n-1), blur=p.classList.contains('p-scroll-blur');
        p._units.forEach(function(u){
          var pi=clamp01(dur>0?(g-u._li*st)/dur:g), e=1-Math.pow(1-pi,3);
          u.style.opacity=e.toFixed(3);
          u.style.transform='translateY('+((1-e)*20).toFixed(2)+'px)';
          if(blur) u.style.filter='blur('+((1-e)*6).toFixed(2)+'px)';
        });
      });
    }
    function setup(){ els.forEach(function(p){ p._units=splitUnits(p); assignLines(p); }); update(); }
    var ticking=false;
    window.addEventListener('scroll', function(){ if(!ticking){ ticking=true; requestAnimationFrame(function(){ update(); ticking=false; }); } }, {passive:true});
    window.addEventListener('resize', function(){ els.forEach(function(p){ if(p._units) assignLines(p); }); requestAnimationFrame(update); }, {passive:true});
    if(document.fonts && document.fonts.ready){ document.fonts.ready.then(setup); } else { window.addEventListener('load', setup); }
  })();
})();
