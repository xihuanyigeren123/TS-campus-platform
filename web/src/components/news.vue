<template>
  <div class="help">
    <!-- start of page content -->
    <div>
      <router-link
        to="/news"
        tag="div"
        class="page-header"
        style="position:relative;cursor:pointer"
      >
        <h3>
          <i class="el-icon-monitor"></i> 新闻资讯
        </h3>
        <h4 style="  position: absolute;right: 100px;top: 4px;">
          更多
          <i class="el-icon-arrow-right"></i>
        </h4>
      </router-link>
      <article
        class="format-standard type-post hentry clearfix article"
        v-for="(item, id) in tableData"
        :key="id"
      >
        <header class="clearfix">
          <h3 class="post-title">
            <router-link :to="'/newscontent/' + item.article_id">
              {{
              item.article_title
              }}
            </router-link>
          </h3>
          <div class="post-header">
            <span class="categorys">
              <i class="el-icon-user-solid"></i>
              {{ item.nickname }}
            </span> |
            <span class="dates">
              <i class="el-icon-date"></i>
              {{
              item.article_createtime | dataFormat
              }}
            </span> |
            <span class="comments">
              <a href="#" title="Comment on Integrating WordPress with Your Website">资讯</a>
            </span>
            <span class="like-count">
              <i class="el-icon-view"></i>
              {{ item.article_read_num }}
            </span>
          </div>
        </header>

        <p>
          {{ item.article_introduction }}
          <router-link :to="'/newscontent/' + item.article_id" class="readmore-link">
            <i class="el-icon-more"></i>
          </router-link>
        </p>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: 'help',
  data() {
    return {
      smallttle: '',
      pagelistquery: {
        lable: '',
        tag: '',
        total: 0,
        pagesize: 3,
        page: 1
      },
      tableData: {}
    }
  },

  methods: {
    async getarticlelist() {
      let res = await this.$axios.post(
        '/web/getarticlelist',
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
    this.getarticlelist()
  }
}
</script>
<style scoped>
.help {
  padding: 10px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  margin-bottom: 10px;
  /* box-shadow: 5px 5px 5px 5px #ccc; */
}
.article:hover {
  background-color: #efefef;
}

.post-header {
  padding: 10px 0;
}
.post-header span {
  padding: 0 8px;
}
.help {
  min-height: 200px;
}
</style>
