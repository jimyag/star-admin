<template xmlns:a-col="http://www.w3.org/1999/html">
  <div>
    <h3>
      用户列表
    </h3>

    <a-card>
      <a-row :gutter="20">
        <a-col :span="6">
          <a-input-search placeholder="输入用户名查找" enter-button/>
        </a-col>
        <a-col :span="4">
          <a-button type="primary">新增</a-button>
        </a-col>
      </a-row>
      <a-table
          :rowKey="id"
          :columns="columns"
          :pagination="paginationOption"
          :dataSource="userlist"
          bordered>
        <span slot="role" slot-scope="role">{{role===1?"管理员":"订阅者"}}}</span>
        <template slot="action">
          <div class="actionSlot">
            <a-button type="primary" style="margin-right: 15px">编辑</a-button>
            <a-button type="danger">删除</a-button>
          </div>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
const columns = [
  {
    title: "ID",
    dataIndex: "ID",
    width: "10%",
    key: "id",
    align:"center"
  },
  {
    title: "用户名",
    dataIndex: "username",
    width: "10%",
    key: "username",
    align:"center"
  },
  {
    title: "角色",
    dataIndex: "role",
    width: "10%",
    key: "role",
    align:"center",
    scopedSlots:{customRender:"role"}
  },
  {
    title: "操作",
    width: "10%",
    key: "action",
    align:"center",
    scopedSlots:{customRender:"action"}
  }
]

export default {
  name: "UserList",
  data() {
    return {
      paginationOption: {
        pageSizeOptions: ['5', '10', '20'],
        defaultCurrent: 1,
        defaultPageSize: 2,
        total: 0,
        showSizeChange: true,
        showTotal: (total) => `共${total}条`,
        onChange: (page, pageSize) => {
          this.paginationOption.defaultCurrent = page
          this.paginationOption.defaultPageSize = pageSize
        },
        onShowSizeChange: (current, size) => {
          this.paginationOption.defaultCurrent = current
          this.paginationOption.defaultPageSize = size
        }
      },
      userlist: [],
      columns,
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
    }
  }
}
</script>

<style scoped>
.actionSlot{
  display: ;
}
</style>