<style lang="scss">
@import '@/assets/css/style.scss';
</style>

<template>
   <div class="d-flex flex-column vh-100 position-relative">
      <div class="flex-grow-1 position-relative d-flex flex-column">
         <loading :themeSwitch="themeSwitch" :localeSwitch="localeSwitch" />
      </div>
      <div class="text-center py-2 bg-primary text-white">
         <span class="small">{{ $t('title') }} {{ version }} by AndrejevVE</span>
      </div>
   </div>
</template>

<script>
import LoadingComponent from './components/loading.vue';
import ThemeSwitch from './helpers/theme-switch';
import LocaleSwitch from './helpers/locale-switch';

export default {
   name: 'App',
   components: {
      loading: LoadingComponent,
   },
   data() {
      return {
         version: 'v1.4.2',
         themeSwitch: ThemeSwitch,
         localeSwitch: LocaleSwitch,
      };
   },
   created() {
      this.themeSwitch = new ThemeSwitch();
      this.localeSwitch = new LocaleSwitch(this.$i18n);
   },
};
</script>
