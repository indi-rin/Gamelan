import "phaser";
import Warrior from "../entity/Warrior";
import Platform from "../entity/Platform";

export default class FgScene extends Phaser.Scene {
  constructor() {
    super("FgScene");
    // Bind callback functions to the object context
  }

  preload() {
    // Preload Sprites
    // << LOAD SPRITES HERE >>
    this.load.image("warrior", "assets/sprites/warrior.png");
    this.load.image("platform", "assets/sprites/platform.png");
    // Preload Sounds
    // << LOAD SOUNDS HERE >>
    this.load.audio("jump", "assets/audio/demung-3.wav");
  }

  create() {
    // Create game entities
    // << CREATE GAME ENTITIES HERE >>
    this.warrior = new Warrior(this, 200, 140, "warrior").setScale(0.1);
    this.platformGroup = this.physics.add.staticGroup({ classType: Platform });
    this.createPlatform(200, 500);
    this.createPlatform(950, 500);

    // Create sounds
    // << CREATE SOUNDS HERE >>
    this.jumpSound = this.sound.add("jump");

    // Create collisions for all entities
    // << CREATE COLLISIONS HERE >>
    this.physics.add.collider(this.warrior, this.platformGroup);

    // Assign cursors
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createPlatform(x, y) {
    this.platformGroup.create(x, y, "platform");
  }

  // time: total time elapsed (ms)
  // delta: time elapsed (ms) since last update() call. 16.666 ms @ 60fps
  update(time, delta) {
    // << DO UPDATE LOGIC HERE >>
    this.warrior.update(this.cursors, this.jumpSound);
  }
}
