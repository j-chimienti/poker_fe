import {createPinia, PiniaPlugin} from "pinia"
import {usePokerStore} from "../poker-store"

const pinia = createPinia()
pinia.use(PiniaPlugin)

describe("Poker Store", () => {
  let store

  beforeEach(() => {
    store = usePokerStore(pinia)
    store.$reset()
  })

  // Test actions
  describe("Actions", () => {
    it("should add a chat message", () => {
      const message = { tableId: "table1", text: "Hello!" }
      store.onChatMessage(message)
      expect(store.chatMessages.table1).toHaveLength(1)
    })

    it("should open and close chat", () => {
      expect(store.chatVisible).toBe(false)
      store.openChat()
      expect(store.chatVisible).toBe(true)
      store.openChat()
      expect(store.chatVisible).toBe(false)
    })

    // Add more action tests here
  })

  // Test getters
  describe("Getters", () => {
    // Test getters here
  })

  // Test state
  describe("State", () => {
    it("should have initial state", () => {
      expect(store.tables).toEqual([])
      expect(store.table).toBeNull()
      expect(store.chatMessages).toEqual({})
      expect(store.chatVisible).toBe(false)
      expect(store.room).toBe("lobby")
    })

    // Add more state tests here
  })
})
