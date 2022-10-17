<template>
  <div>
    <LoaderCard v-if="$fetchState.pending || !dataExists" />
    <div v-if="!$fetchState.pending && dataExists">
      <Banner :titulo="this.titulo" />
      <section class="productos">
        <section class="nav-anos-container container search-ventas">
          <form @submit.prevent="Search()">
            <input placeholder="Buscar Producto..." class="search" type="text" v-model="searchQuery" />
            <LoaderSearch v-show="showLoadingSearch" />
            <button v-show="this.searchQuery.length >= 1 && !showLoadingSearch" title="Buscar Show"
              class="btn-search button-icon">
              <i>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                  <path
                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </i>
              Buscar Show
            </button>
          </form>
          <button v-show="searchResult.length >= 1 || noSearchResult" @click="CancelSearch()"
            title="Cerrar búsqueda" class="btn-search button-icon">
            <i>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                  d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                <path fill-rule="evenodd"
                  d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
              </svg>
            </i>
            Cerrar búsqueda
          </button>
        </section>
        <ul class="container">
          <template v-if="searchResult.length == 0 && !noSearchResult">
            <Card v-for="producto in productos" :key="producto.id" preLink="/ventas" :producto="producto" />
          </template>
          <template v-if="searchResult.length > 0 && !noSearchResult">
            <Card v-for="producto in searchResult" :key="producto.id" preLink="/ventas" :producto="producto" />
          </template>
        </ul>
        <template v-if="noSearchResult">
          <p class="container no-search-result">Lo sentimos, no hay resultados para esta búsqueda.</p>
        </template>
      </section>
    </div>
  </div>
</template>

<script>
import { db } from "~/plugins/firebase.js";
import { collection, query, getDocs, where, orderBy } from "firebase/firestore";
export default {
  data() {
    return {
      dataExists: true,
      titulo: this.$route.params.categoria
        .replace(/-/g, ' ')
        .replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() }),
      productos: [],
      noSearchResult: false,
      showLoadingSearch: false,
      searchResult: [],
      searchQuery: '',
    };
  },
  head() {
    return {
      title: `${this.titulo} | Ventas`,
      meta: [{
        hid: 'description',
        name: 'description',
        content: this.titulo
      }]
    };
  },
  mounted() {
    if (this.dataExists == false) {
      this.$nuxt.error({ statusCode: 404 });
    }
  },
  methods: {
    async CancelSearch() {
      this.searchResult = []
      this.searchQuery = ''
      this.noSearchResult = false
    },
    async Search() {
      if (this.searchQuery != '') {
        this.showLoadingSearch = true
        let queryProductos = query(
          collection(db, "ventas"),
          where("categoria.slug", "==", this.$route.params.categoria),
        );
        const querySnapshotProductos = await getDocs(queryProductos);
        let productos = []
        let searchQuery = this.searchQuery.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        querySnapshotProductos.forEach((doc) => {
          productos.push(doc.data())
        });
        this.searchResult = productos.filter(producto => 
        producto.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchQuery) 
        || producto.slug.toLowerCase().replace(/-/g, ' ').includes(searchQuery)
        || producto.slug.toLowerCase().includes(searchQuery)
        )
        this.showLoadingSearch = false
        if (this.searchResult == 0) {
          this.noSearchResult = true;
        } else {
          this.noSearchResult = false;
        }
      }
    },
  },
  async fetch() {
    //query ventas, trae productos segun categoria (recibe slug que viene de la url)
    const queryVentas = query(
      collection(db, "ventas"),
      where("categoria.slug", "==", this.$route.params.categoria),
      where("publicado", "==", true),
      orderBy("nombre", "asc")
    );
    const querySnapshotVentas = await getDocs(queryVentas);
    if (querySnapshotVentas.empty) {
      this.dataExists = false;
    }
    querySnapshotVentas.forEach((doc) => {
      this.productos.push({ id: doc.id, ...doc.data() });
    });
  },
};
</script>

