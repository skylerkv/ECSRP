document.addEventListener('DOMContentLoaded', () => {
    function success(position){
      const userLoc = {
        lat: position.coords.lat,
        long: position.coords.long
      };
      console.log("user loc:", userLoc); //test

      //filterByDistance(userLoc.lat, userLoc.long);
    }

    function error(error){
      console.error("error getting user loc", error.message);
    }

    if('geolocation' in navigator){ //get user loc
      navigator.geolocation.getCurrentPosition(success,error);
    }else{
      console.error("geoloc isn't supported by browser");
    }

    //fxn for filterByDistance() below
    // function filterByDistance(lat1,long1,lat2,long2){
    //   const latDiff = lat2 - lat1;
    //   const longDiff = long2 - long1;
    //   const distance = Math.sqrt((latDiff*latDiff) + (longDiff*longDiff));
    //   return distance;
    // }
  
    // Fetch data from your shelter server
    const shelterMarkers = [] 
    const volunteerMarkers = []; 
    const foodMarkers = [];
    fetch('http://localhost:3001/api/shelterData')
      .then((response) => response.json())
      .then((data) => {
        // Assuming 'data' is an array of shelter objects
  
        const shelterCardsContainer = document.getElementById('shelter-cards');
  
        data.forEach((shelter) => {
          // Create a div element for each shelter card
          const card = document.createElement('div');
          card.classList.add('card'); // Add CSS classes for styling
  
          const [lat,long] = shelter.location.split(','); //pulls lat and long

          card.dataset.lat = lat; //stores lat data
          card.dataset.long = long; //stores long data

          // Create the content for the card
          const cardContent = `
            <img ${shelter.photo_urls}>
            <h2>${shelter.name}</h2>
            <p>Address: ${shelter.address}, ${shelter.city}, ${shelter.state} ${shelter.zip_code}</p>
            <p>Phone: ${shelter.phone_number}</p>
            <p>Website: <a href="${shelter.official_website}" target="_blank">${shelter.official_website}</a></p>
            <!-- add socials and email with icons -->
          `;
  
          // Set the card's innerHTML to the content
          card.innerHTML = cardContent;
  
          // Append the card to the container
          shelterCardsContainer.appendChild(card);

          card.addEventListener('click', () => {
            const lat = parseFloat(card.dataset.lat);
            const long = parseFloat(card.dataset.long);

            card.classList.toggle('selected'); //color change?

            if(card.classList.contains('selected')){
              const marker = new google.maps.Marker({
                position: {lat: lat, lng: long},
                map: map,
                title: shelter.name
              });
              shelterMarkers.push(marker);
            }else{
              const markerIndex = shelterMarkers.findIndex(
                (marker) =>
                marker.getPosition().lat() === lat && marker.getPosition().lng() === long
              ); 
              if(markerIndex !== -1) {
                shelterMarkers[markerIndex].setMap(null); //testing
                shelterMarkers.splice(markerIndex,1); //testing
              }
            }
          });
        });
      })
      .catch((error) => {
        console.error(error);
    });

    fetch('http://localhost:3001/api/hospitalData')
      .then((response) => response.json())
      .then((data) => {
        // Assuming 'data' is an array of shelter objects
  
        const hospitalCardsContainer = document.getElementById('hospital-cards');
  
        data.forEach((hospital) => {
          // Create a div element for each shelter card
          const card = document.createElement('div');
          card.classList.add('card'); // Add CSS classes for styling
  
          // Create the content for the card
          const cardContent = `
            <h2>${hospital["Hospital Name"]}</h2>
            <p>Address: ${hospital["Street Address"]}, ${hospital.city}, ${hospital.state} ${hospital.zip_code}</p>
            <p>Phone: ${hospital.phone}</p>
            <p>Website: <a href="${hospital.Url}" target="_blank">${hospital.Url}</a></p>
            <!-- add socials and email with icons -->
          `;
  
          // Set the card's innerHTML to the content
          card.innerHTML = cardContent;
  
          // Append the card to the container
          hospitalCardsContainer.appendChild(card);
        });
      })
      .catch((error) => {
        console.error(error);
      });
    fetch('http://localhost:3001/db/food')
      .then((response) => response.json())
      .then((data) => {
        const foodCardsContainer = document.getElementById('food-cards');
        data.forEach((food) => {
          const card = document.createElement('div');
          card.classList.add('card');
          
          const [lat,long] = food.fb_location.split(',');

          card.dataset.lat = lat;
          card.dataset.long = long;
          
          const cardContent = `
            <h2>${food.fb_name}</h2>
            <p>Address: ${food.fb_street_addr}, ${food.fb_city}, ${food.fb_state} ${food.fb_zip}</p>
            <p>Phone: ${food.fb_phone}</p>
            <p>Website: <a href="${food.fb_url}" target="_blank">${food.fb_url}</a></p>
            <!-- add socials and email with icons -->
          `;
          card.innerHTML = cardContent;
          foodCardsContainer.appendChild(card);

          card.addEventListener('click', () => {
            const lat = parseFloat(card.dataset.lat);
            const long = parseFloat(card.dataset.long);

            card.classList.toggle('selected'); //color change test

            if(card.classList.contains('selected')) {
              const marker = new google.maps.Marker({
                position: {lat: lat, lng: long},
                map: map,
                title: food.fb_name
              });
              foodMarkers.push(marker);
            }else {
              const markerIndex = foodMarkers.findIndex(
                (marker) =>
                marker.getPosition().lat() === lat && marker.getPosition().lng() === long
              );
              if(markerIndex !== -1) {
                foodMarkers[markerIndex].setMap(null);
                foodMarkers.splice(markerIndex,1);
              }
            }
          });
        });
      })
    .catch((error) => {
      console.error(error);
    });
    fetch('http://localhost:3001/db/volunteering') 
      .then((response) => response.json())
      .then((data) => {
        const volunteerCardsContainer = document.getElementById('volunteer-cards');
        data.forEach((volunteer) => {
          const card = document.createElement('div');
          card.classList.add('card');
          
          const [lat,long] = volunteer.v_location.split(',');

          card.dataset.lat = lat;
          card.dataset.long = long;
          
          const cardContent = `
            <h2>${volunteer.v_name}</h2>
            <p>Address: ${volunteer.v_street_addr}, ${volunteer.v_city}, ${volunteer.v_state} ${volunteer.v_zip}</p>
            <p>Phone: ${volunteer.v_phone}</p>
            <p>Website: <a href="${volunteer.v_url}" target="_blank">${volunteer.v_url}</a></p>
            <!-- add socials and email with icons -->
          `;
          card.innerHTML = cardContent;
          volunteerCardsContainer.appendChild(card);

          card.addEventListener('click', () => {
            const lat = parseFloat(card.dataset.lat);
            const long = parseFloat(card.dataset.long);

            card.classList.toggle('selected'); //color change

            if(card.classList.contains('selected')){
              const marker = new google.maps.Marker({
                position: {lat: parseFloat(lat), lng: parseFloat(long)},
                map: map,
                title: volunteer.v_name
              });
              volunteerMarkers.push(marker); 
            }else{
              const markerIndex = volunteerMarkers.findIndex(
                (marker) =>
                  marker.getPosition().lat() === lat && marker.getPosition().lng() === long
              ); 
              if(markerIndex !== -1) {
                volunteerMarkers[markerIndex].setMap(null); 
                volunteerMarkers.splice(markerIndex,1); 
              }
            }
          });
        });
      })
    .catch((error) => {
      console.error(error);
    });
    const shelterCardsContainer = document.getElementById('shelter-cards');
    const hospitalCardsContainer = document.getElementById('hospital-cards');
    const foodCardsContainer = document.getElementById('food-cards');
    const volunteerCardsContainer = document.getElementById('volunteer-cards');
    const selectElement = document.getElementById('type');

    selectElement.addEventListener('change', () => {
      const selectedType = selectElement.value;

      shelterCardsContainer.style.display = 'none';
      hospitalCardsContainer.style.display = 'none';
      foodCardsContainer.style.display = 'none';
      volunteerCardsContainer.style.display = 'none';

      if (selectedType === 'Shelters') {
        shelterCardsContainer.style.display = 'block';
      }else if (selectedType === 'FoodBanks') {
        foodCardsContainer.style.display = 'block';
      }else if (selectedType === 'MedicalFacilities') {
        hospitalCardsContainer.style.display = 'block';
      }else if (selectedType === 'Orgs') {
        volunteerCardsContainer.style.display = 'block';
      }else if (selectedType === 'All') {
        shelterCardsContainer.style.display = 'block';
        hospitalCardsContainer.style.display = 'block';
        foodCardsContainer.style.display = 'block';
        volunteerCardsContainer.style.display = 'block';
      }
    });
  });
