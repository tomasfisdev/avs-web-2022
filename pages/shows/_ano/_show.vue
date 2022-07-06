<template>
  <div>
    <LoaderShow v-if="$fetchState.pending || !dataExists" />
    <div class="show" v-if="!$fetchState.pending && dataExists">
      <ModalVideo
        v-if="modalYt"
        :ytLink="show.ytLink"
        @close="modalYt = false"
      />
      <ModalCarousel
        :isShow="true"
        @close="modalCarousel = false"
        class="modal"
        v-if="modalCarousel"
        :item="show"
        :currentImgIndex="currentImgIndex"
      />
      <section
        class="banner-home"
        :style="`background: url('${this.show.portada}') no-repeat center center`"
      >
        <div class="banner-shadow"></div>
        <div class="container">
          <router-link
            :to="'/shows/' + this.$route.params.ano"
            :title="'Volver atrás'"
            class="btn-back button-icon"
          >
            <i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
            </i>
            Volver
          </router-link>
          <button
            class="button-icon"
            @click="modalYt = true"
            v-if="show.ytLink != ''"
            title="Ver video"
          >
            <i class="yt-icono"></i>
          </button>
          <div class="hero-text">
            <h2 v-if="show.nombre">{{ show.nombre }}</h2>
            <p v-if="show.ubicacion">{{ show.ubicacion }}</p>
            <p v-if="show.ano">{{ show.ano }}</p>
          </div>
        </div>
      </section>
      <section class="galeria">
        <div class="titulo container">
          <h2>Galería</h2>
        </div>
        <ul v-if="show.imgs" class="container">
          <GalleryImg
            @MostrarCarousel="MostrarCarousel(index)"
            :show="show"
            :img="img"
            v-for="(img, index) in show.imgs"
            :key="index"
          />
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import { db } from "~/plugins/firebase.js";
import { collection, query, getDocs, where } from "firebase/firestore";

export default {
  head() {
    return {
      title: `${this.show.nombre} | Shows y Eventos`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${this.show.nombre} ${this.show.ano} ${this.show.ubicacion}`,
        },
      ],
    };
  },
  data() {
    return {
      dataExists: true,
      loadingImg: true,
      modalYt: false,
      modalCarousel: false,
      currentImgIndex: 0,
      show: {
        nombre: "",
        ano: null,
        slug: "",
        portada: "",
        imgs: [],
        ubicacion: "",
        descripcion: "",
        ytLink: "",
      },
    };
  },
  methods: {
    LoadedImg() {
      this.loadingImg = false;
    },
    MostrarCarousel(index) {
      this.modalCarousel = true;
      this.currentImgIndex = index;
    },
  },
  mounted() {
    if (this.dataExists == false) {
      this.$nuxt.error({ statusCode: 404 });
    }
  },
  async fetch() {
    //query de shows
    const queryShow = query(
      collection(db, "shows"),
      where("slug", "==", this.$route.params.show),
      where("ano", "==", parseInt(this.$route.params.ano))
    );
    const querySnapshotShow = await getDocs(queryShow);
    if (querySnapshotShow.empty) {
      this.dataExists = false;
    }
    querySnapshotShow.forEach((doc) => {
      this.show = doc.data();
    });
  },
};
</script>