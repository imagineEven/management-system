<template>
  <div class="task_wrapper">
    <div class="header flex">
      <div class="task_toggle">
        <div class="toggle_info" @click="clickToggleAll" :style="{backgroundImage: 'url(' + toggle_image + ')'}">
        </div>
      </div>
    </div>
    <div class="swiper_detail">
      <swiper :options="swiperOption" ref="swiper" v-if="cardDetailData && swiperOption">
        <swiper-slide v-for="(item, index) in cardDetailData" :key="index" v-if="cardDetailData">
          <div class="swiper_inner" v-if="cardDetailData">
            <div class="homework_card public_card" v-if="item.isHomeWork">
              <div class="homework_info">
                  <div class="title public_left">
                    {{ item.pTitle }} - {{ item.title }}
                  </div>
                  <div class="title_detail public_left">已开放，请及时前往</div>
                <div class="progress public_left">
                  <div class="progress_title">
                    完成进度:
                  </div>
                  <div class="progress_strip">
                    <box gap="10px">
                      <x-progress :percent="(item.appCount===0?0:(item.finishedCount/item.appCount)*100)" :show-cancel="false"></x-progress>
                    </box>
                  </div>
                  <div class="progress_num">
                    {{ item.finishedCount }}/{{ item.appCount }}
                  </div>
                </div>
                <div class="class_info public_left">
                  {{ item.className }} ({{ item.teachingMaterialName }})
                </div>
                <div class="completion public_left">
                  {{ item.studentCompleteCount }}人已经完成
                </div>
              </div>
            </div>
            <div class="task_card public_card" v-if="!item.isHomeWork">
              <div class="task_info">
                <div class="title public_left">
                  {{ item.learnTaskName }}
                </div>
                <div class="teacher_give_card public_left">
                  {{ item.teacherName }}老师给你推送了任务卡
                </div>
                <div class="start_up_card public_left">
                  请及时启动该任务
                </div>
                <div class="progress public_left">
                  <div class="progress_title">
                    完成进度:
                  </div>
                  <div class="progress_strip">
                    <box gap="10px">
                      <x-progress :percent="item.appCount===0?0:(item.finishedCount/item.appCount)*100" :show-cancel="false"></x-progress>
                    </box>
                  </div>
                  <div class="progress_num">
                    {{ item.finishedCount }}/{{ item.appCount }}
                  </div>
                </div>
              </div>
            </div>
            <div class="entry">
              <div class="entry_button" v-if="!item.isHomeWork" @click="onClickTaskList">
              </div>
              <div class="entry_button" v-if="item.isHomeWork" @click="onClickEntry">
              </div>
            </div>
            <div class="homeWork_state_detail" v-if="item.isHomeWork">
              <div class="time_detail">
                <div class="publish_time" v-show="item.beginTime">
                  发布时间：{{ item.beginTime | toDate }}
                </div>
                <div class="complete_time" v-show="item.completeTime">
                  完成时间：{{ item.completeTime | toDate }}
                </div>
              </div>
              <div class="state_trophy" v-show="item.isComplete">
              </div>
            </div>
            <div class="task_state_detail" v-if="!item.isHomeWork">
              <div class="time_detail">
                <div class="publish_time" v-show="item.publishTime">
                  发布时间：{{ item.beginTime | toDate}}
                </div>
                <div class="complete_time" v-show="item.completeTime">
                  完成时间：{{ item.completeTime | toDate }}
                </div>
              </div>
              <div class="state_image" v-show="item.isOverdue">
              </div>
              <div class="state_trophy" v-show="item.finished">
              </div>
              <div class="state_hourglas_wrap" v-show="!item.finished">
                <div class="state_hourglas">
                  <div class="state_hourglas_taskCenter">
                    <CountDown :startTime="(new Date()).getTime()" :endTime="item.endTime" v-on:end_callback="countDownE" :index="index"></countdown>
                  </div>  
                </div>
              </div>

            </div>
          </div> 
        </swiper-slide>
      </swiper>
    </div>
    <div class="pagination">
      <div class="swiper-pagination swiper_pagination" slot="pagination"></div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
// import { XProgress, Box } from "vux";
import switchState1 from "../../assets/image/taskcenter/btn_all.png";
import switchState0 from "../../assets/image/taskcenter/btn_without.png";
import map1 from "../../assets/image/public/btn_map.png";
import map0 from "../../assets/image/public/btn_map.png";
import task1 from "../../assets/image/public/btn_task_normal.png";
import task0 from "../../assets/image/public/btn_task_press.png";
import personal1 from "../../assets/image/public/btn_personal_normal.png";
import personal0 from "../../assets/image/public/btn_personal_press.png";
import {
  getTaskCenter,
  getStuLearnBooks,
  getPersonalCenter
} from "api/getData";
import { dataFormatter } from "@/assets/js/formatter";
import { changeTaskCenterJson } from "@/assets/js/publicMethods.js";
import CountDown from "@/components/countdown.vue";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      toggle_image: switchState1,
      taskIcon: task0,
      mapIcon: map1,
      personalIcon: personal1,
      isShowAll: true,
      cardDetailData: "",
      newData: "",
      nowIndex: 0,
      swiperOption: {
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        pagination: {
          el: ".swiper-pagination",
          type: "fraction"
        },
        on: {
          slideChange: this.slideChange,
          //init: this.initSlider
        }
      }
    };
  },
  methods: {
    ...mapActions(["toggleLoadShow"]),
    initSlider() {
      this.$nextTick(() => {
        let localIndex = Number(localStorage.getItem("activeIndex"));
        localIndex ? (this.swiper.activeIndex = localIndex) : undefined;
      });
    },
    onClickTaskList() {
      this.$router.push({
        path: "taskList",
        query: {
          teacherName: this.teacherName,
          learnTaskId: this.cardDetailData[this.nowIndex].learnTaskId
        }
      });
    },
    clickToggleAll() {
      this.isShowAll = !this.isShowAll;
      this.toggle_image = this.isShowAll ? switchState1 : switchState0;
      this.isShowAll
        ? (this.cardDetailData = this.newData.cardDetailData)
        : (this.cardDetailData = this.newData.UncompleteData);
    },
    slideChange() {
      this.nowIndex = this.swiper.activeIndex;
      this.teacherName = this.cardDetailData[this.nowIndex].teacherName;
      localStorage.setItem("activeIndex", JSON.stringify(this.nowIndex));
    },
    countDownE(val) {
      if (this.cardDetailData && !this.cardDetailData[val].isOverdue) {
        this.getData();
      }
    },
    onClickEntry() {
      this.$router.push({
        path: "/applist",
        query: this.cardDetailData[this.nowIndex]
      });
    },
    getData() {
      this.toggleLoadShow(true);
      new Promise(resolve => {
        getTaskCenter().then(data => {
          this.taskListData = data;
          resolve();
        });
      })
        .then(() => {
          return new Promise(resolve => {
            getPersonalCenter().then(data => {
              this.PersonalCenterData = data;
              resolve();
            });
          });
        })
        .then(() => {
          let book = JSON.parse(localStorage.getItem("books"));
          this.newData = new changeTaskCenterJson(
            book,
            this.PersonalCenterData,
            this.taskListData
          );
          this.cardDetailData = this.newData.cardDetailData;
              console.log(this.newData)
          this.toggleLoadShow(false);
        });
    }
  },
  created() {
    this.getData();
  },
  computed: {
    teacherName() {
      return this.cardDetailData[this.nowIndex].teacherName;
    },
    swiper() {
      return this.$refs.swiper.swiper;
    }
  },
  filters: {
    toDate(value) {
      let date = new Date(value);
      let Y = date.getFullYear() + ".";
      let M =
        (date.getMonth() + 1 < 10 ? date.getMonth() + 1 : date.getMonth() + 1) +
        ".";
      let D = date.getDate() + " ";
      return Y + M + D;
    }
  },
  components: {
    swiper,
    swiperSlide,
    // XProgress,
    // Box,
    CountDown
  }
};
</script>

<style lang="less">
@font: "Gentury Gothic";
.task_wrapper {
  position: relative;
  height: 100vh;
  width: 100vw;
  background: url("../../assets/image/taskcenter/bg.png") center no-repeat;
  background-size: 100% 100%;
}
.task_menu {
  margin-top: 60px;
  margin-left: auto;
}
.task_image {
  height: 100px;
  width: 100px;
  margin-left: 40px;
}
.task_people {
  margin-right: 70px;
}
.image_detail {
  height: 100%;
  width: 100%;
}
.task_toggle {
  margin-top: 70px;
  margin-left: 70px;
  color: #ffffff;
  height: 88px;
  width: 258px;
  .toggle_info {
    height: 100%;
    width: 100%;
    background: url("../../assets/image/taskcenter/btn_all.png") no-repeat;
    background-size: 100% 100%;
  }
}
.swiper_detail {
  margin-top: 45px;
  box-sizing: border-box;
  text-align: left;

  .public_left {
    padding-left: 72px;
  }

  .swiper_inner {
    width: 100%;
    height: 100%;
  }
  .public_card {
    box-sizing: border-box;
    padding: 35px;
  }
  .homework_card {
    width: 100%;
    height: 100%;
    background: url("../../assets/image/taskcenter/img_work.png") no-repeat;
    background-size: 100% 100%;
    color: #0153b1;

    .homework_info {
      width: 100%;
      height: 100%;
      padding-top: 200px;
    }
    .title {
      font-weight: bold;
      font-family: @font;
      font-size: 50px;
      width: 700px;
      margin-bottom: 26px;
    }
    .title_detail {
      font-size: 36px;
      margin-bottom: 110px;
    }
    .progress {
      display: flex;
      align-items: center;
      margin-bottom: 80px;
      .progress_title {
        font-size: 40px;
      }
      .progress_strip {
        width: 330px;
        .weui-progress__bar {
          height: 20px;
          border-radius: 10px;
          background: #a7cfea;
        }
        .weui-progress__inner-bar {
          height: 20px;
          border-radius: 10px;
          background: #499ae5;
        }
      }
      .progress_num {
        font-size: 32px;
      }
    }
    .class_info {
      margin-bottom: 20px;
      font-size: 30px;
      opacity: 0.8;
    }
    .completion {
      padding-bottom: 90px;
      font-size: 30px;
      opacity: 0.8;
    }
  }
  .task_card {
    width: 100%;
    height: 100%;
    background: url("../../assets/image/taskcenter/img_task.png") no-repeat;
    background-size: 100% 100%;

    .task_info {
      width: 100%;
      height: 100%;
      padding-top: 250px;
      color: #a50e00;
    }
    .title {
      font-weight: bold;
      font-family: @font;
      width: 700px;
      font-size: 50px;
      padding-bottom: 40px;
    }
    .teacher_give_card {
      font-size: 34px;
      padding-bottom: 22px;
    }
    .start_up_card {
      font-size: 34px;
      padding-bottom: 110px;
    }
    .progress {
      display: flex;
      align-items: center;
      margin-bottom: 80px;
      .progress_title {
        font-size: 40px;
      }
      .progress_strip {
        width: 330px;
        .weui-progress__bar {
          height: 20px;
          border-radius: 10px;
          background: #f0c2c2;
        }
        .weui-progress__inner-bar {
          height: 20px;
          border-radius: 10px;
          background: #ed4343;
        }
      }
      .progress_num {
        font-size: 32px;
      }
    }
  }
}
.swiper-wrapper > .swiper-slide {
  height: 1170px;
  width: 920px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.work_card_info {
  color: #0153b1;
}
.task_card_info {
  color: #a50e00;
}
.swiper-slide > .swiper_inner {
  transform: scale(0.8, 0.8);
  transition: all 0.2s;
  opacity: 0.7;
}
.swiper-slide-active > .swiper_inner {
  transform: scale(1, 1);
  transition: all 0.2s;
  opacity: 1;
}
.swiper-slide-next > .swiper_inner {
  position: relative;
  left: -50px;
}
.swiper-slide-prev > .swiper_inner {
  position: relative;
  left: 50px;
}
.pagination {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 80px;
  width: 120px;
}
.swiper_pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  height: 80px;
  width: 116px;
  background: url("../../assets/image/taskcenter/img_location.png") no-repeat;
  background-size: 100% 100%;
  font-size: 26px;
}
.state_image {
  height: 200px;
  width: 270px;
  background: url("../../assets/image/taskcenter/overdue.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  right: 40px;
  bottom: 40px;
}
.state_trophy {
  height: 85px;
  width: 85px;
  background: url("../../assets/image/taskcenter/success.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 35px;
  right: 60px;
}
.state_hourglas_wrap {
  position: absolute;
  bottom: -20px;
  width: 100%;
}
.state_hourglas {
  display: inline-block;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  height: 120px;
  background: url("../../assets/image/taskcenter/countdown.png") no-repeat;
  background-size: 100% 100%;
  text-align: center;
  padding: 32px 40px 0 80px;

  .state_hourglas_taskCenter {
    color: #a50e00;
    font-size: 42px;
  }
}
.homeWork_state_detail {
  .time_detail {
    color: #5b8dc5;
  }
}
.task_state_detail {
  .time_detail {
    color: #a50e00;
  }
}
.time_detail {
  position: absolute;
  bottom: 130px;
  left: 32%;
  font-size: 30px;
  opacity: 0.5;
  .publish_time {
    text-align: left;
    padding-bottom: 20px;
  }
  .complete_time {
    text-align: left;
  }
}
.entry {
  position: absolute;
  bottom: 250px;
  left: 31%;
  .entry_button {
    height: 107px;
    width: 310px;
    background: url("../../assets/image/taskcenter/btn_enter.png");
    background-size: 100% 100%;
  }
}
.entry_button_inner {
  display: inline-block;
  height: 100%;
  width: 100%;
}
</style>
