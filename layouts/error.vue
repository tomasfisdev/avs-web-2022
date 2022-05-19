<template>
  <div v-show="showErrorPage" class="container-error-page">
    <h2>Error {{ error.statusCode }}</h2>
    <p v-if="error.statusCode == 404">Esta página no existe</p>
    <p v-if="error.statusCode == 500">Ha habido un error</p>
    <NuxtLink class="button" to="/">Volver al inicio</NuxtLink>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showErrorPage: false
    }
  },
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    return {
      title: "Se ha producido un error"
    }
  },
  beforeMount() {
    //redireccion de viejas url de folletos
    let url = this.$route.path
    if (url.includes("/Folletos")) {
      window.location.href = `http://folletos.avs.com.ar${this.$route.path}`
    } else {
      this.showErrorPage = true
    }
  }
};
</script>

