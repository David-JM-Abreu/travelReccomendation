var recommendations = []
window.onload =
    function() {
  fetchRecommendations();
}

// Get recommendation list
function fetchRecommendations() {
  // Fetch the JSON file from the assets folder
  fetch('/travelReccomendation/assets/travel_recommendation_api.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        // Handle the JSON data
        recommendations = data;
      })
      .catch(error => {
        // Handle any errors
        console.error('There was a problem with the fetch operation:', error);
      });
}



function search() {
  let searchText = document.querySelector('#search_input').value.toLowerCase();

  document.querySelector('.results').innerHTML = '';
  // Check if input is pertaining to any key
  for (const [key, value] of Object.entries(recommendations)) {
    if (key.includes(searchText)) {
      value.forEach(destination => {
        if (destination.cities != undefined && destination.cities.length > 0) {
          destination.cities.forEach(city => {
            let recommendation = document.createElement('div');
            recommendation.className = 'recommendation';

            let image = document.createElement('img');
            image.src = `assets/images/${city.imageUrl}`;

            let title = document.createElement('h1');
            title.innerText = city.name;

            let description = document.createElement('p');
            description.innerText = city.description

            recommendation.appendChild(image);
            recommendation.appendChild(title);
            recommendation.appendChild(description);

            document.querySelector('.results').appendChild(recommendation);
          });
        } else {
          let recommendation = document.createElement('div');
          recommendation.className = 'recommendation';

          let image = document.createElement('img');

          image.src = `assets/images/${destination.imageUrl}`;

          let title = document.createElement('h1');
          title.innerText = destination.name;

          let description = document.createElement('p');
          description.innerText = destination.description

          recommendation.appendChild(image);
          recommendation.appendChild(title);
          recommendation.appendChild(description);

          document.querySelector('.results').appendChild(recommendation);
        }
      });
    }
  }
}

function clearSearch() {
  document.querySelector('.results').innerHTML = '';
  document.querySelector('#search_input').value = '';
}