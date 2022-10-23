require('dotenv').config()
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: 'static' ,
  head: {
    title: 'Audiovisual Systems',
    htmlAttrs: {
      lang: 'es'
    },
    meta: [{
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      hid: 'description',
      name: 'description',
      content: 'Alquiler, Instalación y Venta de Pantallas Led para Shows, Eventos, Conciertos y Espectáculos. Servicios en Argentina y toda Latinoamérica.'
    },
    {
      name: "author",
      content: "Tomás Fis"
    },
    {
      name: "copyright",
      content: "Audiovisual Systems S.A."
    },
    {
      name: 'format-detection',
      content: 'telephone=no'
    }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/static/styles.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/firebase.js',
    {
      src: "~/plugins/aos.js",
      ssr: false
    },
    {
      src: '~/plugins/infiniteLoading.js',
      ssr: false
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/dotenv',
  ],
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
