const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");let a=null;function d(){const t=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;document.body.style.backgroundColor=t}t.addEventListener("click",(()=>{t.disabled=!0,a=setInterval((()=>{d()}),1e3)})),e.addEventListener("click",(()=>{t.disabled=!1,clearInterval(a)}));
//# sourceMappingURL=01-color-switcher.abf5efa2.js.map
