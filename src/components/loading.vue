<template>
   <template v-if="showStart">
      <div class="bg-primary p-2 h-50px text-white">
         <div class="h4 fw-bold text-center my-1">{{ $t('character_pick') }}</div>
      </div>

      <div class="container">
         <div v-for="(x, index) in list" :key="index" class="my-3 d-flex rounded-row">
            <div class="border bg-primary text-light px-2 py-1">{{ index + 1 }}</div>
            <div
               :class="'border py-1 px-2 flex-grow-1 border-start-0 ' + (index == selected ? 'bg-primary text-white' : '')"
               v-on:click="select(index)"
            >
               {{ savedName(index) }} <span class="float-end text-secondary">{{ savedDate(index) }}</span>
            </div>
         </div>
      </div>

      <div class="text-center" v-if="selected !== appConfig.unselected">
         <button type="button" class="btn btn-success fw mx-2" data-bs-dismiss="modal" v-on:click="load">
            {{ list[selected].empty ? $t('create') : $t('load') }}
         </button>
         <button type="button" class="btn btn-danger fw mx-2" data-bs-toggle="modal" data-bs-target=".confirmationModal" v-if="hasSave(selected)">
            {{ $t('delete') }}
         </button>
      </div>

      <div class="mb-1">&nbsp;</div>

      <div class="position-absolute bottom-0 start-0 p-1" v-on:click="toggleTheme">
         <div class="btn btn-primary">
            <i class="fas fa-fw fa-palette"></i>
         </div>
      </div>

      <div class="position-absolute bottom-0 end-0 p-1" v-on:click="toggleLocale">
         <div class="btn btn-primary text-uppercase">{{ localeSwitch.nextLocale() }}</div>
      </div>
   </template>

   <character :character="character" :themeSwitch="themeSwitch" :localeSwitch="localeSwitch" v-else />

   <fixed-message :model="headerMessage" :msgClass="'top-0 start-0 w-100'">
      <div class="text-white rounded bg-danger">
         <div class="d-flex justify-content-center px-3">
            <i class="m-auto fas fa-exclamation-triangle"></i>
            <div class="toast-body text-center py-2">
               {{ headerMessage.text }}
            </div>
            <button type="button" class="btn-close m-auto btn-close-white"></button>
         </div>
      </div>
   </fixed-message>

   <deleteConfirmation class="confirmationModal">
      <button type="button" class="btn btn-danger fw mx-2" v-on:click="deleteSave" data-bs-dismiss="modal">
         <i class="fas fa-trash"></i>
      </button>
   </deleteConfirmation>
</template>

<script>
import SaveService from '@/models/saving/save-service';
import AppConfig from '@/app-config';
import ThemeSwitch from '@/helpers/theme-switch';
import LocaleSwitch from '@/helpers/locale-switch';
import FixedMessage from '@/models/fixed-message';
import Character from '@/models/character';
import SaveData from '@/models/saving/save-data';
import FixedMessageComponent from './fixed-message.vue';
import CharacterComponent from './character.vue';
import deleteConfirmationComponent from './delete-confirmation.vue';

export default {
   name: 'loading',
   data() {
      return {
         importData: '',
         selected: Number,
         appConfig: AppConfig,
         headerMessage: FixedMessage,
         character: Character,
         saveService: SaveService,
         list: [SaveData],
         showStart: true,
      };
   },
   props: {
      themeSwitch: ThemeSwitch,
      localeSwitch: LocaleSwitch,
   },
   methods: {
      toggleTheme() {
         this.themeSwitch.toggleTheme();
      },

      toggleLocale() {
         this.localeSwitch.toggleLocale();
      },

      select(num) {
         this.selected = this.selected == num ? this.appConfig.unselected : num;
      },

      load() {
         if (!this.hasSave(this.selected)) {
            this.show(new Character(this.selected));
            this.saveService.makeSave(this.character);
            return;
         }

         this.saveService.getSaveData(this.selected).then((data) => {
            const result = this.saveService.importCharacter(data, this.selected);
            if (!result.status) {
               this.headerMessage.showHeader('Ошибка загрузки');
               return;
            }
            this.show(result.character);
         });
      },

      deleteSave: function() {
         this.saveService.deleteSave(this.selected);
         this.selected = this.appConfig.unselected;
         this.reloadList();
      },

      show(character) {
         this.character = character;
         this.selected = this.appConfig.unselected;
         this.showStart = false;
      },

      savedName(id) {
         if (!this.hasSave(id)) return this.$t('character_empty');
         const textLimit = 15;
         const name = this.list[id].name.length ? this.list[id].name : this.$t('character_unknown');
         return name.length > textLimit ? name.substring(0, textLimit) + '...' : name;
      },

      savedDate(id) {
         if (!this.hasSave(id)) return '';
         const date = this.list[id].datetime;
         const formatted = new Date(date);
         return (
            this.formatTwoDigits(formatted.getDate()) +
            '.' +
            this.formatTwoDigits(1 + formatted.getMonth()) +
            ' ' +
            this.formatTwoDigits(formatted.getHours()) +
            ':' +
            this.formatTwoDigits(formatted.getMinutes())
         );
      },

      hasSave(id) {
         return !this.list[id]?.empty ?? false;
      },

      formatTwoDigits(number) {
         return number > 9 ? number : '0' + number;
      },

      makeSave(character) {
         this.saveService.makeSave(character);
         this.reloadList();
      },

      reloadList() {
         this.saveService.getAll().then((x) => (this.list = x));
      },
   },
   created() {
      this.appConfig = new AppConfig();
      this.saveService = new SaveService();
      this.headerMessage = new FixedMessage();
      this.selected = this.appConfig.unselected;
      this.reloadList();
   },
   components: {
      fixedMessage: FixedMessageComponent,
      character: CharacterComponent,
      deleteConfirmation: deleteConfirmationComponent,
   },
};
</script>
