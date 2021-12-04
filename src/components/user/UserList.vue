<template xmlns:a-col="http://www.w3.org/1999/html">
  <div>
    <h3>
      用户列表
    </h3>

    <a-card>
      <a-row :gutter="20">
        <a-col :span="6">
          <a-input-search
              v-model="queryParam.username"
              placeholder="输入用户名查找"
              enter-button
              allowClear
              @search="getUserList"/>
        </a-col>
        <a-col :span="4">
          <a-button type="primary" @click="addUser">新增</a-button>
        </a-col>
      </a-row>
      <a-table
          :rowKey="usernam"
          :columns="columns"
          :pagination="pagination"
          :dataSource="userlist"
          bordered
          @change="handleTableChange"
      >
        <span slot="role" slot-scope="role">{{ role === 1 ? "管理员" : "订阅者" }}}</span>
        <template slot="action" slot-scope="data">
          <div class="actionSlot">
            <a-button type="primary" style="margin-right: 15px">编辑</a-button>
            <a-button type="danger" @click="deleteUser(data.ID)">删除</a-button>
          </div>
        </template>
      </a-table>
    </a-card>
    <a-modal
      title="新增用户"
      :visible="addUserVisible"
      :confirm-loading="confirmLoading"
      destroyOnClose
      @ok="addUserOk"
      @cancel = "addUserCancle">
      <a-form-model :model="userInfo" rules="userRules" ref="addUserRef">
        <a-form-model-item label="用户名">
          <a-input v-model="userInfo.username"></a-input>
        </a-form-model-item>
        <a-form-model-item label="密码">
          <a-input-password v-model="userInfo.password"></a-input-password>
        </a-form-model-item>
        <a-form-model-item label="确认密码">
          <a-input-password v-model="userInfo.checkpass"></a-input-password>
        </a-form-model-item>
        <a-form-model-item label="是否为管理员">

        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
const columns = [
  {
    title: "ID",
    dataIndex: "ID",
    width: "10%",
    key: "id",
    align: "center"
  },
  {
    title: "用户名",
    dataIndex: "username",
    width: "10%",
    key: "username",
    align: "center"
  },
  {
    title: "角色",
    dataIndex: "role",
    width: "10%",
    key: "role",
    align: "center",
    scopedSlots: {customRender: "role"}
  },
  {
    title: "操作",
    width: "10%",
    key: "action",
    align: "center",
    scopedSlots: {customRender: "action"}
  }
]

export default {
  name: "UserList",
  data() {
    return {
      pagination: {
        pageSizeOptions: ['5', '10', '20'],
        pageSize: 5,
        total: 0,
        showSizeChange: true,
        showTotal: (total) => `共${total}条`,
      },
      userlist: [],
      columns,
      queryParam: {
        username:"",
        pagesize: 5,
        pagenum: 1,
      },
      visible: false,
      addUserVisible:false,
      userInfo:{
        id:0,
        username:"",
        password:"",
        checkpass:"",
        role:2,
      },
      userRules:{

      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      // const {data:res} = this.$http.get('users', {
      //   params: {
      //     pagesize: this.paginationOption.defaultPageSize,
      //     pagenum: this.paginationOption.defaultCurrent
      //   }
      // })
      // console.log(res)
      // if(res.status!==200){
      //   return this.$message.error(res.message)
      // }
      // this.userlist = res.data
      // this.pagination.total = res.total
    },
    handleTableChange(pagination, filters, sorter) {
      console.log(filters,sorter)
      var pager = {...this.pagination}
      pager.curren = pagination.curren
      pager.pageSize = pagination.pageSize
      this.queryParam.pagesize = pagination.pageSize
      this.queryParam.pagenum = pagination.current

      if (pagination.pageSize !== this.pagination.pageSize) {
        this.queryParam.pagenum = 1
        pager.curren = 1
      }
      this.pagination = pager
      this.getUserList()
    },
    deleteUser(ID){
      console.log(ID)
      this.$confirm({
        title:"提示：请再次确认",
        content:"要删除该用户嘛？一旦删除，无法恢复！",
        onOk:async ()=>{
          const res = await this.$http.delete(`user/${ID}`)
          if(res.status!==200){
            return this.$message.error(res.message)
          }
          this.$message.success("删除成功")
          this.getUserList()
        },
        onCancel:()=>{
          this.$message.info("已取消删除")
        }
      })
    },
    addUser(){
      this.addUserVisible = true
    },
    addUserOk(){

    },
    addUserCancle(){
      this.addUserVisible = false
    }
  }
}
</script>

<style scoped>
.actionSlot {
  display: flex;
  justify-content: center
}
</style>