<template functional>
  <div v-if="props.projectFeatures && props.projectFeatures.length">
    <h4 class="subtitle">
      {{ parent.$t('features') }}
    </h4>
    <ul class="project-features">
      <li v-for="feature of props.projectFeatures" :key="feature.id">
        {{ feature.description }}
      </li>
    </ul>
  </div>
</template>
<style lang="less">
ul.project-features {
  position: relative;
  list-style: none;
  margin-left: 0;
  padding-left: 1.2em;

  li::before {
    content: '';
    position: absolute;
    left: 0;
    margin-top: 10px;
    display: block;
    width: 8px;
    height: 8px;
    background-color: @primary-color;
    font-size: 1rem;
  }
}
</style>
