<template>
  <div>
    <div>
      <h3>{{ exercise.title }}</h3>
    </div>
    <div
      v-for="(question, index) in exercise.answers"
      @click="select(question)"
      :class="{
        right: (question.correct && exercise.answered),
        wrong: (question.selected && !question.correct && exercise.answered)
      }"
    >
      <p><span>{{ index + 1 }})</span> {{ question.title }}</p>
    </div>
    <div>
      <button class="next" @click="next()" :disabled="!exercise.answered">Next</button>
    </div>
  </div>
</template>
<script>
import answerBus from './bus'

export default {
  name: "Answers",
  methods: {
    select (answer) {
      if (!this.exercise.answered) {
        answer.selected = true
        this.exercise.answered =  true
      }
    },
    next () {
      answerBus.$emit('next')
    }
  },
  props: [
    'exercise'
  ],
  mounted () {
    console.log(this.exercise);
  }
 }
</script>
<style lang="scss" scoped>
button.next {
  float: right;
  margin-right: 25px;
  margin-bottom: 15px;
  padding: 7.5px;
  border-radius: 15px;
}

.right {
  background-color: green;
}

.wrong {
  background-color: red;
}
</style>
