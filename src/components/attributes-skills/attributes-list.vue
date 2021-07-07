<template>
   <div class="col-3 px-1">
      <div v-for="(attribute, index) in character.attributes" v-bind:key="attribute.name">
         <attribute :character="character" :attribute="attribute" :index="index"></attribute>
      </div>
   </div>
   <div class="col-9 px-0 d-flex flex-column justify-content-center">
      <div class="m-1 border">
         <div
            :class="'text-start position-relative ' + (index > 0 ? 'border-top' : '')"
            v-for="(attribute, index) in character.attributes"
            v-bind:key="attribute.name"
         >
            <div
               class="p-small"
               v-for="check in attribute.checks"
               v-bind:key="check.name"
               :style="check.type == checkType.Saving ? `background-color: rgba(${attribute.color},.3)` : ''"
            >
               <check :check="check" :proficiency="character.proficiency" :bonus="attribute.bonus" :locked="character.settings.locked"></check>
            </div>
         </div>
      </div>
   </div>
   <div class="col-12 text-center">
      <div
         class="d-inline-flex m-1"
         data-bs-toggle="popover"
         data-bs-placement="top"
         data-bs-content="Бонус добавляется, начиная с 2 уровня барда или с 7 уровня воина чемпиона, к проверкам навыков характеристик, указанных в правилах"
      >
         <div class="hex me-2" style="--color: 10deg">
            {{ character.proficiency >> 1 }}
         </div>
         Половинный бонус
         <button class="fas fa-question-circle p-0 mx-2 my-0 btn"></button>
      </div>
   </div>
</template>

<script>
import { AttributeType } from "../../data-layer/attributes/attribute-type";
import { CheckType } from "../../data-layer/checks/check-type";
import AttributeComponent from "./attribute.vue";
import CheckComponent from "./check.vue";
import Character from "../../models/character";
import { Popover } from "bootstrap";

export default {
   name: "attributes-list",
   props: {
      character: Character,
      locked: Boolean,
   },
   data() {
      return {
         bones: 0,
         attributeType: { default: AttributeType }, //I dont give a **** why
         checkType: { default: CheckType },
      };
   },
   methods: {
      setData() {
         Object.assign(this.character, { healthBones: this.bones });
      },
      getData() {
         this.bones = this.character.healthBones;
      },
   },
   watch: {
      character() {
         this.getData();
      },
   },
   created() {
      this.attributeType = AttributeType;
      this.checkType = CheckType;
      this.getData();
   },
   mounted() {
      [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')).map(function(e) {
         return new Popover(e, { placement: "top", trigger: "focus" });
      });
   },
   components: {
      attribute: AttributeComponent,
      check: CheckComponent,
   },
};
</script>
