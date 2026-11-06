(function(){
 const toggle=document.querySelector('.menu-toggle'),nav=document.getElementById('navlinks');
 if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));}
 const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
 const done=JSON.parse(localStorage.getItem('sd_done_modules')||'[]');const p=Math.round(done.length/10*100);const label=document.getElementById('progress-label'),bar=document.getElementById('progress-bar');if(label)label.textContent=p+'% complete';if(bar)bar.style.width=p+'%';
})();
