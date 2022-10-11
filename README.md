Treasure Hunt base -crypto branch - feature branch to enable crypto (SOL) access

Procedurally-generated Dungeon with hidden treasure and limited exits. Continuous decay of health requires feeding from food jugs scattered in maze. PvP combat possible with both players losing health.
Player who finds the Treasure chest and then carries it to an Exit, wins.

Design: NPM kicks off the Exchange server which launches the client when a users connects
to the Lobby.
In the Lobby, player can start a new game or join a game

When the player joins a game, a Dungeon is generated in the client from a random setting - 'gameSeed' - assigned in the server so all clients create the same world
The clients collect user actions and send over socketio to the server, the server computes moves and returns to the clients who then repaint the client browser.[later add movement interpolation]

Credits:
Multiprocesssor socket IO based on https://github.com/ivangfr/socketio-express-phaser3
Dungeon generation based on Mike West Dungeon see https://github.com/mikewesthad/dungeon
  and this article https://itnext.io/modular-game-worlds-in-phaser-3-tilemaps-3-procedural-dungeon-3bc19b841cd
Lobby concepts based on "https://github.com/isaacjohnsononline/phaser-game-lobby"/"zackabrah
/
phaser-game-lobby"

DevLog:7/9/22
Most of localhost version running except combat and health decay disabled during dev - updated COMPLETED

All functions operational

App is deployed on Render.com as RowleyCryptoGames.com or https://treasurehuntproto.onrender.com/

added Lobby function 


DEvLOG: 8/4/22
Cosmetics leave a lot to be desired but much of the Prototype is operational
 * Module to handle all Socket IO communications server <==> player
 * 
 * Functions
 * This module two major activities - the Lobby and the Game
 * 
 * When a player connects, the server places him in the Lobby page (public/index.HTML) controlled by
 * javascript js/main,js
 * Lobby Functions
 * - display arriving and disconnecting players
 * - enables players to create a game - size of Dungeon depends on number of players expected
 * - or join and existing game (max players per game set at 10)
 * When a player selects a game, he transitions to a Phaser Game Scene (DungeonScene)
 * When the game ends the non-winning player is returned to the Lobby page?? Winners go to a Reward page
 * Game Functions
// sets up server commands (only to Room(game) player is in) to:
// - tell all players that a new player has arrived ("newPlayer")
// --- defines inital player state in the server
// - send list of all players to new client connection
// - relay each player movement to all other("playerMoved") when notified by msg ("playerMovement")
// --- NEEDS ADDITIONAL CHECKS FOR LEGIT MOVEMENT
// - sets timer to automatically decrease all players health on 1 second interval
// - sets up collision responses for:
// --- "jugHit" to deal with gathering food
// --- "treasureHit" to deal with gathering treasure setting player color to GOLD
// --- "combatHit" to deal with player vs player contact
// --- "exitHit" ends game if player hasTreasure is true

DevLog: 8/5 

TBD See Issues file


