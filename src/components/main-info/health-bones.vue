<template>
   <div class="small my-2 mx-auto px-2 py-1 bones text-start position-relative">
      Кость здоровья
      <span class="plain float-end fw-bold pe-2"> d{{ character.class.bone }} </span>
      <div class="d-flex justify-content-center">
         <input v-model="bones" class="plain w-25" type="number" min="0" :max="character.level" @change="setData" />
         <span>/</span>
         <span class="plain w-25">{{ character.level }}</span>
      </div>
      <octagon />
   </div>
</template>

<script>
import Character from "../../models/character";
import OctagonComponent from "@/components/helpers/octagon.vue";

export default {
   name: "health-bones",
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
