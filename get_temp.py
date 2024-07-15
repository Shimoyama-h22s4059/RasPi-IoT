import datetime
import time


def get_temp():
    with open("/sys/bus/w1/devices/w1_bus_master1/28-0316062b68ff/w1_slave", "r") as file:
        data = file.read()

        split = data.split("t=")[1]
        temperature = int(split) / 1000

        formatted_date = datetime.datetime.now().strftime("%Y/%m/%d %H:%M:%S")

        print(f"[\u001b[36mINFO\u001b[0m][{formatted_date}] \u001b[97mTemperature: \u001b[35m{temperature:.1f} °C\u001b[0m\n")


if __name__ == "__main__":
    try:
        while True:
            get_temp()

            time.sleep(3)
    except KeyboardInterrupt:
        pass

