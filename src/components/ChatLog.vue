<template>
  <ul>
    <li v-for="(message, index) in messages" :key="index">
      <div v-if="message.role === 'user'" class="p-2 text-right">
        <div class="bg-gray-600 rounded p-4 text-white inline-block border-l-4 border-blue-400 relative">
          <button @click="$emit('trash', index)" class="fas fa-trash-can absolute right-1 top-1 text-xs text-gray-400" />
          <div class="markdown-content prose" v-html="renderedMarkdown(message.content)" v-if="!message.raw" />
        </div>
      </div>
      <div v-if="message.role === 'assistant'" class="p-2">
        <div class="bg-gray-600 rounded p-4 text-white inline-block border-l-4 border-green-400 relative">
          <button @click="$emit('toggle', index)" class="fas fa-code absolute left-1 top-1 text-xs text-gray-400" />
          <div class="markdown-content prose" v-html="renderedMarkdown(message.content)" v-if="!message.raw" />
          <pre><div v-if="message.raw">{{ message.content }}</div></pre>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { marked } from 'marked';
import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Md5 } from 'ts-md5';
import hljs from 'highlight.js';
import 'highlight.js/styles/darcula.css';

type Message = {
  role: string
  content: string
  raw: boolean
}

export default class ChatLog extends Vue {
  @Prop() messages!: Message[];

  codes: Map<string, string> = new Map();
  eventListeners: Map<string, () => void> = new Map();

  renderedMarkdown(content: string): string {
    const markdown = marked(content);

    const renderer = new marked.Renderer();

    renderer.heading = (text, level) => {
      console.log(level);
      const classLevel = (() => 
      {
        switch (level) {
          case 1:
            return 'text-4xl font-extrabold mt-4 mb-4';
          case 2:
            return 'text-3xl font-extrabold mt-3 mb-3';
          case 3:
            return 'text-2xl font-bold mt-2 mb-2';
          case 4:
            return 'text-xl font-bold mt-2 mb-2';
          case 5:
            return 'text-lg font-bold mt-1 mb-1';
          case 6:
            return 'text-base font-bold mt-1 mb-1';
          default:
            return '';
        }
      })();
      return `<h${level} class="${classLevel}">${text}</h${level}>\n`;
    }

    renderer.list = (body, ordered, start) => {
      const type = ordered ? 'ol' : 'ul';
      const startatt = (ordered && start !== 1) ? (' start="' + start + '"') : '';
      const listClass = ordered ? "list-decimal" : "list-disc";
      return '<' + type + startatt + ` class="${listClass} ml-2 mt-2 mb-2"` + '>\n' + body + '</' + type + '>\n';
    }

    renderer.listitem = (text) => {
      return `<li class="font-normal ml-4">${text}</li>\n`;
    }
        
    renderer.table = (header, body) => {
      return `
      <div class="p-2">
        <div class="border bg-gray-700 border-white rounded inline-block">
            <table class="border-collapse table-auto">
            <thead class="bg-gray-600">
                ${header}
            </thead>
            ${body}
            </table>
        </div>
      </div>
      `;
    }

    renderer.tablerow = (content) => {
      return `<tr>\n${content}</tr>\n`;
    }

    renderer.tablecell = (content, flags) => {
      const type = flags.header ? 'th' : 'td';
      const cellClass = flags.header ? "border-l p-1" : "border-l border-t p-1";
      const tag = flags.align
        ? `<${type} class="${cellClass}" align="${flags.align}">`
        : `<${type} class="${cellClass}">`;
      return tag + content + `</${type}>\n`;
    }

    renderer.codespan = (text) => {
      return ` <code class="bg-gray-700 p-1 rounded">${text}</code> `;
    }

    renderer.code = (code, lang) => {
      const hash = Md5.hashStr(code + '_md5');
      this.codes.set(hash, code);
      if (lang) {
        code = hljs.highlight(lang, code).value.trim();
      }
      else {
        code = hljs.highlightAuto(code).value.trim();
      }
      return `
      <div class="p-2">
        <div class="flex bg-gray-700 rounded-t p-1 text-sm">
          <div class="flex-grow inline-block text-left ml-1">${lang}</div>
          <button class="fas fa-copy mr-2" id="copyButton-${hash}" />
        </div>
        <pre class="bg-gray-950 rounded-b p-2 flex"><code class=language-${lang} overflow-x-scroll max-w-2xl text-left codeblock">${code}</code></pre>
      </div>
      `;
    };

    marked.setOptions({
      renderer: renderer
    });

    return markdown;
  }
  mounted() {
    this.setCopyButton();
  }
  updated() {
    this.setCopyButton();
  }
  setCopyButton() {
    const copyButtons = document.querySelectorAll('[id^="copyButton-"]');
    copyButtons.forEach((copyButton) => {
      const hash = copyButton.id.replace(/^copyButton-/, '');
      const beforeFunc = this.eventListeners.get(hash);
      if (beforeFunc) {
        copyButton.removeEventListener('click', beforeFunc);
      }
      const listenerFunc = () => {
        let code = this.codes.get(hash);
        if(!code) {
            return;
        }
        navigator.clipboard.writeText(code)
        .then(() => {
          alert('Copied!');
        });
      };
      copyButton.addEventListener('click', listenerFunc);
      this.eventListeners.set(hash, listenerFunc);
    });
  }
}
</script>

<style>
ul li::marker,
ol li::marker {
  font-weight: bold;
}
a {
  font-weight: bold;
  text-decoration: underline;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #6b7280;
}
</style>
