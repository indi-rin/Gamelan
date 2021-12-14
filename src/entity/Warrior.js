import "phaser";

export default class Warrior extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
  }

  updateMovement(cursors) {
    // Move left
    if (cursors.left.isDown) {
      this.setVelocityX(-360);
    }
    // Move right
    else if (cursors.right.isDown) {
      this.setVelocityX(360);
    }
    // Neutral (no movement)
    else {
      this.setVelocityX(0);
    }
  }

  updateJump(cursors, jumpSound) {
    if (cursors.up.isDown && this.body.touching.down) {
      this.setVelocityY(-800);
      jumpSound.play();
    }
  }

  update(cursors, jumpSound) {
    this.updateMovement(cursors);
    this.updateJump(cursors, jumpSound);
  }
}
