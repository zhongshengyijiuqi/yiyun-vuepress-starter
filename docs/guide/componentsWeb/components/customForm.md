### 引入使用

```html
<!-- (v1.2.6版本开始废弃) -->
<!-- 设置模式  -->
  <yiyun-customForm
    :type="set"
    :title="title"
    :emptyUrl="emptyUrl"
    :form="form"
    :componentList="componentList"
    :controlList="controlList"
    @save="save"
  ></yiyun-customForm>
```
```html
<!-- 预览模式  -->
  <yiyun-customForm
    type="look"
    :emptyUrl="require('@/assets/images/common/empty.png')"
    :form="form"
  ></yiyun-customForm>

```

### 传入数据

```js
export default {
  name: "CustomForm",
  data() {
    return {
      //自定义表单模式(不传默认为set设置模式,传type且type值不为set则为预览模式如:look)
      type:'look',
      //自定义表单标题
      title:'报工单设置',
      //表单内容为空时展示的图片
      emptyUrl:require('@/assets/images/xxx.png'),
      //表单详情信息(直接传表单详情api调用过来数据即可)
      form: null,
      /* 表单可选图标库(格式如下,但不需要传)
         原因：现在使用的是iconfont而不是类似上传到oss的图片,如果要传
         组件库（子组件）跟开发的项目（父组件）都要引入共同的一份icon
         所以暂时默认使用组件库（子组件）一份图标 不使用父子传值方式
      */
      iconList: [        
        {
          color: "#1CBE8B",
          icon: encodeURI("\ue685"),
        }
      ],
      //表单所有可选组件(直接传接口数据返回的数据集合即可)
      componentList: [],
      //表单所有可选控件(直接传接口数据返回的数据集合即可)
      controlList: [],
    };
  },
  methods: {
    //保存表单(返回的表单内容可直接调用api保存)
    save(data) {
      console.log(data);
    },
  }

};
```
### 控件/组件基础信息(controls)
| 参数名 | 参数说明 | 参数类型 | 可选值 |
| --- | --- | --- | --- | --- |
| show | 控件/组件的显示隐藏 | Boolean | true/false |
| belong | 控件/组件的标识<hr/>(control:控件 component:组件) | String | control/component |
| componentName | 控件名称 | String | / | 
| componentGroupName | 组件名称 | String | / | 
| type | Server端的控件/组件枚举<hr/>(0:批次号) | Number | / |
| icon | 控件/组件图标 | String | / |
| isCustom | 区分是明细控件中默认子控件<hr/>还是新添加的子控件 | Boolean | true/false |
| props | 前端自定义控件规则<hr/>具体规则参考下表 | Object | / |  

### 控件/组件规则(controls>props)
| 参数名 | 参数说明 | 参数类型 | 可选值 |
| --- | --- | --- | --- | --- |
| name | 控件名称 | String | any |
| tip | 控件提示文字 | String | any |
| required | 控件是否必填 | Boolean | true/false | 
| enterType | 输入方式 | String | 手动填写/扫码输入<hr/>单选/自动定位 | 
| textType | 文本样式(文本控件) | String | 单行文本/多行文本 |
| numberType | 数字格式(数字控件) | String | 整数/小数 |
| floatNumber | 小数点位数(数字控件) | String | 1-5 |
| unit | 单位(数字控件) | String | any |
| dateType | 显示方式(日期控件) | String | (年/月/日) <br/> (年/月/日 时:分:秒) |
| isOpen | 默认开关(判断控件) | Boolean | true/false |
| options | 添加选项(单选/多选控件) | Array | [{id:xx,value:xx}] |
| columnList | 显示字段(报工单信息/子批次信息控件) | Array | [{<br/>label:x,<br/> disabled:x,<br/> checked:x,<br/>sno:x,<br/>value:x}] |
| touchType | 触发方式(明细控件) | String | 直接添加/扫码添加 |
| controlList_default | 默认子控件(明细控件) | Array | 除明细外所有控件 |
| controlList_custom | 自定义子控件(明细控件) | Array | 除明细外所有控件 |
| controlList | 子控件(组件) | Array | 所有控件 |
| config | 控件/组件<hr/>设置项规则<hr/>具体规则参考下表 | Array | / |  

### 控件/组件设置项(props>config)
| 参数名 | 参数说明 | 参数类型 | 可选值 |
| --- | --- | --- | --- | --- |
| required | 控件设置项是否必填 | Boolean | true/false |
| label | 控件设置项名称 | String | any |
| showLabel | 控件设置项是否显示名称 | Boolean | true/false | 
| type | 控件设置项类型 | String | div/input/radio/checkbox<hr/>column/inputButton/tip | 
| value | 控件设置项默认值 | / | 根据控件设置项type而定 |
| options | 控件设置项内容选项 | Array | / |
| config_child | 选择控件设置项内容选项后的展示内容 | Object | / |

::: danger tip
  此协议仅供前端使用<br/>
  与后端联调需要转换数据结构
:::

### 控件举例
#### 文本控件
```json
{
    "show": true,
    "belong": "control",
    "componentName": "文本",
    "type": 9,
    "icon": "",
    "props": {
        "config": [
            {
                "required": true,
                "label": "控件名称",
                "showLabel": true,
                "type": "input",
                "value": "文本"
            },
            {
                "required": true,
                "label": "提示文字",
                "showLabel": true,
                "type": "input",
                "value": "请输入",
                "top": null,
                "left": null
            },
            {
                "required": false,
                "label": "文本样式",
                "showLabel": true,
                "type": "radio",
                "value": "单行文本",
                "options": [
                    {
                        "label": "单行文本",
                        "value": "单行文本"
                    },
                    {
                        "label": "多行文本",
                        "value": "多行文本"
                    }
                ]
            },
            {
                "required": false,
                "label": "是否必填",
                "showLabel": true,
                "type": "checkbox",
                "value": false,
                "options": [
                    {
                        "label": "必填",
                        "value": false
                    }
                ]
            },
            {
                "required": false,
                "label": "控件类型",
                "showLabel": true,
                "type": "div",
                "value": "文本"
            }
        ],
        "name": "文本",
        "tip": "请输入",
        "textType": "单行文本",
        "required": false
    }
}
```
