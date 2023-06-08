<template>
  <div class="mt-auto w-full py-1">
    <button class="px-4 py-2 bg-gray-900 hover:bg-gray-700 text-white rounded w-full" v-if="selected"
      @click="$emit('selected', index)"
    >
      <div class="flex items-center">
        <div class="flex-grow text-white text-left font-bold">{{ title }}</div>
        <button class="far fa-copy right-1 top-1 mr-1 text-gray-400 text-center" @click="$emit('duplicate')" />
        <button class="far fa-pen-to-square right-1 top-1 mr-1 text-gray-400 text-center" @click="$emit('rename')" />
        <button class="far fa-trash-can right-1 top-1 text-gray-400 text-center" @click="clickTrashButton" />
      </div>
    </button>
    <button class="px-4 py-2 hover:bg-gray-600 text-white rounded w-full" v-if="!selected"
      @click="$emit('selected', index)"
    >
      <div class="flex items-center">
        <div class="flex-grow text-white text-left font-bold">{{ title }}</div>
        <button class="far fa-copy right-1 top-1 mr-1 text-gray-400 text-center" @click="duplicate" />
        <button class="far fa-pen-to-square right-1 top-1 mr-1 text-gray-400 text-center" @click="$emit('rename')" />
        <button class="far fa-trash-can right-1 top-1 text-gray-400 text-center" @click="clickTrashButton" />
      </div>
    </button>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

export default class SideBarElement extends Vue {
  @Prop() title!: string;
  @Prop() index!: number;
  @Prop() selected!: boolean;

  clickTrashButton(e: Event) {
    e.stopPropagation();
    this.$emit('delete', this.index);
  }
  duplicate(e: Event) {
    e.stopPropagation();
    this.$emit('duplicate', this.index);
  }
}
</script>

<style scoped>
</style>
