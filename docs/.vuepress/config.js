import { blogPlugin } from "@vuepress/plugin-blog";
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  // locales: {
  //   // 键名是该语言所属的子路径
  //   // 作为特例，默认语言可以使用 '/' 作为其路径。
  //   "/": {
  //     lang: "zh-CN",
  //     title: "VuePress",
  //     description: "Vue 驱动的静态网站生成器",
  //   },
  //   "/en/": {
  //     lang: "en-US",
  //     title: "VuePress",
  //     description: "Vue-powered Static Site Generator",
  //   },
  // },
  title: "Yunshenw",
  description: "Yunsw site",

  theme: defaultTheme({
    home: "/article/",
    logo: "/logo.png",
    // repo: "",
    // https://ecosystem.vuejs.press/zh/themes/default/config.html#sidebar
    // false | 'auto' | SidebarConfigArray | SidebarConfigObject
    sidebar: "auto",
    sidebarDepth: 2,
    editLink: false, // 是否启用 编辑此页 链接。
    // hostname: "https://vuepress.vuejs.org",
    colorMode: "auto",
    colorModeSwitch: true,
    // locales: {
    //   "/": {
    //     selectLanguageName: "简体中文",
    //   },
    //   "/en/": {
    //     selectLanguageName: "English",
    //   },
    // },
    navbar: [
      // '/',
      {
        text: "文章",
        link: "/article/",
      },
      {
        text: "分类",
        link: "/category/",
      },
      {
        text: "标签",
        link: "/tag/",
      },
      {
        text: "时间线",
        link: "/timeline/",
      },
    ],
  }),

  plugins: [
    searchProPlugin({
      customFields: [
        {
          name: "author",
          getter: (page) => page.frontmatter.author,
          formatter: "作者：$content",
        },
        {
          name: "title",
          getter: (page) => page.frontmatter.author,
          formatter: "标题：$content",
        },
      ],
    }),
    blogPlugin({
      // Only files under posts are articles
      // 筛选出所有的文章页面
      filter: ({ filePathRelative }) => (filePathRelative ? filePathRelative.startsWith("posts/") : false),

      // Generate excerpt for all pages excerpt those users choose to disable
      // 筛选出frontmattter中没有home且有excerpt且excerpt不是自定义的excerpt.
      // 为这些文章生成excerpt <--more-->
      excerptFilter: ({ frontmatter }) =>
        !frontmatter.home && frontmatter.excerpt !== false && typeof frontmatter.excerpt !== "string",

      // Getting article info
      getInfo: ({ frontmatter, title, data }) => ({
        title,
        author: frontmatter.author || "",
        date: frontmatter.date || null,
        // category: frontmatter.categories || [],
        category: Array.isArray(frontmatter.categories)
          ? frontmatter.categories
          : frontmatter.categories
          ? [frontmatter.categories]
          : [],
        tag: frontmatter.tags || [],
        excerpt:
          // Support manually set excerpt through frontmatter
          typeof frontmatter.excerpt === "string" ? frontmatter.excerpt : data?.excerpt || "",
      }),

      category: [
        {
          key: "category",
          getter: (page) =>
            Array.isArray(page.frontmatter.categories)
              ? page.frontmatter.categories
              : page.frontmatter.categories
              ? [page.frontmatter.categories]
              : [],
          layout: "Category",
          itemLayout: "Category",
          frontmatter: () => ({
            title: "Categories",
            sidebar: false,
          }),
          itemFrontmatter: (name) => ({
            title: `Category ${name}`,
            sidebar: false,
          }),
        },
        {
          key: "tag",
          getter: (page) => page.frontmatter.tags || [],
          layout: "Tag",
          itemLayout: "Tag",
          frontmatter: () => ({
            title: "Tags",
            sidebar: false,
          }),
          itemFrontmatter: (name) => ({
            title: `Tag ${name}`,
            sidebar: false,
          }),
        },
      ],

      type: [
        {
          key: "article",
          // Remove archive articles
          filter: (page) => !page.frontmatter.archive,
          layout: "Article",
          frontmatter: () => ({
            title: "Articles",
            sidebar: false,
          }),
          // Sort pages with time and sticky
          sorter: (pageA, pageB) => {
            if (pageA.frontmatter.sticky && pageB.frontmatter.sticky) return pageB.frontmatter.sticky - pageA.frontmatter.sticky;

            if (pageA.frontmatter.sticky && !pageB.frontmatter.sticky) return -1;

            if (!pageA.frontmatter.sticky && pageB.frontmatter.sticky) return 1;

            if (!pageB.frontmatter.date) return 1;
            if (!pageA.frontmatter.date) return -1;

            return new Date(pageB.frontmatter.date).getTime() - new Date(pageA.frontmatter.date).getTime();
          },
        },
        {
          key: "timeline",
          // Only article with date should be added to timeline
          filter: (page) => page.frontmatter.date instanceof Date,
          // Sort pages with time
          sorter: (pageA, pageB) => new Date(pageB.frontmatter.date).getTime() - new Date(pageA.frontmatter.date).getTime(),
          layout: "Timeline",
          frontmatter: () => ({
            title: "Timeline",
            sidebar: false,
          }),
        },
      ],
      hotReload: true,
    }),
  ],

  bundler: viteBundler(),
});
