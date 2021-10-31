<template>
   <div class="btn-group d-block mb-4">
      <div :class="'btn btn-' + color">
         <i :class="'fa-fw ' + icon"></i>
      </div>
      <div :class="'col-6 btn btn-outline border-' + color">{{ text }}</div>
      <div :class="'btn btn-' + color"><i class="fa-fw fas">&nbsp;</i></div>
   </div>
</template>

<script>
export default {
   name: 'settings-button',
   props: {
      icon: String,
      text: String,
      color: { type: String, default: 'primary' },
   },
};
</script>
