<template>
   <div class="col-3">
      <div v-for="(attribute, index) in character.attributes" v-bind:key="attribute.name">
         <attribute :character="character" :locked="locked" :attribute="attribute" :index="index"></attribute>
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
               :style="check.type == checkType.Saving ? 'background-color: #' + attribute.color : ''"
            >
               <check :check="check" :proficiency="character.proficiency" :bonus="attribute.bonus" :locked="locked"></check>
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
import HeaderMessageModel from "../../models/header-message-model";
import Character from "../../models/character";

export default {
   name: "attributes-list",
   props: {
      character: Character,
      headerMessage: HeaderMessageModel,
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
      longRest() {
         this.headerMessage.showSuccess("Персонаж успешно отдохнул");
         this.character.longRest();
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
