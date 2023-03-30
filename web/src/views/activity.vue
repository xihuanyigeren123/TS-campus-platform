<template>
  <div class="help">
    <div v-title data-title="学生信息交流平台  | 活动"></div>

    <div class="page-container">
      <div class="contents">
       
          <div class="page-contents">
            <div>
              <h3 class="title">
                <i class="el-icon-basketball"></i>校园活动
              </h3>
            </div>
            <ul class="tabs-nav">
              <li :class="pagelistquery.lable === '' ? 'active' : ''" @click="changelable('')">
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
            </ul>
            <section class="widget">
              <ul class="articles">
                <li class="article-entry standard" v-for="(activity, id) in tableData" :key="id">
                  <h4>
                    <router-link
                      :to="'/activitycontent/' + activity.activity_id"
                    >{{ activity.activity_title }}</router-link>
                  </h4>
                  <span class="article-meta">
                    <a class="iconfont">&#xe619;</a>
                    {{ activity.createtime | dataFormat }}
                    <a
                      class="iconfont"
                      style="margin-left:50px"
                    >&#xe609;</a>
                    {{ activity.activity_locale }}
                  </span>
                  <span class="like-count">
                  
                      <i class="el-icon-view"></i>
                      {{ activity.activity_read_num }}
                   
                  </span>
                </li>
              </ul>
            </section>
            <el-pagination
              @current-change="handleCurrentChange"
              layout="prev, pager, next"
              :total="pagelistquery.total"
            ></el-pagination>
          </div>
      
          <div class="page-aside">
            <carousel />
            <job />
          </div>

        
      </div>
    </div>
  </div>
</template>

<script>
import job from '@/components/job.vue'
import carousel from '@/components/carousel.vue'
export default {
  components: {
    carousel,
    job
  },
  data() {
    return {
      smallttle: '',
      lables: [],
      pagelistquery: {
        lable: '',
        total: 0,
        pagesize: 10,
        page: 1
      },
      tableData: {}
    }
  },
  methods: {
    changelable(lable) {
      this.pagelistquery.lable = lable
      this.smallttle = this.pagelistquery.lable
      this.getactivitylist()
    },
    handleCurrentChange(val) {
      this.pagelistquery.page = val
      this.gethelplist()
      console.log(`当前页: ${val}`)
    },
    async getactivitylist() {
      let res = await this.$axios.post(
        '/web/webgetwebactivitylist',
        this.qs.stringify(this.pagelistquery)
      )
      if (res.data.state.type === 'SUCCESS') {
        this.tableData = res.data.data
        console.log(res.data)
        this.pagelistquery.total = res.data.count
      }
    },
    async lablelist() {
      let res = await this.$axios.post(
        '/admin/lablelist',
        this.qs.stringify({ lable_name: '活动分类' })
      )
      if (res.data.state.type === 'SUCCESS') {
        // this.lable = res.data.data
        this.lables = JSON.parse(res.data.data[0].lable)
        console.log('分类列表')
        console.log(this.lables)
      }
    }
  },
  created() {
    this.getactivitylist()
    this.lablelist()
  }
}
</script>
<style scoped>
.help {
  min-height: 200px;
}
.contents {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
.page-contents {
  background-color: #fff;
  padding:10px;
  flex: 1;
}
.page-aside {
  margin-left: 15px;
  width: 300px;
  background-color: #fff;
  overflow: hidden;
}
</style>
