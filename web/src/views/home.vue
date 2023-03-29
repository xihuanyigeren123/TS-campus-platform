<template>
  <div class="home">
    <div v-title data-title="唐师人|首页"></div>
      
        <div class="content">
          <div class="page-content">
            <news />
            <help />
            <oldstuff />
            
          </div>
          <!-- <aside class="span4 page-sidebar">
            <section class="widget">
              <carousel />
              <activity />
              <job />
            </section>
          </aside> -->
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
    // job,
    // activity,
    // carousel,
    help
  }
}
</script>
<style scoped>
.content {
  background-color: #fff;
  padding: 0;
  margin-top:120px;
  /* width: 600px; */
}
</style>
