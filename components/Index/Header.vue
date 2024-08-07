<script lang='ts' setup>

const gallery = useGallery()

</script>
<template>
    <v-row>
        <v-col cols="12">
            <v-chip-group v-model="gallery.user">
                <v-chip v-for="item in gallery.userList" :key="item" label variant="text" :value="item.value">
                    {{ item.name }}
                </v-chip>
            </v-chip-group>
        </v-col>
    </v-row>
</template>
<script lang='ts'>

export default {
    name: 'IndexHeader',
}
</script>
<style lang='less' scoped></style>