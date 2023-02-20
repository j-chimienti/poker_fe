import {Notify} from 'quasar'

export function createNotification(opts) {
  return Notify.create(opts)
}

const exampleOps = {
  timeout: 3,
  message: "msg",
  caption: `caption`,
  color: "red",
  position: "left",
}

export function testNotification(ops) {
  return createNotification(Object.assign({}, exampleOps, ops))
}
