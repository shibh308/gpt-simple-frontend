<template>
  <div class="h-screen w-screen flex max-w-full">
    <div class="w-1/4 bg-gray-800 flex flex-col">
      <div class="p-4">
        <button class="px-4 py-2 bg-gray-900 text-white rounded font-semibold w-full text-center"
          @click=newChat
        >
          <i class="fas fa-plus mr-2"></i>
          New Chat
      </button>
      </div>
      <div class="p-4 flex-1 w-full">
        <div v-for="(chatLog, index) in chatLogDatas" :key="index">
          <SideBarElement :title="chatLog.title" :index="index" :selected="index === this.activeIndex"
           @selected="handleSelected(index)" @delete="handleTrashSidebar(index)"
           @rename="handleRename" @duplicate="handleDuplicate(index)"
            />
        </div>
      </div>
      <div class="sticky bottom-0">
        <div class="border-t border-gray-600 ml-2 mr-2"/>
        <div class="p-4">
          <button class="px-4 py-2 bg-gray-900 text-white rounded font-semibold w-full text-center"
            @click=openModal
          >
            <i class="fas fa-cog mr-2"></i>
            Set API Key
        </button>
        </div>
      </div>
    </div>
    <div class="flex-1 flex-col h-full bg-gray-700 p-4">
      <div class="flex-1 h-full flex flex-col">
        <div class="flex-grow overflow-auto" ref="messageContainer">
          <div v-for="(chatLog, index) in chatLogDatas" :key="index">
            <ChatLog v-if="index === activeIndex" :id="index" :messages="chatLog.messages" :asking="asking"
             @trash="handleTrash(index, $event)" @interrupt="interruptPrompt"
             @regenerate="handleRegenerate" @continue="handleContinue"
             @toggle="handleRawMode(index, $event)" @edit="handleEdit" />
          </div>
        </div>
        <div class="flex-none bottom-0 bg-gray-700">
          <div class="ml-3 text-sm text-gray-300 flex items-center">
            <input type="checkbox" class="form-checkbox h-3 w-3 mr-1 bg-gray-500 border-gray-700 text-gray-900 rounded" v-model="useContext">
            use context
            <input type="checkbox" class="form-checkbox h-3 w-3 ml-1 mr-1 bg-gray-500 border-gray-700 text-gray-900 rounded" v-model="gpt4">
            GPT-4
          </div>
          <div class="flex p-2">
            <textarea
              ref="inputTextarea"
              v-model="prompt"
              class="flex-grow text-white  border-gray-600 bg-gray-800 rounded px-4 py-2 mr-2 no-scrollbar resize-none"
              :rows="textRows"
              @input="adjustTextRows"
              @keydown.enter.shift="insertNewLine"
              @keydown.enter.exact="sendPrompt"
              type="text"
              placeholder="Send a message."
            ></textarea>
            <button
              class="flex px-4 py-2 bg-gray-800 text-white rounded font-semibold"
              @click="sendPrompt"
              v-if="!asking"
            >
              Send
            </button>
            <button
              class="flex px-4 py-2 bg-gray-800 text-white rounded font-semibold"
              @click="interruptPrompt"
              v-if="asking"
            >
              Interrupt
            </button>
          </div>
          <div class="ml-3 text-gray-300 flex items-center text-xs">
            All data is saved in the browser's LocalStorage.
            The GitHub repositry is&nbsp;<a href="https://github.com/shibh308/gpt-simple-frontend">here</a>.
          </div>
        </div>
      </div>
    </div>
    <KeyInputModal v-if="keyModalVisible" @close="closeModal" />
    <div class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50" v-if="renameModalVisible">
      <div class="bg-gray-800 rounded p-4">
        <input
          id="renameModalInput"
          ref="inputTextarea"
          v-model="logName"
          class="text-white bg-gray-700 rounded px-4 py-2 mb-4 focus:outline-none"
          placeholder="Enter log name."
        >
        <div class="flex justify-end">
          <button class="px-4 py-2 bg-blue-500 text-white rounded font-semibold" @click="saveLogName">
            Save
          </button>
          <button class="px-4 py-2 bg-gray-300 text-gray-700 rounded ml-2" @click="renameModalVisible = false;">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import KeyInputModal from './components/KeyInputModal.vue';
import ChatLog from './components/ChatLog.vue';
import SideBarElement from './components/SideBarElement.vue';

type Message = {
  role: string
  content: string
  raw: boolean
}

class ChatLogData {
  title: string = '';
  messages: Message[] = [];

  constructor(title: string, messages: Message[]) {
    this.title = title;
    this.messages = messages;
  }
}

@Options({
  components: {
    KeyInputModal,
    ChatLog,
    SideBarElement,
  }
})

export default class App extends Vue {
  chatLogDatas: ChatLogData[] = [];
  activeIndex: number = 0;
  prompt: string = '';
  textRows: number = 1;
  logName: string = '';
  keyModalVisible = false;
  renameModalVisible = false;
  asking = false;
  interrupt = false;
  useContext = false;
  gpt4 = false;

  mounted() {
    this.loadFromStorage();
    this.$nextTick(() => {
      this.scroll();
    });
    this.$watch('activeIndex', (value) => {localStorage.setItem('activeIndex', value);});
    this.$watch('gpt4', (value) => {localStorage.setItem('gpt4', value);});
    this.$watch('useContext', (value) => {localStorage.setItem('useContext', value);});
  }

  loadFromStorage() {
    const activeIndex = localStorage.getItem('activeIndex');
    if (activeIndex) {
      const parsedActiveIndex = parseInt(activeIndex);
      if(parsedActiveIndex !== null) {
        this.activeIndex = parsedActiveIndex;
      }
    }
    this.useContext = localStorage.getItem('useContext') === 'true';
    this.gpt4 = localStorage.getItem('gpt4') === 'true';
    this.loadChatLogs();
  }

  loadChatLogs() {
    const logData = localStorage.getItem('chatLogDatas');
    if (!logData) {
      return;
    }
    this.chatLogDatas = JSON.parse(logData);
  }

  openModal() {
    this.keyModalVisible = true;
  }

  closeModal() {
    this.keyModalVisible = false;
  }

  handleSelected(index: number) {
    if (this.asking) {
      return;
    }
    this.activeIndex = index;
    this.updateLogNameVariable();
  }

  handleTrashSidebar(index: number) {
    if (this.asking) {
      return;
    }
    this.chatLogDatas.splice(index, 1);
    if (this.activeIndex === index) {
      if (this.activeIndex === 0) {
        this.activeIndex += 1;
      }
      else {
        this.activeIndex -= 1;
      }
    }
    if (index < this.activeIndex) {
      this.activeIndex -= 1;
    }
    this.updateLogNameVariable();
    this.saveChatLogs();
  }

  handleRename() {
    if (this.asking) {
      return;
    }
    this.renameModalVisible = true;
  }

  handleDuplicate(index: number) {
    if (this.asking) {
      return;
    }
    this.activeIndex = index;
    this.chatLogDatas.splice(this.activeIndex + 1, 0, this.chatLogDatas[this.activeIndex]);
    this.activeIndex += 1;
    this.updateLogNameVariable();
    this.saveChatLogs();
  }

  saveLogName() {
    this.chatLogDatas[this.activeIndex].title = this.logName;
    this.renameModalVisible = false;
  }

  updateLogNameVariable() {
    if (this.chatLogDatas[this.activeIndex]) {
      this.logName = this.chatLogDatas[this.activeIndex].title;
    }
  }

  handleTrash(index: number, msgIndex: number) {
    if (this.asking) {
      return;
    }
    const msgs =this.chatLogDatas[index].messages;
    msgs.splice(msgIndex, 1);
    while (msgIndex < msgs.length && msgs[msgIndex].role == 'assistant') {
      msgs.splice(msgIndex, 1);
    }
    this.chatLogDatas[index].messages = msgs;
    this.saveChatLogs();
  }

  handleRawMode(index: number, msgIndex: number) {
    this.chatLogDatas[index].messages[msgIndex].raw = !this.chatLogDatas[index].messages[msgIndex].raw;
  }

  handleEdit() {
    this.saveChatLogs();
  }

  newChat() {
    if (this.asking) {
      return;
    }
    this.chatLogDatas.splice(this.activeIndex + 1, 0, new ChatLogData('New Chat', []));
    if (this.activeIndex + 1 < this.chatLogDatas.length) {
      this.activeIndex += 1;
    }
    this.saveChatLogs();
  }

  saveChatLogs() {
    localStorage.setItem('chatLogDatas', JSON.stringify(this.chatLogDatas));
  }

  addContent(content: string) {
    const msgLength = this.chatLogDatas[this.activeIndex].messages.length;
    this.chatLogDatas[this.activeIndex].messages[msgLength - 1].content += content;
  }

  async ask(messages: Message[]) {
    const storedApiKey = localStorage.getItem('api-key');
    if (!storedApiKey) {
      alert('Please set your API key first.');
      return;
    }
    const apiKey: string  = storedApiKey;
    await fetch('https://api.openai.com/v1/chat/completions', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      method: 'POST',
      body: JSON.stringify({
        messages: messages.map(({role, content}) => ({'role': role, 'content': content})),
        model: this.gpt4 ? 'gpt-4' : 'gpt-3.5-turbo',
        stream: true
      })
    }).then(response => {

      if (!response.ok) {
        alert(`error: ${response.status}`);
      }
      const reader = response.body?.getReader();
      if(!reader) {
        return;
      }
      const decoder = new TextDecoder('utf-8');
      const read = async (): Promise<any> => {
        const { done, value } = await reader.read();
        if (this.interrupt) {
          this.interrupt = false;
          return reader.cancel();
        }
        if (done || this.interrupt) {
          return reader.releaseLock();
        }
        const chunk = decoder.decode(value, { stream: true });
        const contents = chunk
        .split('data:').map((data) => {
          const trimedData = data.trim();
          if (trimedData === '') return undefined;
          if (trimedData === '[DONE]') return undefined;
          return JSON.parse(trimedData);
        })
        .map((json) => {
          if (!json || !json.choices) {
            return undefined;
          }
          if (json.choices.length === 0) {
            return undefined;
          }
          const choice = json.choices[0];
          if (!choice.delta || !choice.delta.content) {
            return undefined;
          }
          return choice.delta.content;
        })
        .filter((data) => data);
        const msg_len = this.chatLogDatas[this.activeIndex].messages.length;
        this.chatLogDatas[this.activeIndex].messages[msg_len - 1].content += contents.join('');
        return read();
      };
      read().finally(() => {
        this.asking = false;
        this.saveChatLogs();
      })
    }).catch(error => {
      alert(`OpenAI API error: ${error.message}`);
      this.asking = false;
    });
  }

  interruptPrompt() {
    this.interrupt = true;
  }

  async handleRegenerate() {
    if(this.chatLogDatas.length === 0 || this.asking) {
      return;
    }
    if (localStorage.getItem('api-key') === null) {
      alert('Please set your API key.');
      return;
    }
    this.asking = true;
    this.chatLogDatas[this.activeIndex].messages.pop();
    this.chatLogDatas[this.activeIndex].messages.push({role: 'assistant', content: '', raw: false});
    const beforePrompt = this.chatLogDatas[this.activeIndex].messages[this.chatLogDatas[this.activeIndex].messages.length - 2];
    const messages = this.useContext
                   ? this.chatLogDatas[this.activeIndex].messages
                   : [beforePrompt];
    this.ask(messages);
  }

  async handleContinue() {
    if(this.chatLogDatas.length === 0 || this.asking) {
      return;
    }
    if (!localStorage.getItem('api-key')) {
      alert('Please set your API key.');
      return;
    }
    this.asking = true;
    const messages = this.useContext
                   ? this.chatLogDatas[this.activeIndex].messages
                   : this.chatLogDatas[this.activeIndex].messages.slice(-2);
    this.ask(messages);
  }

  async sendPrompt(e: Event) {

    e.preventDefault();

    if (this.chatLogDatas.length === 0) {
      alert('Please create new chat.');
      return;
    }
    if (this.asking) {
      return;
    }

    if (!localStorage.getItem('api-key')) {
      alert('Please set your API key.');
      return;
    }

    if (!this.prompt) {
      return;
    }

    this.asking = true;
    this.chatLogDatas[this.activeIndex].messages.push({role: 'user', content: this.prompt, raw: false});
    this.chatLogDatas[this.activeIndex].messages.push({role: 'assistant', content: '', raw: false});

    const messages = this.useContext
                   ? this.chatLogDatas[this.activeIndex].messages
                   : [{ role: "user", content: this.prompt, raw: false }];

    this.ask(messages);

    this.prompt = '';
    this.textRows = 1;
    (this.$refs.inputTextarea as HTMLTextAreaElement).style.height = '';

    this.$nextTick(() => {
      this.scroll();
    });
  }

  scroll() {
    const container = this.$refs.messageContainer as HTMLDivElement;
    container.scrollTop = container.scrollHeight;
  }

  adjustTextRows() {
    const textarea = this.$refs.inputTextarea as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    this.textRows = textarea.rows;
  }
}
</script>


<style>

</style>
