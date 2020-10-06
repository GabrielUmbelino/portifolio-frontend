<template functional>
  <a-layout
    v-if="props.projectStats && props.projectStats.length"
    class="project-stats"
  >
    <a-layout-content>
      <a-row type="flex">
        <a-col
          v-for="stat of props.projectStats.splice(0, 3)"
          :key="stat.id"
          :xl="8"
          :xs="24"
          :class="`stat-${stat.id}`"
        >
          <h3 class="primary-title">{{ stat.number }}</h3>
          <span> {{ stat.description }}</span>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>
<style lang="less">
.project-stats {
  background-color: @heading-color;
  .ant-layout-content {
    width: 940px;
    max-width: 100%;
    margin: auto;
    padding: 50px 10px;
    .ant-col {
      text-align: center;
      h3 {
        font-size: 3.125rem;
        margin-bottom: 10px;
      }

      span {
        color: @text-color-dark;
      }
    }
    @media (max-width: 768px) {
      .ant-col {
        padding-bottom: 50px;
      }
    }
  }
}
</style>
