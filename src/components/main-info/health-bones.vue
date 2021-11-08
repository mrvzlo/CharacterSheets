<template>
   <div class="my-2 w-100 p-1 bones position-relative">
      <div class="text-center">
         <span class="px-1 d-inline-block"> {{ $t('character_hit_dice') }}</span>
         <span class="plain d-inline-block fw-bold pe-2"> d{{ character.class.bone }} </span>
      </div>
      <div class="d-flex justify-content-center border-top align-items-center">
         <input v-model="bones" class="plain w-30px text-center" type="number" min="0" :max="character.level" @change="setData" />
         <i class="icon icon-slash"></i>
         <span class="w-30px text-center">{{ character.level }}</span>
      </div>
   </div>
</template>

<script>
import Character from '../../models/character';
import OctagonComponent from '@/components/helpers/octagon.vue';

export default {
   name: 'health-bones',
   props: {
      character: Character,
   },
   data() {
      return {
         bones: 0,
      };
   },
   methods: {
      setData() {
         if (this.bones > this.character.level) {
            this.bones = this.character.level;
         } else if (this.bones < 0) {
            this.bones = 0;
         }
         Object.assign(this.character, { healthBones: this.bones });
      },
      getData() {
         this.bones = this.character.healthBones;
      },
   },
   watch: {
      character: {
         handler() {
            this.getData();
         },
         deep: true,
         immediate: true,
      },
   },
   components: {
      octagon: OctagonComponent,
   },
};
</script>
