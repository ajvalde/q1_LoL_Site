$(document).ready(function() {

    $("#submit").click(function() {
        event.preventDefault();
        var summonerName = $("#summoner").val().toLowerCase().replace(/ /g, '');



        var apiKey = ""


        getId(summonerName, apiKey)
    })
    $("#summoner").keyup(function(e) {
        var key = e.which
        if (key == 13) {
            $("#submit").click()
        }
    })


})

function getId(sumName, key) {
    var sumId = $.get("https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + sumName + "?api_key=" + key, function(data) {
        var name = $("#summoner").val().toLowerCase().replace(/ /g, '');
        var playerIdObj = $(data[name].id)
        var playerId = playerIdObj[0]
        var api = key
        getUnrankedStats(playerId, key)
        getRankedStats(playerId, key)
        getAramStats(playerId, key)
        top3Champs(playerId, key)
    })
}

function getUnrankedStats(playerId, key) {
    var sumStats = $.get("https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/" + playerId + "/summary?season=SEASON2016&api_key=" + key, function(data) {
        for (var i = 0; i < data.playerStatSummaries.length; i++) {
            //console.log(data.playerStatSummaries[i])
            if (data.playerStatSummaries[i]["playerStatSummaryType"] === "Unranked") {
                $(".uwin_val").text(data.playerStatSummaries[i].wins)
                $(".uchamp_val").text(data.playerStatSummaries[i].aggregatedStats.totalChampionKills)
                $(".uassist_val").text(data.playerStatSummaries[i].aggregatedStats.totalAssists)
                $(".uminion_val").text(data.playerStatSummaries[i].aggregatedStats.totalMinionKills)
            }
        }
        $("#summoner").click(function() {
            $("#summoner").val("");
        })
    })
}

function getRankedStats(playerId, key) {
    var ranked = $.get("https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/" + playerId + "/summary?season=SEASON2016&api_key=" + key, function(data) {
        for (var i = 0; i < data.playerStatSummaries.length; i++) {
            if (data.playerStatSummaries[i]["playerStatSummaryType"] === "RankedSolo5x5") {
                $(".rwin_val").text(data.playerStatSummaries[i].wins)
                $(".rchamp_val").text(data.playerStatSummaries[i].aggregatedStats.totalChampionKills)
                $(".rassist_val").text(data.playerStatSummaries[i].aggregatedStats.totalAssists)
                $(".rminion_val").text(data.playerStatSummaries[i].aggregatedStats.totalMinionKills)
            } else if (data.playerStatSummaries[i]["wins"] === "0") {
                $(".rwin_val").val("")
                $(".rchamp_val").val("")
                $(".rassist_val").val("")
                $(".rminion_val").val("")
            }
        }
    })
}

function getAramStats(playerId, key) {
    var ranked = $.get("https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/" + playerId + "/summary?season=SEASON2016&api_key=" + key, function(data) {
        for (var i = 0; i < data.playerStatSummaries.length; i++) {
            if (data.playerStatSummaries[i]["playerStatSummaryType"] === "AramUnranked5x5") {
                $(".awin_val").text(data.playerStatSummaries[i].wins)
                $(".achamp_val").text(data.playerStatSummaries[i].aggregatedStats.totalChampionKills)
                $(".aassist_val").text(data.playerStatSummaries[i].aggregatedStats.totalAssists)
            }
        }
    })
}

function top3Champs(playerId, key) {
    var champs = $.get("https://na.api.pvp.net/championmastery/location/NA1/player/" + playerId + "/topchampions?api_key=" + key, function(data) {
        console.log(data);
        $(".l_one").text(data[0].championLevel)
        $(".l_two").text(data[1].championLevel)
        $(".l_three").text(data[2].championLevel)
        var cId = []
            //console.log(cId);
        for (var i = 0; i < data.length; i++) {
            //console.log(data[i].championId);
            var arr = [1, 2, 3]
            cId.push(data[i].championId)
        }
        getChampImg(cId, key)
    })
}

function getChampImg(cId, key) {
    var Ids = cId
    //console.log(Ids);
    for(var i = 0; i < Ids.length; i++ ){
      console.log(Ids[i]);

    }
}
