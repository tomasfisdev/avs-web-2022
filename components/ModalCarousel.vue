<template>
  <div class="modal container-modal-carousel">
    <div @click="$emit('close')" class="modal-background-close"></div>
    <button title="Cerrar" class="button-icon cerrar" @click="$emit('close')">
      Cerrar
      <i>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi bi-x"
          viewBox="0 0 16 16"
        >
          <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </i>
    </button>
    <div class="container">
      <carousel
        class="modal-carousel"
        :perPage="1"
        :paginationColor="
          isShow ? 'rgb(239 239 239 / 47%)' : 'rgb(237 223 223)'
        "
        :paginationActiveColor="isShow ? '#ffffff' : '#007BFF'"
        navigationEnabled
        navigationNextLabel="<div class='next'></div>"
        navigationPrevLabel="<div class='prev'></div>"
        loop
        :navigateTo="[currentImgIndex, false]"
      >
        <slide :title="`Imágen ${index + 1}`" v-for="(img, index) in item.imgs" :key="index">
          <nuxt-img
            sizes="xl:100vw lg:100vw md:100vw sm:100vw xs:100vw"
            v-if="isShow"
            :src="img"
            :alt="`${item.nombre} ${item.ubicacion} ${item.ano}`"
          />
          <nuxt-img
            sizes="xl:100vw lg:100vw md:100vw sm:100vw xs:100vw"
            v-if="!isShow"
            :src="img"
            :alt="
              item.slug
                .replace(/-/g, ' ')
                .replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })
            "
          />
        </slide>
      </carousel>
    </div>
  </div>
</template>

<script>
import Carousel from 'vue-carousel/src/Carousel.vue'
import Slide from 'vue-carousel/src/Slide.vue'
export default {
  components: {
    Carousel,
    Slide,
  },
  props: ["item", "currentImgIndex", "isShow"],
  mounted() {
    document.body.classList.add("open-modal");
  },
  destroyed() {
    document.body.classList.remove("open-modal");
  },
};
</script>
