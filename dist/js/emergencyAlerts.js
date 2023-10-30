const apiUrl = 'https://api.weather.gov';
    const zone = 'WIZ028';
    const endpoint = `/alerts/active/zone/${zone}`;
    const alertContainer = document.getElementById('container');
    const fetchAlertButton = document.getElementById('alerts');

    fetchAlertButton.addEventListener('click', () => {
      // Make the GET request to the API when the button is clicked
      fetch(apiUrl + endpoint)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // Handle the weather alert data for the specific zone here
          alertContainer.innerHTML = ''; // Clear previous alerts
          if (data.features && data.features.length > 0) {
            const alerts = data.features;
            alerts.forEach(alert => {
              const alertTitle = alert.properties.headline;
              const alertDescription = alert.properties.description;
              const alertNode = document.createElement('div');
              alertNode.innerHTML = `<strong>${alertTitle}</strong><p>${alertDescription}</p>`;
              alertContainer.appendChild(alertNode);
            });
          } else {
            alertContainer.innerHTML = 'No active alerts for this zone.';
          }
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    });