# boom-play-app

Boom game app challenge

# :boom: Boom Challenge :boom:

## Assessment

Dear Engineer,

This assessment consists of developing a simple game somehow similar to minesweeper. The rules are defined below.

- The game starts on a 6 x 6 board with hidden tiles
- The 36 tiles are randomly assigned a value
  - 12 tiles are assigned smileys (:smiley:)
  - 12 tiles are assigned bombs (:boom:)
  - 12 tiles are assigned resets (:cyclone:)
- The player can then flip one tile at a time, revealing its type
- The player wins when flipping **3 consecutive smileys** :tada:
- The player looses when flipping **2 consecutive bombs**
- Flipping a reset will **reset** the number of consecutive **smileys and bombs to 0**
  - additionally, a reset will also display the **number of bombs and smileys in its 8 surrounding tiles** _(optional)_

## Functional requirements

- The game state should be persisted when reloading the page
  - preferably use a state management library to handle the state of the game
- There should be a button to restart the game
- A score containing number of wins and losses should be kept in local storage _(optional)_

## Evaluation

The game should be implemented using `Angular` and you will be evaluated on the following aspects:

- Readability and maintainability of your code
- Unit tests
- End to End tests _(optional)_

Feel free to ask questions any time and use any libraries or tools that you might need.

**Good luck! :+1:**

## Misc

Here are some `HTML` and `css/scss` snippets you might want to use to save time

`index.html`

```html
<body>
  <main>
    <!-- 3 x 3 -->
    <section class="board-3x3">
      <div></div>
      <div>💥</div>
      <div>🌀</div>
      <div>😃</div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </section>
  </main>
</body>
```

`styles.scss`

```scss
body {
  padding: 1rem;
  margin: 0;
  background-color: #b762ff;
  background-image: linear-gradient(160deg, #b762ff, #0079ff, #ff0, #ff576f);
}

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #698ef9;
  border: 1rem solid #000;
  min-height: calc(100vh - 4rem);
}

.board-3x3 {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 5px;
  margin: 1rem;

  & > * {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 100px;
    font-size: 2.5rem;
    background-color: #fbeee0;
    border-radius: 5%;
  }
}
```

`board.png`

![Board](./board.png)
