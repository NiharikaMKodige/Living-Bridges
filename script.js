// WhatsApp redirect: replace the number (country code + number, no + or spaces) when the real bot number is ready
var WA_NUMBER='919999999999',WA_TEXT='Hi, I’d like to use the Canine ID Bot';
document.querySelectorAll('[data-wa]').forEach(function(a){a.href='https://wa.me/'+WA_NUMBER+'?text='+encodeURIComponent(WA_TEXT)});
// Nose-ridge art
(function(){
  var s=document.getElementById('art'),h='<defs><filter id="w" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="46"/></filter></defs><g fill="none" stroke="currentColor" stroke-width="3.2" filter="url(#w)">';
  for(var i=1;i<=22;i++)h+='<ellipse style="animation-delay:'+(i*0.12).toFixed(2)+'s" cx="400" cy="400" rx="'+(i*17)+'" ry="'+(i*13)+'"/>';
  s.innerHTML=h+'</g>';
})();
// QR-style pattern
function qr(el,n){var h='';var seed=11;for(var i=0;i<n*n;i++){var r=Math.floor(i/n),c=i%n,corner=(r<3&&c<3)||(r<3&&c>=n-3)||(r>=n-3&&c<3);seed=(seed*9301+49297)%233280;var on=corner?!((r%3==1&&c%3==1)?false:false):seed/233280>.5;if(corner)on=!(r%3==1&&(c%3==1)&&false);h+='<i class="'+(on?'':'o')+'"></i>'}el.innerHTML=h}


// Chat simulator
var msgs=document.getElementById('msgs'),quick=document.getElementById('quick'),txt=document.getElementById('txt'),cur=[],busy=false;
function scroll(){msgs.scrollTop=msgs.scrollHeight}
// Reveals a bot message letter by letter, keeping its formatting
function typeOut(el,done){
  if(window.matchMedia('(prefers-reduced-motion:reduce)').matches){done();return}
  var w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),nodes=[],n;
  while(n=w.nextNode())nodes.push([n,Array.from(n.nodeValue)]);
  nodes.forEach(function(p){p[0].nodeValue=''});
  var k=0,i=0;
  (function step(){
    if(k>=nodes.length){done();return}
    var p=nodes[k];i=Math.min(i+2,p[1].length);p[0].nodeValue=p[1].slice(0,i).join('');scroll();
    if(i>=p[1].length){k++;i=0}
    setTimeout(step,18)
  })()
}
function user(t){var d=document.createElement('div');d.className='m me';d.textContent=t;msgs.appendChild(d);scroll()}
function bot(html,cls,delay){return new Promise(function(res){
  var t=document.createElement('div');t.className='m typing';t.innerHTML='<i></i><i></i><i></i>';msgs.appendChild(t);scroll();
  setTimeout(function(){t.remove();var d=document.createElement('div');d.className='m '+(cls||'');d.innerHTML=html;
    msgs.appendChild(d);scroll();typeOut(d,res)},delay||850)})}
function typeInto(t,cb){var ch=Array.from(t),i=0;quick.innerHTML='';txt.value='';(function n(){if(i<ch.length){txt.value+=ch[i++];setTimeout(n,28)}else setTimeout(function(){txt.value='';cb()},250)})()}
function run(o,text){busy=true;quick.innerHTML='';user(text||o[0]);o[1]().then(function(){busy=false})}
function opts(list){cur=list;quick.innerHTML='';list.forEach(function(o){var b=document.createElement('button');b.textContent=o[0];b.onclick=function(){if(busy)return;busy=true;typeInto(o[0],function(){run(o)})};quick.appendChild(b)})}
function pick(v){var s=v.toLowerCase().trim(),d=s.match(/^(\d)\b/);
  if(d){for(var i=0;i<cur.length;i++)if(cur[i][0].charAt(0)===d[1])return cur[i]}
  if(cur.length===1)return cur[0];
  var w=s.split(/\W+/).filter(function(x){return x.length>2}),best=null,bs=0;
  cur.forEach(function(o){var l=o[0].toLowerCase(),sc=0;w.forEach(function(x){if(l.indexOf(x)>-1)sc++});if(sc>bs){bs=sc;best=o}});return best}
function rows(a){return a.map(function(r){return '<div class="row"><span>'+r[0]+'</span><span>'+r[1]+'</span></div>'}).join('')}
var QR='<div class="qrbox"></div>';
function menu(){return bot('🐶 <b>Welcome to Canine ID Bot!</b><br>Select an option to proceed.<br><br>1️⃣ Identify an unknown dog<br>2️⃣ Register a known new dog<br>3️⃣ Update an existing dog record',0,500).then(function(){opts([['1 Identify a dog',identify],['2 Register a new dog',regKnown],['3 Update a record',update]])})}
function matchCard(conf,via){return bot('✅ <b>Match found'+(conf?' ('+conf+' confidence)':'')+'</b>'+rows([['Dog ID','#BLR-6001'],['Name / area','Bruno, Indiranagar'],['Vaccination','Anti-rabies verified, valid to Nov 2026'],['Sterilisation','Neutered'],['Identified by',via]]),'ok')}
function identify(){return bot('Send a 2-second video of the dog’s nose.').then(function(){opts([['🎥 Send clear video',clear],['🎥 Send blurry video',blurry],['🎥 Send unknown dog',nomatch]])})}
function logUpdate(){return bot('Record updated. Booster vaccination logged for #BLR-6001.','ok').then(back)}
function clear(){return matchCard('91%','nose print').then(function(){return bot('Need to update records? Reply <b>3</b>.')}).then(function(){opts([['3 Update this record',logUpdate],['Back to menu',menu]])})}

function blurry(){return bot('⚠️ <b>Low confidence match (72%)</b><br>The image is slightly blurry or too dark. Please record another 2-second clip in better light.','warn').then(function(){opts([['🎥 Retry in better light',clear]])})}
function nomatch(){return bot('❓ <b>No match found in system</b><br>We couldn’t match this nose print to any registered dog. Would you like to register it now?','no').then(function(){opts([['Register this dog',reg]])})}
function regKnown(){return bot('No lookup needed. First, send a nose photo or video so this dog can be recognised later.').then(function(){opts([['🎥 Send nose video',reg]])})}
function reg(){return bot('Nose print saved. Now the details: name or nickname, area, vaccination and sterilisation status.',0,700).then(function(){opts([['Asha, Koramangala, vaccinated, spayed',done]])})}
function done(){return bot('🎉 <b>Dog registered</b>'+rows([['Dog ID','#BLR-6002'],['Name / area','Asha, Koramangala'],['Vaccination','Verified'],['Sterilisation','Spayed']]),'ok',1100).then(function(){return bot('Made a mistake? Reply <b>edit</b> within 24 hours.')}).then(back)}
function update(){return bot('Which dog? Identify it first with a nose video.').then(function(){opts([['🎥 Send clear video',function(){return matchCard('91%','nose print').then(function(){return bot('Record updated. Booster vaccination logged for #BLR-6001.','ok')}).then(back)}]])})}
function back(){opts([['Back to menu',function(){return menu()}]])}
function start(){msgs.innerHTML='';quick.innerHTML='';busy=true;menu().then(function(){busy=false})}
document.getElementById('reset').onclick=start;start();
document.getElementById('composer').addEventListener('submit',function(e){e.preventDefault();var v=txt.value.trim();if(!v||busy)return;txt.value='';
  var o=pick(v);if(o){run(o,v);return}
  busy=true;quick.innerHTML='';user(v);var keep=cur;
  if(/^(hi|hello|hey|menu|start)\b/i.test(v)){menu().then(function(){busy=false})}
  else{bot('Sorry, I didn’t get that. Pick an option below, or type a number like <b>1</b>.').then(function(){opts(keep);busy=false})}});
// Enquiry form: front-end only for now, connect to the backend later
document.getElementById('enq').addEventListener('submit',function(e){e.preventDefault();document.getElementById('enqok').hidden=false;this.reset()});
// Waitlist: front-end only for now, connect to the backend later
document.getElementById('wl').addEventListener('submit',function(e){e.preventDefault();document.getElementById('wlok').hidden=false;this.reset()});
