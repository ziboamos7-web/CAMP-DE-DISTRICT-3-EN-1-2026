
/* Générateur QR minimal (hors-ligne, niveau M, mode octets) */
window.campQR=function(text){
 const data=Array.from(new TextEncoder().encode(text)),EC=[10,16,26,18,24,16,18,22,22,26],NB=[1,1,1,2,2,4,4,4,5,5];
 const raw=v=>{let r=(16*v+128)*v+64;if(v>=2){const a=Math.floor(v/7)+2;r-=(25*a-10)*a-55;if(v>=7)r-=36}return r};
 let ver=1;for(;ver<=10;ver++){const cap=Math.floor(raw(ver)/8)-EC[ver-1]*NB[ver-1];if(4+(ver<10?8:16)+data.length*8<=cap*8)break}
 if(ver>10)return null;
 const size=ver*4+17,total=Math.floor(raw(ver)/8),ecc=EC[ver-1],nb=NB[ver-1],dcw=total-ecc*nb;
 let bits=[];const put=(v,n)=>{for(let i=n-1;i>=0;i--)bits.push((v>>>i)&1)};
 put(4,4);put(data.length,ver<10?8:16);data.forEach(b=>put(b,8));
 put(0,Math.min(4,dcw*8-bits.length));while(bits.length%8)bits.push(0);
 const cw=[];for(let i=0;i<bits.length;i+=8)cw.push(parseInt(bits.slice(i,i+8).join(''),2));
 for(let p=0xEC;cw.length<dcw;p^=0xEC^0x11)cw.push(p);
 const mul=(x,y)=>{let z=0;for(let i=7;i>=0;i--){z=(z<<1)^((z>>>7)*0x11D);z^=((y>>>i)&1)*x}return z&255};
 let div=[];for(let i=0;i<ecc-1;i++)div.push(0);div.push(1);let root=1;
 for(let i=0;i<ecc;i++){for(let j=0;j<ecc;j++){div[j]=mul(div[j],root);if(j+1<ecc)div[j]^=div[j+1]}root=mul(root,2)}
 const rs=d=>{const r=new Array(ecc).fill(0);d.forEach(b=>{const f=b^r.shift();r.push(0);div.forEach((c,i)=>r[i]^=mul(c,f))});return r};
 const ns=nb-total%nb,sl=Math.floor(total/nb),blocks=[];
 for(let i=0,k=0;i<nb;i++){const len=sl-ecc+(i<ns?0:1)-0;const d=cw.slice(k,k+len);k+=len;blocks.push({d,e:rs(d)})}
 const all=[];for(let i=0;i<blocks[nb-1].d.length;i++)blocks.forEach((b,j)=>{if(i<b.d.length)all.push(b.d[i])});
 for(let i=0;i<ecc;i++)blocks.forEach(b=>all.push(b.e[i]));
 const M=Array.from({length:size},()=>new Array(size).fill(false)),F=Array.from({length:size},()=>new Array(size).fill(false));
 const set=(x,y,v)=>{M[y][x]=v;F[y][x]=true};
 for(let i=0;i<size;i++){set(6,i,i%2==0);set(i,6,i%2==0)}
 [[3,3],[size-4,3],[3,size-4]].forEach(([cx,cy])=>{for(let dy=-4;dy<=4;dy++)for(let dx=-4;dx<=4;dx++){const x=cx+dx,y=cy+dy,d=Math.max(Math.abs(dx),Math.abs(dy));if(x>=0&&y>=0&&x<size&&y<size)set(x,y,d!=2&&d!=4)}});
 if(ver>1){const n=Math.floor(ver/7)+2,st=Math.ceil((ver*4+4)/(n*2-2))*2,ap=[6];for(let p=size-7;ap.length<n;p-=st)ap.splice(1,0,p);
  ap.forEach((cx,i)=>ap.forEach((cy,j)=>{if((i==0&&j==0)||(i==0&&j==n-1)||(i==n-1&&j==0))return;for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++)set(cx+dx,cy+dy,Math.max(Math.abs(dx),Math.abs(dy))!=1)}))}
 const fmt=m=>{const d=m;let r=d;for(let i=0;i<10;i++)r=(r<<1)^((r>>>9)*0x537);const b=((d<<10)|r)^0x5412,g=i=>((b>>>i)&1)==1;
  for(let i=0;i<=5;i++)set(8,i,g(i));set(8,7,g(6));set(8,8,g(7));set(7,8,g(8));for(let i=9;i<15;i++)set(14-i,8,g(i));
  for(let i=0;i<8;i++)set(size-1-i,8,g(i));for(let i=8;i<15;i++)set(8,size-15+i,g(i));set(8,size-8,true)};
 fmt(0);
 if(ver>=7){let r=ver;for(let i=0;i<12;i++)r=(r<<1)^((r>>>11)*0x1F25);const b=(ver<<12)|r;for(let i=0;i<18;i++){const v=((b>>>i)&1)==1,a=size-11+i%3,c=Math.floor(i/3);set(a,c,v);set(c,a,v)}}
 let k=0;for(let right=size-1;right>=1;right-=2){if(right==6)right=5;for(let vert=0;vert<size;vert++)for(let j=0;j<2;j++){const x=right-j,y=((right+1)&2)==0?size-1-vert:vert;if(!F[y][x]&&k<all.length*8){M[y][x]=((all[k>>>3]>>>(7-(k&7)))&1)==1;k++}}}
 const C=[(x,y)=>(x+y)%2==0,(x,y)=>y%2==0,(x,y)=>x%3==0,(x,y)=>(x+y)%3==0,(x,y)=>(Math.floor(x/3)+Math.floor(y/2))%2==0,(x,y)=>x*y%2+x*y%3==0,(x,y)=>(x*y%2+x*y%3)%2==0,(x,y)=>((x+y)%2+x*y%3)%2==0];
 const mask=m=>{for(let y=0;y<size;y++)for(let x=0;x<size;x++)if(!F[y][x]&&C[m](x,y))M[y][x]=!M[y][x]};
 const pen=()=>{let p=0,dark=0;for(let y=0;y<size;y++){let run=1;for(let x=0;x<size;x++){if(M[y][x])dark++;if(x&&M[y][x]==M[y][x-1]){run++;if(run==5)p+=3;else if(run>5)p++}else run=1;if(x&&y&&M[y][x]==M[y][x-1]&&M[y][x]==M[y-1][x]&&M[y][x]==M[y-1][x-1])p+=3}}
  for(let x=0;x<size;x++){let run=1;for(let y=1;y<size;y++){if(M[y][x]==M[y-1][x]){run++;if(run==5)p+=3;else if(run>5)p++}else run=1}}
  return p+Math.floor(Math.abs(dark*20-size*size*10)/(size*size))*10};
 let best=0,bp=1e9;for(let m=0;m<8;m++){mask(m);fmt(m);const p=pen();if(p<bp){bp=p;best=m}mask(m)}
 mask(best);fmt(best);
 let d='';for(let y=0;y<size;y++)for(let x=0;x<size;x++)if(M[y][x])d+='M'+(x+2)+' '+(y+2)+'h1v1h-1z';
 const s=size+4;return '<svg viewBox="0 0 '+s+' '+s+'" shape-rendering="crispEdges" role="img" aria-label="Code QR du ticket"><rect width="'+s+'" height="'+s+'" fill="#fff"/><path d="'+d+'" fill="#0f1f5c"/></svg>'};

