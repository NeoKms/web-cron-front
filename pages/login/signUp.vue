<template>
  <div v-if="verifySent">
    <!--    <sign-up-form v-model:email="email" />-->
  </div>
  <div v-else>
    <verify-email v-model:email="email" />
    {{ email }}
  </div>
</template>

<script lang="ts" setup>
import { definePageMeta } from '#imports'
// import SignUpForm from '~/components/signUp/signUpForm.vue'
import VerifyEmail from '~/components/signUp/verifyEmail.vue'

definePageMeta({
  layout: 'login'
})
const verifySent = ref(false)
const email = ref<string>('kk')

const features = [
  {
    name: 'Push to deploy.',
    description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.'
  },
  {
    name: 'SSL certificates.',
    description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.'
  },
  {
    name: 'Database backups.',
    description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.'
  }
]
</script>

<style scoped>

</style>
