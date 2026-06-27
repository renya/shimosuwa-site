@echo off

REM ==========================================
REM Web掲載用画像変換
REM
REM IrfanViewを使用
REM ドラッグ＆ドロップ対応
REM
REM 出力：
REM   *_web.jpg
REM
REM 標準設定
REM   長辺：1920px
REM   JPEG品質：85
REM   アスペクト比保持
REM   Resample使用
REM
REM 元画像は変更しない
REM
REM 大量変換（100枚以上）は
REM IrfanViewのBatch Conversionを使用
REM 方法は irfanview-web-photo-convert 参照
REM
REM ==========================================

set IRFAN="C:\Program Files\IrfanView\i_view64.exe"

if not exist %IRFAN% (
    echo.
    echo IrfanView が見つかりません。
    echo %IRFAN%
    pause
    exit /b
)

%IRFAN% "%~1" ^
 /resize_long=1920 ^
 /aspectratio ^
 /resample ^
 /jpgq=85 ^
 /convert="%~dpn1_web.jpg"

echo.
echo 完了
echo.
echo %~dpn1_web.jpg
echo.

pause
