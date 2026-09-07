'use client';
import { useEffect, useState } from 'react';

type Order = {
  id:string; created:number; amount:number; customerEmail:string; name:string; phone:string; delivery:string; address:string; postcode:string; quantity:string; repairType:string; corners:string; repairNotes:string; preferredTimes:string; completed:boolean; completedAt:string; orderNumber:string;
};

export default function AdminPage(){
  const [orders,setOrders]=useState<Order[]>([]),[password,setPassword]=useState(''),[loading,setLoading]=useState(true),[error,setError]=useState(''),[authed,setAuthed]=useState(false),[busy,setBusy]=useState('');
  async function load(){setLoading(true);setError('');const r=await fetch('/api/admin/orders',{cache:'no-store'});if(r.status===401){setAuthed(false);setLoading(false);return;}const d=await r.json();if(!r.ok){setError(d.error||'Unable to load orders');setLoading(false);return;}setOrders(d.orders||[]);setAuthed(true);setLoading(false)}
  useEffect(()=>{load()},[]);
  async function login(e:React.FormEvent){e.preventDefault();setError('');const r=await fetch('/api/admin/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({password})});const d=await r.json();if(!r.ok){setError(d.error||'Login failed');return;}setPassword('');await load()}
  async function complete(o:Order){if(!confirm(`Mark ${o.orderNumber} as completed and email ${o.name}?`))return;setBusy(o.id);setError('');const r=await fetch('/api/admin/orders/complete',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({sessionId:o.id})});const d=await r.json();setBusy('');if(!r.ok){setError(d.error||'Unable to complete order');return;}await load()}
  async function logout(){await fetch('/api/admin/login',{method:'DELETE'});setAuthed(false);setOrders([])}
  const handover=(o:Order)=>o.delivery==='dropoff'?'Customer drop-off & collection':o.delivery==='nw11'?'Collection & return - NW11':'Collection & return - NW4';
  const repair=(o:Order)=>o.repairType==='full'?'All 4 corners':`${o.corners||'?'} corner(s)`;
  if(loading)return <main style={styles.page}><div style={styles.card}>Loading…</div></main>;
  if(!authed)return <main style={styles.page}><form onSubmit={login} style={styles.login}><h1 style={styles.h1}>London Tzitzis Repair</h1><p style={styles.sub}>Order admin</p><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Admin password" style={styles.input} autoFocus/><button style={styles.primary}>Log in</button>{error&&<p style={styles.error}>{error}</p>}</form></main>;
  return <main style={styles.page}><div style={styles.top}><div><h1 style={styles.h1}>Orders</h1><p style={styles.sub}>London Tzitzis Repair</p></div><button onClick={logout} style={styles.secondary}>Log out</button></div>{error&&<p style={styles.error}>{error}</p>}<div style={styles.list}>{orders.map(o=><section key={o.id} style={{...styles.order,opacity:o.completed?.72:1}}><div style={styles.orderTop}><div><strong style={{fontSize:18}}>{o.orderNumber}</strong><div style={styles.muted}>{new Date(o.created*1000).toLocaleString('en-GB')}</div></div><div style={o.completed?styles.done:styles.open}>{o.completed?'Completed':'Open'}</div></div><div style={styles.grid}><div><span style={styles.label}>Customer</span><b>{o.name}</b><br/><span>{o.phone}</span><br/><span>{o.customerEmail}</span></div><div><span style={styles.label}>Order</span><b>{repair(o)}</b><br/><span>{o.quantity} tallis/oim</span><br/><span>£{(o.amount/100).toFixed(2)}</span></div><div><span style={styles.label}>Handover</span><b>{handover(o)}</b>{o.delivery!=='dropoff'&&<><br/><span>{o.address}{o.postcode?`, ${o.postcode}`:''}</span></>}</div></div>{o.repairNotes&&<p style={styles.note}><b>Notes:</b> {o.repairNotes}</p>}{o.preferredTimes&&<p style={styles.note}><b>Preferred times:</b> {o.preferredTimes}</p>}<div style={styles.actions}>{o.completed?<span style={styles.muted}>Completed {o.completedAt?new Date(o.completedAt).toLocaleString('en-GB'):''}</span>:<button disabled={busy===o.id} onClick={()=>complete(o)} style={styles.primary}>{busy===o.id?'Sending email…':o.delivery==='dropoff'?'Mark ready for collection':'Mark completed'}</button>}</div></section>)}</div>{!orders.length&&<div style={styles.card}>No paid orders found.</div>}</main>
}

const styles:Record<string,React.CSSProperties>={
  page:{minHeight:'100vh',background:'#f4f6f8',padding:'32px 16px',fontFamily:'Arial, sans-serif',color:'#172033'},
  top:{maxWidth:1050,margin:'0 auto 20px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:16},
  h1:{fontFamily:'Georgia, serif',margin:0,fontSize:32},sub:{margin:'4px 0 0',color:'#6b7280'},
  login:{maxWidth:400,margin:'12vh auto 0',background:'#fff',padding:32,borderRadius:16,boxShadow:'0 8px 30px #0000000d'},
  input:{width:'100%',padding:'13px 14px',fontSize:16,border:'1px solid #d1d5db',borderRadius:9,margin:'20px 0 12px'},
  primary:{border:0,borderRadius:9,padding:'12px 16px',background:'#172033',color:'#fff',fontWeight:700,cursor:'pointer'},
  secondary:{border:'1px solid #cfd5dc',borderRadius:9,padding:'10px 14px',background:'#fff',cursor:'pointer'},
  list:{maxWidth:1050,margin:'0 auto',display:'grid',gap:14},order:{background:'#fff',border:'1px solid #e5e7eb',borderRadius:14,padding:20},card:{maxWidth:1050,margin:'0 auto',background:'#fff',borderRadius:14,padding:24},
  orderTop:{display:'flex',justifyContent:'space-between',gap:16,marginBottom:18},muted:{fontSize:13,color:'#6b7280',marginTop:4},
  open:{background:'#fff4d6',color:'#8a5b00',fontSize:12,fontWeight:800,padding:'6px 10px',borderRadius:999,height:'fit-content'},done:{background:'#eaf7ef',color:'#176b3a',fontSize:12,fontWeight:800,padding:'6px 10px',borderRadius:999,height:'fit-content'},
  grid:{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))',gap:18},label:{display:'block',fontSize:11,textTransform:'uppercase',letterSpacing:1,color:'#8a919c',marginBottom:5},
  note:{background:'#f8f6f1',padding:12,borderRadius:8,fontSize:14},actions:{marginTop:16,display:'flex',justifyContent:'flex-end'},error:{maxWidth:1050,margin:'10px auto',color:'#b42318',background:'#fff0ee',padding:12,borderRadius:8}
};
