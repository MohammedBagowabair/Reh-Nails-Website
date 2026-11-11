(function(){
  var WA = "353877078222";
  document.documentElement.classList.remove("no-js");
  function waMsg(svc, ask){
    var t;
    if (svc && ask) t = "Hi Reh! I'd love to book " + svc + ". Could you tell me the price and your next free slot?";
    else if (svc) t = "Hi Reh! I'd like to book " + svc + ".\nPreferred day & time: ";
    else t = "Hi Reh! I'd like to book a nail appointment.\nService: \nPreferred day & time: ";
    return "https://wa.me/" + WA + "?text=" + encodeURIComponent(t);
  }
  document.querySelectorAll(".wa-link").forEach(function(a){ a.href = waMsg(a.getAttribute("data-svc"), a.hasAttribute("data-ask")); });

  var nav = document.getElementById("nav"), dock = document.getElementById("dock");
  function onScroll(){ nav.classList.toggle("solid", window.scrollY > 30); dock.classList.toggle("away", window.scrollY < window.innerHeight * .6); }
  window.addEventListener("scroll", onScroll, {passive:true}); onScroll();

  // Open now, in salon time (Europe/Dublin). Hours from Google Maps. null = closed.
  try {
    var H = {Sun:null,Mon:[540,1140],Tue:[540,1140],Wed:[540,1140],Thu:[540,1140],Fri:[540,1140],Sat:[480,900]};
    var order = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"], names = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var fmt = function(m){ var h = Math.floor(m/60), mm = m%60; return h + ":" + (mm<10?"0":"") + mm; };
    var parts = new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/Dublin",weekday:"short",hour:"numeric",minute:"numeric",hour12:false}).formatToParts(new Date());
    var get = function(t){ return (parts.filter(function(p){return p.type===t;})[0]||{}).value; };
    var day = get("weekday"), idx = order.indexOf(day), mins = (parseInt(get("hour"),10) % 24)*60 + parseInt(get("minute"),10), d = H[day];
    var open = !!d && mins >= d[0] && mins < d[1], txt;
    if (open) txt = "Open now · until " + fmt(d[1]) + " Dublin time";
    else if (d && mins < d[0]) txt = "Closed now · opens today at " + fmt(d[0]);
    else { for (var k=1;k<=7;k++){ var nd = order[(idx+k)%7]; if (H[nd]) { txt = "Closed now · opens " + (k===1 ? "tomorrow" : names[(idx+k)%7]) + " at " + fmt(H[nd][0]); break; } } }
    ["openNow","openNow2"].forEach(function(id){ var el = document.getElementById(id); if(!el) return; el.textContent = txt; el.classList.toggle("is-open", open); el.hidden = false; });
    var row = document.querySelector('.hours tr[data-d="' + idx + '"]'); if (row) row.classList.add("today");
  } catch(e){}

  var els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !/static=1/.test(location.search)) {
    var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }); }, {threshold:.12, rootMargin:"0px 0px -40px 0px"});
    els.forEach(function(el){ io.observe(el); });
  } else { els.forEach(function(el){ el.classList.add("in"); }); }
})();
