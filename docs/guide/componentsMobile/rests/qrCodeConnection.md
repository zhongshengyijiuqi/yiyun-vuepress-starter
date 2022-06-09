#### 接口新增
common模块新增二维码相关接口
/Common/QR/GetList 获取应用创建的二维码列表(分页)

/Common/QR/GetInfo 获取二维码详情，码中由平台添加（isSystem=true）的数据和事件不能修改和删除

/Common/QR/Create 创建一个二维码,可以有多条数据

/Common/QR/CreateQr 创建一个二维码,可以有多条数据（与/Common/QR/Create区别是这个接口支持同企业跨应用，即在A企业调用B企业的二维码事件生成）

/Common/QR/BatchCreate 批量创建二维码,每个二维码只包含一条数据

/Common/QR/BatchCreateQr 批量创建二维码,每个二维码只包含一条数据（与/Common/QR/BatchCreate区别是这个接口支持同企业跨应用，即在A企业调用B企业的二维码事件批量生成）

/Common/QR/Edit 编辑二维码 码中由平台添加（isSystem=true）的数据和事件不能修改和删除

/Common/QR/EditQr 编辑二维码 码中由平台添加（isSystem=true）的数据和事件不能修改和删除（与/Common/QR/EditQr区别是这个接口支持同企业跨应用，即在A企业调用B企业的二维码事件编辑）

/Common/QR/Delete 删除二维码

/Common/QR/SetState 启用/禁用二维码

/Common/QR/SetStyle 设置样式

/Common/QR/GenerateQrImage 批量二维码生成图片，返回图片url

#### 前置条件
安装最新的亦云版本
安装最新的sdk（最低"yiyun-app-sdk": "^1.3.0"）
#### 页面调用
以巡点检的点检位置这个二维码事件为例，跨企业再加上设备的查看设备详情这个事件
> /Common/QR/Create接口request封装名为postCreateQR
> /Common/QR/CreateQr接口request封装名为postCreateCrossQR
#### 创建
``` js
// 单企业
let obj = {
  name: this.name,
  state: 0,
  datas: [
    {
      category: "自定义",
      fields: [
        {
          key: "检查单元编码",
          desc: "检查单元编码",
          value: this.id,
        },
        {
          key: "检查单元名称",
          desc: "检查单元名称",
          value: this.name,
        },
      ],
    },
  ],
  events: ["点检位置"],
};
await this.postCreateQR(obj);

// 跨企业
let obj = {
  name: this.name,
  state: 0,
  datas: [
    {
      category: "自定义",
      fields: [
        {
          key: "检查单元编码",
          desc: "检查单元编码",
          value: this.id,
        },
        {
          key: "检查单元名称",
          desc: "检查单元名称",
          value: this.name,
        },
      ],
    },
    {
      category: "自定义",
      fields: [
        {
          key: "设备编码",
          desc: "设备编码",
          value: this.code,
        },
      ],
    },
  ],
  events: [
    {
      appId: "43Hn7aP9zpP",
      eventName: "点检位置"
    },
    {
      appId: "4KsTtCSQ4fq",
      eventName: "查看设备详情"
    },
  ],
};
await this.postCreateCrossQR(obj);
```
> category为类目，自定义码传“自定义”，企业模型码传“工厂”
1. 现亦云应用扫码（即外部扫码）返回的参数格式仍为老的格式，无论扫描的新码还是老码返回的都是老格式，等所有应用修改完后亦云应用扫码（即外部扫码）会返回新的格式
2. 自己内部应用扫码，调用平台sdk，新老内部扫码方法为同一个，即（scanPlatformBarcode），sdkv1.3.0版本之前扫描的无论是新码还是老码返回的都是老格式，sdkv1.3.0版本之后包括v1.3.0版本扫描的无论是新码还是老码返回的都是新格式
3. 跨应用生成的时候appId要区分环境，datas和events要一一对应，不然数据会对不上
> 目前仅在staging，等新版巡点检开发完毕后平台将会更新至正式
#### 老版格式
``` js
{
  检查单元编码: "4UnnQD7hUSj", 
  检查单元名称: "新检查单元测试", 
  name: "点检位置"
}
新版格式
{
  args: {
    43Hn7aP9zpP.自定义.检查单元编码: "4UnnQD7hUSj", 
    43Hn7aP9zpP.自定义.检查单元名称: "新检查单元测试"
  },
  version: "2.17.0
}
{
  args: {
    202010151636001.工作单元.id: "3pqHaCRE8LF", 
    202010151636001.工作单元.name: "工位2-2", 
    202010151636001.工作单元.desc: ""
  }, 
  version: "2.17.0"
}
{
  args: {
    2018022508593740501.成员信息.id: "3y5kpMb59wd", 
  }, 
  version: "2.17.0"
}
```

<a href="https://help.effio.cn/#/develop/guide?doc=96" target="_blank">平台示例/说明：https://help.effio.cn/#/develop/guide?doc=96</a>

#### 将新版处理成老版格式
``` js
let res = await scanPlatformBarcode();
console.log("扫码数据", res);
let scanData = {};
// 应用appId，需根据环境动态变化（staging和正式不同），可手动写死也可用GetAppUserInfo接口动态获取，推荐后面那种，使用模板字符串动态写入
scanData.检查单元编码 = res.args['应用appId.自定义.检查单元编码'];
// 企业模型和组织架构信息id是固定的，无需区分环境，已向平台确认
scanData.工厂模型编码 = res.args['202010151636001.企业.id'] || res.args['202010151636001.厂区.id'] || res.args['202010151636001.区域.id'] || res.args['202010151636001.工作中心.id'] || res.args['202010151636001.工作单元.id'];
scanData.成员信息 = res.args['2018022508593740501.成员信息.id'];
console.log("处理后数据", scanData);