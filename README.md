CRC shared React components
===========================

Shared components for CodeReady Containers

   * `ControlCard` that shows preset based info and `Actions`
     * `Status` => based on provided `props.preset`
     * `Actions`
  * Preset-based status
    * `PodmanStatus`
    * `OpenShiftStatus`
    * `UnknownStatus`
  * `LogWindow`
    * scrolls to bottom on addition of log lines
  * `Configuration`
    * basic config `cpus`, `memory`, `disk-size`, `pull-secret`
  * `Actions`
    * `props.onStart`
    * `props.onStop`
    * `props.onDelete`

### Publish

```
$ npm run release
```

### Used by

  * [tray-electron](https://github.com/code-ready/tray-electron)
  * [cockpit-crc](https://github.com/code-ready/cockpit-crc)
