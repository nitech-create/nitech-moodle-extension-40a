# Web Extension for NITech moodle 4.0

[![deploy](https://github.com/nitech-create/nitech-moodle-extension-40a/actions/workflows/deploy.yml/badge.svg)](https://github.com/nitech-create/nitech-moodle-extension-40a/actions/workflows/deploy.yml)
[![release](https://img.shields.io/github/v/release/nitech-create/nitech-moodle-extension-40a?include_prereleases)](https://github.com/nitech-create/nitech-moodle-extension-40a/releases/latest)

[開発者向けドキュメント](./readme.dev.md)

## 概要

名古屋工業大学の moodle 4.0 の機能を改善・拡張する拡張機能です。

### 主な機能

- ダッシュボードに講義へのショートカットアクセスを追加
  - 今受けている講義だけを曜日・時間でソートして一覧表示
- 時間割表の追加 (予定)
- 締め切りカウントダウン表示の追加
- 動画を画面内で大きく表示するように変更
- ナビゲーションにすべての講義が表示されるように変更 (予定)
- 強制ダウンロードリンクの無効化
- 全体的なスタイルの修正

## ブラウザ対応状況

|              ブラウザ               | 対応状況 |
| ----------------------------------- | -------- |
| Chrome (Windows 11, 111.0.5563.147) | 開発中   |
| Firefox                             | 未確認   |

## 利用方法

### Chrome Web Store からインストール

準備中です

### GitHub からインストール

1. (Releases)[https://github.com/nitech-create/nitech-moodle-extension-40a/(releases)] から .zip ファイルをダウンロードして展開する
    - または [ビルド方法](./how_to_build.md) に従ってビルドする
2. 拡張機能ページを開く
    - [Chrome](chrome://extensions)
3. `manifest.json` が含まれるフォルダをドロップ
    - または「パッケージ化されていない拡張機能を読み込む」
