<template>
   <div class="position-fixed bottom-0 end-0 w-100 d-flex justify-content-end">
      <transition name="fade-fast">
         <div class="border-0 text-right bg-white py-2" :id="'menu'" v-if="show">
            <div class="btn btn-success ms-2" data-bs-toggle="modal" data-bs-target="#saveModal">
               <i class="fas fa-fw fa-save"></i>
            </div>
            <div class="btn btn-danger ms-2" data-bs-toggle="modal" data-bs-target="#reloadModal">
               <i class="fas fa-fw fa-redo"></i>
            </div>
            <div class="btn btn-primary ms-2" data-bs-toggle="modal" data-bs-target="#importModal">
               <i class="fas fa-fw fa-download"></i>
            </div>
            <div class="btn btn-primary ms-2" data-bs-toggle="modal" data-bs-target="#exportModal">
               <i class="fas fa-fw fa-upload"></i>
            </div>
            <div class="btn btn-warning ms-2" v-on:click="lock">
               <i :class="'fas fa-fw ' + (locked ? 'fa-unlock' : 'fa-lock')"></i>
            </div>
         </div>
      </transition>
      <div class="m-2 bg-white" v-on:click="show = !show">
         <i class="fas fa-cog fa-2x fa-fw"></i>
      </div>
   </div>
   <export-modal :character="character"></export-modal>
   <save-modal :character="character"></save-modal>
   <import-modal />
   <reload-modal />
</template>

<script>
import Character from "../../models/character";
import ExportModalComponent from "./export-modal.vue";
import ImportModalComponent from "./import-modal.vue";
import ReloadModalComponent from "./reload-modal.vue";
import SaveModalComponent from "./save-modal.vue";

export default {
   name: "footer-menu",
   props: {
      locked: { type: Boolean },
      character: Character,
      save: { type: String },
   },
   data: function() {
      return {
         show: false,
      };
   },
   methods: {
      lock: function() {
         return this.$parent.lock();
      },
      importCharacter: function(a, b) {
         return this.$parent.importCharacter(a, b);
      },
      loadSave() {
         return this.$parent.loadSave();
      },
      applySave(newSave) {
         return this.$parent.applySave(newSave);
      },
      hasSave() {
         return this.$parent.hasSave();
      },
   },
   components: {
      exportModal: ExportModalComponent,
      importModal: ImportModalComponent,
      reloadModal: ReloadModalComponent,
      saveModal: SaveModalComponent,
   },
};
</script>
