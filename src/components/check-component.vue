<template>
  <div class="check d-inline" v-on:click="!locked && clickable ?  check.inc() : ''">
    <div :class="color + ' ' + check.level()"></div>
    <span class="bonus px-1 text-center">
      {{ check.get(proficiency, bonus) }}
    </span>
    <span class="small">{{ check.name() }}</span>
  </div>
</template>

<script>
import Character from "../models/character";
import Check from "../models/check";

export default {
  name: "check-component",
  props: {
    check: Check,
    color: String,
    proficiency: {
      type: Number,
      default: 0,
    },
    bonus: Number,
    clickable: {
      type: Boolean,
      default: true,
    },
    locked: Boolean
  },
  methods: {
  }
};
</script>
