<template>
   <div class="d-flex flex-column">
      <div class="flex-grow-1">
         <div class="text-center">
            <div class="text-start mx-auto d-inline-block mt-2">
               <div class="d-inline-flex p-1">
                  <select
                     v-model="magicAttribute"
                     class="plain block me-2"
                     @change="setData"
                     style="--color: 200deg"
                     :disabled="character.settings.locked"
                  >
                     <option :value="x" v-for="x in magicAbilities()" v-bind:key="x">{{ $t(`abilities[${x + 1}]`) }}</option>
                  </select>
                  {{ $t('spellcasting_ability') }}
               </div>
               <br />
               <div class="d-inline-flex p-1">
                  <select
                     v-model="magicLimit"
                     class="plain block me-2"
                     @change="setData"
                     style="--color: 200deg"
                     :disabled="character.settings.locked"
                  >
                     <option value="0">{{ $t('none') }}</option>
                     <option v-for="(slotOption, slotIndex) in 10" :key="slotIndex" :value="slotOption">{{ slotIndex }}</option>
                  </select>
                  {{ $t('spell_maximum') }}
               </div>
               <br />
               <div class="d-inline-flex p-1">
                  <div class="hex me-2 text-center" style="--color: 300deg">
                     {{ character.magicBonus }}
                  </div>
                  {{ $t('spell_attack_bonus') }}
               </div>
               <br />
               <div class="d-inline-flex p-1">
                  <div class="hex me-2 text-center" style="--color: 300deg">
                     {{ character.spellDifficulty }}
                  </div>
                  {{ $t('spell_save_dc') }}
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
                     :name="index == 0 ? $t('spell_slot_0') : $t('spell_slot_x', [index])"
                     :locked="character.settings.locked"
                  />
               </div>
            </template>

            <div class="col-12 col-md-6 mt-2 px-2">
               <magic-slot
                  :magicSlot="otherSpells()"
                  :index="10"
                  :deleteMode="deleteMode"
                  :name="$t('spell_slot_misc')"
                  :locked="character.settings.locked"
               />
            </div>
         </div>
      </div>

      <template v-if="!character.settings.locked">
         <div v-if="!deleteMode" class="text-center">
            <button class="btn btn-danger m-2 px-4" v-on:click="openDeleteMode" :disabled="!anySpell()">
               <i class="fas fa-trash fa-fw mx-2"></i>
            </button>
         </div>
         <div v-if="deleteMode" class="text-center">
            <button class="btn btn-danger m-2 px-4" v-on:click="confirmDelete" :disabled="!anyMarked()">
               <i class="fas fa-trash fa-fw mx-2"></i>
            </button>
            <button class="btn btn-secondary m-2 px-4" v-on:click="this.deleteMode = false">
               <i class="fas fa-times fa-fw mx-2"></i>
            </button>
         </div>
      </template>
   </div>
</template>

<script>
import { AttributeType } from '@/data-layer/attributes/attribute-type';
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
      magicAbilities() {
         return [AttributeType.Unknown, AttributeType.Intelligence, AttributeType.Wisdom, AttributeType.Charisma];
      },
      anySpell() {
         return this.character.magicSlots.filter((x) => x.spells.length > 0).length > 0;
      },
      anyMarked() {
         return this.character.magicSlots.filter((x) => x.spells.filter((x) => x.delete).length > 0).length > 0;
      },
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
