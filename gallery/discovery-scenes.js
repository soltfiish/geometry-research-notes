/* Display-only calculations. Exact proofs and certificates live in sources/. */
(() => {
  'use strict';
  const {C,V,model,point,line,path,face,label,circle,sphere,triangle}=Geometry;
  const f=(x,n=5)=>Number.isFinite(x)?Number(x.toFixed(n)).toLocaleString('en-US',{maximumFractionDigits:n}):'∞';
  const p=(x,y,z=0)=>[x,y,z],m=(label,value)=>({label,value:String(value)});
  const bracket=(a,n=7)=>'['+f(Math.floor(a[0]*10**n)/10**n,n)+', '+f(Math.ceil(a[1]*10**n)/10**n,n)+']';
  const result=(scene,metrics,text,extra={})=>({scene,metrics,text,legend:[[C.anchor,'Reference anchors'],[C.body,'Compatible body or target'],[C.alternate,'Another compatible explanation']],caption:'Displayed numbers are approximations; linked source records carry the guarantees.',...extra});
  const mean=pts=>pts.reduce((s,x)=>V.add(s,V.mul(x,1/pts.length)),p(0,0));
  const rotate=(v,angle)=>{const t=angle*Math.PI/180;return p(v[0],v[1]*Math.cos(t)-v[2]*Math.sin(t),v[1]*Math.sin(t)+v[2]*Math.cos(t));};
  const poly=(s,pts,color)=>{face(s,pts,color,.1);path(s,pts,color,2.5,[],true);pts.forEach((x,i)=>point(s,x,color,'X'+i,4));};
  const ellipsoid=(s,c,color)=>{
    for(let j=0;j<8;j++){const az=j*Math.PI/8,pts=[];for(let i=0;i<=96;i++){const t=2*Math.PI*i/96;pts.push(p(2*Math.cos(t)*Math.cos(az),Math.cos(t)*Math.sin(az),c*Math.sin(t)));}path(s,pts,color,.85);}
    for(let j=-2;j<=2;j++){const z=c*j/3,fac=Math.sqrt(1-j*j/9),pts=[];for(let i=0;i<=96;i++){const t=2*Math.PI*i/96;pts.push(p(2*fac*Math.cos(t),fac*Math.sin(t),z));}path(s,pts,color,.85);}
  };
  Object.assign(RESEARCH_SCENES,{
    'cap-study'(v){
      const row=EVIDENCE_DATA.noisy_caps.find(r=>r.epsilon===Number(v.epsilon)&&r.delta===Number(v.delta)),cap=Number(v.cap),current=row.cases.find(c=>c.cap===cap),near=row.cases[0],s=model(p(cap/2,.1),Math.max(1.5,cap*.59),2);s.axes=false;
      line(s,p(0,-.45),p(cap,-.45),C.muted,1.5);for(let k=0;k<=cap;k+=cap>2?2:.5){line(s,p(k,-.5),p(k,-.4),C.muted);label(s,p(k,-.65),f(k),C.muted);}
      line(s,p(near.r_min[0],0),p(Math.min(cap,row.near_max[1]),0),C.body,7);
      point(s,p(near.r_min[0],0),C.body,'Near',4);
      const far=cap>=row.far_min[0];if(far){line(s,p(row.far_min[0],0),p(cap,0),C.alternate,7);point(s,p(row.far_min[0],0),C.alternate,'Far',4);}
      const gapEnd=Math.min(cap,row.far_min[0]);if(gapEnd>row.near_max[1]){line(s,p(row.near_max[1],.42),p(gapEnd,.42),C.bad,1.5,[4,4]);label(s,p((row.near_max[1]+gapEnd)/2,.7),'Excluded gap',C.bad);}
      label(s,p(cap/2,-1),'Reference-range values r',C.text);
      return result(s,[m('Optimal error E',bracket(current.minimax_error)),m('Distant onset',bracket(row.far_min,6)),m('Distant family under cap',far?'Yes':'No')],
        far?'The cap admits a physically verified distant family. The global target error is much larger than the near-family error.':'The certified distant onset exceeds the cap. Every remaining state lies in the near outer window.',
        {legend:[[C.body,'Near outer range window'],[C.alternate,'Far outer range window'],[C.bad,'Certified excluded gap']],caption:'A scalar range axis, not physical positions. Window interiors are not certified as wholly feasible.',chart:{title:'Saved guarantees for this noise and anchor tolerance',rows:row.cases.map(c=>({label:'Cap '+c.cap,lo:c.minimax_error[0],hi:c.minimax_error[1],color:c.cap===cap?'#16826d':'#627c93'})),max:6,unit:'Optimal reference-range error · length units'}});
    },
    measurement(v){
      const row=EVIDENCE_DATA.measurement_comparison[v.height],all=row.states.flatMap(s=>s.vertices),center=v.wide?mean(all.concat([p(-1,0),p(1,0),p(0,Number(v.height))])):mean(all);
      const selected=v.wide?all.concat([p(-1,0),p(1,0),p(0,Number(v.height))]):all,radius=Math.max(.85,...selected.map(x=>V.norm(V.sub(x,center))))*1.18,s=model(center,radius),c=p(0,Number(v.height));
      for(let i=0;i<2;i++){const st=row.states[i],color=i?C.alternate:C.body;triangle(s,st.vertices,color,i===0);for(const a of st.anchors)point(s,a,color,'',3,'square');line(s,st.vertices[0],st.anchors[0],color,1.5,[3,4]);line(s,st.vertices[0],c,C.range,1.6,[5,4]);point(s,st.vertices[0],color,'r ≈ '+f(row.ranges[i],4),5);}
      for(const a of [p(-1,0),p(1,0)]){circle(s,a,.05,C.anchor);point(s,a,C.anchor,'',4,'square');}
      point(s,c,C.range,'Extra beacon',6,'square');circle(s,c,row.reading,C.range,{dash:[3,6],width:.8});
      return result(s,[m('Worst optimal error E',bracket(row.risk)),m('Common new observation',f(row.reading,7)+(row.eta?' ± 0.01':' · exact')),m('Witness reference ranges',row.ranges.map(x=>f(x,6)).join(' and '))],
        v.height==='1'?'The two physical explanations give exactly the same new reading. The lower bound persists even when this instrument has zero noise.':'The two physical witness states share a possible reading under ±.01 error. An independent global certificate excludes larger target gaps to within about 0.000000512.',
        {legend:[[C.body,'First physical triangle and actual anchors'],[C.alternate,'Second physical triangle and actual anchors'],[C.range,'One possible extra reading']],caption:v.wide?'One common coordinate system; original anchors stay within their 0.05 disks.':'Close crop of the witness poses. The original and new anchors may be outside the view.',chart:{title:'Same prior and target; different extra information',rows:[{label:'No new reading',lo:4.467218327117394,hi:4.467218377641853,color:'#627c93'},{label:'Beacon (0,1)',lo:1.0278667971199238,hi:1.0278670465837074,color:'#7e65ad'},{label:'Beacon (0,2)',lo:.10944448988566313,hi:.10944500137348838,color:'#16826d'},{label:'Direct r ± .01',lo:.01,hi:.01,color:'#b37522'}],max:4.7,unit:'Worst optimal error in r · length units'}});
    },
    'body-sphere'(v){
      const e=v.epsilon,lo=2/(2+e),hi=2/(2-e),far=1/e,r=v.branch==='near'?hi:far,a=v.branch==='near'?p(1-r,0):p(.5,Math.sqrt(r*r-.25)),ref=p(1,0),center=v.branch==='near'?p(0,0):V.mul(a,.5),s=model(center,v.branch==='near'?1.6:Math.max(1.6,r*.65),3);
      sphere(s,p(0,0),1,C.body);point(s,ref,C.range,'Marked reference',5);point(s,a,C.anchor,'Ranging anchor',6,'square');line(s,ref,a,C.range,2);
      const rho=V.norm(a),u=rho?V.mul(a,1/rho):p(1,0);for(const sign of [-1,1]){const x=V.mul(u,sign);point(s,x,C.alternate,'',4);line(s,a,x,C.alternate,1,[3,4]);}
      return result(s,[m('Exact near range interval','['+f(lo)+', '+f(hi)+']'),m('Far ranges start at',f(far)),m('Displayed reference range',f(r))],
        'The displayed closest/farthest boundary ratios are '+f(Math.abs(rho-1)/r)+' and '+f((rho+1)/r)+'. All boundary distances lie between these extremes.',
        {legend:[[C.body,'Known full unit sphere'],[C.anchor,'One actual ranging anchor'],[C.range,'Marked reference range'],[C.alternate,'Extreme boundary ranges']],caption:'The wire mesh stands for continuous coverage. The formula is proved for the whole boundary.'});
    },
    'body-block'(v){
      const D=v.separation,bad=v.shape==='tetra',a=[p(-D/2,0),p(D/2,0)],s=model(p(0,0),Math.max(2,D*.7),3);let pts;
      if(v.shape==='rectangle')pts=[p(0,-1,-.5),p(0,1,-.5),p(0,1,.5),p(0,-1,.5)];
      else if(v.shape==='triangle')pts=[0,1,2].map(i=>p(0,Math.cos(2*Math.PI*i/3)/Math.sqrt(3),Math.sin(2*Math.PI*i/3)/Math.sqrt(3)));
      else pts=[[1,1,1],[1,-1,-1],[-1,1,-1],[-1,-1,1]].map(x=>x.map(t=>t/(2*Math.sqrt(2))));
      pts=pts.map(x=>rotate(x,v.angle));const color=bad?C.bad:C.body;
      if(bad){for(let i=0;i<4;i++)for(let j=i+1;j<4;j++)line(s,pts[i],pts[j],color,2);pts.forEach((x,i)=>point(s,x,color,'X'+i,4));}else poly(s,pts,color);
      const ds=[];for(const x of pts)for(const aa of a){ds.push(V.norm(V.sub(x,aa)));line(s,x,aa,C.range,1,[3,4]);}a.forEach((x,i)=>point(s,x,C.anchor,'A'+i,5,'square'));line(s,p(-D/2-.4,0),p(D/2+.4,0),C.anchor,1.2,[4,5]);
      return result(s,[m('All equal-range graph',bad?'Impossible for any pose':'Compatible'),m(bad?'Displayed range spread':'Common range r',bad?f(Math.max(...ds)-Math.min(...ds)):f(ds[0])),m('Body rank + anchor rank',bad?'3 + 1 > 3':'2 + 1 = 3')],
        bad?'The tetrahedron fills three dimensions. The equal-distance block theorem rules out two distinct shared anchors, independently of this displayed orientation.':'All cross-ranges remain equal while the body turns. The range is determined by the body circumradius and half the anchor separation.',
        {caption:'The angle slider rotates the body physically. Orbiting the camera changes only the view.'});
    },
    flexible(v){
      const thin=v.shape==='thin',d=EVIDENCE_DATA.flexible,anchor=thin?d.anchor:p(.5,.5),raw=thin?d.vertices:[p(0,0),p(1,0),p(1,1),p(0,1)],pts=raw.map(x=>V.sub(x,anchor)),center=v.wide?mean(pts.concat([p(0,0)])):mean(pts),radius=Math.max(1.25,...(v.wide?pts.concat([p(0,0)]):pts).map(x=>V.norm(V.sub(x,center))))*1.12,s=model(center,radius);
      poly(s,pts,C.body);point(s,p(0,0),C.anchor,'Shared anchor',6,'square');for(const x of pts)line(s,p(0,0),x,C.range,.9,[3,5]);line(s,pts[1],pts[3],C.alternate,2);line(s,pts[0],pts[2],C.alternate,1,[3,3]);
      const ranges=pts.map(x=>V.norm(x)),r=ranges[0],ratios=ranges.map(x=>x/r);
      return result(s,[m('All four sides','1'),m('Area',thin?f(d.area,9):'1'),m('Short diagonal',thin?f(d.diagonal,9):'√2 ≈ 1.414214'),m('Reference range',f(r,7))],
        'The range ratios run from '+f(Math.min(...ratios),7)+' to '+f(Math.max(...ratios),7)+', within [0.99, 1.01]. '+(thin?'This is a strictly convex, very thin rhombus, not a collapsed segment.':'The square is centered on the same physical anchor at the origin.'),
        {caption:v.wide?'Complete physical candidate; the anchor is at the origin.':'Close view of the selected body. Its actual coordinates and aspect ratio are preserved.',legend:[[C.body,'Unit-sided compatible body'],[C.anchor,'Same fixed ranging anchor'],[C.alternate,'Diagonals'],[C.range,'Four measured ranges']]});
    },
    'visible-arc'(v){
      const hmax=v.height,gain=Number(v.gain),s=model(p(0,hmax*gain/2),Math.max(1.3,hmax*gain*.65)),arc=h=>{const R=(1+h*h)/(2*h),pts=[];for(let i=0;i<=100;i++){const x=-1+2*i/100;/* Stable form avoids subtracting two large radii. */const y=h-x*x/(R+Math.sqrt(R*R-x*x));pts.push(p(x,gain*y));}return pts;};s.axes=false;
      line(s,p(-1,0),p(1,0),C.anchor,2);point(s,p(-1,0),C.anchor,'−1',4);point(s,p(1,0),C.anchor,'1',4);
      for(const fac of [.0001,.25,.75,1])path(s,arc(hmax*fac),C.alternate,fac===1?2.3:1,[4,3]);path(s,arc(hmax/2),C.body,3);
      line(s,p(0,0),p(0,hmax*gain),C.range,1.5);point(s,p(0,hmax*gain/2),C.body,'Midpoint estimate',5);
      return result(s,[m('Full radius upper bound','None · unbounded'),m('Optimal visible-arc error',f(hmax/2,6)),m('Curvature interval','(0, '+f(2*hmax/(1+hmax*hmax),7)+']')],
        'The maximum vertical gap between two allowed circular arcs equals their sagitta gap. The midpoint-sagitta circle therefore has exact worst error '+f(hmax/2,6)+' in the original length units.',
        {caption:'Vertical display magnification: '+gain+'×. Horizontal coordinates and all reported error values use the original units.',legend:[[C.anchor,'Exact chord'],[C.alternate,'Allowed arcs · finite examples'],[C.body,'Optimal visible-arc estimate'],[C.range,'Allowed sagitta span']]});
    },
    'flat-depth'(v){
      const z=Math.sqrt(v.nu),s=model(p(1,1,0),2,3),a=[p(0,0),p(2,0),p(0,2)],x=p(1,1,z),xx=p(1,1,-z),beacon=p(1,1,1);face(s,[p(-.2,-.2),p(2.3,-.2),p(2.3,2.3),p(-.2,2.3)],C.muted,.1);
      a.forEach((q,i)=>{point(s,q,C.anchor,'A'+i,5,'square');line(s,x,q,C.body,1,[3,4]);line(s,xx,q,C.alternate,1,[3,4]);});line(s,xx,x,C.range,3);point(s,x,C.body,'+√ν',6);point(s,xx,C.alternate,'−√ν',6);
      if(v.beacon){point(s,beacon,C.range,'Extra beacon',6,'square');line(s,x,beacon,C.body,2);line(s,xx,beacon,C.alternate,2,[4,4]);}
      const separate=z>.01+1e-12;
      return result(s,[m('Signed-depth error',f(z,7)),m('Unsigned-depth error',f(z/2,7)),m('Endpoint pair with new beacon',v.beacon?(separate?'Separated at ±0.01':'Still share a reading'):'Not tested')],
        v.beacon?'The displayed endpoint pair has new-reading difference '+f(2*Math.min(1,z),7)+'. It is separated only when that difference exceeds .02. The full family still includes arbitrarily small reflected depths.':'Equal base ranges force x=y=1 but allow both depth signs. Reducing ν by a factor of 100 reduces the depth error by a factor of 10.',
        {caption:'ν is uncertainty in a common squared range. It has squared length units.'});
    },
    'missing-section'(v){
      const c=v.height,s=model(p(0,0),Math.max(2.6,c*1.2),3);ellipsoid(s,1,C.alternate);ellipsoid(s,c,C.body);const pts=[];for(let i=0;i<=100;i++){const t=2*Math.PI*i/100;pts.push(p(2*Math.cos(t),Math.sin(t)));}path(s,pts,C.anchor,3.5);line(s,p(0,0,-c),p(0,0,c),C.range,2);point(s,p(0,0,c),C.range,'c = '+f(c),4);
      return result(s,[m('Error in the observed section','0'),m('Displayed full height',f(2*c)),m('Displayed volume',f(8*Math.PI*c/3)),m('Height upper bound from data','None')],
        'Changing c leaves x²/4 + y² = 1 at z = 0 exactly unchanged. Larger heights beyond this slider also fit; the slider maximum is not a prior.',
        {legend:[[C.anchor,'Exact observed equatorial ellipse'],[C.body,'One compatible ellipsoid'],[C.alternate,'c = 1 reference ellipsoid'],[C.range,'Unobserved axial extent']],caption:'The displayed wire meshes represent ellipsoids; the cyan observed section is identical for every c.'});
    },
    'vector-error'(v){
      const three=v.shape==='tetra',s=model(p(0,0),1.6,three?3:2),all=three?[[1,1,1],[1,-1,-1],[-1,1,-1],[-1,-1,1]].map(x=>x.map(t=>t/Math.sqrt(3))):[0,1,2].map(i=>p(Math.cos(2*Math.PI*i/3),Math.sin(2*Math.PI*i/3)));
      const pts=v.exclude?all.slice(1):all,center=mean(pts),radius=v.exclude?Math.sqrt(1-1/pts.length**2):1;
      if(v.exclude)point(s,all[0],C.muted,'Excluded P0',5);
      if(three)sphere(s,center,radius,C.body);else circle(s,center,radius,C.body);
      for(const [i,x] of pts.entries()){point(s,x,C.alternate,'P'+(i+(v.exclude?1:0)),5);line(s,center,x,C.body,1.4,[3,4]);}point(s,center,C.range,'Optimal center',5);line(s,pts[0],pts[1],C.range,2.5);
      const D=V.norm(V.sub(pts[0],pts[1]));return result(s,[m('Farthest-pair distance',f(D,7)),m('Half the diameter',f(D/2,7)),m('Optimal position error',f(radius,7)),m('Retained contact positions',String(pts.length))],
        v.exclude?'The prior removes one competing answer. The remaining candidates have a different barycenter and a smaller enclosing ball. In the tetrahedron case, all three surviving directions are still needed.':'Every candidate lies on the unit sphere and their average is its center. Together they force worst error 1. The prior-value theorem says that keeping a balanced set of boundary contacts preserves this guarantee.',
        {legend:[[C.alternate,'Possible target positions'],[C.body,'Smallest enclosing circle / sphere'],[C.range,'One diameter-length chord and optimal center'],[C.muted,'Excluded candidate, when selected']],caption:'These candidates are target positions, not sensor anchors. The threshold criterion uses classical enclosing-ball geometry.'});
    }
  });
})();
