import "phaser";

export default class BgScene extends Phaser.Scene {
  constructor() {
    super("BgScene");
  }

  preload() {
    // Preload Sprites
    // << LOAD SPRITE HERE >>
    this.load.image("background", "assets/backgrounds/background.png");
  }

  create() {
    // Create Sprites
    // << CREATE SPRITE HERE >>
    this.add.image(0, 0, "background").setOrigin(0).setScale(0.8);
    // x and y coordinates, image name inside the (), the starting point of the object (0-1), and the horizontal scale of the object
  }
}
