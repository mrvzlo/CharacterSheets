<style lang="scss">
@import "@/assets/css/style.scss";
</style>

<template>
   <div class="row justify-content-center mx-0">
      <div class="col-12 col-lg-9 col-xl-7 px-0 d-flex flex-column vh-100">
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
