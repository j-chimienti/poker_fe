<template>
  <div>
    <q-card>
      The game If you're not familiar with blackjack, check out the Wikipedia
      article or other sources online for the basic rules. At our table:
      blackjack pays 3 to 2 insurance pays 2 to 1 the dealer must hit a soft 17
      we use a stack of 4 decks which is shuffled when below 2 decks you do not
      have the option to split push game when hands tie What are my odds? The
      statistical house edge is only 0.7%. You can increase your chances by
      looking up some basic strategies. May the odds be ever in your favor!

      <p>Dealer must draw until 16 and stand on all 17s</p>
      <p>
        Minimum bet =
        <span class="text-monospace font-weight-bold">100</span> satoshi
      </p>
    </q-card>
  </div>
</template>

<script>
const rules = `BET
The game
If you're not familiar with blackjack, check out the Wikipedia article or other sources online for the basic rules. At our table:

blackjack pays 3 to 2
insurance pays 2 to 1
the dealer must hit a soft 17
we use a stack of 4 decks which is shuffled for each round (provably fair)
you have the option to buy insurance when the upcard of the dealer is an ace
the dealer peeks when the upcard is ace or ten
you can double down on any 2 initial cards
you do not have the option to split
push game when hands tie
What are my odds?
The statistical house edge is only 0.7%. You can increase your chances by looking up some basic strategies. May the odds be ever in your favor!

Provably fair?
Don't trust, verify! We can't cheat and we can prove this using the common 'provably fair' technique. Before a game begins, our server generates a random seed and already provides the hash of it to you. When starting each game, your browser will also generate a random clientseed. Now comes the fun part: when you concatenate these two together and take the SHA512 hash, this will tell you the order of the cards in the deck. To prove to you that we respect this random order each time, we show you the hash of our seed beforehand (before you send your clientseed, so we can not cherrypick). When the game is finished, we reveal our actual serverseed and you can hash it and compare it to the earlier sent hash.

Technical: the seeds and hash are shown in the console log. To create the hash that is used for the order of cards, do SHA512(serverseed + clientseed). Convert each 2 characters of this hex hash to decimal and each number will give you the index (0 - 207) of a 4-deck stack of cards. Note numbers higher than 207 are ignored, as well as any repeating number. The order of the decks are spades, hearts, diamonds, clubs, each from 1 to king, and this 4 times in a row. Check out this presentation of the deck together with a more detailed explanation..

Limitations
The minimum wager is 1  (satoshi) and the maximum is 5000 . Balances are tied to your session, make sure to withdraw when done! You can also note down the recovery key, with which you can regain access to your balance at any time. If a session expires due to inactivity, you could loose your balance if you do not store the recovery key.

Privacy
We do not ask nor store private data. We only keep sessions to store your current balance based on a session id and we have logging for problemsolving. We don't use third party software for tracking user data.

Contact
You can contact us via Twitter or Reddit in case of issues and we'll do our best to answer you within 1-2 days or faster. Keep as much information as you can.

`

export default {
  name: "Rules",
  methods: {
    goBack() {
      return this.$router.back()
    },
  },
}
</script>

<style scoped></style>
