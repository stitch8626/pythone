import keyboard
import time
import webbrowser

while True:
    if keyboard.is_pressed("F1"):
        webbrowser.open("https://www.youtube.com/")
        time.sleep(8)
        # моя первая практика с браузерами, данный код открывает ютуб с помощью кнопки F1
    