<template>
  <div>
    <div>
      <h2 id="copy">Create</h2>
    </div>
    <div class="container brd">
      <ListenSentence :exercises="exercises"/>
    </div>
    <div class="container">
      <div class="view brd">
        <div>
          <form v-on:submit.prevent="save(exercise)">
            <div>
              <label for="exercise_title">Title</label>
              <input id="exercise_title" type="text" v-model="exercise.title" required/>
            </div>
            <div>
              <label for="exercise_audio">Audio Source</label>
              <input id="exercise_audio" type="text" v-model="exercise.audio" required @click="exercise.audio = `https://vignette.wikia.nocookie.net/leagueoflegends/images/b/b1/Miss_Fortune_008.ogg/revision/latest?cb=20180320083650`"/>
            </div>
            <div>
              <label for="exercise_image">Image</label>
              <input id="exercise_image" type="text" v-model="exercise.img" required @click="exercise.img = `https://www.mariannechua.com/uploads/12650-british-tea-party-wedding-45.jpg`"/>
            </div>
            <div>
              <button type="submit" name="save_exercise" v-if="$store.getters['isToUpdate']" :disabled="!$store.getters['isToUpdate']">Save</button>
              <button @click.prevent="edit(exercise)" v-if="!$store.getters['isToUpdate']">Edit</button>
              <button @click.prevent="cancelUpdate()" v-if="!$store.getters['isToUpdate']">Cancel</button>
            </div>
          </form>
          <form v-on:submit.prevent="addQuestion(question)">
            <div>
              <h4>Answers</h4>
            </div>
            <div>
              <label for="question_title">Title</label>
              <input id="question_title" type="text" v-model="question.title" required/>
              <button type="submit">Add Question</button>
            </div>
            <div v-for="(qstn, index) in exercise.answers">
              <input type="text" v-model="qstn.title"/>
              <input type="radio" name="correct" @change="correctChanged(qstn)" :checked="qstn.correct">
              <label>Correct</label>
              <button @click="removeQuestion(index)">Remove</button>
            </div>
          </form>
        </div>
      </div>
      <div class="view brd">
        <div>
          Exercises
        </div>
        <div v-for="(ex, index) in exercises">
          {{ index + 1}}) Title: {{ ex.title }}
          <button @click.prevent="setToUpdate(ex, index)">Edit</button>
          <button @click.prevent="remove(index)" :disabled="!$store.getters['isToUpdate']">Remove</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ListenSentence from '../../components/ListenSentence'

export default {
  name: "Create",
  data () {
    return {
      exercise: {
        title: `What she likes insted of backup plans?`,
        audio: `https://vignette.wikia.nocookie.net/leagueoflegends/images/b/b1/Miss_Fortune_008.ogg/revision/latest?cb=20180320083650`,
        img: `https://www.mariannechua.com/uploads/12650-british-tea-party-wedding-45.jpg`,
        answered: false,
        answers: [
          {
            title: 'Lange Plans.',
            correct: false
          },
          {
            title: 'Forge and Plans.',
            correct: false
          },
          {
            title: 'Charge and Plans.',
            correct: true
          },
          {
            title: 'Garage and Plans.',
            correct: false
          },
          {
            title: 'Hard Plans',
            correct: false
          }
        ]
      },
      question: {
        title: '',
        correct: false
      }
    }
  },
  methods: {
    correctChanged (question) {
      this.exercise.answers.map(x => {
        if (x.title === question.title) x.correct = true
        else x.correct = false
      })
    },
    addQuestion (question) {
      this.exercise.answers.push(question)
      this.question = {
        title: '',
        correct: false
      }
    },
    removeQuestion (index) {
      this.exercise.answers.splice(index, 1)
    },
    save (exercise) {
      if (exercise.answers.length > 0) {
        let hasCorrect = false
        for (const qstn of exercise.answers) {
          if (qstn.correct) hasCorrect = true
        }
        if (hasCorrect) {
          this.$store.commit('addExercise', exercise)
          this.resetExercise()
        } else {
          alert('Must select the correct answer')
        }
      } else {
        alert(`Must insert an answer before save.`)
      }
    },
    setToUpdate(exercise, id) {
      this.$store.commit('setToUpdate', id)
      this.exercise = exercise
    },
    remove (id) {
      this.$store.commit('remove', id)
    },
    resetExercise () {
      this.exercise = {
        title: '',
        audio: '',
        img: '',
        answered: false,
        answers: []
      }
    },
    edit (exercise) {
      this.$store.commit('edit', exercise)
      this.cancelUpdate()
    },
    cancelUpdate () {
      this.$store.commit('setToUpdate', null)
      this.resetExercise()
    }
  },
  computed: {
    exercises () {
      return this.$store.getters['getExercises']
    }
  },
  components: {
    ListenSentence
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;
}

.view {
  flex-grow: 1;
  flex-basis: 600px;
}
</style>
