(function(){"use strict";var G=t=>({get:e=>t.get(e),set:(e,n)=>(t.set(e,n),n)});const ut=/([^\s\\>"'=]+)\s*=\s*(['"]?)$/,Bt=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,Gt=/<[a-z][^>]+$/i,qt=/>[^<>]*$/,Xt=/<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/>)/ig,Zt=/\s+$/,pt=(t,e)=>0<e--&&(Gt.test(t[e])||!qt.test(t[e])&&pt(t,e)),Jt=(t,e,n)=>Bt.test(e)?t:`<${e}${n.replace(Zt,"")}></${e}>`;var Kt=(t,e,n)=>{const s=[],{length:o}=t;for(let i=1;i<o;i++){const l=t[i-1];s.push(ut.test(l)&&pt(t,i)?l.replace(ut,(c,a,u)=>`${e}${i-1}=${u||'"'}${a}${u?"":'"'}`):`${l}<!--${e}${i-1}-->`)}s.push(t[o-1]);const r=s.join("").trim();return n?r:r.replace(Xt,Jt)};const{isArray:q}=Array,{indexOf:Qt,slice:$t}=[],Yt=1,gt=111,Vt=({firstChild:t,lastChild:e})=>{const n=document.createRange();return n.setStartAfter(t),n.setEndAfter(e),n.deleteContents(),t},te=(t,e)=>t.nodeType===gt?1/e<0?e?Vt(t):t.lastChild:e?t.valueOf():t.firstChild:t,ee=t=>{const{childNodes:e}=t,{length:n}=e;if(n<2)return n?e[0]:t;const s=$t.call(e,0),o=s[0],r=s[n-1];return{ELEMENT_NODE:Yt,nodeType:gt,firstChild:o,lastChild:r,valueOf(){if(e.length!==n){let i=0;for(;i<n;)t.appendChild(s[i++])}return t}}};var ne=(t,e,n,s,o)=>{const r=n.length;let i=e.length,l=r,c=0,a=0,u=null;for(;c<i||a<l;)if(i===c){const $=l<r?a?s(n[a-1],-0).nextSibling:s(n[l-a],0):o;for(;a<l;)t.insertBefore(s(n[a++],1),$)}else if(l===a)for(;c<i;)(!u||!u.has(e[c]))&&t.removeChild(s(e[c],-1)),c++;else if(e[c]===n[a])c++,a++;else if(e[i-1]===n[l-1])i--,l--;else if(e[c]===n[l-1]&&n[a]===e[i-1]){const $=s(e[--i],-1).nextSibling;t.insertBefore(s(n[a++],1),s(e[c++],-1).nextSibling),t.insertBefore(s(n[--l],1),$),e[i]=n[l]}else{if(!u){u=new Map;let $=a;for(;$<l;)u.set(n[$],$++)}if(u.has(e[c])){const $=u.get(e[c]);if(a<$&&$<l){let W=c,dt=1;for(;++W<i&&W<l&&u.get(e[W])===$+dt;)dt++;if(dt>$-a){const Fn=s(e[c],0);for(;a<$;)t.insertBefore(s(n[a++],1),Fn)}else t.replaceChild(s(n[a++],1),s(e[c++],-1))}else c++}else t.removeChild(s(e[c++],-1))}return n};const se=t=>e=>{for(const n in e){const s=n==="role"?n:`aria-${n}`,o=e[n];o==null?t.removeAttribute(s):t.setAttribute(s,o)}},oe=(t,e)=>{let n,s=!0;const o=document.createAttributeNS(null,e);return r=>{n!==r&&(n=r,n==null?s||(t.removeAttributeNode(o),s=!0):(o.value=r,s&&(t.setAttributeNodeNS(o),s=!1)))}},re=(t,e,n)=>s=>{n!==!!s&&((n=!!s)?t.setAttribute(e,""):t.removeAttribute(e))},ie=({dataset:t})=>e=>{for(const n in e){const s=e[n];s==null?delete t[n]:t[n]=s}},ae=(t,e)=>{let n,s=e.slice(2);return!(e in t)&&e.toLowerCase()in t&&(s=s.toLowerCase()),o=>{const r=q(o)?o:[o,!1];n!==r[0]&&(n&&t.removeEventListener(s,n,r[1]),(n=r[0])&&t.addEventListener(s,n,r[1]))}},ce=t=>e=>{typeof e=="function"?e(t):e.current=t},le=(t,e)=>e==="dataset"?ie(t):n=>{t[e]=n},de=t=>{let e;return n=>{e!=n&&(e=n,t.textContent=n==null?"":n)}};/*! (c) Andrea Giammarchi - ISC */var ht=function(t){var e="fragment",n="template",s="content"in i(n),o=s?function(c){var a=i(n);return a.innerHTML=c,a.content}:function(c){var a=i(e),u=i(n),$=null;if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(c)){var W=RegExp.$1;u.innerHTML="<table>"+c+"</table>",$=u.querySelectorAll(W)}else u.innerHTML=c,$=u.childNodes;return r(a,$),a};return function(a,u){return(u==="svg"?l:o)(a)};function r(c,a){for(var u=a.length;u--;)c.appendChild(a[0])}function i(c){return c===e?t.createDocumentFragment():t.createElementNS("http://www.w3.org/1999/xhtml",c)}function l(c){var a=i(e),u=i("div");return u.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+c+"</svg>",r(a,u.firstChild.childNodes),a}}(document);const ue=({childNodes:t},e)=>t[e],X=t=>{const e=[];let{parentNode:n}=t;for(;n;)e.push(Qt.call(n.childNodes,t)),t=n,n=t.parentNode;return e},{createTreeWalker:mt,importNode:Z}=document,ft=Z.length!=1,pe=ft?(t,e,n)=>Z.call(document,ht(t,e,n),!0):ht,$e=ft?t=>mt.call(document,t,1|128,null,!1):t=>mt.call(document,t,1|128),M=(t,e,n)=>ne(t.parentNode,e,n,te,t),ge=t=>{let e,n,s=[];const o=r=>{switch(typeof r){case"string":case"number":case"boolean":e!==r&&(e=r,n||(n=document.createTextNode("")),n.data=r,s=M(t,s,[n]));break;case"object":case"undefined":if(r==null){e!=r&&(e=r,s=M(t,s,[]));break}if(q(r)){e=r,r.length===0?s=M(t,s,[]):typeof r[0]=="object"?s=M(t,s,r):o(String(r));break}"ELEMENT_NODE"in r&&e!==r&&(e=r,s=M(t,s,r.nodeType===11?$t.call(r.childNodes):[r]));break;case"function":o(r(t));break}};return o},he=(t,e)=>{switch(e[0]){case"?":return re(t,e.slice(1),!1);case".":return le(t,e.slice(1));case"o":if(e[1]==="n")return ae(t,e)}switch(e){case"ref":return ce(t);case"aria":return se(t)}return oe(t,e)};function me(t){const{type:e,path:n}=t,s=n.reduceRight(ue,this);return e==="node"?ge(s):e==="attr"?he(s,t.name):de(s)}const C="is\xB5",xt=G(new WeakMap),fe=/^(?:plaintext|script|style|textarea|title|xmp)$/i,E=()=>({stack:[],entry:null,wire:null}),xe=(t,e)=>{const{content:n,updates:s}=ye(t,e);return{type:t,template:e,content:n,updates:s,wire:null}},be=(t,e)=>{const n=Kt(e,C,t==="svg"),s=pe(n,t),o=$e(s),r=[],i=e.length-1;let l=0,c=`${C}${l}`;for(;l<i;){const a=o.nextNode();if(!a)throw`bad template: ${n}`;if(a.nodeType===8)a.data===c&&(r.push({type:"node",path:X(a)}),c=`${C}${++l}`);else{for(;a.hasAttribute(c);)r.push({type:"attr",path:X(a),name:a.getAttribute(c)}),a.removeAttribute(c),c=`${C}${++l}`;fe.test(a.tagName)&&a.textContent.trim()===`<!--${c}-->`&&(a.textContent="",r.push({type:"text",path:X(a)}),c=`${C}${++l}`)}}return{content:s,nodes:r}},ye=(t,e)=>{const{content:n,nodes:s}=xt.get(e)||xt.set(e,be(t,e)),o=Z.call(document,n,!0),r=s.map(me,o);return{content:o,updates:r}},H=(t,{type:e,template:n,values:s})=>{const{length:o}=s;bt(t,s,o);let{entry:r}=t;(!r||r.template!==n||r.type!==e)&&(t.entry=r=xe(e,n));const{content:i,updates:l,wire:c}=r;for(let a=0;a<o;a++)l[a](s[a]);return c||(r.wire=ee(i))},bt=({stack:t},e,n)=>{for(let s=0;s<n;s++){const o=e[s];o instanceof J?e[s]=H(t[s]||(t[s]=E()),o):q(o)?bt(t[s]||(t[s]=E()),o,o.length):t[s]=null}n<t.length&&t.splice(n)};function J(t,e,n){this.type=t,this.template=e,this.values=n}const{create:Se,defineProperties:we}=Object,yt=t=>{const e=G(new WeakMap),n=s=>(o,...r)=>H(s,{type:t,template:o,values:r});return we((s,...o)=>new J(t,s,o),{for:{value(s,o){const r=e.get(s)||e.set(s,Se(null));return r[o]||(r[o]=n(E()))}},node:{value:(s,...o)=>H(E(),{type:t,template:s,values:o}).valueOf()}})},St=G(new WeakMap),ve=(t,e)=>{const n=typeof e=="function"?e():e,s=St.get(t)||St.set(t,E()),o=n instanceof J?H(s,n):n;return o!==s.wire&&(s.wire=o,t.textContent="",t.appendChild(o.valueOf())),t},Ae=yt("html");yt("svg");var m={uhtml:{render:ve,html:Ae},globals:{now:Date.now,window,setTimeout,random:Math.random,DocumentFragment}};const{now:wt,setTimeout:Te}=m.globals,vt=1e3/60,At=(t,e)=>{const n=wt(),s=t();Te(()=>{const o=wt()<n+vt?e+1:Math.max(e-1,1);At(s,o)},e)},Tt=32,I=32,Me=1/5,K=1/15,Mt=1/15,Ct=45,Q=30;var U=t=>{let e=t;const n=new Map;return{next:s=>{e=s(e),n.forEach(o=>o(e))},subscribe:s=>{s(e);const o={};return n.set(o,s),o},unsubscribe:s=>n.delete(s)}};const{random:Ce}=m.globals,f=()=>[...Array(10)].map(()=>Math.round(Ce())),Y=U(f()),Ee=t=>{Y.next(e=>e.map((n,s)=>{const o=t[s];return n===o?n:Math.min(Math.max(n-Mt,o),n+Mt)}))},{window:V}=m.globals,Et=()=>({width:V.innerWidth,height:V.innerHeight}),x=U(Et());V.addEventListener("resize",()=>x.next(Et));var It=Object.assign;const{render:Ie,html:Ne}=m.uhtml,{DocumentFragment:Oe}=m.globals,g=(t,e)=>{const n=new Oe,s=r=>Ie(n,e(Ne)(r));let o=t;return{render:()=>s(o),update:r=>{o=It(It({},o),r(o)),s(o)}}},ke=t=>t.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`),p=t=>Object.entries(t).reduce((e,[n,s])=>`${e}${ke(n)}:${s};`,"");var Re=Object.assign;const _e=t=>g({bit:t,cellWidth:0},e=>({bit:n,cellWidth:s})=>{const o=255*n,r=255-o,i=p({display:"inline-block",width:`${s}px`,height:`${s}px`,lineHeight:`${s}px`,fontSize:`${s}px`,textAlign:"center",backgroundColor:`rgb(${o},${o},${o})`,color:`rgb(${r},${r},${r})`});return e`<div style=${i}>${n<.5?0:1}</div>`});var N=()=>{const t={tape:f(),style:{},cellWidth:0},e=t.tape.map(n=>_e(n));return g(t,n=>({tape:s,style:o,cellWidth:r})=>{const i=p(Re({width:`${r*10}px`,height:`${r}px`},o));return e.forEach((l,c)=>l.update(()=>({cellWidth:r,bit:s[c]}))),n`<div style=${i}>${e.map(l=>l.render())}</div>`})};const tt=N(),et=g({position:0},t=>({position:e,cellWidth:n})=>{const s=p({position:"absolute",top:"30%",left:"50%",transform:`translate(${n*(-.5-e)}px, 0)`});return tt.update(()=>({cellWidth:n})),t`<div style=${s}>${tt.render()}</div>`});x.subscribe(({width:t,height:e})=>{const n=Math.min(t*.15,e*.3);et.update(()=>({cellWidth:n}))}),Y.subscribe(t=>tt.update(()=>({tape:t})));var w=Object.assign;const Le={state:0,cellWidth:0},Pe=t=>"E01234AH"[t+1],y=g(Le,t=>({state:e,cellWidth:n})=>{const s=n/16,o=p({position:"absolute",top:"30%",left:"50%",transform:`translate(-${n/2+s}px, 0)`}),r={position:"absolute",height:`${n}px`,background:"radial-gradient(#aaa, #666)"},i=w(w({},r),{width:`${s*2}px`,borderRadius:`${s}px ${s}px 0 0`}),l=p(w(w({},r),{top:`${n}px`,width:`${n+s*2}px`,borderRadius:`0 0 ${s}px ${s}px`,fontSize:`${n*.8}px`,lineHeight:`${n}px`,textAlign:"center",color:"white"}));return t`<div style=${o}>    <div style=${p(i)} />    <div style=${p(w(w({},i),{left:`${n}px`}))} />    <div style=${l}>${Pe(e)}</div>  </div>`});x.subscribe(({width:t,height:e})=>{const n=Math.min(t*.15,e*.3);y.update(()=>({cellWidth:n}))});const nt=N(),st=N(),Nt=t=>nt.update(()=>({tape:t})),je={fontSize:10},We=p({position:"absolute",top:"3%",width:"100%",fontFamily:"serif",color:"white"}),He=t=>p({margin:"0 auto",fontSize:`${t}px`,lineHeight:`${t}px`}),Ot=g(je,t=>({fontSize:e})=>t`<div style=${We}>  <table style=${He(e)}>    <tr><td>ORDER:</td><td>${nt.render()}</td></tr>    <tr><td>TAPE:</td><td>${st.render()}</td></tr>  </table></div>`);x.subscribe(({width:t,height:e})=>{const n=Math.min(t*.05,e*.07);Ot.update(()=>({fontSize:n*.6})),nt.update(()=>({cellWidth:n})),st.update(()=>({cellWidth:n}))}),Y.subscribe(t=>st.update(()=>({tape:t})));const Ue={number:1,timeLeft:0,score:0,fontSize:0},ze=t=>p({position:"absolute",top:"1%",left:"1%",fontSize:`${t}px`,color:"white",fontFamily:"serif"}),De=t=>p({fontSize:`${t*.7}px`}),Fe=t=>p({position:"absolute",bottom:"1%",left:"1%",fontSize:`${t}px`,color:"white",fontFamily:"serif"}),ot=t=>[...t.toString()].reduceRight(([e,n],s)=>e.length===3?[s,`,${e}${n}`]:[`${s}${e}`,n],["",""]).join``,kt=t=>(t*100|0).toString().padStart(4,"0").replace(/^(..)(..)/,"$1.$2"),v=g(Ue,t=>({number:e,timeLeft:n,score:s,fontSize:o})=>t`  <div style=${ze(o)}>    No.${e}<span style=${De(o)}>/${Tt}</span><br>    ${kt(n)}  </div>  <div style=${Fe(o)}>Score: ${ot(s)}</div>`);x.subscribe(({width:t,height:e})=>{v.update(()=>({fontSize:Math.min(t*.05,e*.07)*.6}))});const O=[...Array(10)].map((t,e)=>({direction:1,nextChar:e&1,nextState:e>>1})),A=U(O),rt=(t,e)=>A.next(n=>[...n.slice(0,t),e(n[t]),...n.slice(t+1)]),Rt=U([]),k=t=>Rt.next(e=>[...e,t]),R=()=>{let t;return Rt.next(([e,...n])=>(t=e,n)),t},h={reset:{},halt:{},pass:{},run:{},goNext:{}};var T=Object.assign;const Be=(t,e)=>({state0:t,char0:e,direction:1,char1:e,state1:t,disabled:!1}),Ge=p({display:"inline-block",margin:"1% 1%",textAlign:"center",whiteSpace:"nowrap"}),qe=t=>t<0?"L":"R",Xe=["0","1","2","3","4","A"],Ze=(t,e)=>()=>{rt(t,n=>T(T({},n),{direction:-e}))},Je=(t,e)=>()=>{rt(t,n=>T(T({},n),{nextChar:1-e}))},Ke=(t,e)=>()=>{rt(t,n=>T(T({},n),{nextState:(e+1)%6}))};var Qe=t=>g(Be(t>>1,t&0),e=>({state0:n,char0:s,direction:o,char1:r,state1:i,disabled:l})=>e`<div style=${Ge}>${`<${n},${s},`}<button onclick=${Ze(t,o)} .disabled=${l}>${qe(o)}</button>${","}<button onclick=${Je(t,r)} .disabled=${l}>${r}</button>${","}<button onclick=${Ke(t,i)} .disabled=${l}>${Xe[i]}</button>${">"}</div>`),Ye=Object.assign;const Ve={fontSize:0,style:{display:"none"},disabled:!0},it=[...Array(10)].map((t,e)=>Qe(e)),tn=(t,e)=>p(Ye({position:"absolute",top:"29%",left:"50%",transform:"translate(-50%, 0)",width:`${t*20}px`,padding:"5px 0 10px 0",textAlign:"center",fontSize:`${t}px`,lineHeight:`${t}px`,border:"1px solid #999",backgroundColor:"rgba(51, 51, 153, 0.8)",color:"white",fontFamily:"Courier New"},e)),en=p({marginBottom:"10px"}),nn=t=>{const e=`${t*1.3}px`;return p({height:e,marginTop:"0.1em",padding:"0 1em",fontSize:e,lineHeight:e,borderRadius:`${t*.15}px`})},_=g(Ve,(({onClickRunButton:t})=>e=>({fontSize:n,style:s,disabled:o})=>(it.forEach(r=>r.update(()=>({disabled:o}))),e`<div style=${tn(n,s)}>    <span style=${en}>Program</span>    <div>${it.map(r=>r.render())}</div>    <button      style=${nn(n)}      .disabled=${o}      onclick=${t}>RUN</button>  </div>`))({onClickRunButton:()=>{k(h.run),_.update(()=>({disabled:!0}))}}));x.subscribe(({width:t,height:e})=>{_.update(()=>({fontSize:Math.min(t*.04,e*.06)}))}),A.subscribe(t=>{t.forEach(({direction:e,nextChar:n,nextState:s},o)=>it[o].update(()=>({state0:o>>1,char0:o&1,direction:e,char1:n,state1:s})))});const sn={running:!1,disabled:!0,fontSize:0,height:0},on=p({display:"table-cell",position:"absolute",top:"19%",width:"100%",height:"10%",textAlign:"center",verticalAlign:"middle",fontFamily:"Courier New"}),_t=(t,e)=>p({margin:`${(e-t)/2}px 0.5em`,width:`${t*5}px`,height:`${t}px`,fontSize:`${t}px`,borderRadius:t*.15}),rn=()=>k(h.reset),an=()=>k(h.halt),cn=()=>k(h.pass),z=g(sn,t=>({running:e,disabled:n,fontSize:s,height:o})=>t`<div style=${on}>  <button    style=${_t(s,o)}    onclick=${e?an:rn}    .disabled=${n}>${e?"HALT":"RESET"}</button>  <button    style=${_t(s,o)}    onclick=${cn}    .disabled=${n||e}>PASS</button></div>`);x.subscribe(({width:t,height:e})=>{z.update(()=>({fontSize:Math.min(t*.05,e*.065),height:e*.1}))});const ln=t=>p({display:t===0?"none":"block",position:"absolute",top:0,left:0,width:"100%",height:"100%",backgroundColor:"rgba(0, 0, 0, 0.6)",opacity:t}),dn=()=>k(h.goNext);var S=g({opacity:0},t=>({opacity:e})=>t`<div style=${ln(e)} onclick=${dn}></div>`);const b={pass:{},solved:{},timeup:{}},un={type:b.pass,commandsSaved:0,accepted:!1,steps:0,timeLeft:0,opacity:0,fontSize:0},pn=t=>p({display:t===0?"none":"block",position:"absolute",top:"10%",width:"100%",textAlign:"center",color:"white",opacity:t,filter:"drop-shadow(0 0 0.3rem black)"}),$n=new Map([[b.pass,"#ccc"],[b.solved,"#cfc"],[b.timeup,"#ccf"]]),gn=(t,e)=>p({color:$n.get(t),fontSize:`${e}px`}),hn=new Map([[b.pass,"Pass"],[b.solved,"Solved!"],[b.timeup,"Time's up."]]),mn=t=>p({display:"inline-block",margin:`${t}px 0`,fontSize:`${t}px`,color:"white"}),fn=t=>p({fontSize:`${t}px`}),Lt=(t,e,n,s)=>(t+(e?1:0))*100*n*.1*(s/I)*3|0,L=g(un,t=>({type:e,commandsSaved:n,accepted:s,steps:o,timeLeft:r,opacity:i,fontSize:l})=>t`<div style=${pn(i)}>  <div style=${gn(e,l*1.3)}>${hn.get(e)}</div>  <table style=${mn(l)}>    <tr>      <td>Saved + accepted</td>      <td />      <td>Steps</td>      <td />      <td>Time left</td>    </tr>    <tr>      <td>((${n} + ${s?1:0}) &times; 100)</td>      <td>&times;</td>      <td>(${o} &times; 0.1)</td>      <td>&times;</td>      <td>(${kt(r)} / ${I}.00 &times; 3)</td>    </tr>  </table>  <div style=${fn(l)}>Score: +${ot(Lt(n,s,o,r))}</div></div>`);x.subscribe(({width:t,height:e})=>{L.update(()=>({fontSize:Math.min(t*.04,e*.06)}))});const xn={finished:!1,order:Array(10).fill(0),tape:Array(10).fill(0),score:0,opacity:0,fontSize:0},bn=(t,e)=>p({display:t===0?"none":"block",position:"absolute",top:"10%",width:"100%",fontSize:`${e}px`,lineHeight:`${e}px`,textAlign:"center",color:"white",opacity:t,filter:"drop-shadow(0 0 0.3rem black)"}),yn=(t,e)=>p({marginBottom:`${e}px`,fontSize:`${e}px`,color:t?"#fc9":"#c99"}),at=N(),ct=N(),Sn={display:"inline-block"};[at,ct].forEach(t=>t.update(()=>({style:Sn})));const wn=t=>p({fontSize:`${t}px`,marginTop:`${t}px`}),D=g(xn,t=>({finished:e,caseNumber:n,order:s,tape:o,score:r,opacity:i,fontSize:l})=>(at.update(()=>({tape:s,cellWidth:l})),ct.update(()=>({tape:o,cellWidth:l})),t`<div style=${bn(i,l)}>    <div style=${yn(e,l*1.3)}>${e?"Finished!":"Game Over"}</div>    <div style=${`display:${e?"none":"block"}`}>${e?"":`at No.${n}`}</div>    ${e?"":at.render()}<br>${e?"":ct.render()}<br>    <div style=${wn(l)}>Total score: ${ot(r)}</div>  </div>`));x.subscribe(({width:t,height:e})=>{D.update(()=>({fontSize:Math.min(t*.04,e*.06)}))});const vn={opacity:0,fontSize:0},An=t=>p({display:t===0?"none":"block",position:"absolute",width:"100%",top:"30%",textAlign:"center",color:"white",opacity:t}),Tn=t=>p({fontSize:`${t}px`,color:"orange"}),P=g(vn,t=>({opacity:e,fontSize:n})=>t`<div style=${An(e)}>    <div style=${Tn(n)}>TMP</div>  </div>`);x.subscribe(({width:t,height:e})=>{P.update(()=>({fontSize:Math.min(t*.04,e*.6)*3}))});var d={title:{title:{}},main:{programWindowOpening:{},programming:{},programWindowClosing:{},running:{}},result:{caseResult:{},totalResult:{}}};const{now:Mn}=m.globals,Pt=({startedAt:t})=>{const e=Math.max(I-(Mn()-t)/1e3,0);v.update(()=>({timeLeft:e}))},Cn=(t,e)=>{const n=e-t,s=n*Me;return K<Math.abs(s)?t+s:t+Math.min(Math.max(-K,n),K)},j=({currentTape:t,position:e})=>{Ee(t),et.update(({position:n})=>({position:Cn(n,e)}))},jt=(t,e)=>{const n=Math.max((1-t/20)*50,0),s=Math.min((1+t/20)*50,100),o=Math.min(Math.max((t-30)/10,0)*87+13,100),r=`polygon(${n}% 0, ${s}% 0, ${s}% ${o}%, ${n}% ${o}%)`;_.update(()=>({style:{clipPath:r},disabled:e}))},{now:En,random:lt}=m.globals;var Wt=(t=0,e=0)=>({currentTape:n,position:s,machineState:o})=>{if(t===0){const i=f();return Nt(i),v.update(()=>({number:1,timeLeft:I,score:0})),S.update(()=>({opacity:1})),{nextId:d.title.title,nextArgs:[1],stateUpdate:{position:0,machineState:0,order:i,currentTape:f()}}}if(j({currentTape:n,position:s}),y.update(()=>({state:o})),t<30)return P.update(()=>({opacity:t/30})),{nextId:d.title.title,nextArgs:[t+1]};if(t===30)return{nextId:d.title.title,nextArgs:[R()===h.goNext?31:30,(e+1)%Q],stateUpdate:e===0?{currentTape:[...n.slice(0,s),Math.round(lt()),...n.slice(s+1,10)],position:{0:1,9:8}[s]||s+(lt()<.5?-1:1),machineState:Math.floor(lt()*5)}:{}};if(t<50){const i=(50-t)/20;return P.update(()=>({opacity:i})),S.update(()=>({opacity:i})),{nextId:d.title.title,nextArgs:[t+1]}}P.update(()=>({opacity:0})),S.update(()=>({opacity:0})),A.next(()=>O);const r=f();return{nextId:d.main.programWindowOpening,nextArgs:[0],stateUpdate:{caseNumber:1,score:0,order:f(),originalTape:r,currentTape:r,position:0,machinState:0,executedIndices:new Map,startedAt:En()}}},Ht=Object.assign;const{now:In}=m.globals,Ut=(t,e,n)=>({type:t,time:0,accepted:e,timeLeft:n}),Nn=(t,e)=>(t*6+e)/7|0,On=t=>({executedIndices:e,steps:n,caseNumber:s,score:o})=>{const{time:r,type:i,accepted:l,timeLeft:c}=t;S.update(()=>({opacity:Math.min(r/10,1)})),L.update(()=>({opacity:Math.min(Math.max(0,(r-10)/30),1)})),r===0&&(L.update(()=>({type:i,commandsSaved:10-e.size,accepted:l,steps:n,timeLeft:c})),_.update(()=>({disabled:!0}))),v.update(({score:u})=>({score:r===40?o:Nn(u,o)}));const a=R();if(r>=40&&a===h.goNext){if(L.update(()=>({opacity:0})),s===Tt)return{nextId:d.result.totalResult,nextArgs:[!0,0]};const u=s+1;v.update(()=>({number:u}));const $=f();return S.update(()=>({opacity:0})),A.next(()=>O),y.update(()=>({state:0})),{nextId:d.main.programWindowOpening,nextArgs:[0],stateUpdate:{caseNumber:u,order:f(),originalTape:$,currentTape:$,position:0,machineState:0,executedIndices:new Map,startedAt:In()}}}return{nextId:d.result.caseResult,nextArgs:[Ht(Ht({},t),{time:r+1})],stateUpdate:r===0?{score:o+Lt(10-e.size,l,n,c)}:{}}},kn=(t,e)=>({order:n,originalTape:s,score:o,caseNumber:r})=>{const i=R();return e<=40?(S.update(()=>({opacity:Math.min(e/10,1)})),D.update(()=>({opacity:Math.max(0,(e-10)/30),finished:t,score:o,caseNumber:r,order:n,tape:s})),{nextId:d.result.totalResult,nextArgs:[t,e+1]}):e===41?{nextId:d.result.totalResult,nextArgs:[t,i===h.goNext?42:41]}:e<=61?(D.update(()=>({opacity:(61-e)/20})),{nextId:d.result.totalResult,nextArgs:[t,e+1]}):{nextId:d.title.title,nextArgs:[0]}},{now:F}=m.globals,B=(t,e)=>Math.max(I-(t-e)/1e3,0),Rn=t=>e=>{Nt(e.order);const n=t<Ct;return jt(t,n),j(e),z.update(()=>({running:!1,disabled:n})),Pt(e),n?{nextId:d.main.programWindowOpening,nextArgs:[t+1]}:{nextId:d.main.programming,nextArgs:[]}},_n=()=>t=>{j(t),Pt(t);const e=R();return e===h.run?(y.update(()=>({state:0})),{nextId:d.main.programWindowClosing,nextArgs:[Ct],stateUpdate:{currentTape:t.originalTape,machineState:0,position:0,runAt:F()}}):(e===h.reset&&A.next(()=>O),e===h.pass?{nextId:d.result.caseResult,nextArgs:[Ut(b.pass,!1,B(F(),t.startedAt))],stateUpdate:{steps:0}}:{nextId:d.main.programming,nextArgs:[],stateUpdate:e===h.reset?{currentTape:t.originalTape,machineState:0,position:0}:{}})},Ln=t=>e=>(jt(t,!0),j(e),z.update(()=>({running:t===0,disabled:t>0})),t===0?{nextId:d.main.running,nextArgs:[0],stateUpdate:{steps:0,executedIndices:new Set}}:{nextId:d.main.programWindowClosing,nextArgs:[t-1]});let zt=O;A.subscribe(t=>{zt=t});const Pn=({currentTape:t,position:e,machineState:n,steps:s,executedIndices:o})=>{const r=n<<1|t[e],{direction:i,nextChar:l,nextState:c}=zt[r];return{currentTape:[...t.slice(0,e),l,...t.slice(e+1)],position:e+i,machineState:c,steps:s+1,executedIndices:new Set([...o,r])}},jn=t=>e=>{const{position:n,machineState:s,startedAt:o,runAt:r,order:i,currentTape:l}=e;if(R()===h.halt)return y.update(()=>({state:6})),B(F(),o)>0?{nextId:d.main.programWindowOpening,nextArgs:[0]}:{nextId:d.result.totalResult,nextArgs:[!1,0]};j(e);const c=n<0||n>=10?-1:s;if([-1,5].includes(c)&&t===Q){if(y.update(()=>({state:c})),i.join``===l.join``){const a=B(r,o),u=a>0?b.solved:b.timeup;return{nextId:d.result.caseResult,nextArgs:[Ut(u,c===5,a)]}}return B(F(),o)>0?{nextId:d.main.programWindowOpening,nextArgs:[0],stateUpdate:{machineState:c}}:{nextId:d.result.totalResult,nextArgs:[!1,0]}}return y.update(()=>({state:s})),{nextId:d.main.running,nextArgs:[t===Q?0:t+1],stateUpdate:t===0?Pn(e):{}}};var Dt=Object.assign;const{now:Wn}=m.globals,Hn=new Map([[d.title.title,Wt],[d.main.programWindowOpening,Rn],[d.main.programming,_n],[d.main.programWindowClosing,Ln],[d.main.running,jn],[d.result.caseResult,On],[d.result.totalResult,kn]]),Un=(t,e)=>({score:0,caseNumber:1,order:t,originalTape:e,currentTape:e,position:0,machineState:0,startedAt:Wn(),runAt:null,steps:0,executedIndices:new Set}),Ft=(t,e)=>()=>{const{nextId:n,nextArgs:s,stateUpdate:o}=t(e);return Ft(Hn.get(n)(...s),Dt(Dt({},e),o))},{render:zn,html:Dn}=m.uhtml;zn(document.getElementById("root"),Dn`${[v,Ot,et,y,z,_,S,L,D,P].map(t=>t.render())}`),At(Ft(Wt(0),Un(f(),f())),vt)})();
