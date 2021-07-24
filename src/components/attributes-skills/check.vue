<template>
   <div class="check px-2 d-inline" v-on:click="!locked && clickable ? check.inc() : ''">
      <div :class="color + ' ' + check.level"></div>
      <span class="bonus px-1">
         {{ check.get(proficiency, attribute.bonus) }}
      </span>
      <span>
         {{ check.type === checkType.Saving ? attribute.longName : check.name }}
         <span v-if="check.type == checkType.Perception" class="fw-bold small"> ({{ 10 + check.get(proficiency, attribute.bonus) }})</span>
      </span>
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
};
</script>
