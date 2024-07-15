import RPi.GPIO as GPIO
import datetime
import time

LED_PIN = 17
PAPIRS_PIN = 18

# BCM(GPIO番号)で指定する設定
GPIO.setmode(GPIO.BCM)


# GPIO17を入力モード設定
GPIO.setup(LED_PIN, GPIO.OUT)

# GPIO18を入力モード設定
GPIO.setup(PAPIRS_PIN, GPIO.IN)

try:
    while True:
        if GPIO.input(PAPIRS_PIN):
            formatted_date = datetime.datetime.now().strftime("%Y/%m/%d %H:%M:%S")
            print(f"[\u001b[36mINFO\u001b[0m][{formatted_date}] \u001b[31mPaPIRs Detected!\u001b[0m\n")

            GPIO.output(LED_PIN, 1)
        else:
            GPIO.output(LED_PIN, 0)

        time.sleep(0.2)
except KeyboardInterrupt:
    pass
finally:
    # 使用終了宣言
    GPIO.cleanup()