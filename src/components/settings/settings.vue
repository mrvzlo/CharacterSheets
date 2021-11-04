<template>
   <div class="text-center my-4 position-relative">
      <div class="text-default d-inline-block mb-2">{{ $t('character_edit') }}</div>
      <settings-button v-on:click="toStart" :icon="'fas fa-sync'" :text="$t('change_character')" :color="'danger'" />
      <settings-button
         v-on:click="lock"
         :icon="character.settings.locked ? 'fas fa-unlock' : 'fas fa-lock'"
         :text="character.settings.locked ? $t('unlock') : $t('lock')"
      />

      <div class="text-default d-inline-block my-2">{{ $t('application_settings') }}</div>
      <settings-button v-on:click="toggleTheme" :icon="'fas fa-palette'" :text="themeStorage.isDark ? $t('light_theme') : $t('dark_theme')" />
      <settings-button v-on:click="toggleLocale" :icon="'fas fa-language'" :text="localeStorage.nextLocaleNativeName()" />

      <div class="text-default d-inline-block my-2">{{ $t('contact_author') }}</div>
      <a href="https://t.me/andrejevve">
         <settings-button v-on:click="toggleTheme" :icon="'fab fa-telegram-plane'" :text="'Telegram'" />
      </a>
      <a href="https://twitter.com/andrejevve">
         <settings-button v-on:click="toggleTheme" :icon="'fab fa-twitter'" :text="'Twitter'" />
      </a>
   </div>
</template>

<script>
import Character from '@/models/character';
import LocaleStorage from '@/data-layer/local-storage/locale-storage';
import ThemeStorage from '@/data-layer/local-storage/theme-storage';
import SettingsButtonComponent from './settings-button.vue';

export default {
   name: 'settings',
   props: {
      character: Character,
      themeStorage: ThemeStorage,
      localeStorage: LocaleStorage,
   },
   methods: {
      lock: function() {
         Object.assign(this.character.settings, { locked: !this.character.settings.locked });
      },
      toggleTheme() {
         this.themeStorage.toggleTheme();
      },
      toggleLocale() {
         this.localeStorage.toggleLocale();
      },
      toStart() {
         this.$parent.toStart();
      },
   },
   components: {
      settingsButton: SettingsButtonComponent,
   },
};
</script>
