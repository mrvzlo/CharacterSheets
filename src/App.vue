<style lang="scss">
@import '@/assets/css/style.scss';
</style>

<template>
   <div class="d-flex flex-column vh-100 position-relative">
      <character :themeSwitch="themeSwitch" />
   </div>
</template>

<script>
import CharacterComponent from './components/character.vue';
import ThemeSwitch from './helpers/theme-switch';

export default {
   name: 'App',
   components: {
      character: CharacterComponent,
   },
   data() {
      return {
         themeSwitch: ThemeSwitch,
      };
   },
   created() {
      this.themeSwitch = new ThemeSwitch();
   },
};
</script>
