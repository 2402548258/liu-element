<template>
  <div>
    <liu-button type="primary" loading>Loading</liu-button>
    <liu-button type="primary" loading-icon="circle-notch" loading
      >Loading</liu-button
    >
    <liu-button type="primary" loading>
      <template #loading>
        <liu-icon style="margin-right: 6px" icon="star" spin />
      </template>
      Loading
    </liu-button>
  </div>
</template>
