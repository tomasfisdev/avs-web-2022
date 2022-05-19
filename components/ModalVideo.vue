<template>
  <div class="modal">
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
    <div class="container-iframe-modal">
      <LoaderIframe v-if="loadingIframeYt" />
      <div class="container-iframe">
        <iframe
          @load="loadingIframeYt = false"
          :src="
            'https://www.youtube.com/embed/' + this.ytLink.replace(/.*=/, '')
          "
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["ytLink", "modalYt"],
  data() {
    return {
      loadingIframeYt: true,
    };
  },
  mounted() {
    document.body.classList.add("open-modal");
  },
  destroyed() {
    document.body.classList.remove("open-modal");
  },
};
</script>