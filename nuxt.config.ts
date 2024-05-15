// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: "Task Menager",
            link: [
                {rel: 'icon', type: 'image/x-icon', href: '/favicon.png'}
            ]
        },
    },
    modules: [
        '@pinia/nuxt',
    ],
    css: [
        '@/assets/style/fonts.scss',
        '@/assets/style/normalize.scss',
        '@/assets/style/main.scss',
        '@/assets/style/lists.scss',
        '@/assets/style/menu/buttons.scss',
        '@/assets/style/menu/modal.scss',
        '@/assets/style/profile/profile.scss',
        '@/assets/style/profile/profile-editor.scss',
        '@/assets/style/task/task.scss',
        '@/assets/style/todo/todo.scss',
        '@/assets/style/form.scss',
        '@/assets/style/animations.scss',
        '@/assets/style/loader/loader.scss',
    ],
    vite: {
        css: {
          preprocessorOptions: {
            scss: {
              additionalData: '@import "@/assets/style/variables.scss"; @import "@/assets/style/mixin";'
            }
          }
        }
      },

})
