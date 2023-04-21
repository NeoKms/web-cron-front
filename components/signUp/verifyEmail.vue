<template>
  <div>
    <el-input v-model="emailLocal" @input="change()" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  email: {
    type: String,
    required: true
  }
})
const emailLocal = ref(props.email)
const emit = defineEmits(['update:email'])
const change = () => {
  emit('update:email', emailLocal.value)
}
</script>

<style scoped>

</style>
