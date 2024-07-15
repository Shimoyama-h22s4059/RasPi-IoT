$(function() {
    updateAll(); // 初回

    // 1分毎にグラフと現在の温度を更新
    setInterval(updateAll, 60000);

    // CSVファイルを読み込む関数
    async function fetchCSV() {
        const response = await fetch('./temp_data.csv');
        return await response.text();
    }

    // CSVテキストを解析する関数
    function parseCSV(text) {
        const lines = text.split('\n');
        const labels = [];
        const data = [];

        let updateTemp;

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            if (line.trim() === '') continue;  // 空行を無視
            const [datetime, temperature] = line.split(',');
            labels.push(datetime);
            data.push(parseFloat(temperature));

            updateTemp = parseFloat(temperature).toFixed(1);
        }


        $("#mainTemperature").text(`${updateTemp} ℃`);

        return { labels, data };
    }

    // グラフを描画する関数
    function drawChart(data) {
        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Temperature (°C)',
                    data: data.data,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Datetime'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Temperature (°C)'
                        },
                        beginAtZero: false
                    }
                }
            }
        });
    }

    function updateAll() {
        fetchCSV().then(text => {
            const data = parseCSV(text);
            drawChart(data);
            $("#dragon").attr("src", "./static/img/dragon_transparent.png");
        });
    }
});