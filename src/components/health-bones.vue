<template>
   <div class="small my-2 border p-1 bones rounded">
      Кость здоровья
      <span class="plain float-end fw-bold pe-2"> d{{ character.class.bone }} </span>
      <div class="d-flex justify-content-center">
         <input v-model="bones" class="plain w-25" type="number" min="0" :max="character.level" @change="setData" />
         <span>/</span>
         <span class="plain w-25">{{ character.level }}</span>
      </div>
   </div>
</template>

<script>
import Character from "../models/character";

export default {
   name: "health-bones",
   props: {
      character: Character,
      locked: Boolean,
   },
   data() {
      return {
         bones: 0,
      };
   },
   methods: {
      setData() {
         Object.assign(this.character, { healthBones: this.bones });
      },
      getData() {
         this.bones = this.character.healthBones;
      },
   },
   watch: {
      character() {
         this.getData();
      },
   },
   created() {
      this.getData();
   },
};
</script>
