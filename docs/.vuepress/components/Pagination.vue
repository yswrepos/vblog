<script setup>
import { computed, defineProps, defineEmits } from "vue";

// 定义 props
const props = defineProps({
  totalItems: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
});

// 定义 emits
const emit = defineEmits(["update:page"]);

// 计算总页数
const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.itemsPerPage);
});

// 生成页码数组
// const pageNumbers = computed(() => {
//   const pages = [];
//   for (let i = 1; i <= totalPages.value; i++) {
//     pages.push(i);
//   }
//   return pages;
// });

const pageNumbers = computed(() => {
  const range = (start, end) =>
    Array.from({ length: end - start + 1 }, (v, k) => k + start);
  const sidePages = 2; // 当前页码两侧显示的页码数量
  let pages = [];

  // 始终显示第一页
  pages.push(1);

  // 计算要显示的页码范围
  let start = Math.max(2, props.currentPage - sidePages);
  let end = Math.min(totalPages.value - 1, props.currentPage + sidePages);

  // 如果当前页码附近的页码与第一页之间有间隔
  if (start > 2) pages.push("...");

  pages = pages.concat(range(start, end));

  // 如果当前页码附近的页码与最后一页之间有间隔
  if (end < totalPages.value - 1) pages.push("...");

  // 始终显示最后一页
  pages.push(totalPages.value);

  return pages;
});

// 页码点击事件
function emitPage(pageNumber) {
  const queryParams = new URLSearchParams(window.location.search);
  queryParams.set("page", pageNumber);
  window.location.search = queryParams.toString();
  emit("update:page", pageNumber);
}
</script>

<template>
  <nav class="pagination" v-if="totalPages > 1">
    <button
      v-for="pageNumber in pageNumbers"
      :key="pageNumber"
      @click="pageNumber !== '...' && emitPage(pageNumber)"
      :disabled="pageNumber === '...'"
      :class="{
        active: currentPage === pageNumber,
        'page-separator': pageNumber === '...',
      }"
    >
      {{ pageNumber }}
    </button>
  </nav>
</template>

<style scoped>
.pagination {
  display: flex;
  list-style: none;
  padding: 0;
}

.pagination button {
  cursor: pointer;
  padding: 10px;
  margin: 0 5px;
  border: 1px solid #ddd;
  background-color: #fff;
  transition: background-color 0.3s;
}

.pagination button:hover {
  background-color: #eee;
}

.pagination button.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}
</style>
