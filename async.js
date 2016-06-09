function assert (actual, expected) {
  if ( expected !== actual ) {
    throw new Error(`Assertion Failed!\nExpected: ${expected}\nActual: ${actual}`)
  }
}

//
// Exercise #1: Network Simulation
//
// Using the DataAPI.Callback "Easy API",
// implement playerStats to return the following type:
//
// Array({ playerId: Number, playerName: String, winCount: Number })
//
// NOTE: See data.js for the actual data you are working with.
// HINT: Feel free to copy/paste any functions you used in Core 4 Exercise!
//

console.log("[Async Exercise #1]")

function playerStats (callback) {
  var API = DataAPI.Callback;
  //console.log("API",API)

  API.getAllPlayers(function (players) {
     API.getAllGames(function(games){
       var data = players.map(function(player){
         var didPlayerWinGame = isWinningGameFor(player.id);
         var playerGamesWon = games.filter(function(game){
           return didPlayerWinGame(game);
         });
         var playerData = {playerId: player.id, playerName: player.name, winCount: playerGamesWon.length };
         //console.log(JSON.stringify(playerGamesWon))
         //console.log(JSON.stringify(playerData));
         return playerData;
       });
       //console.log(JSON.stringify(data));
       callback(data);
     })
  })
}

playerStats(function (stats) {
  assert( stats.length, 4 );

  assert( stats.find( s => s.playerId === 10 ).winCount, 6 );
  assert( stats.find( s => s.playerId === 11 ).winCount, 10 );
  assert( stats.find( s => s.playerId === 12 ).winCount, 12 );
  assert( stats.find( s => s.playerId === 13 ).winCount, 13 );
  console.log("[Async Exercise #1] All good!");
});

function isWinningGameFor (playerId) {
  return function (game) {
    return game.player1_id === playerId && game.player1_score === 100
        || game.player2_id === playerId && game.player2_score === 100;
  };
}


//
// Tests
//
playerStats(function (stats) {
  assert( stats.length, 4 );

  assert( stats.find( s => s.playerId === 10 ).winCount, 6 );
  assert( stats.find( s => s.playerId === 11 ).winCount, 10 );
  assert( stats.find( s => s.playerId === 12 ).winCount, 12 );
  assert( stats.find( s => s.playerId === 13 ).winCount, 13 );
  console.log("[Async Exercise #1] All good!");
});

//
// Exercise #2: Hard mode
//
// Using the DataAPI.Callback "Realistic API", re-implement the same functionality
// from Exercise #1, without using any of the "Easy API".
//
// You may use DataAPI.Promise instead of DataAPI.Callback. Example difference:
//
//    DataAPI.Callback.getPlayerById( player.id, function (player) {
//      // etc.
//    })
//
// --- VS ---
//
//    DataAPI.Promise.getPlayerById( player.id )
//      .then(function (player) {
//        // etc.
//      })
//
// The main benefit you would gain from using the DataAPI.Promise is
// the ability to take advantage of Promise.all.
//

console.log("[Async Exercise #2]")

// function playerStats2 (playerIds, callback) {

//   var API = DataAPI.Callback;

//   // var API = DataAPI.Promise;
//   // pass each id to getPlayerById function as an argument.
//   playerIds.forEach(function(playerId){
//     API.getPlayerById(playerId,function(player){
//       API.getPlayerGames(playerId,function(game){
//         console.log(JSON.stringify(game));

//       })
//        console.log(player.name)
//     })

//   })


// }


function playerStats2 (playerIds, callback) {
  var data = [];
  var API = DataAPI.Callback;

  // var API = DataAPI.Promise;
  // pass each id to getPlayerById function as an argument.

  playerIds.forEach(function(playerId){

    API.getPlayerById(playerId,function(player){
      API.getPlayerGames(playerId,function(games){
        var isWin = isWinningGameFor(playerId);
        //console.log(isWin)
        var gamesWon = games.filter(function(game){
          // console.log(game.player1_id, player.id)
          return isWin(game);
        });
        //console.log(gamesWon)
        var playerData = {playerId : playerId, playerName: player.name, winCount: gamesWon.length};
        console.log(playerData);
        data.push(playerData);
        console.log(data)
        if(data.length === 4) {
          callback(data);
        }

      })
    })
    //callback(data);

  })
  //console.log(data);

}
playerStats2([10,11,12,13], function (stats) {
  assert( stats.length, 4 );

  assert( stats.find( s => s.playerId === 10 ).winCount, 6 );
  assert( stats.find( s => s.playerId === 11 ).winCount, 10 );
  assert( stats.find( s => s.playerId === 12 ).winCount, 12 );
  assert( stats.find( s => s.playerId === 13 ).winCount, 13 );
  console.log("[Async Exercise #2] All good!");
});
