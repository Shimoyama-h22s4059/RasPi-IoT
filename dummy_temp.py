import csv
from datetime import datetime, timedelta
import random

with open("./dummy_temp.csv", "w", newline="") as file:
    writer = csv.writer(file)
    # now = datetime.now()
    now = datetime(2024, 7, 26, 0, 0, 0)

    for i in range(7200):
        formatted_date = now.strftime("%Y/%m/%d %H:%M:%S")
        random_temp = random.randint(150, 350) / 10.0

        writer.writerow([formatted_date, random_temp])

        now += timedelta(seconds=5)

print("CSV Generation Successfully!")
