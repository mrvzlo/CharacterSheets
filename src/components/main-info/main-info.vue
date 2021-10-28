<template>
   <div class="d-flex flex-column">
      <div class="row mx-1 text-center lh-initial">
         <div class="px-1 col-12 col-md-6 col-lg-5">
            <div class="border-bottom my-3 mx-1">
               <input v-model="editModel.name" class="plain w-100 px-2 h4 m-0 text-center" :placeholder="$t('character_name')" :disabled="locked" />
            </div>
         </div>
         <div class="p-1 mb-1 col-4 col-md-3 dropdown">
            <a class="text-decoration-none text-reset d-block" data-bs-toggle="dropdown">
               {{ editModel.class.chosen ? $t(`character_classes.${editModel.class.type}`) : $t('pick_class') }}
            </a>
            <ul class="dropdown-menu" v-if="!locked">
               <a class="dropdown-item" v-for="x in classesCount()" v-bind:key="x" v-on:click="setClass(x)">
                  {{ $t(`character_classes.${x}`) }}
               </a>
            </ul>
            <div class="text-secondary small border-top mx-1">{{ $t('character_class') }}</div>
         </div>
         <div class="p-1 mb-1 col-5 col-md-4">
            <input v-model="editModel.race" class="plain w-100 text-center" :disabled="locked" />
            <div class="text-secondary small border-top mx-1">{{ $t('character_race') }}</div>
         </div>
         <div class="p-1 mb-1 col-3 col-md-3 col-lg-2">
            <input v-model="editModel.level" class="plain w-100 text-center" type="number" min="1" max="20" :disabled="locked" />
            <div class="text-secondary small border-top mx-1">{{ $t('character_level') }}</div>
         </div>
         <div class="p-1 mb-1 col-6 col-md-3 dropdown">
            <a class="text-decoration-none text-reset d-block" data-bs-toggle="dropdown">
               {{ $t(`character_sizes.${editModel.size}`) }}
            </a>
            <ul class="dropdown-menu" v-if="!locked">
               <a class="dropdown-item" v-for="(_, index) in 5" v-bind:key="index" v-on:click="setSize(index)">
                  {{ $t(`character_sizes.${index}`) }}
               </a>
            </ul>
            <div class="text-secondary small border-top mx-1">{{ $t('character_size') }}</div>
         </div>
         <div class="p-1 mb-1 col-6 col-md-3 dropdown">
            <a class="text-decoration-none text-reset d-block" data-bs-toggle="dropdown">
               {{ $t(`character_alignments.${editModel.alignment}`) }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end" v-if="!locked">
               <a class="dropdown-item" v-for="(_, index) in 9" v-bind:key="index" v-on:click="setAlignment(index)">
                  {{ $t(`character_alignments.${index}`) }}
               </a>
            </ul>
            <div class="text-secondary small border-top mx-1">
               {{ $t('character_alignment') }}
            </div>
         </div>
      </div>
      <div class="row mx-1">
         <div class="col-6 px-1 text-center">
            <div class="my-2 lh-initial">
               {{ $t('character_inspiration') }}
               <div class="d-flex px-1 justify-content-center small">
                  <div class="mx-2">
                     <div class="hex m-auto d-block" style="--color: 250deg" v-on:click="toggleInspiration">
                        <span v-if="editModel.masterInspiration" class="fas fa-check"></span>
                     </div>
                     <div class="text-secondary">{{ $t('character_inspiration_master') }}</div>
                  </div>
                  <div class="px-2 mx-2">
                     <select v-model="editModel.bardInspiration" class="block plain d-block" style="--color: 250deg">
                        <option value="0"></option>
                        <option value="6">d6</option>
                        <option value="8">d8</option>
                        <option value="10">d10</option>
                        <option value="12">d12</option>
                     </select>
                     <div class="text-secondary">{{ $t('character_inspiration_bardic') }}</div>
                  </div>
               </div>
            </div>
            <div class="text-start mx-auto d-inline-block">
               <div class="d-inline-flex p-1">
                  <div class="hex me-2 text-center" style="--color: 300deg">
                     {{ character.proficiency }}
                  </div>
                  {{ $t('proficiency') }}
               </div>
               <br />
               <derivatives :character="character" />
            </div>
         </div>
         <div class="px-1 col-6 d-flex flex-column justify-content-end">
            <health :character="character" />
            <health-bones :character="character" />
         </div>
      </div>
      <div class="m-2 mb-0 px-1">
         <div class="border-top"></div>
      </div>

      <countable-list :character="character" />
   </div>
</template>

<script>
import Character from '@/models/character';
import { ClassType } from '@/data-layer/classes/class-type';
import DerivativesComponent from './derivatives.vue';
import HealthComponent from './health.vue';
import HealthBonesComponent from './health-bones.vue';
import OctagonComponent from '@/components/helpers/octagon.vue';
import CountableListComponent from './countable-list.vue';

export default {
   name: 'top-info',
   props: {
      character: Character,
   },
   data() {
      return {
         editModel: Character,
      };
   },
   methods: {
      classesCount() {
         return Object.keys(ClassType).length / 2 - 1;
      },
      setData() {
         Object.assign(this.character, { race: this.editModel.race });
         Object.assign(this.character, { name: this.editModel.name });
         Object.assign(this.character, { size: this.editModel.size });
         Object.assign(this.character, { story: this.editModel.story });
         Object.assign(this.character, { level: this.editModel.level });
         Object.assign(this.character, { alignment: this.editModel.alignment });
         Object.assign(this.character, { class: this.editModel.class });
         Object.assign(this.character, { masterInspiration: this.editModel.masterInspiration });
         Object.assign(this.character, { bardInspiration: this.editModel.bardInspiration });
      },
      getData() {
         this.editModel = this.character;
      },
      toggleInspiration() {
         this.editModel.masterInspiration = !this.editModel.masterInspiration;
      },
      longRest() {
         this.$parent.longRest();
      },
      setClass(id) {
         this.editModel.class.type = id;
         this.showClasses = false;
      },
      setSize(id) {
         this.editModel.size = id;
         this.showSizes = false;
      },
      setAlignment(id) {
         this.editModel.alignment = id;
         this.showAlignments = false;
      },
   },
   computed: {
      locked: function() {
         return this.character.settings.locked;
      },
   },
   watch: {
      character: {
         handler() {
            this.getData();
         },
         deep: true,
         immediate: true,
      },
      editModel: {
         handler() {
            this.setData();
         },
         deep: true,
      },
   },
   components: {
      derivatives: DerivativesComponent,
      health: HealthComponent,
      healthBones: HealthBonesComponent,
      octagon: OctagonComponent,
      countableList: CountableListComponent,
   },
};
</script>
