<template>
   <header-message :model="headerMessage" />
   <div class="d-flex justify-content-center bg-primary p-2">
      <div v-for="index in 5" :key="index" :class="'mx-3 btn ' + (tab != index ? 'btn-primary' : 'btn-light')" v-on:click="tab = index">
         <i :class="'fas fa-fw fa-' + icons[index - 1]"></i>
      </div>
   </div>

   <div class="col-12 col-lg-9 col-xl-7 px-0 mx-auto flex-grow-1">
      <main-info :character="character" :headerMessage="headerMessage" v-if="tab == 1" />

      <div class="text-center row justify-content-center mx-0" v-if="tab == 2">
         <attributes-list :character="character" />
      </div>

      <div class="text-center d-flex flex-column h-100" v-if="tab == 3">
         <inventory :character="character" />
      </div>

      <div class="text-center d-flex flex-column h-100" v-if="tab == 4">
         <slots-list :character="character" />
      </div>

      <footer-menu :character="character" :saveService="saveService" v-if="tab == 5" />
   </div>
   <div class="position-fixed end-0 bottom-0 op-05" v-if="character.settings.locked && (tab < 3 || tab == 4)">
      <i class="fas fa-lock fa-2x m-2" v-on:click="tab = 5"></i>
   </div>
   <div class="text-center small text-secondary py-1 border-top">Лист персонажа {{ version }} by AndrejevVE</div>
</template>

<script>
import Character from "../models/character";
import Encoder from "../models/encoder";
import HeaderMessage from "../models/header-message";
import FooterMenuComponent from "./menu/footer-menu.vue";
import HeaderMessageComponent from "./header-message.vue";
import InventoryComponent from "./inventory/inventory.vue";
import AttributesListComponent from "./attributes-skills/attributes-list.vue";
import MainInfoComponent from "./main-info/main-info";
import SaveService from "../models/saving/save-service";
import SlotsListComponent from "./magic/slots-list.vue";

export default {
   name: "character",
   data() {
      return {
         character: Character,
         encoder: Encoder,
         headerMessage: HeaderMessage,
         version: "v1.1.0",
         tab: 1,
         icons: ["id-card", "running", "suitcase", "hand-sparkles", "cog"],
         saveService: SaveService,
      };
   },
   methods: {
      importCharacter(input, method) {
         this.character = this.saveService.importCharacter(input, method, this.headerMessage);
      },
      clearCharacter() {
         this.character = new Character();
      },
      loadSave() {
         var save = this.saveService.saveSlots[0].value;
         this.importCharacter(save, 256);
      },
      autoSave() {
         if (this.character.settings.autoSavesEnabled) {
            this.headerMessage.showSuccess("Автосохранение завершено");
            this.saveService.applySave(this.character);
         }
         setTimeout(this.autoSave, this.character.settings.autoSavesInterval);
      },
   },
   created() {
      this.clearCharacter();
      this.encoder = new Encoder();
      this.headerMessage = new HeaderMessage();
      this.saveService = new SaveService();
      this.loadSave();
      setTimeout(this.autoSave, this.character.settings.autoSavesInterval);
   },
   components: {
      footerMenu: FooterMenuComponent,
      headerMessage: HeaderMessageComponent,
      attributesList: AttributesListComponent,
      mainInfo: MainInfoComponent,
      inventory: InventoryComponent,
      slotsList: SlotsListComponent,
   },
};
</script>
