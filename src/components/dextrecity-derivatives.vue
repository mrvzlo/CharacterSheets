<template>
   <div class="my-1">
      <div class="hex me-1" style="--color: 110deg">
         <input v-model="speed" class="plain w-100" type="number" min="0" :disabled="locked" @change="setData" />
      </div>
      Скорость
   </div>
   <div class="my-1">
      <div class="hex me-1" style="--color: 160deg">
         <input v-model="initiative" class="plain w-100" type="number" :disabled="locked" @change="setData" />
      </div>
      Инициатива
   </div>
   <div class="my-1">
      <div class="hex me-1" style="--color: 40deg">
         <input v-model="armor" class="plain w-100" type="number" :disabled="locked" @change="setData" />
      </div>
      Класс брони
   </div>
</template>

<script>
import Character from "../models/character";

export default {
   name: "dextrecity-derivatives",
   props: {
      character: Character,
      locked: Boolean,
   },
   data() {
      return {
         speed: 0,
         armor: 0,
         initiative: 0,
      };
   },
   methods: {
      setData() {
         Object.assign(this.character, { armor: this.armor });
         Object.assign(this.character, { speed: this.speed });
         Object.assign(this.character, { initiative: this.initiative });
      },
      getData() {
         this.armor = this.character.armor;
         this.speed = this.character.speed;
         this.initiative = this.character.initiative;
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
