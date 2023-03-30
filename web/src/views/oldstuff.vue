<template>
  <div class="help">
    <div v-title data-title="唐师人|  咸鱼"></div>

    <div class="contents">
      <div class="page-contents">
        <h3 class="title">
          <i class="el-icon-shopping-cart-1"></i>咸鱼市场
        </h3>

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
          <div
        
            style="margin :1%"
            class="img"
            v-for="(oldstuff, id) in tableData"
            :key="id"
           
          >
            <router-link :to="'/oldstuffcontent/' + oldstuff.oldstuff_id">
              <div class="thumbnail">
                <img
                  data-src="holder.js/100%x200"
                  alt="100%x200"
                  :src="oldstuff.oldstuff_img"
                  data-holder-rendered="true"
                  style="height: 200px; object-fit: cover;width: 150px; display: block;"
                />
                <div class="caption">
                  <h3 style="color:red">￥{{ oldstuff.oldstuff_price }}</h3>
                  <p>{{ oldstuff.oldstuff_name }}</p>
                </div>
              </div>
            </router-link>
          </div>
        </section>
        <el-pagination
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="pagelistquery.total"
          :page-size="pagelistquery.pagesize"
        ></el-pagination>
      </div>

      <div class="page-aside">
        <carousel />
        <activity />
        <news />
      </div>
    </div>
  </div>
</template>

<script>
import carousel from '@/components/carousel.vue'
import activity from '@/components/activity.vue'
import news from '@/components/news.vue'

export default {
  components: {
    carousel,
    activity,
    news
  },
  data() {
    return {
      lables: [],
      pagelistquery: {
        lable: '',
        total: 0,
        pagesize: 12,
        page: 1
      },
      tableData: {}
    }
  },
  methods: {
    changelable(lable) {
      this.pagelistquery.lable = lable
      this.smallttle = this.pagelistquery.lable
      this.getoldstufflist()
    },
    handleCurrentChange(val) {
      this.pagelistquery.page = val
      this.getoldstufflist()
      console.log(`当前页: ${val}`)
    },
    async lablelist() {
      let res = await this.$axios.post(
        '/admin/lablelist',
        this.qs.stringify({ lable_name: '二手分类' })
      )
      if (res.data.state.type === 'SUCCESS') {
        // this.lable = res.data.data
        this.lables = JSON.parse(res.data.data[0].lable)
      }
    },
    async getoldstufflist() {
      let res = await this.$axios.post(
        '/web/webgetweboldstufflist',
        this.qs.stringify(this.pagelistquery)
      )
      if (res.data.state.type === 'SUCCESS') {
        this.tableData = res.data.data
        this.pagelistquery.total = res.data.count
      }
    }
  },
  created() {
    this.getoldstufflist()
    this.lablelist()
  }
}
</script>
<style>

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
  flex: 1;
  padding: 10px;
}
.pages-contents .img{
  display: flex;
}
.page-aside {
  margin-left: 15px;
  width: 300px;
  background-color: #fff;
  overflow: hidden;
}
@media (min-width: 768px) {
  .col-sm-6 {
    width: 27.33333%;
  }
}
@media (max-width: 768px) {
  .col-sm-6 {
    width: 48%;
  }
}
</style>
