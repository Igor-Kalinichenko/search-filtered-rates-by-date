let date = new Date();
let todayDate = date.toLocaleDateString().split('.').reverse().join('-');

let rates = [];

let captionEl = document.createElement('caption');
captionEl.style.captionSide = 'top';
captionEl.innerText = 'Current Date: ' + todayDate;
document.querySelector('.table').prepend(captionEl);

let inputSearch = document.createElement('input');
inputSearch.className = 'form-control m-3';
inputSearch.id = 'search';
inputSearch.setAttribute('placeholder', 'Type search here');
document.querySelector('.table').before(inputSearch);

let inputDate = document.createElement('input');
    Object.assign(inputDate, {
        type: 'date',
        id: 'chooseDate',
        name: 'rateDate',
        max: todayDate,
        value: todayDate
    });
inputDate.className = 'm-3';
document.querySelector('#search').before(inputDate);

document.getElementById('chooseDate').onchange = function() {
    getRates(inputDate.value.replaceAll('-', ''));
    captionEl.innerText = 'Current Date: ' + inputDate.value;
    document.getElementById('search').value = '';
}

document.getElementById('search').onkeyup = function(event) {
    let searchValue = event.currentTarget.value.toLowerCase().trim();
    let filteredRates = rates.filter(function(rate){
        return rate.txt.toLowerCase().includes(searchValue);
    })
    render(filteredRates);
}

function render(rates) {
    const htmlStr = rates.reduce(function(acc, rate, index) {
        return acc + `<tr>
                    <td>${index + 1}</td>
                    <td>${rate.txt}</td>
                    <td>${rate.rate}</td>
                    <td>${rate.r030}</td>
                    <td>${rate.cc}</td>
                </tr>`;
    }, '');
    document.querySelector('.table tbody').innerHTML = htmlStr;
}

function getRates(currentDate) {
    fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=' + currentDate + '&json').then(function (data){
        return data.json();
    }).then(function(data) {
        rates = data;
        render(rates);
    });
}
getRates(todayDate.replaceAll('-', ''));