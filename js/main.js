(function(){
'use strict';
var links=[].slice.call(document.querySelectorAll('#menu a'));
var nav=document.getElementById('nav'),menu=document.getElementById('menu'),burger=document.getElementById('burger');
function setMenu(open){menu.classList.toggle('open',open);burger.setAttribute('aria-expanded',String(open));burger.setAttribute('aria-label',open?'Close menu':'Open menu');}
burger.addEventListener('click',function(){setMenu(burger.getAttribute('aria-expanded')!=='true');});
menu.addEventListener('click',function(e){if(e.target.tagName==='A')setMenu(false);});
document.addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false);});
function onScroll(){nav.classList.toggle('on',window.scrollY>12);if(window.scrollY<200)links.forEach(function(a){a.classList.remove('act');});}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
if('IntersectionObserver' in window){
  var so=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){links.forEach(function(a){a.classList.toggle('act',a.getAttribute('href')==='#'+en.target.id);});}});},{rootMargin:'-45% 0px -50% 0px'});
  links.forEach(function(a){var s=document.querySelector(a.getAttribute('href'));if(s)so.observe(s);});
  var edu=document.querySelector('.edu');
  var eo=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){edu.classList.add('in');eo.disconnect();}});},{threshold:.4});eo.observe(edu);
  var ro=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');ro.unobserve(en.target);}});},{threshold:.15});
  document.querySelectorAll('.rv').forEach(function(el){ro.observe(el);});
}else{document.querySelector('.edu').classList.add('in');document.querySelectorAll('.rv').forEach(function(el){el.classList.add('in');});}
document.querySelectorAll('.skill').forEach(function(b){b.addEventListener('click',function(){b.setAttribute('aria-expanded',String(b.getAttribute('aria-expanded')!=='true'));});});
var copy=document.getElementById('copy'),st=document.getElementById('copyStatus'),mail='wasifrehman165@gmail.com';
function done(ok){copy.textContent=ok?'Copied':'Copy failed';st.textContent=ok?'Email address copied to clipboard.':'Could not copy. Please select the address and copy it manually.';setTimeout(function(){copy.textContent='Copy email';},2000);}
copy.addEventListener('click',function(){
  if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(mail).then(function(){done(true);},function(){done(false);});}
  else{var t=document.createElement('textarea');t.value=mail;t.style.position='fixed';t.style.opacity='0';document.body.appendChild(t);t.select();var ok=false;try{ok=document.execCommand('copy');}catch(e){}document.body.removeChild(t);done(ok);}
});
document.getElementById('yr').textContent=new Date().getFullYear();

/* progress bar */
var bar=document.getElementById('progress');
function prog(){var d=document.documentElement,m=d.scrollHeight-innerHeight;bar.style.width=(m>0?scrollY/m*100:0)+'%';}
window.addEventListener('scroll',prog,{passive:true});prog();
/* optional photo: images/profile.(jpg|jpeg|png|webp) */
(function(){var photo=document.getElementById('photo'),card=document.querySelector('.id-card'),ex=['jpg','jpeg','png','webp'];
function t(i){if(i>=ex.length)return;var im=new Image();im.onload=function(){photo.src=im.src;card.classList.add('has-photo');};im.onerror=function(){t(i+1);};im.src='images/profile.'+ex[i];}t(0);})();
/* code viewer */
(function(){
var D=window.CODE,v=document.getElementById('viewer');if(!D||!v)return;
var list=v.querySelector('.v-list'),pane=v.querySelector('.v-pane'),code=pane.querySelector('code'),desc=pane.querySelector('.v-desc'),file=pane.querySelector('.v-file'),cp=document.getElementById('vcopy'),cur=0;
var KW=/^(class|public|protected|private|virtual|override|return|using|namespace)$/,TY=/^(int|double|string|void)$/;
function hl(s){var e=s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
return e.replace(/(\/\/.*$)|("(?:[^"\\]|\\.)*")|(#include.*$)|\b([A-Za-z_]\w*)\b|\b(\d+(?:\.\d+)?)\b/gm,function(m,c,s2,inc,w,n){
if(c)return '<span class="tk-c">'+c+'</span>';if(s2)return '<span class="tk-s">'+s2+'</span>';if(inc)return '<span class="tk-k">'+inc+'</span>';
if(n)return '<span class="tk-n">'+n+'</span>';if(w){if(KW.test(w))return '<span class="tk-k">'+w+'</span>';if(TY.test(w))return '<span class="tk-t">'+w+'</span>';}return m;});}
function show(i,focus){cur=i;var p=D.parts[i];
[].forEach.call(list.children,function(b,k){var on=k===i;b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1;});
pane.setAttribute('aria-labelledby','tab-'+p.id);
file.textContent=p.id==='out'?'Terminal output':D.file;desc.textContent=p.desc;code.innerHTML=hl(p.code);
pane.classList.remove('fade');void pane.offsetWidth;pane.classList.add('fade');if(focus)list.children[i].focus();}
D.parts.forEach(function(p,i){var b=document.createElement('button');b.type='button';b.role='tab';b.id='tab-'+p.id;b.textContent=p.title;
b.addEventListener('click',function(){show(i);});
b.addEventListener('keydown',function(e){var k=e.key,n=D.parts.length;
if(k==='ArrowDown'||k==='ArrowRight'){e.preventDefault();show((cur+1)%n,true);}else if(k==='ArrowUp'||k==='ArrowLeft'){e.preventDefault();show((cur-1+n)%n,true);}});
list.appendChild(b);});
cp.addEventListener('click',function(){var txt=D.parts[cur].code,old='Copy code';
function f(ok){cp.textContent=ok?'Copied':'Copy failed';setTimeout(function(){cp.textContent=old;},1800);}
if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(txt).then(function(){f(true);},function(){f(false);});}
else{var t=document.createElement('textarea');t.value=txt;t.style.cssText='position:fixed;opacity:0';document.body.appendChild(t);t.select();var ok=false;try{ok=document.execCommand('copy');}catch(x){}document.body.removeChild(t);f(ok);}});
show(0);
})();
})();
