<style lang="scss">
@import "@/assets/css/style.scss";
</style>

<template>
  <CharacterComponent />
</template>

<script>
import CharacterComponent from "./components/character-component.vue";

export default {
  name: "App",
  components: {
    CharacterComponent,
  },
};
</script>
