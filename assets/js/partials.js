/* partials.js — 站点公共结构 (nav/footer) 单一来源。
   页面写 <site-nav></site-nav> / <site-footer></site-footer> 即注入。
   在 <head> 同步加载：解析到自定义元素即时升级注入。 */
(function(){
  var NAV = "  <nav class=\"nav glass-ring\" id=\"nav\">\n    <div class=\"nav__logo\"><a href=\"homepage-ch.html\"><img src=\"assets/logo.png\" alt=\"Ivy Capital 常春藤资本\" /></a></div>\n    <div class=\"nav__links\">\n      <a href=\"about-ch.html\" data-nav=\"about\">关于我们</a><a href=\"team-ch.html\" data-nav=\"team\">团队</a>\n      <a href=\"portfolio-ch.html\" data-nav=\"portfolio\">被投企业</a><a href=\"news-ch.html\" data-nav=\"news\">最新动态</a>\n    </div>\n    <div class=\"nav__lang\"><span class=\"z\">中</span><span class=\"sep\">·</span><span class=\"en\">EN</span></div>\n  </nav>";
  var FOOTER = "  <footer class=\"footer\" data-bgop=\"0.08\">\n    <div class=\"footer__rule top\"></div>\n    <div class=\"footer__bg\"><img src=\"assets/footer-bg.jpg\" alt=\"\" /></div>\n    <div class=\"footer__inner\">\n      <div class=\"footer__top\">\n        <div class=\"footer__left\">\n          <div class=\"footer__slogan\" data-reveal>一家以人为本的深科技投资机构，<br>与你共生、共韧、长青。</div>\n          <div class=\"footer__social\" data-reveal style=\"--d:80ms\">\n            <a href=\"#\"><img src=\"assets/social-1.svg\" alt=\"微信\"></a>\n            <a href=\"#\" class=\"big\"><img src=\"assets/social-2.svg\" alt=\"小红书\"></a>\n            <a href=\"#\"><img src=\"assets/social-3.svg\" alt=\"LinkedIn\"></a>\n          </div>\n        </div>\n        <div class=\"footer__locs\" data-reveal style=\"--d:120ms\">\n          <div class=\"card-location card-location--sh\">\n            <img class=\"card-location__tex\" src=\"assets/footer-shanghai.jpg\" alt=\"\"><div class=\"card-location__scrim\"></div>\n            <div class=\"city\">上海</div>\n            <div class=\"addr\">长宁区番禺路381号<br>幸福里E座5楼</div>\n          </div>\n          <div class=\"card-location card-location--hk\">\n            <img class=\"card-location__tex\" src=\"assets/footer-hongkong.jpg\" alt=\"\"><div class=\"card-location__scrim\"></div>\n            <div class=\"city\">香港</div>\n            <div class=\"addr\">中环花园道三号<br>冠君大厦10楼11室</div>\n          </div>\n        </div>\n      </div>\n      <hr class=\"footer__div\">\n      <div class=\"footer__bottom\" data-reveal style=\"--d:160ms\">\n        <div class=\"footer__logo\"><img src=\"assets/logo.png\" alt=\"Ivy Capital 常春藤资本\"></div>\n        <div class=\"footer__mails\">\n          <a class=\"mailpill\" href=\"#\"><span class=\"dot\"></span><span class=\"l\">项目投递</span><span class=\"m\">xxxx @ gmail.com</span></a>\n          <a class=\"mailpill\" href=\"#\"><span class=\"dot\"></span><span class=\"l\">工作机会</span><span class=\"m\">xxxx @ gmail.com</span></a>\n        </div>\n      </div>\n    </div>\n    <div class=\"footer__rule bot\"></div>\n    <div class=\"footer__icp\"><span>沪ICP备 XXXXXXXX 号</span></div>\n  </footer>";
  function def(name, html){
    if(customElements.get(name)) return;
    customElements.define(name, class extends HTMLElement{
      connectedCallback(){
        if(this._d) return; this._d=1; this.innerHTML=html;
        /* 当前页高亮：页面写 <body data-nav="team"> 即让对应 tab 常亮；首页不写 → 全部不亮 */
        var cur = document.body && document.body.getAttribute('data-nav');
        if(cur){ var a=this.querySelector('.nav__links a[data-nav="'+cur+'"]'); if(a) a.classList.add('active'); }
      }
    });
  }
  def('site-nav', NAV);
  def('site-footer', FOOTER);
})();
