<template>
   <div class="text-center d-flex">
      <div class="my-2 mx-auto">
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
         <div class="pt-3 pb-1 position-relative d-flex flex-column mt-n3 attribute" :style="'--oct-bg:rgb(' + attribute.color + ')'">
            <div></div>
            <div class="m-0 h1">{{ attribute.bonus > 0 ? '+' + attribute.bonus : attribute.bonus }}</div>
            <div class="text-uppercase">
               {{ $t(`abilities.${attribute.type + 1}`) }}
            </div>
            <octagon />
         </div>
      </div>
   </div>
</template>

<script>
import Character from '@/models/character';
import Attribute from '@/models/attribute';
import OctagonComponent from '@/components/helpers/octagon.vue';

export default {
   name: 'attribute-with-checks',
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
