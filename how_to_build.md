# ビルド方法

1. [Git をインストール](https://git-scm.com/book/ja/v2/)

2. [Deno をインストール](https://deno.land/manual/getting_started/installation)

3. 任意のディレクトリにレポジトリをクローン
   
   ```sh
   $git clone https://github.com/nitech-create/nitech-moodle-extension-40a.git
   ```

4. ビルドを実行
   
   ```sh
   $deno task build
   ```
   
    `dist` ディレクトリにビルド結果が出力されます

5. VSCodeの補完設定

   `.vscode/settings.json` で
   ```json
   {
     "deno.importMap": "./import_map.json"
   }
   ```

   を設定する
