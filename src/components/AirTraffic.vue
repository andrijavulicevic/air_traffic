<template>
  <div>Main component</div>
</template>

<script>
export default {
  mounted () {
    this.$getLocation({
      enableHighAccuracy: false,
      timeout: Infinity,
      maximumAge: 0
    })
      .then(coordinates => {
        console.log(coordinates)
      })
  }
}
</script>
