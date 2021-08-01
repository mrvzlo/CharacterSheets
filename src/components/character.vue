<template>
   <fixed-message :model="headerMessage" :msgClass="'top-0 start-0 w-100'" />
   <div class="d-flex justify-content-around bg-primary p-2">
      <div v-for="index in icons.length" :key="index" :class="'mx-2 btn ' + (tab != index ? 'op-03' : '')" v-on:click="tab = index">
         <i :class="'fas fa-fw fa-' + icons[index - 1]"></i>
      </div>
   </div>

   <div class="col-12 col-lg-9 col-xl-7 px-0 mx-auto flex-grow-1">
      <div class="d-flex flex-column h-100" v-if="tab == 1">
         <main-info :character="character" :headerMessage="headerMessage" />
      </div>

      <div class="row justify-content-center mx-0" v-if="tab == 2">
         <attributes-list :character="character" />
      </div>

      <div class="d-flex flex-column h-100" v-if="tab == 3">
         <perks-list :character="character" />
      </div>

      <div class="d-flex flex-column h-100" v-if="tab == 4">
         <inventory :character="character" />
      </div>

      <div class="d-flex flex-column h-100" v-if="tab == 5">
         <slots-list :character="character" />
      </div>

      <settings :character="character" :saveService="saveService" v-if="tab == 6" />
   </div>
   <div class="position-fixed end-0 bottom-0 op-03 m-1" v-if="tab < 4 || tab == 5">
      <i class="fas fa-lock fa-2x m-2" v-if="character.settings.locked"></i>
      <i class="fas fa-unlock fa-2x m-2" v-else></i>
   </div>
   <div class="text-center small py-1 border-top border-dark">
      <span class=" text-secondary">Чарники {{ version }} by AndrejevVE</span>
   </div>
</template>

<script>
import Character from '../models/character';
import Encoder from '../models/encoder';
import HeaderMessage from '../models/header-message';
import SettingsComponent from './menu/settings.vue';
import FixedMessageComponent from './fixed-message.vue';
import InventoryComponent from './inventory/inventory.vue';
import PerksListComponent from './perks/perks-list.vue';
import AttributesListComponent from './attributes-skills/attributes-list.vue';
import MainInfoComponent from './main-info/main-info';
import SaveService from '../models/saving/save-service';
import SlotsListComponent from './magic/slots-list.vue';
import BootstrapHelper from '@/helpers/bootstrap-helper';

export default {
   name: 'character',
   data() {
      return {
         character: Character,
         encoder: Encoder,
         headerMessage: HeaderMessage,
         version: 'v1.2.2',
         tab: 1,
         icons: ['id-card', 'running', 'clipboard-list', 'suitcase', 'hand-sparkles', 'cog'],
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
      loadAutosave() {
         this.saveService.getSaveData().then((res) => {
            this.importCharacter(res, 256);
         });
      },
      autoSave() {
         if (this.character.settings.autoSavesEnabled) {
            this.headerMessage.showSuccess('Автосохранение завершено');
            this.saveService.makeSave(this.character);
         }
         setTimeout(this.autoSave, this.character.settings.autoSavesInterval);
      },
   },
   created() {
      this.clearCharacter();
      this.encoder = new Encoder();
      this.headerMessage = new HeaderMessage();
      this.saveService = new SaveService();
      this.loadAutosave();
      setTimeout(this.autoSave, this.character.settings.autoSavesInterval);
   },
   mounted() {
      new BootstrapHelper().initTooltips();
   },
   components: {
      settings: SettingsComponent,
      fixedMessage: FixedMessageComponent,
      attributesList: AttributesListComponent,
      mainInfo: MainInfoComponent,
      inventory: InventoryComponent,
      slotsList: SlotsListComponent,
      perksList: PerksListComponent,
   },
};
</script>
