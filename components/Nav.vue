<template>
  <header>
    <div class="container">
      <div class="cont-logo">
        <NuxtLink to="/">
          <h1 class="logo">Audiovisual Systems</h1>
        </NuxtLink>
        <button
          @click="closedNav = !closedNav"
          :title="closedNav ? 'Abrir menú' : 'Cerrar menú'"
          class="button-icon"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </button>
      </div>
      <nav :class="closedNav ? 'closed-nav' : 'opened-nav'">
        <ul>
          <li @click="closedNav = true"><NuxtLink to="/">Inicio</NuxtLink></li>
          <li @click="closedNav = true">
            <NuxtLink to="/shows">Shows y eventos</NuxtLink>
          </li>
          <li @click="closedNav = true">
            <NuxtLink to="/equipamiento">Equipamiento</NuxtLink>
          </li>
          <li @click="closedNav = true">
            <NuxtLink to="/ventas">Ventas</NuxtLink>
          </li>
          <li @click="closedNav = true"><a href="#contacto">Contacto</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      closedNav: true,
    };
  },
};
</script>
