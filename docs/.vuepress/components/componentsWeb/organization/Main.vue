<template>
  <div ref="organization" class="organization-mask" v-show="isOpen">
    <div class="organization-container">
      <div class="container-head">
        <p class="head-title">{{ title }}</p>
        <img class="icon-close" src="./images/close.png" @click="close" />
      </div>
      <div class="container-main">
        <div class="main-left">
          <div class="search-container">
            <el-input
              size="medium"
              @input="search"
              placeholder="请输入关键词"
              prefix-icon="el-icon-search"
              v-model.trim="selectName"
              maxlength="20"
            ></el-input>
          </div>
          <div class="tabs-container" v-if="tabs.length">
            <div
              v-if="tabs.includes(1)"
              :class="{ 'tab-option': true, 'tab-active': tab_active === 1 }"
              @click="changeTab(1)"
            >
              按部门-成员
            </div>
            <div
              v-if="tabs.includes(2)"
              :class="{ 'tab-option': true, 'tab-active': tab_active === 2 }"
              @click="changeTab(2)"
            >
              按部门
            </div>
            <div
              v-if="tabs.includes(3)"
              :class="{ 'tab-option': true, 'tab-active': tab_active === 3 }"
              @click="changeTab(3)"
            >
              按部门-岗位
            </div>
          </div>
          <div class="tree-container">
            <div class="checkbox" @click="checkAll" v-if="!isSingleCheck">
              <div
                :class="[
                  'checkbox-icon',
                  isAll ? 'is-all' : isHalf ? 'is-half' : 'is-empty',
                ]"
              ></div>
              <div
                :class="['checkbox-label', isAll ? 'is-active' : 'is-normal']"
              >
                全选
              </div>
            </div>
            <el-tree
              :class="[
                isSingleCheck ? 'tree-singleCheck' : 'tree-multipleCheck',
              ]"
              :data="renderTreeList"
              node-key="key"
              ref="tree"
              show-checkbox
              :props="defaultProps"
              check-on-click-node
              :expand-on-click-node="false"
              :default-expanded-keys="expandedKeys"
              :default-checked-keys="defaultCheckedKeys"
              :check-strictly="tab_active === 2"
              :filter-node-method="filterNode"
              @check="checkNode"
            >
              <div class="tree-node-custom" slot-scope="{ node, data }">
                <div class="node-container" v-if="tab_active === 1">
                  <div class="node-member" v-if="!data.children">
                    <img
                      class="member-icon"
                      :src="data.icon || require('./images/avatar.png')"
                      @error="imgErrorhandler"
                      alt="avatar"
                    />
                    <div class="member-name">{{ data.name }}</div>
                  </div>
                  <div class="node-department" v-else>
                    <img
                      class="department-icon"
                      src="./images/department.png"
                    />
                    <div class="department-name">{{ data.name }}</div>
                  </div>
                </div>
                <div class="node-container" v-if="tab_active === 2">
                  <div class="node-department">
                    <img
                      class="department-icon"
                      src="./images/department.png"
                    />
                    <div class="department-name">{{ data.name }}</div>
                  </div>
                </div>
                <div class="node-container" v-if="tab_active === 3">
                  <div class="node-department">
                    <img
                      class="department-icon"
                      :src="
                        data.children
                          ? require('./images/department.png')
                          : require('./images/post.png')
                      "
                      alt=""
                    />
                    <div class="department-name">{{ data.name }}</div>
                  </div>
                </div>
              </div>
            </el-tree>
          </div>
        </div>
        <div class="main-right">
          <div class="checked-tip">已选：{{ checkedList.length }}个</div>
          <div class="checked-container">
            <div class="checked-option">
              <div
                class="member"
                v-for="(node, index) in checkedList"
                :key="index"
              >
                <p class="name">
                  {{ tab_active === 3 ? node.keyName : node.name }}
                </p>
                <img
                  class="close"
                  src="./images/close.png"
                  @click="delCheckedNode(node)"
                />
              </div>
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
  name: "YyOrganization",
  props: {
    title: {
      type: String,
      default: "组织架构",
    },
    tabs: {
      type: Array,
      default() {
        return [];
      },
    },
    activeTab: {
      //选择模式 1：按成员，2：按部门，3：按部门-岗位
      type: Number,
      default: 1,
    },
    departmentList: {
      //部门源数据
      type: Array,
      default() {
        return [];
      },
    },
    memberList: {
      //组织架构成员源数据
      type: Array,
      default() {
        return [];
      },
    },
    isOpen: {
      //控制组织架构弹框显示  true显示  false隐藏
      type: Boolean,
      default: false,
    },
    isSingleCheck: {
      //是否单选 true:单选 false:多选
      type: Boolean,
      default: false,
    },
    checkedIds: {
      //已选id集合
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isAll: false,
      expandedKeys: [],
      defaultCheckedKeys: [],
      defaultProps: {
        children: "children",
        label: "name",
        disabled: "disabled",
      },
      selectName: "",
      tab_active: 0,
      checkedList: [],
      allListByKeys: [], 
      departmentListByKeys: [],
      renderTreeList: [],
      cloneTreeList: [],
    };
  },
  computed: {
    isHalf() {
      return this.checkedList.length && !this.isAll;
    },
  },
  watch: {
    isOpen: {
      async handler() {
        if (!this.isOpen) {
          return;
        }
        this.changeTab(this.activeTab);
        if (!this.checkedIds.length) {
          return;
        }
        await this.$nextTick();
        if (this.tab_active === 1) {
          const checkedMembers = this.allListByKeys.filter((item) =>
            this.checkedIds.includes(item.id)
          );
          this.defaultCheckedKeys = checkedMembers.map((item) => item.key);
          this.checkedList = [];
          let result = {};
          for (let checkedMember of checkedMembers) {
            if (!result[checkedMember.id]) {
              this.checkedList.push(checkedMember);
              result[checkedMember.id] = true;
            }
          }
        } else {
          this.checkedList = this.allListByKeys.filter((item) =>
            this.checkedIds.includes(item.id)
          );
          this.defaultCheckedKeys = this.checkedList.map((item) => item.key);
        }
      },
      immediate: true,
    },
  },
  methods: {
    checkAll() {
      for (let node of this.allListByKeys) {
        this.$refs.tree.setChecked(node.key, !this.isAll);
      }
      if (this.isAll) {
        this.checkedList = [];
        if (this.tab_active !== 2) {
          for (let node of this.departmentListByKeys) {
            this.$refs.tree.setChecked(node.key, false);
          }
        }
      } else {
        if (this.tab_active === 1) {
          for (let node of this.departmentListByKeys) {
            this.$refs.tree.setChecked(node.key, true);
          }
          this.checkedList = [];
          let result = {};
          for (let checkedMember of this.allListByKeys) {
            if (!result[checkedMember.id]) {
              this.checkedList.push(checkedMember);
              result[checkedMember.id] = true;
            }
          }
        } else if (this.tab_active === 2) {
          this.checkedList = JSON.parse(JSON.stringify(this.allListByKeys));
        } else if (this.tab_active === 3) {
          for (let node of this.departmentListByKeys) {
            this.$refs.tree.setChecked(node.key, true);
          }
          this.checkedList = JSON.parse(JSON.stringify(this.allListByKeys));
        }
      }
      this.isAll = !this.isAll;
    },
    checkNode(checkedNode, checkedDetail) {
      if (this.isSingleCheck) {
        const nodeCheckedStatus = this.$refs.tree.getNode(
          checkedNode.key
        ).checked;
        if (nodeCheckedStatus) {
          if (this.tab_active === 1) {
            const checkedKeys = this.allListByKeys
              .filter((member) => member.id === checkedNode.id)
              .map((v) => v.key);

            for (let key of checkedKeys) {
              this.$refs.tree.setChecked(key, true);
            }
            if (this.checkedList.length) {
              const removeKeys = this.allListByKeys
                .filter((member) => member.id === this.checkedList[0].id)
                .map((v) => v.key);
              for (let key of removeKeys) {
                this.$refs.tree.setChecked(key, false);
              }
            }
          } else {
            for (let node of this.checkedList) {
              this.$refs.tree.setChecked(node.key, false);
            }
          }
          this.checkedList = [checkedNode];
        } else {
          if (this.tab_active === 1) {
            if (this.checkedList.length) {
              const removeKeys = this.allListByKeys
                .filter((member) => member.id === this.checkedList[0].id)
                .map((v) => v.key);
              for (let key of removeKeys) {
                this.$refs.tree.setChecked(key, false);
              }
            }
          } else {
            this.$refs.tree.setChecked(checkedNode.key, false);
          }
          this.checkedList = [];
        }
      } else {
        if (this.tab_active === 1) {
          const nodeCheckedStatus = this.$refs.tree.getNode(
            checkedNode.key
          ).checked;
          if (!checkedNode.children) {
            const repeatMemberKeys = this.allListByKeys
              .filter((member) => member.id === checkedNode.id)
              .map((v) => v.key);
            for (let memberKey of repeatMemberKeys) {
              this.$refs.tree.setChecked(memberKey, nodeCheckedStatus);
            }
          }
          this.checkedList = [];
          const checkedMembers = this.$refs.tree
            .getCheckedNodes()
            .filter((node) => !node.children);
          let result = {};
          for (let checkedMember of checkedMembers) {
            if (!result[checkedMember.id]) {
              this.checkedList.push(checkedMember);
              result[checkedMember.id] = true;
            }
          }
        } else if (this.tab_active === 2) {
          this.checkedList = checkedDetail.checkedNodes;
        } else if (this.tab_active === 3) {
          this.checkedList = checkedDetail.checkedNodes.filter(
            (node) => !node.children
          );
        }
        const checkedKeys = this.$refs.tree.getCheckedKeys();
        if (this.tab_active === 2) {
          this.isAll = checkedKeys.length === this.allListByKeys.length;
        } else {
          this.isAll =
            checkedKeys.length ===
            this.allListByKeys.length + this.departmentListByKeys.length;
        }
      }
    },
    delCheckedNode(node) {
      this.isAll = false;
      this.checkedList = this.checkedList.filter(
        (checkedNode) => checkedNode.key !== node.key
      );
      if (this.tab_active === 1) {
        const repeatMembers = this.allListByKeys.filter(
          (item) => item.id === node.id
        );
        for (let repeatMember of repeatMembers) {
          this.$refs.tree.setChecked(repeatMember.key, false);
        }
      } else {
        this.$refs.tree.setChecked(node.key, false);
      }
    },
    filterNode(keyword, data) {
      if (!keyword) return true;
      return data.name.includes(keyword);
    },
    search() {
      this.$refs.tree.filter(this.selectName);
    },
    close() {
      this.$emit("close");
    },
    confirm() {
      this.$emit("confirm", {
        checkedType: this.tab_active,
        checkedList: this.checkedList,
      });
    },
    changeTab(tab) {
      if (this.tab_active === tab) {
        return;
      }
      this.tab_active = tab;
      this.initData();
      if (this.tab_active === 1) {
        this.spliceMemberTree();
      }
      if (this.tab_active === 2) {
        this.spliceDepartmentTree();
      }
      if (this.tab_active === 3) {
        this.splicePostTree();
      }
      this.expandFirstLevel();
    },
    initData() {
      this.isAll = false;
      this.defaultCheckedKeys = [];
      this.checkedList = [];
      this.selectName = "";
    },
    imgErrorhandler(e) {
      e.target.src = require("./images/avatar.png");
    },
    expandFirstLevel() {
      this.expandedKeys = this.cloneTreeList.map((node) => node.key);
    },
    spliceDepartmentTree() {
      let departmentList = this.departmentList.map((dept) => {
        return {
          key: dept.id,
          id: dept.id,
          name: dept.name,
          parentId: dept.parentId,
          disabled: false,
        };
      });
      this.allListByKeys = JSON.parse(JSON.stringify(departmentList));

      let list = [];
      departmentList.forEach((department) => {
        department.children = [];
        if (!department.parentId) {
          list.push(department);
        }
        departmentList.forEach((child) => {
          if (child.parentId === department.id) {
            department.children.push(child);
          }
        });
      });
      this.renderTreeList = JSON.parse(JSON.stringify(list));
      this.cloneTreeList = JSON.parse(JSON.stringify(list));
    },
    splicePostTree() {
      this.allListByKeys = [];
      this.departmentListByKeys = [];
      let departmentList = JSON.parse(
        JSON.stringify(
          this.departmentList.map((department) => {
            const departmentNew = {
              key: department.id,
              id: department.id,
              name: department.name,
              parentId: department.parentId,
              disabled: this.isSingleCheck ? true : false,
            };
            this.departmentListByKeys.push(departmentNew);
            return {
              key: department.id,
              id: department.id,
              name: department.name,
              parentId: department.parentId,
              children: department.positions.map((post) => {
                const postNew = {
                  key: `${department.id}-${post.id}`,
                  keyName: `${department.name}-${post.name}`,
                  id: post.id,
                  name: post.name,
                  disabled: false,
                };
                this.allListByKeys.push(postNew);
                return postNew;
              }),
              disabled: this.isSingleCheck ? true : false,
            };
          })
        )
      );
      let list = [];
      departmentList.forEach((department) => {
        if (!department.parentId) {
          list.push(department);
        }
        departmentList.forEach((child) => {
          if (child.parentId === department.id) {
            department.children.push(child);
          }
        });
      });
      this.renderTreeList = JSON.parse(JSON.stringify(list));
      this.cloneTreeList = JSON.parse(JSON.stringify(list));
    },
    spliceMemberTree() {
      this.allListByKeys = [];
      this.departmentListByKeys = [];
      let departmentList = JSON.parse(JSON.stringify(this.departmentList));
      let memberList = this.memberList.map((member) => {
        return {
          key: member.id,
          id: member.id,
          name: member.name,
          icon: member.profilePicture,
          deptIdList: member.deptIdList || [],
          disabled: false,
        };
      });

      let list = [];
      if (!departmentList.length) {
        list = memberList;
        this.allListByKeys = memberList;
      } else {
        memberList.forEach((member) => {
          if (!member.deptIdList.length) {
            list.push(member);
            this.allListByKeys.push(member);
          }
        });
        departmentList.forEach((department) => {
          department.key = department.id;
          department.children = [];
          department.disabled = this.isSingleCheck ? true : false;
          this.departmentListByKeys.push(department);
          memberList.forEach((mebItem) => {
            if (mebItem.deptIdList.length) {
              mebItem.deptIdList.forEach((departmentId) => {
                if (departmentId == department.id) {
                  const memberNew = {
                    key: `${department.id}-${mebItem.id}`,
                    id: mebItem.id,
                    name: mebItem.name,
                    icon: mebItem.icon,
                    disabled: mebItem.disabled,
                  };
                  department.children.push(memberNew);
                  this.allListByKeys.push(memberNew);
                }
              });
            }
          });
          departmentList.forEach((child) => {
            if (child.parentId === department.id) {
              department.children.push(child);
            }
          });
          if (!department.parentId) {
            list.push(department);
          }
        });
      }
      this.renderTreeList = JSON.parse(JSON.stringify(list));
      this.cloneTreeList = JSON.parse(JSON.stringify(list));
    },
  },
};
</script>

<style lang="scss" scoped>
.organization-mask {
  // position: absolute;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 1000px;
  .organization-container {
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
      .main-left {
        height: 100%;
        width: 400px;
        border-right: 1px solid #e8e8e8;
        display: flex;
        flex-direction: column;
        padding: 16px 0 0 0;
        .search-container {
          padding: 0 10px 0 20px;
        }
        .tabs-container {
          display: flex;
          align-items: center;
          border-bottom: 1px solid #dbe0e6;
          padding: 10px 0 0 20px;
          line-height: 36px;
          .tab-option {
            cursor: pointer;
            height: 35px;
            background-color: rgba(250, 250, 250, 1);
            color: rgba(96, 98, 102, 1);
            margin-right: 10px;
            border-radius: 4px 4px 0px 0px;
            padding: 0 20px;
            line-height: 35px;
            border: 1px solid rgba(232, 232, 232, 1);
            border-bottom: 1px solid #ffffff;
          }
          .tab-active {
            background: #ffffff;
            color: #036ed5;
            position: relative;
            &::after {
              content: "";
              position: absolute;
              height: 2px;
              width: 100%;
              bottom: -2px;
              left: 0;
              background-color: #ffffff;
            }
          }
        }
        .tree-container {
          padding: 6px 0 0 0;
          overflow-y: auto;
          .checkbox {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            width: 58px;
            cursor: pointer;
            margin-left: 22px;
            .is-empty {
              border: 1px solid #dcdfe6;
            }
            .is-half {
              background-color: #036ed5;
              border-color: #036ed5;
              &::after {
                content: "";
                position: absolute;
                display: block;
                background-color: #fff;
                height: 2px;
                transform: scale(0.5);
                left: 0;
                right: 0;
                top: 6px;
              }
            }
            .is-all {
              background-color: #036ed5;
              border-color: #036ed5;
              &::after {
                box-sizing: content-box;
                content: "";
                border: 1px solid #fff;
                border-left: 0;
                border-top: 0;
                height: 7px;
                left: 5px;
                position: absolute;
                top: 2px;
                transform: rotate(45deg) scaleY(1);
                width: 3px;
                transition: transform 0.15s ease-in 0.05s;
                transform-origin: center;
              }
            }
            .checkbox-icon {
              width: 14px;
              height: 14px;
              border-radius: 2px;
              position: relative;
            }
            .checkbox-label {
              margin-left: 10px;
            }
            .is-active {
              color: #036ed5;
            }
            .is-normal {
              color: #606266;
            }
          }
          .tree-multipleCheck {
            .el-checkbox__inner {
            }
          }
          .tree-singleCheck {
            ::v-deep.el-checkbox__inner {
              border-radius: 50%;
            }
          }
          .tree-node-custom {
            width: 100%;
            padding: 0 20px 0 0;
          }
          ::v-deep.el-tree-node__content {
            height: 40px;
            background: none;
            &:hover {
              background: #fafafa;
            }
          }
          ::v-deep.el-tree-node__content > .el-checkbox {
            margin-right: 10px;
          }
          ::v-deep.el-tree-node__content > .el-tree-node__expand-icon {
            // position: absolute;
            // right: 0;
            font-size: 16px;
            padding: 10px;
            margin-left: 10px;
          }
          ::v-deep.el-tree--highlight-current
            .el-tree-node.is-current
            > .el-tree-node__content {
            background: none;
          }

          .node-container {
            display: flex;
            align-items: center;
            .node-member {
              display: flex;
              align-items: center;
              .member-icon {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin-right: 6px;
              }
              .member-name {
                max-width: 120px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
            .node-department {
              display: flex;
              align-items: center;
              width: 100%;
              .department-icon {
                margin-right: 6px;
              }
              .department-name {
              }
            }
          }
        }
      }
      .main-right {
        flex: 1;
        padding: 6px 0 0 21px;
        .checked-tip {
          color: rgba(144, 147, 153, 1);
        }
        .checked-container {
          height: calc(100% - 27px);
          overflow-y: auto;
        }
        .checked-option {
          display: flex;
          align-items: flex-start;
          flex-wrap: wrap;
          padding: 12px 0 0 0;
          .member {
            height: 32px;
            background: rgba(232, 236, 239, 1);
            border-radius: 4px;
            margin-right: 13px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 7px 0 10px;
            margin-bottom: 14px;
            color: rgba(74, 90, 107, 1);
            .logo {
              margin-right: 2px;
              width: 16px;
            }
            .name {
              color: rgba(48, 49, 51, 1);
            }
            .close {
              margin-left: 3px;
              cursor: pointer;
              font-size: 12px;
            }
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