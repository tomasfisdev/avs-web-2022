<template>
  <div>
    <StartLoader v-if="loading" />
    <div v-show="!loading" id="home">
      <WppBtn v-if="showWppBtn" />
      <Nav />
      <ModalVideo v-if="modalYt" ytLink="https://www.youtube.com/watch?v=O1TkeJpNIVA" @close="modalYt = false" />
      <section id="hero">
        <carousel :perPage="1" paginationEnabled paginationColor="rgb(239 239 239 / 47%)"
          paginationActiveColor="#ffffff" autoplay navigationEnabled navigationNextLabel="<div class='next'></div>"
          navigationPrevLabel="<div class='prev'></div>" :autoplayTimeout="3500" loop>
          <slide :title="`Imágen 1`" class="banner-home slide-1">
            <div class="banner-shadow"></div>
            <div class="container">
              <div class="hero-text">
                <h2>Soluciones visuales de primer nivel</h2>
                <p>
                  <strong>Alquiler, instalación y venta</strong> de Pantallas de
                  led, para para espectáculos y eventos.
                </p>
              </div>
            </div>
          </slide>
          <slide :title="`Imágen 2`" class="banner-home slide-2">
            <div class="banner-shadow"></div>
            <div class="container">
              <div class="hero-text">
                <h2>Alquiler de Pantallas de Led</h2>
                <p>Armado rápido y sencillo. Video e imágenes en alta definición</p>
              </div>
            </div>
          </slide>
          <slide :title="`Imágen 3`" class="banner-home slide-3">
            <div class="banner-shadow"></div>
            <div class="container">
              <div class="hero-text">
                <h2>Venta de Pantallas de Led y Equipos de Video</h2>
                <p>Asesorate con profesionales contactándonos</p>
              </div>
            </div>
          </slide>
          <slide :title="`Imágen 4`" class="banner-home slide-5">
            <div class="banner-shadow"></div>
            <div class="container">
              <div class="hero-text hero-text-big">
                <h2>
                  Alquiler, Instalación y Venta de
                  Pantallas Gigantes
                </h2>
              </div>
            </div>
          </slide>
          <slide :title="`Imágen 5`" class="banner-home slide-4">
            <div class="banner-shadow"></div>
            <div class="container">
              <div class="hero-text">
                <h2>Pisos de Led</h2>
              </div>
            </div>
          </slide>
          <slide :title="`Imágen 6`" class="banner-home slide-6"></slide>
          <slide :title="`Imágen 7`" class="banner-home slide-7"></slide>
        </carousel>
      </section>
      <section data-aos="fade-up" data-aos-offset="0" id="nosotros" class="container">
        <div class="cont-nosotros">
          <div class="panel-3d">
            <LoaderIframe v-if="loadingIframePanel" />
            <nuxt-img provider="static" sizes="xl:100vw lg:100vw md:100vw sm:100vw xs:100vw" @load="LoadedIframePanel()"
              src="/img/panel-img.png" alt="Panel Pantalla de Led" />
          </div>
          <div class="nosotros-texto">
            <div class="titulo">
              <h2>Nosotros</h2>
            </div>
            <p>
              Líder en Pantallas de Leds. Somos una empresa con respaldo y
              trayectoria. Dedicados desde 2003, al alquiler, instalación y
              venta de pantallas gigantes para presentaciones, espectáculos y
              mega eventos. Acompañando al cliente desde el primer momento,
              asesorando y brindando la alternativa indicada para cada tipo de
              necesidad.
            </p>
            <div class="titulo">
              <h2>Nuestros servicios</h2>
            </div>
            <p>
              Pantallas de Leds para Interiores y Exteriores. Tramas y Cortinas
              Mesh. Curvas y Formas Especiales. Sistemas de Transmisión en 4K.
              Live Switchers, Video Cámaras y Cámaras Robóticas para
              Transmisiones en Vivo y grabaciones. Personal idóneo, entrenado y
              capacitado, dedicado a brindarle compromiso y seguridad.
            </p>
          </div>
        </div>
      </section>
      <section data-aos="fade-up" data-aos-offset="0" id="video" class="banner-home">
        <div class="container">
          <div class="hero-text">
            <h2>El mejor servicio, lo último en tecnología</h2>
            <p>
              Somos la solución ideal y fundamental para la realización de
              cualquier producción de alto nivel.
            </p>
          </div>
          <div class="cont-video">
            <button @click="modalYt = true" title="Ver Video">
              <i>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-play-circle-fill"
                  viewBox="0 0 16 16">
                  <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                </svg>
              </i>
            </button>
            <nuxt-img provider="static" @click="modalYt = true" src="/img/portada-video.jpg"
              sizes="xl:100vw lg:100vw md:100vw sm:100vw xs:100vw" alt="AVS Reel 2018 Youtube" />
          </div>
        </div>
      </section>
      <section data-aos="fade-up" data-aos-offset="0" id="home-shows">
        <div class="titulo container">
          <h2>Shows y Eventos</h2>
        </div>
        <div class="container">
          <carousel class="home-shows-carousel" :perPageCustom="[
            [0, 1],
            [768, 2],
            [992, 3],
          ]" :scrollPerPage="false" navigationEnabled :paginationEnabled="true"
            navigationNextLabel="<div class='next'></div>" navigationPrevLabel="<div class='prev'></div>">
            <slide @slideclick="SlideLink(`/shows/2018/lollapalooza`)">
              <div class="slide-texto">
                <h3>Lollapalooza</h3>
                <p>2018</p>
              </div>
              <nuxt-img provider="static" sizes="xs:564px sm:691px md:340px" src="/img/slides-shows-inicio/show-1.jpg"
                alt="Lollapalooza 2018 Hipódromo de San Isidro" />
            </slide>
            <slide @slideclick="SlideLink(`/shows/2018/katy-perry`)">
              <div class="slide-texto">
                <h3>Katy Perry</h3>
                <p>2018</p>
              </div>
              <nuxt-img provider="static" sizes="xs:564px sm:691px md:340px" src="/img/slides-shows-inicio/show-2.jpg"
                alt="Katy Perry 2018 Club Ciudad" />
            </slide>
            <slide @slideclick="SlideLink(`/shows/2016/martin-fierro`)">
              <div class="slide-texto">
                <h3>Martín Fierro</h3>
                <p>2016</p>
              </div>
              <nuxt-img provider="static" sizes="xs:564px sm:691px md:340px" src="/img/slides-shows-inicio/show-3.jpg"
                alt="Martín Fierro 2016 Canal 13" />
            </slide>
            <slide @slideclick="SlideLink(`/shows`)">
              <div class="slide-texto">
                <h3>Ver Más</h3>
              </div>
              <nuxt-img provider="static" sizes="xs:564px sm:691px md:340px" src="/img/slides-shows-inicio/show-4.jpg"
                alt="Shows y Eventos Audiovisual Systems" />
            </slide>
          </carousel>
        </div>
        <NuxtLink to="/shows" class="button">Ver más</NuxtLink>
      </section>
      <Footer />
    </div>
  </div>
</template>
<script>
import Carousel from 'vue-carousel/src/Carousel.vue'
import Slide from 'vue-carousel/src/Slide.vue'
export default {
  layout: 'home',
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      showWppBtn: false,
      loadingIframePanel: true,
      shows: [],
      loading: true,
      modalYt: false
    };
  },
  head() {
    return {
      title: "Inicio | Audiovisual Systems",

    };
  },
  methods: {
    SlideLink(route) {
      this.$router.push(route);
    },
    LoadedIframePanel() {
      this.loadingIframePanel = false;
    },
  },
  mounted() {
    this.loading = false
    this.showWppBtn = true
  }
};
</script>

