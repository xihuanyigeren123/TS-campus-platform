<template>
  <div
    class="person-detail"
    style=" box-shadow: 0 2px 12px 0 skyblue;margin-bottom:10px;padding:5px"
  >
    <div class="header" style=" display: flex;align-items: center;margin:10px 0 10px 30px;">
      <el-avatar :size="50" :src="content.avatar"></el-avatar>
      <div class="name" style=" margin-left: 10px;">
        <div>{{ content.nickname }}</div>
        <span v-if="content.realstate == 3" style="color:green">认证用户</span>
        <span v-else style="color:red">未认证用户</span>
        <span>@{{ content.username }}</span>
      </div>
    </div>

    <div class="detail" style="padding:10px 20px 10px 40px;">
      <div style="color: #000;">
        <i class="el-icon-message" style="color:skyblue;"></i>
        邮箱：{{ content.mail }}
      </div>
      <div style="color: #000;">
        <i class="el-icon-phone-outline" style="color:skyblue;"></i>
        QQ:： {{ content.qq }}
      </div>
      <div style="color: #000;">
        <i class="el-icon-s-custom" style="color:skyblue;"></i>
        个人简介：{{ content.synopsis }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
</style>