<script lang='ts' setup>
const gallery = useGallery()

gallery.GetUserList()
gallery.GetGalleryList()

watch(() => gallery.user, () => {
    gallery.GetGalleryList()
})


</script>
<template>
    <IndexHeader></IndexHeader>
    <v-row>
        <IndexGallery v-for="item in gallery.galleryList" :key="item.id" :item="item"></IndexGallery>
    </v-row>
    <IndexGalleryWindow></IndexGalleryWindow>
</template>
<script lang='ts'>

export default {
    name: 'Index',
}
</script>
<style lang='less' scoped></style>