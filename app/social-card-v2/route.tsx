import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    <div style={{width:"100%",height:"100%",display:"flex",position:"relative",overflow:"hidden",background:"linear-gradient(135deg,#fffdf9 0%,#f8f1e2 55%,#eedaa9 100%)",fontFamily:"Arial"}}>
      <div style={{position:"absolute",width:620,height:620,borderRadius:310,background:"rgba(197,150,46,.16)",right:-210,top:-290,display:"flex"}} />
      <div style={{position:"absolute",left:0,top:0,bottom:0,width:18,background:"#071d49",display:"flex"}} />
      <div style={{position:"absolute",left:18,top:0,bottom:0,width:7,background:"#c5962e",display:"flex"}} />
      <div style={{width:"100%",height:"100%",display:"flex",padding:"42px 58px 42px 74px",gap:42,alignItems:"center"}}>
        <div style={{width:"68%",display:"flex",flexDirection:"column",justifyContent:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:24}}>
            <div style={{display:"flex",width:74,height:74,borderRadius:18,background:"#071d49",border:"4px solid #c5962e",alignItems:"center",justifyContent:"center",color:"white",fontSize:30,fontWeight:900}}>LTR</div>
            <div style={{display:"flex",flexDirection:"column"}}><span style={{fontSize:31,fontWeight:900,color:"#071d49",letterSpacing:-1}}>LONDON TZITZIS REPAIR</span><span style={{fontSize:15,fontWeight:800,color:"#a87920",letterSpacing:3,textTransform:"uppercase",marginTop:4}}>Quality service you can trust</span></div>
          </div>
          <div style={{display:"flex",flexDirection:"column",fontSize:61,lineHeight:.98,fontWeight:900,letterSpacing:-2.5,color:"#071d49"}}><span>Tallis tzitzis string</span><span style={{color:"#ad7f26"}}>replacement & repairs</span></div>
          <div style={{display:"flex",fontSize:23,lineHeight:1.35,color:"#4b5870",marginTop:20,maxWidth:730}}>Professional, reliable local service with clear pricing and convenient collection options.</div>
          <div style={{display:"flex",gap:12,marginTop:24}}><div style={{display:"flex",background:"#071d49",color:"white",borderRadius:14,padding:"12px 19px",fontSize:21,fontWeight:800}}>✓ All minhagim</div><div style={{display:"flex",background:"white",border:"1px solid #ddcfb1",color:"#34415d",borderRadius:14,padding:"12px 19px",fontSize:21,fontWeight:800}}>✓ Local service</div></div>
        </div>
        <div style={{width:"32%",display:"flex",flexDirection:"column",background:"white",border:"1px solid #e1d3b5",borderRadius:28,padding:"28px 26px"}}>
          <div style={{display:"flex",fontSize:15,fontWeight:800,letterSpacing:2.5,textTransform:"uppercase",color:"#a87920",marginBottom:9}}>Simple pricing</div>
          <div style={{display:"flex",fontSize:30,fontWeight:800,color:"#071d49",marginBottom:22}}>Tzitzis strings</div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #e7dfcf",paddingBottom:17,marginBottom:17}}><span style={{fontSize:21,color:"#536077"}}>1 corner</span><strong style={{fontSize:36,color:"#071d49"}}>£6</strong></div>
          <div style={{display:"flex",flexDirection:"column",background:"#071d49",color:"white",borderRadius:18,padding:"19px 20px"}}><span style={{fontSize:17,color:"#d8c79f",marginBottom:5}}>BEST VALUE</span><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}><span style={{fontSize:22}}>All 4</span><strong style={{fontSize:43}}>£20</strong></div></div>
          <div style={{display:"flex",fontSize:16,color:"#6d7687",marginTop:18,lineHeight:1.35}}>NW11 & NW4 collection options available</div>
        </div>
      </div>
    </div>,
    {width:1200,height:630}
  );
}
