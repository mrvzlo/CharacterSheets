<template>
   <div class="octagon d-flex flex-column">
      <div class="d-flex">
         <div class="l t"></div>
         <div class="flex-grow-1 t"></div>
         <div class="r t"></div>
      </div>
      <div class="flex-grow-1 d-flex c"></div>
      <div class="d-flex">
         <div class="l b"></div>
         <div class="flex-grow-1 b"></div>
         <div class="r b"></div>
      </div>
   </div>
</template>

<script>
export default {
   name: "octagon",
   props: {
      color: String,
   },
};
</script>
