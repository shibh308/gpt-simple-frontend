<template>
  <div class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
    <div class="bg-gray-800 rounded p-4">
      <input
        ref="inputTextarea"
        v-model="message"
        class="text-white bg-gray-700 rounded px-4 py-2 mb-4 focus:outline-none"
        type="password"
        placeholder="Enter your API key."
      >
      <div class="flex justify-end">
        <button class="px-4 py-2 bg-blue-500 text-white rounded font-semibold" @click="saveMessage">
          Save
        </button>
        <button class="px-4 py-2 bg-gray-300 text-gray-700 rounded ml-2" @click="closeModal">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
export default class KeyInputModal extends Vue {
  message: string = '';
  mounted() {
      this.loadMessage();
  }
  loadMessage() {
      const savedMessage = localStorage.getItem('api-key');
      if (savedMessage) {
          this.message = savedMessage;
      }
  }
  saveMessage() {
    localStorage.setItem('api-key', this.message);
    this.closeModal();
  }
  closeModal() {
    this.message = '';
    this.$emit('close');
  }
}
</script>

<style scoped>
</style>
