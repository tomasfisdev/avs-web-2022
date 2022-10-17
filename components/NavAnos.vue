<template>
  <nav>
    <ul class="container">
      <li>
        <NuxtLink :to="preLink">Todo</NuxtLink>
      </li>
      <li v-for="ano in anos" :key="ano.id">
        <NuxtLink :to="`${preLink}/${ano.ano}`">{{ ano.ano }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>


<script>
import { db } from "~/plugins/firebase.js";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
export default {
  props: ["preLink"],
  data() {
    return {
      anos: []
    }
  },
  async fetch() {
    //Query años
    const queryAnos = query(collection(db, "anos"), orderBy("ano", "desc"));
    const querySnapshotAnos = await getDocs(queryAnos);
    querySnapshotAnos.forEach((doc) => {
      this.anos.push({ id: doc.id, ...doc.data() });
    });
  }
};
</script>