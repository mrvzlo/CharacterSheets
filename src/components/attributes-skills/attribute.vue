<template>
   <div class="d-flex">
      <div class="my-2 mx-auto text-white">
         <div class="hex gray">
            <input
               v-model="attributeValue"
               class="plain w-100"
               type="number"
               min="1"
               max="20"
               :disabled="character.settings.locked"
               @change="setData"
            />
         </div>
         <div class="pt-3 pb-1 position-relative d-flex flex-column mt-n3 attribute" :style="`--oct-bg: rgba(${attribute.color})`">
            <div></div>
            <h1 class="m-0">{{ attribute.bonus }}</h1>
            {{ attribute.name }}
            <octagon />
         </div>
      </div>
   </div>
</template>

<script>
import Character from "../../models/character";
import Attribute from "../../models/attribute";
import OctagonComponent from "@/components/helpers/octagon.vue";

export default {
   name: "attribute-with-checks",
   props: {
      character: Character,
      attribute: Attribute,
      index: Number,
   },
   data() {
      return {
         attributeValue: 0,
      };
   },
   methods: {
      setData() {
         Object.assign(this.attribute, { value: this.attributeValue });
      },
      getData() {
         this.attributeValue = this.attribute.value;
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
   components: {
      octagon: OctagonComponent,
   },
};
</script>
