<template>
  <div class="home">
    <div v-title data-title="唐师人|首页"></div>

    <!-- Start of Page Container -->
    <div class="page-container">
      <div class="container">
        <div class="row">
          <div class="span8 page-content">
            <help />
            <oldstuff />
            <news />
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
<style>
.guomore {
  /* float: right; */
}
</style>
