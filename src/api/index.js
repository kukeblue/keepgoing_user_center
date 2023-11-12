import { post, get } from '@/utils/request'
import useAuthStore from '@/store/authStore'
import useSettingStore from '@/store/settingStore'



export function fetchSession() {
    return post({
        url: '/api/user',
    })
}
