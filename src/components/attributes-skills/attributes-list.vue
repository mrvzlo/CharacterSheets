<template>
   <div class="row justify-content-center mx-0">
      <div class="col-3 p-0 attributes d-flex flex-column justify-content-center">
         <div v-for="(attribute, index) in character.attributes" v-bind:key="attribute.name">
            <attribute :character="character" :attribute="attribute" :index="index"></attribute>
         </div>
      </div>
      <div class="col-9 ps-0 pe-2 d-flex flex-column justify-content-center">
         <div class="mt-2 position-relative py-2">
            <div class="mb-1 fw-bold text-center h5">
               {{ $t('saving_throws') }}
            </div>
            <div v-for="check in saving()" v-bind:key="check.id">
               <check
                  :check="check"
                  :proficiency="character.proficiency"
                  :attribute="getAttributeByCheck(check.id)"
                  :locked="character.settings.locked"
               ></check>
            </div>
         </div>
         <div class="mt-2 position-relative py-2 border-top">
            <div class="mb-1 fw-bold text-center h5">
               {{ $t('skills') }}
            </div>
            <div class="position-relative" v-for="check in skills()" v-bind:key="check.id">
               <check
                  :check="check"
                  :proficiency="character.proficiency"
                  :attribute="getAttributeByCheck(check.id)"
                  :locked="character.settings.locked"
               />
            </div>
         </div>
      </div>
      <div class="col-12 text-center">
         <div class="d-inline-flex m-2" data-bs-toggle="popover" :data-bs-content="$t('half_of_proficiency_description')">
            <div class="hex me-2" style="--color: 310deg">
               {{ character.proficiency >> 1 }}
            </div>
            {{ $t('half_of_proficiency') }}
            <button class="fas fa-question-circle p-0 mx-2 my-0 btn btn-outline"></button>
         </div>
      </div>
   </div>
</template>

<script>
import { AttributeType } from '@/data-layer/attributes/attribute-type';
import { CheckType } from '@/data-layer/checks/check-type';
import AttributeComponent from './attribute.vue';
import CheckComponent from './check.vue';
import Character from '@/models/character';
import OctagonComponent from '@/components/helpers/octagon.vue';
import BootstrapHelper from '@/helpers/bootstrap-helper';

export default {
   name: 'attributes-list',
   props: {
      character: Character,
      locked: Boolean,
   },
   data() {
      return {
         bones: 0,
         attributeType: { default: AttributeType }, //I dont give a **** why
         checkType: { default: CheckType },
      };
   },
   methods: {
      setData() {
         Object.assign(this.character, { healthBones: this.bones });
      },
      getData() {
         this.bones = this.character.healthBones;
      },
      saving() {
         return this.character.attributes.flatMap((x) => x.getChecks(CheckType.Saving));
      },
      skills() {
         return this.character.attributes.flatMap((x) => x.skillChecks).sort((a, b) => (a.name > b.name ? 1 : -1));
      },
      getAttributeByCheck(id) {
         const attributes = this.character.attributes.filter((x) => x.checks.map((y) => y.id).includes(id));
         return attributes[0];
      },
   },
   watch: {
      character() {
         this.getData();
      },
   },
   created() {
      this.attributeType = AttributeType;
      this.checkType = CheckType;
      this.getData();
   },
   mounted() {
      new BootstrapHelper().initTooltips();
   },
   components: {
      attribute: AttributeComponent,
      check: CheckComponent,
      octagon: OctagonComponent,
   },
};
</script>
