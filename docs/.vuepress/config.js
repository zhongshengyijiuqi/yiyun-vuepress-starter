
const sidebarConfig = require("./sidebarConfig");
module.exports = {
  base: "/docs-front/",
  title: '亦云应用前端文档',
  description: '组件、插件、片段、笔记',
  markdown: {
    anchor: { permalink: false },
    toc: { includeLevel: [1, 2, 3] },
    lineNumbers: true
  },
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  configureWebpack: {
    node: {
      global: true,
      process: true
    },
  },
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: 'ECMAScript 6', link: 'https://es6.ruanyifeng.com/' },
      { text: 'Vue3.0', link: 'https://composition-api.vuejs.org/zh/api.html#setup' },
      { text: 'TypeEScript', link: 'https://www.tslang.cn/docs/home.html' },
    ],
    sidebar: sidebarConfig
  }
}