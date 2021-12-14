import "phaser";
import Warrior from "../entity/Warrior";
import Platform from "../entity/Platform";
import Enemy from "../entity/Enemy";

export default class FgScene extends Phaser.Scene {
  constructor() {
    super("FgScene");
    // Bind callback functions to the object context
    this.hit1 = this.hit1.bind(this);
    this.hit2 = this.hit2.bind(this);
  }

  preload() {
    // Preload Sprites
    // << LOAD SPRITES HERE >>
    this.load.image("warrior", "assets/sprites/warrior.png");
    this.load.image("platform", "assets/sprites/platform.png");
    this.load.image("enemy", "assets/sprites/enemy.png");
    // Preload Sounds
    // << LOAD SOUNDS HERE >>
    this.load.audio("jump", "assets/audio/demung-3.wav");
    this.load.audio("hit1", "assets/audio/demung-1.wav");
    this.load.audio("hit2", "assets/audio/demung-2.wav");
  }

  create() {
    // Create game entities
    // << CREATE GAME ENTITIES HERE >>
    this.warrior = new Warrior(this, 100, 140, "warrior").setScale(0.1);
    this.platformGroup = this.physics.add.staticGroup({ classType: Platform });
    this.createPlatform(200, 500);
    this.createPlatform(950, 500);
    this.enemy1 = new Enemy(this, 900, 140, "enemy").setScale(0.1);
    this.enemy2 = new Enemy(this, 300, 140, "enemy").setScale(0.1);

    // Create sounds
    // << CREATE SOUNDS HERE >>
    this.jumpSound = this.sound.add("jump");
    this.hitSound1 = this.sound.add("hit1");
    this.hitSound2 = this.sound.add("hit2");

    // Create collisions for all entities
    // << CREATE COLLISIONS HERE >>
    this.physics.add.collider(this.warrior, this.platformGroup);
    this.physics.add.collider(this.enemy1, this.platformGroup);
    this.physics.add.collider(this.enemy2, this.platformGroup);
    this.physics.add.overlap(this.enemy1, this.warrior, this.hit1);
    this.physics.add.overlap(this.enemy2, this.warrior, this.hit2);

    // Assign cursors
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createPlatform(x, y) {
    this.platformGroup.create(x, y, "platform");
  }

  hit1() {
    this.hitSound1.play();
    this.enemy1.disableBody(true, true);
  }

  hit2() {
    this.hitSound2.play();
    this.enemy2.disableBody(true, true);
  }

  // time: total time elapsed (ms)
  // delta: time elapsed (ms) since last update() call. 16.666 ms @ 60fps
  update(time, delta) {
    // << DO UPDATE LOGIC HERE >>
    this.warrior.update(this.cursors, this.jumpSound);
  }
}
