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
import { App } from "@capacitor/app";

export default {
   name: "App",
   components: {
      character: CharacterComponent,
   },
   data() {
      return {
         darkTheme: false,
      };
   },
   methods: {
      updateTheme() {
         this.darkTheme = window.navigator.userAgent.includes("AndroidDarkMode");
         if (this.darkTheme) document.body.classList.add("dark-mode");
         else document.body.classList.remove("dark-mode");
      },
   },
   created() {
      this.updateTheme();
      App.addListener("appStateChange", this.updateTheme);
   },
};
</script>
