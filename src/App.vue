<style lang="scss">
@import "@/assets/css/style.scss";
</style>

<template>
  <character />
</template>

<script>
import CharacterComponent from "./components/character.vue";

export default {
  name: "App",
  components: {
    'character': CharacterComponent,
  },
};
</script>
