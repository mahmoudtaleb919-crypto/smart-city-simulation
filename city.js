function addPeople(){
    city.population +=100;
    city.traffic +=5;
    city.pollution +=3;
    calculateSatisfaction();
}
function toggleTrafficLights() {
    city.trafficLightsOn = !city.trafficLightsOn;

    if (city.trafficLightsOn) {
        city.traffic -= 10;
    } else {
        city.traffic += 15;
    }

    calculateSatisfaction();
}
function calculateSatisfaction(){
    let bonus=city.trafficLights0n? 10:0;
    let taxPenalty=Math.floor(city.taxRate/2);
    city.satisfaction=100-city.traffic-city.pollution+bonus-taxPenalty;
    if(city.satisfaction>100)
        city.satisfaction=100;
    if(city.satisfaction<0)
        city.satisfaction=0;
}
function applyZoneEffect(type) {

    if (type === "residential") {
        city.population += 50;
        city.traffic += 3;
    }

    if (type === "industrial") {
        city.pollution += 10;
        city.traffic += 5;
        city.money +=300;
    }

    if (type === "park") {
        city.pollution -= 8;
        city.satisfaction += 5;
        city.money -=200;
    }

    if (type === "commercial") {
        city.traffic += 4;
        city.satisfaction += 2;
    }

    if (city.pollution < 0) city.pollution = 0;
    if (city.traffic < 0) city.traffic = 0;

    calculateSatisfaction();
}
function collectTaxes(){
    let income=Math.floor(city.population*(city.taxRate/100));
    city.money+=income;
}
function payServices(){
    let expenses =0;
    if(city.trafficLightsOn) expenses+=200;
    expenses +=Math.floor(city.population/10);
    city.money-=expenses;
}
function nextTurn(){
    collectTaxes();
    payServices();
    triggerRandomEvent();
    calculateSatisfaction();
    calculateScore();
    checkGameOver();
    if(city.money<0){
        city.money=0;
        alert("💥City is bankrupt!")
    }
}
function buildZone(type){
    let cost=0;
    if(type==="residential") cost=300;
    if(type==="industrial") cost=500;
    if(type==="park") cost=200;
    if(type==="commercial") cost=400;
    if(city.money<cost){
        alert("❌Not enough money!");
        return false;
    }
    city.money-=cost;
    applyZoneEffect(type);
    return true;
}
function removeZoneEffect(type){
    if(type==="residential"){
        city.population -=50;
        city.traffic-=3;
    }
    if(type==="industrial"){
        city.pollution +=8;
        city.satisfaction-=5;
    }
    if(type==="park"){
        city.pollution+=8;
        city.satisfaction-=5;
    }
    if(type==="commercial"){
        city.traffic -=4;
        city.satisfaction-=2;
    }
    calculateSatisfaction();
}
const events=[
    {
        name:"🌪️Natural Disaster",
        effect:function(){
            city.money-=1000;
            city.satisfaction-=20;
            city.pollution+=10;
        }
    },
    {
        name:"📈Economic Boom",
        effect:function(){
            city.money+=1500;
            city.satisfaction+=15;
        }
    },
    {
        name:"😡Public Protest",
        effect:function(){
            city.pollution-=15;
            city.traffic+=10;
        }
    },
    {
        name:"🌳Green Initiative",
        effect:function(){
            city.pollution-=15;
            city.satisfaction+=10;
        }
    },
    {
        name:"💼Foreign Investment",
        effect:function(){
            city.money+=2000;
            city.traffic+=5;
        }
    }
]
function triggerRandomEvent(){
    $("#city-map").fadeOut(100).fadeIn(100);
    let chance =Math.random();
    if(chance>0.3)
        return;
    let index=Math.floor(Math.random()*events.length);
    let event=events[index];
    event.effect();
    alert("⚠️Event:"+event.name);
    if(city.satisfaction>100)
        city.satisfaction=100;
    if(city.satisfaction<0)
        city.satisfaction=0;
    if(city.pollution<0)
        city.pollution=0;
}
function calculateScore() {
    city.score =
        city.population +
        city.satisfaction * 10 +
        Math.floor(city.money / 10) -
        city.pollution * 5 -
        city.traffic * 3;

    if (city.score < 0) city.score = 0;
}
function checkGameOver() {

    if (city.satisfaction <= 0) {
        endGame("😡 Citizens revolted!");
    }

    if (city.pollution >= 100) {
        endGame("☠️ City collapsed due to pollution!");
    }

    if (city.money <= 0) {
        endGame("💸 City went bankrupt!");
    }
}
function endGame(reason) {
    alert("GAME OVER\n" + reason + "\nFinal Score: " + city.score);

    $("button, select, input").prop("disabled", true);
}