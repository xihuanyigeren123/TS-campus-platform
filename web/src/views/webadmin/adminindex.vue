<template>
  <div class="admin">
    <div v-title data-title="  唐师人| 个人中心 "></div>
    <div class="admin-home">
      <el-container style=" border: 1px solid #eee">
        <el-aside width="170px" style="background-color: #fff;">
          <el-menu router default-active="2" class="el-menu-vertical-demo">
            <el-menu-item index="/admin">
              <i class="el-icon-user-solid"></i>
              <span slot="title">个人中心</span>
            </el-menu-item>
            <el-menu-item index="/admin/myself">
              <i class="el-icon-user-solid"></i>
              <span slot="title">信息编辑</span>
            </el-menu-item>

            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>内容管理</span>
              </template>
              <el-menu-item index="/admin/createhelplist">论坛</el-menu-item>
              <el-menu-item
                index="/admin/createactivitylist"
                :disabled="userinfo.realstate !== 3"
              >活动</el-menu-item>
              <el-menu-item
                index="/admin/createoldstufflist"
                :disabled="userinfo.realstate !== 3"
              >咸鱼</el-menu-item>
              <el-menu-item index="/admin/company" :disabled="userinfo.companystate !== 3">招聘</el-menu-item>
              <el-menu-item index="/admin/articlelist" :disabled="userinfo.realstate !== 3">资讯</el-menu-item>
            </el-submenu>
            <el-menu-item index="/admin/notice">
              <i class="el-icon-bell"></i>
              <span slot="title">通知中心</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-container>
          <el-main>

            <router-view />
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      tableData: []
    }
  },
  computed: {
    ...mapState({
      userinfo: state => state.user.userinfo
    })
  }
}
</script>
<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.min {
  width: 70%;
  min-height: 500px;
  margin-left: 15%;
}
</style>
