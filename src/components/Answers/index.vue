<template>
  <div class="container column">
    <div class="item">
      <h3>{{ exercise.title }}</h3>
    </div>
    <div class="item">
      <div class="container">
        <div class="item flex-basis-500 item-border">
          <ListenSentence :exercise="exercise"/>
        </div>
        <div class="item flex-basis-500 item-border">
          <div class="container column">
            <div class="item flex-basis-200">
              <div
              class="item text-left"
              v-for="(question, index) in exercise.answers"
              @click="select(question)"
              :class="{
                right: (question.correct && exercise.answered),
                wrong: (question.selected && !question.correct && exercise.answered),
                selected: question.selected
                }"
                >
                <p><span>{{ index + 1 }})</span> {{ question.title }}</p>
              </div>
            </div>
            <div class="item">
              <button class="btn next" @click="setCurrent(exercises)" :disabled="!exercise.answered" v-if="!ended">Next</button>
              <button type="button" name="button"></button>
              <button class="btn next" v-if="ended" @click="finish()">Finished!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ListenSentence from '../ListenSentence'

export default {
  name: "Answers",
  data () {
    return {
      exercise: {},
      ended: false
    }
  },
  methods: {
    select (answer) {
      if (!this.exercise.answered) {
        answer.selected = true
        this.exercise.answered =  true
      }
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
    finish () {
      alert('You have finished!')
    }
  },
  props: [
    'exercises'
  ],
  components: {
    ListenSentence
  },
  watch: {
    'exercises': function () {
      this.setCurrent(this.exercises)
    }
  },
  mounted () {
    this.setCurrent(this.exercises)
  }
 }
</script>
<style lang="scss" scoped>
.btn.next {
  float: right;
  border-radius: 20px;
  font-size: 14px;
}

.right {
  background-color: green;
}

.wrong {
  background-color: red;
}

.selected {
  color: #000;
}
</style>
