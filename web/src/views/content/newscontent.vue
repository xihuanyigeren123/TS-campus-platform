<template>
  <div id="newscontent">
    <div v-title data-title="新闻资讯"></div>

    <!-- Start of Page Container -->
    <div class="page-container">
      <div class="container">
        <div class="row">
          <!-- start of page content -->
          <div class="span8 page-content">
            <article class="type-post format-standard hentry clearfix">
              <h2 class="post--title">
                <i class="el-icon-coin"></i>
                {{ content.article_title }}
              </h2>

              <div class="post-meta clearfix">
                <div class="post-header">
                  <span class="categorys">
                    <i class="el-icon-user-solid"></i>
                   
                    <el-popover placement="right" width="400" trigger="hover">
                      <span>
                        <li class="comment even thread-odd thread-alt depth-1" id="li-comment-4">
                          <article id="comment-4">
                            <img
                              :src="content.avatar"
                              class="avatar touxiang avatar-60 photo"
                              height="60"
                              width="60"
                            />

                            <div class="comment-meta">
                              <h5 class="author">{{ content.nickname }}</h5>

                              <p class="date" v-if="content.realstate == 3">认证用户</p>
                              <p class="date" v-else>未认证用户</p>
                            </div>
                          </article>
                        </li>
                        <div class="xinxi">
                          <p style="  color: #000;">账号：</p>
                          <p>{{ content.username }}</p>
                        </div>
                        <div class="xinxi">
                          <p style="  color: #000;">邮箱：</p>
                          <p>{{ content.mail }}</p>
                        </div>
                        <div class="xinxi">
                          <p style="  color: #000;">QQ：</p>
                          <p>{{ content.qq }}</p>
                        </div>
                        <div class="xinxi">
                          <p style="  color: #000;">个人简介：</p>
                          <p>{{ content.synopsis }}</p>
                        </div>
                        <el-button
                          @click="jubao(content.username)"
                          style="margin:10px 150px"
                          type="danger"
                          plain
                        >举报</el-button>
                      </span>
                      <a
                        href="#"
                        slot="reference"
                        title="View all posts in Server &amp; Database"
                      >{{ content.nickname }}</a>
                    </el-popover>
                  </span> |
                  <span class="dates">
                    <i class="el-icon-date"></i>
                    {{
                    content.article_createtime | dataFormat
                    }}
                  </span>
 |
                  <span class="comments">
                    <i class="el-icon-chat-dot-round"></i>
                    {{ commentnum }}
                  </span>
                  <span class="like-count">
                    <i class="el-icon-view"></i>
                    {{ content.article_read_num }}
                  </span>
                </div>
                <!-- <span class="date">
                  {{
                  content.article_createtime | dataFormat
                  }}
                </span> -->
                <!-- <span class="category">
                  <el-popover placement="right" width="400" trigger="hover">
                    <span>
                      <li class="comment even thread-odd thread-alt depth-1" id="li-comment-4">
                        <article id="comment-4">
                          <img
                            :src="content.avatar"
                            class="avatar touxiang avatar-60 photo"
                            height="60"
                            width="60"
                          />

                          <div class="comment-meta">
                            <h5 class="author">{{ content.nickname }}</h5>

                            <p class="date" v-if="content.realstate == 3">认证用户</p>
                            <p class="date" v-else>未认证用户</p>
                          </div>
                        </article>
                      </li>
                      <div class="xinxi">
                        <p style="  color: #000;">账号：</p>
                        <p>{{ content.username }}</p>
                      </div>
                      <div class="xinxi">
                        <p style="  color: #000;">邮箱：</p>
                        <p>{{ content.mail }}</p>
                      </div>
                      <div class="xinxi">
                        <p style="  color: #000;">QQ：</p>
                        <p>{{ content.qq }}</p>
                      </div>
                      <div class="xinxi">
                        <p style="  color: #000;">个人简介：</p>
                        <p>{{ content.synopsis }}</p>
                      </div>
                      <el-button
                        @click="jubao(content.username)"
                        style="margin:10px 150px"
                        type="danger"
                        plain
                      >举报</el-button>
                    </span>
                    <a
                      href="#"
                      slot="reference"
                      title="View all posts in Server &amp; Database"
                    >{{ content.nickname }}</a>
                  </el-popover>
                </span> -->

                <span class="like-count"></span>
              </div>

              <blockquote v-html="content.article_content"></blockquote>
            </article>

            <div class="like-btn">
              <form id="like-it-form" action="#" method="post">
                <span class="like-it"></span>
                <input type="hidden" name="post_id" value="99" />
                <input type="hidden" name="action" value="like_it" />
              </form>

              <span class="tags">
                <strong>标签</strong>
                <span
                  v-for="(tag, id) in content.help_tag"
                  @click="$router.push(`/help/${tag}`)"
                  :key="id"
                  class="label"
                >{{ tag }}</span>
              </span>
            </div>

            <comment />
          </div>
          <aside class="span4 page-sidebar">
            <carousel />
            <news />
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import carousel from '@/components/carousel.vue'
import comment from '@/components/comment.vue'
import news from '@/components/news.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'newscontent',
  components: {
    carousel,
    comment,
    news
  },
  data() {
    return {
      content: {}
    }
  },
  props: {
    id: {}
  },
  computed: {
    ...mapState({
      commentnum: state => state.commentnum
    })
  },
  methods: {
    ...mapActions(['setcontentid', 'setcontentinfo']),
    jubao(username) {
      let url = escape(window.location.href)
      this.$router.push({
        path: '/jubao',
        query: { user: username, url: url }
      })
    },
    async getarticlecontent() {
      let data = {
        id: this.id
      }
      let res = await this.$axios.post(
        '/web/getarticlecontent',
        this.qs.stringify(data)
      )
      if (res.data.state.type === 'SUCCESS') {
        this.content = res.data.data
        console.log(res.data.data.article_title)
        this.setcontentinfo({
          contentname: res.data.data.article_title,
          contentuserid: res.data.data.user_id
        })
        // this.content.help_tag = res.data.data.help_tag.split(",");
      }
    }
  },
  watch: {
    id: {
      handler(newVal) {
        this.getarticlecontent()
        this.setcontentid(this.id)
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    // this.getarticlecontent();
    this.setcontentid(this.id)
  }
}
</script>
<style scoped>
.post-header{
display: flex;
margin: 5px;
}
.post-header span{
padding: 0 5px;
}
.help {
  min-height: 200px;
}
.label {
  margin-left: 15px;
}
</style>
