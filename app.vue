<script lang='ts' setup>

useHead({
    title: "饮月の画廊",
    link: [
        {
            rel: 'icon',
            href: 'https://mod.3dmgame.com/static/upload/mod/202307/MOD64a7767d0409f.png@webp'
        }
    ],
    meta: [
        {
            name: 'keywords',
            content: '饮月,画廊,二次元,图片'
        },
        {
            name: 'description',
            content: '饮月の画廊'
        }
    ]
})
</script>

<template>
    <v-app>
        <BassHeader></BassHeader>
        <v-main>
            <v-container>
                <NuxtPage />
            </v-container>
        </v-main>
    </v-app>
</template>
