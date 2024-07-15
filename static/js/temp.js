$(function () {
    // CSV読み込み関数
    async function fetchCSV() {
        const response = await fetch('dummy_temp.csv');
        return await response.text();
    }

    async function removeSecond(text) {
        const date = new Date(Date.parse(text));

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hour = date.getHours().toString().padStart(2, "0");
        const minute = date.getMinutes().toString().padStart(2, "0");

        return `${year}/${month}/${day} ${hour}:${minute}`
    }

    // 1分あたりの平均の温度を算出
    async function toDict() {
        let rows = (await fetchCSV()).split("\n");
        let averages = {};
        let counts = {};

        for (let i = 0; i < rows.length; i++) {
            if (rows[i].includes(",")) {
                const split = rows[i].split(",");
                const date = split[0];
                const temperature = split[1];
                const removed = await removeSecond(date);

                if (!averages[removed]) averages[removed] = 0;
                if (!counts[removed]) counts[removed] = 0;

                averages[removed] += parseFloat(temperature);
                counts[removed]++;
                // console.log(`${i}: date: ${date}, temperature: ${temperature}, removed: ${removed}`);
            }
        }

        let updateTemp = 0;

        let dict = [];

        for (const key of Object.keys(averages)) {
            // console.log(`${key}: ${averages[key]}, ${counts[key]}`)
            averages[key] = (averages[key] / counts[key]).toFixed(1);

            dict.push({
                date: key,
                temperature: averages[key]
            });

            updateTemp = averages[key];
        }

        $("#mainTemperature").text(`${updateTemp} ℃`);

        return dict;
    }

    async function drawChart() {
        const dict = (await toDict()).slice(-60);
        const ctx = document.getElementById("myChart");

        console.log(dict);

        const temperatures = dict.map(item => item.temperature);
        const minTemp = Math.min(...temperatures);
        const maxTemp = Math.max(...temperatures);

        new Chart(ctx, {
            type: "line",
            data: {
                labels: dict.map(item => item.date),
                datasets: [
                    {
                        label: "Temperature (℃)",
                        data: dict.map(item => (
                            {
                                x: item.date,
                                y: item.temperature
                            }
                        )),
                        backgroundColor: "#db88cb",
                        borderColor: "#b35da2"
                    }
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    annotation: {
                        annotations: {
                            cyanRange: {
                                type: 'box',
                                yMax: 15,
                                backgroundColor: 'rgba(0, 127, 127, 0.2)',  // 水色の背景
                                borderColor: 'rgba(0, 127, 127, 0.5)',
                                borderWidth: 1
                            },
                            greenRange: {
                                type: 'box',
                                yMin: 15,
                                yMax: 25,
                                backgroundColor: 'rgba(0, 255, 0, 0.2)',  // 緑色の背景
                                borderColor: 'rgba(0, 255, 0, 0.5)',
                                borderWidth: 1
                            },
                            yellowRange: {
                                type: 'box',
                                yMin: 25,
                                yMax: 35,
                                backgroundColor: 'rgba(255, 255, 0, 0.2)',  // 黄色の背景
                                borderColor: 'rgba(255, 255, 0, 0.5)',
                                borderWidth: 1
                            },
                            redRange: {
                                type: 'box',
                                yMin: 35,
                                backgroundColor: 'rgba(255, 0, 0, 0.3)',  // 赤色の背景
                                borderColor: 'rgba(255, 0, 0, 0.5)',
                                borderWidth: 1
                            }
                        }
                    }
                },
                scales: {
                    x: {

                    },
                    y: {
                        min: minTemp - 2.0,
                        max: maxTemp + 2.0,
                    }
                }
            }
        });

        $("#dragon").attr("src", "./static/img/dragon_transparent.png");
    }


    drawChart();

});