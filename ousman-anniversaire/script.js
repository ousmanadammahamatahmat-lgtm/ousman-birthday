const $ = (s) => document.querySelector(s);
const suitcase = $('#suitcase');
const giftGrid = $('#giftGrid');
const giftMessage = $('#giftMessage');
const welcomeModal = $('#welcomeModal');
let opened = false;

function openSuitcase() {
  if (!opened) {
    opened = true;
    suitcase.classList.add('open');
    giftGrid.classList.add('visible');
    $('#openCaseBtn').textContent = 'La valise est ouverte — découvre les cadeaux ✦';
    burstConfetti(130);
    setTimeout(() => giftGrid.scrollIntoView({behavior:'smooth', block:'center'}), 450);
  } else {
    giftGrid.classList.add('visible');
  }
}
$('#startBtn').addEventListener('click', () => {
  welcomeModal.classList.add('visible');
  welcomeModal.setAttribute('aria-hidden','false');
});
function closeWelcome() {
  welcomeModal.classList.remove('visible');
  welcomeModal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}
$('#closeWelcome').addEventListener('click', closeWelcome);
$('#modalOpenBtn').addEventListener('click', () => {
  closeWelcome();
  openSuitcase();
  setTimeout(() => $('#valise').scrollIntoView({behavior:'smooth'}), 100);
});
$('#openCaseBtn').addEventListener('click', openSuitcase);
suitcase.addEventListener('click', openSuitcase);
suitcase.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSuitcase(); }});
document.querySelectorAll('.gift-card').forEach(card => card.addEventListener('click', () => {
  $('#giftTitle').textContent = card.dataset.title;
  $('#giftText').textContent = card.dataset.message;
  giftMessage.classList.add('visible');
  giftMessage.scrollIntoView({behavior:'smooth',block:'nearest'});
  burstConfetti(24);
}));
$('#closeMessage').addEventListener('click', () => giftMessage.classList.remove('visible'));
$('#celebrateBtn').addEventListener('click', () => burstConfetti(220));

const canvas = $('#confettiCanvas');
const ctx = canvas.getContext('2d');
let pieces = [], animating = false;
function resizeCanvas() { canvas.width = innerWidth * devicePixelRatio; canvas.height = innerHeight * devicePixelRatio; ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0); }
addEventListener('resize', resizeCanvas); resizeCanvas();
function burstConfetti(count=100) {
  const colors = ['#e8c77b','#f8e7b5','#ffffff','#c89a4c','#bda5ef','#f0a9c5'];
  for(let i=0;i<count;i++) pieces.push({x:Math.random()*innerWidth,y:-20-Math.random()*innerHeight*.35,w:4+Math.random()*6,h:7+Math.random()*9,c:colors[Math.floor(Math.random()*colors.length)],vx:(Math.random()-.5)*4,vy:2+Math.random()*5,r:Math.random()*6,vr:(Math.random()-.5)*.2,life:180+Math.random()*100});
  if(!animating){animating=true;requestAnimationFrame(drawConfetti);}
}
function drawConfetti(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  pieces.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;p.vy+=.025;p.life--;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.fillStyle=p.c;ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);ctx.restore();});
  pieces=pieces.filter(p=>p.life>0&&p.y<innerHeight+30);
  if(pieces.length){requestAnimationFrame(drawConfetti)}else{animating=false;ctx.clearRect(0,0,innerWidth,innerHeight);}
}
