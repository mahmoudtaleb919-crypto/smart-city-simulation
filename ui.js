$(document).ready(function () {

    function updateDashboard() {
        $("#population").text(city.population);
        $("#satisfaction").text(city.satisfaction);
        $("#traffic").text(city.traffic);
        $("#pollution").text(city.pollution);
        $("#money").text(city.money);
        $("#score").text(city.score);
        let moneyCard=$("#money").parent();
        if(city.money<1000){
            moneyCard.css("background","#ffcccc")
        }else{
            moneyCard.css("background","white");
        }
        if (city.traffic > 70) {
    $("#city-map")
        .animate({ marginLeft: "-5px" }, 80)
        .animate({ marginLeft: "5px" }, 80)
        .animate({ marginLeft: "0px" }, 80);
}
if (city.pollution > 60) {
    $("#city-map").css("filter", "grayscale(40%)");
} else {
    $("#city-map").css("filter", "none");
}
        let card = $("#satisfaction").parent();
        card.stop(true,true).animate(
            {margintop:"-5px"},100
        ).animate(
            {margintop:"0px"},100
        )
        card.css("background", "white");

        if (city.satisfaction < 40) {
            card.css("background", "#ffcccc");
        } else if (city.satisfaction < 70) {
            card.css("background", "#fff3cd");
        } else {
            card.css("background", "#d4edda");
        }
    }

    $("#add-people").click(function () {
        addPeople();
        updateDashboard();
    });

    $("#toggle-traffic").click(function () {
        toggleTrafficLights();
        updateDashboard();
    });

    updateDashboard();
    $(".zone").click(function () {

    $(this)
        .animate({ opacity: 0.6 }, 150)
        .animate({ opacity: 1 }, 150);

    if ($(this).hasClass("residential")) {
        applyZoneEffect("residential");
    }
    else if ($(this).hasClass("industrial")) {
        applyZoneEffect("industrial");
    }
    else if ($(this).hasClass("park")) {
        applyZoneEffect("park");
    }
    else if ($(this).hasClass("commercial")) {
        applyZoneEffect("commercial");
    }

    updateDashboard();
});
$("#next-turn").click(function(){
    nextTurn();
    updateDashboard();
})
$("#build-zone").click(function(){
    let type=$("#zone-type").val();
    let success =buildZone(type);
    if(!success)
        return;
    let icon ="❓";
    if(type==="residential")
        icon="🏠";
    if(type==="industrial")
        icon="🏭";
    if(type==="park")
        icon="🌳";
    if(type==="commercial")
        icon="🏢";
    let zone=$("<div>")
    .addClass("zone"+type)
    .text(icon)
    .hide();
    $("#city-map").append(zone);
    zone.fadeIn(300);
    updateDashboard();
})
$("#remove-zone").click(function () {

    let lastZone = $("#city-map .zone").last();
    if (lastZone.length === 0) return;

    let type = "";

    if (lastZone.hasClass("residential")) type = "residential";
    if (lastZone.hasClass("industrial")) type = "industrial";
    if (lastZone.hasClass("park")) type = "park";
    if (lastZone.hasClass("commercial")) type = "commercial";

    removeZoneEffect(type);

    lastZone.fadeOut(300, function () {
        $(this).remove();
        updateDashboard();
    });
});
$("#tax-rate").on("input", function () {
    let value = $(this).val();
    city.taxRate = value;

    $("#tax-value").text(value + "%");

    calculateSatisfaction();
    updateDashboard();
});
$("#traffic-service").change(function () {

    city.trafficLightsOn = $(this).is(":checked");

    if (city.trafficLightsOn) {
        city.traffic -= 10;
    } else {
        city.traffic += 10;
    }

    calculateSatisfaction();
    updateDashboard();
});
});