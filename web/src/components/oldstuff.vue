<template>
  <div class="help">
    <section class="widget">
      <div class>
        <router-link
          to="/oldstuff"
          tag="div"
          class="page-header"
          style="position:relative;cursor:pointer"
        >
          <h3>
            <i class="el-icon-shopping-cart-1"></i>咸鱼市场
          </h3>
          <h4 style="  position: absolute;right: 100px;top: 4px;">
            更多
            <i class="el-icon-arrow-right"></i>
          </h4>
        </router-link>
        <div style="margin :1%;display:flex;flex-wrap:wrap;">
          <div class v-for="(oldstuff, id) in tableData" :key="id" style="padding:10px;">
            <router-link :to="'/oldstuffcontent/' + oldstuff.oldstuff_id">
              <div class="thumbnail" style="padding:10px;">
                <img
                  data-src="holder.js/100%x200"
                  alt="100%x200"
                  :src="oldstuff.oldstuff_img"
                  data-holder-rendered="true"
                  style="height: 200px; object-fit: cover;width: 200px; display: block;"
                />
                <div class="caption">
                  <h3 style="color:red">￥{{ oldstuff.oldstuff_price }}</h3>
                  <p>{{ oldstuff.oldstuff_name }}</p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pagelistquery: {
        lable: '',
        total: 0,
        pagesize: 6,
        page: 1
      },
      tableData: {}
    }
  },
  methods: {
    async getoldstufflist() {
      let res = await this.$axios.post(
        '/web/webgetweboldstufflist',
        this.qs.stringify(this.pagelistquery)
      )
      if (res.data.state.type === 'SUCCESS') {
        this.tableData = res.data.data
        console.log(res.data)
      }
    }
  },
  created() {
    this.getoldstufflist()
  }
}
</script>
<style scoped>
.help {
  /* width:5000px; */
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  padding: 0 10px;
}

.row {
  margin-top: 20px;
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
