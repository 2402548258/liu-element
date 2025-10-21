<template>
  <div class="tooltip-base-box">
    <div class="row center">
      <liu-tooltip
        class="box-item"
        content="Top Left prompts info"
        placement="top-start"
      >
        <liu-button>top-start</liu-button>
      </liu-tooltip>
      <liu-tooltip
        class="box-item"
        content="Top Center prompts info"
        placement="top"
      >
        <liu-button>top</liu-button>
      </liu-tooltip>
      <liu-tooltip
        class="box-item"
        content="Top Right prompts info"
        placement="top-end"
      >
        <liu-button>top-end</liu-button>
      </liu-tooltip>
    </div>
    <div class="row">
      <liu-tooltip
        class="box-item"
        content="Left Top prompts info"
        placement="left-start"
      >
        <liu-button>left-start</liu-button>
      </liu-tooltip>
      <liu-tooltip
        class="box-item"
        content="Right Top prompts info"
        placement="right-start"
      >
        <liu-button>right-start</liu-button>
      </liu-tooltip>
    </div>
    <div class="row">
      <liu-tooltip
        class="box-item"
        content="Left Center prompts info"
        placement="left"
      >
        <liu-button class="mt-3 mb-3">left</liu-button>
      </liu-tooltip>
      <liu-tooltip
        class="box-item"
        content="Right Center prompts info"
        placement="right"
      >
        <liu-button>right</liu-button>
      </liu-tooltip>
    </div>
    <div class="row">
      <liu-tooltip
        class="box-item"
        content="Left Bottom prompts info"
        placement="left-end"
      >
        <liu-button>left-end</liu-button>
      </liu-tooltip>
      <liu-tooltip
        class="box-item"
        content="Right Bottom prompts info"
        placement="right-end"
      >
        <liu-button>right-end</liu-button>
      </liu-tooltip>
    </div>
    <div class="row center">
      <liu-tooltip
        class="box-item"
        content="Bottom Left prompts info"
        placement="bottom-start"
      >
        <liu-button>bottom-start</liu-button>
      </liu-tooltip>
      <liu-tooltip
        class="box-item"
        content="Bottom Center prompts info"
        placement="bottom"
      >
        <liu-button>bottom</liu-button>
      </liu-tooltip>
      <liu-tooltip
        class="box-item"
        content="Bottom Right prompts info"
        placement="bottom-end"
      >
        <liu-button>bottom-end</liu-button>
      </liu-tooltip>
    </div>
  </div>
</template>

<style>
.tooltip-base-box {
  width: 600px;
}
.tooltip-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tooltip-base-box .center {
  justify-content: center;
}
.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}
</style>
