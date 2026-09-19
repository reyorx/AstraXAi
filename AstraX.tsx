 "use client";
import {useEffect,useState} from "react";

type Msg={role:"user"|"assistant",content:string};
export default function AstraX(){
 const [messages,setMessages]=useState<Msg[]>([]);
 const [input,setInput]=useState(""); const [thinking,setThinking]=useState(false);
 const [usage,setUsage]=useState<{used:number,max:number,resetAt:number|null}>({used:0,max:1000,resetAt:null});
 const [drawer,setDrawer]=useState(false);
 useEffect(()=>{const s=localStorage.getItem("astrax-chat");if(s)setMessages(JSON.parse(s)); fetch("/api/usage").then(r=>r.json()).then(setUsage).catch(()=>{});},[]);
 useEffect(()=>localStorage.setItem("astrax-chat",JSON.stringify(messages)),[messages]);

 async function send(){
  if(!input.trim()||thinking)return;
  const text=input.trim(); setInput("");
  const next=[...messages,{role:"user" as const,content:text},{role:"assistant" as const,content:""}];
  setMessages(next);setThinking(true);
  const res=await fetch("/api/chat",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({messages:next.slice(0,-1)})});
  if(!res.ok){const e=await res.text();setMessages([...next.slice(0,-1),{role:"assistant",content:"AstraX error: "+e}]);setThinking(false);return}
  const reader=res.body?.getReader(); const decoder=new TextDecoder(); let answer="";
  if(reader){while(true){const {done,value}=await reader.read();if(done)break;answer+=decoder.decode(value,{stream:true});setMessages(m=>{const c=[...m];c[c.length-1]={role:"assistant",content:answer};return c;});}}
  setThinking(false); fetch("/api/usage").then(r=>r.json()).then(setUsage).catch(()=>{});
 }
 function reset(){setMessages([]);localStorage.removeItem("astrax-chat")}
 return <main className="shell">
  <aside className={drawer?"side open":"side"}><div className="brand"><div className="core small"></div><b>AstraX</b></div>
   <button onClick={reset}>New Chat</button><div className="nav">Recent Chats<br/>Search Chats<br/>Projects<br/>Code Studio</div>
   <div className="profile">orcx<br/><span>Personal workspace</span></div>
  </aside>
  <section className="main">
   <header><button className="menu" onClick={()=>setDrawer(!drawer)}>☰</button><div className="headerCore"><div className="core"></div><span>AstraX</span></div><span className="usage">{usage.used}/{usage.max}</span></header>
   <div className="chat">
    {messages.length===0?<div className="welcome"><div className="core hero"></div><h1>AstraX</h1><p>Assist · Build · Learn · Analyze · Create</p><div className="suggest"><button onClick={()=>setInput("Bantu saya membuat website modern")}>Build a website</button><button onClick={()=>setInput("Jelaskan konsep ini dengan sederhana")}>Learn something</button><button onClick={()=>setInput("Analisis file atau data saya")}>Analyze</button></div></div>:
    messages.map((m,i)=><div className={"msg "+m.role} key={i}>{m.role==="assistant"&&<div className="core tiny"></div>}<div className="bubble">{m.content||" "}</div></div>)}
    {thinking&&<div className="processing"><div className="core tiny pulse"></div><span>Processing</span></div>}
   </div>
   <div className="composer"><textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send()}}} placeholder="Message AstraX..." rows={1}/><button onClick={send} disabled={thinking}>Send</button></div>
  </section>
 </main>
}