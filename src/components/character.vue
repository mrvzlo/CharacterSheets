<template>
   <div class="text-center row mx-0 justify-content-center mt-2">
      <div class="px-1 col-12 col-md-7 col-lg-4">
         <div class="alert alert-secondary mb-2">
            <input v-model="character.name" class="plain w-100 border-bottom py-2 h5 mb-1" placeholder="Имя персонажа" :disabled="locked" />
         </div>
      </div>
      <div class="px-1 col-4 col-md-3">
         <div class="alert alert-warning mb-2">
            <input v-model="character.class" class="plain w-100 border-bottom" :disabled="locked" />
            <div class="small text-secondary">Класс</div>
         </div>
      </div>
      <div class="px-1 col-5 col-md-4 col-lg-3">
         <div class="alert alert-warning mb-2">
            <input v-model="character.race" class="plain w-100 border-bottom" :disabled="locked" />
            <div class="small text-secondary">Раса</div>
         </div>
      </div>
      <div class="px-1 col-3 col-lg-2">
         <div class="alert alert-warning mb-2">
            <input v-model="character.level" class="plain w-100 border-bottom" type="number" min="1" max="20" :disabled="locked" />
            <div class="small text-secondary">Уровень</div>
         </div>
      </div>
      <div class="col-12 col-md-3 text-start d-flex d-md-block d-lg-flex justify-content-center">
         <div class="d-flex px-1">
            <div class="hex me-2" style="--color: 250deg" v-on:click="inspiration">
               <span v-if="character.inspiration" class="fas fa-check"></span>
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
   <div class="text-center row justify-content-center mt-2">
      <div class="border-bottom"></div>
      <div class="col-12 col-md-6 px-0 border-bottom" v-for="(attribute, index) in character.attributes" v-bind:key="attribute.name">
         <div class="d-flex justify-content-between">
            <div class="d-flex">
               <div class="my-4 px-2">
                  <div class="hex gray">
                     <input v-model="attribute.value" class="plain w-100" type="number" min="1" max="20" :disabled="locked" />
                  </div>
                  <div class="border pt-3 pb-1 rounded-4 d-flex flex-column mt-n3 attribute" :style="'--color: ' + getColor(index) + 'deg'">
                     <div></div>
                     <h1 class="m-0">{{ attribute.bonus }}</h1>
                     {{ attribute.name }}
                  </div>
                  <div v-if="attribute.type == attributeType.Wisdom" class="small">
                     Пассив
                     {{ 10 + attribute.getChecks(checkType.Perception)[0].get(character.proficiency, attribute.bonus) }}
                  </div>
               </div>

               <div :class="'text-start p-0 d-flex flex-column justify-content-center '">
                  <div v-for="check in attribute.getChecks(checkType.Saving)" v-bind:key="check.name">
                     <check
                        :check="check"
                        :proficiency="character.proficiency"
                        :bonus="attribute.bonus"
                        :color="'text-warning'"
                        :locked="locked"
                     ></check>
                  </div>
                  <div v-for="check in attribute.skillChecks" v-bind:key="check.name">
                     <check :check="check" :proficiency="character.proficiency" :bonus="attribute.bonus" :locked="locked"></check>
                  </div>
                  <div v-if="attribute.type == attributeType.Constitution">
                     <div class="small my-2 border p-1 bones rounded">
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
                           <span class="plain w-25">{{ character.level }}</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div v-if="attribute.type == attributeType.Dexterity" class="d-flex flex-column justify-content-center small text-start px-2 px-lg-4">
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
            <div v-else-if="attribute.type == attributeType.Strength" class="small px-1 px-md-4 position-relative">
               <div class="heart p-3 pb-4 small mt-1">
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
            <div v-else-if="attribute.type == attributeType.Constitution" class="small px-3 px-md-4 d-flex justify-content-center flex-column">
               <rest />
            </div>

            <div v-else></div>
         </div>
      </div>
      <div class="col-12 small text-secondary py-1">D&D 5e лист персонажа v0.6 by AndrejevVE</div>
   </div>

   <footer-menu :locked="locked"></footer-menu>
   <export-modal :character="character"></export-modal>
   <save-modal :character="character"></save-modal>
   <import-modal />
   <reload-modal />
   <header-message :model="headerMessage"></header-message>
</template>

<script>
import { CheckType } from "../data-layer/checks/check-type";
import { AttributeType } from "../data-layer/attributes/attribute-type";
import Character from "../models/character";
import Encoder from "../models/encoder";
import HeaderMessageModel from "../models/header-message-model";
import CheckComponent from "./check.vue";
import ExportModalComponent from "./menu/export-modal.vue";
import ImportModalComponent from "./menu/import-modal.vue";
import ReloadModalComponent from "./menu/reload-modal.vue";
import SaveModalComponent from "./menu/save-modal.vue";
import FooterMenuComponent from "./menu/footer-menu.vue";
import HeaderMessageComponent from "./header-message.vue";
import RestComponent from "./rest.vue";

export default {
   name: "character",
   data() {
      return {
         locked: false,
         character: Character,
         checkType: { default: CheckType }, //I dont give a **** why
         attributeType: { default: AttributeType },
         encoder: Encoder,
         save: "",
         headerMessage: HeaderMessageModel,
      };
   },
   methods: {
      lock() {
         this.locked = !this.locked;
      },
      getColor(index) {
         return 100 * index * index;
      },
      inspiration() {
         this.character.inspiration = !this.character.inspiration;
      },
      importCharacter(input, method) {
         if (!this.isValid(input)) {
            return this.clearCharacter();
         }

         try {
            this.character = method == 64 ? this.encoder.decode64(input) : this.encoder.decode256(input);
            this.locked = true;
         } catch {
            this.headerMessage.showError("Ошибка загрузки");
            this.clearCharacter();
         }
      },
      clearCharacter() {
         this.character = new Character();
      },
      loadSave() {
         this.importCharacter(this.save, 256);
      },
      applySave() {
         localStorage.character = this.save;
      },
      hasSave() {
         return this.isValid(this.save);
      },
      isValid(string) {
         return !!string && string !== "null";
      },
      longRest() {
         this.headerMessage.showSuccess("Персонаж успешно отдохнул");
         this.character.longRest();
      },
      closeHeader() {
         this.headerMessage.closeHeader();
      },
   },
   created() {
      this.attributeType = AttributeType;
      this.checkType = CheckType;
      this.encoder = new Encoder();
      this.save = localStorage.character;
      this.headerMessage = new HeaderMessageModel();
      this.loadSave();
   },
   components: {
      check: CheckComponent,
      "export-modal": ExportModalComponent,
      "import-modal": ImportModalComponent,
      "reload-modal": ReloadModalComponent,
      "save-modal": SaveModalComponent,
      "footer-menu": FooterMenuComponent,
      "header-message": HeaderMessageComponent,
      rest: RestComponent,
   },
};
</script>
