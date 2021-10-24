<template>
   <div class="d-flex flex-column">
      <div class="flex-grow-1">
         <div class="text-center">
            <div class="text-start mx-auto d-inline-block mt-2">
               <div class="d-inline-flex p-1">
                  <select v-model="magicAttribute" class="plain block me-2" @change="setData" style="--color: 200deg">
                     <option value="-1">Нет</option>
                     <option value="3">Инт</option>
                     <option value="4">Муд</option>
                     <option value="5">Хар</option>
                  </select>
                  Заклинательная характеристика
               </div>
               <br />
               <div class="d-inline-flex p-1">
                  <select v-model="magicLimit" class="plain block me-2" @change="setData" style="--color: 200deg">
                     <option value="0">Нет</option>
                     <option v-for="(slotOption, slotIndex) in 10" :key="slotIndex" :value="slotOption">{{ slotIndex }}</option>
                  </select>
                  Максимальная ячейка
               </div>
               <br />
               <div class="d-inline-flex p-1">
                  <div class="hex me-2 text-center" style="--color: 300deg">
                     {{ character.magicBonus }}
                  </div>
                  Модификатор атак
               </div>
               <br />
               <div class="d-inline-flex p-1">
                  <div class="hex me-2 text-center" style="--color: 300deg">
                     {{ character.spellDifficulty }}
                  </div>
                  Сложность спасбросков
               </div>
            </div>
         </div>

         <div class="row mx-0">
            <template v-if="magicLimit > 0">
               <div v-for="(_, index) in magicLimit" :key="index" class="col-12 col-md-6 mt-2 px-2">
                  <magic-slot
                     :magicSlot="character.magicSlots[index]"
                     :index="index"
                     :deleteMode="deleteMode"
                     :name="index == 0 ? 'Заговоры' : index + ' ячейка'"
                     :locked="character.settings.locked"
                  />
               </div>
            </template>

            <div class="col-12 col-md-6 mt-2 px-2">
               <magic-slot
                  :magicSlot="otherSpells()"
                  :index="10"
                  :deleteMode="deleteMode"
                  :name="'Прочие заклинания'"
                  :locked="character.settings.locked"
               />
            </div>
         </div>
      </div>

      <div v-if="!deleteMode" class="text-center">
         <button class="btn fw btn-danger m-2 pe-3" v-on:click="openDeleteMode">
            <i class="fas fa-trash me-2"></i>
            Удалить
         </button>
      </div>
      <div v-if="deleteMode" class="text-center">
         <button class="btn fw btn-danger m-2 pe-3" v-on:click="confirmDelete">
            <i class="fas fa-trash me-2"></i>
            Удалить
         </button>
         <button class="btn fw btn-secondary m-2 pe-3" v-on:click="this.deleteMode = false">
            <i class="fas fa-times me-2"></i>
            Отмена
         </button>
      </div>
   </div>
</template>

<script>
import Character from '@/models/character';
import MagicSlotComponent from './magic-slot';

export default {
   name: 'slots-list',
   props: {
      character: Character,
   },
   data() {
      return {
         deleteMode: false,
         magicAttribute: Number,
         magicLimit: Number,
      };
   },
   methods: {
      getData() {
         this.magicAttribute = this.character.magicAttribute;
         this.magicLimit = this.character.magicLimit;
      },
      addContainer() {
         this.character.addContainer();
      },
      openDeleteMode() {
         this.deleteMode = true;
         this.character.magicSlots.forEach((x) => x.toggleDeleteMode(false));
      },
      confirmDelete() {
         this.deleteMode = false;
         this.character.clearSpells();
      },
      setData() {
         Object.assign(this.character, { magicAttribute: this.magicAttribute });
         Object.assign(this.character, { magicLimit: this.magicLimit });
      },
      otherSpells() {
         return this.character.magicSlots[this.character.magicSlots.length - 1];
      },
      hideAll() {
         this.character.magicSlots.forEach((x) => (x.expand = false));
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
   components: { magicSlot: MagicSlotComponent },
};
</script>
