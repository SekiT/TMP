(function(){"use strict";var G=t=>({get:e=>t.get(e),set:(e,n)=>(t.set(e,n),n)});const $t=/([^\s\\>"'=]+)\s*=\s*(['"]?)$/,de=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,pe=/<[a-z][^>]+$/i,ue=/>[^<>]*$/,fe=/<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/>)/ig,$e=/\s+$/,mt=(t,e)=>0<e--&&(pe.test(t[e])||!ue.test(t[e])&&mt(t,e)),me=(t,e,n)=>de.test(e)?t:`<${e}${n.replace($e,"")}></${e}>`;var ge=(t,e,n)=>{const r=[],{length:o}=t;for(let i=1;i<o;i++){const l=t[i-1];r.push($t.test(l)&&mt(t,i)?l.replace($t,(c,a,p)=>`${e}${i-1}=${p||'"'}${a}${p?"":'"'}`):`${l}<!--${e}${i-1}-->`)}r.push(t[o-1]);const s=r.join("").trim();return n?s:s.replace(fe,me)};const{isArray:V}=Array,{indexOf:he,slice:gt}=[],ve=1,ht=111,ye=({firstChild:t,lastChild:e})=>{const n=document.createRange();return n.setStartAfter(t),n.setEndAfter(e),n.deleteContents(),t},be=(t,e)=>t.nodeType===ht?1/e<0?e?ye(t):t.lastChild:e?t.valueOf():t.firstChild:t,we=t=>{const{childNodes:e}=t,{length:n}=e;if(n<2)return n?e[0]:t;const r=gt.call(e,0),o=r[0],s=r[n-1];return{ELEMENT_NODE:ve,nodeType:ht,firstChild:o,lastChild:s,valueOf(){if(e.length!==n){let i=0;for(;i<n;)t.appendChild(r[i++])}return t}}};var Se=(t,e,n,r,o)=>{const s=n.length;let i=e.length,l=s,c=0,a=0,p=null;for(;c<i||a<l;)if(i===c){const f=l<s?a?r(n[a-1],-0).nextSibling:r(n[l-a],0):o;for(;a<l;)t.insertBefore(r(n[a++],1),f)}else if(l===a)for(;c<i;)(!p||!p.has(e[c]))&&t.removeChild(r(e[c],-1)),c++;else if(e[c]===n[a])c++,a++;else if(e[i-1]===n[l-1])i--,l--;else if(e[c]===n[l-1]&&n[a]===e[i-1]){const f=r(e[--i],-1).nextSibling;t.insertBefore(r(n[a++],1),r(e[c++],-1).nextSibling),t.insertBefore(r(n[--l],1),f),e[i]=n[l]}else{if(!p){p=new Map;let f=a;for(;f<l;)p.set(n[f],f++)}if(p.has(e[c])){const f=p.get(e[c]);if(a<f&&f<l){let k=c,ft=1;for(;++k<i&&k<l&&p.get(e[k])===f+ft;)ft++;if(ft>f-a){const Hr=r(e[c],0);for(;a<f;)t.insertBefore(r(n[a++],1),Hr)}else t.replaceChild(r(n[a++],1),r(e[c++],-1))}else c++}else t.removeChild(r(e[c++],-1))}return n};const _e=t=>e=>{for(const n in e){const r=n==="role"?n:`aria-${n}`,o=e[n];o==null?t.removeAttribute(r):t.setAttribute(r,o)}},xe=(t,e)=>{let n,r=!0;const o=document.createAttributeNS(null,e);return s=>{if(n!==s)if(n=s,n==null)r||(t.removeAttributeNode(o),r=!0);else{const i=s;i==null?(r||t.removeAttributeNode(o),r=!0):(o.value=i,r&&(t.setAttributeNodeNS(o),r=!1))}}},Oe=(t,e,n)=>r=>{n!==!!r&&((n=!!r)?t.setAttribute(e,""):t.removeAttribute(e))},Ae=({dataset:t})=>e=>{for(const n in e){const r=e[n];r==null?delete t[n]:t[n]=r}},vt=(t,e)=>{let n,r,o=e.slice(2);return!(e in t)&&(r=e.toLowerCase())in t&&(o=r.slice(2)),s=>{const i=V(s)?s:[s,!1];n!==i[0]&&(n&&t.removeEventListener(o,n,i[1]),(n=i[0])&&t.addEventListener(o,n,i[1]))}},Pe=t=>{let e;return n=>{e!==n&&(e=n,typeof n=="function"?n(t):n.current=t)}},Te=(t,e)=>e==="dataset"?Ae(t):n=>{t[e]=n},Ee=t=>{let e;return n=>{e!=n&&(e=n,t.textContent=n??"")}},Ce=({childNodes:t},e)=>t[e],x=(t,e,n)=>Se(t.parentNode,e,n,be,t),Ie=t=>{let e,n,r=[];const o=s=>{switch(typeof s){case"string":case"number":case"boolean":e!==s&&(e=s,n||(n=document.createTextNode("")),n.data=s,r=x(t,r,[n]));break;case"object":case"undefined":if(s==null){e!=s&&(e=s,r=x(t,r,[]));break}if(V(s)){e=s,s.length===0?r=x(t,r,[]):typeof s[0]=="object"?r=x(t,r,s):o(String(s));break}e!==s&&"ELEMENT_NODE"in s&&(e=s,r=x(t,r,s.nodeType===11?gt.call(s.childNodes):[s]));break;case"function":o(s(t));break}};return o},Me=(t,e)=>{switch(e[0]){case"?":return Oe(t,e.slice(1),!1);case".":return Te(t,e.slice(1));case"@":return vt(t,"on"+e.slice(1));case"o":if(e[1]==="n")return vt(t,e)}switch(e){case"ref":return Pe(t);case"aria":return _e(t)}return xe(t,e)};function Ne(t){const{type:e,path:n}=t,r=n.reduceRight(Ce,this);return e==="node"?Ie(r):e==="attr"?Me(r,t.name):Ee(r)}/*! (c) Andrea Giammarchi - ISC */var yt=function(t){var e="fragment",n="template",r="content"in i(n),o=r?function(c){var a=i(n);return a.innerHTML=c,a.content}:function(c){var a=i(e),p=i(n),f=null;if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(c)){var k=RegExp.$1;p.innerHTML="<table>"+c+"</table>",f=p.querySelectorAll(k)}else p.innerHTML=c,f=p.childNodes;return s(a,f),a};return function(a,p){return(p==="svg"?l:o)(a)};function s(c,a){for(var p=a.length;p--;)c.appendChild(a[0])}function i(c){return c===e?t.createDocumentFragment():t.createElementNS("http://www.w3.org/1999/xhtml",c)}function l(c){var a=i(e),p=i("div");return p.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+c+"</svg>",s(a,p.firstChild.childNodes),a}}(document);const bt=document.importNode.length!=1,Re=bt?(t,e,n)=>document.importNode(yt(t,e,n),!0):yt,je=bt?t=>document.createTreeWalker(t,1|128,null,!1):t=>document.createTreeWalker(t,1|128),q=t=>{const e=[];let{parentNode:n}=t;for(;n;)e.push(he.call(n.childNodes,t)),t=n,n=t.parentNode;return e},O="is\xB5",wt=G(new WeakMap),ke=/^(?:plaintext|script|style|textarea|title|xmp)$/i,A=()=>({stack:[],entry:null,wire:null}),ze=(t,e)=>{const{content:n,updates:r}=We(t,e);return{type:t,template:e,content:n,updates:r,wire:null}},Le=(t,e)=>{const n=ge(e,O,t==="svg"),r=Re(n,t),o=je(r),s=[],i=e.length-1;let l=0,c=`${O}${l}`;for(;l<i;){const a=o.nextNode();if(!a)throw`bad template: ${n}`;if(a.nodeType===8)a.data===c&&(s.push({type:"node",path:q(a)}),c=`${O}${++l}`);else{for(;a.hasAttribute(c);)s.push({type:"attr",path:q(a),name:a.getAttribute(c)}),a.removeAttribute(c),c=`${O}${++l}`;ke.test(a.tagName)&&a.textContent.trim()===`<!--${c}-->`&&(a.textContent="",s.push({type:"text",path:q(a)}),c=`${O}${++l}`)}}return{content:r,nodes:s}},We=(t,e)=>{const{content:n,nodes:r}=wt.get(e)||wt.set(e,Le(t,e)),o=document.importNode(n,!0),s=r.map(Ne,o);return{content:o,updates:s}},z=(t,{type:e,template:n,values:r})=>{const{length:o}=r;St(t,r,o);let{entry:s}=t;(!s||s.template!==n||s.type!==e)&&(t.entry=s=ze(e,n));const{content:i,updates:l,wire:c}=s;for(let a=0;a<o;a++)l[a](r[a]);return c||(s.wire=we(i))},St=({stack:t},e,n)=>{for(let r=0;r<n;r++){const o=e[r];o instanceof X?e[r]=z(t[r]||(t[r]=A()),o):V(o)?St(t[r]||(t[r]=A()),o,o.length):t[r]=null}n<t.length&&t.splice(n)};function X(t,e,n){this.type=t,this.template=e,this.values=n}const{create:De,defineProperties:He}=Object,_t=t=>{const e=G(new WeakMap),n=r=>(o,...s)=>z(r,{type:t,template:o,values:s});return He((r,...o)=>new X(t,r,o),{for:{value(r,o){const s=e.get(r)||e.set(r,De(null));return s[o]||(s[o]=n(A()))}},node:{value:(r,...o)=>z(A(),{type:t,template:r,values:o}).valueOf()}})},xt=G(new WeakMap),Ue=(t,e)=>{const n=typeof e=="function"?e():e,r=xt.get(t)||xt.set(t,A()),o=n instanceof X?z(r,n):n;return o!==r.wire&&(r.wire=o,t.textContent="",t.appendChild(o.valueOf())),t},Fe=_t("html");_t("svg");var g={uhtml:{render:Ue,html:Fe},globals:{now:Date.now,window,setTimeout,random:Math.random,DocumentFragment}};const{now:Ot,setTimeout:Be}=g.globals,At=1e3/60,Pt=(t,e)=>{const n=Ot(),r=t();Be(()=>{const o=Ot()<n+At?e+1:Math.max(e-1,1);Pt(r,o)},e)},Tt=32,P=32,Ge=1/5,Z=1/15,Et=1/15,Ct=45,J=30;var K=t=>{let e=t;const n=new Map;return{next:r=>{e=r(e),n.forEach(o=>o(e))},subscribe:r=>{r(e);const o={};return n.set(o,r),o},unsubscribe:r=>n.delete(r)}};const{random:Ve}=g.globals,h=()=>[...Array(10)].map(()=>Math.round(Ve())),Q=K(h()),qe=t=>{Q.next(e=>e.map((n,r)=>{const o=t[r];return n===o?n:Math.min(Math.max(n-Et,o),n+Et)}))};var Xe=Object.defineProperty,It=Object.getOwnPropertySymbols,Ze=Object.prototype.hasOwnProperty,Je=Object.prototype.propertyIsEnumerable,Mt=(t,e,n)=>e in t?Xe(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Nt=(t,e)=>{for(var n in e||(e={}))Ze.call(e,n)&&Mt(t,n,e[n]);if(It)for(var n of It(e))Je.call(e,n)&&Mt(t,n,e[n]);return t};const{render:Ke,html:Qe}=g.uhtml,{DocumentFragment:Ye}=g.globals,$=(t,e)=>{const n=new Ye,r=s=>Ke(n,e(Qe)(s));let o=t;return{render:()=>r(o),update:s=>{o=Nt(Nt({},o),s(o)),r(o)}}},tn=t=>t.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`),u=t=>Object.entries(t).reduce((e,[n,r])=>`${e}${tn(n)}:${r};`,"");var en=Object.defineProperty,Rt=Object.getOwnPropertySymbols,nn=Object.prototype.hasOwnProperty,rn=Object.prototype.propertyIsEnumerable,jt=(t,e,n)=>e in t?en(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,on=(t,e)=>{for(var n in e||(e={}))nn.call(e,n)&&jt(t,n,e[n]);if(Rt)for(var n of Rt(e))rn.call(e,n)&&jt(t,n,e[n]);return t};const sn=(t,e)=>$({bit:t},n=>({bit:r})=>{const o=255*r,s=255-o,i=u({display:"inline-block",width:e,height:e,lineHeight:e,fontSize:e,textAlign:"center",backgroundColor:`rgb(${o},${o},${o})`,color:`rgb(${s},${s},${s})`});return n`<div style=${i}>${r<.5?0:1}</div>`});var T=(t,e)=>{const n={tape:h(),style:{}},r=`min(${t}vw, ${e}vh)`,o=n.tape.map(s=>sn(s,r));return $(n,s=>({tape:i,style:l})=>{const c=u(on({width:`calc(${r} * 10)`,height:r},l));return o.forEach((a,p)=>a.update(()=>({bit:i[p]}))),s`<div style=${c}>${o.map(a=>a.render())}</div>`})};const kt=T(15,30),zt=$({position:0},t=>({position:e})=>{const n=u({position:"absolute",top:"30%",left:"50%",transform:`translateX(calc(-5% - ${e} * 10%))`});return t`<div style=${n}>${kt.render()}</div>`});Q.subscribe(t=>kt.update(()=>({tape:t})));var an=Object.defineProperty,cn=Object.defineProperties,ln=Object.getOwnPropertyDescriptors,Lt=Object.getOwnPropertySymbols,dn=Object.prototype.hasOwnProperty,pn=Object.prototype.propertyIsEnumerable,Wt=(t,e,n)=>e in t?an(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Y=(t,e)=>{for(var n in e||(e={}))dn.call(e,n)&&Wt(t,n,e[n]);if(Lt)for(var n of Lt(e))pn.call(e,n)&&Wt(t,n,e[n]);return t},tt=(t,e)=>cn(t,ln(e));const un={state:0},fn=t=>"E01234AH"[t+1],y="min(15vw, 30vh)",L=`calc(${y} / 16)`,$n=u({position:"absolute",top:"30%",left:`calc(50% - ${y} * 9 / 16)`}),Dt={position:"absolute",height:y,background:"radial-gradient(#aaa, #666)"},Ht=tt(Y({},Dt),{width:`calc(${y} / 8)`,borderRadius:`${L} ${L} 0 0`}),mn=u(Ht),gn=u(tt(Y({},Ht),{left:y})),hn=u(tt(Y({},Dt),{top:y,width:`calc(${y} * 9 / 8)`,borderRadius:`0 0 ${L} ${L}`,fontSize:`calc(${y} * 0.8)`,lineHeight:y,textAlign:"center",color:"white"})),b=$(un,t=>({state:e})=>t`<div style=${$n}><div style=${mn} /><div style=${gn} /><div style=${hn}>${fn(e)}</div></div>`),Ut=T(5,7),Ft=T(5,7),Bt=t=>Ut.update(()=>({tape:t})),vn=u({position:"absolute",top:"3%",width:"100%",fontFamily:"serif",color:"white"}),yn=u({margin:"0 auto",fontSize:"min(3vw, 4.2vh)",lineHeight:"min(3vw, 4.2vh)"}),bn=$({},t=>()=>t`<div style=${vn}><table style=${yn}><tr><td>ORDER:</td><td>${Ut.render()}</td></tr><tr><td>TAPE:</td><td>${Ft.render()}</td></tr></table></div>`);Q.subscribe(t=>Ft.update(()=>({tape:t})));const wn={number:1,timeLeft:0,score:0},et="min(3vw, 4.2vh)",Sn=u({position:"absolute",top:"1%",left:"1%",fontSize:et,color:"white",fontFamily:"serif"}),_n=u({fontSize:`calc(${et} * 0.7)`}),xn=u({position:"absolute",bottom:"1%",left:"1%",fontSize:et,color:"white",fontFamily:"serif"}),nt=t=>[...t.toString()].reduceRight(([e,n],r)=>e.length===3?[r,`,${e}${n}`]:[`${r}${e}`,n],["",""]).join``,Gt=t=>(t*100|0).toString().padStart(4,"0").replace(/^(..)(..)/,"$1.$2"),E=$(wn,t=>({number:e,timeLeft:n,score:r})=>t`<div style=${Sn}>No.${e}<span style=${_n}>/${Tt}</span><br>${Gt(n)}</div><div style=${xn}>Score: ${nt(r)}</div>`),C=[...Array(10)].map((t,e)=>({direction:1,nextChar:e&1,nextState:e>>1})),S=K(C),rt=(t,e)=>S.next(n=>[...n.slice(0,t),e(n[t]),...n.slice(t+1)]),Vt=K([]),I=t=>Vt.next(e=>[...e,t]),M=()=>{let t;return Vt.next(([e,...n])=>(t=e,n)),t},m={reset:{},halt:{},pass:{},run:{},goNext:{}};var On=Object.defineProperty,An=Object.defineProperties,Pn=Object.getOwnPropertyDescriptors,qt=Object.getOwnPropertySymbols,Tn=Object.prototype.hasOwnProperty,En=Object.prototype.propertyIsEnumerable,Xt=(t,e,n)=>e in t?On(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,ot=(t,e)=>{for(var n in e||(e={}))Tn.call(e,n)&&Xt(t,n,e[n]);if(qt)for(var n of qt(e))En.call(e,n)&&Xt(t,n,e[n]);return t},st=(t,e)=>An(t,Pn(e));const Cn=(t,e)=>({state0:t,char0:e,direction:1,char1:e,state1:t,disabled:!1}),In=u({display:"inline-block",margin:"1% 1%",textAlign:"center",whiteSpace:"nowrap"}),Mn=t=>t<0?"L":"R",Nn=["0","1","2","3","4","A"],Rn=(t,e)=>()=>{rt(t,n=>st(ot({},n),{direction:-e}))},jn=(t,e)=>()=>{rt(t,n=>st(ot({},n),{nextChar:1-e}))},kn=(t,e)=>()=>{rt(t,n=>st(ot({},n),{nextState:(e+1)%6}))};var zn=t=>$(Cn(t>>1,t&0),e=>({state0:n,char0:r,direction:o,char1:s,state1:i,disabled:l})=>e`<div style=${In}>${`<${n},${r},`}<button onclick=${Rn(t,o)} .disabled=${l}>${Mn(o)}</button>${","}<button onclick=${jn(t,s)} .disabled=${l}>${s}</button>${","}<button onclick=${kn(t,i)} .disabled=${l}>${Nn[i]}</button>${">"}</div>`),Ln=Object.defineProperty,Zt=Object.getOwnPropertySymbols,Wn=Object.prototype.hasOwnProperty,Dn=Object.prototype.propertyIsEnumerable,Jt=(t,e,n)=>e in t?Ln(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Hn=(t,e)=>{for(var n in e||(e={}))Wn.call(e,n)&&Jt(t,n,e[n]);if(Zt)for(var n of Zt(e))Dn.call(e,n)&&Jt(t,n,e[n]);return t};const Un={style:{display:"none"},disabled:!0},it=[...Array(10)].map((t,e)=>zn(e)),N="min(4vw, 6vh)",Fn=t=>u(Hn({position:"absolute",top:"29%",left:"50%",transform:"translate(-50%, 0)",width:`calc(${N} * 20)`,padding:"5px 0 10px 0",textAlign:"center",fontSize:N,lineHeight:N,border:"1px solid #999",backgroundColor:"rgba(51, 51, 153, 0.8)",color:"white",fontFamily:"Courier New"},t)),Bn=u({marginBottom:"10px"}),at=`calc(${N} * 1.3)`,Gn=u({height:at,marginTop:"0.1em",padding:"0 1em",fontSize:at,lineHeight:at,borderRadius:`calc(${N} * 0.15)`}),W=$(Un,(({onClickRunButton:t})=>e=>({style:n,disabled:r})=>(it.forEach(o=>o.update(()=>({disabled:r}))),e`<div style=${Fn(n)}><span style=${Bn}>Program</span><div>${it.map(o=>o.render())}</div><button style=${Gn} .disabled=${r} onclick=${t}>RUN</button></div>`))({onClickRunButton:()=>{I(m.run),W.update(()=>({disabled:!0}))}}));S.subscribe(t=>{t.forEach(({direction:e,nextChar:n,nextState:r},o)=>it[o].update(()=>({state0:o>>1,char0:o&1,direction:e,char1:n,state1:r})))});const Vn={running:!1,disabled:!0},qn=u({display:"table-cell",position:"absolute",top:"19%",width:"100%",height:"10%",textAlign:"center",verticalAlign:"middle",fontFamily:"Courier New"}),R="min(5vw, 6.5vh)",Kt=u({margin:`calc(5vh - ${R} / 2) 0.5em`,width:`calc(${R} * 5)`,height:R,fontSize:R,borderRadius:`calc(${R} * 0.15)`}),Xn=()=>I(m.reset),Zn=()=>I(m.halt),Jn=()=>I(m.pass),ct=$(Vn,t=>({running:e,disabled:n})=>t`<div style=${qn}><button style=${Kt} onclick=${e?Zn:Xn} .disabled=${n}>${e?"HALT":"RESET"}</button><button style=${Kt} onclick=${Jn} .disabled=${n||e}>PASS</button></div>`),Kn=t=>u({display:t===0?"none":"block",position:"absolute",top:0,left:0,width:"100%",height:"100%",backgroundColor:"rgba(0, 0, 0, 0.6)",opacity:t}),Qn=()=>I(m.goNext);var w=$({opacity:0},t=>({opacity:e})=>t`<div style=${Kn(e)} onclick=${Qn}></div>`);const v={pass:{},solved:{},timeup:{}},Yn={type:v.pass,commandsSaved:0,accepted:!1,steps:0,timeLeft:0,opacity:0},tr=t=>u({display:t===0?"none":"block",position:"absolute",top:"10%",width:"100%",textAlign:"center",color:"white",opacity:t,filter:"drop-shadow(0 0 0.3rem black)"}),er=new Map([[v.pass,"#ccc"],[v.solved,"#cfc"],[v.timeup,"#ccf"]]),D="min(4vw, 6vh)",nr=t=>u({color:er.get(t),fontSize:`calc(${D} * 1.3)`}),rr=new Map([[v.pass,"Pass"],[v.solved,"Solved!"],[v.timeup,"Time's up."]]),or=u({display:"inline-block",margin:`${D} 0`,fontSize:D,color:"white"}),sr=u({fontSize:D}),Qt=(t,e,n,r)=>(t+(e?1:0))*100*n*.1*(r/P)*3|0,H=$(Yn,t=>({type:e,commandsSaved:n,accepted:r,steps:o,timeLeft:s,opacity:i})=>t`<div style=${tr(i)}><div style=${nr(e)}>${rr.get(e)}</div><table style=${or}><tr><td>Saved + accepted</td><td /><td>Steps</td><td /><td>Time left</td></tr><tr><td>((${n} + ${r?1:0}) &times; 100)</td><td>&times;</td><td>(${o} &times; 0.1)</td><td>&times;</td><td>(${Gt(s)} / ${P}.00 &times; 3)</td></tr></table><div style=${sr}>Score: +${nt(Qt(n,r,o,s))}</div></div>`),ir={finished:!1,order:Array(10).fill(0),tape:Array(10).fill(0),score:0,opacity:0},_="min(4vw, 6vh)",ar=t=>u({display:t===0?"none":"block",position:"absolute",top:"10%",width:"100%",fontSize:_,lineHeight:_,textAlign:"center",color:"white",opacity:t,filter:"drop-shadow(0 0 0.3rem black)"}),cr=t=>u({marginBottom:_,fontSize:`calc(${_} * 1.3)`,color:t?"#fc9":"#c99"}),lt=T(4,6),dt=T(4,6),lr={display:"inline-block"};[lt,dt].forEach(t=>t.update(()=>({style:lr})));const dr=u({fontSize:_,marginTop:_}),pt=$(ir,t=>({finished:e,caseNumber:n,order:r,tape:o,score:s,opacity:i})=>{lt.update(()=>({tape:r})),dt.update(()=>({tape:o}));const l=`display:${e?"none":"block"}`,c=e?"":`at No.${n}`;return t`<div style=${ar(i)}><div style=${cr(e)}>${e?"Finished!":"Game Over"}</div><div style=${l}>${c}</div>${e?"":lt.render()}<br>${e?"":dt.render()}<br><div style=${dr}>Total score: ${nt(s)}</div></div>`}),pr={opacity:0},ur=t=>u({display:t===0?"none":"block",position:"absolute",width:"100%",top:"30%",textAlign:"center",color:"white",opacity:t}),fr=u({fontSize:"min(12vw, 18vh)",color:"orange"}),U=$(pr,t=>({opacity:e})=>t`<div style=${ur(e)}><div style=${fr}>TMP</div></div>`);var d={title:{title:{}},main:{programWindowOpening:{},programming:{},programWindowClosing:{},running:{}},result:{caseResult:{},totalResult:{}}};const{now:$r}=g.globals,Yt=({startedAt:t})=>{const e=Math.max(P-($r()-t)/1e3,0);E.update(()=>({timeLeft:e}))},mr=(t,e)=>{const n=e-t,r=n*Ge;return Z<Math.abs(r)?t+r:t+Math.min(Math.max(-Z,n),Z)},j=({currentTape:t,position:e})=>{qe(t),zt.update(({position:n})=>({position:mr(n,e)}))},te=(t,e)=>{const n=Math.max((1-t/20)*50,0),r=Math.min((1+t/20)*50,100),o=Math.min(Math.max((t-30)/10,0)*87+13,100),s=`polygon(${n}% 0, ${r}% 0, ${r}% ${o}%, ${n}% ${o}%)`;W.update(()=>({style:{clipPath:s},disabled:e}))},{now:gr,random:ut}=g.globals;var ee=(t=0,e=0)=>({currentTape:n,position:r,machineState:o})=>{if(t===0){const i=h();return Bt(i),E.update(()=>({number:1,timeLeft:P,score:0})),w.update(()=>({opacity:1})),{nextId:d.title.title,nextArgs:[1],stateUpdate:{position:0,machineState:0,order:i,currentTape:h()}}}if(j({currentTape:n,position:r}),b.update(()=>({state:o})),t<30)return U.update(()=>({opacity:t/30})),{nextId:d.title.title,nextArgs:[t+1]};if(t===30)return{nextId:d.title.title,nextArgs:[M()===m.goNext?31:30,(e+1)%J],stateUpdate:e===0?{currentTape:[...n.slice(0,r),Math.round(ut()),...n.slice(r+1,10)],position:{0:1,9:8}[r]||r+(ut()<.5?-1:1),machineState:Math.floor(ut()*5)}:{}};if(t<50){const i=(50-t)/20;return U.update(()=>({opacity:i})),w.update(()=>({opacity:i})),{nextId:d.title.title,nextArgs:[t+1]}}U.update(()=>({opacity:0})),w.update(()=>({opacity:0})),S.next(()=>C);const s=h();return{nextId:d.main.programWindowOpening,nextArgs:[0],stateUpdate:{caseNumber:1,score:0,order:h(),originalTape:s,currentTape:s,position:0,machinState:0,executedIndices:new Map,startedAt:gr()}}},hr=Object.defineProperty,vr=Object.defineProperties,yr=Object.getOwnPropertyDescriptors,ne=Object.getOwnPropertySymbols,br=Object.prototype.hasOwnProperty,wr=Object.prototype.propertyIsEnumerable,re=(t,e,n)=>e in t?hr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Sr=(t,e)=>{for(var n in e||(e={}))br.call(e,n)&&re(t,n,e[n]);if(ne)for(var n of ne(e))wr.call(e,n)&&re(t,n,e[n]);return t},_r=(t,e)=>vr(t,yr(e));const{now:xr}=g.globals,oe=(t,e,n)=>({type:t,time:0,accepted:e,timeLeft:n}),Or=(t,e)=>(t*6+e)/7|0,Ar=t=>({executedIndices:e,steps:n,caseNumber:r,score:o})=>{const{time:s,type:i,accepted:l,timeLeft:c}=t;w.update(()=>({opacity:Math.min(s/10,1)})),H.update(()=>({opacity:Math.min(Math.max(0,(s-10)/30),1)})),s===0&&(H.update(()=>({type:i,commandsSaved:10-e.size,accepted:l,steps:n,timeLeft:c})),W.update(()=>({disabled:!0}))),E.update(({score:p})=>({score:s===40?o:Or(p,o)}));const a=M();if(s>=40&&a===m.goNext){if(H.update(()=>({opacity:0})),r===Tt)return{nextId:d.result.totalResult,nextArgs:[!0,0]};const p=r+1;E.update(()=>({number:p}));const f=h();return w.update(()=>({opacity:0})),S.next(()=>C),b.update(()=>({state:0})),{nextId:d.main.programWindowOpening,nextArgs:[0],stateUpdate:{caseNumber:p,order:h(),originalTape:f,currentTape:f,position:0,machineState:0,executedIndices:new Map,startedAt:xr()}}}return{nextId:d.result.caseResult,nextArgs:[_r(Sr({},t),{time:s+1})],stateUpdate:s===0?{score:o+Qt(10-e.size,l,n,c)}:{}}},Pr=(t,e)=>({order:n,originalTape:r,score:o,caseNumber:s})=>{const i=M();return e<=40?(w.update(()=>({opacity:Math.min(e/10,1)})),pt.update(()=>({opacity:Math.max(0,(e-10)/30),finished:t,score:o,caseNumber:s,order:n,tape:r})),{nextId:d.result.totalResult,nextArgs:[t,e+1]}):e===41?{nextId:d.result.totalResult,nextArgs:[t,i===m.goNext?42:41]}:e<=61?(pt.update(()=>({opacity:(61-e)/20})),{nextId:d.result.totalResult,nextArgs:[t,e+1]}):{nextId:d.title.title,nextArgs:[0]}},{now:F}=g.globals,B=(t,e)=>Math.max(P-(t-e)/1e3,0),Tr=t=>e=>{Bt(e.order);const n=t<Ct;return te(t,n),j(e),ct.update(()=>({running:!1,disabled:n})),Yt(e),n?{nextId:d.main.programWindowOpening,nextArgs:[t+1]}:{nextId:d.main.programming,nextArgs:[]}},Er=()=>t=>{j(t),Yt(t);const e=M();return e===m.run?(b.update(()=>({state:0})),{nextId:d.main.programWindowClosing,nextArgs:[Ct],stateUpdate:{currentTape:t.originalTape,machineState:0,position:0,runAt:F()}}):(e===m.reset&&S.next(()=>C),e===m.pass?{nextId:d.result.caseResult,nextArgs:[oe(v.pass,!1,B(F(),t.startedAt))],stateUpdate:{steps:0}}:{nextId:d.main.programming,nextArgs:[],stateUpdate:e===m.reset?{currentTape:t.originalTape,machineState:0,position:0}:{}})},Cr=t=>e=>(te(t,!0),j(e),ct.update(()=>({running:t===0,disabled:t>0})),t===0?{nextId:d.main.running,nextArgs:[0],stateUpdate:{steps:0,executedIndices:new Set}}:{nextId:d.main.programWindowClosing,nextArgs:[t-1]});let se=C;S.subscribe(t=>{se=t});const Ir=({currentTape:t,position:e,machineState:n,steps:r,executedIndices:o})=>{const s=n<<1|t[e],{direction:i,nextChar:l,nextState:c}=se[s];return{currentTape:[...t.slice(0,e),l,...t.slice(e+1)],position:e+i,machineState:c,steps:r+1,executedIndices:new Set([...o,s])}},Mr=t=>e=>{const{position:n,machineState:r,startedAt:o,runAt:s,order:i,currentTape:l}=e;if(M()===m.halt)return b.update(()=>({state:6})),B(F(),o)>0?{nextId:d.main.programWindowOpening,nextArgs:[0]}:{nextId:d.result.totalResult,nextArgs:[!1,0]};j(e);const c=n<0||n>=10?-1:r;if([-1,5].includes(c)&&t===J){if(b.update(()=>({state:c})),i.join``===l.join``){const a=B(s,o),p=a>0?v.solved:v.timeup;return{nextId:d.result.caseResult,nextArgs:[oe(p,c===5,a)]}}return B(F(),o)>0?{nextId:d.main.programWindowOpening,nextArgs:[0],stateUpdate:{machineState:c}}:{nextId:d.result.totalResult,nextArgs:[!1,0]}}return b.update(()=>({state:r})),{nextId:d.main.running,nextArgs:[t===J?0:t+1],stateUpdate:t===0?Ir(e):{}}};var Nr=Object.defineProperty,ie=Object.getOwnPropertySymbols,Rr=Object.prototype.hasOwnProperty,jr=Object.prototype.propertyIsEnumerable,ae=(t,e,n)=>e in t?Nr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,ce=(t,e)=>{for(var n in e||(e={}))Rr.call(e,n)&&ae(t,n,e[n]);if(ie)for(var n of ie(e))jr.call(e,n)&&ae(t,n,e[n]);return t};const{now:kr}=g.globals,zr=new Map([[d.title.title,ee],[d.main.programWindowOpening,Tr],[d.main.programming,Er],[d.main.programWindowClosing,Cr],[d.main.running,Mr],[d.result.caseResult,Ar],[d.result.totalResult,Pr]]),Lr=(t,e)=>({score:0,caseNumber:1,order:t,originalTape:e,currentTape:e,position:0,machineState:0,startedAt:kr(),runAt:null,steps:0,executedIndices:new Set}),le=(t,e)=>()=>{const{nextId:n,nextArgs:r,stateUpdate:o}=t(e);return le(zr.get(n)(...r),ce(ce({},e),o))},{render:Wr,html:Dr}=g.uhtml;Wr(document.getElementById("root"),Dr`${[E,bn,zt,b,ct,W,w,H,pt,U].map(t=>t.render())}`),Pt(le(ee(0),Lr(h(),h())),At)})();
