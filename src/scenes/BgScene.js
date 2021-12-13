import "phaser";

export default class BgScene extends Phaser.Scene {
  constructor() {
    super("BgScene");
  }

  preload() {
    // Preload Sprites
    // << LOAD SPRITE HERE >>
    this.load.image("sky", "assets/backgrounds/sky.png");
    this.load.image("logo", "assets/backgrounds/fullBlastLogo.png");
    // could also use this.load.path = "assets/backgrounds"; and then this.load.image("sky", "/sky.png");
  }

  create() {
    // Create Sprites
    // << CREATE SPRITE HERE >>
    this.add.image(-160, 0, "sky").setOrigin(0).setScale(0.5);
    this.add.image(380, 80, "logo").setScale(5);
    // x and y coordinates, image name inside the (), the starting point of the object (0-1), and the horizontal scale of the object
  }
}
