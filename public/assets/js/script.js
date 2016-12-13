$(document).ready(function(){

$("#submit").click(function(){
  event.preventDefault();
  var summonerName = $(".summoner").val();


  var apiKey = ""


  getId(summonerName,apiKey)
})
$(".summoner").keyup(function(e){
  var key = e.which
  if(key==13){
    $("#submit").click()
  }
})


})

 function getId (sumName,key){
     var sumId = $.get("https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + sumName + "?api_key=" + key, function(data){
     var name = $(".summoner").val();
     var playerIdObj = $(data[name].id)
     var playerId = playerIdObj[0]
     var api = key
     getUnrankedStats(playerId,key)
     getRankedStats(playerId,key)
     getAramStats(playerId,key)
   })
 }

 function getUnrankedStats(playerId,key){
   var sumStats = $.get("https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/" + playerId + "/summary?season=SEASON2016&api_key=" +key, function(data){
     for(var i=0; i < data.playerStatSummaries.length; i++){
       console.log(data.playerStatSummaries[i])
       if (data.playerStatSummaries[i]["playerStatSummaryType"] === "Unranked"){
         $(".uwin_val").text(data.playerStatSummaries[i].wins)
         $(".uchamp_val").text(data.playerStatSummaries[i].aggregatedStats.totalChampionKills)
         $(".uassist_val").text(data.playerStatSummaries[i].aggregatedStats.totalAssists)
         $(".uminion_val").text(data.playerStatSummaries[i].aggregatedStats.totalMinionKills)
       }
     }
     $(".summoner").click(function(){
       $(".summoner").val("");
     })
   })
 }

 function getRankedStats(playerId,key){
   var ranked =$.get("https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/" + playerId + "/summary?season=SEASON2016&api_key=" +key, function(data){
     for(var i=0; i < data.playerStatSummaries.length; i++){
       if(data.playerStatSummaries[i]["playerStatSummaryType"] === "RankedSolo5x5"){
         $(".rwin_val").text(data.playerStatSummaries[i].wins)
         $(".rchamp_val").text(data.playerStatSummaries[i].aggregatedStats.totalChampionKills)
         $(".rassist_val").text(data.playerStatSummaries[i].aggregatedStats.totalAssists)
         $(".rminion_val").text(data.playerStatSummaries[i].aggregatedStats.totalMinionKills)
       }
       else if(data.playerStatSummaries[i]["wins"] === "0"){
         $(".rwin_val").text("No STATS")
         $(".rchamp_val").text("No STATS")
         $(".rassist_val").text("No STATS")
         $(".rminion_val").text("No STATS")
       }
     }
   })
 }

 function getAramStats(playerId,key){
   var ranked =$.get("https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/" + playerId + "/summary?season=SEASON2016&api_key=" +key, function(data){
     for(var i=0; i < data.playerStatSummaries.length; i++){
       if(data.playerStatSummaries[i]["playerStatSummaryType"] === "AramUnranked5x5"){
         $(".awin_val").text(data.playerStatSummaries[i].wins)
         $(".achamp_val").text(data.playerStatSummaries[i].aggregatedStats.totalChampionKills)
         $(".aassist_val").text(data.playerStatSummaries[i].aggregatedStats.totalAssists)
       }
     }
   })
 }
