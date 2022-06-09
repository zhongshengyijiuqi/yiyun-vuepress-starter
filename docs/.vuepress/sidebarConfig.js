const { getChildren } = require("./vuepress-sidebar-atuo/vuepress-sidebar-auto");
// var ber = getChildren('./docs', 'guide')
// console.log(ber[3].children[1], ber[3].children[7])
let sidebar = {};
/**
 * */
sidebar = {//左侧列表
  '/guide/': [
    {
      title: '文档',
      collapsable: false,//来让一个组永远都是展开状态
      sidebarDepth: 2,
      children: [
        {
          title: '1、亦云脚手架',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            ['yyTemplateCli/install.md', '安装'],
            ['yyTemplateCli/start.md', '快速上手']
          ]
        },
        {
          title: '2、移动端',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            ['componentsMobile/updateLog.md', '更新日志'],
            ['componentsMobile/install.md', '安装'],
            {
              title: '2-3、组件',
              collapsable: false,
              sidebarDepth: 2,
              children: [
                ['componentsMobile/components/blankPage.md', '空白页'],
                ['componentsMobile/components/upload.md', '上传图片'],
                ['componentsMobile/components/timePicker.md', '时间选择器'],
                ['componentsMobile/components/factoryModel.md', '工厂模型多选'],
                ['componentsMobile/components/factoryModelRadio.md', '工厂模型单选'],
                ['componentsMobile/components/framework.md', '部门人员单选'],
                ['componentsMobile/components/frameworkCheckbox.md', '部门人员多选'],
                ['componentsMobile/components/frameworkDepartment.md', '部门-人员多选'],
                ['componentsMobile/components/frameworkDepartmentRadio.md', '部门-人员单选'],
                ['componentsMobile/components/optionsPageCheckbox.md', '列表选择'],
              ]

            },
            {
              title: '2-4、片段',
              collapsable: false,
              sidebarDepth: 2,
              children: [
                ['componentsMobile/snippet/filtrate.md', '常规筛选'],
              ]

            },
            {
              title: '2-5、框架、插件',
              collapsable: false,
              sidebarDepth: 2,
              children: [
                // ['componentsMobile/nkthings/calendarJS.md', '3-3-1、calendarJS'],
              ]
            },
            {
              title: '2-6、其他',
              collapsable: false,
              sidebarDepth: 2,
              children: [
                ['componentsMobile/rests/qrCodeConnection.md', '新版二维码对接'],
                ['componentsMobile/rests/cloudPrint.md', '云打印对接'],
              ]
            }
          ]
        },
        {
          title: '3、PC端',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            ['componentsWeb/updateLog.md', '更新日志'],
            ['componentsWeb/install.md', '安装'],
            {
              title: '3-3、组件',
              collapsable: false,
              sidebarDepth: 2,
              children: [
                ['componentsWeb/components/datePicker.md', '时间选择器'],
                ['componentsWeb/components/empty.md', '暂无数据'],
                ['componentsWeb/components/levelModel.md', '层次模型'],
                ['componentsWeb/components/markdownDirectory.md', 'markdown目录'],
                ['componentsWeb/components/nodeCheck.md', '节点选择'],
                ['componentsWeb/components/notification.md', '消息通知栏'],
                ['componentsWeb/components/organization.md', '组织架构'],
                ['componentsWeb/components/customForm.md', '自定义表单']
              ]

            },
            {
              title: '3-4、片段',
              collapsable: false,
              sidebarDepth: 2,
              children: [
                ['componentsWeb/snippet/fields.md', '字段显示'],
                ['componentsWeb/snippet/provincialSelector.md', '省市区选择器'],
              ]

            },
            {
              title: '3-5、框架、插件',
              collapsable: false,
              sidebarDepth: 2,
              children: [
                ['componentsWeb/nkthings/calendarJS.md', 'calendarJS'],
                ['componentsWeb/nkthings/download.md', '文件下载'],
                // ['componentsWeb/nkthings/pdf.md', '3-5-3、pdf文件导出'],
                // ['componentsWeb/nkthings/word.md', '3-5-4、word文件导出'],
                ['componentsWeb/nkthings/xlsx.md', 'xlsx文件导出'],
                ['componentsWeb/nkthings/preview.md', '图片预览'],
                ['componentsWeb/nkthings/print.md', '打印']
              ]
            }
          ]
        },
        {
          title: '4、公共插件、组件',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            ['common/commonlyUsedRegular.md', '常用正则'],
            ['common/directives.md', 'vue常用指令'],
            ['common/postcss-pxtorem.md', 'postcss-pxtorem 使用'],
            ['common/compressImage.md', '图片压缩'],
            ['common/configOption.md', 'echarts配置'],
          ]
        },
        {
          title: '5、亦云应用前端公共资源',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            ['oss/yiyunResource.md', '网络图片'],
            // ['oss/zoomImage.md','图片缩放']
          ]
        },
        {
          title: '6、平台传包操作说明文档',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            ['platform/createAn.md', '如何创建企业内应用'],
            ['platform/smallKanban.md', '如何创建小看板'],
            ['platform/tvKanban.md', '如何配置tv看板'],
            ['platform/qrCodeEvent.md', '如何添加二维码事件'],
          ]
        },
        {
          title: '7、笔记',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            ['note/css.md', 'css'],
            ['note/es.md', 'es'],
            ['note/git.md', 'git'],
            ['note/js.md', 'js'],
            ['note/node.md', 'node'],
            ['note/npm.md', 'npm'],
            ['note/vue.md', 'vue'],
          ]
        }
      ]
    }
  ],
  '/': [''] //不能放在数组第一个，否则会导致右侧栏无法使用
};
module.exports = sidebar
