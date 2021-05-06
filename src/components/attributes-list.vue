<template>
   <div class="col-12 col-md-6 px-0" v-for="(attribute, index) in character.attributes" v-bind:key="attribute.name">
      <div :class="'d-flex justify-content-between ' + (index > 0 ? 'border-top' : '')">
         <attribute-with-checks :character="character" :locked="locked" :attribute="attribute" :index="index"></attribute-with-checks>

         <div v-if="attribute.type == attributeType.Dexterity" class="d-flex flex-column justify-content-center small text-start px-2 px-lg-4">
            <dextrecity-derivatives :character="character" :locked="locked"></dextrecity-derivatives>
         </div>
         <div v-else-if="attribute.type == attributeType.Strength" class="small px-1 px-md-4 position-relative">
            <health :character="character" :locked="locked"></health>
         </div>
         <div v-else-if="attribute.type == attributeType.Constitution" class="small px-3 px-md-4 d-flex justify-content-center flex-column">
            <rest />
         </div>
         <div v-else></div>
      </div>
   </div>
</template>

<script>
import { AttributeType } from "../data-layer/attributes/attribute-type";
import HealthComponent from "./health.vue";
import AttributeWithChecksComponent from "./attribute-with-checks.vue";
import RestComponent from "./rest.vue";
import DextrecityDerivativesComponent from "./dextrecity-derivatives";
import HeaderMessageModel from "../models/header-message-model";
import Character from "../models/character";

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
      this.getData();
   },
   components: {
      attributeWithChecks: AttributeWithChecksComponent,
      rest: RestComponent,
      health: HealthComponent,
      dextrecityDerivatives: DextrecityDerivativesComponent,
   },
};
</script>
