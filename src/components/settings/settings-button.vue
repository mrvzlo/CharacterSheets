<template>
   <div class="btn-group d-block mb-2 mt-1">
      <div :class="'btn btn-' + color">
         <i :class="'icon ' + icon"></i>
      </div>
      <div :class="'col-6 btn btn-outline border-' + color">{{ text }}</div>
      <div :class="'btn btn-' + color"><i class="icon"></i></div>
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
