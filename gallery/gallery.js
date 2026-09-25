(() => {
  'use strict';
  const $=id=>document.getElementById(id),catalog=RESEARCH_CATALOG,exhibits=catalog.exhibits;
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const cache={},controlElements={};let current=null,lastResult=null,chartHost=null;
  const viewer=new Geometry.Viewer($('geometry'),mode=>{for(const name of ['plane','orbit'])$('view-'+name).setAttribute('aria-pressed',String(mode===name));});
  $('view-plane').addEventListener('click',()=>viewer.view('plane'));
  $('view-orbit').addEventListener('click',()=>viewer.view('orbit'));
  $('view-fit').addEventListener('click',()=>viewer.view('reset'));
  $('edition-count').textContent='· '+exhibits.length+' exhibits';
  let group='';
  exhibits.forEach((ex,i)=>{
    if(ex.group!==group){group=ex.group;const h=document.createElement('p');h.className='nav-group';h.textContent=group;$('exhibit-nav').appendChild(h);}
    const button=document.createElement('button');button.type='button';button.className='nav-item';button.dataset.exhibit=ex.id;button.innerHTML='<span class="number">'+String(i+1).padStart(2,'0')+'</span><span>'+escape(ex.short)+'</span>';button.addEventListener('click',()=>navigate(ex.id));$('exhibit-nav').appendChild(button);
    const option=document.createElement('option');option.value=ex.id;option.textContent=String(i+1).padStart(2,'0')+' · '+ex.short;$('exhibit-select').appendChild(option);
    cache[ex.id]=Object.fromEntries(ex.controls.map(c=>[c.key,c.value]));
  });
  function navigate(id){if(!exhibits.some(e=>e.id===id))id=exhibits[0].id;if(location.hash.slice(1)!==id)location.hash=id;else show(id);}
  $('exhibit-select').addEventListener('change',e=>navigate(e.target.value));
  $('previous').addEventListener('click',()=>navigate(exhibits[exhibits.indexOf(current)-1].id));
  $('next').addEventListener('click',()=>navigate(exhibits[exhibits.indexOf(current)+1].id));
  window.addEventListener('hashchange',()=>show(location.hash.slice(1)));
  function show(id){
    const ex=exhibits.find(e=>e.id===id)||exhibits[0],i=exhibits.indexOf(ex);current=ex;
    document.title=ex.short+' · GCS research gallery';
    $('chapter').textContent=ex.group+' / '+String(i+1).padStart(2,'0');$('exhibit-title').textContent=ex.title;$('exhibit-question').textContent=ex.question;
    $('evidence-tag').textContent=ex.status;$('evidence-tag').classList.toggle('open',ex.status.toLowerCase().includes('open'));
    $('exhibit-select').value=ex.id;document.querySelectorAll('[data-exhibit]').forEach(b=>{if(b.dataset.exhibit===ex.id)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});
    $('assumptions').innerHTML=ex.assumptions.map(a=>'<li>'+escape(a)+'</li>').join('');$('finding').textContent=ex.finding;$('scope').textContent=ex.scope;
    const guide=RESEARCH_GUIDES[ex.id];$('characterization').textContent=guide.character;$('plain-explanation').textContent=guide.plain;$('use-case').textContent=guide.use;$('example-intro').textContent=guide.intro;
    $('example-actions').replaceChildren();guide.examples.forEach((example,j)=>{const button=document.createElement('button');button.type='button';button.textContent=example.label;button.dataset.example=String(j);button.addEventListener('click',()=>{cache[ex.id]={...Object.fromEntries(ex.controls.map(c=>[c.key,c.value])),...example.values};buildControls(ex);update(false);});$('example-actions').appendChild(button);});
    $('term-list').innerHTML=ex.terms.map(k=>'<dt>'+escape(({delta:'Anchor uncertainty δ',profile:'Recovery profile Δ',gamma:'Far-field threshold γ',squared:'Squared ranges',minimax:'Optimal worst-case error',shared:'Shared anchor',generic:'Generic configuration'})[k]||k[0].toUpperCase()+k.slice(1))+'</dt><dd>'+escape(catalog.terms[k])+'</dd>').join('');
    $('evidence-content').innerHTML='<p class="evidence-copy">'+escape(ex.evidence)+'</p>'+ex.sources.map(name=>'<a class="source-link" target="_blank" rel="noopener" href="sources/'+encodeURIComponent(name)+'">'+escape(name.replace(/_/g,' ').replace(/\.(md|json)$/,''))+' <span class="source-kind">'+(name.endsWith('.json')?'[record]':'[proof / note]')+'</span></a>').join('')+'<p class="evidence-copy">Snapshot: '+catalog.date+'. Source hashes are in the <a href="source-manifest.json" target="_blank" rel="noopener">provenance record</a>. This gallery does not establish literature priority.</p>';
    $('previous').disabled=i===0;$('next').disabled=i===exhibits.length-1;$('tour-position').textContent=(i+1)+' / '+exhibits.length;
    buildControls(ex);update(true);window.scrollTo({top:0,behavior:'instant'});
  }
  function buildControls(ex){
    $('controls').replaceChildren();for(const k of Object.keys(controlElements))delete controlElements[k];
    for(const spec of ex.controls){
      const id='control-'+spec.key,wrap=document.createElement('div');wrap.className='control';
      const head=document.createElement('div');head.className='control-head';const label=document.createElement('label');label.htmlFor=id;label.textContent=spec.label;head.appendChild(label);
      let input;
      if(spec.type==='select'){input=document.createElement('select');for(const [value,text] of spec.options){const op=document.createElement('option');op.value=value;op.textContent=text;input.appendChild(op);}input.value=cache[ex.id][spec.key];wrap.append(head,input);}
      else if(spec.type==='check'){input=document.createElement('input');input.type='checkbox';input.checked=cache[ex.id][spec.key];wrap.classList.add('check');wrap.append(input,label);}
      else{input=document.createElement('input');input.type='range';input.min=spec.min;input.max=spec.max;input.step=spec.step;input.value=cache[ex.id][spec.key];const output=document.createElement('output');output.htmlFor=id;output.textContent=GeometryNumber(cache[ex.id][spec.key]);head.appendChild(output);wrap.append(head,input);controlElements[spec.key+'Output']=output;}
      input.id=id;input.name=spec.key;controlElements[spec.key]=input;
      input.addEventListener(spec.type==='range'?'input':'change',()=>{cache[ex.id][spec.key]=spec.type==='check'?input.checked:spec.type==='range'?Number(input.value):input.value;update(false);});
      if(spec.presets){const presets=document.createElement('div');presets.className='presets';for(const preset of spec.presets){const button=document.createElement('button');button.type='button';button.textContent=preset.label;button.addEventListener('click',()=>{cache[ex.id][spec.key]=preset.value;input.value=preset.value;update(false);});presets.appendChild(button);}wrap.appendChild(presets);}
      $('controls').appendChild(wrap);
    }
  }
  function GeometryNumber(x){return Number(x.toFixed(6)).toLocaleString('en-US',{maximumFractionDigits:6});}
  function update(reset){
    try{
      const state=cache[current.id],r=RESEARCH_SCENES[current.id](state),dimChanged=lastResult&&lastResult.scene.dimension!==r.scene.dimension;lastResult=r;
      const examples=RESEARCH_GUIDES[current.id].examples,selected=examples.findIndex(e=>Object.entries(e.values).every(([k,value])=>typeof value==='number'?Math.abs(state[k]-value)<1e-10:state[k]===value));
      document.querySelectorAll('[data-example]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.example)===selected)));
      $('example-outcome').textContent=selected<0?'Custom setting. Use a worked example above to replay a specific result.':examples[selected].expect;
      for(const spec of current.controls)if(controlElements[spec.key+'Output'])controlElements[spec.key+'Output'].textContent=GeometryNumber(state[spec.key]);
      viewer.setScene(r.scene,reset||dimChanged);
      $('dimension-label').textContent=r.scene.dimension===3?'3D model · ℝ³':'Planar model · z = 0';$('view-caption').textContent=r.caption;
      $('geometry').setAttribute('aria-label',current.title+' '+r.text+' Drag to orbit; use the view buttons for keyboard camera control.');
      $('legend').innerHTML=r.legend.map(([color,label])=>'<span><i class="swatch" style="--swatch:'+color+'"></i>'+escape(label)+'</span>').join('');
      $('live-results').innerHTML=r.metrics.map(m=>'<div class="metric"><div class="metric-label">'+escape(m.label)+'</div><div class="metric-value'+(m.value.length>17?' small':'')+'">'+escape(m.value)+'</div></div>').join('');
      $('reading').replaceChildren();const text=document.createElement('p');text.textContent=r.text;$('reading').appendChild(text);chartHost=null;
      if(r.chart){chartHost=document.createElement('div');chartHost.className='evidence-chart';$('reading').appendChild(chartHost);drawChart(r.chart);}
      if(current.id==='contact')controlElements.distance.disabled=!(state.delta>=1&&!state.distinct);
      if(current.id==='noisy')controlElements.cap.disabled=!state.capped;
      if(current.id==='scale'||current.id==='escape')controlElements.angle.disabled=state.space!=='three';
      window.dispatchEvent(new CustomEvent('gallery:updated',{detail:{id:current.id,state:{...state}}}));
    }catch(error){$('reading').innerHTML='<p class="error-banner" role="alert">This exhibit could not render. '+escape(error.message)+'</p>';console.error(error);throw error;}
  }
  function drawChart(chart){
    if(!chartHost)return;const w=Math.max(240,chartHost.clientWidth),n=chart.rows.length,h=46+n*34+46,left=w<400?88:115,right=24,max=chart.max,plotW=w-left-right,scale=x=>left+x/max*plotW;
    let svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" width="100%" role="img" aria-label="'+escape(chart.title)+'"><title>'+escape(chart.title)+'</title>';
    for(let i=0;i<=3;i++){const val=i*max/3,x=scale(val);svg+='<line x1="'+x+'" x2="'+x+'" y1="12" y2="'+(n*34+17)+'" stroke="#d5e0e8" stroke-width="1"/><text x="'+x+'" y="'+(n*34+35)+'" text-anchor="'+(i===0?'start':i===3?'end':'middle')+'" fill="#52687c" font-size="12">'+Number(val.toPrecision(3))+'</text>';}
    chart.rows.forEach((row,i)=>{const y=16+i*34,bar=Math.max(0,scale(row.hi)-left),solid=Math.max(0,scale(row.lo)-left);svg+='<text x="0" y="'+(y+12)+'" font-size="12" fill="#263f52">'+escape(row.label)+'</text><rect x="'+left+'" y="'+y+'" width="'+bar+'" height="17" fill="'+row.color+'" opacity=".18"/><rect x="'+left+'" y="'+y+'" width="'+solid+'" height="17" fill="'+row.color+'"/><line x1="'+scale(row.hi)+'" x2="'+scale(row.hi)+'" y1="'+(y-2)+'" y2="'+(y+19)+'" stroke="'+row.color+'" stroke-width="2"/><title>'+escape(row.label)+': ['+row.lo+', '+row.hi+']</title>';});
    svg+='<text x="'+left+'" y="'+(h-12)+'" font-size="12" fill="#52687c">'+escape(chart.unit)+'</text></svg>';
    chartHost.innerHTML='<p class="chart-title">'+escape(chart.title)+'</p>'+svg+'<p class="chart-key">Solid bar: certified lower bound. Pale extension and end mark: certified upper bound.</p>';
  }
  new ResizeObserver(()=>{if(lastResult&&lastResult.chart)drawChart(lastResult.chart);}).observe($('reading'));
  window.GALLERY={viewer,catalog,navigate,getState:()=>({id:current.id,values:{...cache[current.id]},metrics:lastResult.metrics,dimension:lastResult.scene.dimension}),getResult:()=>lastResult};
  show(location.hash.slice(1));
})();
