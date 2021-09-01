<template>
   <div class="check px-1 d-flex mt-1 align-items-center" v-on:click="!locked && clickable ? check.inc() : ''">
      <div :class="color + ' ' + check.level"></div>
      <span class="bonus px-1">
         {{ check.get(proficiency, attribute.bonus) }}
      </span>
      <div class="d-flex justify-content-between flex-grow-1">
         <span class="text-nowrap">
            {{ saving ? attribute.longName : check.name }}
         </span>
         <span class="small text-secondary" v-if="!saving">({{ attribute.name.toLowerCase() }})</span>
      </div>
   </div>
</template>

<script>
import Check from '../../models/check';
import { CheckType } from '../../data-layer/checks/check-type';
import Attribute from '@/models/attribute';

export default {
   name: 'check',
   props: {
      check: Check,
      attribute: Attribute,
      color: String,
      proficiency: {
         type: Number,
         default: 0,
      },
      clickable: {
         type: Boolean,
         default: true,
         checkType: { default: CheckType },
      },
      locked: Boolean,
   },
   created() {
      this.checkType = CheckType;
   },
   computed: {
      saving: function() {
         return this.check.type === CheckType.Saving;
      },
   },
};
</script>
