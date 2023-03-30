<template>
  <div class="hoothelp">
    <section class="widget">
      <router-link
        to="/help"
        tag="div"
        class="page-header"
        style="position:relative;cursor:pointer"
      >
        <h3>
          <i class="el-icon-chat-dot-square"></i> 校园论坛
        </h3>
        <h4 style="  position: absolute;right: 100px;top: 4px;">
          更多
          <i class="el-icon-arrow-right"></i>
        </h4>
      </router-link>
      <ul class="articles">
        <li class="article-_entry standar-d" v-for="(item, id) in tableData" :key="id">
          <h4>
            <i class="el-icon-notebook-2"></i>
            <router-link :to="'/helpcontent/' + item.help_id">
              {{
              item.help_title
              }}
            </router-link>
          </h4>
          <span class="person">
            <!-- <a class="iconfont" style="margin-left:5px">&#xe688;</a> -->
            <i class="el-icon-user-solid"></i>
            {{item.nickname}}
          </span>|
          <span class="article-meta">{{ item.createtime | dataFormat }}</span>|
          <span class="like-count">
            <i class="el-icon-s-opportunity" style="color:red;"></i>
            {{ item.help_read_num }}
          </span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: 'hoothelp',
  data() {
    return {
      pagelistquery: {
        lable: '',
        tag: '',
        pagesize: 5,
        page: 1
      },
      tableData: {}
    }
  },
  props: {},
  methods: {
    async gethelplist() {
      console.log(this.pagelistquery)
      let res = await this.$axios.post(
        '/web/webgetwebhelplist',
        this.qs.stringify(this.pagelistquery)
      )
      if (res.data.state.type === 'SUCCESS') {
        this.tableData = res.data.data
        console.log(res.data)
        this.pagelistquery.total = res.data.count
      }
    }
  },
  created() {
    this.gethelplist()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hoothelp {
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  padding: 10px;
  /* box-shadow: 5px 5px 5px  #ccc; */
}
.articles li span{
padding: 0 5px;
}
</style>
