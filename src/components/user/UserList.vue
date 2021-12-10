<template>
  <div>
    <a-card>
      <a-row :gutter="20">
        <a-col :span="6">
          <a-input-search
              v-model="queryParam.username"
              placeholder="输入用户名查找"
              enter-button
              allowClear
              @search="searchUser"
          />
        </a-col>
        <a-col :span="4">
          <a-button type="primary" @click="addUserVisible = true">新增</a-button>
        </a-col>
      </a-row>

      <a-table
          rowKey="id"
          :columns="columns"
          :pagination="pagination"
          :dataSource="userlist"
          bordered
          @change="handleTableChange"
      >
        <span slot="role" slot-scope="data">{{ powers(data) }}</span>
        <template slot="action" slot-scope="data">
          <div class="actionSlot">
            <a-button
                type="primary"
                icon="edit"
                style="margin-right: 15px"
                @click="editUser(data.id)"
            >编辑
            </a-button>
            <a-button
                type="danger"
                icon="delete"
                style="margin-right: 15px"
                @click="deleteUser(data.id)"
            >删除
            </a-button>
            <a-button type="info" icon="info" @click="ChangePassword(data.id)">修改密码</a-button>
          </div>
        </template>
      </a-table>
    </a-card>

    <!-- 新增用户区域 -->
    <a-modal
        closable
        title="新增用户"
        :visible="addUserVisible"
        width="60%"
        @ok="addUserOk"
        @cancel="addUserCancel"
        destroyOnClose
    >
      <a-form-model :model="newUser" :rules="addUserRules" ref="addUserRef">
        <a-form-model-item label="用户名" prop="username">
          <a-input v-model="newUser.username"></a-input>
        </a-form-model-item>
        <a-form-model-item has-feedback label="密码" prop="password">
          <a-input-password v-model="newUser.password"></a-input-password>
        </a-form-model-item>
        <a-form-model-item has-feedback label="确认密码" prop="checkpass">
          <a-input-password v-model="newUser.checkpass"></a-input-password>
        </a-form-model-item>
        <a-form-model-item has-feedback label="邮箱" prop="email">
          <a-input v-model="newUser.email"></a-input>
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <!-- 编辑用户区域 -->
    <a-modal
        closable
        destroyOnClose
        title="编辑用户"
        :visible="editUserVisible"
        width="60%"
        @ok="editUserOk"
        @cancel="editUserCancel"
    >
      <a-form-model :model="userInfo" :rules="userRules" ref="addUserRef">
        <a-form-model-item label="用户名" prop="username">
          <a-input v-model="userInfo.username"></a-input>
        </a-form-model-item>
        <a-form-model-item label="邮箱" prop="email">
          <a-input v-model="userInfo.email"></a-input>
        </a-form-model-item>
        <a-form-model-item label="权限选择">
          <a-select v-model="poewer" style="width: 120px" @change="handleChange">
            <a-select-option value="1">
              管理员
            </a-select-option>
            <a-select-option value="2">
              青铜
            </a-select-option>
            <a-select-option value="3">
              白银用户
            </a-select-option>
            <a-select-option value="4">
              黄金用户
            </a-select-option>
            <a-select-option value="5">
              铂金用户
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <!-- 修改密码 -->
    <a-modal
        closable
        title="修改密码"
        :visible="changePasswordVisible"
        width="60%"
        @ok="changePasswordOk"
        @cancel="changePasswordCancel"
        destroyOnClose
    >
      <a-form-model :model="changePassword" :rules="changePasswordRules" ref="changePasswordRef">
        <a-form-model-item has-feedback label="原密码" prop="oldPassword">
          <a-input-password v-model="changePassword.oldPassword"></a-input-password>
        </a-form-model-item>
        <a-form-model-item has-feedback label="密码" prop="password">
          <a-input-password v-model="changePassword.password"></a-input-password>
        </a-form-model-item>
        <a-form-model-item has-feedback label="确认密码" prop="checkpass">
          <a-input-password v-model="changePassword.checkpass"></a-input-password>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: '10%',
    key: 'id',
    align: 'center',
  },
  {
    title: '用户名',
    dataIndex: 'username',
    width: '25%',
    key: 'username',
    align: 'center',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: '25%',
    key: 'email',
    align: 'center',
  },
  {
    title: '角色',
    dataIndex: 'role',
    width: '10%',
    key: 'role',
    align: 'center',
    scopedSlots: {customRender: 'role'},
  },
  {
    title: '操作',
    width: '15%',
    key: 'action',
    align: 'center',
    scopedSlots: {customRender: 'action'},
  },
]
import {validatePassword, validateUsername, validateEmail} from "@/plugin/validator";

export default {
  data() {
    return {
      poewer: "",
      pagination: {
        pageSizeOptions: ['5', '10', '20'],
        pageSize: 5,
        total: 0,
        showSizeChanger: true,
        showTotal: (total) => `共${total}条`,
      },
      userlist: [],
      userInfo: {
        username: '',
        password: '',
        role: 2,
        email: "",
        checkPass: '',
      },
      newUser: {
        username: '',
        password: '',
        role: 2,
        checkPass: '',
        email: "",
      },
      changePassword: {
        id: 0,
        geterPassword: "",
        oldPassword: "",
        password: '',
        checkPass: '',
      },
      columns,
      queryParam: {
        username: '',
        pagesize: 5,
        pagenum: 1,
      },
      editVisible: false,
      userRules: {
        username: validateUsername,
        password: validatePassword,
        checkpass: [
          {
            validator: (rule, value, callback) => {
              if (this.userInfo.checkpass === '') {
                callback(new Error('请输入密码'))
              }
              if (this.userInfo.password !== this.userInfo.checkpass) {
                callback(new Error('密码不一致，请重新输入'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
      },
      addUserRules: {
        username: validateUsername,
        password: validatePassword,
        email: validateEmail,
        checkpass: [
          {
            validator: (rule, value, callback) => {
              if (this.newUser.checkpass === '') {
                callback(new Error('请输入密码'))
              }
              if (this.newUser.password !== this.newUser.checkpass) {
                callback(new Error('密码不一致，请重新输入'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
      },
      changePasswordRules: {
        oldPassword: validatePassword,
        password: validatePassword,
        email: validateEmail,
        checkpass: [
          {
            validator: (rule, value, callback) => {
              if (this.changePassword.checkpass === '') {
                callback(new Error('请输入密码'))
              }
              if (this.changePassword.password !== this.changePassword.checkpass) {
                callback(new Error('密码不一致，请重新输入'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
      },
      editUserVisible: false,
      addUserVisible: false,
      changePasswordVisible: false,
    }
  },
  created() {
    this.getUserList()
  },
  computed: {
    IsAdmin: function () {
      return this.userInfo.role === 1;
    },
  },
  methods: {
    powers(index) {
      if (index === 1) {
        return "管理员"
      } else if (index === 2) {
        return "青铜用户"
      } else if (index === 3) {
        return "白银用户"
      } else if (index === 4) {
        return "黄金用户"
      } else {
        return "铂金用户"
      }
    },
    handleChange(value) {
      this.userInfo.role = value
    },
    // 获取用户列表
    async getUserList() {
      const {data: res} = await this.$http.get("/users", {
        params: {
          username: this.queryParam.username,
          pagesize: this.queryParam.pagesize,
          pagenum: this.queryParam.pagenum
        }
      })
      if (res.code !== 0) {
        return this.$message.error(res.msg);
      }
      this.userlist = res.data.data
      this.pagination.total = res.data.total
    },
    // 搜索用户
    async searchUser() {
      this.queryParam.pagenum = 1
      this.pagination.current = 1
      const {data: res} = await this.$http.get('/users', {
        params: {
          username: this.queryParam.username,
          pagesize: this.queryParam.pagesize,
          pagenum: this.queryParam.pagenum,
        },
      })
      if (res.code !== 0) return this.$message.error(res.msg)
      this.userlist = res.data.data
      // this.pagination.total = res.total
    },
    // 更改分页
    handleTableChange(pagination, filters, sorter) {
      console.log(filters, sorter)
      const pager = {...this.pagination};
      pager.current = pagination.current
      pager.pageSize = pagination.pageSize
      this.queryParam.pagesize = pagination.pageSize
      this.queryParam.pagenum = pagination.current
      if (pagination.pageSize !== this.pagination.pageSize) {
        this.queryParam.pagenum = 1
        pager.current = 1
      }
      this.pagination = pager
      this.getUserList()
    },
    // 删除用户
    deleteUser(id) {
      this.$confirm({
        title: '提示：请再次确认',
        content: '确定要删除该用户吗？一旦删除，无法恢复',
        onOk: async () => {
          const {data: res} = await this.$http.delete(`user/${id}`)
          if (res.code !== 0) return this.$message.error(res.msg)
          this.$message.success('删除成功')
          await this.getUserList()
        },
        onCancel: () => {
          this.$message.info('已取消删除')
        },
      })
    },
    // 新增用户
    addUserOk() {
      this.$refs.addUserRef.validate(async (valid) => {
        if (!valid) return this.$message.error('参数不符合要求，请重新输入')
        const {data: res} = await this.$http.post('admin/register', this.newUser) //es6的语法糖 解构赋值
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.$refs.addUserRef.resetFields()
        this.addUserVisible = false
        this.$message.success('添加用户成功')
        await this.getUserList()
      })
    },
    addUserCancel() {
      this.$refs.addUserRef.resetFields()
      this.addUserVisible = false
      this.$message.info('新增用户已取消')
    },
    // 编辑用户
    async editUser(id) {
      this.editUserVisible = true
      const {data: res} = await this.$http.get(`user/${id}`)
      this.userInfo = res.data
      this.poewer = this.powers(this.userInfo.role)
    },
    editUserOk() {
      this.$refs.addUserRef.validate(async (valid) => {
        if (!valid) return this.$message.error('参数不符合要求，请重新输入')
        const {data: resUsername} = await this.$http.put(`user/${this.userInfo.id}/username`, {
          username: this.userInfo.username,
        })
        if (resUsername.code !== 0) return this.$message.error(resUsername.msg)

        const {data: res} = await this.$http.put(`user/${this.userInfo.id}/role`, {
          role: this.userInfo.role,
        })
        if (res.code !== 0) return this.$message.error(res.msg)
        const {data: resEmail} = await this.$http.put(`user/${this.userInfo.id}/email`, {
          email: this.userInfo.email,
        })
        if (resEmail.code !== 0) return this.$message.error(resEmail.msg)
        this.editUserVisible = false
        this.$message.success('更新用户信息成功')
        await this.getUserList()
      })
    },
    editUserCancel() {
      this.$refs.addUserRef.resetFields()
      this.editUserVisible = false
      this.$message.info('编辑已取消')
    },
    // 修改密码
    async ChangePassword(id) {
      this.changePasswordVisible = true
      const {data: res} = await this.$http.get(`user/${id}`)
      this.changePassword.geterPassword = res.password
      this.changePassword.id = id
    },
    changePasswordOk() {
      this.$refs.changePasswordRef.validate(async (valid) => {
        if (!valid) return this.$message.error('参数不符合要求，请重新输入')
        console.log(this.changePassword.id)
        if (this.changePassword.oldPassword !== this.changePassword.geterPassword) {
          return this.$message.error("原密码错误！")
        }
        const {data: res} = await this.$http.put(`user/${this.changePassword.id}/password`, {
          password: this.changePassword.password,
        })
        console.log(res)
        if (res.code !== 0) return this.$message.error(res.msg)
        this.changePasswordVisible = false
        this.$message.success('修改密码成功')
        await this.getUserList()
        this.$refs.changePasswordRef.resetFields()
      })
    },
    changePasswordCancel() {
      this.$refs.changePasswordRef.resetFields()
      this.changePasswordVisible = false
      this.$message.info('已取消')
    },
  },
}
</script>

<style scoped>
.actionSlot {
  display: flex;
  justify-content: center;
}
</style>