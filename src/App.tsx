import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// ─── DATA ────────────────────────────────────────────────────────────────────
const ROOMS = [
  { id:1,  name:"Penthouse Vista Mar",      location:"Punta Cana",    lat:18.5820, lng:-68.3731, category:"Lujo",       price:480, rating:4.98, reviews:312, capacity:4, beds:2, baths:2, sqm:120, amenities:["Piscina privada","Jacuzzi","Vista al mar","WiFi","Desayuno","Butler 24h","Terraza","Cocina gourmet"], booked:["2026-04-12","2026-04-13","2026-04-20"], desc:"Un refugio suspendido sobre el Caribe. Terrazas de travertino, piscina desbordante y silencio absoluto a 30 metros de altura.", image:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop" },
  { id:2,  name:"Villa Cacao",              location:"Las Terrenas",   lat:19.3143, lng:-69.5375, category:"Villas",     price:320, rating:4.95, reviews:187, capacity:6, beds:3, baths:2, sqm:200, amenities:["Jardín privado","BBQ","Piscina","WiFi","Cocina completa","Estacionamiento"], booked:["2026-04-10","2026-04-15","2026-04-16"], desc:"Casa en medio de una plantación de cacao. Arquitectura vernácula, madera local y una piscina que se mimetiza con la selva.", image:"https://images.unsplash.com/photo-1586375300773-8384e3e4916f?w=400&h=300&fit=crop" },
  { id:3,  name:"Loft Zona Colonial",       location:"Santo Domingo",  lat:18.4728, lng:-69.8987, category:"Urbano",     price:155, rating:4.87, reviews:443, capacity:2, beds:1, baths:1, sqm:65,  amenities:["WiFi","Smart TV","Gym","Rooftop bar","Cocina"], booked:["2026-04-11","2026-04-18","2026-04-19"], desc:"Planta alta de una casona del siglo XVI restaurada. Vigas originales, paredes de cal y todas las comodidades contemporáneas.", image:"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop" },
  { id:4,  name:"Cabaña Río Yaque",         location:"Jarabacoa",      lat:19.1194, lng:-70.6619, category:"Naturaleza", price:198, rating:4.92, reviews:256, capacity:4, beds:2, baths:1, sqm:80,  amenities:["Chimenea","Senderismo","WiFi","Vista montaña","Hamacas","BBQ"], booked:["2026-04-14","2026-04-22"], desc:"A orillas del río Yaque del Norte. Se duerme con el sonido del agua, se despierta con niebla entre los pinos.", image:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" },
  { id:5,  name:"Suite Coral",              location:"La Romana",      lat:18.4272, lng:-68.9725, category:"Lujo",       price:390, rating:4.99, reviews:98,  capacity:2, beds:1, baths:2, sqm:90,  amenities:["Spa privado","Masajes","Champaña","Cena romántica","Vista al mar","Jacuzzi","Butler"], booked:["2026-04-16","2026-04-17","2026-04-24"], desc:"La suite más solicitada del resort. Diseñada para dos: bañera exenta frente al océano, pétalos en la cama al llegar.", image:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop" },
  { id:6,  name:"Estudio Los Jardines",     location:"Santiago",       lat:19.4517, lng:-70.6970, category:"Urbano",     price:95,  rating:4.78, reviews:632, capacity:2, beds:1, baths:1, sqm:55,  amenities:["WiFi","Smart TV","Cocina","Lavandería","Gym","Parqueo"], booked:["2026-04-13","2026-04-20"], desc:"Estudio de diseño en el barrio más tranquilo de Santiago. Luz natural todo el día, planta aromática en el balcón.", image:"https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop" },
  { id:7,  name:"Bungalow Frente al Mar",   location:"Boca Chica",     lat:18.4500, lng:-69.6000, category:"Playa",      price:245, rating:4.91, reviews:174, capacity:2, beds:1, baths:1, sqm:55,  amenities:["Acceso directo playa","Kayak","Snorkeling","WiFi","Hamacas","Desayuno"], booked:["2026-04-11","2026-04-12","2026-04-25"], desc:"Abre la puerta y estás en la arena. Sin pasillos, sin ascensores, sin intermediarios entre tú y el mar.", image:"https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=400&h=300&fit=crop" },
  { id:8,  name:"Casa de las Monjas",       location:"Zona Colonial",  lat:18.4740, lng:-69.8900, category:"Cultural",   price:175, rating:4.85, reviews:321, capacity:5, beds:3, baths:2, sqm:160, amenities:["Patio colonial","WiFi","Tours guiados","Cocina","AC","Azotea"], booked:["2026-04-15","2026-04-21","2026-04-22"], desc:"Convento del s.XVII convertido en hospedería. El patio central con buganvillas es la mejor sala de estar de la ciudad.", image:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop" },
  { id:9,  name:"Eco Nido Samaná",          location:"Samaná",         lat:19.2061, lng:-69.3360, category:"Naturaleza", price:142, rating:4.88, reviews:209, capacity:2, beds:1, baths:1, sqm:45,  amenities:["Solar off-grid","Observación ballenas","Senderismo","Desayuno orgánico","WiFi satélite"], booked:["2026-04-13","2026-04-14","2026-04-19"], desc:"Cabaña de bambú certificada eco. Sin conexión eléctrica convencional. Con temporada de ballenas desde enero.", image:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" },
  { id:10, name:"Suite 31 Rooftop",         location:"Santo Domingo",  lat:18.4810, lng:-69.9010, category:"Lujo",       price:310, rating:4.93, reviews:145, capacity:2, beds:1, baths:2, sqm:85,  amenities:["Sky Bar privado","Piscina rooftop","WiFi","Desayuno","Vista 360°","Concierge","Spa"], booked:["2026-04-10","2026-04-17","2026-04-18"], desc:"El único piso completo disponible en el edificio más alto del Malecón. La ciudad a tus pies, el Caribe en el horizonte.", image:"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop" },
  { id:11, name:"Velero El Descubridor",    location:"Isla Saona",     lat:18.1040, lng:-68.6980, category:"Playa",      price:520, rating:5.0,  reviews:47,  capacity:2, beds:1, baths:1, sqm:40,  amenities:["Navegación privada","Snorkeling","Champaña","Chef a bordo","Pesca deportiva"], booked:["2026-04-11","2026-04-12","2026-04-13"], desc:"No hay habitación, hay horizonte. Un velero de 42 pies anclado en la laguna más transparente del Caribe dominicano.", image:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop" },
  { id:12, name:"Casa del Árbol",           location:"Puerto Plata",   lat:19.8000, lng:-70.6870, category:"Naturaleza", price:168, rating:4.96, reviews:88,  capacity:2, beds:1, baths:1, sqm:35,  amenities:["Vistas al bosque","Canopy","WiFi","Desayuno","Hamacas","Senderismo nocturno"], booked:["2026-04-16","2026-04-23","2026-04-24"], desc:"A 9 metros de altura entre robles centenarios. Acceso por pasarela colgante. Los monos aulladores son el despertador.", image:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop" },
];

const CATS = ["Todos","Lujo","Playa","Naturaleza","Urbano","Villas","Cultural"];
const MONTHS = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const WD = ["Do","Lu","Ma","Mi","Ju","Vi","Sá"];
const CAT_EMOJI = { Todos:"✦", Lujo:"◆", Playa:"◎", Naturaleza:"◉", Urbano:"▣", Villas:"⬡", Cultural:"◈" };

function fmt(y,m,d){ return `${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`; }
function dInM(y,m){ return new Date(y,m+1,0).getDate(); }
function fd(y,m){ return new Date(y,m,1).getDay(); }
function diff(a,b){ return Math.round((new Date(b)-new Date(a))/86400000); }
function td(){ const t=new Date(); return fmt(t.getFullYear(),t.getMonth(),t.getDate()); }
function fmtEs(s){ if(!s) return"—"; const[y,m,d]=s.split("-"); return `${parseInt(d)} ${MONTHS[+m-1].slice(0,3)} ${y}`; }
function code(){ return "RF-"+Math.random().toString(36).substring(2,7).toUpperCase(); }

// Real Map of Dominican Republic with Leaflet
function DRMap({ rooms, selected, onSelect, wishlist }) {
  const createIcon = (price, isSel, isWish) => {
    const size = isSel ? 40 : 32;
    const svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 2}" fill="white" stroke="${isSel ? '#111' : '#ccc'}" stroke-width="${isSel ? 3 : 2}"/>
      <text x="${size/2}" y="${size/2 + 4}" text-anchor="middle" font-family="Arial" font-size="${isSel ? 14 : 12}" font-weight="bold" fill="#111">$${price >= 1000 ? `${Math.round(price/1000)}k` : price}</text>
      ${isWish ? `<circle cx="${size - 8}" cy="8" r="5" fill="#e53935"/>` : ''}
    </svg>`;
    return new L.Icon({
      iconUrl: 'data:image/svg+xml;base64,' + btoa(svg),
      iconSize: [size, size],
      iconAnchor: [size/2, size],
      popupAnchor: [0, -size]
    });
  };

  return (
    <MapContainer center={[18.7357, -70.1627]} zoom={7} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {rooms.map(r => (
        <Marker
          key={r.id}
          position={[r.lat, r.lng]}
          icon={createIcon(r.price, selected?.id === r.id, wishlist.includes(r.id))}
          eventHandlers={{
            click: () => onSelect(r),
          }}
        >
          <Popup>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 14 }}>
              <strong>{r.name}</strong><br />
              {r.location}<br />
              ${r.price} / noche<br />
              ⭐ {r.rating}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

// ─── CALENDAR ────────────────────────────────────────────────────────────────
function Cal({ booked, ci, setCi, co, setCo, onClose }) {
  const now = new Date();
  const [yr,setYr] = useState(now.getFullYear());
  const [mo,setMo] = useState(now.getMonth());
  const [hov,setHov] = useState(null);
  const today = td();

  function st(d){
    const ds=fmt(yr,mo,d);
    if(ds<today) return "past";
    if(booked.includes(ds)) return "booked";
    if(ci&&co){ if(ds===ci) return "ci"; if(ds===co) return "co"; if(ds>ci&&ds<co) return "range"; }
    else if(ci){ if(ds===ci) return hov&&hov!==ci?"ci":"single"; if(hov&&hov>ci&&ds>ci&&ds<=hov) return "range"; if(hov&&ds===hov) return "co"; }
    if(ds===today) return "today";
    return "";
  }
  function click(d){
    const ds=fmt(yr,mo,d);
    if(ds<today||booked.includes(ds)) return;
    if(!ci||(ci&&co)){ setCi(ds); setCo(null); }
    else { if(ds<=ci){setCi(ds);setCo(null);return;} if(booked.some(b=>b>ci&&b<ds)) return; setCo(ds); }
  }
  const days=dInM(yr,mo), first=fd(yr,mo);
  const prev=()=>mo===0?(setMo(11),setYr(y=>y-1)):setMo(m=>m-1);
  const next=()=>mo===11?(setMo(0),setYr(y=>y+1)):setMo(m=>m+1);

  const dayStyle = (s) => {
    const base = { width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:500,cursor:"pointer",border:"none",background:"none",color:"#111",transition:"all .15s",fontFamily:"inherit" };
    if(s==="past"||s==="booked") return {...base,color:"#ccc",cursor:"not-allowed",borderRadius:"50%"};
    if(s==="ci") return {...base,background:"#111",color:"white",borderRadius:"50% 0 0 50%"};
    if(s==="co") return {...base,background:"#111",color:"white",borderRadius:"0 50% 50% 0"};
    if(s==="single") return {...base,background:"#111",color:"white",borderRadius:"50%"};
    if(s==="range") return {...base,background:"#f0f0f0",borderRadius:0};
    if(s==="today") return {...base,fontWeight:800,color:"#111",borderRadius:"50%"};
    return {...base,borderRadius:"50%"};
  };

  return (
    <div style={{position:"fixed",inset:0,zIndex:600,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.3)",backdropFilter:"blur(8px)",padding:20}} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{background:"white",borderRadius:20,padding:32,width:"100%",maxWidth:380,boxShadow:"0 40px 100px rgba(0,0,0,0.2)",animation:"popIn .25s ease"}}>
        <style>{`@keyframes popIn{from{opacity:0;transform:scale(.96) translateY(10px);}to{opacity:1;transform:scale(1) translateY(0);}}`}</style>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
          <button onClick={prev} style={{width:36,height:36,borderRadius:"50%",border:"1px solid #e5e5e5",background:"none",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s"}}>‹</button>
          <span style={{fontFamily:"'DM Serif Display',serif",fontSize:18,fontWeight:400,letterSpacing:"-.3px"}}>{MONTHS[mo]} {yr}</span>
          <button onClick={next} style={{width:36,height:36,borderRadius:"50%",border:"1px solid #e5e5e5",background:"none",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s"}}>›</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2,marginBottom:8}}>
          {WD.map(d=><div key={d} style={{textAlign:"center",fontSize:11,fontWeight:600,color:"#aaa",padding:"4px 0",letterSpacing:".3px"}}>{d}</div>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2}}>
          {Array.from({length:first}).map((_,i)=><div key={`e${i}`} style={{width:36,height:36}}/>)}
          {Array.from({length:days}).map((_,i)=>{
            const d=i+1,s=st(d),ds=fmt(yr,mo,d);
            return <button key={d} style={dayStyle(s)} onClick={()=>click(d)} onMouseEnter={()=>ci&&!co&&setHov(ds)} onMouseLeave={()=>setHov(null)}>{d}</button>;
          })}
        </div>
        <div style={{marginTop:24,display:"flex",justifyContent:"space-between",gap:10}}>
          <button onClick={()=>{setCi(null);setCo(null);}} style={{flex:1,padding:"11px",border:"1px solid #e5e5e5",borderRadius:10,background:"none",cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:"inherit",transition:"all .2s"}}>Limpiar</button>
          <button onClick={onClose} disabled={!ci||!co} style={{flex:2,padding:"11px",border:"none",borderRadius:10,background:ci&&co?"#111":"#f0f0f0",color:ci&&co?"white":"#aaa",cursor:ci&&co?"pointer":"not-allowed",fontSize:13,fontWeight:700,fontFamily:"inherit",transition:"all .2s"}}>
            {ci&&co?`${diff(ci,co)} noche${diff(ci,co)>1?"s":""} seleccionadas`:"Elige fecha de salida"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── CHECKOUT ────────────────────────────────────────────────────────────────
function Checkout({ room, ci, co, onClose }) {
  const [step,setStep] = useState(1);
  const [form,setForm] = useState({name:"",email:"",phone:"",nat:"",guests:"1",pay:"card",req:""});
  const [errs,setErrs] = useState({});
  const [conf,setConf] = useState("");
  const n=diff(ci,co), sub=n*room.price, tax=Math.round(sub*.18), svc=Math.round(sub*.05), tot=sub+tax+svc;
  function val(){
    const e={};
    if(!form.name.trim()) e.name="Requerido";
    if(!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email="Email inválido";
    if(!form.phone.match(/^\+?[\d\s\-]{7,}/)) e.phone="Inválido";
    setErrs(e); return !Object.keys(e).length;
  }
  function submit(){ if(!val()) return; setConf(code()); setStep(2); }

  const inp = (name,placeholder,type="text",full=false) => (
    <div style={{display:"flex",flexDirection:"column",gap:5,gridColumn:full?"1/-1":"auto"}}>
      <label style={{fontSize:10,fontWeight:700,color:"#aaa",letterSpacing:".8px",textTransform:"uppercase"}}>{placeholder}</label>
      <input type={type} placeholder={placeholder} value={form[name]} onChange={e=>setForm({...form,[name]:e.target.value})}
        style={{border:`1px solid ${errs[name]?"#e53935":"#e5e5e5"}`,borderRadius:10,padding:"12px 14px",fontSize:14,fontFamily:"inherit",outline:"none",transition:"border-color .2s",color:"#111"}}
        onFocus={e=>e.target.style.borderColor="#111"} onBlur={e=>e.target.style.borderColor=errs[name]?"#e53935":"#e5e5e5"}
      />
      {errs[name]&&<span style={{fontSize:11,color:"#e53935"}}>{errs[name]}</span>}
    </div>
  );

  return (
    <div style={{position:"fixed",inset:0,zIndex:700,background:"rgba(0,0,0,0.4)",backdropFilter:"blur(10px)",display:"flex",alignItems:"flex-start",justifyContent:"center",overflowY:"auto",padding:20}} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{background:"white",borderRadius:20,width:"100%",maxWidth:540,margin:"auto",boxShadow:"0 40px 100px rgba(0,0,0,0.25)",animation:"popIn .3s ease",overflow:"hidden"}}>
        {step===1 ? <>
          <div style={{padding:"22px 28px",borderBottom:"1px solid #f0f0f0",display:"flex",alignItems:"center",gap:14}}>
            <button onClick={onClose} style={{width:36,height:36,borderRadius:"50%",border:"1px solid #e5e5e5",background:"none",cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
            <span style={{fontFamily:"'DM Serif Display',serif",fontSize:20,fontWeight:400}}>Confirmar reserva</span>
          </div>
          <div style={{padding:28,maxHeight:"75vh",overflowY:"auto"}}>
            {/* Mini card */}
            <div style={{display:"flex",gap:14,background:"#fafafa",borderRadius:12,padding:14,marginBottom:22}}>
              <div style={{width:60,height:60,borderRadius:10,background:"linear-gradient(135deg,#f0ece4,#e0d8cc)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>🏨</div>
              <div>
                <div style={{fontFamily:"'DM Serif Display',serif",fontSize:15,fontWeight:400,marginBottom:2}}>{room.name}</div>
                <div style={{fontSize:12,color:"#888"}}>📍 {room.location}</div>
                <div style={{fontSize:12,color:"#555",marginTop:3,fontWeight:500}}>{fmtEs(ci)} → {fmtEs(co)} · {n} noche{n>1?"s":""}</div>
              </div>
            </div>
            {/* Price */}
            <div style={{background:"#fafafa",borderRadius:12,padding:16,marginBottom:22}}>
              {[["$"+room.price+" × "+n+" noches","$"+sub],["Impuestos (18%)","$"+tax],["Cargo por servicio","$"+svc]].map(([l,v])=>(
                <div key={l} style={{display:"flex",justifyContent:"space-between",fontSize:13,padding:"5px 0",color:"#555"}}><span>{l}</span><span>{v}</span></div>
              ))}
              <div style={{display:"flex",justifyContent:"space-between",fontSize:16,fontWeight:700,borderTop:"1px solid #e5e5e5",marginTop:10,paddingTop:10}}><span>Total</span><span>${tot}</span></div>
            </div>
            {/* Personal */}
            <div style={{marginBottom:20}}>
              <div style={{fontFamily:"'DM Serif Display',serif",fontSize:16,marginBottom:14}}>Datos personales</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                {inp("name","Nombre completo","text",true)}
                {inp("email","Correo electrónico","email",true)}
                {inp("phone","Teléfono","tel")}
                <div style={{display:"flex",flexDirection:"column",gap:5}}>
                  <label style={{fontSize:10,fontWeight:700,color:"#aaa",letterSpacing:".8px",textTransform:"uppercase"}}>Huéspedes</label>
                  <select value={form.guests} onChange={e=>setForm({...form,guests:e.target.value})} style={{border:"1px solid #e5e5e5",borderRadius:10,padding:"12px 14px",fontSize:14,fontFamily:"inherit",outline:"none",appearance:"none",background:"white"}}>
                    {Array.from({length:room.capacity}).map((_,i)=><option key={i+1} value={i+1}>{i+1} huésped{i>0?"es":""}</option>)}
                  </select>
                </div>
              </div>
            </div>
            {/* Payment */}
            <div style={{marginBottom:20}}>
              <div style={{fontFamily:"'DM Serif Display',serif",fontSize:16,marginBottom:14}}>Pago</div>
              <div style={{display:"flex",gap:8,marginBottom:14}}>
                {[["card","💳 Tarjeta"],["paypal","🅿️ PayPal"],["cash","💵 Efectivo"]].map(([v,l])=>(
                  <button key={v} onClick={()=>setForm({...form,pay:v})} style={{flex:1,padding:"11px 8px",border:`1.5px solid ${form.pay===v?"#111":"#e5e5e5"}`,borderRadius:10,background:form.pay===v?"#111":"white",color:form.pay===v?"white":"#555",cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:"inherit",transition:"all .15s"}}>
                    {l}
                  </button>
                ))}
              </div>
              {form.pay==="card" && (
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                  <div style={{gridColumn:"1/-1",display:"flex",flexDirection:"column",gap:5}}>
                    <label style={{fontSize:10,fontWeight:700,color:"#aaa",letterSpacing:".8px",textTransform:"uppercase"}}>Número de tarjeta</label>
                    <input placeholder="1234 5678 9012 3456" maxLength={19} style={{border:"1px solid #e5e5e5",borderRadius:10,padding:"12px 14px",fontSize:14,fontFamily:"inherit",outline:"none"}}/>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:5}}>
                    <label style={{fontSize:10,fontWeight:700,color:"#aaa",letterSpacing:".8px",textTransform:"uppercase"}}>Vencimiento</label>
                    <input placeholder="MM/AA" maxLength={5} style={{border:"1px solid #e5e5e5",borderRadius:10,padding:"12px 14px",fontSize:14,fontFamily:"inherit",outline:"none"}}/>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:5}}>
                    <label style={{fontSize:10,fontWeight:700,color:"#aaa",letterSpacing:".8px",textTransform:"uppercase"}}>CVC</label>
                    <input placeholder="123" maxLength={3} style={{border:"1px solid #e5e5e5",borderRadius:10,padding:"12px 14px",fontSize:14,fontFamily:"inherit",outline:"none"}}/>
                  </div>
                </div>
              )}
            </div>
            {/* Requests */}
            <div style={{marginBottom:24}}>
              <div style={{fontFamily:"'DM Serif Display',serif",fontSize:16,marginBottom:14}}>Solicitudes especiales</div>
              <textarea placeholder="Llegada tardía, cama extra, alergias, celebración..." rows={3} value={form.req} onChange={e=>setForm({...form,req:e.target.value})} style={{width:"100%",border:"1px solid #e5e5e5",borderRadius:10,padding:"12px 14px",fontSize:14,fontFamily:"inherit",outline:"none",resize:"vertical"}}/>
            </div>
            <button onClick={submit} style={{width:"100%",padding:16,border:"none",borderRadius:12,background:"#111",color:"white",fontFamily:"'DM Serif Display',serif",fontSize:17,fontWeight:400,cursor:"pointer",letterSpacing:"-.2px",transition:"all .2s",boxShadow:"0 4px 20px rgba(0,0,0,0.2)"}}>
              Confirmar · ${tot}
            </button>
            <p style={{textAlign:"center",fontSize:12,color:"#aaa",marginTop:10}}>No se realizará ningún cobro hasta la confirmación</p>
          </div>
        </> : (
          <div style={{padding:48,textAlign:"center"}}>
            <div style={{fontSize:56,marginBottom:16}}>✦</div>
            <div style={{fontFamily:"'DM Serif Display',serif",fontSize:30,fontWeight:400,marginBottom:8,letterSpacing:"-.5px"}}>Reserva confirmada</div>
            <p style={{fontSize:14,color:"#888",marginBottom:28}}>Recibirás todos los detalles en {form.email}</p>
            <div style={{display:"inline-block",border:"1.5px solid #e5e5e5",borderRadius:12,padding:"14px 32px",fontFamily:"'DM Serif Display',serif",fontSize:26,letterSpacing:4,color:"#111",marginBottom:28}}>{conf}</div>
            <div style={{textAlign:"left",background:"#fafafa",borderRadius:12,padding:20,marginBottom:28}}>
              {[["Alojamiento",room.name],["Ubicación",room.location],["Check-in",fmtEs(ci)],["Check-out",fmtEs(co)],["Noches",n],["Total","$"+tot]].map(([k,v])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #f0f0f0",fontSize:14}}><span style={{color:"#888"}}>{k}</span><span style={{fontWeight:600}}>{v}</span></div>
              ))}
            </div>
            <button onClick={onClose} style={{padding:"13px 32px",background:"#111",color:"white",border:"none",borderRadius:12,fontFamily:"'DM Serif Display',serif",fontSize:15,cursor:"pointer",letterSpacing:"-.2px"}}>Explorar más alojamientos</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── CARD ────────────────────────────────────────────────────────────────────
function RoomCard({ room, selected, onSelect, wishlist, toggleWish }) {
  const isSel = selected?.id === room.id;
  const isWish = wishlist.includes(room.id);
  return (
    <div onClick={()=>onSelect(room)} style={{
      background:"white",borderRadius:16,padding:"18px 20px",cursor:"pointer",
      border:`1.5px solid ${isSel?"#111":"transparent"}`,
      boxShadow:isSel?"0 8px 32px rgba(0,0,0,0.12)":"0 1px 4px rgba(0,0,0,0.05)",
      transition:"all .2s",position:"relative",
      transform:isSel?"translateX(4px)":"translateX(0)"
    }}>
      <img src={room.image} alt={room.name} style={{width:"100%",height:120,objectFit:"cover",borderRadius:10,marginBottom:12}} />
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
        <div style={{flex:1,paddingRight:8}}>
          <div style={{fontFamily:"'DM Serif Display',serif",fontSize:16,fontWeight:400,lineHeight:1.3,color:"#111",letterSpacing:"-.2px"}}>{room.name}</div>
          <div style={{fontSize:12,color:"#aaa",marginTop:3}}>📍 {room.location}</div>
        </div>
        <button onClick={e=>{e.stopPropagation();toggleWish(room.id);}} style={{background:"none",border:"none",cursor:"pointer",fontSize:16,padding:4,flexShrink:0,lineHeight:1}}>
          {isWish?"❤️":"🤍"}
        </button>
      </div>
      <p style={{fontSize:12,color:"#888",lineHeight:1.6,marginBottom:12,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{room.desc}</p>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <span style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:"#111",letterSpacing:"-.3px"}}>${room.price}</span>
          <span style={{fontSize:12,color:"#aaa"}}> /noche</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <span style={{fontSize:12,color:"#888"}}>⭐ {room.rating}</span>
          <span style={{width:3,height:3,background:"#ddd",borderRadius:"50%",display:"inline-block"}}/>
          <span style={{fontSize:11,color:"#aaa",background:"#f5f5f5",padding:"3px 8px",borderRadius:20}}>{room.category}</span>
        </div>
      </div>
    </div>
  );
}

// ─── DETAIL PANEL ────────────────────────────────────────────────────────────
function DetailPanel({ room, onClose, wishlist, toggleWish }) {
  const [ci,setCi] = useState(null);
  const [co,setCo] = useState(null);
  const [guests,setGuests] = useState(1);
  const [showCal,setShowCal] = useState(false);
  const [showCO,setShowCO] = useState(false);
  const n = ci&&co ? diff(ci,co) : 0;
  const sub = n*room.price, tax=Math.round(sub*.18), svc=Math.round(sub*.05), tot=sub+tax+svc;

  return (
    <>
      <div style={{position:"fixed",inset:0,zIndex:400,background:"rgba(0,0,0,0.25)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"20px"}} onClick={e=>e.target===e.currentTarget&&onClose()}>
        <div style={{background:"white",width:"100%",maxWidth:420,height:"calc(100vh - 40px)",borderRadius:20,boxShadow:"0 40px 100px rgba(0,0,0,0.2)",display:"flex",flexDirection:"column",animation:"slideR .3s ease",overflow:"hidden"}}>
          <style>{`@keyframes slideR{from{opacity:0;transform:translateX(30px);}to{opacity:1;transform:translateX(0);}}`}</style>
          {/* Header */}
          <div style={{padding:"20px 24px",borderBottom:"1px solid #f5f5f5",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
            <button onClick={onClose} style={{width:36,height:36,borderRadius:"50%",border:"1px solid #e5e5e5",background:"none",cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
            <span style={{fontSize:11,fontWeight:700,letterSpacing:".8px",color:"#aaa",textTransform:"uppercase"}}>{room.category}</span>
            <button onClick={()=>toggleWish(room.id)} style={{background:"none",border:"none",cursor:"pointer",fontSize:18}}>
              {wishlist.includes(room.id)?"❤️":"🤍"}
            </button>
          </div>
          {/* Scrollable body */}
          <div style={{flex:1,overflowY:"auto",padding:"24px"}}>
            <div style={{fontFamily:"'DM Serif Display',serif",fontSize:26,fontWeight:400,lineHeight:1.2,letterSpacing:"-.5px",marginBottom:6}}>{room.name}</div>
            <div style={{fontSize:13,color:"#888",marginBottom:4}}>📍 {room.location}</div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>
              <span style={{fontSize:13,fontWeight:600}}>⭐ {room.rating}</span>
              <span style={{fontSize:12,color:"#aaa"}}>({room.reviews} reseñas)</span>
            </div>
            {/* Hero visual */}
            <img src={room.image} alt={room.name} style={{width:"100%",height:160,objectFit:"cover",borderRadius:14,marginBottom:20}} />
            <p style={{fontSize:14,color:"#555",lineHeight:1.8,marginBottom:24,fontStyle:"italic"}}>{room.desc}</p>
            {/* Stats */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:24}}>
              {[["👥",room.capacity,"Huésp."],["🛏",room.beds,"Camas"],["🚿",room.baths,"Baños"],["📐",`${room.sqm}m²`,"Área"]].map(([ic,v,l])=>(
                <div key={l} style={{background:"#fafafa",borderRadius:10,padding:"12px 8px",textAlign:"center"}}>
                  <div style={{fontSize:16,marginBottom:4}}>{ic}</div>
                  <div style={{fontFamily:"'DM Serif Display',serif",fontSize:16,fontWeight:400}}>{v}</div>
                  <div style={{fontSize:10,color:"#aaa",marginTop:2,letterSpacing:".3px"}}>{l}</div>
                </div>
              ))}
            </div>
            {/* Amenidades */}
            <div style={{marginBottom:24}}>
              <div style={{fontSize:12,fontWeight:700,letterSpacing:".8px",textTransform:"uppercase",color:"#aaa",marginBottom:12}}>Incluye</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                {room.amenities.map(a=>(
                  <span key={a} style={{background:"#f5f5f5",borderRadius:20,padding:"6px 12px",fontSize:12,color:"#555"}}>{a}</span>
                ))}
              </div>
            </div>
            {/* Date selector */}
            <div style={{marginBottom:16}}>
              <div style={{fontSize:12,fontWeight:700,letterSpacing:".8px",textTransform:"uppercase",color:"#aaa",marginBottom:10}}>Fechas</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",border:"1px solid #e5e5e5",borderRadius:12,overflow:"hidden",cursor:"pointer"}} onClick={()=>setShowCal(true)}>
                <div style={{padding:"12px 14px",borderRight:"1px solid #e5e5e5"}}>
                  <div style={{fontSize:10,fontWeight:700,color:"#aaa",letterSpacing:".8px",textTransform:"uppercase",marginBottom:2}}>LLEGADA</div>
                  <div style={{fontSize:13,fontWeight:600,color:ci?"#111":"#ccc"}}>{ci?fmtEs(ci):"Añadir"}</div>
                </div>
                <div style={{padding:"12px 14px"}}>
                  <div style={{fontSize:10,fontWeight:700,color:"#aaa",letterSpacing:".8px",textTransform:"uppercase",marginBottom:2}}>SALIDA</div>
                  <div style={{fontSize:13,fontWeight:600,color:co?"#111":"#ccc"}}>{co?fmtEs(co):"Añadir"}</div>
                </div>
              </div>
            </div>
            {/* Guests */}
            <div style={{marginBottom:24}}>
              <div style={{fontSize:12,fontWeight:700,letterSpacing:".8px",textTransform:"uppercase",color:"#aaa",marginBottom:10}}>Huéspedes</div>
              <div style={{display:"flex",alignItems:"center",gap:16}}>
                <button onClick={()=>setGuests(g=>Math.max(1,g-1))} style={{width:36,height:36,borderRadius:"50%",border:"1px solid #e5e5e5",background:"none",cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s"}}>−</button>
                <span style={{fontFamily:"'DM Serif Display',serif",fontSize:20}}>{guests}</span>
                <button onClick={()=>setGuests(g=>Math.min(room.capacity,g+1))} style={{width:36,height:36,borderRadius:"50%",border:"1px solid #e5e5e5",background:"none",cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s"}}>+</button>
                <span style={{fontSize:12,color:"#aaa"}}>máx. {room.capacity}</span>
              </div>
            </div>
            {/* Price breakdown */}
            {n>0 && (
              <div style={{background:"#fafafa",borderRadius:12,padding:16,marginBottom:20}}>
                {[["$"+room.price+" × "+n+" noches","$"+sub],["Impuestos","$"+tax],["Servicio","$"+svc]].map(([l,v])=>(
                  <div key={l} style={{display:"flex",justifyContent:"space-between",fontSize:13,padding:"4px 0",color:"#888"}}><span>{l}</span><span>{v}</span></div>
                ))}
                <div style={{display:"flex",justifyContent:"space-between",fontFamily:"'DM Serif Display',serif",fontSize:18,borderTop:"1px solid #e5e5e5",marginTop:10,paddingTop:10}}><span>Total</span><span>${tot}</span></div>
              </div>
            )}
          </div>
          {/* CTA */}
          <div style={{padding:"16px 24px",borderTop:"1px solid #f5f5f5",flexShrink:0}}>
            <button onClick={()=>setShowCO(true)} disabled={!ci||!co} style={{width:"100%",padding:"15px",border:"none",borderRadius:12,background:ci&&co?"#111":"#f0f0f0",color:ci&&co?"white":"#aaa",cursor:ci&&co?"pointer":"not-allowed",fontFamily:"'DM Serif Display',serif",fontSize:17,fontWeight:400,letterSpacing:"-.2px",transition:"all .2s",boxShadow:ci&&co?"0 4px 20px rgba(0,0,0,0.2)":"none"}}>
              {ci&&co?`Reservar · $${tot}`:"Selecciona las fechas"}
            </button>
            <p style={{textAlign:"center",fontSize:11,color:"#ccc",marginTop:8}}>Sin cargos hasta confirmar</p>
          </div>
        </div>
      </div>
      {showCal && <Cal booked={room.booked} ci={ci} setCi={setCi} co={co} setCo={setCo} onClose={()=>setShowCal(false)}/>}
      {showCO && ci && co && <Checkout room={room} ci={ci} co={co} onClose={()=>{setShowCO(false);onClose();}}/>}
    </>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [cat,setCat] = useState("Todos");
  const [search,setSearch] = useState("");
  const [sinput,setSinput] = useState("");
  const [sort,setSort] = useState("default");
  const [price,setPrice] = useState("all");
  const [selected,setSelected] = useState(null);
  const [detail,setDetail] = useState(null);
  const [wishlist,setWishlist] = useState([]);
  const [wishOnly,setWishOnly] = useState(false);
  const [toast,setToast] = useState(null);

  useEffect(()=>{ if(toast){const t=setTimeout(()=>setToast(null),2400);return()=>clearTimeout(t);} },[toast]);

  function toggleWish(id){
    const has=wishlist.includes(id);
    setWishlist(w=>has?w.filter(x=>x!==id):[...w,id]);
    setToast(has?"Eliminado de favoritos":"Guardado en favoritos ❤️");
  }
  function handleSelect(r){ setSelected(r); setDetail(r); }

  let rooms=[...ROOMS];
  if(cat!=="Todos") rooms=rooms.filter(r=>r.category===cat);
  if(search) rooms=rooms.filter(r=>r.name.toLowerCase().includes(search.toLowerCase())||r.location.toLowerCase().includes(search.toLowerCase()));
  if(wishOnly) rooms=rooms.filter(r=>wishlist.includes(r.id));
  if(price==="low") rooms=rooms.filter(r=>r.price<=150);
  if(price==="mid") rooms=rooms.filter(r=>r.price>150&&r.price<=300);
  if(price==="high") rooms=rooms.filter(r=>r.price>300);
  if(sort==="asc") rooms.sort((a,b)=>a.price-b.price);
  if(sort==="desc") rooms.sort((a,b)=>b.price-a.price);
  if(sort==="rating") rooms.sort((a,b)=>b.rating-a.rating);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:'DM Sans',sans-serif;background:#fafaf8;color:#111;-webkit-font-smoothing:antialiased;}
        ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-thumb{background:#e0e0e0;border-radius:2px;}
        button:focus{outline:none;}
      `}</style>

      <div style={{height:"100vh",display:"flex",flexDirection:"column",overflow:"hidden"}}>

        {/* ── NAVBAR ── */}
        <nav style={{background:"white",borderBottom:"1px solid #f0f0f0",padding:"0 32px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between",gap:20,flexShrink:0,zIndex:10}}>
          <div style={{fontFamily:"'DM Serif Display',serif",fontSize:22,fontWeight:400,letterSpacing:"-.5px",cursor:"pointer",whiteSpace:"nowrap"}} onClick={()=>{setCat("Todos");setSearch("");setSinput("");setWishOnly(false);setSelected(null);}}>
            ReservaFácil
          </div>

          <div style={{flex:1,maxWidth:440,display:"flex",alignItems:"center",background:"#fafafa",border:"1px solid #ebebeb",borderRadius:40,padding:"0 6px 0 18px",height:44,gap:0}}>
            <input placeholder="Buscar destino o tipo de alojamiento..." value={sinput} onChange={e=>setSinput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&setSearch(sinput)}
              style={{flex:1,border:"none",outline:"none",fontSize:13,background:"transparent",fontFamily:"inherit",color:"#111"}}/>
            <button onClick={()=>setSearch(sinput)} style={{background:"#111",color:"white",border:"none",width:32,height:32,borderRadius:"50%",cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"background .2s"}}>
              →
            </button>
          </div>

          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <button onClick={()=>setWishOnly(w=>!w)} style={{border:`1.5px solid ${wishOnly?"#111":"#e5e5e5"}`,background:wishOnly?"#111":"white",color:wishOnly?"white":"#555",borderRadius:24,padding:"7px 16px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:5,transition:"all .2s"}}>
              {wishOnly?"❤️":"🤍"} {wishlist.length>0&&`(${wishlist.length})`}
            </button>
            <div style={{width:36,height:36,borderRadius:"50%",background:"#f5f5f5",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",border:"1px solid #e5e5e5",fontSize:16}}>👤</div>
          </div>
        </nav>

        {/* ── CATEGORY + FILTERS BAR ── */}
        <div style={{background:"white",borderBottom:"1px solid #f0f0f0",padding:"10px 32px",display:"flex",alignItems:"center",gap:8,flexShrink:0,overflowX:"auto",scrollbarWidth:"none"}}>
          {CATS.map(c=>(
            <button key={c} onClick={()=>setCat(c)} style={{border:`1.5px solid ${cat===c?"#111":"#e5e5e5"}`,background:cat===c?"#111":"white",color:cat===c?"white":"#555",borderRadius:24,padding:"6px 14px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:5,transition:"all .2s",flexShrink:0}}>
              <span style={{fontSize:11}}>{CAT_EMOJI[c]}</span>{c}
            </button>
          ))}
          <div style={{width:1,height:24,background:"#e5e5e5",margin:"0 4px",flexShrink:0}}/>
          {[["all","Todos"],["low","—$150"],["mid","$150–300"],["high","$300+"]].map(([v,l])=>(
            <button key={v} onClick={()=>setPrice(v)} style={{border:`1.5px solid ${price===v?"#111":"#e5e5e5"}`,background:price===v?"#111":"white",color:price===v?"white":"#888",borderRadius:24,padding:"6px 12px",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",flexShrink:0,transition:"all .2s"}}>{l}</button>
          ))}
          <select value={sort} onChange={e=>setSort(e.target.value)} style={{marginLeft:"auto",border:"1px solid #e5e5e5",borderRadius:24,padding:"6px 14px",fontSize:11,fontWeight:600,outline:"none",cursor:"pointer",fontFamily:"inherit",background:"white",color:"#555",flexShrink:0}}>
            <option value="default">Recomendado</option>
            <option value="rating">Mejor valorado</option>
            <option value="asc">Precio ↑</option>
            <option value="desc">Precio ↓</option>
          </select>
          <span style={{fontSize:12,color:"#aaa",whiteSpace:"nowrap",flexShrink:0}}>{rooms.length} alojamientos</span>
        </div>

        {/* ── MAIN SPLIT VIEW ── */}
        <div style={{flex:1,display:"grid",gridTemplateColumns:"380px 1fr",overflow:"hidden"}}>

          {/* LEFT: Cards list */}
          <div style={{overflowY:"auto",background:"#fafaf8",padding:"16px 16px 16px 20px",display:"flex",flexDirection:"column",gap:10,borderRight:"1px solid #f0f0f0"}}>
            {rooms.length===0 ? (
              <div style={{textAlign:"center",padding:"60px 20px",color:"#aaa"}}>
                <div style={{fontSize:40,marginBottom:12}}>{wishOnly?"❤️":"○"}</div>
                <div style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:"#111",marginBottom:6}}>{wishOnly?"Sin favoritos":"Sin resultados"}</div>
                <p style={{fontSize:13}}>{wishOnly?"Guarda un alojamiento con ❤️":"Prueba otra búsqueda"}</p>
              </div>
            ) : rooms.map(r=>(
              <RoomCard key={r.id} room={r} selected={selected} onSelect={handleSelect} wishlist={wishlist} toggleWish={toggleWish}/>
            ))}
          </div>

          {/* RIGHT: Map */}
          <div style={{position:"relative",background:"#e8f0f7",overflow:"hidden"}}>
            {/* Subtle grid texture */}
            <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,#cdd8e3 1px,transparent 1px)",backgroundSize:"32px 32px",opacity:.4}}/>
            {/* Ocean label */}
            <div style={{position:"absolute",top:"30%",right:"15%",fontFamily:"'DM Serif Display',serif",fontSize:18,color:"rgba(255,255,255,0.7)",letterSpacing:4,textTransform:"uppercase",transform:"rotate(-15deg)",pointerEvents:"none",textShadow:"0 2px 8px rgba(0,0,0,0.1)"}}>Mar Caribe</div>
            <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",padding:40}}>
              <DRMap rooms={rooms} selected={selected} onSelect={handleSelect} wishlist={wishlist}/>
            </div>
            {/* Map legend */}
            <div style={{position:"absolute",bottom:20,left:20,background:"rgba(255,255,255,0.92)",backdropFilter:"blur(8px)",borderRadius:12,padding:"12px 16px",boxShadow:"0 2px 12px rgba(0,0,0,0.08)"}}>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:"#aaa",textTransform:"uppercase",marginBottom:8}}>República Dominicana</div>
              {[["#f5f3f0","RD"],["#ede9e4","Haití"]].map(([c,l])=>(
                <div key={l} style={{display:"flex",alignItems:"center",gap:7,fontSize:12,color:"#555",marginBottom:4}}>
                  <div style={{width:14,height:10,background:c,border:"1px solid #ddd",borderRadius:2}}/>
                  {l}
                </div>
              ))}
              <div style={{display:"flex",alignItems:"center",gap:7,fontSize:12,color:"#555",marginTop:4}}>
                <div style={{width:20,height:20,borderRadius:"50%",background:"white",border:"1.5px solid #111",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:700}}>$</div>
                Precio/noche
              </div>
            </div>
            {/* Selected pin info */}
            {selected && !detail && (
              <div style={{position:"absolute",top:20,right:20,background:"white",borderRadius:14,padding:"14px 18px",boxShadow:"0 8px 32px rgba(0,0,0,0.12)",maxWidth:220,animation:"popIn .2s ease"}}>
                <div style={{fontFamily:"'DM Serif Display',serif",fontSize:15,marginBottom:4,letterSpacing:"-.2px"}}>{selected.name}</div>
                <div style={{fontSize:12,color:"#888",marginBottom:8}}>{selected.location}</div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <span style={{fontFamily:"'DM Serif Display',serif",fontSize:18}}>${selected.price}<span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#aaa"}}>/noche</span></span>
                  <span style={{fontSize:12}}>⭐ {selected.rating}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      {detail && <DetailPanel room={detail} onClose={()=>{setDetail(null);setSelected(null);}} wishlist={wishlist} toggleWish={toggleWish}/>}

      {/* Toast */}
      {toast && (
        <div style={{position:"fixed",bottom:28,left:"50%",transform:"translateX(-50%)",background:"#111",color:"white",padding:"10px 20px",borderRadius:24,fontSize:13,fontWeight:500,boxShadow:"0 8px 32px rgba(0,0,0,0.2)",zIndex:999,whiteSpace:"nowrap",animation:"popIn .25s ease"}}>
          {toast}
        </div>
      )}
    </>
  );
}





