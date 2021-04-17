<template>
  <div class="check d-inline" v-on:click="locked ? '' : check.inc()">
    <div :class="'text-info ' + check.level()"></div>
    <span class="bonus px-1 text-center">
      {{ check.get(proficiency, bonus) }}
    </span>
    <span class="small">{{ check.name }}</span>
  </div>
</template>

<script>
import Character from "../models/character";
import CheckTypes from "../models/check-types";
import Check from "../models/check";

export default {
  name: "check-component",
  props: {
    check: Check,
    proficiency: Number,
    bonus: Number
  },
  methods: {
  }
};
</script>
