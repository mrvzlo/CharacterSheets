<style lang="scss">
@import "@/assets/css/style.scss";
</style>

<template>
  <character-component />
</template>

<script>
import CharacterComponent from "./components/character-component.vue";

export default {
  name: "App",
  components: {
    'character-component': CharacterComponent,
  },
};
</script>
