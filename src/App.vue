<template>
  <div class="h-screen w-screen flex">
    <div class="w-1/4 bg-gray-800">
      <!-- サイドバーの内容 -->
      <div class="p-4">
        <button class="px-4 py-2 bg-blue-500 text-white rounded font-semibold">
          サイドバーのボタン
        </button>
      </div>
    </div>
    <div class="flex-1 flex-col h-full bg-gray-700 p-4">
      <div class="flex-1 h-full overflow-auto">
        <!-- メインコンテンツの内容 -->
        <div class="w-full h-full bg-blue-600">
          <HelloWorld msg=" Welcome to Your Vue.js App"/>
        </div>
      <div class="sticky bottom-0 bg-gray-700">
        <div class="flex p-2">
          <textarea
            ref="inputTextarea"
            v-model="message"
            class="flex-grow text-white  bg-gray-800 rounded px-4 py-2 mr-2 focus:outline-none no-scrollbar"
            :rows="textRows"
            @input="adjustTextRows"
            @keydown.enter.shift="insertNewLine"
            @keydown.enter.exact="sendMessage"
            type="text"
            placeholder="Send a message."
          ></textarea>
          <button
            class="flex px-4 py-2 bg-gray-800 text-white rounded font-semibold"
            @click="sendMessage"
          >
            Send
          </button>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data() {
    return {
      message: '',
      textRows: 1,
    };
  },
  components: {
    HelloWorld
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();
      this.message = '';
      this.adjustTextRows();
      this.textRows = 1;
      this.$refs.inputTextarea.style.height = '';
    },
    adjustTextRows() {
      const textarea = this.$refs.inputTextarea;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
      this.textRows = textarea.rows;
    }
  }
}
</script>

<style>
#app {
  display: flex;
}
</style>
