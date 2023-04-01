<template>
  <div class="helper">
    <div v-title data-title="  唐师人| 论坛"></div>

    <div class="page-container">
      <div class="contents">
        <div class="page-contents">
          <div>
            <h3>
              <i class="el-icon-chat-dot-round"></i>
              校园论坛
            </h3>
          </div>

          <ul class="tabs">
            <li
              :class="
                  pagelistquery.lable === '' && pagelistquery.tag === ''
                    ? 'actives'
                    : ''
                "
              @click="changelable('')"
            >
              <a>全部</a>
            </li>
            <li
              v-for="(lable, id) in lables"
              :key="id"
              :class="pagelistquery.lable === lable ? 'actives' : ''"
              @click="changelable(lable)"
            >
              <a>{{ lable }}</a>
            </li>
            <li v-if="pagelistquery.tag != ''" class="actives" @click="changelable('')">
              <a>{{ this.pagelistquery.tag }}</a>
            </li>
          </ul>
        
          <section class="widget">
            <ul class="articles">
              <li class="article-entry standard" v-for="(item, id) in tableData" :key="id">
                <h4>
                  <router-link :to="'/helpcontent/' + item.help_id">
                    {{
                    item.help_title
                    }}
                  </router-link>
                </h4>
                <span class="article-meta">
                  <a class="iconfont">&#xe619;</a>
                  {{ item.createtime | dataFormat }}
                  <a
                    class="iconfont"
                    style="margin-left:50px"
                  >&#xe688;</a>
                </span>
                <span class="like-count">
                  <a class="iconfont">&#xe61c;</a>
                  {{ item.help_read_num }}
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
          <oldstuffhot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import carousel from '@/components/carousel.vue'
import oldstuffhot from '@/components/oldstuffhot.vue'
export default {
  name: 'help',
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
        pagesize: 10,
        page: 1
      },
      tableData: {}
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
      this.gethelplist()
    },
    changetag() {
      this.pagelistquery.tag = this.tag
      this.smallttle = this.tag
    },
    handleCurrentChange(val) {
      this.pagelistquery.page = val
      this.gethelplist()
      console.log(`当前页: ${val}`)
    },
    async gethelplist() {
      let res = await this.$axios.post(
        '/web/webgetwebhelplist',
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
        this.qs.stringify({ lable_name: '问答分类' })
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
    this.tag && this.changetag()
    this.gethelplist()
    this.lablelist()
  }
}
</script>
<style scoped>
.helper {
  min-height: 200px;
}
.row {
  padding: 10px;
  display: flex;
}
.aside {
  margin-left: 100px;
}
.contents {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
.page-contents {
  padding: 10px;

  background-color: #fff;
  flex: 1;
}
.page-aside {
  padding: 10px;
  margin-left: 15px;
  width: 300px;
  background-color: #fff;
  overflow: hidden;
}
/* taeb-switch styles */
.tabs {
  background-color: #eee;
  width: 300px;
  border-radius: 25px;
  padding: 5px;
}

.tabs:after {
  content: '';
  width: 50%;
  top: 0;
  transition: left cubic-bezier(0.88, -0.35, 0.565, 1.35) 0.4s;
  /* border-radius: 27.5px; */
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
  height: 100%;
  z-index: 0;
}

.tabs.left:after {
  left: 0;
}

.tabs.right:after {
  left: 50%;
}

.tabs li {
  display: inline-block;
  /* width: 50%; */
  border-radius: 20px;

  padding: 12px 6px;
  z-index: 1;
  cursor: pointer;
  transition: color 200ms;
  font-size: 16px;
  font-weight: bold;
  line-height: normal;
  user-select: none;
}

.tabs li .actives {
  color: #ffffff;
  background-color: red;
}

.wrapper {
  border-radius: 37px;
  background-color: #f4f4f4;
  padding: 8px;
  width: 100%;
  max-width: 316px;
  margin-left: auto;
  margin-right: auto;
}

.taeb-switch {
  position: relative;
}

.taeb-switch:after {
  content: '';
  position: absolute;
  width: 50%;
  top: 0;
  transition: left cubic-bezier(0.88, -0.35, 0.565, 1.35) 0.4s;
  border-radius: 27.5px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
  background-color: #3d90ef;
  height: 100%;
  z-index: 0;
}

.taeb-switch.left:after {
  left: 0;
}

.taeb-switch.right:after {
  left: 50%;
}

.taeb-switch .taeb {
  display: inline-block;
  width: 50%;
  padding: 12px 0;
  z-index: 1;
  position: relative;
  cursor: pointer;
  transition: color 200ms;
  font-size: 16px;
  font-weight: bold;
  line-height: normal;
  user-select: none;
}

.taeb-switch .taeb.active {
  color: #ffffff;
}

/* other styles */
html {
  box-sizing: border-box;
}

*,
*:after,
*:before {
  box-sizing: inherit;
}

* {
  outline: 0;
}

html,
body {
  min-height: 100%;
  height: 100%;
}

body {
  margin: 0;
  background-color: #ffffff;
  color: #3d90ef;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-center {
  text-align: center;
}

main {
  width: 100%;
}

.wrapper {
  border-radius: 37px;
  background-color: #f4f4f4;
  padding: 8px;
  width: 100%;
  max-width: 316px;
  margin-left: auto;
  margin-right: auto;
}
</style>
