<template>
   <div class="d-flex justify-content-around bg-primary p-2">
      <div v-for="index in icons.length" :key="index" :class="'mx-2 btn ' + (tab != index ? 'op-03' : '')" v-on:click="tab = index">
         <i :class="'fas fa-fw fa-' + icons[index - 1]"></i>
      </div>
   </div>

   <div class="col-12 col-lg-9 col-xl-7 px-0 mx-auto flex-grow-1">
      <div class="deck d-flex" :style="{ '--pos': tab - 1 }">
         <main-info :character="character" />
         <attributes-list :character="character" />
         <perks-list :character="character" />
         <inventory :character="character" />
         <slots-list :character="character" />
         <settings :character="character" :themeSwitch="themeSwitch" />
      </div>
   </div>
   <div class="position-sticky text-end bottom-0 op-08 px-2 h-0">
      <div class="position-relative top-n42px d-inline">
         <i class="fas fa-2x fa-lock" v-if="character.settings.locked"></i>
         <i class="fas fa-2x fa-unlock" v-else></i>
      </div>
   </div>
</template>

<script>
import Character from '../models/character';
import GestureTracker from '../helpers/gesture-tracker';
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
      const tracker = new GestureTracker();
      tracker.track(document.body, 'Left', () => (this.tab < 6 ? this.tab++ : null));
      tracker.track(document.body, 'Right', () => (this.tab > 1 ? this.tab-- : null));
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
