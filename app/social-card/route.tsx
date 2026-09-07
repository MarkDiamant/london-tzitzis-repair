import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    <div style={{width:"100%",height:"100%",display:"flex",position:"relative",overflow:"hidden",background:"linear-gradient(135deg,#fffdf9 0%,#f8f1e2 55%,#eedaa9 100%)",fontFamily:"Arial"}}>
      <div style={{position:"absolute",width:620,height:620,borderRadius:310,background:"rgba(197,150,46,.16)",right:-210,top:-290,display:"flex"}} />
      <div style={{position:"absolute",width:330,height:330,borderRadius:165,border:"2px solid rgba(176,129,37,.18)",right:35,bottom:-175,display:"flex"}} />
      <div style={{position:"absolute",left:0,top:0,bottom:0,width:18,background:"#071d49",display:"flex"}} />
      <div style={{position:"absolute",left:18,top:0,bottom:0,width:7,background:"#c5962e",display:"flex"}} />

      <div style={{width:"100%",height:"100%",display:"flex",padding:"48px 62px 46px 76px",gap:42,alignItems:"center"}}>
        <div style={{width:"68%",display:"flex",flexDirection:"column",justifyContent:"center"}}>
          <img src="https://www.londontzitzisrepair.co.uk/logo1.png" width="350" height="120" style={{objectFit:"contain",objectPosition:"left center",marginBottom:20}} />
          <div style={{display:"flex",fontSize:18,fontWeight:800,letterSpacing:3.2,textTransform:"uppercase",color:"#a87920",marginBottom:15}}>Quality service you can trust</div>
          <div style={{display:"flex",flexDirection:"column",fontSize:62,lineHeight:.98,fontWeight:850,letterSpacing:-2.5,color:"#071d49"}}>
            <span>Tallis tzitzis string</span>
            <span style={{color:"#ad7f26"}}>replacement & repairs</span>
          </div>
          <div style={{display:"flex",fontSize:23,lineHeight:1.35,color:"#4b5870",marginTop:20,maxWidth:730}}>Professional, reliable local service with clear pricing and convenient collection options.</div>
          <div style={{display:"flex",gap:12,marginTop:24}}>
            <div style={{display:"flex",background:"#071d49",color:"white",borderRadius:14,padding:"12px 19px",fontSize:21,fontWeight:800}}>✓ All minhagim</div>
            <div style={{display:"flex",background:"rgba(255,255,255,.82)",border:"1px solid #ddcfb1",color:"#34415d",borderRadius:14,padding:"12px 19px",fontSize:21,fontWeight:800}}>✓ Local service</div>
          </div>
        </div>

        <div style={{width:"32%",display:"flex",flexDirection:"column",background:"rgba(255,255,255,.94)",border:"1px solid #e1d3b5",borderRadius:28,padding:"28px 26px",boxShadow:"0 20px 50px rgba(7,29,73,.12)"}}>
          <div style={{display:"flex",fontSize:15,fontWeight:800,letterSpacing:2.5,textTransform:"uppercase",color:"#a87920",marginBottom:9}}>Simple pricing</div>
          <div style={{display:"flex",fontSize:30,fontWeight:800,color:"#071d49",marginBottom:22}}>Tzitzis strings</div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #e7dfcf",paddingBottom:17,marginBottom:17}}><span style={{fontSize:21,color:"#536077"}}>1 corner</span><strong style={{fontSize:36,color:"#071d49"}}>£6</strong></div>
          <div style={{display:"flex",flexDirection:"column",background:"#071d49",color:"white",borderRadius:18,padding:"19px 20px"}}><span style={{fontSize:17,color:"#d8c79f",marginBottom:5}}>BEST VALUE</span><div style={{display:"flex",justifyContent:"space-between",alignItems:"end"}}><span style={{fontSize:22}}>All 4</span><strong style={{fontSize:43}}>£20</strong></div></div>
          <div style={{display:"flex",fontSize:16,color:"#6d7687",marginTop:18,lineHeight:1.35}}>NW11 & NW4 collection options available</div>
        </div>
      </div>
    </div>,
    {width:1200,height:630}
  );
}
