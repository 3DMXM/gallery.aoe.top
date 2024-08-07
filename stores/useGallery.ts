import axios from 'axios';

export const useGallery = defineStore('Gallery', {
    state: () => ({
        userList: [] as any[],
        user: '1.饮月',
        galleryList: [] as any[],
        lazy_img: 'https://mod.3dmgame.com/assets/image/lazy_img.webp',
        show: false,
        window: 0
    }),
    actions: {
        async GetUserList() {
            let { data } = await axios.post('/api/GetItem', { path: [''] })

            if (data.code == '00') {
                this.userList = data.data.map((item: any) => {
                    // item.name = 1.饮月
                    // name = 饮月
                    let name = item.name.split('.')[1]
                    return {
                        value: item.name,
                        name: name
                    }
                })
            }
        },
        async GetGalleryList() {
            let { data } = await axios.post('/api/GetItem', { path: [this.user] })
            if (data.code == '00') {
                this.galleryList = data.data
            }
        }
    }
})