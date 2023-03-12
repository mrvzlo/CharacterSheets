<template>
   <div class="d-flex justify-content-around bg-primary p-1 border-bottom border-contrast">
      <div v-for="(_, index) in icons.length" :key="index" :class="'mx-2 btn ' + (tab != index ? 'op-03' : '')" v-on:click="slideTo(index)">
         <i :class="'icon icon-' + icons[index]"></i>
      </div>
   </div>

   <div class="flex-grow-1">
      <swiper @swiper="setSwiperRef">
         <swiper-slide>
            <main-info :character="character" />
         </swiper-slide>
         <swiper-slide>
            <attributes-list :character="character" />
         </swiper-slide>
         <swiper-slide>
            <perks-list :character="character" />
         </swiper-slide>
         <swiper-slide>
            <inventory :character="character" />
         </swiper-slide>
         <swiper-slide>
            <slots-list :character="character" />
         </swiper-slide>
         <swiper-slide>
            <settings :character="character" />
         </swiper-slide>
      </swiper>
   </div>

   <div class="position-sticky text-end bottom-0 op-08 pe-2 h-0 z-100">
      <div class="position-relative lock-shift d-inline m-1">
         <i :class="'h1 icon icon-lock ' + (pulse ? 'pulse' : '')" v-if="character.settings.locked"></i>
         <i class="h1 icon icon-lock-open" v-else></i>
      </div>
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
import { Swiper, SwiperSlide } from 'swiper/vue';

export default {
   name: 'character',
   props: {
      character: Character,
   },
   data() {
      return {
         icons: ['user', 'strong', 'list', 'suitcase', 'stars', 'cog'],
         swiperRef: null,
         pulse: false,
      };
   },
   methods: {
      autoSave() {
         if (this.$parent.showStart) return;
         this.$parent.makeSave(this.character);
         setTimeout(this.autoSave, this.character.settings.autoSavesIntervalMs);
      },
      setSwiperRef(swiper) {
         this.swiperRef = swiper;
      },
      slideTo(index) {
         this.swiperRef.slideTo(index, 500);
      },
      checkDisabled(event) {
         if (!event.path) return;
         const hasDisabled = event.path.filter((x) => this.isDisabled(x));
         if (hasDisabled.length === 0) return;
         this.pulse = false;
         setTimeout(() => (this.pulse = true), 1);
      },
      isDisabled(element) {
         if (!(element instanceof HTMLElement)) return false;
         return element.disabled || element.getAttribute('disabled') === true.toString();
      },
   },
   created() {
      setTimeout(this.autoSave, this.character.settings.autoSavesIntervalMs);
   },
   mounted() {
      new BootstrapHelper().initTooltips();
      document.addEventListener('click', this.checkDisabled, false);
   },
   computed: {
      tab: function() {
         return this.swiperRef?.activeIndex ?? 0;
      },
   },
   components: {
      settings: SettingsComponent,
      fixedMessage: FixedMessageComponent,
      attributesList: AttributesListComponent,
      mainInfo: MainInfoComponent,
      inventory: InventoryComponent,
      slotsList: SlotsListComponent,
      perksList: PerksListComponent,
      Swiper,
      SwiperSlide,
   },
};
</script>
