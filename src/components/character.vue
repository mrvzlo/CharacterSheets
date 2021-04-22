<template>
   <div class="text-center row mx-0">
      <div class="col-12 mt-2">
         <div class="alert alert-secondary">
            <input v-model="character.name" class="plain w-100 border-bottom py-2" placeholder="Имя персонажа" :disabled="locked" />
         </div>
      </div>
      <div class="col-3">
         <div class="alert alert-warning">
            <input v-model="character.level" class="plain w-100 border-bottom" type="number" min="1" max="20" :disabled="locked" />
            <div class="small text-secondary">Уровень</div>
         </div>
      </div>
      <div class="col-5">
         <div class="alert alert-warning">
            <input v-model="character.race" class="plain w-100 border-bottom" :disabled="locked" />
            <div class="small text-secondary">Раса</div>
         </div>
      </div>
      <div class="col-4">
         <div class="alert alert-warning">
            <input v-model="character.class" class="plain w-100 border-bottom" :disabled="locked" />
            <div class="small text-secondary">Класс</div>
         </div>
      </div>
      <div class="col-6 text-start">
         <div class="d-flex mb-2">
            <div class="hex me-2" style="--color: 250deg" v-on:click="inspiration">
               <span v-if="character.inspiration" class="fas fa-check"></span>
            </div>
            Вдохновение
         </div>
      </div>
      <div class="col-6 text-start">
         <div class="d-flex mb-2">
            <div class="hex me-2" style="--color: 300deg">
               {{ character.proficiency() }}
            </div>
            Мастерство
         </div>
      </div>
      <div class="col-12" v-for="attribute in character.attributes" v-bind:key="attribute.name">
         <div class="row border-top">
            <div class="col-3 my-4">
               <div class="hex gray">
                  <input v-model="attribute.value" class="plain w-100" type="number" min="1" max="20" :disabled="locked" />
               </div>
               <div class="border pt-3 pb-1 rounded-4 d-flex flex-column mt-n3">
                  <div></div>
                  <h1 class="m-0">{{ attribute.bonus() }}</h1>
                  {{ attribute.name() }}
               </div>
               <div v-if="attribute.type == attributeType.Wisdom" class="small">Пассив {{ 10 + attribute.bonus() }}</div>
            </div>

            <div :class="'text-start p-0 d-flex flex-column justify-content-center ' + (attribute.type > attributeType.Dexterity ? 'col-9' : ' col-4')">
               <div v-for="check in attribute.getChecks(checkType.Saving)" v-bind:key="check.name">
                  <check :check="check" :proficiency="character.proficiency()" :bonus="attribute.bonus()" :color="'text-warning'" :locked="locked"></check>
               </div>
               <div v-for="check in attribute.getSkillChecks()" v-bind:key="check.name">
                  <check :check="check" :proficiency="character.proficiency()" :bonus="attribute.bonus()" :locked="locked"></check>
               </div>

               <div v-if="attribute.type == attributeType.Constitution" class="small my-2 border p-1 bones rounded">
                  Кость здоровья
                  <select v-model="character.healthBoneValue" class="plain float-end fw-bold" :disabled="locked">
                     <option value="6">Д6</option>
                     <option value="8">Д8</option>
                     <option value="10">Д10</option>
                     <option value="12">Д12</option>
                  </select>
                  <div class="d-flex justify-content-center">
                     <input v-model="character.healthBones" class="plain w-25" type="number" min="0" :max="character.level" />
                     <span>/</span>
                     <input v-model="character.level" class="plain w-25" type="number" readonly />
                  </div>
               </div>
            </div>

            <div v-if="attribute.type == attributeType.Dexterity" class="col-5 d-flex flex-column justify-content-center border-start small text-start pe-0 ps-2">
               <div class="my-1">
                  <div class="hex me-1" style="--color: 110deg">
                     <input v-model="character.speed" class="plain w-100" type="number" :disabled="locked" />
                  </div>
                  Скорость
               </div>
               <div class="my-1">
                  <div class="hex me-1" style="--color: 160deg">
                     <input v-model="character.initiative" class="plain w-100" type="number" :disabled="locked" />
                  </div>
                  Инициатива
               </div>
               <div class="my-1">
                  <div class="hex me-1" style="--color: 40deg">
                     <input v-model="character.armor" class="plain w-100" type="number" :disabled="locked" />
                  </div>
                  Класс брони
               </div>
            </div>

            <div v-if="attribute.type == attributeType.Strength" class="col-5 border-start small px-0">
               <div class="heart pt-3 pb-4 small">
                  <div>
                     <div class="hex big" style="--color: -10deg">
                        <input v-model="character.health" class="plain w-100" type="number" :max="character.healthMax" min="0" />
                     </div>
                     <span class="m-1 h3">/</span>
                     <div class="hex big" style="--color: -10deg">
                        <input v-model="character.healthMax" class="plain w-100" type="number" min="0" :disabled="locked" />
                     </div>
                  </div>
                  <div class="mb-1">Здоровье</div>
                  <div class="hex" style="--color: -10deg">
                     <input v-model="character.healthBonus" class="plain w-100" type="number" />
                  </div>
                  <div>Бонус</div>
               </div>
            </div>
         </div>
      </div>
   </div>

   <footer-menu :locked="locked"></footer-menu>
   <export :character="character"></export>
   <import />
</template>

<script>
import Character from "../models/character";
import { CheckType } from "../models/enums/check-type";
import { AttributeType } from "../models/enums/attribute-type";
import CheckComponent from "./check.vue";
import ExportComponent from "./export.vue";
import ImportComponent from "./import.vue";
import FooterMenuComponent from "./footer-menu.vue";
import Encoder from "../models/encoder";

export default {
   name: "character",
   data() {
      return {
         locked: false,
         character: Character,
         checkType: { default: CheckType }, //I dont give a **** why
         attributeType: { default: AttributeType },
         encoder: Encoder,
      };
   },
   methods: {
      lock: function() {
         this.locked = !this.locked;
      },
      inspiration: function() {
         this.character.inspiration = !this.character.inspiration;
      },
      importStr: function(input) {
         this.character = this.encoder.decode(input);
      },
      reloadCharacter: function() {
         this.character = new Character();
      },
   },
   created() {
      this.attributeType = AttributeType;
      this.checkType = CheckType;
      this.encoder = new Encoder();
      this.reloadCharacter();
   },
   components: {
      check: CheckComponent,
      export: ExportComponent,
      import: ImportComponent,
      "footer-menu": FooterMenuComponent,
   },
};
</script>
