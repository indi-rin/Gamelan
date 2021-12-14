import "phaser";
import Warrior from "../entity/Warrior";

export default class FgScene extends Phaser.Scene {
  constructor() {
    super("FgScene");
    // Bind callback functions to the object context
  }

  preload() {
    // Preload Sprites
    // << LOAD SPRITES HERE >>
    this.load.image("warrior", "assets/sprites/warrior.png");
    // Preload Sounds
    // << LOAD SOUNDS HERE >>
  }

  create() {
    // Create game entities
    // << CREATE GAME ENTITIES HERE >>
    this.warrior = new Warrior(this, 200, 400, "warrior").setScale(0.1);
    // Create sounds
    // << CREATE SOUNDS HERE >>
    // Create collisions for all entities
    // << CREATE COLLISIONS HERE >>
  }

  // time: total time elapsed (ms)
  // delta: time elapsed (ms) since last update() call. 16.666 ms @ 60fps
  update(time, delta) {
    // << DO UPDATE LOGIC HERE >>
  }
}
