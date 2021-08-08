<template>
   <div class="d-inline-flex p-1">
      <div class="hex me-2" style="--color: 120deg">
         <input v-model="speed" class="plain w-100" type="number" min="0" :disabled="character.settings.locked" @change="setData" />
      </div>
      Скорость
   </div>
   <br />
   <div class="d-inline-flex p-1">
      <div class="hex me-2" style="--color: 120deg">
         <input v-model="initiative" class="plain w-100" type="number" :disabled="character.settings.locked" @change="setData" />
      </div>
      Инициатива
   </div>
   <br />
   <div class="d-inline-flex p-1">
      <div class="hex me-2 op" style="--color: 120deg">
         <input v-model="armor" class="plain w-100" type="number" :disabled="character.settings.locked" @change="setData" />
      </div>
      Класс брони
   </div>
</template>

<script>
import Character from '../../models/character';

export default {
   name: 'derivatives',
   props: {
      character: Character,
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
      character: {
         handler() {
            this.getData();
         },
         deep: true,
         immediate: true,
      },
   },
};
</script>
