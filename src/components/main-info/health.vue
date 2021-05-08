<template>
   <div class="heart p-3 pb-4 small mt-1">
      <div class="d-flex justify-content-center mt-2">
         <div class="hex big" style="--color: -10deg">
            <input v-model="current" class="plain w-100" type="number" :max="character.healthMax" min="0" @change="setData" />
         </div>
         <span class="mx-1 my-0 h3">/</span>
         <div class="hex big" style="--color: -10deg">
            <input v-model="max" class="plain w-100" type="number" min="0" :disabled="locked" @change="setData" />
         </div>
      </div>
      <div class="mb-1">Здоровье</div>
      <div class="hex" style="--color: -10deg">
         <input v-model="bonus" class="plain w-100" type="number" min="0" @change="setData" />
      </div>
      <div>Бонус</div>
   </div>
</template>

<script>
import Character from "../../models/character";

export default {
   name: "health",
   props: {
      character: Character,
      locked: Boolean,
   },
   data() {
      return {
         current: 0,
         max: 0,
         bonus: 0,
      };
   },
   methods: {
      setData() {
         Object.assign(this.character, { health: this.current });
         Object.assign(this.character, { healthBonus: this.bonus });
         Object.assign(this.character, { healthMax: this.max });
      },
      getData() {
         this.current = this.character.health;
         this.bonus = this.character.healthBonus;
         this.max = this.character.healthMax;
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
