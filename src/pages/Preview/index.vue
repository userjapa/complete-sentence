<template>
  <div>
    <div>
      <h2>Preview</h2>
    </div>
    <div>
      <Answers :exercises="exercises"/>
    </div>
  </div>
</template>
<script>
import Answers from '../../components/Answers'

export default {
  name: "Preview",
  computed: {
    exercises () {
      return this.$store.getters['getExercises']
    }
  },
  components: {
    Answers
  }
}
</script>
<style lang="scss" scoped>
</style>
