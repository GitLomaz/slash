class soundController {
  constructor() {
    this.soundFiles = [
      "footsteps.mp3",
      "swing_1.mp3",
      "swing_2.mp3",
      "swing_3.mp3",
      "pickup.mp3",
      "click.mp3",
      "hurt.mp3",
      "cast.mp3",
      "hit_1.mp3",
      "hit_2.mp3",
      "heart.mp3",
    ];
    this.sounds = {};
    this.volume = 1;
    scene.sound.pauseOnBlur = false;
  }

  loadSounds() {
    _.each(this.soundFiles, function (s) {
      scene.load.audio(s, ["sound/sounds/" + s]);
    });
  }

  addSounds() {
    let that = this;
    _.each(this.soundFiles, function (s) {
      that.sounds[s] = scene.sound.add(s);
    });
  }

  play(sound, volume = 1, loop = false, restart = false) {
    // console.log('playing ' + sound)
    if (muteAll) {
      volume = 0;
    }
    if (this.sounds[sound] && (!this.sounds[sound].isPlaying || restart)) {
      this.sounds[sound].play({ loop: loop, volume: volume });
    }
    if (muteAll) {
      this.mute();
    }
  }

  stop(sound) {
    this.sounds[sound].stop();
  }

  setVolume(sound, vol) {
    this.sounds[sound].setVolume(vol);
  }

  mute() {
    for (const [key, s] of Object.entries(this.sounds)) {
      if (s.volume !== 0) {
        s.oldVolume = s.volume;
        s.setVolume(0);
      }
    }
  }

  unmute() {
    for (const [key, s] of Object.entries(this.sounds)) {
      if (s.oldVolume) {
        s.setVolume(s.oldVolume);
      }
    }
  }
}
