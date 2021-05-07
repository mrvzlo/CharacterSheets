<template>
   <div class="d-flex">
      <div class="my-2 mx-auto">
         <div class="hex gray">
            <input v-model="attributeValue" class="plain w-100" type="number" min="1" max="20" :disabled="locked" @change="setData" />
         </div>
         <div class="border pt-3 pb-1 rounded-4 d-flex flex-column mt-n3 attribute" :style="'background-color: #' + attribute.color">
            <div></div>
            <h1 class="m-0">{{ attribute.bonus }}</h1>
            {{ attribute.name }}
         </div>
      </div>
   </div>
</template>

<script>
import Character from "../../models/character";
import Attribute from "../../models/attribute";

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
      };
   },
   methods: {
      setData() {
         Object.assign(this.character.attributes[this.index], { value: this.attributeValue });
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
};
</script>
