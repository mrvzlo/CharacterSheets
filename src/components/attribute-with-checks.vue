<template>
   <div class="d-flex">
      <div class="my-4 px-2">
         <div class="hex gray">
            <input v-model="attributeValue" class="plain w-100" type="number" min="1" max="20" :disabled="locked" @change="setData" />
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
            <check :check="check" :proficiency="character.proficiency" :bonus="attribute.bonus" :color="'text-warning'" :locked="locked"></check>
         </div>
         <div v-for="check in attribute.skillChecks" v-bind:key="check.name">
            <check :check="check" :proficiency="character.proficiency" :bonus="attribute.bonus" :locked="locked"></check>
         </div>
         <div v-if="attribute.type == attributeType.Constitution">
            <health-bones :character="character" :locked="locked"></health-bones>
         </div>
      </div>
   </div>
</template>

<script>
import Character from "../models/character";
import CheckComponent from "./check.vue";
import Attribute from "../models/attribute";
import { AttributeType } from "../data-layer/attributes/attribute-type";
import { CheckType } from "../data-layer/checks/check-type";
import HealthBonesComponent from "./health-bones.vue";

export default {
   name: "attribute-with-checks",
   props: {
      character: Character,
      attribute: Attribute,
      locked: Boolean,
      index: Number,
   },
   data() {
      return {
         attributeValue: 0,
         attributeType: { default: AttributeType },
         checkType: { default: CheckType },
      };
   },
   methods: {
      setData() {
         Object.assign(this.character.attributes[this.index], { value: this.attributeValue });
      },
      getData() {
         this.attributeValue = this.attribute.value;
      },
      getColor(index) {
         return 100 * index * index;
      },
   },
   watch: {
      character() {
         this.getData();
      },
   },
   created() {
      this.getData();
      this.checkType = CheckType;
      this.attributeType = AttributeType;
   },
   components: {
      check: CheckComponent,
      healthBones: HealthBonesComponent,
   },
};
</script>
