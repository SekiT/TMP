(function(){"use strict";var G=t=>({get:e=>t.get(e),set:(e,n)=>(t.set(e,n),n)});const ut=/([^\s\\>"'=]+)\s*=\s*(['"]?)$/,Bt=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,Gt=/<[a-z][^>]+$/i,qt=/>[^<>]*$/,Xt=/<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/>)/ig,Zt=/\s+$/,pt=(t,e)=>0<e--&&(Gt.test(t[e])||!qt.test(t[e])&&pt(t,e)),Jt=(t,e,n)=>Bt.test(e)?t:`<${e}${n.replace(Zt,"")}></${e}>`;var Kt=(t,e,n)=>{const o=[],{length:s}=t;for(let r=1;r<s;r++){const l=t[r-1];o.push(ut.test(l)&&pt(t,r)?l.replace(ut,(c,a,u)=>`${e}${r-1}=${u||'"'}${a}${u?"":'"'}`):`${l}<!--${e}${r-1}-->`)}o.push(t[s-1]);const i=o.join("").trim();return n?i:i.replace(Xt,Jt)};const{isArray:q}=Array,{indexOf:Qt,slice:$t}=[],Yt=1,gt=111,Vt=({firstChild:t,lastChild:e})=>{const n=document.createRange();return n.setStartAfter(t),n.setEndAfter(e),n.deleteContents(),t},te=(t,e)=>t.nodeType===gt?1/e<0?e?Vt(t):t.lastChild:e?t.valueOf():t.firstChild:t,ee=t=>{const{childNodes:e}=t,{length:n}=e;if(n<2)return n?e[0]:t;const o=$t.call(e,0),s=o[0],i=o[n-1];return{ELEMENT_NODE:Yt,nodeType:gt,firstChild:s,lastChild:i,valueOf(){if(e.length!==n){let r=0;for(;r<n;)t.appendChild(o[r++])}return t}}};var ne=(t,e,n,o,s)=>{const i=n.length;let r=e.length,l=i,c=0,a=0,u=null;for(;c<r||a<l;)if(r===c){const $=l<i?a?o(n[a-1],-0).nextSibling:o(n[l-a],0):s;for(;a<l;)t.insertBefore(o(n[a++],1),$)}else if(l===a)for(;c<r;)(!u||!u.has(e[c]))&&t.removeChild(o(e[c],-1)),c++;else if(e[c]===n[a])c++,a++;else if(e[r-1]===n[l-1])r--,l--;else if(e[c]===n[l-1]&&n[a]===e[r-1]){const $=o(e[--r],-1).nextSibling;t.insertBefore(o(n[a++],1),o(e[c++],-1).nextSibling),t.insertBefore(o(n[--l],1),$),e[r]=n[l]}else{if(!u){u=new Map;let $=a;for(;$<l;)u.set(n[$],$++)}if(u.has(e[c])){const $=u.get(e[c]);if(a<$&&$<l){let W=c,dt=1;for(;++W<r&&W<l&&u.get(e[W])===$+dt;)dt++;if(dt>$-a){const Dn=o(e[c],0);for(;a<$;)t.insertBefore(o(n[a++],1),Dn)}else t.replaceChild(o(n[a++],1),o(e[c++],-1))}else c++}else t.removeChild(o(e[c++],-1))}return n};const oe=t=>e=>{for(const n in e){const o=n==="role"?n:`aria-${n}`,s=e[n];s==null?t.removeAttribute(o):t.setAttribute(o,s)}},se=(t,e)=>{let n,o=!0;const s=document.createAttributeNS(null,e);return i=>{n!==i&&(n=i,n==null?o||(t.removeAttributeNode(s),o=!0):(s.value=i,o&&(t.setAttributeNodeNS(s),o=!1)))}},ie=({dataset:t})=>e=>{for(const n in e){const o=e[n];o==null?delete t[n]:t[n]=o}},re=(t,e)=>{let n,o=e.slice(2);return!(e in t)&&e.toLowerCase()in t&&(o=o.toLowerCase()),s=>{const i=q(s)?s:[s,!1];n!==i[0]&&(n&&t.removeEventListener(o,n,i[1]),(n=i[0])&&t.addEventListener(o,n,i[1]))}},ae=t=>e=>{typeof e=="function"?e(t):e.current=t},ce=(t,e)=>n=>{t[e]=n},le=t=>{let e;return n=>{e!=n&&(e=n,t.textContent=n==null?"":n)}};/*! (c) Andrea Giammarchi - ISC */var ht=function(t){var e="fragment",n="template",o="content"in r(n),s=o?function(c){var a=r(n);return a.innerHTML=c,a.content}:function(c){var a=r(e),u=r(n),$=null;if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(c)){var W=RegExp.$1;u.innerHTML="<table>"+c+"</table>",$=u.querySelectorAll(W)}else u.innerHTML=c,$=u.childNodes;return i(a,$),a};return function(a,u){return(u==="svg"?l:s)(a)};function i(c,a){for(var u=a.length;u--;)c.appendChild(a[0])}function r(c){return c===e?t.createDocumentFragment():t.createElementNS("http://www.w3.org/1999/xhtml",c)}function l(c){var a=r(e),u=r("div");return u.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+c+"</svg>",i(a,u.firstChild.childNodes),a}}(document);const de=({childNodes:t},e)=>t[e],X=t=>{const e=[];let{parentNode:n}=t;for(;n;)e.push(Qt.call(n.childNodes,t)),t=n,n=t.parentNode;return e},{createTreeWalker:mt,importNode:Z}=document,ft=Z.length!=1,ue=ft?(t,e,n)=>Z.call(document,ht(t,e,n),!0):ht,pe=ft?t=>mt.call(document,t,1|128,null,!1):t=>mt.call(document,t,1|128),M=(t,e,n)=>ne(t.parentNode,e,n,te,t),$e=t=>{let e,n,o=[];const s=i=>{switch(typeof i){case"string":case"number":case"boolean":e!==i&&(e=i,n?n.textContent=i:n=document.createTextNode(i),o=M(t,o,[n]));break;case"object":case"undefined":if(i==null){e!=i&&(e=i,o=M(t,o,[]));break}if(q(i)){e=i,i.length===0?o=M(t,o,[]):typeof i[0]=="object"?o=M(t,o,i):s(String(i));break}"ELEMENT_NODE"in i&&e!==i&&(e=i,o=M(t,o,i.nodeType===11?$t.call(i.childNodes):[i]))}};return s},ge=(t,e)=>e==="ref"?ae(t):e==="aria"?oe(t):e===".dataset"?ie(t):e.slice(0,1)==="."?ce(t,e.slice(1)):e.slice(0,2)==="on"?re(t,e):se(t,e);function he(t){const{type:e,path:n}=t,o=n.reduceRight(de,this);return e==="node"?$e(o):e==="attr"?ge(o,t.name):le(o)}const C="is\xB5",xt=G(new WeakMap),me=/^(?:plaintext|script|style|textarea|title|xmp)$/i,E=()=>({stack:[],entry:null,wire:null}),fe=(t,e)=>{const{content:n,updates:o}=be(t,e);return{type:t,template:e,content:n,updates:o,wire:null}},xe=(t,e)=>{const n=Kt(e,C,t==="svg"),o=ue(n,t),s=pe(o),i=[],r=e.length-1;let l=0,c=`${C}${l}`;for(;l<r;){const a=s.nextNode();if(!a)throw`bad template: ${n}`;if(a.nodeType===8)a.textContent===c&&(i.push({type:"node",path:X(a)}),c=`${C}${++l}`);else{for(;a.hasAttribute(c);)i.push({type:"attr",path:X(a),name:a.getAttribute(c)}),a.removeAttribute(c),c=`${C}${++l}`;me.test(a.tagName)&&a.textContent.trim()===`<!--${c}-->`&&(a.textContent="",i.push({type:"text",path:X(a)}),c=`${C}${++l}`)}}return{content:o,nodes:i}},be=(t,e)=>{const{content:n,nodes:o}=xt.get(e)||xt.set(e,xe(t,e)),s=Z.call(document,n,!0),i=o.map(he,s);return{content:s,updates:i}},H=(t,{type:e,template:n,values:o})=>{const{length:s}=o;bt(t,o,s);let{entry:i}=t;(!i||i.template!==n||i.type!==e)&&(t.entry=i=fe(e,n));const{content:r,updates:l,wire:c}=i;for(let a=0;a<s;a++)l[a](o[a]);return c||(i.wire=ee(r))},bt=({stack:t},e,n)=>{for(let o=0;o<n;o++){const s=e[o];s instanceof J?e[o]=H(t[o]||(t[o]=E()),s):q(s)?bt(t[o]||(t[o]=E()),s,s.length):t[o]=null}n<t.length&&t.splice(n)};function J(t,e,n){this.type=t,this.template=e,this.values=n}const{create:ye,defineProperties:Se}=Object,yt=t=>{const e=G(new WeakMap),n=o=>(s,...i)=>H(o,{type:t,template:s,values:i});return Se((o,...s)=>new J(t,o,s),{for:{value(o,s){const i=e.get(o)||e.set(o,ye(null));return i[s]||(i[s]=n(E()))}},node:{value:(o,...s)=>H(E(),{type:t,template:o,values:s}).valueOf()}})},St=G(new WeakMap),we=(t,e)=>{const n=typeof e=="function"?e():e,o=St.get(t)||St.set(t,E()),s=n instanceof J?H(o,n):n;return s!==o.wire&&(o.wire=s,t.textContent="",t.appendChild(s.valueOf())),t},ve=yt("html");yt("svg");var m={uhtml:{render:we,html:ve},globals:{now:Date.now,window,setTimeout,random:Math.random,DocumentFragment}};const{now:wt,setTimeout:Ae}=m.globals,vt=1e3/60,At=(t,e)=>{const n=wt(),o=t();Ae(()=>{const s=wt()<n+vt?e+1:Math.max(e-1,1);At(o,s)},e)},Tt=32,I=32,Te=1/5,K=1/15,Mt=1/15,Ct=45,Q=30;var U=t=>{let e=t;const n=new Map;return{next:o=>{e=o(e),n.forEach(s=>s(e))},subscribe:o=>{o(e);const s={};return n.set(s,o),s},unsubscribe:o=>n.delete(o)}};const{random:Me}=m.globals,f=()=>[...Array(10)].map(()=>Math.round(Me())),Y=U(f()),Ce=t=>{Y.next(e=>e.map((n,o)=>{const s=t[o];return n===s?n:Math.min(Math.max(n-Mt,s),n+Mt)}))},{window:V}=m.globals,Et=()=>({width:V.innerWidth,height:V.innerHeight}),x=U(Et());V.addEventListener("resize",()=>x.next(Et));var It=Object.assign;const{render:Ee,html:Ie}=m.uhtml,{DocumentFragment:Ne}=m.globals,g=(t,e)=>{const n=new Ne,o=i=>Ee(n,e(Ie)(i));let s=t;return{render:()=>o(s),update:i=>{s=It(It({},s),i(s)),o(s)}}},Oe=t=>t.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`),p=t=>Object.entries(t).reduce((e,[n,o])=>`${e}${Oe(n)}:${o};`,"");var ke=Object.assign;const Re=t=>g({bit:t,cellWidth:0},e=>({bit:n,cellWidth:o})=>{const s=255*n,i=255-s,r=p({display:"inline-block",width:`${o}px`,height:`${o}px`,lineHeight:`${o}px`,fontSize:`${o}px`,textAlign:"center",backgroundColor:`rgb(${s},${s},${s})`,color:`rgb(${i},${i},${i})`});return e`<div style=${r}>${n<.5?0:1}</div>`});var N=()=>{const t={tape:f(),style:{},cellWidth:0},e=t.tape.map(n=>Re(n));return g(t,n=>({tape:o,style:s,cellWidth:i})=>{const r=p(ke({width:`${i*10}px`,height:`${i}px`},s));return e.forEach((l,c)=>l.update(()=>({cellWidth:i,bit:o[c]}))),n`<div style=${r}>${e.map(l=>l.render())}</div>`})};const tt=N(),et=g({position:0},t=>({position:e,cellWidth:n})=>{const o=p({position:"absolute",top:"30%",left:"50%",transform:`translate(${n*(-.5-e)}px, 0)`});return tt.update(()=>({cellWidth:n})),t`<div style=${o}>${tt.render()}</div>`});x.subscribe(({width:t,height:e})=>{const n=Math.min(t*.15,e*.3);et.update(()=>({cellWidth:n}))}),Y.subscribe(t=>tt.update(()=>({tape:t})));var w=Object.assign;const _e={state:0,cellWidth:0},Le=t=>"E01234AH"[t+1],y=g(_e,t=>({state:e,cellWidth:n})=>{const o=n/16,s=p({position:"absolute",top:"30%",left:"50%",transform:`translate(-${n/2+o}px, 0)`}),i={position:"absolute",height:`${n}px`,background:"radial-gradient(#aaa, #666)"},r=w(w({},i),{width:`${o*2}px`,borderRadius:`${o}px ${o}px 0 0`}),l=p(w(w({},i),{top:`${n}px`,width:`${n+o*2}px`,borderRadius:`0 0 ${o}px ${o}px`,fontSize:`${n*.8}px`,lineHeight:`${n}px`,textAlign:"center",color:"white"}));return t`<div style=${s}>    <div style=${p(r)} />    <div style=${p(w(w({},r),{left:`${n}px`}))} />    <div style=${l}>${Le(e)}</div>  </div>`});x.subscribe(({width:t,height:e})=>{const n=Math.min(t*.15,e*.3);y.update(()=>({cellWidth:n}))});const nt=N(),ot=N(),Nt=t=>nt.update(()=>({tape:t})),Pe={fontSize:10},je=p({position:"absolute",top:"3%",width:"100%",fontFamily:"serif",color:"white"}),We=t=>p({margin:"0 auto",fontSize:`${t}px`,lineHeight:`${t}px`}),Ot=g(Pe,t=>({fontSize:e})=>t`<div style=${je}>  <table style=${We(e)}>    <tr><td>ORDER:</td><td>${nt.render()}</td></tr>    <tr><td>TAPE:</td><td>${ot.render()}</td></tr>  </table></div>`);x.subscribe(({width:t,height:e})=>{const n=Math.min(t*.05,e*.07);Ot.update(()=>({fontSize:n*.6})),nt.update(()=>({cellWidth:n})),ot.update(()=>({cellWidth:n}))}),Y.subscribe(t=>ot.update(()=>({tape:t})));const He={number:1,timeLeft:0,score:0,fontSize:0},Ue=t=>p({position:"absolute",top:"1%",left:"1%",fontSize:`${t}px`,color:"white",fontFamily:"serif"}),ze=t=>p({fontSize:`${t*.7}px`}),De=t=>p({position:"absolute",bottom:"1%",left:"1%",fontSize:`${t}px`,color:"white",fontFamily:"serif"}),st=t=>[...t.toString()].reduceRight(([e,n],o)=>e.length===3?[o,`,${e}${n}`]:[`${o}${e}`,n],["",""]).join``,kt=t=>(t*100|0).toString().padStart(4,"0").replace(/^(..)(..)/,"$1.$2"),v=g(He,t=>({number:e,timeLeft:n,score:o,fontSize:s})=>t`  <div style=${Ue(s)}>    No.${e}<span style=${ze(s)}>/${Tt}</span><br>    ${kt(n)}  </div>  <div style=${De(s)}>Score: ${st(o)}</div>`);x.subscribe(({width:t,height:e})=>{v.update(()=>({fontSize:Math.min(t*.05,e*.07)*.6}))});const O=[...Array(10)].map((t,e)=>({direction:1,nextChar:e&1,nextState:e>>1})),A=U(O),it=(t,e)=>A.next(n=>[...n.slice(0,t),e(n[t]),...n.slice(t+1)]),Rt=U([]),k=t=>Rt.next(e=>[...e,t]),R=()=>{let t;return Rt.next(([e,...n])=>(t=e,n)),t},h={reset:{},halt:{},pass:{},run:{},goNext:{}};var T=Object.assign;const Fe=(t,e)=>({state0:t,char0:e,direction:1,char1:e,state1:t,disabled:!1}),Be=p({display:"inline-block",margin:"1% 1%",textAlign:"center",whiteSpace:"nowrap"}),Ge=t=>t<0?"L":"R",qe=["0","1","2","3","4","A"],Xe=(t,e)=>()=>{it(t,n=>T(T({},n),{direction:-e}))},Ze=(t,e)=>()=>{it(t,n=>T(T({},n),{nextChar:1-e}))},Je=(t,e)=>()=>{it(t,n=>T(T({},n),{nextState:(e+1)%6}))};var Ke=t=>g(Fe(t>>1,t&0),e=>({state0:n,char0:o,direction:s,char1:i,state1:r,disabled:l})=>e`<div style=${Be}>${`<${n},${o},`}<button onclick=${Xe(t,s)} .disabled=${l}>${Ge(s)}</button>${","}<button onclick=${Ze(t,i)} .disabled=${l}>${i}</button>${","}<button onclick=${Je(t,r)} .disabled=${l}>${qe[r]}</button>${">"}</div>`),Qe=Object.assign;const Ye={fontSize:0,style:{display:"none"},disabled:!0},rt=[...Array(10)].map((t,e)=>Ke(e)),Ve=(t,e)=>p(Qe({position:"absolute",top:"29%",left:"50%",transform:"translate(-50%, 0)",width:`${t*20}px`,padding:"5px 0 10px 0",textAlign:"center",fontSize:`${t}px`,lineHeight:`${t}px`,border:"1px solid #999",backgroundColor:"rgba(51, 51, 153, 0.8)",color:"white",fontFamily:"Courier New"},e)),tn=p({marginBottom:"10px"}),en=t=>{const e=`${t*1.3}px`;return p({height:e,marginTop:"0.1em",padding:"0 1em",fontSize:e,lineHeight:e,borderRadius:`${t*.15}px`})},_=g(Ye,(({onClickRunButton:t})=>e=>({fontSize:n,style:o,disabled:s})=>(rt.forEach(i=>i.update(()=>({disabled:s}))),e`<div style=${Ve(n,o)}>    <span style=${tn}>Program</span>    <div>${rt.map(i=>i.render())}</div>    <button      style=${en(n)}      .disabled=${s}      onclick=${t}>RUN</button>  </div>`))({onClickRunButton:()=>{k(h.run),_.update(()=>({disabled:!0}))}}));x.subscribe(({width:t,height:e})=>{_.update(()=>({fontSize:Math.min(t*.04,e*.06)}))}),A.subscribe(t=>{t.forEach(({direction:e,nextChar:n,nextState:o},s)=>rt[s].update(()=>({state0:s>>1,char0:s&1,direction:e,char1:n,state1:o})))});const nn={running:!1,disabled:!0,fontSize:0,height:0},on=p({display:"table-cell",position:"absolute",top:"19%",width:"100%",height:"10%",textAlign:"center",verticalAlign:"middle",fontFamily:"Courier New"}),_t=(t,e)=>p({margin:`${(e-t)/2}px 0.5em`,width:`${t*5}px`,height:`${t}px`,fontSize:`${t}px`,borderRadius:t*.15}),sn=()=>k(h.reset),rn=()=>k(h.halt),an=()=>k(h.pass),z=g(nn,t=>({running:e,disabled:n,fontSize:o,height:s})=>t`<div style=${on}>  <button    style=${_t(o,s)}    onclick=${e?rn:sn}    .disabled=${n}>${e?"HALT":"RESET"}</button>  <button    style=${_t(o,s)}    onclick=${an}    .disabled=${n||e}>PASS</button></div>`);x.subscribe(({width:t,height:e})=>{z.update(()=>({fontSize:Math.min(t*.05,e*.065),height:e*.1}))});const cn=t=>p({display:t===0?"none":"block",position:"absolute",top:0,left:0,width:"100%",height:"100%",backgroundColor:"rgba(0, 0, 0, 0.6)",opacity:t}),ln=()=>k(h.goNext);var S=g({opacity:0},t=>({opacity:e})=>t`<div style=${cn(e)} onclick=${ln}></div>`);const b={pass:{},solved:{},timeup:{}},dn={type:b.pass,commandsSaved:0,accepted:!1,steps:0,timeLeft:0,opacity:0,fontSize:0},un=t=>p({display:t===0?"none":"block",position:"absolute",top:"10%",width:"100%",textAlign:"center",color:"white",opacity:t,filter:"drop-shadow(0 0 0.3rem black)"}),pn=new Map([[b.pass,"#ccc"],[b.solved,"#cfc"],[b.timeup,"#ccf"]]),$n=(t,e)=>p({color:pn.get(t),fontSize:`${e}px`}),gn=new Map([[b.pass,"Pass"],[b.solved,"Solved!"],[b.timeup,"Time's up."]]),hn=t=>p({display:"inline-block",margin:`${t}px 0`,fontSize:`${t}px`,color:"white"}),mn=t=>p({fontSize:`${t}px`}),Lt=(t,e,n,o)=>(t+(e?1:0))*100*n*.1*(o/I)*3|0,L=g(dn,t=>({type:e,commandsSaved:n,accepted:o,steps:s,timeLeft:i,opacity:r,fontSize:l})=>t`<div style=${un(r)}>  <div style=${$n(e,l*1.3)}>${gn.get(e)}</div>  <table style=${hn(l)}>    <tr>      <td>Saved + accepted</td>      <td />      <td>Steps</td>      <td />      <td>Time left</td>    </tr>    <tr>      <td>((${n} + ${o?1:0}) &times; 100)</td>      <td>&times;</td>      <td>(${s} &times; 0.1)</td>      <td>&times;</td>      <td>(${kt(i)} / ${I}.00 &times; 3)</td>    </tr>  </table>  <div style=${mn(l)}>Score: +${st(Lt(n,o,s,i))}</div></div>`);x.subscribe(({width:t,height:e})=>{L.update(()=>({fontSize:Math.min(t*.04,e*.06)}))});const fn={finished:!1,order:Array(10).fill(0),tape:Array(10).fill(0),score:0,opacity:0,fontSize:0},xn=(t,e)=>p({display:t===0?"none":"block",position:"absolute",top:"10%",width:"100%",fontSize:`${e}px`,lineHeight:`${e}px`,textAlign:"center",color:"white",opacity:t,filter:"drop-shadow(0 0 0.3rem black)"}),bn=(t,e)=>p({marginBottom:`${e}px`,fontSize:`${e}px`,color:t?"#fc9":"#c99"}),at=N(),ct=N(),yn={display:"inline-block"};[at,ct].forEach(t=>t.update(()=>({style:yn})));const Sn=t=>p({fontSize:`${t}px`,marginTop:`${t}px`}),D=g(fn,t=>({finished:e,caseNumber:n,order:o,tape:s,score:i,opacity:r,fontSize:l})=>(at.update(()=>({tape:o,cellWidth:l})),ct.update(()=>({tape:s,cellWidth:l})),t`<div style=${xn(r,l)}>    <div style=${bn(e,l*1.3)}>${e?"Finished!":"Game Over"}</div>    <div style=${`display:${e?"none":"block"}`}>${e?"":`at No.${n}`}</div>    ${e?"":at.render()}<br>${e?"":ct.render()}<br>    <div style=${Sn(l)}>Total score: ${st(i)}</div>  </div>`));x.subscribe(({width:t,height:e})=>{D.update(()=>({fontSize:Math.min(t*.04,e*.06)}))});const wn={opacity:0,fontSize:0},vn=t=>p({display:t===0?"none":"block",position:"absolute",width:"100%",top:"30%",textAlign:"center",color:"white",opacity:t}),An=t=>p({fontSize:`${t}px`,color:"orange"}),P=g(wn,t=>({opacity:e,fontSize:n})=>t`<div style=${vn(e)}>    <div style=${An(n)}>TMP</div>  </div>`);x.subscribe(({width:t,height:e})=>{P.update(()=>({fontSize:Math.min(t*.04,e*.6)*3}))});var d={title:{title:{}},main:{programWindowOpening:{},programming:{},programWindowClosing:{},running:{}},result:{caseResult:{},totalResult:{}}};const{now:Tn}=m.globals,Pt=({startedAt:t})=>{const e=Math.max(I-(Tn()-t)/1e3,0);v.update(()=>({timeLeft:e}))},Mn=(t,e)=>{const n=e-t,o=n*Te;return K<Math.abs(o)?t+o:t+Math.min(Math.max(-K,n),K)},j=({currentTape:t,position:e})=>{Ce(t),et.update(({position:n})=>({position:Mn(n,e)}))},jt=(t,e)=>{const n=Math.max((1-t/20)*50,0),o=Math.min((1+t/20)*50,100),s=Math.min(Math.max((t-30)/10,0)*87+13,100),i=`polygon(${n}% 0, ${o}% 0, ${o}% ${s}%, ${n}% ${s}%)`;_.update(()=>({style:{clipPath:i},disabled:e}))},{now:Cn,random:lt}=m.globals;var Wt=(t=0,e=0)=>({currentTape:n,position:o,machineState:s})=>{if(t===0){const r=f();return Nt(r),v.update(()=>({number:1,timeLeft:I,score:0})),S.update(()=>({opacity:1})),{nextId:d.title.title,nextArgs:[1],stateUpdate:{position:0,machineState:0,order:r,currentTape:f()}}}if(j({currentTape:n,position:o}),y.update(()=>({state:s})),t<30)return P.update(()=>({opacity:t/30})),{nextId:d.title.title,nextArgs:[t+1]};if(t===30)return{nextId:d.title.title,nextArgs:[R()===h.goNext?31:30,(e+1)%Q],stateUpdate:e===0?{currentTape:[...n.slice(0,o),Math.round(lt()),...n.slice(o+1,10)],position:{0:1,9:8}[o]||o+(lt()<.5?-1:1),machineState:Math.floor(lt()*5)}:{}};if(t<50){const r=(50-t)/20;return P.update(()=>({opacity:r})),S.update(()=>({opacity:r})),{nextId:d.title.title,nextArgs:[t+1]}}P.update(()=>({opacity:0})),S.update(()=>({opacity:0})),A.next(()=>O);const i=f();return{nextId:d.main.programWindowOpening,nextArgs:[0],stateUpdate:{caseNumber:1,score:0,order:f(),originalTape:i,currentTape:i,position:0,machinState:0,executedIndices:new Map,startedAt:Cn()}}},Ht=Object.assign;const{now:En}=m.globals,Ut=(t,e,n)=>({type:t,time:0,accepted:e,timeLeft:n}),In=(t,e)=>(t*6+e)/7|0,Nn=t=>({executedIndices:e,steps:n,caseNumber:o,score:s})=>{const{time:i,type:r,accepted:l,timeLeft:c}=t;S.update(()=>({opacity:Math.min(i/10,1)})),L.update(()=>({opacity:Math.min(Math.max(0,(i-10)/30),1)})),i===0&&(L.update(()=>({type:r,commandsSaved:10-e.size,accepted:l,steps:n,timeLeft:c})),_.update(()=>({disabled:!0}))),v.update(({score:u})=>({score:i===40?s:In(u,s)}));const a=R();if(i>=40&&a===h.goNext){if(L.update(()=>({opacity:0})),o===Tt)return{nextId:d.result.totalResult,nextArgs:[!0,0]};const u=o+1;v.update(()=>({number:u}));const $=f();return S.update(()=>({opacity:0})),A.next(()=>O),y.update(()=>({state:0})),{nextId:d.main.programWindowOpening,nextArgs:[0],stateUpdate:{caseNumber:u,order:f(),originalTape:$,currentTape:$,position:0,machineState:0,executedIndices:new Map,startedAt:En()}}}return{nextId:d.result.caseResult,nextArgs:[Ht(Ht({},t),{time:i+1})],stateUpdate:i===0?{score:s+Lt(10-e.size,l,n,c)}:{}}},On=(t,e)=>({order:n,originalTape:o,score:s,caseNumber:i})=>{const r=R();return e<=40?(S.update(()=>({opacity:Math.min(e/10,1)})),D.update(()=>({opacity:Math.max(0,(e-10)/30),finished:t,score:s,caseNumber:i,order:n,tape:o})),{nextId:d.result.totalResult,nextArgs:[t,e+1]}):e===41?{nextId:d.result.totalResult,nextArgs:[t,r===h.goNext?42:41]}:e<=61?(D.update(()=>({opacity:(61-e)/20})),{nextId:d.result.totalResult,nextArgs:[t,e+1]}):{nextId:d.title.title,nextArgs:[0]}},{now:F}=m.globals,B=(t,e)=>Math.max(I-(t-e)/1e3,0),kn=t=>e=>{Nt(e.order);const n=t<Ct;return jt(t,n),j(e),z.update(()=>({running:!1,disabled:n})),Pt(e),n?{nextId:d.main.programWindowOpening,nextArgs:[t+1]}:{nextId:d.main.programming,nextArgs:[]}},Rn=()=>t=>{j(t),Pt(t);const e=R();return e===h.run?(y.update(()=>({state:0})),{nextId:d.main.programWindowClosing,nextArgs:[Ct],stateUpdate:{currentTape:t.originalTape,machineState:0,position:0,runAt:F()}}):(e===h.reset&&A.next(()=>O),e===h.pass?{nextId:d.result.caseResult,nextArgs:[Ut(b.pass,!1,B(F(),t.startedAt))],stateUpdate:{steps:0}}:{nextId:d.main.programming,nextArgs:[],stateUpdate:e===h.reset?{currentTape:t.originalTape,machineState:0,position:0}:{}})},_n=t=>e=>(jt(t,!0),j(e),z.update(()=>({running:t===0,disabled:t>0})),t===0?{nextId:d.main.running,nextArgs:[0],stateUpdate:{steps:0,executedIndices:new Set}}:{nextId:d.main.programWindowClosing,nextArgs:[t-1]});let zt=O;A.subscribe(t=>{zt=t});const Ln=({currentTape:t,position:e,machineState:n,steps:o,executedIndices:s})=>{const i=n<<1|t[e],{direction:r,nextChar:l,nextState:c}=zt[i];return{currentTape:[...t.slice(0,e),l,...t.slice(e+1)],position:e+r,machineState:c,steps:o+1,executedIndices:new Set([...s,i])}},Pn=t=>e=>{const{position:n,machineState:o,startedAt:s,runAt:i,order:r,currentTape:l}=e;if(R()===h.halt)return y.update(()=>({state:6})),B(F(),s)>0?{nextId:d.main.programWindowOpening,nextArgs:[0]}:{nextId:d.result.totalResult,nextArgs:[!1,0]};j(e);const c=n<0||n>=10?-1:o;if([-1,5].includes(c)&&t===Q){if(y.update(()=>({state:c})),r.join``===l.join``){const a=B(i,s),u=a>0?b.solved:b.timeup;return{nextId:d.result.caseResult,nextArgs:[Ut(u,c===5,a)]}}return B(F(),s)>0?{nextId:d.main.programWindowOpening,nextArgs:[0],stateUpdate:{machineState:c}}:{nextId:d.result.totalResult,nextArgs:[!1,0]}}return y.update(()=>({state:o})),{nextId:d.main.running,nextArgs:[t===Q?0:t+1],stateUpdate:t===0?Ln(e):{}}};var Dt=Object.assign;const{now:jn}=m.globals,Wn=new Map([[d.title.title,Wt],[d.main.programWindowOpening,kn],[d.main.programming,Rn],[d.main.programWindowClosing,_n],[d.main.running,Pn],[d.result.caseResult,Nn],[d.result.totalResult,On]]),Hn=(t,e)=>({score:0,caseNumber:1,order:t,originalTape:e,currentTape:e,position:0,machineState:0,startedAt:jn(),runAt:null,steps:0,executedIndices:new Set}),Ft=(t,e)=>()=>{const{nextId:n,nextArgs:o,stateUpdate:s}=t(e);return Ft(Wn.get(n)(...o),Dt(Dt({},e),s))},{render:Un,html:zn}=m.uhtml;Un(document.getElementById("root"),zn`${[v,Ot,et,y,z,_,S,L,D,P].map(t=>t.render())}`),At(Ft(Wt(0),Hn(f(),f())),vt)})();
