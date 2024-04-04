<script setup>
import Pagination from "../components/Pagination.vue";
import { computed, reactive, onMounted } from "vue";
function getUrlParams(search = window.location.search) {
  const params = new URLSearchParams(search);
  const queryParams = {};
  for (const [key, value] of params) {
    queryParams[key] = value;
  }
  return queryParams;
}
const props = defineProps({
  /** Article items */
  items: {
    type: Array,
    required: true,
  },
  /** Whether is timeline or not */
  isTimeline: Boolean,
});

const pagination = reactive({
  currentPage: 1,
  articlesPerPage: 5,
});

// 在组件挂载时设置 currentPage
onMounted(() => {
  const queryParams = getUrlParams();
  const page = parseInt(queryParams.page, 10) || 1;
  if (!isNaN(page)) {
    pagination.currentPage = page;
  }
});

const paginatedArticles = computed(() => {
  const start = (pagination.currentPage - 1) * pagination.articlesPerPage;
  const end = start + pagination.articlesPerPage;
  console.log(start, end, props.items.length);
  return props.items.slice(start, end);
});

function updatePage(pageNumber) {
  pagination.currentPage = pageNumber;
}
</script>

<template>
  <div class="article-wrapper">
    <div class="article-item">
      <div v-if="!paginatedArticles.length">Nothing in here.</div>
      <article
        v-for="{ info, path } in paginatedArticles"
        :key="path"
        class="article"
        @click="$router.push(path)"
      >
        <div class="article-title">
          <header class="title">
            {{
              (isTimeline
                ? `${new Date(info.date).toLocaleDateString()}: `
                : "") + info.title
            }}
          </header>
        </div>

        <hr />

        <div class="article-info">
          <span v-if="info.author" class="author"
            >Author: {{ info.author }}</span
          >

          <span v-if="info.date && !isTimeline" class="date"
            >Date: {{ new Date(info.date).toLocaleDateString() }}</span
          >

          <span v-if="info.categories" class="category"
            >Category:
            {{
              Array.isArray(info.categories)
                ? info.categories.join(", ")
                : [info.categories].join(", ")
            }}
          </span>

          <span v-if="info.tags" class="tag"
            >Tag: {{ info.tags.join(", ") }}</span
          >
        </div>
        <div v-if="info.excerpt" class="excerpt" v-html="info.excerpt" />
      </article>
    </div>
    <div class="article-pagination">
      <Pagination
        :total-items="items.length"
        :items-per-page="pagination.articlesPerPage"
        :current-page="pagination.currentPage"
        @update:page="updatePage"
      />
    </div>
  </div>
</template>

<style lang="scss">
@use "@vuepress/theme-default/styles/mixins";

.article-pagination {
  display: flex;
  justify-content: center;
}

.article {
  border: none !important;
}

html {
  --font-family-code: monospace, Consolas, Monaco, "Andale Mono", "Ubuntu Mono";
}

.article-wrapper {
  @include mixins.content_wrapper;
  text-align: center;
}

.theme-default-content pre code,
.theme-default-content pre[class*="language-"] code {
  color: #7aa1c9 !important;
  font-family: monospace, Consolas, Monaco, "Andale Mono", "Ubuntu Mono";
  font-size: 0.9rem;
}

.article {
  position: relative;

  box-sizing: border-box;

  width: 100%;
  margin: 0 auto 1.25rem;
  padding: 1rem 1.25rem;
  border: 1px solid var(--c-border);
  border-radius: 0.4rem;
  color: var(--c-text);

  text-align: start;

  @media (max-width: 419px) {
    border-radius: 0;
  }

  &:hover {
    cursor: pointer;
  }

  .article-title {
    padding: 0.5rem 0;
    display: flex;
    justify-content: center;
    .title {
      position: relative;

      display: inline-block;

      font-size: 2rem;
      line-height: 2rem;

      &::after {
        content: "";

        position: absolute;
        bottom: 0;
        inset-inline-start: 0;

        width: 100%;
        height: 2px;

        background: var(--c-brand);

        visibility: hidden;

        transition: transform 0.3s ease-in-out;
        transform: scaleX(0);
      }

      &:hover {
        &::after {
          visibility: visible;
          transform: scaleX(1);
        }
      }

      a {
        color: inherit;
      }
    }
  }

  .article-info {
    display: flex;
    flex-shrink: 0;

    > span {
      margin-inline-end: 0.5em;
      line-height: 1.8;
    }
  }

  .excerpt {
    h1 {
      display: none;
    }

    h2 {
      font-size: 1.2em;
    }

    h3 {
      font-size: 1.15em;
    }

    p code {
      color: #1b5187 !important;
      font-family: monospace, Consolas, Monaco, "Andale Mono", "Ubuntu Mono";
      font-size: 0.88rem;
    }
    pre code {
      color: #7aa1c9 !important;
      background-color: transparent !important;
      font-family: monospace, Consolas, Monaco, "Andale Mono", "Ubuntu Mono";
      font-size: 0.9rem;
    }

    ::v-deep(p code) {
      color: #1b5187 !important;
    }
    ::v-deep(pre code) {
      color: #7aa1c9 !important;
      background-color: transparent !important;
      font-family: var(--font-family-code);
      font-size: 0.9rem;
    }
  }
}
</style>
