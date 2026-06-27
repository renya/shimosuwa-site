@echo off

REM Web掲載用動画圧縮
REM 720p版
REM H.264 / 1280px / CRF27 / faststart
REM 動画をこのBATへドラッグするだけ
REM 出力：
REM   *_web.mp4
REM   *_web.jpg (poster)
REM HTMLの記述例は八島湿原のページを参照

ffmpeg -i "%~1" ^
-vf scale=1280:-2 ^
-c:v libx264 ^
-crf 27 ^
-preset medium ^
-movflags +faststart ^
-c:a aac ^
-b:a 128k ^
"%~dpn1_web.mp4"

ffmpeg -ss 3 -i "%~dpn1_web.mp4" ^
-frames:v 1 ^
"%~dpn1_web.jpg"

pause
