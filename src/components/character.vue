<template>
   <div class="d-flex justify-content-around bg-primary p-2">
      <div v-for="index in icons.length" :key="index" :class="'mx-2 btn ' + (tab != index ? 'op-03' : '')" v-on:click="tab = index">
         <i :class="'fas fa-fw fa-' + icons[index - 1]"></i>
      </div>
   </div>

   <div class="col-12 col-lg-9 col-xl-7 px-0 mx-auto flex-grow-1">
      <div class="d-flex flex-column h-100" v-if="tab == 1">
         <main-info :character="character" />
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

      <settings :character="character" :themeSwitch="themeSwitch" v-if="tab == 6" />
   </div>
   <div class="position-sticky text-end bottom-0 op-08 pb-1 px-2 mt-n4" v-if="tab < 6">
      <i class="fas fa-2x fa-lock" v-if="character.settings.locked"></i>
      <i class="fas fa-2x fa-unlock" v-else></i>
   </div>
</template>

<script>
import Character from '../models/character';
import SettingsComponent from './settings/settings.vue';
import FixedMessageComponent from './fixed-message.vue';
import InventoryComponent from './inventory/inventory.vue';
import PerksListComponent from './perks/perks-list.vue';
import AttributesListComponent from './attributes-skills/attributes-list.vue';
import MainInfoComponent from './main-info/main-info';
import SlotsListComponent from './magic/slots-list.vue';
import BootstrapHelper from '@/helpers/bootstrap-helper';
import ThemeSwitch from '@/helpers/theme-switch';

export default {
   name: 'character',
   props: {
      themeSwitch: ThemeSwitch,
      character: Character,
   },
   data() {
      return {
         tab: 1,
         icons: ['id-card', 'running', 'clipboard-list', 'suitcase', 'hand-sparkles', 'cog'],
      };
   },
   methods: {
      autoSave() {
         if (this.$parent.showStart) return;
         this.$parent.makeSave(this.character);
         setTimeout(this.autoSave, this.character.settings.autoSavesIntervalMs);
      },
      toStart() {
         this.$parent.makeSave(this.character);
         this.$parent.showStart = true;
      },
   },
   created() {
      setTimeout(this.autoSave, this.character.settings.autoSavesIntervalMs);
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
