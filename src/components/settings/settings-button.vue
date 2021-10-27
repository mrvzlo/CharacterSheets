<template>
   <div class="btn-group d-block mb-4">
      <div class="btn btn-primary">
         <i :class="'fa-fw ' + icon"></i>
      </div>
      <div class="btn btn-outline border-primary col-6">{{ text }}</div>
      <div class="btn btn-primary"><i class="fa-fw fas">&nbsp;</i></div>
   </div>
</template>

<script>
export default {
   name: 'settings-button',
   props: {
      icon: String,
      text: String,
   },
};
</script>
