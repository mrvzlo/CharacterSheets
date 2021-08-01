<template>
   <div class="heart p-3 pb-4 small mt-2 text-center">
      <div class="d-flex justify-content-center mt-2">
         <div class="hex big" style="--color: -10deg">
            <input v-model="current" class="plain w-100" type="number" :max="character.healthMax" min="0" @change="setData" />
         </div>
         <div class="mx-1 mb-0 mt-auto h3 lh-1">/</div>
         <div class="hex big" style="--color: -10deg">
            <input v-model="max" class="plain w-100" type="number" min="0" :disabled="character.settings.locked" @change="setData" />
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
import Character from '@/models/character';

export default {
   name: 'health',
   props: {
      character: Character,
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
         if (this.current > this.max) {
            this.current = this.max;
         }
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
