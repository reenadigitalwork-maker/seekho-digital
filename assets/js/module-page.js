(function(){
 const n=Number(document.body.dataset.module||1),m=window.SEEKHO_MODULES?.[n-1];if(!m)return;
 const $=s=>document.querySelector(s),escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 document.title=`Module ${String(n).padStart(2,'0')}: ${m.title} | Seekho Digital`;
 $('#module-kicker').textContent=`MODULE ${String(n).padStart(2,'0')} OF 10`;
 $('#module-title').textContent=m.title;$('#module-description').textContent=m.tagline;
 $('#module-goal').textContent=m.goal;
 const list=$('#lesson-list');
 list.innerHTML=m.lessons.map((l,i)=>`<details class="lesson" ${i===0?'open':''}><summary><span><small class="tag">LESSON ${i+1}</small><br>${escapeHTML(l[0])}</span></summary><p><b>Understand:</b> ${escapeHTML(l[1])}</p><div class="callout"><b>See it in an example</b><br>${escapeHTML(l[2])}</div><p><b>Now you try:</b> ${escapeHTML(l[3])}</p></details>`).join('');
 const noteKey=`sd_note_module_${n}`,doneKey='sd_done_modules';const note=$('#module-note');note.value=localStorage.getItem(noteKey)||'';note.addEventListener('input',()=>localStorage.setItem(noteKey,note.value));
 const done=JSON.parse(localStorage.getItem(doneKey)||'[]'),btn=$('#complete-module'),status=$('#module-status');
 function paint(){const is=done.includes(n);btn.textContent=is?'✓ Module marked complete':'Mark this module complete';status.textContent=is?'Completed · You can revisit this module anytime.':'Not completed yet · Mark complete when you have worked through the lessons and task.';}
 btn.addEventListener('click',()=>{const i=done.indexOf(n);if(i<0)done.push(n);else done.splice(i,1);localStorage.setItem(doneKey,JSON.stringify(done));paint();});paint();
 const back=$('#module-back');if(back)back.href=n===1?'../index.html#learning':`module-${String(n-1).padStart(2,'0')}.html`;const next=$('#module-next');if(next){if(n===10){next.href='../projects.html';next.textContent='Go to your portfolio projects →';}else{next.href=`module-${String(n+1).padStart(2,'0')}.html`;next.textContent='Continue to next module →';}}
})();
