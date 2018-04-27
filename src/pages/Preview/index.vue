<template>
  <div>
    <div>
      <h2>Preview</h2>
    </div>
    <div>
      <ListenSentence :exercises="exercises"/>
    </div>
  </div>
</template>
<script>
import ListenSentence from '../../components/ListenSentence'

export default {
  name: "Preview",
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
</style>
