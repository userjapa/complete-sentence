<template>
<div class="">
  <img :src="exercise.img" />
  <div class="container">
    <audio ref="audio" :src="exercise.audio" @playing="isPlaying = true" @pause="isPlaying = false" @timeupdate="timeUpdated($event.target)" @loadeddata="loadedData($event.target)" @click="$event.target.load()" />
    <div class="item flex-basis-100">
      <button class="play" v-if="isPlaying" @click="pause()" :disabled="!loaded">Pause</button>
      <button class="play" v-if="!isPlaying" @click="play()" :disabled="!loaded">Play</button>
    </div>
    <div class="item flex-basis-500">
      <input class="time" type="range" v-model="currentTime" :max="duration" step="0.000001" @change="timeChanged(currentTime)" @input="timeChanged(currentTime)" />
    </div>
    <div class="item flex-basis-200">
      <input class="volume" type="range" v-model="volume" max="1" step="0.0001" @change="volumeChanged(volume)" @input="volumeChanged(volume)" />
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: "ListenSentence",
  data() {
    return {
      duration: 0,
      currentTime: 0,
      volume: 1,
      isPlaying: false,
      loaded: false,
      ended: false
    }
  },
  methods: {
    play() {
      this.$refs['audio'].play()
    },
    pause() {
      this.$refs['audio'].pause()
    },
    loadedData(audio) {
      this.duration = audio.duration
      this.loaded = true
      console.log(`loaded`);
    },
    timeUpdated(audio) {
      this.currentTime = audio.currentTime
    },
    timeChanged(time) {
      this.$refs['audio'].currentTime = time
    },
    volumeChanged(volume) {
      this.$refs['audio'].volume = volume
    }
  },
  props: [
    'exercise'
  ],
  watch: {
    'exercise.audio': function() {
      this.loaded = false
      this.$refs['audio'].pause()
      this.$refs['audio'].load()
    }
  }
}
</script>
<style lang="scss" scoped>
img {
    width: 100%;
}

button.play {
    width: 50px;
    padding: 5px;
    border-radius: 15px;
}

input[type="range"] {
    width: 100%;
}
</style>
