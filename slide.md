# 劣化版 reveal.js を作ったはなし
{: .title}

## wacky
{: .author}

# いきさつ

- 国試終わった〜〜
- 春合宿のスライド作らないと
- パワポでもいいんだけどね
- reveal.js は色々面倒臭いなぁ
- 作っちゃえ
- 作った → [wacky612/simple-slide](https://github.com/wacky612/simple-slide)

# 必要な機能

- スライド送り
- Markdown から html への変換
- Pause 機能
  - {: .pause} こういうやつ
- ブラウザの拡大/縮小に合わせて文字の大きさを変える
- スライドを途中から再開する機能
  - スライド更新するたびに1枚目からめくっていくのはしんどい

# スライド送り : HTML

- 1つの <section> が1枚のスライドに相当

~~~
<section>
  <h1>見出し</h1>
  <ul>
    <li>ほげ</li>
    <li>ふが</li>
  </ul>
</section>
~~~

# スライド送り : CSS

- display を none にしたり block にしたりすることで、スライドの表示を制御する

~~~
section {
  display: none;
}

section.active {
  display: block;
}
~~~

# スライド送り : JavaScript

- &lt;section&gt; の class に active を add/remove

~~~
var slides = document.getElementsByTagName(
               "section"
             );

var activateSlide = function(i) {
  var classList = slides[i].classList;
  if (!classList.contains("active")) {
    classList.add("active");
  }
};
~~~


# Markdown → HTML の変換

- Markdown のパーサには kramdown を使った
- やる気のないコードを端末でみせる

# Pause 機能 : Markdown

- kramdown では `{: .class名}` とすることで要素に class を指定することができる
- 以下のようにして class を埋めこむ

~~~
- {: .pause} ほげ
- {: .pause} ふが
- {: .pause} ぴよ
~~~

# Pause 機能 : HTML

- するとこうなる

~~~
<ul>
  <li class="pause">ほげ</li>
  <li class="pause">ふが</li>
  <li class="pause">ぴよ</li>
</ul>
~~~

# Pause 機能 : CSS

- opacity の値を0と1で切り替えることで制御する
- `.pauseactive` ← もうちょっとマシな名前ないんか

~~~
.pause {
  opacity: 0;
}

.pauseactive {
  opacity: 1;
}
~~~

# Pause 機能 : JavaScript

~~~
var pauses = function() {
  var i = getSlideIndex();
  return slides[i].getElementsByClassName(
    "pause"
  );
};

var activatePause = function(i) {
  var classList = pauses()[i].classList;
  if (!classList.contains("pauseactive")) {
    classList.add("pauseactive");
  }
};
~~~

# 文字の大きさを変える

- 発表をする時に、どんな解像度のプロジェクターが当たるか分からない
- 文字の大きさはウィンドウの大きさに合わせて変化してほしい

# 文字の大きさを変える

- 試行錯誤の末、以下の値をいじることにした
- もっといい方法があるかも

~~~
<html lang="ja" style="font-size: 50px;">
  <head>...</head>
  <body>...</body>
</html>
~~~

# 文字の大きさを変える

~~~
var setFontSize = function() {
  var html = document.getElementsByTagName(
    "html")[0];
  html.style.fontSize =
    (html.offsetHeight / 18) + "px";
};

window.onresize = function() {
  setFontSize();
};
~~~

# スライドを途中から再開

- スライドを更新して F5 を押すごとに1枚目に戻ると超面倒臭い
- F5 を押したら今の位置から始まってほしい
- 他人に「何枚目のスライド」という情報を持った URL を渡したい

# 「何枚目」の情報の保存場所

- reveal.js の URL を見てると # 以降が変化している
- `location.hash` に保存すればよい！

# 保存のルール

- 適当に決める
- `#<slideIndex>/<pauseIndex>` に決まった

# 実装

~~~
var getSlideIndex = function() {
  return parseInt(
    location.hash.slice(1).split("/")[0]
  );
};

var setSlideIndex = function(slideIndex) {
  location.hash = slideIndex + "/0";
};
~~~

# 実装

~~~
var getPauseIndex = function() {
  return parseInt(
    location.hash.slice(1).split("/")[1]
  );
};

var setPauseIndex = function(pauseIndex) {
  location.hash = getSlideIndex() + "/"
    + pauseIndex;
};
~~~

# まとめ

- かかった時間 : 2日
- 書いたコードの量

|ファイル|行数|
|:--|--:|
|slide.js|151|
|slide.css|19|
|theme.css|69|
|build.rb|38|

- 意外と簡単に作れた
