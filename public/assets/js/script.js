$(document).ready(function(){

$("#submit").click(function(){
  event.preventDefault();
  var summonerName = $(".summoner").val();

  var apiKey = ""

  getId(summonerName,apiKey)
})


})

 function getId (sumName,key){
     var sumId = $.get("https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + sumName + "?api_key=" + key, function(data){
     var name = $(".summoner").val();
     var playerId = $(data[name].id)
     var api = key
     getStats(key)
     //console.log(playerId)
     //console.log(data.synstar.id)
   })
 }

 function getStats(key){
   var sumStats = $.get("https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/19341022/summary?season=SEASON2016&api_key=" +key, function(data){
     for(var i=0; i < data.playerStatSummaries.length; i++){

       console.log(data.playerStatSummaries[i])
     }
   })



 }
