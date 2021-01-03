<template>
  <div class="list-wrap">
    <div v-for="item of list" :key="item.title" class="item">
      <div class="item-title-wrap" @click="onItemClick(item)">
        <div class="item-title">{{ item.title }}</div>
        <i
          class="icon arrow"
          :class="{ 'up-arrow': item.unfolded }"
          v-if="item.children"
          @click.stop="onArrowClick(item)"
        ></i>
      </div>
      <transition name="fade">
        <div
          v-if="item.children && item.unfolded"
          class="item-children"
          :key="item.title"
        >
          <case-list :list="item.children"></case-list>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
//生成器函数遍历数据
function* traversalData(data) {
  for (let i = 0; i < data.length; i++) {
    yield data[i];
    if (data[i].children) {
      yield* traversalData(data[i].children);
    }
  }
}

export default {
  //通过name属性递归调用自己
  name: "CaseList",
  components: {},
  props: {
    list: Array
  },
  data() {
    return {};
  },
  computed: {
    newList: {
      get() {
        return this.list;
      },
      set() {}
    }
  },
  methods: {
    onItemClick(item) {
      const newList = this.newList;
      for (let caseItem of traversalData(newList)) {
        //通过unfolded表示展开折叠
        if (caseItem.title === item.title && !caseItem.unfolded) {
          caseItem.unfolded = true;
        } else {
          caseItem.unfolded = false;
        }
      }
      this.newList = newList;
      console.log(item, "item click");
    },
    onArrowClick(item) {
      console.log(item, "arrow click");
    }
  }
};
</script>

<style lang="less" scoped>
.list-wrap {
  position: relative;
  width: 200px;
  .item-title-wrap {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .icon {
      position: absolute;
      right: -100px;
      transition: all 0.3s;
    }
    .arrow {
      background: url("~@img/arrow_down.png");
      background-size: contain;
    }
    .up-arrow {
      transform: rotate(180deg);
    }
  }
}

.item-children {
  padding-left: 15px;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
</style>
