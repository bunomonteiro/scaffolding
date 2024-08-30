<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import * as Joi from 'joi'

import { useAuthStore } from '@/stores/auth-store'
import { joiMessages, getError } from '@/shared/utils/joi-utils'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

/**
 * View data
 * - stores all data
 * - just stores
 * - has no knowledge of View and ModelView
 */
const model = ref({
  username: null,
  password: null,

  errors: {
    username: null,
    password: null,
  }
})

/**
 * Connects the View and the Model
 * - listens to view events
 * - changes model data
 * - calls external services
 * - it can provide auxiliary data that is not part of the model (like computed data)
 */
const viewModel = {
  formSchema: Joi.object({
    username: Joi.string().min(3).max(32).required().label('Email'),
    password: Joi.string().min(5).max(100).required().label('Senha'),
  }).required().label('Formulário').messages(joiMessages),
  
  doLogin() {
    viewModel.clearValidations()

    const validation = viewModel.formSchema.validate({ 
      username: model.value.username,
      password: model.value.password,
    })

    if (validation.error) {
      model.value.errors.username = getError(validation, 'username')
      model.value.errors.password = getError(validation, 'password')
      return;
    }

    auth.login({
      jwt: '<token>',
      user: { firstName: 'User', surname: 'Something Anything', email: 'user@mail.com', avatar: 'https://randomuser.me/api/portraits/women/17.jpg' }
    })

    router.replace(route.query.returnUrl || '/app')
  },

  goToPasswordRecovery() {
    router.push({ path: '/auth/password-recovery' })
  },

  goToSignup() {
    router.push({ path: '/auth/signup' })
  },

  clearValidations() {
    model.value.errors.username = null
    model.value.errors.password = null
  }
}
</script>

<template>
  <div class="page-login h-full min-h-screen grid grid-cols-12 flex items-center overflow-hidden">
    <div class="block pb-12 px-12 border dark:border-zinc-950 rounded-lg bg-white dark:bg-zinc-900 col-span-12 sm:col-start-2 sm:col-span-10 sm:col-start-4 sm:col-span-6 lg:col-start-5 lg:col-span-4 xl:col-start-6 xl:col-span-3">
      <div class="flex min-h-auto flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto">
          <img class="mx-auto h-10 w-auto" src="/images/logo.png">
          <h2 class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight">Efetuar acesso</h2>
        </div>
      </div>

      <main class="mt-5 overflow-hidden">
        <form class="space-y-6" action="#" method="POST">
          <div>
            <label for="email" class="block text-sm font-medium leading-6">E-mail</label>
            <div class="mt-2">
              <InputText id="email" v-model="model.username" type="email" autocomplete="email" required :invalid="model.errors.username?.invalid"
                class="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-700 sm:text-sm sm:leading-6">
              </InputText>
              <Message v-if="model.errors.username?.invalid" severity="error" class="mt-1 text-xs">{{ model.errors.username.message }}</Message>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="currentPassword" class="block text-sm font-medium leading-6">Senha</label>
              <div class="text-sm">
                <a href="#" class="font-semibold text-primary-500 hover:text-primary-700" @click.prevent="viewModel.goToPasswordRecovery()">Esqueceu a senha?</a>
              </div>
            </div>
            <div class="mt-2">
              <Password inputId="currentPassword" v-model="model.password" :feedback="false" toggleMask class="w-full" required :invalid="model.errors.password?.invalid"
                inputClass="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-primary-400 focus:ring-2 focus:ring-inset focus:ring-primary-700 sm:text-sm sm:leading-6">
              </Password>
              <Message v-if="model.errors.password?.invalid" severity="error" class="mt-1 text-xs">{{ model.errors.password.message }}</Message>
            </div>
          </div>

          <div>
            <Button
              class="w-full !bg-primary-500 !text-sm font-semibold leading-6 !text-white hover:!bg-primary-700 hover:!border-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
              @click="viewModel.doLogin()">
              Entrar
            </Button>
          </div>
        </form>
        <p class="mt-10 text-center text-sm">
          Não tem conta?
          <a href="#" class="font-semibold leading-6 text-primary-500 hover:text-primary-700" @click.prevent="viewModel.goToSignup()">Cadastre-se</a>
        </p>
      </main>
    </div>
  </div>
</template>

<style scoped></style>