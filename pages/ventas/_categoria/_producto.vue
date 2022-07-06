<template>
  <div>
    <LoaderProducto v-if="$fetchState.pending || !dataExists" />
    <div v-if="!$fetchState.pending && dataExists">
      <div class="modales">
        <ModalVideo
          v-if="modalYt"
          :ytLink="producto.ytLink"
          @close="modalYt = false"
        />
        <ModalCarousel
          @close="modalCarousel = false"
          class="modal"
          v-if="modalCarousel"
          :item="producto"
          :currentImgIndex="currentImgIndex"
        />
      </div>
      <section class="container producto">
        <div class="img-cont">
          <carousel
            :perPage="1"
            loop
            navigationEnabled
            paginationEnabled
            paginationColor="rgb(237 223 223)"
            paginationActiveColor="#007BFF"
            navigationNextLabel="<div class='next'></div>"
            navigationPrevLabel="<div class='prev'></div>"
          >
            <slide
              :title="`Imágen ${index + 1}`"
              @slideclick="MostrarCarousel(index)"
              v-for="(img, index) in producto.imgs"
              :key="index"
            >
              <LoaderIframe v-if="loadingImg" />
              <nuxt-img
                sizes="xs:580px sm:708px md:916px lg:725px"
                @load="LoadedImg()"
                :src="img"
                :alt="
                  producto.slug
                    .replace(/-/g, ' ')
                    .replace(/\w\S*/g, function (txt) {
                      return (
                        txt.charAt(0).toUpperCase() +
                        txt.substr(1).toLowerCase()
                      );
                    })
                "
              />
            </slide>
          </carousel>
        </div>
        <div class="producto-texto">
          <div class="producto-info">
            <div class="producto-info-flex">
              <router-link
                :to="'/ventas/' + this.$route.params.categoria"
                :title="`Volver a ` + producto.categoria.nombre"
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
                {{ producto.categoria.nombre }}
              </router-link>
              <div v-if="producto.refurbished" class="condicion">
                <span>|</span>
                <p class="condicion">Refurbished</p>
              </div>
              <div v-if="producto.nuevo" class="condicion">
                <span>|</span>
                <p class="condicion">Nuevo</p>
              </div>
              <div v-if="producto.usado" class="condicion">
                <span>|</span>
                <p class="condicion">Usado</p>
              </div>
            </div>
            <h2>{{ producto.nombre }}</h2>
            <p v-if="producto.descripcion != ''" class="descripcion">
              <span>Descripción:</span>
              {{ producto.descripcion }}
            </p>
          </div>
          <div class="cont-iconos">
            <div class="consultar">
              <transition name="fade">
                <div v-if="consultar" class="consultar-seleccionar">
                  <a
                    class="button"
                    :href="
                      'https://api.whatsapp.com/send?phone=541159282989&text=Solicito%20informaci%C3%B3n%20sobre ' +
                      producto.slug
                        .replace(/-/g, ' ')
                        .replace(/\w\S*/g, function (txt) {
                          return (
                            txt.charAt(0).toUpperCase() +
                            txt.substr(1).toLowerCase()
                          );
                        })
                    "
                    target="_blank"
                    >Consultar por WhatsApp</a
                  >
                  <a
                    class="button"
                    :href="
                      'mailto:info@avsonline.com.ar?subject=Solicito%20informaci%C3%B3n%20sobre ' +
                      producto.slug
                        .replace(/-/g, ' ')
                        .replace(/\w\S*/g, function (txt) {
                          return (
                            txt.charAt(0).toUpperCase() +
                            txt.substr(1).toLowerCase()
                          );
                        })
                    "
                    >Consultar por Email</a
                  >
                </div>
              </transition>
              <button @click="Consultar" class="button">
                {{ consultarTexto }}
              </button>
            </div>
            <div class="iconos">
              <a
                v-if="producto.pdfLink != ''"
                title="Ver folleto"
                :href="producto.pdfLink"
                target="_blank"
              >
                <i class="pdf-icono"></i>
              </a>
              <button
                class="button-icon"
                @click="modalYt = true"
                v-if="producto.ytLink != ''"
                title="Ver video"
              >
                <i class="yt-icono"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section v-if="producto.detalles" class="detalles container">
        <div class="titulo">
          <span class="separator"></span>
          <h2>Detalles</h2>
        </div>
        <ul>
          <li v-for="(detalle, index) in producto.detalles" :key="index">
            <h3>{{ detalle.titulo | capitalize }}</h3>
            <p>{{ detalle.especificacion }}</p>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import { db } from "~/plugins/firebase.js";
import { collection, query, getDocs, where } from "firebase/firestore";
import Carousel from "vue-carousel/src/Carousel.vue";
import Slide from "vue-carousel/src/Slide.vue";
export default {
  components: {
    Carousel,
    Slide,
  },
  head() {
    return {
      title: `${this.producto.slug
        .replace(/-/g, " ")
        .replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        })} | ${this.producto.categoria.nombre}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${
            this.producto.descripcion ||
            this.producto.slug
              .replace(/-/g, " ")
              .replace(/\w\S*/g, function (txt) {
                return (
                  txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                );
              })
          }`,
        },
      ],
    };
  },
  data() {
    return {
      dataExists: true,
      loadingImg: true,
      modalYt: false,
      currentImgIndex: 0,
      modalCarousel: false,
      consultar: false,
      consultarTexto: "Consultar",
      producto: {
        id: null,
        nombre: "",
        slug: "",
        pdfLink: "",
        ytLink: "",
        categoria: {
          nombre: "",
          slug: "",
        },
        publicado: null,
        nuevo: null,
        refurbished: null,
        usado: null,
        stock: null,
        precio: null,
        viejoPrecio: null,
        divisaNombre: "",
        divisaSimbolo: "",
        descripcion: "",
        imgs: [],
        detalles: {},
      },
    };
  },
  methods: {
    LoadedImg() {
      this.loadingImg = false;
    },
    Consultar() {
      this.consultar = !this.consultar;
      this.consultarTexto == "Consultar"
        ? (this.consultarTexto = "Cancelar")
        : (this.consultarTexto = "Consultar");
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
    const queryProducto = query(
      collection(db, "ventas"),
      where("slug", "==", this.$route.params.producto),
      where("categoria.slug", "==", this.$route.params.categoria),
      where("publicado", "==", true)
    );
    const querySnapshotProducto = await getDocs(queryProducto);
    if (querySnapshotProducto.empty) {
      this.dataExists = false;
    }
    querySnapshotProducto.forEach((doc) => {
      //verifico que este publicado el producto
      this.producto = doc.data();
    });
  },
  filters: {
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>

