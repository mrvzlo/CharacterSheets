<template>
   <header-message :model="headerMessage" />
   <div class="d-flex justify-content-center bg-dark p-2">
      <div v-for="index in 5" :key="index" :class="'mx-3 btn ' + (tab != index ? 'btn-dark' : 'btn-light')" v-on:click="tab = index">
         <i :class="'fas fa-fw fa-' + icons[index - 1]"></i>
      </div>
   </div>

   <div class="flex-grow-1">
      <main-info :locked="locked" :character="character" :headerMessage="headerMessage" v-if="tab == 1" />

      <div class="text-center row justify-content-center mx-0" v-if="tab == 2">
         <attributes-list :locked="locked" :character="character" />
      </div>

      <div class="text-center row justify-content-center mx-0" v-if="tab == 3">
         <inventory :character="character" />
      </div>

      <footer-menu :locked="locked" :character="character" :saveService="saveService" v-if="tab == 5" />
   </div>
   <div class="text-center small text-secondary py-1 border-top">D&D 5e лист персонажа {{ version }} by AndrejevVE</div>
</template>

<script>
import Character from "../models/character";
import Encoder from "../models/encoder";
import HeaderMessageModel from "../models/header-message-model";
import FooterMenuComponent from "./menu/footer-menu.vue";
import HeaderMessageComponent from "./header-message.vue";
import InventoryComponent from "./inventory/inventory.vue";
import AttributesListComponent from "./attributes-skills/attributes-list.vue";
import MainInfoComponent from "./main-info/main-info";
import SaveService from "../models/saving/save-service";

export default {
   name: "character",
   data() {
      return {
         locked: false,
         character: Character,
         encoder: Encoder,
         headerMessage: HeaderMessageModel,
         version: "v0.8.0",
         tab: 1,
         icons: ["id-card", "running", "suitcase", "hand-sparkles", "cog"],
         saveService: SaveService,
      };
   },
   methods: {
      lock() {
         this.locked = !this.locked;
      },
      importCharacter(input, method) {
         var result = this.saveService.importCharacter(input, method, this.headerMessage);
         this.character = result.character;
         this.locked = result.locked;
      },
      clearCharacter() {
         this.character = new Character();
         this.locked = false;
      },
      loadSave() {
         var save = this.saveService.saveSlots[0].value;
         this.importCharacter(save, 256);
      },
   },
   created() {
      this.encoder = new Encoder();
      this.headerMessage = new HeaderMessageModel();
      this.saveService = new SaveService();
      this.loadSave();
   },
   components: {
      footerMenu: FooterMenuComponent,
      headerMessage: HeaderMessageComponent,
      attributesList: AttributesListComponent,
      mainInfo: MainInfoComponent,
      inventory: InventoryComponent,
   },
};
</script>
