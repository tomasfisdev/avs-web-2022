<template>
  <div>
    <LoaderCard v-if="$fetchState.pending" />
    <div v-if="!$fetchState.pending">
      <Banner titulo="Ventas" />
      <section class="productos">
        <div class="container">
          <div class="subtitulo">
            <h2>Distribuidor oficial en Argentina de</h2>
            <ul>
              <li class="avmatrix" title="Avmatrix">Avmatrix</li>
              <li class="novastar" title="Novastar">Novastar</li>
            </ul>
          </div>
        </div>
        <Frase
          frase="Variedad de Productos y Configuraciones. Instalación, logística y
      asesoramiento. Soporte técnico profesional y confiable. Servicios en Argentina y toda Latinoamérica. Mantenimiento constante y control permanente." />
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
          <button v-show="searchResult.length >= 1 || noSearchResult" @click="CancelSearch()" title="Cerrar búsqueda"
            class="btn-search button-icon">
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
            <Card preLink="/ventas" v-for="categoria in categorias" :key="categoria.id" :categoria="categoria" />
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
import { collection, query, getDocs, orderBy } from "firebase/firestore";
export default {
  data() {
    return {
      categorias: [],
      noSearchResult: false,
      searchResult: [],
      searchQuery: '',
      showLoadingSearch: false,
    };
  },
  head() {
    return {
      title: "Ventas | Audiovisual Systems",
      meta: [{
        hid: 'description',
        name: 'description',
        content: 'Venta y Alquiler de Pantallas de Led, Switchers, Conversores , Distribuidores , Capturadores, Extensores, Multiviewers, Matrices, Controladores Led, Escaladores, Cámaras , Monitores y Proyectores. Distribuidor Oficial de Avmatrix y Novastar.'
      }]
    };
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
    //query categorias (de ventas)
    const queryCategorias = query(
      collection(db, "categorias"),
      orderBy("id", "asc")
    );
    const querySnapshotCategorias = await getDocs(queryCategorias);
    if (querySnapshotCategorias.empty) {
      this.$nuxt.error({ statusCode: 404 });
    } else {
      querySnapshotCategorias.forEach((doc) => {
        this.categorias.push({ id: doc.id, ...doc.data() });
      });
    }
  },
};
</script>
