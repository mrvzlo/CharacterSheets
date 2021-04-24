<style lang="scss">
@import "@/assets/css/style.scss";
</style>

<template>
   <div class="row mx-0 justify-content-center">
      <div class="col-12 col-lg-9 col-xl-7">
         <character />
      </div>
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
