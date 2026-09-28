const $=s=>document.querySelector(s);
function skills(f){$("#sk").innerHTML=Object.entries(S).filter(([k])=>f=="all"||k==f).map(([k,v])=>`<div><h3>${k}</h3><p>${v.map(x=>`<span>${x}</span>`).join("")}</p></div>`).join("")}
function work(f){$("#pj").innerHTML=P.filter(p=>f=="all"||p[1].split(" ").includes(f)).map(p=>`<article class="p1"><div class="top mono"><span>PROJECT / ${p[0]}</span><span>↗</span></div><div class="art"></div><div class="k">${p[2]}</div><h3>${p[3]}</h3><p>${p[4]}</p><div class="tags">${p[5].map(x=>`<span>${x}</span>`).join("")}</div></article>`).join("")}
skills("all");work("all");
document.querySelectorAll(".filters").forEach(g=>g.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;g.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x==b));(g.dataset.t=="sk"?skills:work)(b.dataset.f)}));
document.querySelectorAll(".cp").forEach(b=>b.onclick=async()=>{try{await navigator.clipboard.writeText(b.dataset.c);b.textContent="Copied";setTimeout(()=>b.textContent="Copy",1500)}catch(_){b.textContent="Select and copy"}});
$("#th").onclick=()=>{const r=document.documentElement,d=r.dataset.theme?r.dataset.theme=="dark":matchMedia("(prefers-color-scheme:dark)").matches;r.dataset.theme=d?"light":"dark"};
$("#f").onsubmit=async e=>{e.preventDefault();const st=$("#st"),btn=e.target.querySelector("button[type=submit]"),name=$("#n").value,email=$("#e").value,msg=$("#m").value;
if(!CONFIG.web3formsKey||CONFIG.web3formsKey.startsWith("YOUR_")){location.href=`mailto:${CONFIG.email}?subject=${encodeURIComponent("Portfolio contact from "+name)}&body=${encodeURIComponent(msg+"\n\n"+name+" — "+email)}`;return}
btn.disabled=true;st.textContent="Sending…";
try{const r=await fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({access_key:CONFIG.web3formsKey,subject:"Portfolio contact from "+name,from_name:name,name,email,message:msg,botcheck:$("#bc").checked})});
const j=await r.json();if(!j.success)throw 0;st.textContent="Message sent. Thank you, I will reply soon.";e.target.reset()}
catch(_){st.textContent="Could not send the message. Email me directly at "+CONFIG.email+"."}
btn.disabled=false};
