---
title: "ちょっとでもセキュリティに自信がないなら、 Firebase Authentication を検討しよう"
date: "2020-01-01"
---

note のやらかしのあのへんについて。

認証自作、 Rails 、 Devise - Diary

パーフェクト Rails 著者が解説する devise の現代的なユーザー認証のモデル構成について - joker1007’s diary

認証サーバーの実装は本質的に難しいです。セキュリティが絡むものは「簡単な実装」などなく、プロアマ個人法人問わず、個人情報を守るという点で、同じ水準を要求されます。悪意あるハッカーは常にカモを探していて、もし認証が破られた場合、自分だけではなく大多数に迷惑が掛かります。初心者だから免責されるといったこともありません。全員が同じ土俵に立たされています。

とはいえ、認証基盤を作らないといろんなサービスが成立しません。そういうときにどうするか。

Firebase Authentication
で、タイトルの件なんですが、 Firebase Authentication がとても便利です。個人での趣味サービスのレベルなら、もうこれ一本でいいんじゃないかとすら思っています。

特にフロントエンド界隈の人はこの辺のセキュリティが甘いことが多いので、自作するのを避けて既存実装にのっていくのがいいです。

Firebase Authentication

他の Auth as a service には Auth0 などがありますが、プライシングが異様に高いのと、JWT に関する強い理解を求められるので、あんまり気軽にはつかえませんでした。

Firebase Authentication はどういうものかというと、Firebase の機能の一部で、各種サービスと連携して認証機能を提供してくれます。

Google, Facebook, Facebook, GitHub, 各種サービスの oauth 連携
匿名認証
カスタムプロバイダー
SMS 認証
カスタムプロバイダーで任意なトークンの認証を差し込むこともできますが、普通は上記のいずれかの OAuth 認証で十分でしょう。特徴的なのは匿名認証で、一時的にユニークな ID を付与したユーザーとして扱いますが、その後他の認証方式に昇格することができます。

これだけ覚えてかえってもらいたいのですが、本機能は Firebase と銘打っていますが、Firebase の他のサービスを使わずとも問題ありません。Firebase Hosting さえ使う必要はないです。ポップアップのモーダルでその他のサービスに飛ばされて、認証後にコールバックが飛んでくるだけです。

JavaScript でカスタム認証システムを使用して Firebase 認証を行う

使い方
詳しい使い方は他の記事を譲りますが、概要とリンクだけ貼っておきます。

Google のアカウントで、 Firebase で Firebase のプロジェクトを作成し、 Firebase の埋め込みタグ用のコンフィグを手に入れます。

Firebase console から、 Authentication => Sign In Method と選択し、表示された認証方式一覧から、使いたい認証機能を有効化します。OAuth Token が必要なサービスは、それぞれ取得してフォームに埋めます。


firebase の埋め込みタグをそのまま使うとサイズが大きいので、個人的には webpack などを使って手元のコードの一部としてビルドするのをおすすめします。 npm install firebase --save などしてから、必要なモジュールだけ参照してビルドします。

import "firebase/auth";
import firebase from "firebase/app";

firebase.config({/* settings */)});
firebase インスタンスを初期化したら、それを使って認証メソッドを呼びます。
ウェブサイトで Firebase Authentication を使ってみる

GitHub でログインする例です。Github でログインする例。事前に管理画面で有効下＋ OAuth トークンの設定が必要です。

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // ログイン時の処理
  } else {
    // 未ログイン
  }
});

const provider = new firebase.auth.GithubAuthProvider();
const result = await firebase.auth().signInWithPopup(provider);
https://firebase.google.com/docs/auth/web/github-auth?hl=ja

JWT
Firebase を使ったので、Firestore 等の Firebase 関連サービスを使うこともできますが、自分はここから後は、Firebase を使うことは少なくて、AWS や他のクラウドを使うことが多いです。作るもの次第です。

とはいえ、他のサーバーからでも Firebase の認証状態を検証したいはずです。このとき、Firebase の JWT 生成/検証機能が便利です。

ID トークンを検証する  |  Firebase

サーバーに Firebase Admin SDK を追加する

firebase admin 用の秘密鍵を作って、それを使ってクライアントで発行されたトークンを検証します。

// client
const idToken = await firebase
  .auth()
  .currentUser.getIdToken(/* forceRefresh */ true);

// server
const verified = await admin.auth().verifyIdToken(idToken);
// verified.uid などが入っている
RFC6750 などを使って、サーバーにトークンを渡して、その結果 uid などが手に入ります。

トークンを利用した認証・認可 API を実装するとき Authorization: Bearer ヘッダを使っていいのか調べた - Qiita

実装サンプル
…ということを next.js と Graphql と組み合わせて書いた記事があるので、参考にしてください。

next.js + vercel + firebase authentication で JWT の検証を行う + Graphql - mizdev
