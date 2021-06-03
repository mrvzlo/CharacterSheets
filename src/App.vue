<style lang="scss">
@import "@/assets/css/style.scss";
</style>

<template>
   <div class="d-flex flex-column vh-100 position-relative">
      <character />
   </div>
</template>

<script>
import CharacterComponent from "./components/character.vue";

export default {
   name: "App",
   components: {
      character: CharacterComponent,
   },
};
</script>
