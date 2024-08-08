<script lang='ts' setup>

const gallery = useGallery()

const props = defineProps(['item'])
const name = computed(() => {
    return props.item.name.split('.')[0]
})

// 作者
const author = computed(() => {
    return props.item.parentReference.name.split('.')[1]
})

const time = computed(() => {
    // item.lastModifiedDateTime = 2024-08-07T08:17:02Z
    // 转换为 2024-08-07 08:17:02
    return props.item.lastModifiedDateTime.replace('T', ' ').replace('Z', '')
})


const like = ref(0)


gallery.GetLike(props.item.id).then(({ data }) => {
    console.log(data);
    like.value = data.count
})




function show() {
    gallery.show = true
    // gallery.window = props.item.id
    // gallery.window = item 在 gallery.galleryList 中的索引
    gallery.window = gallery.galleryList.findIndex((item) => item.id === props.item.id)
}

async function add_like() {
    let { data } = await gallery.AddLike(props.item.id)
    console.log(data);

    like.value = data.count
}

</script>
<template>
    <v-col cols="12" sm="6" md="3" xl="2">
        <v-card>
            <v-img :lazy-src="gallery.lazy_img" :src="item['@microsoft.graph.downloadUrl']" :aspect-ratio="1 / 1" cover
                @click="show"></v-img>
            <v-card-title>{{ name }}</v-card-title>
            <v-card-text>
                <div>作者: {{ author }}</div>
                <div>日期: {{ time }}</div>
            </v-card-text>
            <v-card-actions class="actions">
                <v-btn variant="text" append-icon="mdi-heart-outline" @ckicl="add_like">{{ like }}</v-btn>
            </v-card-actions>
        </v-card>

    </v-col>
</template>
<script lang='ts'>

export default {
    name: 'IndexGallery',
}
</script>
<style lang='less' scoped>
.actions {
    display: flex;
    justify-content: flex-end;
}
</style>