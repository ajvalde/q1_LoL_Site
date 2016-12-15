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
        //console.log(data);
        $(".l_one").text(data[0].championLevel)
        $(".l_two").text(data[1].championLevel)
        $(".l_three").text(data[2].championLevel)
        var cId = []
        $('#id_one').attr('id', data[0].championId)
        $('#id_two').attr('id', data[1].championId)
        $('#id_three').attr('id', data[2].championId)
            //console.log(cId);
        for (var i = 0; i < data.length; i++) {
            //console.log(data[i].championId);
            var arr = [1, 2, 3]
            cId.push(data[i].championId)
        }
        getChampName(cId, key)

    })
}

function getChampName(cId, key) {
    var Ids = cId
    var names = []
    getChampImg(names)
    //console.log(names);
    for (var i = 0; i < Ids.length; i++) {
        var champId = ""
        champId = champId + Ids[i]
        var champJpg = $.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/" + champId + "?champData=image&api_key=" + key, function(data) {
            var champs = []
            champs.push(data)
            for (var j = 0; j < champs.length; j++) {
                names.push(data.name)
                    //console.log(champs[j]);
                if ($(".c_one").attr("id") == champs[j].id) {
                    $(".c_one").text(data.name)
                } else if ($(".c_two").attr("id") == champs[j].id) {
                    $(".c_two").text(data.name)
                } else if ($(".c_three").attr("id") == champs[j].id) {
                    $(".c_three").text(data.name)
                }
            }
        })
    }

}

// function getChampImg(names){
//   var cNames = names
//   console.log(cNames);
//     for(i = 0; i < cNames.length; i++){
//     }
// }
