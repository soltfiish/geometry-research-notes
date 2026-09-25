/* Small, dependency-free orthographic 3D renderer. Coordinates remain mathematical. */
(() => {
  'use strict';
  const C = {anchor:'#6ee7f5',body:'#72e0aa',alternate:'#bca6ff',range:'#ffd080',bad:'#ff9298',muted:'#68859d',text:'#e0ecf5',grid:'#263c50'};
  const V = {add:(a,b)=>a.map((v,i)=>v+b[i]),sub:(a,b)=>a.map((v,i)=>v-b[i]),mul:(a,t)=>a.map(v=>v*t),dot:(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0),norm:a=>Math.hypot(...a)};
  function model(center=[0,0,0],radius=3,dimension=2){return {center,radius,dimension,items:[],axes:true};}
  function point(s,p,color=C.body,label='',size=5,shape='circle'){s.items.push({type:'point',p,color,label,size,shape});}
  function line(s,a,b,color=C.muted,width=1.5,dash=[]){s.items.push({type:'line',points:[a,b],color,width,dash});}
  function path(s,points,color=C.muted,width=1.5,dash=[],closed=false){s.items.push({type:'line',points,color,width,dash,closed});}
  function face(s,points,color=C.body,alpha=.1){s.items.push({type:'face',points,color,alpha});}
  function label(s,p,text,color=C.text){s.items.push({type:'label',p,label:text,color});}
  function circle(s,c,r,color=C.muted,opts={}){
    if(r<=0)return;
    const u=opts.u||[1,0,0],v=opts.v||[0,1,0],pts=[];
    for(let i=0;i<97;i++){const a=i*2*Math.PI/96;pts.push(c.map((x,k)=>x+r*(Math.cos(a)*u[k]+Math.sin(a)*v[k])));}
    if(opts.fill)face(s,pts,color,opts.fill);
    path(s,pts,color,opts.width||1.2,opts.dash||[]);
  }
  function sphere(s,c,r,color=C.muted,alpha=.45){
    if(r<=0)return;
    for(let i=0;i<6;i++){const a=i*Math.PI/6;circle(s,c,r,color,{u:[Math.cos(a),Math.sin(a),0],v:[0,0,1],width:.8});}
    for(let i=-2;i<=2;i++){const z=r*i/3;circle(s,[c[0],c[1],c[2]+z],Math.sqrt(r*r-z*z),color,{width:.8});}
  }
  function triangle(s,pts,color=C.body,labels=true,opacity=.12){
    face(s,pts,color,opacity);path(s,pts,color,2.5,[],true);
    pts.forEach((p,i)=>point(s,p,color,labels?'X'+i:'',4));
  }
  class Viewer {
    constructor(canvas,onView){
      this.canvas=canvas;this.ctx=canvas.getContext('2d');this.scene=model();this.yaw=0;this.elev=Math.PI/2;this.zoom=1;this.onView=onView;
      this.drag=null;this.renderedFrames=0;
      canvas.addEventListener('pointerdown',e=>{this.drag={x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);});
      canvas.addEventListener('pointermove',e=>{if(!this.drag)return;this.yaw-=(e.clientX-this.drag.x)*.007;this.elev=Math.max(-1.5,Math.min(1.56,this.elev+(e.clientY-this.drag.y)*.007));this.drag={x:e.clientX,y:e.clientY};this.draw();if(onView)onView('orbit');});
      for(const name of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(name,()=>this.drag=null);
      canvas.addEventListener('wheel',e=>{e.preventDefault();this.zoom=Math.max(.35,Math.min(12,this.zoom*Math.exp(-e.deltaY*.001)));this.draw();},{passive:false});
      this.ro=new ResizeObserver(()=>this.draw());this.ro.observe(canvas);
    }
    setScene(s,reset=false){this.scene=s;if(reset){this.zoom=1;this.view(s.dimension===3?'orbit':'plane');}else this.draw();}
    view(mode){if(mode==='plane'){this.yaw=0;this.elev=Math.PI/2;}else if(mode==='orbit'){this.yaw=-.55;this.elev=.66;}else{this.zoom=1;this.yaw=this.scene.dimension===3?-.55:0;this.elev=this.scene.dimension===3?.66:Math.PI/2;}this.draw();if(this.onView)this.onView(Math.abs(this.elev-Math.PI/2)<.001?'plane':'orbit');}
    draw(){
      const cv=this.canvas,ctx=this.ctx,w=cv.clientWidth,h=cv.clientHeight;if(!w||!h)return;
      const dpr=Math.min(window.devicePixelRatio||1,2);if(cv.width!==Math.round(w*dpr)||cv.height!==Math.round(h*dpr)){cv.width=Math.round(w*dpr);cv.height=Math.round(h*dpr);}
      ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);ctx.fillStyle='#0c1c2c';ctx.fillRect(0,0,w,h);
      const s=this.scene,cy=Math.cos(this.yaw),sy=Math.sin(this.yaw),ce=Math.cos(this.elev),se=Math.sin(this.elev);
      const right=[cy,sy,0],up=[-sy*se,cy*se,ce],dep=[sy*ce,-cy*ce,se];
      const scale=Math.min(w-72,h-66)/(2*s.radius)*this.zoom;
      const project=p=>{const a=V.sub(p,s.center);return [w/2+V.dot(a,right)*scale,h/2-V.dot(a,up)*scale,V.dot(a,dep)];};
      this.project=project;this.scale=scale;
      const items=[...s.items];
      if(s.axes){
        const extent=s.radius*1.12,power=10**Math.floor(Math.log10(s.radius)),step=(s.radius/power>4?2:s.radius/power<1.7?.5:1)*power;
        const xmin=s.center[0]-extent,xmax=s.center[0]+extent,ymin=s.center[1]-extent,ymax=s.center[1]+extent;
        for(let x=Math.ceil(xmin/step)*step;x<=xmax;x+=step)items.unshift({type:'line',points:[[x,ymin,0],[x,ymax,0]],color:C.grid,width:.6});
        for(let y=Math.ceil(ymin/step)*step;y<=ymax;y+=step)items.unshift({type:'line',points:[[xmin,y,0],[xmax,y,0]],color:C.grid,width:.6});
        if(ymin<=0&&ymax>=0){items.push({type:'line',points:[[xmin,0,0],[xmax,0,0]],color:C.muted,width:1});items.push({type:'label',p:[xmax*.96,0,0],label:'x',color:C.muted});}
        if(xmin<=0&&xmax>=0){items.push({type:'line',points:[[0,ymin,0],[0,ymax,0]],color:C.muted,width:1});items.push({type:'label',p:[0,ymax*.96,0],label:'y',color:C.muted});}
        if(s.dimension===3){items.push({type:'line',points:[[0,0,-extent],[0,0,extent]],color:C.muted,width:1});items.push({type:'label',p:[0,0,extent],label:'z',color:C.muted});}
        s.gridStep=step;
      }
      const drawables=items.filter(it=>it.type!=='label').map(it=>({...it,projected:it.p?[project(it.p)]:it.points.map(project)}));
      drawables.sort((a,b)=>a.projected.reduce((t,p)=>t+p[2],0)/a.projected.length-b.projected.reduce((t,p)=>t+p[2],0)/b.projected.length);
      const labels=[];
      ctx.save();ctx.beginPath();ctx.rect(4,4,w-8,h-8);ctx.clip();
      for(const it of drawables){
        const pts=it.projected;ctx.globalAlpha=it.alpha===undefined?1:it.alpha;ctx.strokeStyle=it.color;ctx.fillStyle=it.color;ctx.lineWidth=it.width||1;ctx.setLineDash(it.dash||[]);
        if(it.type==='point'){
          const [x,y]=pts[0];if(x<0||x>w||y<0||y>h)continue;ctx.beginPath();
          if(it.shape==='square')ctx.rect(x-it.size,y-it.size,it.size*2,it.size*2);else if(it.shape==='cross'){ctx.moveTo(x-it.size,y-it.size);ctx.lineTo(x+it.size,y+it.size);ctx.moveTo(x+it.size,y-it.size);ctx.lineTo(x-it.size,y+it.size);ctx.lineWidth=2;}else ctx.arc(x,y,it.size,0,2*Math.PI);
          if(it.shape==='cross')ctx.stroke();else{ctx.fill();if(it.size>3){ctx.strokeStyle='#0c1c2c';ctx.lineWidth=1.5;ctx.stroke();}}
          if(it.label)labels.push({p:pts[0],label:it.label,color:it.color});
        }else{
          ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));if(it.closed||it.type==='face')ctx.closePath();if(it.type==='face')ctx.fill();else ctx.stroke();
        }
      }
      ctx.restore();ctx.globalAlpha=1;ctx.setLineDash([]);
      for(const it of items.filter(it=>it.type==='label'))labels.push({...it,p:project(it.p)});
      ctx.font='12px "Segoe UI",Arial,sans-serif';ctx.textBaseline='middle';const boxes=[];
      for(const it of labels){
        const [x,y]=it.p;if(x<0||x>w||y<0||y>h)continue;const tw=ctx.measureText(it.label).width;
        const offsets=[[9,-12],[9,14],[-tw-9,-12],[-tw-9,14],[9,-29],[-tw/2,29],[9,31]];
        let chosen=null;for(const [dx,dy] of offsets){const b={x:Math.max(8,Math.min(w-tw-8,x+dx)),y:Math.max(14,Math.min(h-16,y+dy)),w:tw,h:16};if(!boxes.some(q=>b.x<q.x+q.w+5&&b.x+b.w+5>q.x&&Math.abs(b.y-q.y)<17)){chosen=b;break;}}
        if(!chosen)continue;boxes.push(chosen);ctx.fillStyle='#0c1c2ce8';ctx.fillRect(chosen.x-3,chosen.y-8,tw+6,16);ctx.fillStyle=it.color||C.text;ctx.fillText(it.label,chosen.x,chosen.y);
      }
      ctx.fillStyle='#a2bbcf';ctx.font='12px "Segoe UI",Arial,sans-serif';ctx.textBaseline='bottom';
      if(s.axes)ctx.fillText('Grid: '+Number(s.gridStep.toPrecision(3))+' length units',13,h-10);
      this.renderedFrames++;
    }
  }
  window.Geometry={C,V,model,point,line,path,face,label,circle,sphere,triangle,Viewer};
})();
