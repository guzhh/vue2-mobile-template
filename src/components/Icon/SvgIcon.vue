<template>
  <svg className="svg-icon" aria-hidden="true">
    <use :xlink:href="`#icon-${name}`"/>
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    name: { // svg文件名称
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
