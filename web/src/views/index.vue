<template>
  <div class="index">
    <el-container>
      <el-header>
        <div class="header-wrapper" style="background-color:white;">
          <div class="logo-container" style="padding:15px;">
            <el-row>
              <el-col :span="4">
                <router-link to="/">
                  <img
                    style="width: 45px; height: 45px"
                    src="../assets/images/apple-icon-180x180.png"
                  />
                  <span class="tag-line" style="font-size: 20px">唐师人</span>
                </router-link>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple" style="line-height:45px;">北京----天气</div>
              </el-col>
              <el-col :span="8">
                <span style="font-size: 15px ;line-height:45px;">
                  <i class="el-icon-notebook-2"></i>
                  {{text}}
                </span>
              </el-col>
              <el-col :span="2" style="line-height:45px;text-align:center;">
                <span
                  style="background-color:#1989FA;color:white;padding:10px 20px;border-radius:5px;"
                  @click="navigateToadmin"
                >
                  <i class="el-icon-edit"></i>发布
                </span>
                <!-- <el-dropdown>
                  <el-button type="primary">
                    发布中心
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>黄金糕</el-dropdown-item>
                    <el-dropdown-item>狮子头</el-dropdown-item>
                    <el-dropdown-item>螺蛳粉</el-dropdown-item>
                    <el-dropdown-item>双皮奶</el-dropdown-item>
                    <el-dropdown-item>蚵仔煎</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>-->
              </el-col>
              <el-col :span="2">
                <div class="grid-content bg-purple" style="line-height:45px;">
                  <span v-if="avatar == ''">
                    <a @click="closein">登录/注册</a>
                  </span>
                  <el-dropdown v-else>
                    <a style="color: #c1cad1;">
                      <img
                        v-if="unread == 0"
                        style="height: 20px; "
                        :src="avatar"
                        class="avatar touxiang avatar-60 photo"
                        height="20"
                        width="20"
                      />
                      <el-badge v-else :value="unread" class="item">
                        <img
                          style="height: 20px; "
                          :src="avatar"
                          class="avatar touxiang avatar-60 photo"
                          height="20"
                          width="20"
                        />
                      </el-badge>
                      {{ nickname }}
                    </a>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>
                        <router-link to="/admin" tag="a" exact-active-class="current-menu-item">个人中心</router-link>
                      </el-dropdown-item>

                      <el-dropdown-item>
                        <router-link
                          to="/admin/notice"
                          tag="li"
                          exact-active-class="current-menu-item"
                        >
                          <a v-if="unread == 0">消息中心</a>
                          <el-badge v-else :value="unread" class="item">
                            <a>消息中心</a>
                          </el-badge>
                        </router-link>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <a @click="logout">退出登录</a>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-header>
      <el-aside style=" width: 200px;">
        <div class="nav">
          <el-menu default-active="2" class="el-menu-vertical-demo" router>
            <el-menu-item index="/">
              <template slot="title">
                <i class="el-icon-position"></i>
                <span>首页</span>
              </template>
              <!-- <el-menu-item-group>
                <el-menu-item index="/">....</el-menu-item>
                <el-menu-item index="1-2">...</el-menu-item>
              </el-menu-item-group>-->
            </el-menu-item>
            <el-submenu index="7">
              <template slot="title">
                <i class="el-icon-message"></i>
                <span>校园简介</span>
              </template>
              <el-menu-item-group>
                <!-- <template slot="title">分组一</template> -->
                <el-menu-item index="/school">简要介绍</el-menu-item>
                <el-menu-item index="/schoolview">校园风光</el-menu-item>
                <el-menu-item index="1-2">校园风光</el-menu-item>
                <el-menu-item index="1-2">校园风光</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/help">
              <template slot="title">
                <i class="el-icon-chat-dot-square"></i>
                <span>校园论坛</span>
              </template>
            </el-menu-item>

            <el-menu-item index="/activity">
              <template slot="title">
                <i class="el-icon-basketball"></i>
                <span>校园活动</span>
              </template>
            </el-menu-item>

            <el-menu-item index="/news">
              <template slot="title">
                <i class="el-icon-monitor"></i>
                <span>新闻资讯</span>
              </template>
              <!-- <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="/news">全部</el-menu-item>
                <el-menu-item index="1-2">...</el-menu-item>
              </el-menu-item-group>-->
            </el-menu-item>
            <el-menu-item index="/oldstuff">
              <template slot="title">
                <i class="el-icon-shopping-cart-1"></i>
                <span>咸鱼市场</span>
              </template>
              <!-- <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="/oldstuff">全部</el-menu-item>
                <el-menu-item index="1-2">...</el-menu-item>
              </el-menu-item-group>-->
            </el-menu-item>

            <el-menu-item index="/job">
              <template slot="title">
                <i class="el-icon-cherry"></i>
                <span>校园招聘</span>
              </template>
              <!-- <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="/job">全部</el-menu-item>
                <el-menu-item index="1-2">...</el-menu-item>
              </el-menu-item-group>-->
            </el-menu-item>

            <el-submenu index="8">
              <template slot="title">
                <i class="el-icon-connection"></i>
                <span>footer</span>
              </template>
              <el-menu-item-group>
                <!-- <template slot="title">分组一</template> -->
                <el-menu-item index="/job">全部</el-menu-item>
                <el-menu-item index="1-2">...</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </el-aside>
      <div class="img">
        <el-image src="https://www.tstc.edu.cn/images/18/12/12/1evmew9vkf/101.jpg"></el-image>
      </div>
      <el-main>
        <div class="content">
          <el-row :gutter="20">
            <el-col :span="16" :offset="5">
              <div class="grid-content bg-purple">
                <router-view />
              </div>
            </el-col>
          </el-row>
        </div>
      </el-main>
      <el-footer>
        <foot />
      </el-footer>
    </el-container>

    <!-- 弹窗组件 -->
    <div class="login" v-if="isclose">
      <div id="mask"></div>
      <div id="loginBox">
        <h2>{{ islogin ? '网站登录' : '新用户注册' }}</h2>
        <div class="user">
          账 号：
          <input type="text" v-model="username" name="username" class="text" />
        </div>
        <div class="pass">
          密 码：
          <input type="password" v-model="password" name="password" class="text" />
        </div>
        <div class="pass" v-if="!islogin">
          确 认：
          <input type="password" v-model="password1" name="password" class="text" />
        </div>
        <div class="button" v-if="islogin">
          <input type="button" @click="login" value="登录" class="submit" />
        </div>
        <div class="button" v-else>
          <input type="button" value="注册" @click="registered" class="submit" />
        </div>
        <div class="other" @click="join">{{ islogin ? '注册新用户' : '登录' }}</div>
        <a class="iconfont" @click="close">&#xe608;</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import foot from '@/components/foot.vue'
import moment from 'moment'

export default {
  name: 'index',
  components: {
    foot
  },
  data() {
    return {
      selected: 1,
      password: '',
      password1: '',
      username: '',
      hover: false,
      search: '',
      text: '',
      title: [
        '你只管努力，剩下的交给时间',

        '如今我努力奔跑，不过是为了追上那个曾经被寄予厚望的自己',

        '要有最朴素的生活和最遥远的梦想，即使明天天寒地冻，山高水远，路远马亡',

        '成功的秘诀就是每天都比别人多努力一点',

        '别抱怨努力的苦，那是你去看世界的路',

        '你必须非常努力，才能看起来毫不费力',

        '当你在荒废时间，有多少人在拼命。别在最该奋斗的日子，选择了安逸',

        '在你想要放弃的那一刻，想想为什么当初坚持走到了这里',

        '任何不走心的努力都是敷衍你自己',

        '再小的努力，乘以365都很明显',

        '专注你的梦想，做自己的英雄',

        '选一个方向，定一个时间；剩下的只管努力与坚持，时间会给我们最后的答案',

        '不要假装努力，结果不会陪你演戏',

        '当你真正喜欢做一件事时，自律就会成为你的本能',

        '梦想，可以天花乱坠，理想，是我们一-步一个脚印踩出来的坎坷道路',

        '你所做的一切努力并不会立即给你想要的一切 但可以让你逐渐成为你想成为的那一种人',

        '努力成为自己喜欢的那种人 就算不成功 至少你会喜欢 这样努力的自己',

        '你的压力来源于无法自律只是假装努力',
        '为梦想选择了远方，便没有回头路可以走。所以，要么战死沙场，要么狼狈回乡',
        '没有退路，只能让自己变得强大',
        '每天早上醒来时，我们可以有两个简单的选择：回头去睡，继续做梦。或者，起身去追逐梦想',

        '人生就是这样，要耐的住寂寞，才守得住繁华',

        '喜欢就要争取，不行就要努力',

        '只有经历地狱般的磨练，才能炼出创造天堂的力量',

        '梦想不是空口无凭的大话，而是在寂静的奋斗里努力生长的果实',

        '努力把平凡的日子堆砌成伟大的人生'
      ]
    }
  },
  computed: {
    ...mapState({
      isclose: state => state.user.isclose,
      islogin: state => state.user.islogin,
      islog: state => state.user.islog,

      avatar: state => state.user.userinfo.avatar,
      nickname: state => state.user.userinfo.nickname,
      unread: state => state.user.unread
    })
  },
  methods: {
    ...mapActions('user', [
      'setUserInfo',
      'changeislog',
      'setToken',
      'join',
      'close',
      'setunread',
      'deleteuserinfo'
    ]),
    //个人hover弹窗
    overShow() {
      this.hover = !this.hover
    },
    changeHref(sortnum) {
      switch (sortnum) {
        case 1:
          this.$router.push({ path: '/' })
          break
        case 2:
          this.$router.push({ path: '/help' })
          break
        case 3:
          this.$router.push({ path: '/activity' })
          break
        case 4:
          this.$router.push({ path: '/job' })
          break
        case 5:
          this.$router.push({ path: '/oldstuff' })
          break
        case 6:
          this.close()
          break
      }
    },
    //退出登录
    logout() {
      this.deleteuserinfo()
      this.$message.success('退出成功')
    },
    joinin() {
      this.join()
    },
    closein() {
      this.close()
    },
    onSubmit() {
      return false
    },
    searchbtn() {
      if (this.search == '') {
        this.$message.error('关键字不能为空')
        return
      }
      this.$router.push({ path: '/search', query: { search: this.search } })
    },
    registered() {
      const userReg = /^[1-9a-zA-Z]{1}[0-9a-zA-Z]{5,9}$/ //6-10位字母数字
      const pwdReg = /^[a-zA-Z]\w{5,17}$/ //6-18位字母数字下划线 字母开头
      if (!userReg.test(this.username)) {
        this.$message.error('账号为6-10位字母数字字母')
        return
      }
      if (!pwdReg.test(this.password)) {
        this.$message.error('密码为6-18位字母数字或下划线 字母开头')
        return
      }
      if (this.password !== this.password1) {
        this.$message.error('两次密码不相等')
        return
      }
      const obj = {
        password: this.password,
        username: this.username
      }
      this.$axios({
        url: '/webadmin/registered',
        method: 'POST',
        //  headers:{
        //    'Content-Type':'application/x-www-form-urlencoded',
        //    'Authorization': 'Bearer ' + window.localStorage.getItem('luffy_jwt_token')
        //    },
        data: this.qs.stringify(obj)
      })
        .then(res => {
          let data = res.data
          if (data.state.type !== 'SUCCESS') {
            if (data.state.type == 'ERROR_PARAMS_EXIST') {
              this.$message.error('用户名重复')
            } else {
              this.$message.error('注册失败')
            }
            return
          }
          this.$message.success('注册成功请登录')
          this.join()
        })
        .catch(e => {
          this.$message.error(e)
        })
    },
    //登录
    login() {
      if (this.password == '' || this.password == '') {
        this.$message.error('账号或者密码为空')
        return
      }
      // this.pwdhash = crypto
      //   .createHash("sha1")
      //   .update(this.password)
      //   .digest("hex");
      // let this_ = this;
      let obj = {
        password: this.password,
        username: this.username,
        type: ''
      }
      this.$axios({
        url: '/webadmin/login',
        method: 'POST',
        data: this.qs.stringify(obj)
      })
        .then(res => {
          let data = res.data.data
          if (res.data.state.type === 'SUCCESS') {
            this.$message.success('登录成功')
            // this.$store.user.dispatch("setUserInfo", data)
            this.setUserInfo(data.userinfo)
            this.setToken(data.token)
            this.changeislog()
            console.log(data)
            this.close()
          }
          if (res.data.state === 's') {
            let time = moment(res.data.data).format('YYYY-MM-DD HH:mm')
            this.$message.error(`您的账号由于不良行为被限制登录至${time}`)
          }
          if (res.data.state.type === 'ERROE')
            this.$message.error('用户名或密码错误')
        })
        .catch(e => {
          this.$message(e)
        })
    },
    async getnocitenmu() {
      const res = await this.$axios.post(
        '/web/getnotice',
        this.qs.stringify({ num: 1 })
      )
      console.log(res.data)
      this.setunread(res.data.data.count)
    },
    getRandomTitle() {
      let num = Math.floor(Math.random() * 25)
      this.text = this.title[num]
    },
    navigateToadmin() {
      if (this.islog) {
        this.$message.error('您没有相关权限')
        return
      }
      window.open(
        this.$router.resolve({
          path: '/admin/createhelplist'
        }).href,
        '_blank'
      )
    }
  },
  created() {
    localStorage.luffy_jwt_token && this.getnocitenmu()
  },
  mounted() {
    this.getRandomTitle()
    console.log(this.$store, 'this')
  }
}
</script>
<style scoped>
.index {
  background-color: #edeff4;
}
.el-header {
  position: fixed;
  width: 100vw;
  z-index: 999;
}
.el-aside {
  background-color: #fff;
  /* color: #333; */
  /* text-align: center; */

  line-height: 200px;
  height: 100vh;
  position: fixed;
  z-index: 1;
}
.img {
  margin: 70px 0px 0 220px;
  object-fit: fill;
}
.el-main {
  /* margin-left: 200px; */
  /* width: 100vw; */
}
.el-footer {
  padding-left: 200px;
}
.index .nav {
  margin-top: 80px;
  width: 200px;
}
.container {
  margin: 0;
}
.logo-container {
  padding: 0;
}
.search-area-wrapper {
  /* background-image: url(""); */
}
.header-btn {
  background-color: #2c696d;
  font-size: 14px;
  line-height: 19px;
  font-weight: 600;
  padding: 14px 30px 15px;
  color: #fff;
  display: table;
  margin: 0 auto;
}
#mask {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  filter: alpha(Opacity=30);
  opacity: 0.2;
  margin: 0;
  /* display: none;  */
}
#loginBox {
  position: fixed;
  left: 50%; /* 定位父级的50% */
  top: 50%;
  transform: translate(-50%, -50%); /*自己的50% */
  z-index: 1000;
  width: 380px;
  height: 330px;
  border: 1px solid #ccc;
  background-color: #fff;
  /* display: none;  */
}
#loginBox h2 {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  letter-spacing: 1px;
  color: #666;
  /* background: url(../images/login_header.png) repeat-x; */
  margin: 0;
  padding: 0;
  border-bottom: 1px solid #ccc;
  margin: 0 0 20px 0;
}
#loginBox h2 img {
  display: block;
  float: right;
  position: relative;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
#loginBox .user,
#loginBox .pass {
  font-size: 14px;
  color: #666;
  padding: 5px 0;
  text-align: center;
}
#loginBox input.text {
  width: 200px;
  height: 25px;
  font-size: 14px;
  border: 1px solid #ccc;
  background-color: #fff;
}
#loginBox .button {
  text-align: center;
  padding: 10px 0;
}
#loginBox input.submit {
  width: 107px;
  height: 30px;
  background-color: rgb(179, 146, 233);
  border: none;
  cursor: pointer;
}
#loginBox .other {
  text-align: right;
  padding: 15px 10px;
  font-size: 14px;
  color: #666;

  cursor: pointer;
}
.iconfont {
  font-size: 20px;
  color: #000;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
</style>
