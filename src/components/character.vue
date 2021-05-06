<template>
   <header-message :model="headerMessage"></header-message>
   <div class="d-flex justify-content-around bg-dark p-2">
      <div :class="'btn ' + (tab != 1 ? 'btn-dark' : 'btn-light')" v-on:click="tab = 1"><i class="fas fa-id-card fa-fw"></i></div>
      <div :class="'btn ' + (tab != 2 ? 'btn-dark' : 'btn-light')" v-on:click="tab = 2"><i class="fas fa-running fa-fw"></i></div>
      <div :class="'btn ' + (tab != 3 ? 'btn-dark' : 'btn-light')" v-on:click="tab = 3"><i class="fas fa-suitcase fa-fw"></i></div>
      <div :class="'btn ' + (tab != 4 ? 'btn-dark' : 'btn-light')" v-on:click="tab = 4"><i class="fas fa-hand-sparkles fa-fw"></i></div>
      <div :class="'btn ' + (tab != 5 ? 'btn-dark' : 'btn-light')" v-on:click="tab = 5"><i class="fas fa-cog fa-fw"></i></div>
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
import AttributesListComponent from "./attributes-list.vue";
import MainInfoComponent from "./main-info";
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
