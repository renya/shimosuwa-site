# IrfanViewでiPhone写真をWeb公開用に一括縮小する手順

## 目的

iPhone 13で撮影した写真（約5〜7MB/枚）を、Webサイト公開用に適切なサイズへ一括変換する。
1-5枚の場合は web-compress-photo.bat を利用でも良い。

### 変換前

* 解像度：約4032×3024
* 容量：約5〜7MB/枚

### 変換後目標

* 長辺：1920px
* JPEG品質：85
* 容量：約300KB〜1.3MB/枚

---

# 手順

## 1. バッチ変換を開く

IrfanViewを起動し、

```text
File
└─ Batch Conversion/Rename...
```

を選択する。

---

## 2. バッチ変換モードを選択

左上で

```text
Batch conversion
```

を選択する。

出力形式は

```text
JPG - JPG/JPEG Format
```

を選択する。

---

## 3. JPEG品質を設定

「Options」をクリックする。

設定値：

```text
Save quality = 85
```

チェック状態：

```text
☑ Keep original EXIF data
☑ Keep original IPTC data
☑ Keep original XMP data
☑ Reset EXIF orientation tag
```

その他はデフォルトのままでよい。

---

## 4. リサイズ設定

「Use advanced options」にチェックを入れる。

「Advanced」をクリックする。

### Resize設定

```text
☑ RESIZE
○ Set long side to
  1920

☑ Preserve aspect ratio (proportional)

☑ Use Resample function (better quality)
```

設定後「OK」。

---

## 5. 出力先フォルダを指定

例：

```text
元画像
C:\Users\...\Downloads\Photos-3

出力先
C:\TEMP\Photos-3
```

元画像とは別フォルダを指定する。

---

## 6. 画像を追加

対象フォルダを開き、

```text
Add all
```

をクリックする。

確認：

```text
Input files: 396
```

など、対象枚数が表示されること。

---

## 7. 変換実行

```text
Start Batch
```

をクリックする。

変換完了後、

```text
396 Files
Errors: 0
Warnings: 0
```

となれば成功。

---

# 結果

## 変換前

```text
4032×3024
約5〜7MB/枚
```

## 変換後

```text
長辺1920px
品質85
```

容量例：

```text
367KB
408KB
679KB
849KB
1.0MB
1.3MB
```

---

# 運用ルール

## オリジナル

保存場所：

```text
Downloads\Photos-3
```

用途：

* 永久保存
* 再編集用
* バックアップ

---

## Web公開用

保存場所：

```text
C:\TEMP\Photos-3
```

用途：

* GitHub Pages
* shimosuwa.info
* SNS投稿用

---

# 今後の標準設定

iPhone写真のWeb公開は以下を標準とする。

```text
長辺：1920px
JPEG品質：85
EXIF保持：ON
```

画質と容量のバランスが良く、Web公開用途に適した設定である。
