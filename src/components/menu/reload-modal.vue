<template>
   <div class="modal fade" id="reloadModal">
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-header text-center">
               <h5 class="modal-title">Загрузить персонажа</h5>
            </div>
            <div class="modal-body py-0">
               <div class="my-3 d-flex rounded position-relative">
                  <div
                     :class="'rounded border p-1 text-center w-100 ' + (selected == appConfig.clearSave ? 'bg-primary text-white' : '')"
                     v-on:click="select(appConfig.clearSave)"
                  >
                     Новый персонаж
                  </div>
               </div>
               <div v-for="(_, index) in appConfig.saveSlots + 1" :key="index" class="mb-3 d-flex rounded-row">
                  <div class="border bg-primary text-light px-2 py-1">{{ index == 0 ? "Авто" : index }}</div>
                  <div
                     :class="'border py-1 px-2 flex-grow-1 border-start-0 ' + (index == selected ? 'bg-primary text-white' : '')"
                     v-on:click="select(index)"
                  >
                     {{ savedName(index) }} <span class="float-end text-secondary">{{ savedDate(index) }}</span>
                  </div>
               </div>
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-danger" data-bs-dismiss="modal" v-on:click="load" v-if="hasSave(selected)">
                  Загрузить
               </button>
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" v-on:click="selected = appConfig.unselectedSave">
                  Закрыть
               </button>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import SaveService from "@/models/saving/save-service";
import AppConfig from "@/app-config";

export default {
   name: "reload-modal",
   props: {
      saveService: SaveService,
   },
   data() {
      return {
         importData: "",
         selected: Number,
         appConfig: AppConfig,
      };
   },
   methods: {
      select: function(num) {
         if (this.hasSave(num)) {
            this.selected = this.selected == num ? this.appConfig.unselectedSave : num;
         }
      },
      hasSave: function(id) {
         return id == this.appConfig.clearSave || this.saveService.hasSave(id);
      },
      load: function() {
         if (this.selected == 10) {
            return this.clearSave();
         }
         this.saveService.getSaveData(this.selected).then((data) => {
            this.$parent.importCharacter(data, 256);
         });
         this.selected = this.appConfig.unselectedSave;
      },
      clearSave: function() {
         this.$parent.importCharacter();
      },
      savedName: function(id) {
         return this.saveService.savedName(id);
      },
      savedDate: function(id) {
         return this.saveService.dateFormat(id);
      },
   },
   created() {
      this.appConfig = new AppConfig();
      this.selected = this.appConfig.unselectedSave;
   },
   computed: {
      autoSave() {
         return 0;
      },
   },
};
</script>
