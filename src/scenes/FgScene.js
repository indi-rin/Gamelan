import Player from "../entity/Player";
import Ground from "../entity/Ground";

export default class FgScene extends Phaser.Scene {
  constructor() {
    super("FgScene");
  }

  preload() {
    // Preload Sprites
    // << LOAD SPRITES HERE >>
    this.load.spritesheet("josh", "assets/spriteSheets/josh.png", {
      frameWidth: 340,
      frameHeight: 460,
    });
    this.load.image("ground", "assets/sprites/ground.png");
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
    // Create sounds
    // << CREATE SOUNDS HERE >>
    // Create collisions for all entities
    // << CREATE COLLISIONS HERE >>
    this.physics.add.collider(this.player, this.groundGroup);

    // Assign the cursors
    this.cursors = this.input.keyboard.createCursorKeys();

    // Create the animations during the FgScene's create phase
    this.createAnimations();
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
  }

  // time: total time elapsed (ms)
  // delta: time elapsed (ms) since last update() call. 16.666 ms @ 60fps
  update(time, delta) {
    // << DO UPDATE LOGIC HERE >>
    this.player.update(this.cursors);
  }
}
