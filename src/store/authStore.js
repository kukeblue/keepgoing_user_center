import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { getDate } from '../utils'

const useAuthStore = create(persist((set, get) => (
  {
    showLoginModal: false,
    token: '',
    session: null,
    userInfo: {},
    user: {},
    imageTasks: [
      {
        count: 7,
        file: "https://file.ap.mxcks.com/temporary/adee952a55e0eba7..png",
        message: "",
        prompt: "一只狗",
        status: 2,
        task_id: "750"
      }
    ],
    setImageTask: (imageTask) => set({ imageTask: imageTask }),
    setToken: (token) => set({ token: token }),
    setShowLoginModal: (showLoginModal) => set({ showLoginModal }),
    setSession: (session) => set({ session: session }),
    setUserInfo: (userInfo) => set({ userInfo: userInfo }),
    setUser: (user) => set({ user: user }),

    getIsVip: () => {
      const membership = get().user.membership
      if(membership && membership.vip == "V5") {
        return '永久会员'
      }
      if(!membership || !(membership.end_at)) {
        return false
      }else {
        const timestamp = membership.end_at * 1000 
        const now = new Date().getTime()
        if(timestamp > now) {
          return getDate(timestamp)
        }else {
          return false
        }
      }
  },
  }),
  {
    name: 'auth-storage',
    storage: createJSONStorage(() => localStorage),
  }
  ))


export default useAuthStore