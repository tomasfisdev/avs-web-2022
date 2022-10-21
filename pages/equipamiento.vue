<template>
  <div>
    <LoaderBanner v-if="loading" />
    <div id="equipamiento" v-show="!loading">
      <Banner titulo="Equipamiento" />
      <section>
        <ul class="container">
          <li v-for="(item, index) in equipamiento" :key="index">
            <LoaderIframe v-if="loadingImg" />
            <h3>{{ item.nombre }}</h3>
            <img provider="static" @load="LoadedImg()"
              :src="`/img/equipamiento/${item.img}`" :alt="item.nombre" />
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadingImg: true,
      loading: true,
      equipamiento: [
        {
          nombre: "Pantallas de LED para Interiores y Exteriores",
          img: "pantallas-de-led.jpg",
        },
        {
          nombre: "Piso de LED",
          img: "piso-de-led.jpg",
        },
        {
          nombre: "Live Switchers",
          img: "live-switchers.jpg",
        },
        {
          nombre: "Cámaras Robóticas PTZ",
          img: "camaras-roboticas-ptz.jpg",
        },
        {
          nombre: "Proyectores de Alta potencia",
          img: "proyectores.jpg",
        },
        {
          nombre: "Conversores",
          img: "conversores.jpg",
        },
        {
          nombre: "Distribuidores",
          img: "distribuidores.jpg",
        },
        {
          nombre: "Extensores",
          img: "extensores.jpg",
        },
        {
          nombre: "Matrices",
          img: "matrices.jpg",
        },
        {
          nombre: "Fibra Óptica",
          img: "fibra-optica.jpg",
        },
        {
          nombre: "Video Cámaras Broadcast",
          img: "video-camaras-broadcast.jpg",
        },
        {
          nombre: "Controles de Video y Datos",
          img: "controles-de-video-y-datos.jpg",
        },
        {
          nombre: "Pantallas LED Curvas y Formas Especiales",
          img: "pantallas-led-curvas.jpg",
        },
        {
          nombre: "Tramas y Cortinas LED",
          img: "tramas-y-cortinas-led.jpg",
        },
        {
          nombre: "Sistemas de Transmisión en 4K",
          img: "sistemas-de-transmision-en-4k.jpg",
        },
        {
          nombre: "Software de Control",
          img: "software-de-control.jpg",
        },
        {
          nombre: "Servers de Video",
          img: "servers-de-video.jpg",
        },
      ]
    };
  },
  head() {
    return {
      title: "Equipamiento | Audiovisual Systems",
      meta: [{
        hid: 'description',
        name: 'description',
        content: 'Pantallas de LED para Interiores y Exteriores, Tramas y Cortinas LED, Pantallas LED Curvas y Formas Especiales, Piso de LED, Sistemas de Transmisión en 4K, Live Switchers, Video Cámaras Broadcast, Cámaras Robóticas PTZ, Monitores, Proyectores de Alta potencia, Controles de Video y Datos, Conversores, Distribuidores, Extensores, Matrices, Fibra Óptica, Servers de Video, Software de Control'
      }]
    };
  },
  methods: {
    LoadedImg() {
      this.loadingImg = false
    },
  },
  async mounted() {
    this.loading = false;
  }
};
</script>