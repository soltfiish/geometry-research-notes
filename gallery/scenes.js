/* Geometry is generated from the stated models, not inferred from a rendered image. */
(() => {
  'use strict';
  const {C,V,model,point,line,path,face,label,circle,sphere,triangle}=Geometry;
  const fmt=(x,n=4)=>Number.isFinite(x)?Number(x.toFixed(n)).toLocaleString('en-US',{maximumFractionDigits:n}):'∞';
  const down=(x,n=10)=>fmt(Math.floor(x*10**n)/10**n,n),up=(x,n=10)=>fmt(Math.ceil(x*10**n)/10**n,n);
  const p=(x,y,z=0)=>[x,y,z], norm=V.norm, sub=V.sub;
  const anchors=(s,pts,labels=true)=>pts.forEach((a,i)=>point(s,a,C.anchor,labels?'A'+i:'',5,'square'));
  const metric=(label,value)=>({label,value:String(value)});
  const baseLegend=[[C.anchor,'Nominal / exact anchors'],[C.body,'Body or candidate'],[C.alternate,'Alternate witness']];
  const result=(scene,metrics,text,extra={})=>({scene,metrics,text,legend:baseLegend,caption:'All lengths use the same geometric units.',...extra});
  const ranges=(s,pts,a,color=C.range)=>{for(let k=0;k<2;k++)for(const q of a)line(s,pts[k],q,color,1,[3,5]);};
  const errorChart=(title,rows,max)=>({title,rows,max,unit:'Optimal target error E · length units'});
  const rotateX=(q,degrees)=>{const t=degrees*Math.PI/180,c=Math.cos(t),s=Math.sin(t);return p(q[0],q[1]*c-q[2]*s,q[1]*s+q[2]*c);};
  const functions={
    pose(v){
      const s=model(p(0,0),2,2),a=[p(-1,0),p(1,0)],aa=[p(0,-.5),p(0,.5),p(-1,-.5)],bb=[p(0,.5),p(0,-.5),p(-1,.5)];
      if(v.placement!=='second'){ranges(s,aa,a);triangle(s,aa,C.body,true);}
      if(v.placement!=='first'){triangle(s,bb,C.alternate,v.placement==='second');if(v.placement==='second')ranges(s,bb,a);}
      anchors(s,a);circle(s,a[0],Math.sqrt(1.25),C.range,{dash:[3,5]});
      return result(s,[metric('Common range r','√5/2 ≈ 1.1180'),metric('Compatible poses','2'),metric('Optimal error for r','0')],
        'The triangle changes placement, but all four cross-ranges stay equal to √5/2. Its side lengths also stay fixed. The fifth range is 1/2 in either pose.');
    },
    inversion(v){
      const s=model(p(1.1,.8),2.65),a=[p(1,0),p(0,1),p(-1,0)],x=p(2,2),xx=p(.25,.25);
      circle(s,p(0,0),1,C.muted,{dash:[4,4]});line(s,x,xx,C.muted,1,[4,4]);
      for(const q of a){line(s,x,q,C.body,1,[3,4]);line(s,xx,q,C.alternate,1,[3,4]);}
      if(v.fourth){a.push(p(3,2));line(s,x,a[3],C.body,2);line(s,xx,a[3],C.bad,2,[4,4]);}
      anchors(s,a);point(s,x,C.body,'X = (2, 2)',6);point(s,xx,v.fourth?C.bad:C.alternate,v.fourth?'X′ rejected':'X′ = (¼, ¼)',6,v.fourth?'cross':'circle');
      return result(s,[metric('First two squared ratios','1, 13/5'),metric('Fourth ratio at X','1/5'),metric('Fourth ratio at X′','17')],v.fourth?'The fourth observation accepts X and rejects X′. A global ambiguity can disappear through one strategically different measurement.':'Both candidates fit the first three anchors exactly, even though their distance from the origin differs by a factor of eight.',{caption:'Unit-circle inversion gives the two exact candidates.'});
    },
    profile(v){
      const s=model(p(1.2,1.2),3.25),a=[p(0,0),p(2,0),p(0,2)],x=p(v.x,v.y),ds=a.map(q=>norm(sub(q,x))),lo=Math.min(...ds),hi=Math.max(...ds),gap=(hi-lo)/2,r=(lo+hi)/2,ok=gap<=v.delta+1e-12;
      for(let i=0;i<a.length;i++){
        circle(s,a[i],v.delta,C.anchor,{fill:.045});line(s,x,a[i],C.muted,1,[2,4]);
        const dir=ds[i]>1e-12?V.mul(sub(a[i],x),1/ds[i]):p(1,0);
        const actual=V.add(x,V.mul(dir,r));line(s,a[i],actual,ok?C.body:C.bad,2);point(s,actual,ok?C.body:C.bad,'a'+i,4,'square');
      }
      anchors(s,a);point(s,x,C.range,'Candidate x',6);circle(s,x,r,ok?C.body:C.bad,{dash:[4,5]});
      const lower=Math.max(...ds.map(d=>Math.max(0,d-v.delta))),upper=Math.min(...ds.map(d=>d+v.delta));
      return result(s,[metric('Least required motion Δ',fmt(gap)),metric('Allowed motion δ',fmt(v.delta)),metric('Candidate is feasible',ok?'Yes':'No')],ok?'The attainable common-range interval is ['+fmt(lower)+', '+fmt(upper)+']. The construction equalizes every range at '+fmt(r)+'.':'The largest lower range bound '+fmt(lower)+' exceeds the smallest upper bound '+fmt(upper)+'. The construction needs '+fmt(gap)+' motion, beyond the current δ.',{legend:[[C.anchor,'Nominal anchors and uncertainty disks'],[ok?C.body:C.bad,'Constructed actual anchors'],[C.range,'Candidate']]});
    },
    residual(v){
      const H=v.height,s=model(p(.5,H/2),Math.max(3,H*.6)),x=p(0,H),q=p(1,H),gap=2/(Math.sqrt(H*H+4)+H);
      path(s,[p(1,-2),p(1,H+4)],C.body,2.5);path(s,[p(0,0),p(0,H+4)],C.muted,1,[3,5]);line(s,x,q,C.range,3);point(s,x,C.alternate,'Candidate',6);point(s,q,C.body,'Nearest exact solution',5);anchors(s,[p(0,0),p(2,0)]);
      return result(s,[metric('Fit gap Δ',fmt(gap,6)),metric('Distance to exact set','1'),metric('Height H',fmt(H))],'The yellow horizontal segment always has length 1. A residual near zero is not, by itself, a guarantee that the candidate lies near the exact feasible set.',{legend:[[C.body,'Exact solution line x = 1'],[C.alternate,'Candidate (0, H)'],[C.range,'Position gap = 1']]});
    },
    escape(v){
      if(v.space==='three'){
        const R=v.window,s=model(p(1,1),R*1.18,3),a=[p(0,0),p(2,0),p(0,2)],step=2*R/24;
        for(let i=0;i<=24;i++)for(let j=0;j<=24;j++)for(let k=0;k<=24;k++){
          const x=p(1-R+i*step,1-R+j*step,-R+k*step),ds=a.map(q=>norm(sub(x,q))),gap=(Math.max(...ds)-Math.min(...ds))/2;
          if(gap<=v.delta+1e-12)point(s,x,C.body,'',1.1);
        }
        path(s,a,C.anchor,1.5,[],true);anchors(s,a);
        line(s,p(1,1,-R),p(1,1,R),C.alternate,3);label(s,p(1,1,R*.75),'Exact-fit line',C.alternate);
        circle(s,p(1,0),1,C.range,{u:p(0,1),v:p(0,0,1),dash:[4,4]});
        const x=rotateX(p(1,1),v.angle),ds=a.map(q=>norm(sub(x,q))),gap=(Math.max(...ds)-Math.min(...ds))/2,ok=gap<=v.delta+1e-12;
        for(const q of a)line(s,x,q,ok?C.range:C.bad,1.5,[3,4]);point(s,x,ok?C.range:C.bad,'Rotated candidate',6,ok?'circle':'cross');
        return result(s,[metric('3D critical tolerance γ','0'),metric('Global feasible set',v.delta>=Math.SQRT2?'All of ℝ³':'Unbounded'),metric('Rotated candidate fits',ok?'Yes':'No')],
          'Every point on the purple line (1, 1, z) fits at zero tolerance. The circular motion about the first anchor pair gives a different family: at '+fmt(v.angle,1)+'°, its fit gap is '+fmt(gap,6)+'. The fixed third anchor generally changes its range.',
          {legend:[[C.anchor,'Three fixed nominal anchors'],[C.body,'Feasible 3D grid samples'],[C.alternate,'Exact equal-range line'],[C.range,'Trial rotation around the first pair']],caption:'Recomputed 3D distances. The finite point cloud is not a full boundary.'});
      }
      const R=v.window,s=model(p(1,1),R*1.1),a=[p(0,0),p(2,0),p(0,2)],gamma=Math.SQRT1_2,delta=v.delta;
      const step=2*R/66;let shown=0;
      for(let i=0;i<=66;i++)for(let j=0;j<=66;j++){
        const x=p(1-R+i*step,1-R+j*step),ds=a.map(q=>norm(sub(x,q))),gap=(Math.max(...ds)-Math.min(...ds))/2;
        if(gap<=delta+1e-12){point(s,x,C.body,'',1.35);shown++;}
      }
      const outline=[];
      for(let i=0;i<=180;i++){
        const ang=i*2*Math.PI/180,u=p(Math.cos(ang),Math.sin(ang)),projs=a.map(q=>V.dot(q,u)),phi=(Math.max(...projs)-Math.min(...projs))/2;
        const q=V.add(s.center,V.mul(u,R*.89));outline.push(q);if(phi<delta-1e-10)point(s,q,C.range,'',2.2);
      }
      path(s,outline,C.muted,.7,[]);path(s,a,C.anchor,1.5,[],true);anchors(s,a);
      if(Math.abs(delta-gamma)<1e-10){path(s,[p(1,1),p(1+R*.6,1+R*.6)],C.range,3);label(s,p(1+R*.4,1+R*.4),'Critical escape family',C.range);}
      return result(s,[metric('Critical tolerance γ','1/√2 ≈ 0.7071'),metric('Global regime',delta<gamma-1e-10?'Bounded':delta>=Math.SQRT2?'All of space':'Unbounded'),metric('Dots in this window',shown)],'Green dots satisfy Δ(x) ≤ δ on the displayed grid. Gold marks show strictly allowed far-field directions, placed on a direction ring—not a position boundary.',{legend:[[C.anchor,'Anchor triangle'],[C.body,'Feasible grid samples'],[C.range,'Strict escape directions']],caption:'Finite grid illustration; there may be feasible points beyond this window.'});
    },
    interior(v){
      const s=model(p(1,0),3),a=[p(0,0),p(2,0)];if(v.interior)a.push(p(1,0));
      path(s,[p(1,-3),p(1,3)],v.interior?C.bad:C.body,2.5,v.interior?[5,5]:[]);line(s,a[0],a[1],C.anchor,2);anchors(s,a);const x=p(1,1.5);point(s,x,v.interior?C.bad:C.body,'Test point',5,v.interior?'cross':'circle');for(const q of a)line(s,x,q,C.range,1,[3,4]);
      return result(s,[metric('Anchor hull','Same segment'),metric('Far-field threshold γ','0'),metric('Exact feasible set',v.interior?'Empty':'Line x = 1')],v.interior?'The new middle anchor is closer to every point on the former solution line than either endpoint anchor. It destroys feasibility without changing the hull.':'Every point on the perpendicular bisector is equally distant from both endpoint anchors.',{legend:[[C.anchor,'Anchors and unchanged hull'],[v.interior?C.bad:C.body,v.interior?'Former solution line · rejected':'Exact solution line'],[C.range,'Compared ranges']]});
    },
    scale(v){
      const a=v.lower,b=v.upper,three=v.space==='three',s=model(p(.8,0),4.5,three?3:2),valid=a<=b,nonempty=valid&&b>=1,lo=Math.sqrt(Math.max(0,a*a-1)),hi=Math.sqrt(Math.max(0,b*b-1)),axisAnchors=[p(0,0),p(2,0)];
      anchors(s,axisAnchors);line(s,p(-.5,0),p(2.8,0),C.anchor,1.5,[3,4]);
      if(three){
        if(nonempty){
          const center=p(1,0),u=p(0,1),w=p(0,0,1),at=(r,t)=>p(1,r*Math.cos(t),r*Math.sin(t));
          for(let i=0;i<96;i++){const t0=i*2*Math.PI/96,t1=(i+1)*2*Math.PI/96;face(s,[at(lo,t0),at(hi,t0),at(hi,t1),at(lo,t1)],C.body,.09);}
          for(let i=0;i<=6;i++)circle(s,center,lo+(hi-lo)*i/6,C.body,{u,v:w,width:i===0||i===6?2:.6});
          for(const sign of [-1,1])line(s,p(1,sign*lo),p(1,sign*hi),C.alternate,4);
          const rho=(lo+hi)/2,x=rotateX(p(1,rho),v.angle);
          circle(s,center,rho,C.range,{u,v:w,width:1.4,dash:[3,4]});point(s,x,C.range,'Moving point',6);for(const q of axisAnchors)line(s,x,q,C.range,1.5,[4,4]);
          if(hi===0)point(s,center,C.body,'Only feasible point',5);
        }
      }else{
        circle(s,p(0,0),a,C.range,{dash:[4,4]});circle(s,p(0,0),b,C.range);path(s,[p(1,-4.4),p(1,4.4)],C.muted,1,[3,5]);
        if(nonempty)for(const sign of [-1,1]){line(s,p(1,sign*lo),p(1,sign*hi),C.body,5);point(s,p(1,sign*lo),C.body,'',4);point(s,p(1,sign*hi),C.body,'',4);}
      }
      const components=!nonempty?0:three?1:lo>1e-12?2:1;
      const text=!valid?'The bracket is inconsistent: a must not exceed b.':!nonempty?'Every equidistant point has range at least 1, so this cap excludes all of them.':three?'The complete set is x = 1 with '+fmt(lo)+' ≤ √(y² + z²) ≤ '+fmt(hi)+'. The original planar pieces are purple. Rotating them around the fixed anchor line produces one connected '+(hi===0?'point':lo===hi?'circle':lo===0?'disk':'annulus')+'.':lo>0?'Only √(a² − 1) ≤ |y| ≤ √(b² − 1) remains. These two planar pieces join when actual 3D rotation is allowed.':'The lower bound leaves the middle intact, giving one vertical segment.';
      return result(s,[metric('Allowed common range','['+fmt(a)+', '+fmt(b)+']'),metric('Connected components',components),metric(three?'Range at moving point':'Largest |y|',nonempty?fmt(three?Math.sqrt(1+((lo+hi)/2)**2):hi):'—')],text,
        {legend:three?[[C.anchor,'Fixed anchors and rotation axis'],[C.body,'Complete annulus / disk'],[C.alternate,'Original planar slice'],[C.range,'Point rotating at constant ranges']]:[[C.anchor,'Exact anchors'],[C.body,'Complete planar feasible set'],[C.range,'Lower and upper range circles']],caption:three?'Actual 3D motion. The annulus is a flat sheet, not a solid torus.':'Planar restriction z = 0; switch the model space to allow actual revolution.'});
    },
    layout(v){
      let pts,dim=3,gamma,normal,min,max,radius=2.3,center=p(0,0);
      if(v.shape==='tetra'){const k=Math.SQRT1_2;pts=[p(k,k,k),p(k,-k,-k),p(-k,k,-k),p(-k,-k,k)];gamma=k;normal=p(1,0);min=-k;max=k;}
      else if(v.shape==='cube'){pts=[];for(const x of [-1,1])for(const y of [-1,1])for(const z of [-1,1])pts.push(p(x,y,z));gamma=1;normal=p(1,0);min=-1;max=1;}
      else if(v.shape==='rectangle'){dim=2;pts=[p(-2,-1),p(2,-1),p(2,1),p(-2,1)];gamma=1;normal=p(0,1);min=-1;max=1;radius=3;}
      else{dim=2;pts=[p(0,0),p(2,0),p(0,2)];gamma=Math.SQRT1_2;normal=p(Math.SQRT1_2,Math.SQRT1_2);min=0;max=Math.SQRT2;center=p(.7,.7);}
      const s=model(center,radius,dim);
      for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const dist=norm(sub(pts[i],pts[j]));if(v.shape==='cube'&&Math.abs(dist-2)>.01)continue;if(v.shape==='rectangle'&&j!==i+1&&!(i===0&&j===3))continue;line(s,pts[i],pts[j],C.anchor,2);}
      const u=p(-normal[1],normal[0]),z=p(0,0,1),extent=1.6;
      for(const h of [min,max]){const c=V.mul(normal,h),corners=[];if(dim===3){for(const [su,sv] of [[-1,-1],[1,-1],[1,1],[-1,1]])corners.push(V.add(c,V.add(V.mul(u,su*extent),V.mul(z,sv*extent))));face(s,corners,C.range,.065);path(s,corners,C.range,.8,[],true);}else line(s,V.add(c,V.mul(u,-3)),V.add(c,V.mul(u,3)),C.range,1.5,[5,4]);}
      const offset=V.mul(u,1.25),ends=[V.add(offset,V.mul(normal,min)),V.add(offset,V.mul(normal,max))];line(s,...ends,C.body,3);label(s,V.add(offset,V.mul(normal,(min+max)/2)),'width = '+fmt(2*gamma),C.body);anchors(s,pts,false);
      return result(s,[metric('Ambient dimension',dim),metric('Minimum width',fmt(2*gamma)),metric('Escape threshold γ',fmt(gamma))],v.shape==='tetra'?'The two planes touch opposite edges of the tetrahedron. Their separation is smaller than a vertex-to-face altitude.':'The gold supporting boundaries enclose the anchor layout in one of its narrowest directions.',{legend:[[C.anchor,'Anchor layout'],[C.range,dim===3?'Supporting planes':'Supporting lines'],[C.body,'Minimum width']],caption:dim===3?'Actual 3D coordinates. Drag to inspect the supporting planes.':'Planar theorem in ℝ². Orbiting does not change its ambient dimension.'});
    },
    sphere(v){
      const s=model(p(0,0),2.4,3),dir=p(.78,.36,.51),u=V.mul(dir,1/norm(dir)),x=V.mul(u,v.distance),gap=Math.min(v.distance,1),ok=gap<=v.delta+1e-12;
      sphere(s,p(0,0),1,C.anchor);if(v.delta<1)sphere(s,p(0,0),v.delta,C.body);else sphere(s,p(0,0),2.1,C.body);
      point(s,p(0,0),C.muted,'Center',4);line(s,p(0,0),x,C.range,2);point(s,x,ok?C.body:C.bad,'Candidate',6,ok?'circle':'cross');
      return result(s,[metric('Candidate fit gap Δ',fmt(gap)),metric('Feasible set',v.delta<1?'Ball of radius '+fmt(v.delta):'All of ℝ³'),metric('Candidate is feasible',ok?'Yes':'No')],v.delta<1?'The cyan sphere is the continuous anchor surface. The green sphere is the boundary of the feasible ball; its interior is feasible too.':'At δ = 1 a bounded ball gives way to all of space. The outer green mesh is only a viewing guide, not a new finite boundary.',{legend:[[C.anchor,'Continuous anchor sphere R = 1'],[C.body,v.delta<1?'Feasible-ball boundary':'Unbounded viewing guide'],[C.range,'Candidate distance']],caption:'Continuous-surface model, rendered as a wire mesh.'});
    },
    certified(v){
      const row=EVIDENCE_DATA.refined[Number(v.level)],s=model(v.wide?p(1,1):p(2,2),v.wide?3.5:.24),[x0,x1]=row.witnesses;
      anchors(s,row.centers);for(const q of row.centers)circle(s,q,row.delta,C.anchor);
      point(s,p(0,0),C.range,'Target O',5,'cross');line(s,x0,x1,C.muted,1,[4,4]);
      row.witnesses.forEach((x,i)=>{point(s,x,i?C.alternate:C.body,i?'Maximum witness':'Minimum witness',6);line(s,p(0,0),x,i?C.alternate:C.body,1,[4,4]);});
      const charts=EVIDENCE_DATA.refined.map((r,i)=>({label:'δ = '+r.delta,lo:r.error[0],hi:r.error[1],color:i===Number(v.level)?'#16826d':'#557e9b'}));
      return result(s,[metric('Certified E, lower',down(row.error[0])),metric('Certified E, upper',up(row.error[1])),metric('Bound width',fmt(row.error[1]-row.error[0],10))],'The certificate places the minimum target near '+fmt(row.endpoints.minimum[0],7)+' and the maximum near '+fmt(row.endpoints.maximum[1],7)+'. At this scale, witness separation is visible without drawing an invented feasible boundary.',{caption:v.wide?'Full layout; uncertainties are drawn at their actual radius.':'Close view near (2, 2); anchors and the target lie outside this crop.',chart:errorChart('Saved optimal-error bounds at each anchor tolerance',charts,.145)});
    },
    rigid(v){
      const key=v.noise+'_'+v.model,row=EVIDENCE_DATA.triangles[key],ind=EVIDENCE_DATA.triangles[v.noise+'_independent'],rig=EVIDENCE_DATA.triangles[v.noise+'_rigid'];
      const s=model(v.wide?p(1.8,1.8):p(2,3),v.wide?3.25:.035),a=[p(0,0),p(4,0),p(0,4)];anchors(s,a);point(s,p(1,1),C.range,'Target B',5,'cross');
      row.witnesses.forEach((pts,i)=>{triangle(s,pts,i?C.alternate:C.body,v.wide);if(!v.wide)point(s,pts[2],i?C.alternate:C.body,i?'Maximum X2':'Minimum X2',6);line(s,p(1,1),pts[2],i?C.alternate:C.body,1,[4,4]);});
      const reduction=1-rig.error[1]/ind.error[0];
      return result(s,[metric('E, certified lower',down(row.error[0])),metric('E, certified upper',up(row.error[1])),metric('Gain from exact shape',v.noise==='equal'?'Exactly 0%':down(100*reduction,2)+'% or more')],v.noise==='equal'?'In this equal-noise experiment, adding the exact shape does not improve the chosen distance target: both original extrema remain attainable.':'With weaker readings at X2, the exact side lengths constrain how far that vertex can move. The error bracket shrinks from about 0.0149072 to 0.0044633.',{caption:v.wide?'Endpoint witness configurations shown in the calibrated anchor layout.':'Magnified crop around X2 = (2, 3); full triangles continue outside the view.',chart:errorChart('Effect of shape information on the same target',[{label:'Ranges only',lo:ind.error[0],hi:ind.error[1],color:'#7e65ad'},{label:'Exact triangle',lo:rig.error[0],hi:rig.error[1],color:'#16826d'}],.016)});
    },
    tolerance(v){
      const index=Number(v.level),row=EVIDENCE_DATA.tolerances[index],s=model(v.wide?p(2.4,2.4):p(2,3),v.wide?1.25:.05),ind=EVIDENCE_DATA.triangles.lossy_independent.error;
      row.witnesses.forEach((pts,i)=>{triangle(s,pts,i?C.alternate:C.body,v.wide);if(!v.wide)point(s,pts[2],i?C.alternate:C.body,i?'Maximum witness':'Minimum witness',6);});
      const verdict=row.no_gain?'No gain · proved':row.reduction[0]>1e-8?'Gain certified':'Not decided by bounds';
      return result(s,[metric('Optimal E bracket','['+down(row.error[0],7)+', '+up(row.error[1],7)+']'),metric('Guaranteed reduction',row.no_gain?'0%':down(Math.max(0,row.reduction[0]*100),2)+'%'),metric('Saved outcome',verdict),metric('Exact no-gain threshold ≈',fmt(EVIDENCE_DATA.side_transition[0]*100,7)+'%')],row.no_gain?'At '+fmt(row.tau*100)+'% side tolerance, both original target extrema are attainable again. The exact no-gain transition is about 1.4213222%.':row.reduction[0]>1e-8?'The upper error bound is strictly below the ranges-only error. Checkpoint 016 proves that some benefit remains at every side tolerance below the exact transition.':'The displayed bounds are inconclusive; consult the separate threshold theorem for strict gain.',{caption:v.wide?'Two actual witness triangles at the selected side tolerance.':'Magnified crop at the third vertex; coordinates are not exaggerated.',chart:errorChart('Eight saved cases · bounds, not interpolated optima',EVIDENCE_DATA.tolerances.map((r,i)=>({label:(100*r.tau)+'%',tau:r.tau,lo:r.error[0],hi:r.error[1],color:i===index?'#16826d':'#627c93'})).sort((a,b)=>a.tau-b.tau),.016)});
    },
    shared(v){
      const s=model(p(0,.2),2.5),pts=[p(1,0),p(0,1),p(-1,0)],q=65/49,r=Math.sqrt(q),w={'01':p(-1/7,-1/7),'12':p(1/7,-1/7),'02':p(0,4/7)},all=v.pair==='all',a=all?p(0,0):w[v.pair],selected=all?[0,1,2]:v.pair.split('').map(Number);
      triangle(s,pts,C.body,true,.04);circle(s,p(0,0),4/7,C.anchor,{fill:.07});
      for(const i of selected){circle(s,pts[i],r,C.range,{dash:[4,5]});line(s,pts[i],a,all?C.bad:C.alternate,2);}
      point(s,a,all?C.bad:C.alternate,all?'Circumcenter · wrong range':'Shared pair witness',6,all?'cross':'square');
      return result(s,[metric('Requested squared range','65/49 ≈ '+fmt(q)),metric('Squared range at witness',all?'1':fmt(q)),metric('All selected readings fit',all?'No':'Yes')],all?'The circumcenter is the only possible equal-distance anchor for all three vertices. It has the wrong common range, so no triple witness exists.':'This one anchor position serves both selected observations and lies inside the uncertainty disk. Change the pair to see that the needed anchor changes.',{legend:[[C.body,'Known body points'],[C.anchor,'Allowed anchor disk'],[C.range,'Requested range circles'],[all?C.bad:C.alternate,all?'Rejected triple candidate':'Valid pair witness']]});
    },
    contact(v){
      const delta=v.delta,escaping=delta>=1&&!v.distinct,Y=v.distance,Dmin=Math.max(1,2-2*delta),Dmax=2+2*delta;
      const lower=.5*Math.sqrt(1+Dmin*Dmin),upper=.5*Math.sqrt(1+Dmax*Dmax),E=(upper-lower)/2;
      const s=model(escaping?p(0,-Y/2):p(0,0),escaping?Math.max(3,Y*.68+1):3.6),nom=[p(-1,0),p(1,0)];
      nom.forEach(c=>circle(s,c,delta,C.anchor,{fill:.035}));anchors(s,nom);
      let a,pts;
      if(escaping){a=[p(0,0),p(0,0)];pts=[p(-.5,-Y),p(.5,-Y),p(-.5,1-Y)];point(s,p(0,0),C.range,'a0 = a1',6,'square');path(s,[p(0,-.5),p(0,-Y-1)],C.muted,1,[4,5]);}
      else{a=[p(-Dmax/2,0),p(Dmax/2,0)];pts=[p(0,-.5),p(0,.5),p(-1,-.5)];a.forEach((x,i)=>point(s,x,C.range,'a'+i,5,'square'));circle(s,p(0,0),delta+.5,C.muted,{dash:[4,5]});}
      triangle(s,pts);ranges(s,pts,a);line(s,pts[2],a[0],C.alternate,1.5,[3,4]);
      return result(s,[metric('Anchor disks',delta<1?'Disjoint':delta===1?'Touching':'Overlapping'),metric('Complete r interval',escaping?'[√2/2, ∞)':'['+fmt(lower)+', '+fmt(upper)+']'),metric('Optimal error for r',escaping?'∞':fmt(E,6))],escaping?'A coincident anchor at the origin serves all readings while Y grows without bound. This branch first appears at exact disk contact.':v.distinct&&delta>=1?'The disks overlap, but the added distinct-anchor condition forbids coincidence. The distinct branch stays bounded; its sharp range interval is shown.':'The shown pose uses the farthest permitted pair of actual anchors and attains the upper common range. All permitted X0 locations obey ‖X0‖ ≤ δ + 1/2.',{legend:[[C.anchor,'Nominal anchors and allowed disks'],[C.range,'Actual anchors and equal ranges'],[C.body,'Known triangle'],[C.alternate,'Fifth range · upper inequality']]});
    },
    noisy(v){
      const e=v.epsilon,T=v.height,b=v.cap,threshold=e===0?Infinity:Math.max(.5,Math.sqrt(Math.max(0,3/(2*e+e*e)-1)),Math.sqrt(Math.max(0,1/(2*e-e*e)-1))),r=Math.sqrt(T*T+1),rayOK=T>=threshold-1e-10,ok=rayOK&&(!v.capped||r<=b+1e-10);
      const a=[p(-1,0),p(1,0)],pts=[p(0,-T),p(1,-T),p(0,1-T)],s=model(p(.2,-T/2),Math.max(3,T*.65+1));anchors(s,a);triangle(s,pts,ok?C.body:C.bad);ranges(s,pts,a,ok?C.range:C.bad);
      const r10=Math.sqrt((T*T+4)/(T*T+1)),r11=T/r;
      return result(s,[metric('This ray becomes feasible at T',fmt(threshold)),metric('Current reference range r',fmt(r)),metric('Current family member',ok?'Feasible':'Rejected')],e===0?'At exact ratio equality, no finite T on this fixed-orientation ray works. This does not mean the full exact problem has no poses.':'The nontrivial ratios are '+fmt(r10,6)+' and '+fmt(r11,6)+', compared with ['+fmt(1-e)+', '+fmt(1+e)+'].'+(v.capped?' The cap allows this ray only up to T = '+fmt(Math.sqrt(Math.max(0,b*b-1)))+'.':' Beyond the threshold, increasing T preserves feasibility.'),{legend:[[C.anchor,'Exact anchors'],[ok?C.body:C.bad,ok?'Feasible family member':'Rejected family member'],[C.range,'Measured cross-ranges']],caption:'An exact test of one translated family; not a general pose solver.'});
    },
    arc(v){
      const eps=v.epsilon,l=.01-eps,u=.01+eps,R=h=>(1+h*h)/(2*h),rmin=R(u),rmax=l>0?R(l):Infinity;
      const hs=[u,l>0?l:.0005],rs=hs.map(R),finiteView=Math.min(Math.max(...rs),120),s=model(v.whole?p(0,-finiteView):p(0,0),v.whole?finiteView*1.15:1.28);
      for(let j=0;j<hs.length;j++){
        const h=hs[j],r=rs[j],center=p(0,h-r),color=j?C.alternate:C.body;
        if(v.whole){circle(s,center,r,color);point(s,center,color,'Center '+(j+1),4);}
        else{const pts=[];for(let i=0;i<=100;i++){const x=-1+2*i/100;const y=h-r+Math.sqrt(Math.max(0,r*r-x*x));pts.push(p(x,y));}path(s,pts,color,2.5);}
        point(s,p(0,h),color,j&&l<=0?'Example h = 0.0005':'h = '+fmt(h,4),4);
      }
      line(s,p(-1,0),p(1,0),C.range,2);point(s,p(-1,0),C.anchor,'Chord left',4,'square');point(s,p(1,0),C.anchor,'Chord right',4,'square');line(s,p(0,0),p(0,u),C.muted,2);
      return result(s,[metric('Allowed positive sagitta',l>0?'['+fmt(l,4)+', '+fmt(u,4)+']':'(0, '+fmt(u,4)+']'),metric('Radius interval','['+fmt(rmin,4)+', '+fmt(rmax,4)+(Number.isFinite(rmax)?']':')')),metric('Optimal radius error',fmt((rmax-rmin)/2,4))],l>0?'Two extremely similar short arcs have visibly different supporting circles. Use whole-circle view to see how a tiny sagitta interval creates a large radius interval.':'Positive sagittas can approach zero, producing arbitrarily large circles. The purple circle is one finite example, not the upper endpoint.',{legend:[[C.range,'Fixed chord of length 2'],[C.body,'Largest sagitta · smallest radius'],[C.alternate,l>0?'Smallest sagitta · largest radius':'Example near zero sagitta']],caption:v.whole?'Whole circles on the same length scale; very large circles may extend beyond the crop.':'True aspect ratio. These short arcs are almost indistinguishable at this scale.'});
    },
    dimension(v){
      const T=v.height,angle=v.angle,s=model(p(-.25,0),Math.max(2.1,T+1.2),3),a=[p(-1,0),p(1,0)],base=[p(0,-.5,T),p(0,.5,T),p(-1,-.5,T)],pts=base.map(q=>rotateX(q,angle)),rho=Math.sqrt(.25+T*T);
      line(s,p(-2,0),p(2,0),C.anchor,1.5,[4,4]);anchors(s,a);
      triangle(s,[p(0,-.5),p(0,.5),p(-1,-.5)],C.muted,false,.035);triangle(s,pts);ranges(s,pts,a);
      for(const x of [0,-1])circle(s,p(x,0),rho,C.alternate,{u:p(0,1),v:p(0,0,1),dash:[3,5]});
      return result(s,[metric('Physical rotation about anchors',fmt(angle,1)+'°'),metric('Four common squared ranges',fmt(1.25+T*T)),metric('Fifth squared range',fmt(.25+T*T))],
        'At fixed T = '+fmt(T)+', rotation changes the pose while preserving every displayed absolute range and side length. Increasing the lift T before rotation makes the common range grow. Both anchors stay fixed throughout.',
        {legend:[[C.anchor,'Fixed anchors and rotation axis'],[C.body,'Rotating rigid triangle'],[C.alternate,'Circular paths of its vertices'],[C.range,'Unchanged equal cross-ranges']],caption:'The angle slider moves the body. Dragging the view moves only the camera.'});
    },
    classes(v){
      const n=Number(v.points),s=model(p(0,0),2.2),pts=[p(-1.2,-.6),p(.75,-1.05),p(1.35,.55),p(-.4,1.2),p(.12,.17)].slice(0,n);
      for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)line(s,pts[i],pts[j],(j-i===1||i===0&&j===n-1)?C.body:C.alternate,2);
      pts.forEach((q,i)=>point(s,q,C.anchor,'P'+i,5));
      return result(s,[metric('Complete-graph edges',n*(n-1)/2),metric('Planar generic threshold','N₂(2) = 5'),metric('Known 3D bounds','6 ≤ N₂(3) ≤ 70')],n===5?'The theorem covers every nonempty two-class partition on a generic planar five-point configuration. The displayed partition is one visual example; the exact proof treats all partition orbits.':'Four points lie below the uniform generic threshold. This illustration does not assert that this particular partition and drawing admit an independent class deformation.',{legend:[[C.anchor,'Points'],[C.body,'First squared-distance class'],[C.alternate,'Second squared-distance class']],caption:'Illustrative graph; no deformation or genericity test is implied.'});
    }
  };
  window.RESEARCH_SCENES=functions;
  window.RESEARCH_MATH={fmt,ratioThreshold:e=>e===0?Infinity:Math.max(.5,Math.sqrt(Math.max(0,3/(2*e+e*e)-1)),Math.sqrt(Math.max(0,1/(2*e-e*e)-1)))};
})();
