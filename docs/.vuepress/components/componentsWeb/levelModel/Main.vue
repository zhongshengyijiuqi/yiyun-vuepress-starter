<template>
  <div class="levelModel-mask" v-if="visible">
    <div class="levelModel-container">
      <div class="container-head">
        <p class="head-title">{{ title }}</p>
        <img class="icon-close" src="./images/close.png" @click="close">
      </div>
      <div class="container-main">
        <div class="main-left">
          <div class="search-container">
            <el-input
              size="medium"
              @input="search"
              placeholder="请输入关键词"
              prefix-icon="el-icon-search"
              v-model="selectName"
              maxlength="20"
            ></el-input>
          </div>
          <div class="tree-container">
            <div class="levelModel-enterprise">
              <p class="enterprise-name">{{ enterpriseName }}</p>
              <p
                class="btn-selectAll"
                @click="setCheckedAll"
                v-if="!isSingleCheck && isNeedCheckAll"
              >
                全选
              </p>
            </div>
            <el-tree
              :class="[
                isSingleCheck ? 'tree-singleCheck' : 'tree-multipleCheck',
              ]"
              :data="renderTreeList"
              node-key="id"
              ref="tree"
              show-checkbox
              check-strictly
              check-on-click-node
              :expand-on-click-node="false"
              :default-expanded-keys="expandedKeys"
              :default-checked-keys="checkedKeys"
              @check="checkNode"
              :props="defaultProps"
              :filter-node-method="filterNode"
            >
              <div class="tree-node-custom" slot-scope="{ node, data }">
                <div class="levelModel-node">
                  <div class="levelModel-node-left">
                    <div
                      :class="[
                        'icon',
                        checkedKeys.includes(data.id)
                          ? `level${data.type}-active`
                          : `level${data.type}`,
                      ]"
                    ></div>
                    <p
                      :class="[
                        checkedKeys.includes(data.id) ? 'name-active' : 'name',
                      ]"
                    >
                      {{ node.label }}
                    </p>
                  </div>
                </div>
              </div>
            </el-tree>
          </div>
        </div>
        <div class="main-right">
          <div class="checked-tip">已选：{{ checkedNodes.length }}个</div>
          <div class="checked-container">
            <div
              class="checked-option"
              v-for="checkedNode in checkedNodes"
              :key="checkedNode.id"
            >
              <div class="checked-label">
                <div :class="['icon', `level${checkedNode.type}-active`]"></div>
                <p class="name">{{ checkedNode.name }}</p>
              </div>
              <div class="btn-del" @click="delChecked(checkedNode)">移除</div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-foot">
        <button class="cancel" @click="close">取消</button>
        <button class="confirm" @click="confirm">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "yyLevelModel",
  props: {
    title: {
      //层次模型标题
      type: String,
      default: "企业模型",
    },
    data: {
      //层次模型集合
      type: Array,
      default() {
        return [];
      },
    },
    visible: {
      //控制层次模型弹框显示  true显示  false隐藏
      type: Boolean,
      default: false,
    },
    isSingleCheck: {
      //是否单选 true表示单选 false多选,（不传默认多选）
      type: Boolean,
      default: false,
    },
    checkedIds: {
      //已选层次模型id集合
      type: Array,
      default() {
        return [];
      },
    },
    disabledIds: {
      //禁选层次模型id集合
      type: Array,
      default() {
        return [];
      },
    },
    visibleNodeTypes: {
      //可见的节点类型
      type: Array,
      default() {
        return [2,3,4,5];
      },
    },
    isNeedCheckAll: {
      //是否需要全选
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      //企业名称
      enterpriseName: "",
      //搜索节点名称
      selectName: "",
      //渲染树
      renderTreeList: [],
      //已选节点集合
      checkedNodes: [],
      //展开的节点key集合
      expandedKeys: [],
      //选中节点key集合
      checkedKeys: [],
      defaultProps: {
        children: "children",
        label: "name",
        disabled: "disabled",
      },
    };
  },
  watch: {
    visible: {
      handler() {
        if (this.visible) {
          this.checkedKeys = this.checkedIds;
          this.checkedNodes = this.data.filter((node) =>
            this.checkedIds.includes(node.id)
          );
          this.spliceLevelModel();
        }
      },
      immediate: true,
    },
  },
  methods: {
    spliceLevelModel() {
      const data = this.data.map((d) => {
        return {
          id: d.id,
          name: d.name,
          parentId: d.parentId,
          type: d.type,
          disabled: this.disabledIds.includes(d.id),
          children:[]
        };
      });
      const enterprise = data.filter((node) => !node.parentId)[0];
      this.enterpriseName = enterprise.name;
      let filterData = data.filter((node) => this.visibleNodeTypes.includes(node.type));
      let tree = [];
      for (let item of filterData) {
        this.expandedKeys.push(item.id);
        tree.push(item);
        for (let item_clone of filterData) {
          if (item_clone.parentId === item.id) {
            item_clone.isDelete = true
            item.children.push(item_clone);
          }
        }
      }
      tree = tree.filter(node => !node.isDelete)
      this.expandedKeys = tree.map(node => node.id)
      this.renderTreeList = tree;
    },
    search() {
      this.$refs.tree.filter(this.selectName);
    },
    filterNode(keyword, data) {
      if (!keyword) return true;
      return data.name.includes(keyword);
    },
    async checkNode(checkedNode, checkedDetail) {
      if (this.isSingleCheck) {
        const clickNode = this.$refs.tree.getNode(checkedNode.id);
        if (!clickNode.checked) {
          this.checkedKeys = [];
          this.checkedNodes = [];
        } else {
          this.checkedKeys = [checkedNode.id];
          this.checkedNodes = [checkedNode];
          await this.$nextTick();
          this.$refs.tree.setCheckedKeys([checkedNode.id]);
        }
      } else {
        this.checkedKeys = checkedDetail.checkedKeys;
        this.checkedNodes = checkedDetail.checkedNodes;
      }
    },
    setCheckedAll() {
      this.checkedKeys = this.data
        .filter((node) => node.parentId && !this.disabledIds.includes(node.id))
        .map((node) => node.id);
      this.checkedNodes = JSON.parse(JSON.stringify(this.data)).filter(
        (node) => node.parentId && !this.disabledIds.includes(node.id)
      );
    },
    delChecked(node) {
      this.checkedNodes = this.checkedNodes.filter(
        (checkedNode) => checkedNode.id !== node.id
      );
      this.checkedKeys = this.checkedKeys.filter(
        (checkedKey) => checkedKey !== node.id
      );
      this.$refs.tree.setCheckedKeys(this.checkedKeys);
    },
    close() {
      this.$emit("close");
    },
    confirm() {
      this.$emit("confirm",this.checkedNodes);
    },
  },
};
</script>

<style lang="scss" scoped>
.levelModel-mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1888;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 1000px;
  .levelModel-container {
    width: 830px;
    height: 600px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 5px 30px 0px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    // border-top: 10px solid rgba(0, 103, 255, 1);
    .container-head {
      height: 47px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      border-bottom: 1px solid rgba(219, 224, 230, 1);
      .head-title {
        font-size: 16px;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
      }
      .icon-close {
        cursor: pointer;
      }
    }
    .container-main {
      height: calc(100% - 105px);
      display: flex;
      .icon {
        width: 16px;
        height: 16px;
        margin-right: 6px;
      }
      .level2 {
        background: url("./images/level2.png") no-repeat 50%;
      }
      .level3 {
        background: url("./images/level3.png") no-repeat 50%;
      }
      .level4 {
        background: url("./images/level4.png") no-repeat 50%;
      }
      .level5 {
        background: url("./images/level5.png") no-repeat 50%;
      }
      .level2-active {
        background: url("./images/level2-active.png") no-repeat 50%;
      }
      .level3-active {
        background: url("./images/level3-active.png") no-repeat 50%;
      }
      .level4-active {
        background: url("./images/level4-active.png") no-repeat 50%;
      }
      .level5-active {
        background: url("./images/level5-active.png") no-repeat 50%;
      }
      .main-left {
        height: 100%;
        width: 400px;
        border-right: 1px solid #e8e8e8;
        display: flex;
        flex-direction: column;
        padding: 0;
        .search-container {
          padding: 12px 10px 12px 20px;
          border-bottom: 1px solid #e8e8e8;
        }
        .tree-container {
          overflow-y: auto;
          flex: 1;
          .levelModel-enterprise {
            height: 40px;
            background: #fafafa url("./images/enterprise.png") no-repeat 20px
              50%;
            padding: 0 20px 0 50px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .enterprise-name {
              font-weight: 600;
              color: #303133;
            }
            .btn-selectAll {
              font-size: 12px;
              cursor: pointer;
              color: #036ed5;
            }
          }
          .tree-multipleCheck {
            .el-checkbox__inner {
            }
          }
          .tree-singleCheck {
            ::v-deep .el-checkbox__inner {
              border-radius: 50%;
            }
          }
          .tree-node-custom {
            width: 100%;
            padding: 0 20px 0 0;
          }
          ::v-deep .el-tree-node__content {
            height: 30px;
            background: none;
            &:hover {
              background: #fafafa;
            }
          }
          ::v-deep .el-tree-node__content > .el-checkbox {
            margin-right: 6px;
          }
          ::v-deep .el-tree-node__content > .el-tree-node__expand-icon {
            font-size: 16px;
            padding: 10px;
            margin-left: 10px;
          }
          ::v-deep .el-tree--highlight-current
            .el-tree-node.is-current
            > .el-tree-node__content {
            background: none;
          }
          .levelModel-node {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .levelModel-node-left {
              display: flex;
              align-items: center;
              .name {
                max-width: 168px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .name-active {
                max-width: 168px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                color: #036ed5;
              }
            }
          }
        }
      }
      .main-right {
        flex: 1;
        padding: 10px;
        .checked-tip {
          color: rgba(144, 147, 153, 1);
          padding: 10px 0 10px 5px;
        }
        .checked-container {
          height: calc(100% - 27px);
          overflow-y: auto;
        }
        .checked-option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 40px;
          padding: 0 10px;
          border-bottom: 1px solid #e8e8e8;
          .checked-label {
            display: flex;
            align-items: center;
          }
          .btn-del {
            color: #036ed5;
            cursor: pointer;
          }
        }
      }
    }
    .container-foot {
      display: flex;
      justify-content: flex-end;
      height: 58px;
      align-items: center;
      border-top: 1px solid #e8e8e8;
      .cancel {
        width: 60px;
        height: 30px;
        background: rgba(255, 255, 255, 1);
        border-radius: 3px;
        border: 1px solid rgba(220, 223, 230, 1);
        font-size: 10px;
        color: rgba(96, 98, 102, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 20px;
      }
      .confirm {
        width: 60px;
        height: 30px;
        background: rgba(3, 110, 213, 1);
        border-radius: 3px;
        color: rgba(255, 255, 255, 1);
        font-size: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 20px;
      }
    }
  }
}
</style>