<template>
   <div class="heart p-3 pb-4  mt-2 text-center">
      <div class="d-flex justify-content-center mt-2 pt-1">
         <div class="hex big" style="--color: -10deg">
            <input v-model="editModel.health" class="plain w-100" type="number" :max="editModel.healthMax" min="0" />
         </div>
         <div><i class="icon mt-1 icon-slash align-middle"></i></div>
         <div class="hex big" style="--color: -10deg">
            <input v-model="editModel.healthMax" class="plain w-100" type="number" min="0" :disabled="character.settings.locked" />
         </div>
      </div>
      <div class="mb-1">
         {{ $t('character_health') }}
      </div>
      <div class="hex" style="--color: -10deg">
         <input v-model="editModel.healthBonus" class="plain w-100" type="number" min="0" />
      </div>
      <div class="small">
         {{ $t('character_health_bonus') }}
      </div>
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
         editModel: Character,
      };
   },
   methods: {
      setData() {
         if (+this.editModel.health > +this.editModel.healthMax) {
            this.editModel.health = this.editModel.healthMax;
         }
         Object.assign(this.character, { health: this.editModel.health });
         Object.assign(this.character, { healthBonus: this.editModel.healthBonus });
         Object.assign(this.character, { healthMax: this.editModel.healthMax });
      },
      getData() {
         this.editModel = this.character;
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
      editModel: {
         handler() {
            this.setData();
         },
         deep: true,
      },
   },
};
</script>
