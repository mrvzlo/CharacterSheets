<template>
   <div class="text-center row mx-1 justify-content-center mt-2 yellow-oct">
      <div class="px-1 col-12 col-md-6 col-lg-5">
         <div class="position-relative mb-2 py-1 gray-oct">
            <input v-model="name" class="plain w-octagon p-2 h5 m-0" placeholder="Имя персонажа" :disabled="locked" @change="setData" />
            <octagon />
         </div>
      </div>
      <div class="px-1 col-4 col-md-3">
         <div class="position-relative mb-2 py-1">
            <select v-model="characterClass" class="plain w-octagon border-bottom" :disabled="locked" v-if="this.character.class" @change="setData">
               <option v-for="classType in classOptions()" v-bind:key="classType" :value="classType.id">
                  {{ classType.name }}
               </option>
            </select>
            <div class="small text-secondary">Класс</div>
            <octagon />
         </div>
      </div>
      <div class="px-1 col-4 col-md-3">
         <div class="position-relative mb-2 py-1">
            <input v-model="race" class="plain w-octagon border-bottom" :disabled="locked" @change="setData" />
            <div class="small text-secondary">Раса</div>
            <octagon />
         </div>
      </div>
      <div class="px-1 col-4 col-md-3">
         <div class="position-relative mb-2 py-1">
            <input v-model="story" class="plain w-octagon border-bottom" :disabled="locked" @change="setData" />
            <div class="small text-secondary">Предыстория</div>
            <octagon />
         </div>
      </div>
      <div class="px-1 col-3 col-md-3 col-lg-2">
         <div class="position-relative mb-2 py-1">
            <input v-model="level" class="plain w-octagon border-bottom lh-27" type="number" min="1" max="20" :disabled="locked" @change="setData" />
            <div class="small text-secondary">Уровень</div>
            <octagon />
         </div>
      </div>
      <div class="px-1 col-4 col-md-3">
         <div class="position-relative mb-2 py-1">
            <select v-model="size" class="plain w-octagon border-bottom" :disabled="locked" @change="setData">
               <option value="0">Крошечный</option>
               <option value="1">Маленький</option>
               <option value="2">Средний</option>
               <option value="3">Большой</option>
               <option value="4">Огромный</option>
            </select>
            <div class="small text-secondary">Размер</div>
            <octagon />
         </div>
      </div>
      <div class="px-1 col-5 col-md-3">
         <div class="position-relative mb-2 py-1">
            <select v-model="alignment" class="plain w-octagon border-bottom" :disabled="locked" @change="setData">
               <option value="0">Законно-добрый</option>
               <option value="1">Законный</option>
               <option value="2">Законно-злой</option>
               <option value="3">Добрый</option>
               <option value="4">Нейтральный</option>
               <option value="5">Злой</option>
               <option value="6">Хаотично-добрый</option>
               <option value="7">Хаотичный</option>
               <option value="8">Хаотично-злой</option>
            </select>
            <div class="small text-secondary">Мировоззрение</div>
            <octagon />
         </div>
      </div>
      <div class="col-6 px-1">
         <div class="my-3">
            Вдохновение
            <div class="d-flex px-1 justify-content-center">
               <div class="mx-2">
                  <div class="hex m-auto d-block" style="--color: 250deg" v-on:click="toggleInspiration">
                     <span v-if="masterInspiration" class="fas fa-check"></span>
                  </div>
                  Мастера
               </div>
               <div class="px-2 mx-2">
                  <select class="block plain d-block" style="--color: 250deg">
                     <option value="0"></option>
                     <option value="6">d6</option>
                     <option value="8">d8</option>
                     <option value="10">d10</option>
                     <option value="12">d12</option>
                  </select>
                  Барда
               </div>
            </div>
         </div>
         <div class="text-start mx-auto d-inline-block">
            <div class="d-inline-flex p-1">
               <div class="hex me-2 text-center" style="--color: 300deg">
                  {{ character.proficiency }}
               </div>
               Мастерство
            </div>
            <br />
            <derivatives :character="character" />
         </div>
      </div>
      <div class="px-1 col-6 d-flex flex-column justify-content-between">
         <health :character="character" />
         <health-bones :character="character" />
      </div>
      <div class="col-6 my-3">
         <rest :headerMessage="headerMessage" :character="character" />
      </div>
   </div>
</template>

<script>
import Character from "@/models/character";
import { ClassType } from "@/data-layer/classes/class-type";
import CharacterClass from "@/models/character-class";
import DerivativesComponent from "./derivatives.vue";
import HealthComponent from "./health.vue";
import HealthBonesComponent from "./health-bones.vue";
import RestComponent from "./rest.vue";
import HeaderMessageModel from "@/models/header-message";
import OctagonComponent from "@/components/helpers/octagon.vue";

export default {
   name: "top-info",
   props: {
      character: Character,
      headerMessage: HeaderMessageModel,
   },
   data() {
      return {
         race: "",
         name: "",
         story: "",
         masterInspiration: Boolean,
         bardInspiration: Number,
         level: Number,
         alignment: Number,
         size: Number,
         characterClass: ClassType,
         locked: Boolean,
      };
   },
   methods: {
      classOptions() {
         return new CharacterClass(ClassType.Unknown).all;
      },
      setData() {
         Object.assign(this.character, { race: this.race });
         Object.assign(this.character, { name: this.name });
         Object.assign(this.character, { size: this.size });
         Object.assign(this.character, { story: this.story });
         Object.assign(this.character, { level: this.level });
         Object.assign(this.character, { alignment: this.alignment });
         Object.assign(this.character, { class: new CharacterClass(this.characterClass) });
         Object.assign(this.character, { masterInspiration: this.masterInspiration });
         Object.assign(this.character, { bardInspiration: this.bardInspiration });
      },
      getData() {
         this.locked = this.character.settings.locked;
         this.race = this.character.race;
         this.name = this.character.name;
         this.size = this.character.size;
         this.level = this.character.level;
         this.story = this.character.story;
         this.alignment = this.character.alignment;
         this.masterInspiration = this.character.masterInspiration;
         this.characterClass = this.character.class.type;
      },
      toggleInspiration() {
         this.masterInspiration = !this.masterInspiration;
         this.setData();
      },
      longRest() {
         this.$parent.longRest();
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
      derivatives: DerivativesComponent,
      health: HealthComponent,
      rest: RestComponent,
      healthBones: HealthBonesComponent,
      octagon: OctagonComponent,
   },
};
</script>
