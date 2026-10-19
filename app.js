const portfolio = SignalModel.generate();
const $ = id => document.getElementById(id);
const esc = value => String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
let previousURL;
function render(){
 const segment=$('segment').value, decision=$('decision').value;
 const selected=SignalModel.select(portfolio,segment,decision);
 const count=outcome=>selected.filter(r=>r.decision===outcome).length;
 $('accounts').textContent=selected.length;
 $('verify').textContent=count('Verify data');
 $('followup').textContent=count('Offer onboarding help')+count('Share feature guidance');
 $('monitor').textContent=count('Monitor');
 $('bars').innerHTML=SignalModel.decisions.map(outcome=>{const n=count(outcome);return '<div class="barrow"><div class="barlabel"><span>'+esc(outcome)+'</span><b>'+n+'</b></div><div class="track"><div class="fill" style="width:'+(selected.length?100*n/selected.length:0)+'%"></div></div></div>';}).join('');
 const priority={'Verify data':0,'Offer onboarding help':1,'Share feature guidance':2,'Monitor':3};
 const sorted=[...selected].sort((a,b)=>priority[a.decision]-priority[b.decision]||a.account.localeCompare(b.account));
 $('rows').innerHTML=sorted.slice(0,10).map(r=>'<tr><td>'+r.account+'</td><td>'+esc(r.segment)+'</td><td>'+(r.events===null?'Unknown event feed':r.events+' illustrative events')+' / '+r.active+' of '+r.seats+' active seats</td><td>'+esc(r.decision)+'</td><td>'+esc(r.reason)+'<br><b>'+esc(r.reviewer)+'</b></td></tr>').join('')||'<tr><td colspan="5">No matches. Try another filter.</td></tr>';
 $('filter-status').textContent=selected.length+' fictional accounts · '+(segment==='all'?'All segments':segment)+' · '+(decision==='all'?'All outcomes':decision)+' · Counts and CSV use both filters';
 if(previousURL)URL.revokeObjectURL(previousURL);
 previousURL=URL.createObjectURL(new Blob([SignalModel.toCSV(selected)],{type:'text/csv;charset=utf-8'}));
 $('download').href=previousURL;
 $('download').textContent='Download selected '+selected.length+' records ↗';
}
for(const id of ['segment','decision'])$(id).addEventListener('change',render);
render();
