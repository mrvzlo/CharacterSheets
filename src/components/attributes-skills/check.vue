<template>
   <div class="check px-1 d-flex mt-1 align-items-center" :disabled="locked" v-on:click="!locked ? check.inc() : ''">
      <div :class="color + ' ' + check.level"></div>
      <span class="bonus px-1">
         {{ check.get(proficiency, attribute.bonus) }}
      </span>
      <div class="d-flex justify-content-between flex-grow-1">
         <span class="text-nowrap">
            {{ saving ? $t(`abilities_long.${attribute.type + 1}`) : check.name }}
         </span>
         <span class="small text-secondary text-lowercase" v-if="!saving">({{ $t(`abilities.${attribute.type + 1}`) }})</span>
      </div>
   </div>
</template>

<script>
import Check from '@/models/check';
import { CheckType } from '@/data-layer/checks/check-type';
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
