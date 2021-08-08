<template>
   <div
      class="btn loading-bar text-center text-success shadow-success border-success"
      @touchstart="start"
      @touchend="end"
      @mousedown="start"
      @mouseup="end"
      :style="'--percent:' + percent + '%'"
   >
      <div class="px-2"><i class="fas fa-bed pe-2"></i>Отдых</div>
   </div>
</template>

<script>
import FixedMessageModel from '@/models/fixed-message';
import Character from '@/models/character';

export default {
   name: 'rest',
   data() {
      return {
         percent: 0,
         toggled: false,
      };
   },
   props: {
      character: Character,
      headerMessage: FixedMessageModel,
   },
   methods: {
      longRest() {
         this.headerMessage.showSuccess('Персонаж успешно отдохнул');
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
