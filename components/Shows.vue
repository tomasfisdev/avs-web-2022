<template>
    <div class="shows">
        <LoaderCard v-if="loading" />
        <div v-show="!loading">
            <Banner :titulo="`Shows y Eventos ${this.year || ''}`" />
            <section class="productos">
                <div class="nav-anos-container container">
                    <NavAnos v-show="!showSearch" preLink="/shows" />
                    <form v-show="showSearch" @submit.prevent="Search()">
                        <input placeholder="Buscar Show..." class="search" type="text" v-model="searchQuery" />
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
                    <button v-show="!showSearch" @click="showSearch = !showSearch" title="Buscar Show"
                        class="btn-search button-icon">
                        <i>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                <path
                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </i>
                        Buscar Show
                    </button>
                    <button v-show="showSearch" @click="CancelSearch()" title="Cerrar búsqueda"
                        class="btn-search button-icon">
                        <i>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-x-lg"
                                viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                                <path fill-rule="evenodd"
                                    d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                            </svg>
                        </i>
                        Cerrar búsqueda
                    </button>
                </div>
                <ul class="container">
                    <template v-if="searchResult.length == 0 && !noSearchResult">
                        <Card v-for="show in shows" :key="show.id" preLink="/shows" :show="show" />
                    </template>
                    <template v-if="searchResult.length > 0 && !noSearchResult">
                        <Card v-for="show in searchResult" :key="show.id" preLink="/shows" :show="show" />
                    </template>

                </ul>
                <client-only v-if="searchResult.length == 0 && !noSearchResult">
                    <infinite-loading class="infinite-loading-cards" @infinite="infiniteHandler">
                        <span slot="no-more"></span>
                        <span slot="no-results"></span>
                        <template v-slot:spinner>
                            <div class="loader">
                                <div class="productos">
                                    <div class="container">
                                        <div class="card">
                                            <div class="img skeleton"></div>
                                            <div class="card-text">
                                                <div class="skeleton h3"></div>
                                            </div>
                                        </div>
                                        <div class="card">
                                            <div class="img skeleton"></div>
                                            <div class="card-text">
                                                <div class="skeleton h3"></div>
                                            </div>
                                        </div>
                                        <div class="card">
                                            <div class="img skeleton"></div>
                                            <div class="card-text">
                                                <div class="skeleton h3"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </infinite-loading>
                </client-only>
                <template v-if="noSearchResult">
                    <p class="container no-search-result">Lo sentimos, no hay resultados para esta búsqueda.</p>
                </template>
            </section>
        </div>
    </div>
</template>

<script>
import { db } from "~/plugins/firebase.js";
import {
    collection,
    query,
    getDocs,
    orderBy,
    limit,
    startAfter,
    where
} from "firebase/firestore";
export default {
    data() {
        return {
            shows: [],
            noSearchResult: false,
            showLoadingSearch: false,
            searchResult: [],
            searchQuery: '',
            showSearch: false,
            loading: true,
            lastDoc: null,
            year: this.$route.params.ano,
        };
    },
    head() {
        return {
            title: "Shows y Eventos | Audiovisual Systems",
            meta: [{
                hid: 'description',
                name: 'description',
                content: `Shows y Eventos de Audiovisual Systems`
            }]
        };
    },
    methods: {
        async CancelSearch() {
            this.showSearch = !this.showSearch;
            this.searchResult = []
            this.searchQuery = ''
            this.noSearchResult = false
        },
        async Search() {
            if (this.searchQuery != '') {
                this.showLoadingSearch = true
                let queryShows = query(
                    collection(db, "shows"),
                );
                const querySnapshotShows = await getDocs(queryShows);
                let shows = []
                let searchQuery = this.searchQuery.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                querySnapshotShows.forEach((doc) => {
                    shows.push(doc.data())
                });
                //convierto a minuscula y elimino acentos con esa regex
                this.searchResult = shows.filter(show => show.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchQuery))
                this.showLoadingSearch = false
                if (this.searchResult == 0) {
                    this.noSearchResult = true;
                } else {
                    this.noSearchResult = false;
                }
            }
        },
        async getShows() {
            let queryShows;
            //query todos los shows
            if (this.year == undefined) {
                queryShows = query(
                    collection(db, "shows"),
                    orderBy("ano", "desc"),
                    orderBy("nombre", "asc"),
                    limit(3)
                );
                if (this.lastDoc) {
                    queryShows = query(
                        collection(db, "shows"),
                        orderBy("ano", "desc"),
                        orderBy("nombre", "asc"),
                        limit(3),
                        startAfter(this.lastDoc)
                    );
                }
            } else {
                queryShows = query(
                    collection(db, "shows"),
                    orderBy("nombre", "asc"),
                    where("ano", "==", parseInt(this.year)),
                    limit(3)
                );
                if (this.lastDoc) {
                    queryShows = query(
                        collection(db, "shows"),
                        orderBy("nombre", "asc"),
                        where("ano", "==", parseInt(this.year)),
                        limit(3),
                        startAfter(this.lastDoc)
                    );
                }
            }
            //query año específico
            const querySnapshotShows = await getDocs(queryShows);
            //para que redireccione la consulta tiene que venir vacia
            //y lastDoc tiene que ser null que es el estado inicial de la variable
            //al montarse el componente, de lo contrario redireccionara cada vez
            //que se termine el inifinit scroll
            if (querySnapshotShows.empty && this.lastDoc == null) {
                this.$nuxt.error({ statusCode: 404 });
            }
            this.lastDoc =
                querySnapshotShows.docs[querySnapshotShows.docs.length - 1];
            querySnapshotShows.forEach((doc) => {
                this.shows.push(doc.data());
            });
            this.loading = false;
            return querySnapshotShows.docs.length;
        },
        async infiniteHandler($state) {
            const newItems = await this.getShows();
            if (newItems > 0 && !undefined) {
                return $state.loaded();
            }
            return $state.complete();
        },
    },
    async mounted() {
        this.getShows();
    },

};
</script>