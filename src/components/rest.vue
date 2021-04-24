<template>
   <div class="btn loading-bar btn-sm text-center text-success border-success border-2" @touchstart="start" @touchend="end" :style="'--percent:' + percent + '%'">
      <i class="fas fa-bed"></i>
   </div>
   <span>Долгий отдых</span>
</template>

<script>
export default {
   name: "rest",
   data() {
      return {
         percent: 0,
         toggled: false,
      };
   },
   methods: {
      longRest() {
         this.$parent.longRest();
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
         console.log(this.percent);
         if (!this.toggled) {
            return;
         }
         if (this.percent == 100) {
            this.longRest();
            return;
         }
         this.percent += 10;
         setTimeout(this.timer, 100);
      },
   },
};
</script>
