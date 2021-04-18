<template>
  <div class="text-center row mx-0">
    <div class="col-12">
      <div class="alert alert-secondary">
        <input v-model="character.name" class="plain w-100 border-bottom py-2" placeholder="Имя персонажа" :disabled="locked" />
      </div>
    </div>
    <div class="col-3">
      <div class="alert alert-warning">
        <input v-model="character.level" class="plain w-100 border-bottom" type="number" min="1" max="20" :disabled="locked" />
        <div class="small text-secondary">Уровень</div>
      </div>
    </div>
    <div class="col-5">
      <div class="alert alert-warning">
        <input v-model="character.race" class="plain w-100 border-bottom" :disabled="locked" />
        <div class="small text-secondary">Раса</div>
      </div>
    </div>
    <div class="col-4">
      <div class="alert alert-warning">
        <input v-model="character.class" class="plain w-100 border-bottom" :disabled="locked" />
        <div class="small text-secondary">Класс</div>
      </div>
    </div>
    <div class="col-9"></div>
    <div class="col-6 text-start">
      <div class="d-flex mb-2">
        <div class="hex me-2" style="--color: 250deg" v-on:click="inspiration">
          <span v-if="character.inspiration" class="fas fa-check"></span>
        </div>
        Вдохновение
      </div>
      <div class="d-flex mb-2">
        <div class="hex me-2" style="--color: 300deg">
          {{ character.proficiency() }}
        </div>
        Мастерство
      </div>
    </div>
    <div class="col-6 text-start">
      <div class="d-flex mb-2">
        <div class="hex me-2" style="--color: 40deg">
          <input v-model="character.armor" class="plain w-100" type="number" :disabled="locked" />
        </div>
        Класс брони
      </div>
      <div class="d-flex mb-2">
        <div class="hex me-2" style="--color: 150deg">
          <input v-model="character.speed" class="plain w-100" type="number" :disabled="locked" />
        </div>
        Скорость
      </div>
    </div>
    <div class="col-12" v-for="attribute in character.attributes" v-bind:key="attribute.name">
      <div class="row mb-1 py-1 border-top">
        <div class="col-3 my-3">
          <div class="hex gray">
            <input v-model="attribute.value" class="plain w-100" type="number" min="1" max="20" :disabled="locked" />
          </div>
          <div class="border pt-3 pb-1 rounded-4 d-flex flex-column mt-n3">
            <div></div>
            <h1 class="m-0">{{ attribute.bonus() }}</h1>
            {{ attribute.name }}
          </div>
          <div v-if="attribute.name == 'МУД'" class="small">Пассив {{ 10 + attribute.bonus() }}</div>
        </div>
        <div class="text-start col-9 p-0 d-flex flex-column justify-content-center">
          <div v-for="check in attribute.getChecks(checkTypes.Saving)" v-bind:key="check.name">
            <check-component :check="check" :proficiency="character.proficiency()" :bonus="attribute.bonus()" 
            :color="'text-warning'" :locked="locked"></check-component>
          </div>
          <div class="check" v-for="check in attribute.getChecks(checkTypes.Static)" v-bind:key="check.name">
            <check-component :check="check" :clickable="false" :bonus="attribute.bonus()" 
            :color="'text-success'" :locked="locked"></check-component>
          </div>
          <div v-for="check in attribute.getChecks(checkTypes.Skill)" v-bind:key="check.name">
            <check-component :check="check" :proficiency="character.proficiency()" 
            :bonus="attribute.bonus()" :locked="locked"></check-component>
          </div>
          <div v-if="attribute.name == 'ТЕЛ'" class="small my-2 border p-1 bones rounded">
            Кость здоровья
            <select v-model="character.healthBoneValue" class="plain float-end fw-bold" :disabled="locked">
              <option value="6">Д6</option>
              <option value="8">Д8</option>
              <option value="10">Д10</option>
              <option value="12">Д12</option>
            </select>
            <div class="d-flex justify-content-center">
              <input v-model="character.healthBones" class="plain w-25" type="number" min="0" :max="character.healthBonesMax" :disabled="locked" />
              <span>/</span>
              <input v-model="character.healthBonesMax" class="plain w-25" type="number" min="1" max="20" :disabled="locked" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="position-fixed bottom-0 end-0 mx-2 d-flex">
    <div class="border-0 collapse" :id="'menu'">
      <div class="btn btn-primary me-1" data-bs-toggle="modal" data-bs-target="#importModal">
        <i class="fas fa-fw fa-upload"></i>
      </div>
      <div class="btn btn-primary me-1" data-bs-toggle="modal" data-bs-target="#exportModal">
        <i class="fas fa-fw fa-download"></i>
      </div>
      <div class="btn btn-secondary me-1">
        <i class="fas fa-fw fa-save"></i>
      </div>
      <div class="btn btn-secondary me-1">
        <i class="fas fa-fw fa-redo"></i>
      </div>
      <div class="btn btn-warning me-2" v-on:click="lock">
        <i :class="'fas fa-fw ' + (locked ? 'fa-unlock' : 'fa-lock')"></i>
      </div>
    </div>
    <div class="mb-2" data-bs-toggle="collapse" href="#menu">
      <i class="fas fa-cog fa-2x"></i>
    </div>
  </div>

  <div class="modal fade" id="exportModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Export string</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          {{ character.export() }}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">
            Copy
          </button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="importModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Import string</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <input v-model="importData" class="form-control" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" v-on:click="importStr">
            Import
          </button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Character from "../models/character";
import CheckTypes from "../models/enums/check-types";
import CheckComponent from "./check-component.vue";

export default {
  name: "character-component",
  data() {
    return {
      locked: false,
      character: Character,
      checkTypes: CheckTypes,
      importData: "",
    };
  },
  methods: {
    lock: function() {
      this.locked = !this.locked;
    },
    inspiration: function() {
      this.character.inspiration = !this.character.inspiration;
    },
    importStr: function() {
      this.character = this.character.import(this.importData);
    },
    copy: function() {},
  },
  created() {
    this.character = new Character();
    this.checkTypes = new CheckTypes();
  },
  components: {
    'check-component': CheckComponent,
  },
};
</script>
