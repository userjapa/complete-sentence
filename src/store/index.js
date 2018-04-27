import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    exercises: [],
    toUpdate: null
  },
  getters: {
    getExercises ({ exercises }) {
      return exercises
    },
    isToUpdate ({ toUpdate }) {
      if (toUpdate === null) return true
      else return false
    }
  },
  mutations: {
    setExercises (state, exercises) {
      state.exercises = exercises
    },
    addExercise (state, exercise) {
      state.exercises.push(exercise)
    },
    setToUpdate (state, id) {
      state.toUpdate = id
    },
    edit (state, exercise) {
      const id = state.toUpdate
      state.exercises[id] = exercise
    },
    remove (state, id) {
      state.exercises.splice(id, 1)
    }
  }
})
