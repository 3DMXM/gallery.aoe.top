<script lang='ts' setup>

const gallery = useGallery()

</script>
<template>
    <v-dialog v-model="gallery.show">
        <v-window v-model="gallery.window" show-arrows continuous>
            <v-window-item v-for="item in gallery.galleryList" :key="item.id" class="gallery-item">
                <img :src="item['@microsoft.graph.downloadUrl']" :alt="item.name" @click="gallery.show = false">
            </v-window-item>
        </v-window>
    </v-dialog>
</template>
<script lang='ts'>

export default {
    name: 'IndexGalleryWindow',
}
</script>
<style lang='less' scoped>
.gallery-item {
    display: flex;
    justify-content: center;

    img {
        max-width: 100%;
        max-height: 100vh;
    }
}
</style>