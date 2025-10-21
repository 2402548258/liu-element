<template>
  <h2>通过 slot 传入内容</h2>
  <div style="max-width: 600px">
    <liu-alert type="success">Success alert</liu-alert>
    <liu-alert type="info">Info alert</liu-alert>
    <liu-alert type="warning">Warning alert</liu-alert>
    <liu-alert type="danger">Error alert</liu-alert>
  </div>
  <h2>通过 prop 传入内容</h2>
  <div style="max-width: 600px">
    <liu-alert type="success" title="Success alert" />
    <liu-alert type="info" title="Info alert" />
    <liu-alert type="warning" title="Warning alert" />
    <liu-alert type="danger" title="Error alert" />
  </div>
</template>
