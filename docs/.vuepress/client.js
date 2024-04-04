import { defineClientConfig } from "vuepress/client";
import Article from "./layouts/Article.vue";
import Category from "./layouts/Category.vue";
import Tag from "./layouts/Tag.vue";
import Timeline from "./layouts/Timeline.vue";

export default defineClientConfig({
  // we provide some blog layouts
  layouts: {
    Article,
    Category,
    Tag,
    Timeline,
  },
  enhance: ({ app, router, siteData }) => {
    router.beforeEach((to, from, next) => {
      if (to.path === "/") {
        next("/article/");
      } else {
        next();
      }
    });
  },
});
