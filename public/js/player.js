export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;
    this.id = null;// is playerId in server
    this.gameRoom = null;
    this.hasTreasure =false;
    this.playerKilled =false;
    this.playerStarved= false;
    this.health =100;
    this.x = x;
    this.y = y;
    this.speed = 300;
    this.goal ={x:0,y:0}
    
    const anims = scene.anims;
    anims.create({
      key: "player-walk",
      frames: anims.generateFrameNumbers("characters", { start: 46, end: 49 }),
      frameRate: 8,
      repeat: -1,
    });
    anims.create({
      key: "player-walk-back",
      frames: anims.generateFrameNumbers("characters", { start: 65, end: 68 }),
      frameRate: 8,
      repeat: -1,
    });

    this.sprite = scene.physics.add.sprite(x, y, "characters", 0).setSize(22, 33).setOffset(23, 27);
    this.x = this.sprite.x;
    this.y = this.sprite.y;
    this.goal.x = this.x;
    this.goal.y = this.y;
    this.sprite.anims.play("player-walk-back");
    
    this.Htext = scene.add.text(x-10, y-30, this.health, {font: "16px Arial", fill: "#00ff00",background:"#00ff00"});

    //this.keys = scene.input.keyboard.createCursorKeys();
  }

  freeze() {
    this.sprite.body.moves = false;
  }

  near(s,g){
    //console.log(`near test ${(Math.abs(s.body.x - g.x) < 4)}, ${Math.abs(s.body.y - g.y) < 4}`)
    return (Math.abs(s.body.x - g.x) < 4 ) && (Math.abs(s.body.y - g.y) < 4);
    
  
  }

  update() {
    //console.log("getting player updated")
    //const keys = this.keys;
    const sprite = this.sprite;
    const goal = this.goal;
    const speed = this.speed;
    const prevVelocity = sprite.body.velocity.clone();

    // Stop any previous movement from the last frame
    sprite.body.setVelocity(0);

    let clickUp = false;
    let clickDown = false;
    let clickLeft = false;
    let clickRight = false;

    sprite.body.x =Math.floor(sprite.body.x)
    sprite.body.y =Math.floor(sprite.body.y)
    goal.x = Math.floor(goal.x)
    goal.y = Math.floor(goal.y)
    //console.log(`sprite x ${sprite.body.x}, y ${sprite.body.x} speed ${sprite.body.velocity }`)
    // Movement algorithm
    // check if near (+-3)
    // get goal from click (player.goal)
    // if goal above- set clickUp true
    // if goal below- set clickDown true
    // if goal left- set clickLeft true
    // if goal right- set clickRight true

    if(!this.near(sprite,goal)){

      
      if(sprite.body.x < goal.x){clickRight = true}
      if(sprite.body.x > goal.x){clickLeft = true}
      if(sprite.body.y < goal.y){clickDown = true}
      if(sprite.body.y > goal.y){clickUp = true}

     //console.log(` ${clickRight},  ${clickLeft}, ${sprite.body.x}, ${goal.x}, ${clickDown}, ${clickUp}, ${sprite.body.y}, ${goal.y}`)
      // Horizontal movement
      if (clickLeft) {  // was keys.left.isDown
        sprite.body.setVelocityX(-speed);
        sprite.setFlipX(true);
      } else if (clickRight) { // waskeys.right.isDown
        sprite.body.setVelocityX(speed);
        sprite.setFlipX(false);
      }

      // Vertical movement
      if (clickUp) { // was keys.up.isDown
        sprite.body.setVelocityY(-speed);
      } else if (clickDown) { // was keys.down.isDown
        sprite.body.setVelocityY(speed);
      }

      // Normalize and scale the velocity so that sprite can't move faster along a diagonal
      sprite.body.velocity.normalize().scale(speed);
    }
    // Update the animation last and give left/right animations precedence over up/down animations
    if (clickUp || clickLeft || clickRight) {
      sprite.anims.play("player-walk", true);
    } else if (clickDown) {
      sprite.anims.play("player-walk-back", true);
    } else {
      sprite.anims.stop();

      // If we were moving, pick and idle frame to use
      if (prevVelocity.y < 0) sprite.setTexture("characters", 65);
      else sprite.setTexture("characters", 46);


    }
  }

  destroy() {
    this.sprite.destroy();
  }
}
