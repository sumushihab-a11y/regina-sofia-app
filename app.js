'use strict';
(() => {
 const $ = (s, r = document) => r.querySelector(s);
 const $$ = (s, r = document) => [...r.querySelectorAll(s)];
 const data = window.REGINA_MENU || {categories:[]};
 const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const normalize = s => s.toLocaleLowerCase('it').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
 const titleCase = s => s.toLocaleLowerCase('it').replace(/^./, c => c.toLocaleUpperCase('it'));
 const icon = name => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
 let saved = [];
 try { const v = JSON.parse(localStorage.getItem('rs-favorites') || '[]'); if(Array.isArray(v)) saved=v; } catch(_) {}
 const favorites = new Set(saved);
 let category = data.categories.find(c => c.name === 'Pizze')?.id || 'all';
 let query='', gluten=false, onlyFavorites=false, limit=6;
 const allItems = data.categories.flatMap(c => c.items.map((item,i) => ({...item,id:`${c.id}-${i}`,categoryId:c.id,categoryName:c.name})));
 const preferred = ['REGINA SOFIA','REGINA MARGHERITA','VERACE','BOLOGNESE','CAPRICCIOSA','BUFALINA'];
 let toastTimeout;
 function toast(message) { $('#toast').textContent=message; $('#toast').classList.add('visible'); clearTimeout(toastTimeout); toastTimeout=setTimeout(()=>$('#toast').classList.remove('visible'),3200); }
 function persist(){ try{localStorage.setItem('rs-favorites',JSON.stringify([...favorites]));return true;}catch(_){return false;} }
 for(const c of data.categories){const option=document.createElement('option');option.value=c.id;option.textContent=titleCase(c.name);$('#category-select').append(option);}
 const quickCats=[{id:'all',name:'Tutto'},...['Pizze','Sfizi','Primi','Dolci'].map(n=>data.categories.find(c=>c.name===n)).filter(Boolean)];
 $('#category-chips').innerHTML=quickCats.map(c=>`<button data-cat="${esc(c.id)}" aria-pressed="false">${esc(c.name)}</button>`).join('');
 function render(){
  let filtered=allItems.filter(i=>(category==='all'||i.categoryId===category)&&(!gluten||i.glutenFree)&&(!onlyFavorites||favorites.has(i.id))&&(!query||normalize(`${i.name} ${i.description} ${i.categoryName}`).includes(normalize(query))));
  if(category==='le-pizze') filtered.sort((a,b)=>{let x=preferred.indexOf(a.name),y=preferred.indexOf(b.name);return (x<0?100:x)-(y<0?100:y);});
  $('#category-select').value=category;
  $$('[data-cat]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.cat===category)));
  $('#favorites-filter').setAttribute('aria-pressed',String(onlyFavorites));
  $('#favorites-count').textContent=favorites.size;
  $('#gluten-filter').checked=gluten;
  const current=data.categories.find(c=>c.id===category);
  $('#menu-category-title').textContent=onlyFavorites?'I tuoi preferiti':(current?titleCase(current.name):'Tutto il menù');
  $('#menu-count').textContent=`${filtered.length} ${filtered.length===1?'proposta':'proposte'}${filtered.length>limit?' · '+Math.min(limit,filtered.length)+' visibili':''}`;
  $('#menu-items').innerHTML=filtered.slice(0,limit).map(i=>`<article class="menu-item"><div class="menu-item-body"><div class="menu-item-meta">${esc(i.categoryName)}${i.glutenFree?'<span class="sg-badge" title="Disponibile in versione senza glutine">SG</span>':''}</div><div class="menu-item-header ${i.price.length>23?'complex-price':''}"><h4>${esc(titleCase(i.name))}</h4><span class="menu-item-price">${esc(i.price)}</span></div><p>${esc(i.description)}</p></div><button class="favorite-toggle" data-favorite="${esc(i.id)}" aria-pressed="${favorites.has(i.id)}" aria-label="${favorites.has(i.id)?'Rimuovi dai':'Aggiungi ai'} preferiti: ${esc(titleCase(i.name))}">${icon('heart')}</button></article>`).join('');
  if(!filtered.length) $('#menu-items').innerHTML=`<div class="empty-state">${icon(onlyFavorites?'heart':'search')}<h4>${onlyFavorites?'Il tuo menù del cuore.':'Nessuna proposta trovata.'}</h4><p>${onlyFavorites?'Salva un piatto con il cuore. I preferiti restano su questo dispositivo.':'Prova un altro ingrediente o modifica i filtri.'}</p><button class="btn btn-outline" id="reset-filters">Mostra tutto il menù</button></div>`;
  $('#show-more').hidden=filtered.length<=limit;
  $('#menu-notes').innerHTML=current?.notes?.map(n=>`<p>${esc(n)}</p>`).join('')||'';
 }
 function chooseCategory(id){category=id;limit=6;onlyFavorites=false;query='';gluten=false;$('#menu-search').value='';render();}
 $('#category-chips').addEventListener('click',e=>{const b=e.target.closest('[data-cat]');if(b)chooseCategory(b.dataset.cat);});
 $('#category-select').addEventListener('change',e=>{category=e.target.value;limit=6;render();});
 $('#menu-search').addEventListener('input',e=>{query=e.target.value.trim();category='all';limit=6;render();});
 $('#gluten-filter').addEventListener('change',e=>{gluten=e.target.checked;limit=6;if(gluten)category='all';render();});
 $('#favorites-filter').addEventListener('click',()=>{onlyFavorites=!onlyFavorites;category='all';query='';gluten=false;limit=6;$('#menu-search').value='';render();});
 $('#show-more').addEventListener('click',()=>{const n=$$('.menu-item').length;limit+=6;render();const item=$$('.menu-item')[n];if(item){item.setAttribute('tabindex','-1');item.focus({preventScroll:true});}});
 $('#menu-items').addEventListener('click',e=>{
  if(e.target.closest('#reset-filters')){chooseCategory('all');return;}
  const b=e.target.closest('[data-favorite]');if(!b)return;const id=b.dataset.favorite;
  if(favorites.has(id)){favorites.delete(id);toast('Piatto rimosso dai preferiti');}else{favorites.add(id);toast('Piatto aggiunto ai tuoi preferiti');}
  if(!persist())toast('Preferito salvato solo per questa sessione');
  render();const next=$(`[data-favorite="${id}"]`);if(next)next.focus({preventScroll:true});
 });
 $$('[data-category-name]').forEach(b=>b.addEventListener('click',()=>{const c=data.categories.find(c=>c.name===b.dataset.categoryName);chooseCategory(c?.id||'all');location.hash='menu';}));
 $('#show-gluten').addEventListener('click',()=>{chooseCategory('all');gluten=true;render();location.hash='menu';});
 $('#clear-favorites').addEventListener('click',()=>{favorites.clear();persist();render();$('#clear-favorites').textContent='Preferiti cancellati';});
 render();
 if(data.generalNotes){
  const d=document.createElement('details');d.className='official-notes';
  d.innerHTML=`<summary>Coperto, informazioni di servizio e allergeni</summary><p>${esc(data.generalNotes)}</p><p><strong>Allergeni indicati nella fonte:</strong> ${esc((data.allergens||[]).map(a=>a.name).join(', '))}. Per conoscere gli allergeni dei singoli piatti rivolgiti al personale.</p><a href="${esc(data.source)}" target="_blank" rel="noopener">Consulta tutte le informazioni ufficiali ↗</a>`;
  $('.menu-disclaimer').after(d);
 }
 let lastFocus;
 function openModal(id){lastFocus=document.activeElement;const dialog=$(id);if(typeof dialog.showModal==='function')dialog.showModal();else dialog.setAttribute('open','');document.body.classList.add('modal-open');}
 function closeModal(d){if(typeof d.close==='function')d.close();else d.removeAttribute('open');document.body.classList.remove('modal-open');if(lastFocus)lastFocus.focus({preventScroll:true});}
 $$('dialog').forEach(d=>{d.querySelector('.close-modal').addEventListener('click',()=>closeModal(d));d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeModal(d);}});d.addEventListener('close',()=>document.body.classList.remove('modal-open'));});
 $$('[data-book]').forEach(b=>b.addEventListener('click',()=>openModal('#booking-dialog')));
 $('#install-button').addEventListener('click',()=>openModal('#app-dialog'));
 $('#privacy-button').addEventListener('click',()=>openModal('#privacy-dialog'));
 const date=new Date();const today=`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;$('#booking-date').min=today;$('#booking-date').value=today;
 $('#booking-form').addEventListener('submit',e=>{
  e.preventDefault();const fields=new FormData(e.target);const day=fields.get('date');
  if(day<today){$('#booking-date').setCustomValidity('Scegli oggi o un giorno successivo.');$('#booking-date').reportValidity();return;}
  const nice=day.split('-').reverse().join('/');
  const message=`Buongiorno Regina Sofia,\nvorrei richiedere un tavolo per ${fields.get('people')} persone il ${nice} alle ${fields.get('time')}.\n\nNome: ${fields.get('name')}\n${fields.get('notes')?'Note: '+fields.get('notes')+'\n':''}\nResto in attesa della vostra conferma.\nGrazie!`;
  $('#request-text').value=message;$('#email-fallback').hidden=false;
  location.href=`mailto:info@reginasofia.it?subject=${encodeURIComponent('Richiesta tavolo · '+nice)}&body=${encodeURIComponent(message)}`;
 });
 $('#booking-date').addEventListener('input',()=>$('#booking-date').setCustomValidity(''));
 $('#copy-request').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('#request-text').value);$('#copy-request').textContent='Richiesta copiata';}catch(_){$('#request-text').select();$('#copy-request').textContent='Seleziona e copia il testo qui sopra';}});
 $('.mobile-toggle').addEventListener('click',e=>{const b=e.currentTarget,opened=$('.site-header nav').classList.toggle('open');b.setAttribute('aria-expanded',String(opened));b.setAttribute('aria-label',opened?'Chiudi navigazione':'Apri navigazione');});
 $$('.site-header nav a').forEach(a=>a.addEventListener('click',()=>{$('.site-header nav').classList.remove('open');$('.mobile-toggle').setAttribute('aria-expanded','false');$('.mobile-toggle').setAttribute('aria-label','Apri navigazione');}));
 function activeNav(){const hash=location.hash;$$('.bottom-nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')===(hash||'#')));}
 window.addEventListener('hashchange',activeNav);
 document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)&&!$('dialog[open]')){e.preventDefault();location.hash='menu';$('#menu-search').focus();}});
 let installPrompt;
 window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;$('#pwa-install').hidden=false;$('#pwa-help').hidden=true;});
 $('#pwa-install').addEventListener('click',async()=>{if(!installPrompt)return;await installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;$('#pwa-install').hidden=true;$('#pwa-help').hidden=false;});
 window.addEventListener('appinstalled',()=>{if($('#app-dialog').open)closeModal($('#app-dialog'));toast('Web app installata');});
 if(location.protocol==='file:'){
  document.body.classList.add('android-app');
  $$('a[target="_blank"]').forEach(a=>a.removeAttribute('target'));
 }
 if('serviceWorker' in navigator && ['https:','http:'].includes(location.protocol))navigator.serviceWorker.register('./sw.js').catch(()=>{});
})();
