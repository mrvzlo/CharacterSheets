<template>
   <div class="col-3">
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
</template>

<script>
import { AttributeType } from "../../data-layer/attributes/attribute-type";
import { CheckType } from "../../data-layer/checks/check-type";
import AttributeComponent from "./attribute.vue";
import CheckComponent from "./check.vue";
import Character from "../../models/character";

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
   components: {
      attribute: AttributeComponent,
      check: CheckComponent,
   },
};
</script>
