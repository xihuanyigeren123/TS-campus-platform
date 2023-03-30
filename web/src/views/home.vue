<template>
  <div class="home">
    <div v-title data-title="唐师人|首页"></div>

    <div class="contents">
      <div class="page-contents">
        <news />
        <help />
        <oldstuff />
      </div>

      <div class="page-aside">
        <carousel />
        <activity />
        <job />
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
// import job from "@/components/job.vue";
import carousel from '@/components/carousel.vue'
import activity from '@/components/activity.vue'
import news from '@/components/news.vue'
import help from '@/components/help.vue'
import oldstuff from '@/components/oldstuff.vue'
import job from '@/components/job.vue'

export default {
  name: 'home',
  components: {
    news,
    oldstuff,
    job,
    activity,
    carousel,
    help
  }
}
</script>
<style scoped>
.home {
  padding: 15px;
  /* background-color: #fff; */
}
.contents {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
.page-contents {
  background-color: #fff;
  flex: 1;
}
.page-aside {
  margin-left: 15px;
  width: 300px;
  background-color: #fff;
  overflow: hidden;
}
</style>
