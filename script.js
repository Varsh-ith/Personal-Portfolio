// Interactive behaviors: reveal, orbs, tilt, cursor, smooth scroll
document.addEventListener('DOMContentLoaded', function(){
  // reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  },{threshold:0.15});
  revealEls.forEach((el,i)=>{el.style.transitionDelay=(i*80)+'ms'; obs.observe(el)});

  // orbs floating
  const orbs = document.querySelectorAll('.orb');
  let t = 0;
  setInterval(()=>{ t += 0.01; orbs.forEach((o,i)=>{ o.style.transform = 'translateY('+(Math.sin(t*0.6+(i*1.2))*12)+'px) translateX('+(Math.cos(t*0.4+(i*0.7))*18)+'px)'; }); },16);

  // tilt effect
  const tilts = document.querySelectorAll('[data-tilt]');
  tilts.forEach(card=>{
    card.addEventListener('mousemove', e=>{
      const rect = card.getBoundingClientRect();
      const x = (e.clientX-rect.left)/rect.width;
      const y = (e.clientY-rect.top)/rect.height;
      const rx = (y-0.5)*8;
      const ry = (x-0.5)*-12;
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(10px)`;
    });
    card.addEventListener('mouseleave', ()=>{ card.style.transform = 'none'; });
  });

  // smooth scroll for nav links
  document.querySelectorAll('.navlinks a').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.startsWith('#')){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // cursor
  const cursor = document.getElementById('cursor');
  window.addEventListener('mousemove', e=>{
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // simple contact form submit handling (uses Formspree - change action in HTML)
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  if(form){
    form.addEventListener('submit', function(e){
      // let Formspree handle submission; show a quick message
      formMsg.textContent = 'Sending...';
      setTimeout(()=>{ formMsg.textContent = 'Thanks! Your message was sent (or check Formspree dashboard).'; }, 1200);
    });
  }
});
