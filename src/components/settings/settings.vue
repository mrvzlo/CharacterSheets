<template>
   <div class="text-center my-4">
      <div>
         {{ $t('character_edit') }}
         <settings-button
            v-on:click="lock"
            :icon="character.settings.locked ? 'fas fa-unlock' : 'fas fa-lock'"
            :text="character.settings.locked ? $t('lock') : $t('unlock')"
         />
      </div>
      <settings-button v-on:click="toggleTheme" :icon="'fas fa-palette'" :text="themeStorage.isDark ? $t('light_theme') : $t('dark_theme')" />
      <settings-button v-on:click="toggleLocale" :icon="'fas fa-language'" :text="localeStorage.nextLocaleNativeName()" />
      <settings-button v-on:click="toStart" :icon="'fas fa-sync'" :text="$t('change_character')" />
      <a href="https://t.me/andrejevve" target="_blank">
         <settings-button :icon="'fab fa-telegram-plane'" :text="$t('contact_author')" />
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
      importCharacter: function(a, b) {
         return this.$parent.importCharacter(a, b);
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
