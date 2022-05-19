<template>
  <nav>
    <ul>
      <li>
        <NuxtLink :to="preLink">Todo</NuxtLink>
      </li>
      <li v-for="ano in anos" :key="ano.numero">
        <NuxtLink :to="preLink + '/' + ano.numero">{{ ano.numero }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ["anos", "preLink"],
};
</script>