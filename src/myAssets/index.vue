<template>
  <div>
    <swiper :options="swiperOption" ref="swiper" v-if="unitList && swiperOption">
      <swiper-slide v-for="(uItem, index) in unitList" :key="index" v-if="unitList">
        <div class="course-wrap" v-if="unitList">
          <div class="course-map swiper-lazy" 
            :data-background="uItem.mapUrl"
            :style="{background: 'url(' + uItem.mapUrl + ') center center / 100% 100% no-repeat'}"
          > 
            <!-- <div class="swiper-lazy-preloader swiper-lazy-preloader-white" /> -->
            <div v-for="(item, idx) in unitList[unitSequence].chapters" :key="idx">
              <div class="course-chapter" :style="{left: (item.x * 100 / baseWidth) + '100%', top: (item.y * 100 / baseHeight) + '100%'}">
                <div class="course-bubble" :class="{'lock': item.isUnitLocked}" @click="gotoAppList(item)">
                  <div class="course-chapter-state" 
                    :style="{background: 'url(' + (item.isUnitLocked ? uItem.chapter.leftLockUrl : uItem.chapter.leftUrl) + ') center center / 100% 100% no-repeat'}"
                  >
                    <span class="chapter-unlock" 
                      :class="{'chapter-finish': item.isComplete, 'chapter-lock': item.isUnitLocked, 'chapter-new': item.isNewUpdate}" 
                    />
                  </div>
                  <div class="course-chapter-title" 
                    :style="{background: 'url(' + (item.isUnitLocked ? uItem.chapter.middleLockUrl : uItem.chapter.middleUrl) + ') center center / 100% 100% no-repeat'}"
                  >
                    <div class="course-text">{{item.title}}</div>
                  </div>
                  <div class="course-chapter-end" 
                    :style="{background: 'url(' + (item.isUnitLocked ? uItem.chapter.rightLockUrl : uItem.chapter.rightUrl) + ') center center / 100% 100% no-repeat'}"
                  />
                </div>
                <div class="course-chapter-progress" :style="{display: item.isUnitLocked ? 'none' : 'block'}">({{item.finished}}/{{item.total}})</div>
              </div>
            </div>
            <div class="course-unit"
              :style="{
                left: (unitList[unitSequence].x * 100 / baseWidth) + '100%', 
                top: (unitList[unitSequence].y * 100 / baseHeight) + '100%',
                background: 'url(' + bookList[bookSequence].unitUrl + ') center center / 100% 100% no-repeat'
              }">
              <div class="course-unit-pic" :style="{'background': uItem.imageName ? '#ffffff url(' + uItem.imgUrl + ') center center / 10.449vh 7.031vh no-repeat': '#ffffff'}"/>
              <span class="course-unit-title">{{uItem.title}}</span>
            </div>
          </div>
        </div>
        <div v-if="!uItem.isPublished" class="course-mask nopublish" @click="showBallon">
          <div class="course-hotballon" :class="{show: showBall}"></div>
        </div>
        <div v-else/>
      </swiper-slide>
    </swiper>
    <div class="course-book-single">
      <div class="course-book-btn" @click="toggleBook"/>
      <div class="course-book-open"
        @click="toggleBook" 
        :style="{background: 'url(' + (bookList[bookSequence] ? bookList[bookSequence].imgUrl : '') + ') center center / 100% 100% no-repeat'}"
      />
      <span v-if="bookList[bookSequence] && bookList[bookSequence].imgUrl" class="course-book-seq" v-font="{fontSize: 16, isVCenter: true, anchor:'100% 0'}" >{{bookSequence + 1}}</span>
    </div>
    <div id="courseBookBar" class="course-book-bar" :class="{'book-out': bookOut, 'book-in': bookIn}">
      <div class="course-books-outer">
        <div class="course-close-btn" @click="toggleBook" />
        <div class="course-books-inner">
          <div v-for="(item, index) in bookList" :key="index">
            <div class="course-book" 
              :class="{'current': item.sequence === bookSequence, 'finish': item.isComplete, 'new': item.isNewUpdate, 'over': item.isOver}"
              :style="{'display': !item.isPublished ? 'none': 'block', background: 'url(' + item.imgUrl + ') center center / 100% 100% no-repeat'}"
              @click="selectBook(item, index)"
            >
            <span v-if="item.imgUrl" class="course-book-seq" v-font="{fontSize: 20, isVCenter: true, anchor:'100% 0'}" >{{index + 1}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Toast />
  </div>
</template> 
<script>
// import { Badge } from "vux";
import { mapGetters, mapMutations } from 'vuex';
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { setTimeout } from "timers";
import { dataFormatter } from "assets/js/formatter";
import { getStuLearnBooks, updateBookState } from "api/getData";
import Toast from 'components/toast';
import position from "views/course/position";
import "assets/js/clamp";

export default {
  name: "course",
  components: {
    // Badge,
    swiper,
    swiperSlide,
    Toast
  },
  data() {
    return {
      baseWidth: 2048,
      baseHeight: 1536,
      bookOut: true,
      bookIn: false,
      aLock: false,
      bookList: [],
      unitList: [],
      showMask: false,
      showBall: false,
      remainPos: [...position],
      chapterObj: {},
      swiperOption: {
        observer: true,
        observeParents: true,
        resistanceRatio: 0,
        lazy: {
          loadPrevNext: true
        },
        on: {
          slideChange: this.handleChangeSlide
        }
      }
    };
  },
  computed: {
    ...mapGetters(['tShow', 'bookSequence', 'unitSequence']),
    swiper() {
      return this.$refs.swiper.swiper;
    }
  },
  created() {
    //获取课本所有数据
    getStuLearnBooks().then(res => {
      localStorage.setItem('jsonId', JSON.stringify(res[0].jsonId));
      res = res[0].books.filter(book => {
        return book.studyExerciseAssessList.length && ['IsLand', 'FunFair'].indexOf(book.teachingMaterialName) !== -1;
      });
      let data = dataFormatter(res);
      this.setToLocalStorage(data);
      
      if (!data.length) {
        this.SET_SERVICE_OPEN(false);
        this.TOGGLE_CONFIRM_BOX({
          isShow: true,
          btnType: 'done',
          haveCancel: false,
          content: '你的互动课本服务未开通\n请联系本班老师',
          fallback: this.handleConfirm
        });
        return;
      }
      let bookList = this.arrayAssign(data);
      this.bookList = bookList;
      this.unitList = bookList[this.$store.state.bookSequence].units;
      this.$nextTick(() => {
        this.swiper.activeIndex = this.$store.state.unitSequence;
        this.setUnitSize();
        this.changeFilterBackground();
        this.setTitleWidth();
        // this.showToast();
      });
    });
  },
  mounted() {
  },
  methods: {
    ...mapMutations(['SET_ALL_BOOKS','TOGGLE_CONFIRM_BOX', 'SET_SERVICE_OPEN', 'TOAST_SHOW', 'SET_BOOK_SEQUENCE', 'SET_UNIT_SEQUENCE']),
    handleConfirm() {
      this.$router.push({ path: '/userCenter' });
    },
    showToast() {
      let isLock = this.bookList[this.$store.state.bookSequence].units[this.$store.state.unitSequence].isUnitLock;
      if (!isLock)
        return;
      if (!this.tShow) {
        this.aLock = true;
        this.TOAST_SHOW(true);
        setTimeout(() => {
          this.aLock = false;
          this.TOAST_SHOW(false);
        }, 3000);
      }
    },
    setToLocalStorage(data) {
      let books = {};
      for (let book of data) {
        books[book.booksAndUnits[0].bookId] = book;
      }
      localStorage.setItem('books', JSON.stringify(books));
      this.SET_ALL_BOOKS(books);
    },
    gotoAppList(item) {
      if (this.aLock)
        return;
      if (item.isUnitLocked) {
        if (!this.tShow) {
          this.TOAST_SHOW(true);
          setTimeout(() => {
            this.TOAST_SHOW(false);
          }, 3000);
        }
        return;
      }
      if (item.isNewUpdate) {
        // 接口
        item.isNewUpdate = false;
      }
      this.$router.push({
        path: '/applist',
        query: item
      });
    },
    gotoTask() {
      this.$router.push('/taskCenter');
    },
    gotoPersonal() {
      this.$router.push('/userCenter');
    },
    handleChangeSlide() {
      this.SET_UNIT_SEQUENCE(this.swiper.activeIndex);
      this.aLock = false;
      this.TOAST_SHOW(false);
      this.$nextTick(() => {
        this.setUnitSize();
        this.changeFilterBackground();
        // this.showToast();
      });
    },
    setTitleWidth() {
      let chapters = this.bookList[this.$store.state.bookSequence].units[this.$store.state.unitSequence].chapters;
      for (let i = 0; i < chapters.length; i++) {
        let ele = document.getElementsByClassName('course-chapter-title')[i];
        if (!ele)
          return;
        let text = ele.children[0];
        let pixels = ele.getBoundingClientRect().width.toFixed(2);
        let vw = parseFloat(this.getViewPoint(pixels, document.documentElement.clientWidth));
        let maxVw = parseFloat(this.getViewPoint(336));
        if (vw > maxVw) {
          ele.style.width = this.getViewPoint(336);
          text.style.fontSize = this.getViewPoint(30); 
          text.style.lineHeight = this.getViewPoint(36);
          if (vw * 0.75 <= maxVw) {
            text.style.paddingTop = this.getViewPoint(30);
          } else {
            text.style.paddingTop = this.getViewPoint(13);
            text.style.paddingBottom = this.getViewPoint(5);
            text.style.wordWrap = 'break-word';
            $clamp(text, {clamp: 2});
          }
        }
      }
    },
    getViewPoint(pixels, clientWidth = this.baseHeight) {
      return this.toFixed(pixels * 100 / clientWidth, 3) + 'vh';
    },
    toFixed(number, precision) {
      let multiplier = Math.pow(10, precision + 1),
          wholeNumber = Math.floor(number * multiplier);
      return Math.round(wholeNumber / 10) * 10 / multiplier;
    },
    //切换毛玻璃背景图片
    changeFilterBackground() {
      let bgUrl = this.bookList[this.$store.state.bookSequence].units[this.$store.state.unitSequence].mapUrl;
      let style = document.createElement('style');
      document.head.appendChild(style);
      let sheet = style.sheet;

      sheet.addRule('.course-book-bar::before','background: url(' + bgUrl + ') 0 0 / 100% 100% fixed');  // 兼容IE浏览器
      sheet.insertRule('.course-book-bar::before { background: url(' + bgUrl + ') 0 0 / 100% 100% fixed}', 0); // 支持非IE的现代浏览器
    },
    //设置unit牌子大小
    setUnitSize() {
      let unitIndex = this.$store.state.unitSequence;
      let unit = this.unitList[unitIndex];
      let units = document.getElementsByClassName('course-unit');
      let bubbles = document.getElementsByClassName('course-bubble');
      let pic = document.getElementsByClassName('course-unit-pic')[unitIndex];
      let title = document.getElementsByClassName('course-unit-title')[unitIndex];
      if (pic) {
        pic.style.marginLeft = this.getViewPoint(unit.chapter.ml);
        pic.style.marginTop = this.getViewPoint(unit.chapter.mt);
        title.style.marginLeft = this.getViewPoint(unit.chapter.ml + 115);
      }
      for (let i = 0; i < units.length; i++) {
        units[i].style.width = this.getViewPoint(unit.width);
        units[i].style.height = this.getViewPoint(unit.height);
      }
      for (let bubble of bubbles) {
        bubble.children[0].style.width = this.getViewPoint(unit.chapter.lw);
        bubble.children[0].style.height = this.getViewPoint(unit.chapter.h);
        bubble.children[1].style.color = unit.chapter.color;
        bubble.children[2].style.height = this.getViewPoint(unit.chapter.h);
        bubble.children[2].style.width = this.getViewPoint(unit.chapter.rw);
      }
    },
    //切换book的点击样式
    changeBookStyle(curIndex) {
      let books = document.getElementsByClassName('course-book');
      for (let i = 0; i < books.length; i++) {
        if (i === curIndex) {
          let clsName = books[i].className.split(' ');
          let clsNames = [...clsName, ...['current']];
          let set = new Set(clsNames);
          let newCls = Array.from(set);
          books[i].className = newCls.join(' ');
        } else {
          books[i].className = books[i].className.replace('current', ' ');
        }
      }
    },
    selectBook(book, index) {
      this.SET_BOOK_SEQUENCE(index);
      this.SET_UNIT_SEQUENCE(0);
      this.swiper.activeIndex = 0;
      this.unitList = this.bookList[index].units;

      this.$nextTick(() => {
        this.changeBookStyle(index);
        this.changeFilterBackground();
        this.setUnitSize();
      });

      // 课本new状态更新为非new
      if (book.isNewUpdate) {
        updateBookState({bookObjectId: book.bookOid}).then(res => {
          book.isNewUpdate = false;
        });
      }
    },
    toggleBook() {
      this.bookIn = !this.bookIn;
      this.bookOut = !this.bookOut;
    },
    showBallon() {
      if (!this.showBall) {
        this.showBall = true;
        setTimeout(() => {
          this.showBall = false;
        }, 3000);
      }
    },
    //统计子单元下应用：已完成/全部
    calcApps(ids, modulesAndSegments) {
      let total = 0;
      let finished = 0;
      let isPublished = false;
      ids.forEach(id => {
        Object.keys(modulesAndSegments).forEach(key => {
          let children = modulesAndSegments[key][0].children;
          if (id === parseInt(key) && children) {
            total += children.length;
            children.forEach(item => {
              if (item.levelName === 5)
                isPublished = true;
              finished += (item.isComplete ? 1 : 0);
            });
          }
        });
      });
      return { finished, total, isPublished };
    },
    calcLockStatus(children) {
      let status = true;
      for (let child of children) {
        if (!child.isUnitLocked) {
          status = false;
        }
      }
      return status;
    },
    //数据和位置合并
    arrayAssign(data) {
      let bookArr = [];
      let newArr = [];
      let chapter = {};
      let newData = JSON.parse(JSON.stringify(data));
      for (let b = 0; b < newData.length; b++) {
        let newArr = [...newData[b].booksAndUnits];
        let book = newArr[0];
        let curPos = this.getPos(book.teachingMaterialName)[0];

        book.sequence = b;
        //课本图片
        book.imgUrl = 'http://192.168.1.150:81/upload/Image/' + book.imageName;
        //单元标牌图片
        book.unitUrl = curPos.unitUrl;
        book.isPublished = !!book.units.length; //true已发布，没有单元:未发布
        if (!book.units.length)
          return;

        for (let u = 0; u < book.units.length; u++) {
          let unit = book.units[u];

          unit.isUnitLock = this.calcLockStatus(unit.children); //单元A下所有单元B加锁状态
          //单元A地图图片
          unit.mapUrl = curPos['units'][u].imgUrl;
          //单元A图片
          unit.imgUrl = 'http://192.168.1.150:81/upload/Image/' + unit.imageName;

          //单元B三段图片
          unit['chapter'] = {...curPos['units'][0].chapter};

          unit.x = curPos['units'][u].x;
          unit.y = curPos['units'][u].y;
          unit.width = curPos.width;
          unit.height = curPos.height;
          unit.chapters = unit.children;

          for (let c = 0; c < unit.chapters.length; c++) {
            let chapter = unit.chapters[c];
            let obj = this.calcApps(chapter._id, data[b].modulesAndSegments);

            unit.isPublished = obj.isPublished; //true已发布，单元A->单元B->没有应用:未发布
            chapter.finished = obj.finished;
            chapter.total = obj.total;
            
            chapter.x = curPos['units'][u]['chapters'][c].x;
            chapter.y = curPos['units'][u]['chapters'][c].y;
          }
        }
        bookArr.push(newArr[0]);
      }
      return bookArr;
    },
    getPos(teachingName) {
      let index = this.remainPos.findIndex(p => p.name === teachingName);
      let pos = [];
      if (index !== -1) {
        pos = this.remainPos.splice(index, 1);
      }
      return pos;
    }
  }
};
</script>
<style scoped lang="less">
@imgUrl: "~assets/image/course/";
@font: "Gentury Gothic";
@baseWidth: 2048px;
@baseHeight: 1536px;

.seq() {
  position: absolute;
  top: 8px;
  right: 15px;
  // padding: 5px;
  width: 15px;
  height: 15px;
  border: 1px solid #ffffff;
  border-radius: 100%;
  background-color: #299BC0;
  font-size: 18px;
  font-family: @font;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  line-height: 15px;
}

.swiper-wrapper {
  .swiper-slide {
    margin-right: -1px;
    height: 100vh;
  }
}
.course-wrap {
  position: absolute;
  width: 100vw;
  height: 100vh;

  .course-map {
    position: relative;
    width: 100%;
    height: 100%;

    .course-chapter {
      position: absolute;
      font-size: 0;

      .course-bubble {
        display: inline-flex;

        .course-chapter-state {
          margin-right: -1px;
          &.lock {
            padding-right: 0;
            margin-right: 0;
          }
          .chapter-unlock {
            position: absolute;
            transform: translateX(-40%) translateY(40%);
            width: 44px;
            height: 54px;
            background: url("@{imgUrl}icon_unlock.png");
            background-size: 100% 100%;
          }
          .chapter-finish {
            position: absolute;
            top: -60px;
            transform: translateX(-40%);
            width: 73px;
            height: 136px;
            background: url("@{imgUrl}icon_finish.png");
            background-size: 100% 100%;
          }
          .chapter-lock {
            position: absolute;
            transform: translateX(-40%) translateY(40%);
            width: 44px;
            height: 54px;
            background: url("@{imgUrl}icon_lock.png");
            background-size: 100% 100%;
          }
          .chapter-new {
            position: absolute;
            right: 8px;
            transform: translateY(57px);
            width: 60px;
            height: 44px;
            background: url("@{imgUrl}img_unit_new.png");
            background-size: 100% 100%;
          }
        }
        .course-chapter-title {
          margin-right: -1px;
          font-size: 40px;
          font-weight: bold;
          font-family: @font;
          text-align: left;

          .course-text {
            line-height: 100px;
            padding-right: 1px;
          }
          &.lock {
            padding-right: 0;
            margin-right: 0;
          }
        }
        &.lock {
          .course-chapter-state {
            margin-right: 0;
          }
          .course-chapter-title {
            margin-right: 0;
          }
        }
      }
      .course-chapter-progress {
        margin-top: -15px;
        font-size: 28px;
        font-family: @font;
        color: #ffffff;
      }
    }
    .course-unit {
      position: absolute;
      .course-unit-pic {
        width: 226px;
        height: 156px;
        border-radius: 2px;
      }

      .course-unit-title {
        float: left;
        margin-top: 18px;
        transform: translateX(-50%);
        font-size: 30px;
        font-family: @font;
        font-weight: bold;
        color: #ffffff;
        line-height: 30px;
        white-space: nowrap;
      }
    }
  }
}
.course-mask {
  position: absolute;
  display: none;
  width: 100%;
  height: 100%;
  z-index: 2;
  &.islocked {
    top: calc(50% - 150px);
    left: calc(50% - 250px);
    width: 500px;
    height: 300px;
    border-radius: 20px;
    background: rgba(68, 68, 68, 1);
    font-size: 50px;
    font-family: @font;
    color: #ffffff;
    text-align: center;
    line-height: 300px;
    &.show {
      display: block;
    }
  }
  &.nopublish {
    display: block;
    width: 100vw;
    height: 100vh;
    background: url("@{imgUrl}img_unpublished.png") center no-repeat;
    background-size: 100% 100%;
    .course-hotballon {
      position: absolute;
      left: percentage(401 / @baseWidth);
      top: percentage(344 / @baseHeight);
      display: none;
      width: 1029px;
      height: 688px;
      background: url("@{imgUrl}img_unpublished_popup.png") center no-repeat;
      background-size: 100% 100%;
      &.show {
        display: block;
      }
    }
  }
}

.course-book-single {
  display: inline-flex;
  position: absolute;
  top: 60px;
  left: 30px;
  width: 209px;
  height: 115px;
  z-index: 2;

  .course-book-btn {
    margin: 40px 0;
    width: 30px;
    height: 30px;
    background: url("@{imgUrl}icon_open.png") center no-repeat;
    background-size: 100% 100%;
  }
  .course-book-open {
    margin-left: 8px;
    width: 171px;
    height: 115px;
  }
  .course-book-seq {
    .seq();
    top: 5px;
    right: 8px;
    // padding: 3px;
    width: 12px;
    height: 12px;
    font-size: 12px;
    line-height: 12px;
  }
}

.course-book-bar {
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.7);
  overflow: hidden;
  height: 100vh;
  width: 460px;
  z-index: 2;
}

.course-book-bar::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  -webkit-filter: blur(20px);
  -moz-filter: blur(20px);
  -o-filter: blur(20px);
  -ms-filter: blur(20px);
  filter: blur(20px);
  margin: -30px;
}

.course-book-bar {
  &.book-in {
    transform: translateX(0px);
    transition: all .5s ease-in-out;
  }
  &.book-out {
    transform: translateX(-460px);
    transition: all .5s ease-in-out;
  }
  .course-close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 26px;
    height: 26px;
    background: url("@{imgUrl}icon_close.png") center no-repeat;
    background-size: 100% 100%;
  }
}
.course-books-outer {
  position: fixed;
  top: 0;
  left: 0;
  width: 460px;
  height: 100vh;
  background: rgba(255, 255, 255, 0.3);
  z-index: 2;

  .course-close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 26px;
    height: 26px;
    background: url("@{imgUrl}icon_close.png") center no-repeat;
    background-size: 100% 100%;
  }
  .course-books-inner {
    margin-top: 56px;
    width: 460px;
    height: 1426px;
    overflow: auto;

    .course-book {
      position: relative;
      margin: 0 auto;
      margin-top: 48px;
      width: 300px;
      height: 202px;
      background-size: 100% 100%;

      .course-book-seq {
        .seq();
      }

      //当前课本
      &.current {
        box-shadow: -20px 0px 20px rgba(255, 255, 255, 0.3),
          0px -20px 20px rgba(255, 255, 255, 0.3),
          20px 0px 20px rgba(255, 255, 255, 0.3),
          0px 20px 20px rgba(255, 255, 255, 0.3);
      }
      //已完成课本
      &.finish::after {
        content: "";
        position: absolute;
        display: block;
        margin: 122px 0 0 205px;
        width: 145px;
        height: 110px;
        background: url("@{imgUrl}img_book_finish.png") center no-repeat;
        background-size: 100% 100%;
      }
      &.over::after {
        content: "";
        position: absolute;
        display: block;
        width: 300px;
        height: 202px;
        border-radius: 5px;
        background: rgba(0, 0, 0, 0.3) url("@{imgUrl}img_over.png") no-repeat;
        background-position: 0 122px;
        background-size: 27%;
      }
      &.new {
        box-shadow: -20px 0px 20px rgba(255, 255, 255, 0.3),
          0px -20px 20px rgba(255, 255, 255, 0.3),
          20px 0px 20px rgba(255, 255, 255, 0.3),
          0px 20px 20px rgba(255, 255, 255, 0.3);
      }
      &.new::after {
        content: "";
        position: absolute;
        display: block;
        margin: 158px 0 0 -2px;
        width: 60px;
        height: 44px;
        background: url("@{imgUrl}img_book_new.png") center no-repeat;
        background-size: 100% 100%;
      }
    }
    div:first-child {
      .course-book {
        margin-top: 14px;
      }
    }
  }
}

.course-toolbar {
  position: relative;
  position: absolute;
  top: 60px;
  right: 70px;
  width: 240px;
  height: 100px;
  z-index: 3;

  div {
    width: 100px;
    height: 100px;
    z-index: 2;
  }

  .course-task {
    position: absolute;
    background: url("@{imgUrl}btn_task_normal.png") center no-repeat;
    background-size: 100% 100%;
  }

  .course-personal {
    position: absolute;
    left: 140px;
    background: url("@{imgUrl}btn_personal_normal.png") center no-repeat;
    background-size: 100% 100%;
  }

  //override vux
  .vux-badge {
    float: right;
    width: 34px;
    height: 34px;
    border-radius: 100%;
    background-color: #e60012;
    font-size: 24px;
    font-family: @font;
    line-height: 34px;
  }
}
</style>
