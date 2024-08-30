import axios from 'axios'

import { useAuthStore } from '@/stores/auth-store'
import { useToast } from 'primevue/usetoast'

export default {
  install: (app, options) => {
    const auth = useAuthStore()

    const client = {
      http: (o = {}) => {
        const instance = axios.create({ baseURL: '/' })

        return instance
      },
      api: (o = {}) => {
        const authHeader = `bearer ${auth.jwt}`

        const instance = axios.create({
          baseURL: config.api.baseUrl,
          headers: { authorization: authHeader }
        })

        if (typeof o.noIntercept === 'undefined' || !o.noIntercept) {
          instance.interceptors.response.use(
            (res) => res,
            (err) => {
              if (err.response?.status) {
                const toast = useToast()
                toast.add({
                  severity: 'error',
                  summary: 'Erro de conexão',
                  detail: 'Necessário efetuar acesso',
                  life: 3000
                })
                console.error('Erro de conexão: Necessário efetuar acesso', err)
                options.router.push('/login')
              }

              return Promise.reject(err)
            }
          )
        }

        return instance
      }
    }

    app.provide('httpClient', client)
  }
}
