<template>
   <div class="text-center my-4 position-relative">
      <div class="h6 fw-bold mb-1 text-default d-inline-block">{{ $t('character_edit') }}</div>
      <settings-button v-on:click="toStart" :icon="'icon icon-swap'" :text="$t('change_character')" :color="'danger'" />
      <settings-button
         v-on:click="lock"
         :icon="character.settings.locked ? 'icon icon-lock-open' : 'icon icon-lock'"
         :text="character.settings.locked ? $t('unlock') : $t('lock')"
      />

      <div class="h6 fw-bold mb-1 text-default d-inline-block mt-3">{{ $t('application_settings') }}</div>
      <settings-button v-on:click="toggleTheme" :icon="'icon icon-colors'" :text="isDark() ? $t('light_theme') : $t('dark_theme')" />
      <settings-button v-on:click="toggleLocale" :icon="'icon icon-language'" :text="localeName()" />

      <div class="h6 fw-bold mb-1 text-default d-inline-block mt-3">{{ $t('contact_author') }}</div>
      <a href="https://t.me/andrejevve">
         <settings-button v-on:click="toggleTheme" :icon="'icon icon-telegram'" :text="'Telegram'" />
      </a>
      <a href="https://twitter.com/andrejevve">
         <settings-button v-on:click="toggleTheme" :icon="'icon icon-twitter'" :text="'Twitter'" />
      </a>
   </div>
</template>

<script>
import Character from '@/models/character';
import SettingsButtonComponent from './settings-button.vue';

export default {
   name: 'settings',
   props: {
      character: Character,
   },
   methods: {
      lock: function() {
         Object.assign(this.character.settings, { locked: !this.character.settings.locked });
      },
      isDark() {
         return this.$root.themeStorage.isDark;
      },
      localeName() {
         return this.$root.localeStorage.nextLocaleNativeName();
      },
      toggleTheme() {
         this.$root.themeStorage.toggleTheme();
      },
      toggleLocale() {
         this.$root.localeStorage.toggleLocale();
      },
      toStart() {
         this.$root.emitter.emit('goToStart');
      },
   },
   components: {
      settingsButton: SettingsButtonComponent,
   },
};
</script>
