@echo off

REM 動画からWeb用画像（poster）を抽出
REM 3秒地点を1枚のJPGとして保存

ffmpeg -ss 235 -i "%~1" ^
-frames:v 1 ^
"%~dpn1.jpg"

pause
