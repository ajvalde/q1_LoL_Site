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
     var idString = JSON.stringify(playerId)
       console.log(idString)
       console.log(playerId)
   })
 }
