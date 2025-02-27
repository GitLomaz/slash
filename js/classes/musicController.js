class musicController {
  constructor(song = "title.mp3") {
    this.soundFiles = ["combat.mp3", "title.mp3"];
    this.sounds = {};
    this.volume = 1;
    this.song = song;
    scene.sound.pauseOnBlur = false;
  }

  loadSounds() {
    _.each(this.soundFiles, function (s) {
      scene.load.audio(s, ["sound/music/" + s]);
    });
  }

  addSounds() {
    let that = this;
    _.each(this.soundFiles, function (s) {
      that.sounds[s] = scene.sound.add(s);
    });
  }

  play(song) {
    let volume = 1;
    if (muteAll) {
      volume = 0;
    }
    this.stop();
    this.song = song;
    this.sounds[song].play({ loop: true, volume: volume });
  }

  stop() {
    for (const [key, s] of Object.entries(this.sounds)) {
      s.stop();
    }
  }

  setVolume(vol) {
    this.sounds[this.song].setVolume(vol);
  }
}
