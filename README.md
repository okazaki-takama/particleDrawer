particleDrawer
==============

HTML5のCANVASを使った文字で文字を描くアニメーションを実装できるjQueryプラグインです。  
  下記のスクリプトを参考にプラグイン化してみました。

<http://jsdo.it/hide1/fWqL>


ブラウザ対応状況
--------------

IE 9以上のブラウザでの動作を確認いたしました。  
  ※MacOSのsafariではふち?のようなものがついて見映えが変わってしまいます。  
  修正方法が見つかり次第修正版をあげるようにいたします。


使い方
-----

```js

//テキストのみの指定の場合
$("canvas").particleDrawer("TEXT");


//テキストとオプションを指定する場合
$("canvas").particleDrawer("TEXT", {

  //オプション

});

//or

$("canvas").particleDrawer({
  text: "TEXT",

  //オプション

});

```


オプションについて
----------------

```js

{
  ratio: int,
  //フォントの拡大率。拡大率が高いほど文字と文字の間が広がります。初期値は6

  color: "font-color",
  //フォントカラーの指定。CSSと同様の指定をする。初期値はrgba(0,255,0,0.5)

  font: "font",
  //フォントの指定。CSSと同様の指定をする。初期値は"24px 'Times New Roman'"

  align: "align",
  //テキストの揃え位置を指定。値は"left", "center", "right"の三つ。初期値は"center"

  baselign: "baseline",
  //テキストの縦位置の指定。値は"top", "middle", "bottom"の三つ。初期値は"middle"

  webfont: "webfont-name"
  //WEBフォントを使用する場合にフォント名を文字型で指定。
}

```


ライセンスについて
---------------

MITで配布させていただいてます。  
  ですので、なにかに使えそうでしたら、商用でもご自由にお使いください。

当プラグインを利用して発生した障害などについては、MITでの配布のため、一切の責任を負いませんので、ご了承の上、ご利用ください。

