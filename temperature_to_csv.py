import datetime
import time
import csv


def get_temp(formatted_date):
    with open("/sys/bus/w1/devices/w1_bus_master1/28-0316062b68ff/w1_slave", "r") as file:
        data = file.read()

        split = data.split("t=")[1]
        temperature = int(split) / 1000

        print(f"[\u001b[36mINFO\u001b[0m][{formatted_date}] \u001b[97mTemperature: \u001b[35m{temperature:.1f} °C\u001b[0m\n")

    return temperature


if __name__ == "__main__":
    file_name = datetime.datetime.now().strftime("%Y-%m-%d-%H-%M-%S")

    try:
        while True:
            with open(f"/var/html/www/{file_name}.csv", "w") as file:
                writer = csv.writer(file)

                formatted_date = datetime.datetime.now().strftime("%Y/%m/%d %H:%M:%S")
                temperature = get_temp(formatted_date)

                writer.writerow([formatted_date, temperature])

            time.sleep(5)
    except KeyboardInterrupt:
        pass

