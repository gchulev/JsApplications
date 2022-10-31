function attachEvents() {
    document.getElementById('submit').addEventListener('click', getWeatherData);

    function getWeatherData() {

        let userInput = document.getElementById('location').value;

        if (document.querySelector('div.forecasts')) {
            document.querySelector('div.forecasts').remove();
        }

        if (document.getElementById('upcoming')) {
            Array.from(document.getElementById('upcoming').children).map((child, index) => {
                if (index > 0) {
                    child.remove();
                }
            });
        }

        if (document.getElementById('current')) {
            const currentDivChldrendArr = document.getElementById('current').children;
            for (let i = 0; i < currentDivChldrendArr.length; i++) {
                if (currentDivChldrendArr[i].tagName.toLowerCase() === 'span') {
                    currentDivChldrendArr[i].remove();
                    i--;
                }
            }
        }

        fetch('http://localhost:3030/jsonstore/forecaster/locations')
            .then(response => response.ok === true ? response.json() : 'Error')
            .then(weatherData)
            .catch(error => {
                let errorSpan = document.createElement('span');
                errorSpan.textContent = 'Error';
                document.getElementById('forecast').style.display = 'block';
                document.getElementById('current').appendChild(errorSpan);
            });

        function weatherData(data) {
            const location = data.find(elm => elm.name === userInput);

            if (!location) {
                throw new Error('Error');
            }

            fetch(`http://localhost:3030/jsonstore/forecaster/today/${location.code}`)
                .then(response => response.ok === true ? response.json() : 'Error')
                .then(todayData)
                .catch(error => {
                    let errorSpan = document.createElement('span');
                    errorSpan.textContent = 'Error';
                    document.getElementById('forecast').style.display = 'block';
                    document.getElementById('current').appendChild(errorSpan);
                });

            function todayData(todayForecast) {

                // Create needed elements
                let currentDiv = document.getElementById('current');
                let divForecasts = document.createElement('div');
                let spanConditionSymbol = document.createElement('span');
                let spanCondition = document.createElement('span');
                let spanCity = document.createElement('span');
                let temperature = document.createElement('span');
                let weatherStatus = document.createElement('span');

                // Add classes and values to the elements
                divForecasts.classList.add('forecasts');

                spanConditionSymbol.classList.add('condition');
                spanConditionSymbol.classList.add('symbol');

                switch (todayForecast.forecast.condition) {
                    case 'Sunny':
                        spanConditionSymbol.innerHTML = '&#x2600;';
                        break;

                    case 'Partly sunny':
                        spanConditionSymbol.innerHTML = '&#x26C5;';
                        break;

                    case 'Overcast':
                        spanConditionSymbol.innerHTML = '&#x2601;';
                        break;

                    case 'Rain':
                        spanConditionSymbol.innerHTML = '&#x2614;';
                        break;

                    case 'Degrees':
                        spanConditionSymbol.innerHTML = '&#176;';
                        break;

                    default:
                        break;
                }

                spanCondition.classList.add('condition');

                spanCity.classList.add('forecast-data');
                spanCity.textContent = todayForecast.name;

                temperature.classList.add('forecast-data');
                temperature.textContent = `${todayForecast.forecast.low}\u00B0/${todayForecast.forecast.high}\u00B0`;

                weatherStatus.classList.add('forecast-data');
                weatherStatus.textContent = todayForecast.forecast.condition;

                // Append elements to their parents
                currentDiv.appendChild(divForecasts);
                divForecasts.appendChild(spanConditionSymbol);
                divForecasts.appendChild(spanCondition);

                spanCondition.appendChild(spanCity);
                spanCondition.appendChild(temperature);
                spanCondition.appendChild(weatherStatus);

            }

            fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${location.code}`)
                .then(response => response.ok === true ? response.json() : 'Error')
                .then(threeDaysForecast)
                .catch(error => {
                    let errorSpan = document.createElement('span');
                    errorSpan.textContent = 'Error';
                    document.getElementById('forecast').style.display = 'block';
                    document.getElementById('upcoming').appendChild(errorSpan);
                });

            function threeDaysForecast(threeDaysForecast) {
                let upcomingDiv = document.getElementById('upcoming');

                // Crtate new elements
                let forecastInfoDiv = document.createElement('div');

                // Assinging values and classes to the elements
                forecastInfoDiv.classList.add('forecast-info');

                threeDaysForecast.forecast.map(item => {
                    let upcomingSpan = document.createElement('span');
                    let symbolSpan = document.createElement('span');
                    let temperatureSpan = document.createElement('span');
                    let statusSpan = document.createElement('span');

                    upcomingSpan.classList.add('upcoming');
                    symbolSpan.classList.add('symbol');
                    temperatureSpan.classList.add('forecast-data');
                    statusSpan.classList.add('forecast-data');

                    switch (item.condition) {
                        case 'Sunny':
                            symbolSpan.innerHTML = '&#x2600;';
                            break;

                        case 'Partly sunny':
                            symbolSpan.innerHTML = '&#x26C5;';
                            break;

                        case 'Overcast':
                            symbolSpan.innerHTML = '&#x2601;';
                            break;

                        case 'Rain':
                            symbolSpan.innerHTML = '&#x2614;';
                            break;

                        case 'Degrees':
                            symbolSpan.innerHTML = '&#176;';
                            break;

                        default:
                            break;
                    }

                    temperatureSpan.textContent = `${item.low}\u00B0/${item.high}\u00B0`;
                    statusSpan.textContent = item.condition;

                    upcomingSpan.appendChild(symbolSpan);
                    upcomingSpan.appendChild(temperatureSpan);
                    upcomingSpan.appendChild(statusSpan);

                    upcomingDiv.appendChild(upcomingSpan);

                    return upcomingSpan;
                });
            }
            document.getElementById('forecast').style.display = 'block';
        }
    }
}

attachEvents();