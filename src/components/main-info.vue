<template>
   <div class="text-center row mx-0 justify-content-center mt-2">
      <div class="px-1 col-12 col-md-7 col-lg-4">
         <div class="alert alert-secondary mb-2">
            <input v-model="name" class="plain w-100 border-bottom py-2 h5 mb-1" placeholder="Имя персонажа" :disabled="locked" @change="setData" />
         </div>
      </div>
      <div class="px-1 col-4 col-md-3">
         <div class="alert alert-warning mb-2">
            <select v-model="characterClass" class="plain w-100 border-bottom" :disabled="locked" v-if="this.character.class" @change="setData">
               <option v-for="classType in classOptions()" v-bind:key="classType" :value="classType.id">
                  {{ classType.name }}
               </option>
            </select>
            <div class="small text-secondary">Класс</div>
         </div>
      </div>
      <div class="px-1 col-5 col-md-4 col-lg-3">
         <div class="alert alert-warning mb-2">
            <input v-model="race" class="plain w-100 border-bottom" :disabled="locked" @change="setData" />
            <div class="small text-secondary">Раса</div>
         </div>
      </div>
      <div class="px-1 col-3 col-lg-2">
         <div class="alert alert-warning mb-2">
            <input v-model="level" class="plain w-100 border-bottom" type="number" min="1" max="20" :disabled="locked" @change="setData" />
            <div class="small text-secondary">Уровень</div>
         </div>
      </div>
      <div class="col-12 col-md-3 text-start d-flex d-md-block d-lg-flex justify-content-center">
         <div class="d-flex px-1">
            <div class="hex me-2" style="--color: 250deg" v-on:click="toggleInspiration">
               <span v-if="inspiration" class="fas fa-check"></span>
            </div>
            Вдохновение
         </div>
         <div class="d-flex px-1">
            <div class="hex me-2" style="--color: 300deg">
               {{ character.proficiency }}
            </div>
            Мастерство
         </div>
      </div>
   </div>
</template>

<script>
import Character from "../models/character";
import { ClassType } from "../data-layer/classes/class-type";
import CharacterClass from "../models/character-class";

export default {
   name: "top-info",
   props: {
      character: Character,
      locked: Boolean,
   },
   data() {
      return {
         race: "",
         name: "",
         inspiration: Boolean,
         level: Number,
         characterClass: ClassType,
      };
   },
   methods: {
      classOptions() {
         return new CharacterClass(ClassType.Unknown).all;
      },
      setData() {
         Object.assign(this.character, { race: this.race });
         Object.assign(this.character, { name: this.name });
         Object.assign(this.character, { level: this.level });
         Object.assign(this.character, { class: new CharacterClass(this.characterClass) });
         Object.assign(this.character, { inspiration: this.inspiration });
      },
      getData() {
         this.race = this.character.race;
         this.name = this.character.name;
         this.level = this.character.level;
         this.inspiration = this.character.inspiration;
         this.characterClass = this.character.class.type;
      },
      toggleInspiration() {
         this.inspiration = !this.inspiration;
         this.setData();
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
