const CURRENCIES = [
    'bitcoin', 'ethereum', 'ripple', 'tether', 'bitcoin-cash',
    'cardano', 'litecoin', 'eos', 'chainlink', 'tezos'
]

const N_CURRENCIES_TO_SHOW = 10;
const N_PAST_DAYS = 4;
const N_FUTURE_DAYS = 3;

// TODO fetch!
function postSubscriber() {

}

function deleteSubscriber() {

}

function getPrice(currency, dayShift) {
    return 1.0;
}

function getChangeInUnits(currency, dayShift) {
    return 2.0;
}

function getChangeInPercent(currency, dayShift) {
    return 3.0;
}

function getRadioValue() {
    var radio = document.getElementsByName('table-radio');
    var priceChecked = radio[0].checked;
    var changeChecked = radio[1].checked;

    const BLACK = 'black';
    const GREEN = 'green';
    const RED = 'red';

    if (priceChecked) {
        for (let curr = 0; curr < N_CURRENCIES_TO_SHOW; curr++) {

            for (let day = 0; day < N_PAST_DAYS ; day++) {
                document.getElementById(CURRENCIES[curr] + '-past-' + day)
                .innerHTML = getPrice(CURRENCIES[curr], -day);
                document.getElementById(CURRENCIES[curr]+ '-past-' + day)
                .style.color = BLACK;
            }
            for (let day = 0; day < N_FUTURE_DAYS; day++) {
                document.getElementById(CURRENCIES[curr] + '-future-' + day)
                .innerHTML = getPrice(CURRENCIES[curr], day);
                document.getElementById(CURRENCIES[curr]+ '-future-' + day)
                .style.color = BLACK;
            }
        }

    } else if (changeChecked) {
        for (let curr = 0; curr < N_CURRENCIES_TO_SHOW; curr++) {

            for (let day = 0; day < N_PAST_DAYS ; day++) {
                document.getElementById(CURRENCIES[curr] + '-past-' + day)
                .innerHTML = getChangeInUnits(CURRENCIES[curr], -day);

                if (getChangeInUnits(CURRENCIES[curr], day) < 0) {
                    document.getElementById(CURRENCIES[curr] + '-past-' + day)
                    .style.color = RED;
                } else {
                    document.getElementById(CURRENCIES[curr] + '-past-' + day)
                    .style.color = GREEN;
                }
            }
            for (let day = 0; day < N_FUTURE_DAYS; day++) {
                document.getElementById(CURRENCIES[curr] + '-future-' + day)
                .innerHTML = getChangeInUnits(CURRENCIES[curr], day);

                if (getChangeInUnits(CURRENCIES[curr], day) < 0) {
                    document.getElementById(CURRENCIES[curr] + '-future-' + day)
                    .style.color = RED;
                } else {
                    document.getElementById(CURRENCIES[curr] + '-future-' + day)
                    .style.color = GREEN;
                }
            }
        }

    } else {
        for (let curr = 0; curr < N_CURRENCIES_TO_SHOW; curr++) {

            for (let day = 0; day < N_PAST_DAYS ; day++) {
                document.getElementById(CURRENCIES[curr] + '-past-' + day)
                .innerHTML = getChangeInPercent(CURRENCIES[curr], -day)

                if (getChangeInPercent(CURRENCIES[curr], day) < 0) {
                    document.getElementById(CURRENCIES[curr] + '-past-' + day)
                    .style.color = RED;
                } else {
                    document.getElementById(CURRENCIES[curr] + '-past-' + day)
                    .style.color = GREEN;
                }
            }
            for (let day = 0; day < N_FUTURE_DAYS; day++) {
                document.getElementById(CURRENCIES[curr] + '-future-' + day)
                .innerHTML = getChangeInPercent(CURRENCIES[curr], day)

                if (getChangeInPercent(CURRENCIES[curr], day) < 0) {
                    document.getElementById(CURRENCIES[curr] + '-future-' + day)
                    .style.color = RED;
                } else {
                    document.getElementById(CURRENCIES[curr] + '-future-' + day)
                    .style.color = GREEN;
                }
            }
        }
    }
}

function getDateLabels(nDaysAgo, nDaysForward) {
    var today = new Date();
    var date = new Date();
    var pastDates = [];
    var futureDates = [];
    var day, month, monthLabel, dateLabel;

    const MONTHS = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    for (let i = nDaysAgo; i > 0; i--) {
        date.setDate(today.getDate() - i + 1);

        day = date.getDate();
        month = date.getMonth();
        monthLabel = MONTHS[month + 1];
        dateLabel = day + ' ' + monthLabel;
        pastDates.push(dateLabel);
    }

    for (let i = 0; i < nDaysForward; i++) {
        date.setDate(today.getDate() + i + 1);

        day = date.getDate();
        month = date.getMonth();
        monthLabel = MONTHS[month + 1];
        dateLabel = day + ' ' + monthLabel;
        futureDates.push(dateLabel);
    }

    return pastDates.concat(futureDates);
}

function getPriceHistory(currency, nDaysAgo, nDaysForward) {
    // TODO! fetch
    return [1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7];
}

function drawChart(currency) {
    var ctx = document.getElementById(currency + '-chart').getContext('2d');
    var label = currency[0].toUpperCase() + currency.substring(1) + ' price';
    var dates = getDateLabels(N_PAST_DAYS, N_FUTURE_DAYS);
    var prices = getPriceHistory(currency, N_PAST_DAYS, N_FUTURE_DAYS);

    const LINE_TENSION = 0;

    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: label,
                data: prices,
                lineTension: LINE_TENSION
            }]
        },
        options: {}
    });
}

function showChart(currency) {
    drawChart(currency);
    var chart = document.getElementById(currency + '-chart');

    if (chart.style.display === 'none') {
        chart.style.display = 'block';
    } else {
        chart.style.display = 'none';
    }
}
