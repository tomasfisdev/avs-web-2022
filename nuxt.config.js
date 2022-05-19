import {
  db
} from "./plugins/firebase.js";
import {
  collection,
  query,
  getDocs,
  orderBy,
  where
} from "firebase/firestore";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Audiovisual Systems, Pantallas Led',
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

  sitemap: {
    hostname: 'https://www.avs.com.ar/',
    cachetime: 1000 * 60 * 10080,
    async routes() {
      //query categorias
      const queryCategorias = query(
        collection(db, "categorias"),
        orderBy("id", "asc")
      );
      const querySnapshotCategorias = await getDocs(queryCategorias);
      let categorias = querySnapshotCategorias.docs.map((doc) => {
        return {
          url: `/ventas/${doc.data().slug}`,
          changefreq: 'weekly',
        }
      })
      //query ventas, trae productos segun categoria
      const queryPantallas = query(
        collection(db, "ventas"),
        where("categoria.slug", "==", "pantallas-de-led"),
        where("publicado", "==", true),
        orderBy("nombre", "asc")
      );
      const querySnapshotPantallas = await getDocs(queryPantallas);
      let pantallas = querySnapshotPantallas.docs.map((doc) => {
        return {
          url: `/ventas/pantallas-de-led/${doc.data().slug}`,
          changefreq: 'weekly',
        }
      })
      const queryConversores = query(
        collection(db, "ventas"),
        where("categoria.slug", "==", "conversores"),
        where("publicado", "==", true),
        orderBy("nombre", "asc")
      );
      const querySnapshotConversores = await getDocs(queryConversores);
      let conversores = querySnapshotConversores.docs.map((doc) => {
        return {
          url: `/ventas/conversores/${doc.data().slug}`,
          changefreq: 'weekly',
        }
      })
      const queryDistribuidores = query(
        collection(db, "ventas"),
        where("categoria.slug", "==", "distribuidores"),
        where("publicado", "==", true),
        orderBy("nombre", "asc")
      );
      const querySnapshotDistribuidores = await getDocs(queryDistribuidores);
      let distribuidores = querySnapshotDistribuidores.docs.map((doc) => {
        return {
          url: `/ventas/distribuidores/${doc.data().slug}`,
          changefreq: 'weekly',
        }
      })
      const queryCapturadores = query(
        collection(db, "ventas"),
        where("categoria.slug", "==", "capturadores"),
        where("publicado", "==", true),
        orderBy("nombre", "asc")
      );
      const querySnapshotCapturadores = await getDocs(queryCapturadores);
      let capturadores = querySnapshotCapturadores.docs.map((doc) => {
        return {
          url: `/ventas/capturadores/${doc.data().slug}`,
          changefreq: 'weekly',
        }
      })
      const queryExtensores = query(
        collection(db, "ventas"),
        where("categoria.slug", "==", "extensores"),
        where("publicado", "==", true),
        orderBy("nombre", "asc")
      );
      const querySnapshotExtensores = await getDocs(queryExtensores);
      let extensores = querySnapshotExtensores.docs.map((doc) => {
        return {
          url: `/ventas/extensores/${doc.data().slug}`,
          changefreq: 'weekly',
        }
      })
      const queryMultiviewers = query(
        collection(db, "ventas"),
        where("categoria.slug", "==", "multiviewers"),
        where("publicado", "==", true),
        orderBy("nombre", "asc")
      );
      const querySnapshotMultiviewers = await getDocs(queryMultiviewers);
      let multiviewers = querySnapshotMultiviewers.docs.map((doc) => {
        return {
          url: `/ventas/multiviewers/${doc.data().slug}`,
          changefreq: 'weekly',
        }
      })
      const queryMatrices = query(
        collection(db, "ventas"),
        where("categoria.slug", "==", "matrices"),
        where("publicado", "==", true),
        orderBy("nombre", "asc")
      );
      const querySnapshotMatrices = await getDocs(queryMatrices);
      let matrices = querySnapshotMatrices.docs.map((doc) => {
        return {
          url: `/ventas/matrices/${doc.data().slug}`,
          changefreq: 'weekly',
        }
      })
      const queryControladores = query(
        collection(db, "ventas"),
        where("categoria.slug", "==", "controladores-led"),
        where("publicado", "==", true),
        orderBy("nombre", "asc")
      );
      const querySnapshotControladores = await getDocs(queryControladores);
      let controladores = querySnapshotControladores.docs.map((doc) => {
        return {
          url: `/ventas/controladores-led/${doc.data().slug}`,
          changefreq: 'weekly',
        }
      })
      const queryEscaladoresSwitchers = query(
        collection(db, "ventas"),
        where("categoria.slug", "==", "escaladores-y-switchers"),
        where("publicado", "==", true),
        orderBy("nombre", "asc")
      );
      const querySnapshotEscaladoresSwitchers = await getDocs(queryEscaladoresSwitchers);
      let escaladoresSwitchers = querySnapshotEscaladoresSwitchers.docs.map((doc) => {
        return {
          url: `/ventas/escaladores-y-switchers/${doc.data().slug}`,
          changefreq: 'weekly',
        }
      })
      const queryCamaras = query(
        collection(db, "ventas"),
        where("categoria.slug", "==", "camaras"),
        where("publicado", "==", true),
        orderBy("nombre", "asc")
      );
      const querySnapshotCamaras = await getDocs(queryCamaras);
      let camaras = querySnapshotCamaras.docs.map((doc) => {
        return {
          url: `/ventas/camaras/${doc.data().slug}`,
          changefreq: 'weekly',
        }
      })
      const queryMonitores = query(
        collection(db, "ventas"),
        where("categoria.slug", "==", "monitores"),
        where("publicado", "==", true),
        orderBy("nombre", "asc")
      );
      const querySnapshotMonitores = await getDocs(queryMonitores);
      let monitores = querySnapshotMonitores.docs.map((doc) => {
        return {
          url: `/ventas/monitores/${doc.data().slug}`,
          changefreq: 'weekly',
        }
      })
      const queryProyectores = query(
        collection(db, "ventas"),
        where("categoria.slug", "==", "proyectores"),
        where("publicado", "==", true),
        orderBy("nombre", "asc")
      );
      const querySnapshotProyectores = await getDocs(queryProyectores);
      let proyectores = querySnapshotProyectores.docs.map((doc) => {
        return {
          url: `/ventas/proyectores/${doc.data().slug}`,
          changefreq: 'weekly',
        }
      })
      const queryCables = query(
        collection(db, "ventas"),
        where("categoria.slug", "==", "cables"),
        where("publicado", "==", true),
        orderBy("nombre", "asc")
      );
      const querySnapshotCables = await getDocs(queryCables);
      let cables = querySnapshotCables.docs.map((doc) => {
        return {
          url: `/ventas/cables/${doc.data().slug}`,
          changefreq: 'weekly',
        }
      })
      const queryMas = query(
        collection(db, "ventas"),
        where("categoria.slug", "==", "mas"),
        where("publicado", "==", true),
        orderBy("nombre", "asc")
      );
      const querySnapshotMas = await getDocs(queryMas);
      let mas = querySnapshotMas.docs.map((doc) => {
        return {
          url: `/ventas/mas/${doc.data().slug}`,
          changefreq: 'weekly',
        }
      })
      //
      //query shows años
      const queryAnos = query(collection(db, "anos"), orderBy("ano", "desc"));
      const querySnapshotAnos = await getDocs(queryAnos);
      let anos = querySnapshotAnos.docs.map((doc) => {
        return {
          url: `/shows/${doc.data().ano}`,
          changefreq: 'weekly',
        }
      })
      const queryShow2018 = query(
        collection(db, "shows"),
        where("ano", "==", parseInt(2018))
      );
      const querySnapshot2018 = await getDocs(queryShow2018);
      let ano2018 = querySnapshot2018.docs.map((doc) => {
        return {
          url: `/shows/2018/${doc.data().slug}`,
          changefreq: 'weekly',
        }
      })
      const queryShow2017 = query(
        collection(db, "shows"),
        where("ano", "==", parseInt(2017))
      );
      const querySnapshot2017 = await getDocs(queryShow2017);
      let ano2017 = querySnapshot2017.docs.map((doc) => {
        return {
          url: `/shows/2017/${doc.data().slug}`,
          changefreq: 'weekly',
        }
      })
      const queryShow2016 = query(
        collection(db, "shows"),
        where("ano", "==", parseInt(2016))
      );
      const querySnapshot2016 = await getDocs(queryShow2016);
      let ano2016 = querySnapshot2016.docs.map((doc) => {
        return {
          url: `/shows/2016/${doc.data().slug}`,
          changefreq: 'weekly',
        }
      })
      const queryShow2015 = query(
        collection(db, "shows"),
        where("ano", "==", parseInt(2015))
      );
      const querySnapshot2015 = await getDocs(queryShow2015);
      let ano2015 = querySnapshot2015.docs.map((doc) => {
        return {
          url: `/shows/2015/${doc.data().slug}`,
          changefreq: 'weekly',
        }
      })
      const queryShow2014 = query(
        collection(db, "shows"),
        where("ano", "==", parseInt(2014))
      );
      const querySnapshot2014 = await getDocs(queryShow2014);
      let ano2014 = querySnapshot2014.docs.map((doc) => {
        return {
          url: `/shows/2014/${doc.data().slug}`,
          changefreq: 'weekly',
        }
      })
      const queryShow2013 = query(
        collection(db, "shows"),
        where("ano", "==", parseInt(2013))
      );
      const querySnapshot2013 = await getDocs(queryShow2013);
      let ano2013 = querySnapshot2013.docs.map((doc) => {
        return {
          url: `/shows/2013/${doc.data().slug}`,
          changefreq: 'weekly',
        }
      })
      const queryShow2012 = query(
        collection(db, "shows"),
        where("ano", "==", parseInt(2012))
      );
      const querySnapshot2012 = await getDocs(queryShow2012);
      let ano2012 = querySnapshot2012.docs.map((doc) => {
        return {
          url: `/shows/2012/${doc.data().slug}`,
          changefreq: 'weekly',
        }
      })
      const queryShow2011 = query(
        collection(db, "shows"),
        where("ano", "==", parseInt(2011))
      );
      const querySnapshot2011 = await getDocs(queryShow2011);
      let ano2011 = querySnapshot2011.docs.map((doc) => {
        return {
          url: `/shows/2011/${doc.data().slug}`,
          changefreq: 'weekly',
        }
      })
      const queryShow2010 = query(
        collection(db, "shows"),
        where("ano", "==", parseInt(2010))
      );
      const querySnapshot2010 = await getDocs(queryShow2010);
      let ano2010 = querySnapshot2010.docs.map((doc) => {
        return {
          url: `/shows/2010/${doc.data().slug}`,
          changefreq: 'weekly',
        }
      })
      const queryShow2009 = query(
        collection(db, "shows"),
        where("ano", "==", parseInt(2009))
      );
      const querySnapshot2009 = await getDocs(queryShow2009);
      let ano2009 = querySnapshot2009.docs.map((doc) => {
        return {
          url: `/shows/2009/${doc.data().slug}`,
          changefreq: 'weekly',
        }
      })
      const queryShow2008 = query(
        collection(db, "shows"),
        where("ano", "==", parseInt(2008))
      );
      const querySnapshot2008 = await getDocs(queryShow2008);
      let ano2008 = querySnapshot2008.docs.map((doc) => {
        return {
          url: `/shows/2008/${doc.data().slug}`,
          changefreq: 'weekly',
        }
      })
      return [{
          url: '/',
          changefreq: 'weekly',
          priority: 1,
        },
        {
          url: '/ventas',
          changefreq: 'weekly',
          priority: 0.9,
        },
        {
          url: '/shows',
          changefreq: 'weekly',
          priority: 0.8,
        },
        {
          url: '/equipamiento',
          changefreq: 'weekly',
          priority: 0.7,
        },
        ...categorias,
        ...pantallas,
        ...conversores,
        ...distribuidores,
        ...capturadores,
        ...extensores,
        ...multiviewers,
        ...matrices,
        ...controladores,
        ...escaladoresSwitchers,
        ...camaras,
        ...monitores,
        ...proyectores,
        ...cables,
        ...mas,
        ...anos,
        ...ano2018,
        ...ano2017,
        ...ano2016,
        ...ano2015,
        ...ano2014,
        ...ano2013,
        ...ano2012,
        ...ano2011,
        ...ano2010,
        ...ano2009,
        ...ano2008
      ]
    },
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

  env: {
    API_KEY:"AIzaSyAqXHI-p-AYY-vf3JAq4WhD_Yz7L4_fZr8",
    AUTH_DOMAIN:"avs-web-2021.firebaseapp.com",
    PROJECT_ID:"avs-web-2021",
    STORAGE_BUCKET:"avs-web-2021.appspot.com",
    MESSAGING_SENDER_ID:"736973193467",
    APP_ID:"1:736973193467:web:0ddfa6c990e60102aab05e",
    MEASUREMENT_ID:"G-6XPLG9WQYF"
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules


  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/sitemap',
    '@nuxt/image'
  ],
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
