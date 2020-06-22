<template>
  <div class="text">
    <template v-for="(item,index) in list">
      <un-swtich-cell>
        <div>
          <div class="switch-cell">
            {{item.name}}
          </div>
          <div class="switch-cell-right" @click="delClick(index)">
            删除
          </div>
        </div>
      </un-swtich-cell>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          name: "hly1",
          id: 0
        },
        {
          name: "hly2",
          id: 1
        },
        {
          name: "hly3",
          id: 2
        },
        {
          name: "hly4",
          id: 3
        }
      ]
    };
  },
  methods: {
    delClick(idx) {
      this.list.splice(idx, 1);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
