<template>
  <div class="help">
    <div v-title data-title="论坛详情"></div>

    <div class="contents">
      <div class="page-contents">
        <article class="type-post format-standard hentry clearfix">
          <h2 class="post-title">
            <i class="el-icon-reading"></i>
            <a>{{ content.help_title }}</a>
          </h2>

          <div class="post-meta clearfix">
            <span class="date">{{ content.createtime | dataFormat }}</span>
            <span class="category">
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
            </span>
            <span class="comments">
              <a
                href="#"
                title="Comment on Integrating WordPress with Your Website"
              >{{ commentnum }} Comments</a>
            </span>
            <span class="like-count"></span>
          </div>

          <blockquote v-html="content.help_content"></blockquote>
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

        <comment />>
      </div>
      <div class="page-aside">
        <person :content="content"/>
        <carousel />
        <help />
      </div>
    </div>
  </div>
</template>

<script>
import carousel from '@/components/carousel.vue'
import comment from '@/components/comment.vue'
import help from '@/components/help.vue'
import person from '@/components/person.vue'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    carousel,
    comment,
    help,
    person
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
    async gethelpcontent() {
      let data = {
        id: this.id
      }
      let res = await this.$axios.post(
        '/web/gethelpcontent',
        this.qs.stringify(data)
      )
      if (res.data.state.type === 'SUCCESS') {
        this.content = res.data.data
        console.log(res.data.data.help_title)
        this.setcontentinfo({
          contentname: res.data.data.help_title,
          contentuserid: res.data.data.user_id
        })
        this.content.help_tag = res.data.data.help_tag.split(',')
      }
    }
  },
  watch: {
    id: {
      handler(newVal) {
        this.gethelpcontent()
        this.setcontentid(this.id)
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    // this.gethelpcontent();
    this.setcontentid(this.id)
  }
}
</script>
<style scoped>
.help {
  min-height: 200px;
}
.label {
  margin-left: 15px;
}
</style>
