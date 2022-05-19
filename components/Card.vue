<template>
  <li class="card">
    <LoaderIframe v-if="loadingImgCard" />
    <NuxtLink v-if="show" :to="preLink + '/' + show.ano + '/' + show.slug">
      <nuxt-img     
        sizes="xs:640px sm:708px md:442px lg:424px"
        @load="loadedCard()"
        :src="show.portada"
        :alt="`${show.nombre} ${show.ubicacion} ${show.ano}`"
      />
      <div class="card-text">
        <h3>{{ show.nombre }}</h3>
        <p class="blue">{{ show.ano }}</p>
      </div>
    </NuxtLink>
    <NuxtLink v-if="producto" :to="preLink + '/' + producto.categoria.slug + '/' + producto.slug">
      <nuxt-img
        sizes="xs:640px sm:708px md:442px lg:424px"
        @load="loadedCard()"
        :src="producto.imgs[0]"
        :alt="producto.nombre"
      />
      <div class="card-text">
        <h3>{{ producto.nombre }}</h3>
      </div>
    </NuxtLink>
    <NuxtLink v-if="categoria" :to="preLink + '/' + categoria.slug">
      <nuxt-img
        sizes="xs:640px sm:708px md:442px lg:424px"
        @load="loadedCard()"
        :src="categoria.img"
        :alt="categoria.nombre"
      />
      <div class="card-text">
        <h3>{{ categoria.nombre }}</h3>
      </div>
    </NuxtLink>
  </li>
</template>

<script>
export default {
  props: ["show", "producto", "categoria", "preLink"],
  data() {
    return {
      loadingImgCard: true,
    };
  },
  methods: {
    loadedCard() {
      this.loadingImgCard = false;
    },
  },
};
</script>