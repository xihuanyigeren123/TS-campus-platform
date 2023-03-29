<template>
  <div class="news">
    <div v-title data-title=" 唐师人 | 资讯"></div>
    <div class="page-container">
      <div class="container">
        <div class="" style="display:flex;">
          <div class="page-content">
            <div class="page-header">
              <span style="font-size:20px; font-weight: 500;">
                <i class="el-icon-monitor"></i>    <strong>新闻资讯</strong>
              </span>

              <!-- <small>{{ smallttle }}</small> -->
            </div>
            <ul class="tabs-nav">
              <li
                :class="
                  pagelistquery.lable === '' && pagelistquery.tag === ''
                    ? 'active'
                    : ''
                "
                @click="changelable('')"
              >
                <a>全部</a>
              </li>
              <li
                v-for="(lable, id) in lables"
                :key="id"
                :class="pagelistquery.lable === lable ? 'active' : ''"
                @click="changelable(lable)"
              >
                <a>{{ lable }}</a>
              </li>
              <li v-if="pagelistquery.tag != ''" class="active" @click="changelable('')">
                <a>{{ this.pagelistquery.tag }}</a>
              </li>
            </ul>
            <div  v-loading="loading">
            <article
              class="format-standard type-post hentry clearfix article"
              v-for="(item, id) in tableData"
              :key="id"
             
            >
              <header class="header">
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
              <div class="content">
                <h4 class="post_titles" style="margin:0;">
                  <router-link :to="'/newscontent/' + item.article_id">
                    {{
                    item.article_title
                    }}
                  </router-link>
                </h4>
                <p style="margin:10px 0;">
                  <router-link
                    :to="'/newscontent/' + item.article_id"
                    class="readmore-link"
                  >{{ item.article_introduction }}...</router-link>
                </p>
              </div>
            </article>
</div>
            <el-pagination
              @current-change="handleCurrentChange"
              layout="prev, pager, next"
              :total="pagelistquery.total"
            ></el-pagination>
          </div>
          <aside class=" page-sidebar">
            <carousel />
            <oldstuffhot />
          </aside>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import carousel from '@/components/carousel.vue'
import oldstuffhot from '@/components/oldstuffhot.vue'

export default {
  name: 'news',
  components: {
    carousel,
    oldstuffhot
  },
  data() {
    return {
      smallttle: '',
      lables: [],
      pagelistquery: {
        lable: '',
        tag: '',
        total: 0,
        pagesize: 5,
        page: 1
      },
      tableData: {},
      loading:false,
    }
  },
  props: {
    tag: {}
  },
  methods: {
    changelable(lable) {
      this.pagelistquery.lable = lable
      this.smallttle = this.pagelistquery.lable
      this.pagelistquery.tag = ''
      this.getarticlelist()
    },
    changetag() {
      this.pagelistquery.tag = this.tag
      this.smallttle = this.tag
    },
    handleCurrentChange(val) {
      this.pagelistquery.page = val
      this.getarticlelist()
    },
    async getarticlelist() {
      this.loading = true
      let res = await this.$axios.post(
        '/web/getarticlelist',
        this.qs.stringify(this.pagelistquery)
      )
      if (res.data.state.type === 'SUCCESS') {
        this.tableData = res.data.data
        console.log(res.data)
        this.pagelistquery.total = res.data.count
      }
          this.loading = false
    },
    async lablelist() {
      let res = await this.$axios.post(
        '/admin/lablelist',
        this.qs.stringify({ lable_name: '文章分类' })
      )
      if (res.data.state.type === 'SUCCESS') {
        // this.lable = res.data.data
        this.lables = JSON.parse(res.data.data[0].lable)
        console.log(this.lables, ' this.lables ')
      }
    }
  },
  created() {
    this.tag && this.changetag()
    this.getarticlelist()
    this.lablelist()
  }
}
</script>
<style scoped>
.tabs-nav{
  display: flex;
  cursor:pointer;
  margin-bottom:5px;
  background-color: #edeff4;
  border-radius: 20px;
  width: 770px;
}

.tabs-nav li {
  /* padding: 5px 10px; */
  border-radius: 20px;
}

.page-container{
  background-color: red;
}
.news {
  min-height: 200px;
  margin-top: 80px;
}
.header {
  border-top: 1px solid #edeff4;
}
.post-header {
  padding: 10px 0;
}
.post-header span {
  padding: 0 8px;
}
.content{
  padding:0 8px;
}
.article:hover{
  background-color: #eceff0;
}
.page-content{
  min-width: 770px;
}
</style>
