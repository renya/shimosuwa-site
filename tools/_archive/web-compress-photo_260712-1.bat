@echo off

REM ==========================================
REM Web掲載用画像変換
REM
REM IrfanViewを使用
REM ドラッグ＆ドロップ対応（複数ファイル対応）
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
REM 少数（1～20枚程度）はこのBATへ
REM ドラッグ＆ドロップして一括変換
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

if "%~1"=="" (
    echo.
    echo 変換したい画像をこのBATファイルへ
    echo ドラッグ＆ドロップしてください。
    echo.
    pause
    exit /b
)

for %%F in (%*) do (
    echo.
    echo 変換中: %%~nxF

    %IRFAN% "%%~fF" ^
     /resize_long=1920 ^
     /aspectratio ^
     /resample ^
     /jpgq=85 ^
     /convert="%%~dpnF_web.jpg"

    echo 完了: %%~dpnF_web.jpg
)

echo.
echo ==========================
echo すべての変換が完了しました。
echo ==========================
echo.

pause
