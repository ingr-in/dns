

function fetchPanchang(){

const lat = document.getElementById("lat").value;
const lon = document.getElementById("lon").value;

document.getElementById("loading").style.display="block";
document.getElementById("error").style.display="none";
document.getElementById("panchangCard").style.display="none";

fetch(`https://sipa.ingr.in/pages/sti.php?sr=json&ajax=1&req=ajax&sanvi=subhmstu&lat=${lat}&lon=${lon}`)
.then(res => res.json())
.then(data => {

document.getElementById("loading").style.display="none";

console.log(data); // Debug

if(data.status !== "success"){
document.getElementById("error").style.display="block";
return;
}

// Panchang
document.getElementById("tithi").textContent = data.panchang.tithi;
document.getElementById("paksha").textContent = data.panchang.paksha;
document.getElementById("month").textContent = data.panchang.month;
document.getElementById("nakshatra").textContent = data.panchang.nakshatra;
document.getElementById("yoga").textContent = data.panchang.yoga;
document.getElementById("karana").textContent = data.panchang.karana;

// Sun
document.getElementById("sunrise").textContent = data.sun_times.sunrise;
document.getElementById("sunset").textContent = data.sun_times.sunset;

// Moon
document.getElementById("moonrise").textContent = data.moon_times.moonrise;
document.getElementById("moonset").textContent = data.moon_times.moonset;

// Planets
const planetsDiv = document.getElementById("planets");
planetsDiv.innerHTML="";

Object.entries(data.planet_positions).forEach(([planet,pos])=>{
let div=document.createElement("div");
div.className="planet-item";
div.innerHTML=`<div>${planet}</div><div>${parseFloat(pos).toFixed(2)}°</div>`;
planetsDiv.appendChild(div);
});

document.getElementById("panchangCard").style.display="block";

})
.catch(err=>{
console.log(err);
document.getElementById("loading").style.display="none";
document.getElementById("error").style.display="block";
});

}

window.onload = fetchPanchang;


