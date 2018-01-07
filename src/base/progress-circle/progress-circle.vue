<template>
    <div class="progress-circle">
      <svg width="32" height="32" viewBox="0 0 100 100">
        <circle class="progress-background" cx="50" cy="50" r="50" fill="transparent"></circle>
        <circle class="progress-bar" cx="50" cy="50" r="50" fill="transparent" :stroke-dasharray='dashArray' :stroke-dashoffset="dashOffset"></circle>
      </svg>
      <slot></slot>
    </div>
</template>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-circle
    position: relative
    circle
      stroke-width: 8px
      transform-origin: center
      &.progress-background
        transform: scale(0.9)
        stroke: $color-theme-d
      &.progress-bar
        transform: scale(0.9) rotate(-90deg)
        stroke: $color-theme
</style>
<script>
    export default {
      props: {
        percent: 0,
        radius: 100
      },
        data() {
            return {
              dashArray: Math.PI * 100
            }
        },
      computed: {
        dashOffset() {
          return (1 - this.percent) * this.dashArray;
        }
      }
    }
</script>
