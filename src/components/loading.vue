<template>
   <template v-if="showStart && list.length === appConfig.saveSlots">
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

      <div class="text-center row mx-2 justify-content-center" v-if="selected !== appConfig.unselected">
         <div class="col-4">
            <button type="button" class="btn btn-success w-100 px-0" data-bs-dismiss="modal" v-on:click="load">
               {{ hasSave(selected) ? $t('load') : $t('create') }}
            </button>
         </div>
         <template v-if="hasSave(selected)">
            <div class="col-4">
               <button type="button" class="btn btn-info w-100 px-0" v-on:click="download">
                  {{ $t('download') }}
               </button>
            </div>
            <div class="col-4">
               <button type="button" class="btn btn-danger w-100 px-0" data-bs-toggle="modal" data-bs-target=".confirmationModal">
                  {{ $t('delete') }}
               </button>
            </div>
         </template>
         <template v-else>
            <div class="col-4">
               <label for="upload" class="btn btn-info w-100 px-0">
                  {{ $t('upload') }}
               </label>
               <input type="file" id="upload" class="hidden" v-on:change="upload" />
            </div>
         </template>
      </div>

      <div class="mb-1">&nbsp;</div>

      <div class="position-absolute bottom-0 start-0 p-1" v-on:click="toggleTheme">
         <div class="btn btn-primary">
            <i class="fas fa-fw fa-palette"></i>
         </div>
      </div>

      <div class="position-absolute bottom-0 end-0 p-1" v-on:click="toggleLocale">
         <div class="btn btn-primary text-uppercase">{{ localeStorage.nextLocale() }}</div>
      </div>
   </template>

   <character :character="character" :themeStorage="themeStorage" :localeStorage="localeStorage" v-if="!showStart" />

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
import { AppConfig } from '@/app-config';
import ThemeStorage from '@/data-layer/local-storage/theme-storage';
import LocaleStorage from '@/data-layer/local-storage/locale-storage';
import CharacterStorage from '@/data-layer/local-storage/character-storage';
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
         headerMessage: FixedMessage,
         character: Character,
         saveService: SaveService,
         list: [SaveData],
         showStart: true,
         characterStorage: CharacterStorage,
         appConfig: AppConfig,
      };
   },
   props: {
      themeStorage: ThemeStorage,
      localeStorage: LocaleStorage,
   },
   methods: {
      toggleTheme() {
         this.themeStorage.toggleTheme();
      },

      toggleLocale() {
         this.localeStorage.toggleLocale();
      },

      select(num) {
         this.selected = this.selected == num ? AppConfig.unselected : num;
      },

      load() {
         if (!this.hasSave(this.selected)) {
            this.showCharacter(new Character(this.selected));
            this.saveService.makeSave(this.character);
            return;
         }

         this.saveService.loadBySaveSlot(this.selected).then(this.showCharacterResult);
      },

      download() {
         this.saveService.downloadBlob(this.selected, this.savedName(this.selected));
      },

      upload(e) {
         var files = e.target.files || e.dataTransfer.files;
         if (!files.length) return;
         this.saveService.import(this.selected, files[0]).then(this.showCharacterResult);
      },

      deleteSave: function() {
         this.saveService.deleteSave(this.selected);
         this.selected = AppConfig.unselected;
         this.reloadList();
      },

      showCharacterResult(result) {
         if (!result.status) {
            this.headerMessage.showHeader(this.$t('error'));
            return;
         }
         this.characterStorage.saveChoice(this.selected);
         this.showCharacter(result.character);
      },

      showCharacter(character) {
         this.character = character;
         this.selected = AppConfig.unselected;
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
            '. ' +
            this.formatTwoDigits(formatted.getHours()) +
            ':' +
            this.formatTwoDigits(formatted.getMinutes())
         );
      },

      hasSave(id) {
         return !this.list[id]?.empty ?? false;
      },

      formatTwoDigits(number) {
         return isNaN(number) ? '00' : number > 9 ? number : '0' + number;
      },

      makeSave(character) {
         this.saveService.makeSave(character);
         this.reloadList();
      },

      reloadList() {
         this.saveService.getAll().then((x) => (this.list = x));
      },

      toStart() {
         this.showStart = true;
         this.characterStorage.saveChoice(AppConfig.unselected);
      },
   },
   created() {
      this.appConfig = AppConfig;
      this.saveService = new SaveService();
      this.headerMessage = new FixedMessage();
      this.selected = AppConfig.unselected;
      this.characterStorage = new CharacterStorage();
      this.characterStorage.getChoice().then((x) => {
         this.selected = x;
         if (this.selected !== AppConfig.unselected) this.load();
      });
      this.reloadList();
   },
   components: {
      fixedMessage: FixedMessageComponent,
      character: CharacterComponent,
      deleteConfirmation: deleteConfirmationComponent,
   },
};
</script>
