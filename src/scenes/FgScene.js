import Player from "../entity/Player";
import Ground from "../entity/Ground";
import Enemy from "../entity/Enemy";
import Gun from "../entity/Gun";
import Laser from "../entity/Laser";

export default class FgScene extends Phaser.Scene {
  constructor() {
    super("FgScene");
    // Bind callback functions to the object context
    this.collectGun = this.collectGun.bind(this);
    this.fireLaser = this.fireLaser.bind(this);
    this.hit = this.hit.bind(this);
  }

  preload() {
    // Preload Sprites
    // << LOAD SPRITES HERE >>
    this.load.spritesheet("josh", "assets/spriteSheets/josh.png", {
      frameWidth: 340,
      frameHeight: 460,
    });
    this.load.image("ground", "assets/sprites/ground.png");
    this.load.image("brandon", "assets/sprites/brandon.png");
    this.load.image("gun", "assets/sprites/gun.png");
    this.load.image("laserBolt", "assets/sprites/laserBolt.png");
    // Preload Sounds
    // << LOAD SOUNDS HERE >>
  }

  create() {
    // Create game entities
    // << CREATE GAME ENTITIES HERE >>
    this.player = new Player(this, 20, 400, "josh").setScale(0.25);
    this.groundGroup = this.physics.add.staticGroup({ classType: Ground });
    this.createGround(160, 540);
    this.createGround(600, 540);
    this.enemy = new Enemy(this, 600, 400, "brandon").setScale(0.25);
    this.gun = new Gun(this, 300, 400, "gun").setScale(0.25);
    this.lasers = this.physics.add.group({
      classType: Laser,
      runChildUpdate: true,
      allowGravity: false, // Important! When an obj is added to a group, it will inherit
      // the group's attributes. So if this group's gravity is enabled,
      // the individual lasers will also have gravity enabled when they're
      // added to this group
    });

    // Create sounds
    // << CREATE SOUNDS HERE >>
    // Create collisions for all entities
    // << CREATE COLLISIONS HERE >>
    this.physics.add.collider(this.player, this.groundGroup);
    this.physics.add.collider(this.enemy, this.groundGroup);
    this.physics.add.collider(this.player, this.enemy);
    this.physics.add.collider(this.gun, this.groundGroup);
    // When the laser collides with the enemy
    this.physics.add.overlap(this.lasers, this.enemy, this.hit, null, this);

    // Assign the cursors
    this.cursors = this.input.keyboard.createCursorKeys();

    // Create the animations during the FgScene's create phase
    this.createAnimations();

    // When the player collides with the gun
    this.physics.add.overlap(
      this.player,
      this.gun,
      this.collectGun, // Our callback function that will handle the collision logic
      null, // processCallback. Can specify a function that has custom collision
      // conditions. We won't be using this so you can ignore it.
      this // The context of 'this' for our callback. Since we're binding
      // our callback, it doesn't really matter.
    );
  }

  createGround(x, y) {
    this.groundGroup.create(x, y, "ground");
  }

  // We're assigning this new animation the key 'run', to be used elsewhere.
  // The animation pills from the josh spritesheet, and uses frames 17 - 20
  // We're setting the framerate to 10, but try experimenting with different values!
  // repeat: -1 indicates that we want the animation to repeat forever (or until we tell it to stop).
  createAnimations() {
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("josh", { start: 17, end: 20 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "jump",
      frames: [{ key: "josh", frame: 17 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "idleUnarmed",
      frames: [{ key: "josh", frame: 11 }],
      frameRate: 10,
    });
    this.anims.create({
      key: "idleArmed",
      frames: [{ key: "josh", frame: 6 }],
      frameRate: 10,
    });

    // Define the single frame in the tilesheet that represents the player idle and holding a gun
    this.anims.create({
      key: "idleArmed",
      frames: [{ key: "josh", frame: 6 }],
      frameRate: 10,
    });
  }

  // Callback fn
  collectGun(player, gun) {
    // Make the gun disappear from the ground.
    gun.disableBody(true, true); // (disableGameObj, hideGameObj)
    // Set the player to 'armed'
    this.player.armed = true;
  }

  // Callback fn. We implement it here b/c our scene has references to the lasers group and the player
  fireLaser(x, y, left) {
    // These are the offsets from the player's position that make it look like
    // the laser starts from the gun in the player's hand
    const offsetX = 56;
    const offsetY = 14;
    const laserX =
      this.player.x + (this.player.facingLeft ? -offsetX : offsetX);
    const laserY = this.player.y + offsetY;

    // Create a laser bullet and scale the sprite down
    const laser = new Laser(
      this,
      laserX,
      laserY,
      "laserBolt",
      this.player.facingLeft
    ).setScale(0.25);
    // Add our newly created to the group
    this.lasers.add(laser);
  }

  // make the laser inactive and insivible when it hits the enemy
  hit(enemy, laser) {
    laser.setActive(false);
    laser.setVisible(false);
  }

  // time: total time elapsed (ms)
  // delta: time elapsed (ms) since last update() call. 16.666 ms @ 60fps
  update(time, delta) {
    // << DO UPDATE LOGIC HERE >>
    this.player.update(this.cursors);
    this.gun.update(
      time,
      this.player,
      this.cursors,
      this.fireLaser // Callback fn for creating lasers
    );
  }
}
