<template>
  <section class="container">
    <div>
      <el-button size="mini" @click="handleClick()" type='primary'>编辑</el-button>
      <logo />
      <h1 class="title">
        ndxs
      </h1>
      <h2 class="subtitle">
        ndxs
      </h2>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
      </div>
			<el-checkbox-group v-model="checkList.choose" @change='showCheckList(dd)'>
				<el-checkbox label="复选框 A"></el-checkbox>
				<el-checkbox label="复选框 B"></el-checkbox>
				<el-checkbox label="复选框 C"></el-checkbox>
				<el-checkbox label="禁用" disabled></el-checkbox>
				<el-checkbox label="选中且禁用" disabled></el-checkbox>
			</el-checkbox-group>
    </div>
			<div style='width:100%;overflow:hidden;clear:both;text-align:center;height:80px;'>
				<swiper :options="swiperOption" ref="mySwiper">
					<!-- slides -->
					<swiper-slide  v-for='arrItem,index in arr' :key='index' >
						<swiper :options="swiperOption2" ref="mySwipers">
								<swiper-slide  v-for='item in arrItem' :key='item' style='line-height:80px;'>
									{{item}}
								</swiper-slide>
						</swiper>
					</swiper-slide >
					<!-- Optional controls -->
				</swiper>
			</div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import commonMixin from '@/mixins/commonMixin'
export default {
  mixins: [commonMixin],
    components: {
      Logo,
    },
    data () {
      return {
        checkList: {
					choose: []
				},
				dd: '123',
				arr: [
					[1,2,3],
					[4,5,6],
					[7,8,9],
				],
        swiperOption: {
          grabCursor : true,
					direction: 'vertical'
        },
        swiperOption2: {
          grabCursor : true,
        }
      };
    },
		computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    methods: {
			showCheckList(x){
				
				console.log(x);
				console.log(this.checkList)
			}, 
      handleClick() {
        this.$message.error('ok');
				this.swiper.slideTo(3, 1000, false);
        this.R.axios.get(`/edu/manager/query/user?name=&cellPhone=11000000189`)
          .then((res) => {
            console.log(res.data);
          })
          .catch(res => {})
      },
    }
  }
	
	
	
	
	
	
	
</script>

<style>
  .container {
    min-height: 100vh;
    //display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }
</style>
