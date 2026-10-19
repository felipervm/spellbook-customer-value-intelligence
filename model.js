/* Independent synthetic decision model. No production schema or customer health is inferred. */
const SignalModel = (() => {
 const decisions = ['Verify data','Offer onboarding help','Share feature guidance','Monitor'];
 function classify(record) {
  const flags = [];
  if (record.missing) flags.push('Missing owner');
  if (record.stale) flags.push('Stale account update');
  if (record.events === null) flags.push('Event feed unknown');
  if (record.events !== null && record.events > 0 && record.active === 0) flags.push('Usage / seats conflict');
  const decision = flags.length ? 'Verify data' : record.age < 35 && record.events === 0 ? 'Offer onboarding help' : record.age >= 35 && record.events < 3 ? 'Share feature guidance' : 'Monitor';
  const reason = flags.length ? flags.join('; ') : decision === 'Offer onboarding help' ? 'No first use observed; confirm context' : decision === 'Share feature guidance' ? 'Small activity sample; confirm workflow' : 'No modeled exception; not a health verdict';
  const reviewer = decision === 'Verify data' ? 'Data / Ops' : decision === 'Monitor' ? 'Normal CS workflow' : 'CS context review';
  return {...record, decision, reason, reviewer, events_status:record.events === null ? 'Unknown' : 'Observed'};
 }
 function generate(seed=20261019) {
  let state=seed;
  const rand=()=>((state=(1664525*state+1013904223)>>>0)/4294967296);
  const choose=values=>values[Math.floor(rand()*values.length)];
  return Array.from({length:360},(_,i)=>{
   const segment=choose(['Solo','Small firm','Mid-market']), age=1+Math.floor(rand()*100);
   const seats=segment==='Solo'?1:segment==='Small firm'?2+Math.floor(rand()*14):15+Math.floor(rand()*56);
   const active=Math.min(seats,Math.floor(rand()*(seats+1))), observedEvents=Math.floor(rand()*16), stale=rand()<.115, missing=rand()<.09;
   // An explicit authored missingness pattern, separate from observed zero activity.
   const events=i%17===0?null:observedEvents;
   return classify({account:'DEMO-'+String(i+1).padStart(3,'0'),segment,age,seats,active,events,stale,missing});
  });
 }
 function select(records,segment='all',decision='all'){return records.filter(r=>(segment==='all'||r.segment===segment)&&(decision==='all'||r.decision===decision));}
 function toCSV(records){const columns=['account','segment','age','seats','active','events','events_status','stale','missing','decision','reason','reviewer'];return [columns.join(','),...records.map(r=>columns.map(key=>'"'+String(r[key]??'').replace(/"/g,'""')+'"').join(','))].join('\n');}
 return {generate,classify,select,toCSV,decisions};
})();
if (typeof module !== 'undefined' && module.exports) module.exports=SignalModel;
