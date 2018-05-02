<template>
  <div>
    <div class="container">
      <div class="view brd">
        <div class="container col">
          <div>
            <img :src="exercise.img"/>
          </div>
          <div class="container">
            <audio
            ref="audio"
            :src="exercise.audio"
            @playing="isPlaying = true"
            @pause="isPlaying = false"
            @timeupdate="timeUpdated($event.target)"
            @loadeddata="loadedData($event.target)"
            @click="$event.target.load()"
            />
            <div class="item grow-1 basis-1">
              <button class="play" v-if="isPlaying" @click="pause()" :disabled="!loaded">Pause</button>
              <button class="play" v-if="!isPlaying" @click="play()" :disabled="!loaded">Play</button>
            </div>
            <div class="item grow-1 basis-5">
              <input
              class="time"
              type="range"
              v-model="currentTime"
              :max="duration" step="0.000001"
              @change="timeChanged(currentTime)"
              @input="timeChanged(currentTime)"
              />
            </div>
            <div class="item grow-1 basis-2">
              <input
              class="volume"
              type="range"
              v-model="volume"
              max="1"
              step="0.0001"
              @change="volumeChanged(volume)"
              @input="volumeChanged(volume)"
              />
            </div>
          </div>
        </div>
      </div>
      <Answers class="view brd option" :exercise="exercise"/>
    </div>
  </div>
</template>
<script>
import Answers from '../../components/Answers'
import answerBus from '../Answers/bus'

export default {
  name: "ListenSentence",
  data () {
    return {
      duration: 0,
      currentTime: 0,
      volume: 1,
      isPlaying: false,
      loaded: false,
      exercise: {},
      ended: false
    }
  },
  methods: {
    play () {
      this.$refs['audio'].play()
    },
    pause () {
      this.$refs['audio'].pause()
    },
    loadedData (audio) {
      this.duration = audio.duration
      this.loaded = true
      console.log(`loaded`);
    },
    timeUpdated (audio) {
      this.currentTime = audio.currentTime
    },
    timeChanged (time) {
      this.$refs['audio'].currentTime = time
    },
    volumeChanged (volume) {
      this.$refs['audio'].volume = volume
    },
    setCurrent (exercises) {
      for (const ind in exercises) {
        if (!exercises[ind].answered) {
          this.exercise = exercises[ind]
          break
        } else {
          if (parseInt(ind) === (exercises.length - 1)) {
            this.exercise = exercises[ind]
            this.ended = true
          }
        }
      }
    },
    next () {
      if (!this.ended) this.setCurrent(this.exercises)
      if (this.ended) alert('Finished!')
    }
  },
  props: [
    'exercises'
  ],
  components: {
    Answers
  },
  watch: {
    'exercise.audio': function () {
      this.loaded = false
      this.$refs['audio'].pause()
      this.$refs['audio'].load()
    },
    'exercises': function () {
      this.setCurrent(this.exercises)
    }
  },
  mounted () {
    this.setCurrent(this.exercises)

    answerBus.$on('next', this.next)
  },
  beforeDestroy () {
    answerBus.$off('next', this.next)
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

input[type="range"].time {
  width: 100%;
}

input[type="range"].volume {
  width: 100%;
}

.container {
  display: flex;
  flex-direction: row;
}

.item {
  align-items: flex-start;
  padding: 5px;
}

.item.basis-1 {
  flex-basis: 100px;
}

.item.basis-2 {
  flex-basis: 200px;
}

.item.basis-5 {
  flex-basis: 500px;
}

.item.grow-1 {
  flex-grow: 1;
}

.item.grow-2 {
  flex-grow: 2;
}

.item.grow-5 {
  flex-grow: 5;
}

.option {
  text-align: left;
  padding-left: 20px;
}

.col {
  flex-direction: column;
}
</style>
