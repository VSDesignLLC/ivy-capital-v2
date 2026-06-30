/* partials.js — 站点公共结构 (nav/footer) 单一来源。
   页面写 <site-nav></site-nav> / <site-footer></site-footer> 即注入。
   在 <head> 同步加载：解析到自定义元素即时升级注入。
   语言：默认中文；页面 <html lang="en"> → 注入英文 nav/footer。中·EN 为切换链接。 */
(function(){
  var NAV = "  <nav class=\"nav glass-ring\" id=\"nav\">\n    <div class=\"nav__logo\"><a href=\"homepage-ch.html\"><img src=\"assets/logo.png\" alt=\"Ivy Capital 常春藤资本\" /></a></div>\n    <div class=\"nav__links\">\n      <a href=\"about-ch.html\" data-nav=\"about\">关于我们</a><a href=\"team-ch.html\" data-nav=\"team\">团队</a>\n      <a href=\"portfolio-ch.html\" data-nav=\"portfolio\">被投企业</a><a href=\"news-ch.html\" data-nav=\"news\">最新动态</a>\n    </div>\n    <div class=\"nav__lang\"><a class=\"z\" href=\"homepage-ch.html\">中</a><span class=\"sep\">·</span><a class=\"en\" href=\"homepage-en.html\">EN</a></div>\n  </nav>";
  var NAV_EN = "  <nav class=\"nav glass-ring\" id=\"nav\">\n    <div class=\"nav__logo\"><a href=\"homepage-en.html\"><img src=\"assets/logo.png\" alt=\"Ivy Capital\" /></a></div>\n    <div class=\"nav__links\">\n      <a href=\"about-ch.html\" data-nav=\"about\">About</a><a href=\"team-ch.html\" data-nav=\"team\">Team</a>\n      <a href=\"portfolio-ch.html\" data-nav=\"portfolio\">Portfolio</a><a href=\"news-ch.html\" data-nav=\"news\">News</a>\n    </div>\n    <div class=\"nav__lang\"><a class=\"z\" href=\"homepage-ch.html\">中</a><span class=\"sep\">·</span><a class=\"en\" href=\"homepage-en.html\">EN</a></div>\n  </nav>";
  var FOOTER = "  <footer class=\"footer\" data-bgop=\"0.08\">\n    <div class=\"footer__rule top\"></div>\n    <div class=\"footer__bg\"><video autoplay muted loop playsinline preload=\"auto\"><source src=\"assets/0617/kling_20260617_VIDEO_无缝循环_hero__5143_0.mp4\" type=\"video/mp4\" /></video></div>\n    <div class=\"footer__inner\">\n      <div class=\"footer__top\">\n        <div class=\"footer__left\">\n          <div class=\"footer__slogan\" data-reveal>一家以人为本的深科技投资机构，<br>与你共生、共韧、长青。</div>\n          <div class=\"footer__social\" data-reveal style=\"--d:80ms\">\n            <a href=\"#\"><img src=\"assets/social-1.svg\" alt=\"微信\"></a>\n            <a href=\"#\" class=\"big\"><img src=\"assets/social-2.svg\" alt=\"小红书\"></a>\n            <a href=\"#\"><img src=\"assets/social-3.svg\" alt=\"LinkedIn\"></a>\n          </div>\n        </div>\n        <div class=\"footer__locs\" data-reveal style=\"--d:120ms\">\n          <div class=\"card-location card-location--sh\">\n            <img class=\"card-location__tex\" src=\"assets/footer-shanghai.jpg\" alt=\"\"><div class=\"card-location__scrim\"></div>\n            <div class=\"city\">上海</div>\n            <div class=\"addr\">浦东新区芳甸路1155号<br>浦东嘉里城19楼</div>\n          </div>\n          <div class=\"card-location card-location--hk\">\n            <img class=\"card-location__tex\" src=\"assets/footer-hongkong.jpg\" alt=\"\"><div class=\"card-location__scrim\"></div>\n            <div class=\"city\">香港</div>\n            <div class=\"addr\">中环皇后大道中183号<br>中远大厦30楼</div>\n          </div>\n        </div>\n      </div>\n      <hr class=\"footer__div\">\n      <div class=\"footer__bottom\" data-reveal style=\"--d:160ms\">\n        <div class=\"footer__logo\"><img src=\"assets/logo.png\" alt=\"Ivy Capital 常春藤资本\"></div>\n        <div class=\"footer__mails\">\n          <a class=\"mailpill\" href=\"mailto:bp@ivycapital.com\"><span class=\"dot\"></span><span class=\"l\">项目投递</span><span class=\"m\">bp@ivycapital.com</span></a>\n          <a class=\"mailpill\" href=\"mailto:hr@ivycapital.com\"><span class=\"dot\"></span><span class=\"l\">工作投递</span><span class=\"m\">hr@ivycapital.com</span></a>\n        </div>\n      </div>\n    </div>\n    <div class=\"footer__rule bot\"></div>\n    <div class=\"footer__icp\"><span>沪ICP备 XXXXXXXX 号</span></div>\n  </footer>";
  var FOOTER_EN = "  <footer class=\"footer\" data-bgop=\"0.08\">\n    <div class=\"footer__rule top\"></div>\n    <div class=\"footer__bg\"><video autoplay muted loop playsinline preload=\"auto\"><source src=\"assets/0617/kling_20260617_VIDEO_无缝循环_hero__5143_0.mp4\" type=\"video/mp4\" /></video></div>\n    <div class=\"footer__inner\">\n      <div class=\"footer__top\">\n        <div class=\"footer__left\">\n          <div class=\"footer__slogan\" data-reveal>A people-centered deep-tech investment firm —<br>growing alongside you in symbiosis, resilience, and enduring strength.</div>\n          <div class=\"footer__social\" data-reveal style=\"--d:80ms\">\n            <a href=\"#\"><img src=\"assets/social-1.svg\" alt=\"WeChat\"></a>\n            <a href=\"#\" class=\"big\"><img src=\"assets/social-2.svg\" alt=\"RED Note\"></a>\n            <a href=\"#\"><img src=\"assets/social-3.svg\" alt=\"LinkedIn\"></a>\n          </div>\n        </div>\n        <div class=\"footer__locs\" data-reveal style=\"--d:120ms\">\n          <div class=\"card-location card-location--sh\">\n            <img class=\"card-location__tex\" src=\"assets/footer-shanghai.jpg\" alt=\"\"><div class=\"card-location__scrim\"></div>\n            <div class=\"city\">Shanghai</div>\n            <div class=\"addr\">19F, Kerry Parkside,<br>1155 Fangdian Rd, Pudong</div>\n          </div>\n          <div class=\"card-location card-location--hk\">\n            <img class=\"card-location__tex\" src=\"assets/footer-hongkong.jpg\" alt=\"\"><div class=\"card-location__scrim\"></div>\n            <div class=\"city\">Hong Kong</div>\n            <div class=\"addr\">30F, COSCO Tower,<br>183 Queen's Road Central</div>\n          </div>\n        </div>\n      </div>\n      <hr class=\"footer__div\">\n      <div class=\"footer__bottom\" data-reveal style=\"--d:160ms\">\n        <div class=\"footer__logo\"><img src=\"assets/logo.png\" alt=\"Ivy Capital\"></div>\n        <div class=\"footer__mails\">\n          <a class=\"mailpill\" href=\"mailto:bp@ivycapital.com\"><span class=\"dot\"></span><span class=\"l\">Business Plans</span><span class=\"m\">bp@ivycapital.com</span></a>\n          <a class=\"mailpill\" href=\"mailto:hr@ivycapital.com\"><span class=\"dot\"></span><span class=\"l\">Careers</span><span class=\"m\">hr@ivycapital.com</span></a>\n        </div>\n      </div>\n    </div>\n    <div class=\"footer__rule bot\"></div>\n    <div class=\"footer__icp\"><span>沪ICP备 XXXXXXXX 号</span></div>\n  </footer>";
  var isEN = (document.documentElement.getAttribute('lang')||'').toLowerCase().indexOf('en')===0;
  /* 英文页暂只本地预览、不部署：仅 localhost / file:// 下让指向 homepage-en.html 的 toggle 可点；
     线上(生产域名)惰化为不可跳转，避免点 EN 落到未部署页面 404。EN 正式上线时删除此判断 + 从 .vercelignore 移除即可。 */
  var isLocal = /^(localhost|127\.0\.0\.1|0\.0\.0\.0)$/.test(location.hostname) || location.protocol === 'file:';
  function def(name, html){
    if(customElements.get(name)) return;
    customElements.define(name, class extends HTMLElement{
      connectedCallback(){
        if(this._d) return; this._d=1; this.innerHTML=html;
        /* 当前页高亮：页面写 <body data-nav="team"> 即让对应 tab 常亮；首页不写 → 全部不亮 */
        var cur = document.body && document.body.getAttribute('data-nav');
        if(cur){ var a=this.querySelector('.nav__links a[data-nav="'+cur+'"]'); if(a) a.classList.add('active'); }
        /* 线上惰化未部署的英文页链接 */
        if(!isLocal){ var ens=this.querySelectorAll('a[href="homepage-en.html"]'); for(var i=0;i<ens.length;i++){ ens[i].removeAttribute('href'); } }
      }
    });
  }
  /* ---- NAV v2（新增 · opt-in；原 NAV / site-nav 不动）。布局 = .nav--v2，tab 动效 = .nav__links--roll。
     逐字翻滚需要每个字一组 <span class="ch"> markup，这里用 splitTab() 自动按字拆，避免手写超长字符串。 */
  function splitTab(href, key, label){
    var chars = Array.from(label), inner = "";
    for(var i=0;i<chars.length;i++){
      inner += "<span class=\"ch\" style=\"--chd:"+(i*0.05).toFixed(2)+"s\"><span class=\"mask\"><span class=\"roll\"><span>"+chars[i]+"</span><span aria-hidden=\"true\">"+chars[i]+"</span></span></span></span>";
    }
    var uldur = ((chars.length-1)*0.05 + 0.4).toFixed(2);   /* 整条下划线时长 = 末字翻完时刻 */
    return "<a href=\""+href+"\" data-nav=\""+key+"\" style=\"--ul-dur:"+uldur+"s\">"+inner+"</a>";
  }
  function navV2(tabs, homeHref, alt){
    var links = "";
    for(var i=0;i<tabs.length;i++){ links += splitTab(tabs[i][0], tabs[i][1], tabs[i][2]); }
    return "  <nav class=\"nav nav--v2\" id=\"nav\">\n"
      + "    <div class=\"nav__logo\"><a href=\""+homeHref+"\"><img src=\"assets/logo.png\" alt=\""+alt+"\" /></a></div>\n"
      + "    <div class=\"nav__links nav__links--roll\">"+links+"</div>\n"
      + "    <div class=\"nav__lang\"><a class=\"z\" href=\"homepage-ch.html\">中</a><span class=\"sep\">·</span><a class=\"en\" href=\"homepage-en.html\">EN</a></div>\n"
      + "  </nav>";
  }
  var NAV_V2 = navV2([["about-ch.html","about","关于我们"],["team-ch.html","team","团队"],["portfolio-ch.html","portfolio","被投企业"],["news-ch.html","news","最新动态"]], "homepage-ch.html", "Ivy Capital 常春藤资本");
  var NAV_V2_EN = navV2([["about-ch.html","about","About"],["team-ch.html","team","Team"],["portfolio-ch.html","portfolio","Portfolio"],["news-ch.html","news","News"]], "homepage-en.html", "Ivy Capital");

  def('site-nav', isEN ? NAV_EN : NAV);
  def('site-nav-v2', isEN ? NAV_V2_EN : NAV_V2);
  def('site-footer', isEN ? FOOTER_EN : FOOTER);
})();
