<style lang="scss">
@import '@/assets/css/style.scss';
</style>

<template>
   <div class="d-flex flex-column vh-100 position-relative">
      <div class="flex-grow-1 position-relative d-flex flex-column">
         <loading :themeStorage="themeStorage" :localeStorage="localeStorage" />
      </div>
      <div class="text-center py-2 bg-primary text-white border-top border-contrast">
         <span class="small">{{ $t('title') }} {{ version }} by AndrejevVE</span>
      </div>
   </div>
</template>

<script>
import LoadingComponent from './components/loading.vue';
import ThemeStorage from '@/data-layer/local-storage/theme-storage';
import LocaleStorage from '@/data-layer/local-storage/locale-storage';

export default {
   name: 'App',
   components: {
      loading: LoadingComponent,
   },
   data() {
      return {
         version: 'v1.5.0',
         themeStorage: ThemeStorage,
         localeStorage: LocaleStorage,
      };
   },
   created() {
      this.themeStorage = new ThemeStorage();
      this.localeStorage = new LocaleStorage(this.$i18n);
   },
};
</script>
