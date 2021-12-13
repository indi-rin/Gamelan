import "phaser";

export default class Laser extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey, facingLeft) {
    super(scene, x, y, spriteKey);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.facingLeft = facingLeft;
    // Set how fast the laser travels (pixels/ms). Hard coded it here for simplicity
    this.speed = Phaser.Math.GetSpeed(800, 1); // (distance in pixels, time (ms))
    // How long the laser will live (ms). Hard coded here for simplicity
    this.lifespan = 900;
    // Important to not apply gravity to the laser bolt!
    this.body.setAllowGravity(false);
  }

  // Check which direction the player is facing and move the laserbolt in that direction as long as it lives
  update(time, delta) {
    this.lifespan -= delta;
    const moveDistance = this.speed * delta;
    if (this.facingLeft) {
      this.x -= moveDistance;
    } else {
      this.x += moveDistance;
    }
    // If this laser has run out of lifespan, we "kill it" by deactivating it.
    // We can then reuse this laser object
    if (this.lifespan <= 0) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}
