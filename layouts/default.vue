<template>
  <div>
    <Nav />
    <Nuxt keep-alive />
    <WppBtn />
    <Footer />
  </div>
</template>
<script>
export default {
  mounted() {
    console.log("DESARROLLADO POR TOMÁS FIS (LinkedIn: www.linkedin.com/in/tomas-fis)");
  },
}
</script>
 