<template>
   <header-message :model="headerMessage"></header-message>
   <div class="d-flex justify-content-center bg-dark p-2">
      <div v-for="index in 5" :key="index" :class="'mx-3 btn ' + (tab != index ? 'btn-dark' : 'btn-light')" v-on:click="tab = index">
         <i :class="'fas fa-fw fa-' + icons[index - 1]"></i>
      </div>
   </div>

   <div class="flex-grow-1">
      <main-info :locked="locked" :character="character" v-if="tab == 1"></main-info>

      <div class="text-center row justify-content-center mx-0" v-if="tab == 2">
         <attributes-list :locked="locked" :character="character" :headerMessage="headerMessage"></attributes-list>
      </div>
      <footer-menu :locked="locked" :character="character" :save="save" v-if="tab == 5"></footer-menu>
   </div>
   <div class="text-center small text-secondary py-1 border-top">D&D 5e лист персонажа {{ version }} by AndrejevVE</div>
</template>

<script>
import Character from "../models/character";
import Encoder from "../models/encoder";
import HeaderMessageModel from "../models/header-message-model";
import FooterMenuComponent from "./menu/footer-menu.vue";
import HeaderMessageComponent from "./header-message.vue";
import AttributesListComponent from "./attributes-skills/attributes-list.vue";
import MainInfoComponent from "./main-info/main-info";
import CharacterClass from "../models/character-class";

export default {
   name: "character",
   data() {
      return {
         locked: false,
         character: Character,
         encoder: Encoder,
         save: "",
         headerMessage: HeaderMessageModel,
         version: "v0.7.1",
         tab: 1,
         icons: ["id-card", "running", "suitcase", "hand-sparkles", "cog"],
      };
   },
   methods: {
      lock() {
         this.locked = !this.locked;
      },
      importCharacter(input, method) {
         if (!this.isValid(input)) {
            return this.clearCharacter();
         }

         try {
            this.locked = true;
            this.character = method == 64 ? this.encoder.decode64(input) : this.encoder.decode256(input);
         } catch {
            this.headerMessage.showError("Ошибка загрузки");
            this.clearCharacter();
         }
      },
      clearCharacter() {
         this.character = new Character();
         this.locked = false;
      },
      loadSave() {
         this.importCharacter(this.save, 256);
      },
      applySave(newSave) {
         this.save = newSave;
         localStorage.character = newSave;
      },
      hasSave() {
         return this.isValid(this.save);
      },
      isValid(string) {
         return !!string && string !== "null";
      },
   },
   created() {
      this.encoder = new Encoder();
      this.save = localStorage.character;
      this.headerMessage = new HeaderMessageModel();
      this.loadSave();
   },
   components: {
      footerMenu: FooterMenuComponent,
      headerMessage: HeaderMessageComponent,
      attributesList: AttributesListComponent,
      mainInfo: MainInfoComponent,
   },
};
</script>
