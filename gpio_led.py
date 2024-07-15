import RPi.GPIO as GPIO
import time

LED_PIN = 17

# BCM(GPIO番号)で指定する設定
GPIO.setmode(GPIO.BCM)

# GPIO17を出力モード設定
GPIO.setup(LED_PIN, GPIO.OUT)

for i in range(10):
    # 出力を1にする
    GPIO.output(LED_PIN, 1)
    time.sleep(0.5)

    # 出力を0にする
    GPIO.output(LED_PIN, 0)
    time.sleep(0.5)

# 使用終了宣言
GPIO.cleanup()