<template>
  <div
    v-if="isVisible"
    class="
      fixed
      z-20
      inset-0
      bg-black bg-opacity-50 bg-scroll
      h-full
      flex
      items-center
      justify-center
    "
  >
    <!--modal mask-->
    <div
      class="
        relative
        w-fit
        max-h-full
        overflow-y-auto
        bg-gray-100
        shadow-lg
        rounded-lg
        border border-black
      "
    >
      <!--modal wrapper-->

      <div class="px-3 pt-3 flex flex-col justify-between">
        <!--modal cointainer-->
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Overlay",
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
};
</script>