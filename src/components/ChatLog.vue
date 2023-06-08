<template>
  <ul>
    <li v-for="(message, index) in messages" :key="index">
      <div v-if="message.role === 'user'" class="p-2 text-right">
        <div class="bg-gray-600 rounded px-4 pt-5 pb-4 text-white inline-block border-l-4 border-blue-400 relative">
          <button @click="$emit('trash', index)" class="fas fa-trash-can absolute left-1 top-1 text-xs text-gray-400" />
          <button @click="edit(index, false)" class="far fa-pen-to-square absolute left-5 top-1 text-xs text-gray-400" />
          <div class="whitespace-pre-wrap text-left" v-if="editIndex !== index">{{ message.content }}</div>
          <div v-if="editIndex === index" class="flex flex-col">
            <textarea v-model="edittingMessage" class="border-gray-00 bg-gray-700 border-wi rounded border-2 px-2 py-2 resize-none" style="width: 50vw; height: 10em" type="text" />
            <div class="p-1 self-end">
              <button
                class="flex px-4 py-2 bg-gray-800 text-white rounded font-semibold text-sm"
                @click="edit(index, true)"
                v-if="!asking"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="message.role === 'assistant'" class="p-2">
        <div class="bg-gray-600 rounded px-4 pt-5 pb-4 text-white inline-block border-l-4 border-green-400 relative">
          <button @click="$emit('toggle', index)" class="fas fa-code absolute left-1 top-1 text-xs text-gray-400" />
          <button @click="edit(index, false)" class="far fa-pen-to-square absolute left-5 top-1 text-xs text-gray-400" v-if="message.raw" />
          <button @click="$emit('regenerate')" class="fas fa-repeat absolute right-1 bottom-1 text-xs text-gray-400" v-if="index + 1 === messages.length && !asking" />
          <button @click="$emit('continue')" class="fas fa-play absolute right-5 bottom-1 text-xs text-gray-400" v-if="index + 1 === messages.length && !asking" />
          <button @click="$emit('interrupt')" class="fas fa-pause absolute right-1 bottom-1 text-xs text-gray-400" v-if="index + 1 === messages.length && asking" />
          <div class="markdown-content prose" v-html="renderedMarkdown(message.content)" v-if="!message.raw" />
          <pre class="whitespace-pre-wrap" v-if="message.raw && editIndex !== index"><div>{{ message.content }}</div></pre>
          <div v-if="editIndex === index" class="flex flex-col">
            <textarea v-model="edittingMessage" class="border-gray-00 bg-gray-700 border-wi rounded border-2 px-2 py-2 resize-none" style="width: 50vw; height: 10em" type="text" />
            <div class="p-1 self-end">
              <button
                class="flex px-4 py-2 bg-gray-800 text-white rounded font-semibold text-sm"
                @click="edit(index, true)"
                v-if="!asking"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { marked } from 'marked';
import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import katex from 'katex';
import { Md5 } from 'ts-md5';
import hljs from 'highlight.js';
import 'highlight.js/styles/darcula.css';
import 'katex/dist/katex.min.css'

type Message = {
  role: string
  content: string
  raw: boolean
}

export default class ChatLog extends Vue {
  @Prop() messages!: Message[];
  @Prop() asking!: boolean;

  codes: Map<string, string> = new Map();
  eventListeners: Map<string, () => void> = new Map();
  editIndex: number = -1;
  edittingMessage: string = "";

  renderedMarkdown(content: string): string {
    const renderer = new marked.Renderer();

    renderer.heading = (text, level) => {
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
    };

    renderer.list = (body, ordered, start) => {
      const type = ordered ? 'ol' : 'ul';
      const startatt = (ordered && start !== 1) ? (' start="' + start + '"') : '';
      const listClass = ordered ? "list-decimal" : "list-disc";
      return '<' + type + startatt + ` class="${listClass} ml-2 mt-2 mb-2"` + '>\n' + body + '</' + type + '>\n';
    };

    renderer.listitem = (text) => {
      return `<li class="font-normal ml-4">${text}</li>\n`;
    };
        
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
    };

    renderer.tablerow = (content) => {
      return `<tr>\n${content}</tr>\n`;
    };

    renderer.tablecell = (content, flags) => {
      const type = flags.header ? 'th' : 'td';
      const cellClass = flags.header ? "border-l p-1" : "border-l border-t p-1";
      const tag = flags.align
        ? `<${type} class="${cellClass}" align="${flags.align}">`
        : `<${type} class="${cellClass}">`;
      return tag + content + `</${type}>\n`;
    };

    renderer.codespan = (text) => {
      return ` <code class="bg-gray-700 p-1 rounded font-bold">${text}</code> `;
    };

    renderer.paragraph = (text) => {
      return `<p>${text}</p><br>`;
    }

    renderer.br = () => '<br>';

    renderer.code = (code, lang) => {
      const hash = Md5.hashStr(code + '_md5');
      this.codes.set(hash, code);
      if (lang) {
        code = hljs.highlight(lang, code).value.trim();
      }
      else {
        const highlightResult = hljs.highlightAuto(code);
        code = highlightResult.value.trim();
        lang = highlightResult.language;
      }
      return `
      <div class="p-2">
        <div class="flex bg-gray-700 rounded-t p-1 text-sm">
          <div class="flex-grow inline-block text-left ml-1">${lang}</div>
          <button class="fas fa-copy mr-2" id="copyButton-${hash}" />
        </div>
        <pre class="bg-gray-950 rounded-b p-2 flex whitespace-pre-wrap"><code class=language-${lang} overflow-x-scroll max-w-2xl text-left">${code}</code></pre>
      </div>
      `;
    };

    marked.setOptions({
      breaks: true,
      renderer: renderer
    });

    const markdown = marked(this.katexReplace(content));

    return markdown.replace(/(<br>\s*)+$/, '');
  }

  edit(index: number, fromButton: boolean) {
    if (this.editIndex === -1) {
      this.editIndex = index;
      this.edittingMessage = this.messages[index].content;
    } else {
      if(this.editIndex !== index) {
        return;
      }
      this.messages[index].content = this.edittingMessage;
      this.editIndex = -1;
      if (fromButton) {
        this.messages[index].raw = false;
      }
      this.$emit('edit');
    }
  }

  katexReplace(text: string) {
    const regex = /(```[\s\S]*?```|`[\s\S]*?`|\\\[[\s\S]*?\\\]|(?<=(^|\r|\n|\r\n)\s*?)\$\$[\s\S]*?\$\$(?=\s*?($|\r|\n|\r\n))|(?<=(^|\r|\n|\r\n)\s*?)\\\[[\s\S]*?\\\](?=\s*?($|\r|\n|\r\n))|(\$[^\r\n]+?\$))/g;
    return text.replace(regex, match => {
      if (match.startsWith("```") || match.startsWith("`")) {
        return match;
      }
      let mathExpr = match;
      if (match === "$$") {
        mathExpr = "";
      } else if (match.startsWith("$$") && match.trim().endsWith("$$")) {
        mathExpr = match.trim().substring(2, match.length - 2);
      } else if (match.startsWith("$") && match.trim().endsWith("$")) {
        mathExpr = match.trim().substring(1, match.length - 1);
      } else if (match.startsWith("\\[") && match.endsWith("\\]")) {
        mathExpr = match.substring(2, match.length - 2);
      }
      if (!mathExpr) {
        return mathExpr;
      }
      return katex.renderToString(mathExpr, {throwOnError: false});
    });
  }
    /*
    if (expr.match(/^\$\$[\s\S]*\$\$$/)) {
      expr = expr.substr(2, expr.length - 4)
      return katex.renderToString(expr, { displayMode: true, noannotation: true, throwOnError: false })
    } else if (expr.match(/^\$[\s\S]*\$$/)) {
      expr = expr.substr(1, expr.length - 2)
      return katex.renderToString(expr, { isplayMode: false })
    } else if (expr.match(/^\\\[[\s\S]*\\\]$/)) {
      expr = expr.substr(2, expr.length - 4);
      return katex.renderToString(expr, { displayMode: true, noannotation: true });
    }
    */

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
