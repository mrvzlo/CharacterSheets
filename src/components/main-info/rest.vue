<template>
   <div>Долгий отдых</div>
   <div
      class="btn loading-bar btn-sm text-center text-success border-success border-2"
      @touchstart="start"
      @touchend="end"
      @mousedown="start"
      @mouseup="end"
      :style="'--percent:' + percent + '%'"
   >
      <i class="fas fa-bed px-4"></i>
   </div>
</template>

<script>
import HeaderMessageModel from "@/models/header-message-model";
import Character from "@/models/character";

export default {
   name: "rest",
   data() {
      return {
         percent: 0,
         toggled: false,
      };
   },
   props: {
      character: Character,
      headerMessage: HeaderMessageModel,
   },
   methods: {
      longRest() {
         this.headerMessage.showSuccess("Персонаж успешно отдохнул");
         this.character.longRest();
         this.$parent.getData();
      },
      start() {
         this.toggled = true;
         this.timer();
      },
      end() {
         this.toggled = false;
         this.percent = 0;
      },
      timer() {
         if (!this.toggled) {
            return;
         }
         if (this.percent == 100) {
            this.longRest();
            return;
         }
         this.percent += 4;
         setTimeout(this.timer, 50);
      },
   },
};
</script>
