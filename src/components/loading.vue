<template>
   <template v-if="showStart">
      <div class="bg-primary p-2 h-50px mb-5 text-white">
         <div class="h4 fw-bold text-center my-1">Выберите персонажа</div>
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

      <div class="text-center">
         <button type="button" class="btn btn-success fw mx-2" data-bs-dismiss="modal" v-on:click="load" v-if="selected !== appConfig.unselected">
            Загрузить
         </button>
         <button type="button" class="btn btn-danger fw mx-2" v-on:click="deleteSave" v-if="hasSave(selected)">
            Удалить
         </button>
      </div>
   </template>

   <character :character="character" :themeSwitch="themeSwitch" v-else />

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
</template>

<script>
import SaveService from '@/models/saving/save-service';
import AppConfig from '@/app-config';
import ThemeSwitch from '@/helpers/theme-switch';
import FixedMessage from '@/models/fixed-message';
import Character from '@/models/character';
import SaveData from '@/models/saving/save-data';
import FixedMessageComponent from './fixed-message.vue';
import CharacterComponent from './character.vue';

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
   },
   methods: {
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
         if (!this.hasSave(id)) return 'Пустой слот';
         const textLimit = 15;
         const name = this.list[id].name.length ? this.list[id].name : 'Неизвестный';
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
   },
};
</script>
