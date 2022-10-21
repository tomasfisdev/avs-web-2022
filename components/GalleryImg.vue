<template>
    <li @click="$emit('MostrarCarousel')">
        <LoaderIframe v-if="loadingImg" />
        <img
            @load="LoadedImg()"
            :src="img"
            :alt="`${show.nombre} ${show.ano} ${show.ubicacion}`"
        />
    </li>
</template>

<script>
export default {
    props: ['show', 'img'],
    data() {
        return {
            loadingImg: true,
        }
    },
    methods: {
        LoadedImg() {
            this.loadingImg = false
        },
    }
}
</script>