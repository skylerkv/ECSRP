document.addEventListener('DOMContentLoaded', () => {
  let userLoc; //variable to get user's current location
  
  //pulls user current location  
  function success(position){
    userLoc = {
      lat: position.coords.latitude,
      long: position.coords.longitude
    };
    console.log("success getting user loc");
    console.log(userLoc); //test success!
  }
  function error(error){
    console.error("error getting user loc", error.message);
  }
  if('geolocation' in navigator){ //get user loc
    navigator.geolocation.getCurrentPosition(success,error);
  }else{
    console.error("geoloc isn't supported by browser");
  }

    // Fetch data from your shelter server
    const shelterMarkers = [] 
    const volunteerMarkers = []; 
    const foodMarkers = [];
    const medicalMarkers = [];
    
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
            <h2>${shelter.name}</h2>
            <p>Homeless Shelter - ${shelter.address}, ${shelter.city}, ${shelter.state} ${shelter.zip_code}</p>
            <p>${shelter.phone_number}</p>
            <div class="socials">
              <a href="${shelter.official_website}" target="_blank"><img src="/webicon.png" alt="website" width=50px></a>
              <a href="${shelter.facebook}" target="_blank"><img src="/fbicon.png" alt="facebook" width=40px></a>
              <a href="${shelter.twitter}" target="_blank"><img src="/twticon.png" alt="twitter" width=40px></a>
            </div>
            <div class="sociallink">
              <p><a href="${shelter.official_website}" target="_blank">Website</a></p>
              <p><a href="${shelter.facebook}" target="_blank">Facebook</a></p>
              <p><a href="${shelter.twitter}" target="_blank">Twitter</a></p>
              </div>
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
              console.log('markers being pushed', shelterMarkers); //test successful
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
    fetch('http://localhost:3001/db/medical')
      .then((response) => response.json())
      .then((data) => {
        const medicalCardsContainer = document.getElementById('hospital-cards');
        data.forEach((medical) => {
          const card = document.createElement('div');
          card.classList.add('card');
          
          const [lat,long] = medical.m_location.split(',');

          card.dataset.lat = lat;
          card.dataset.long = long;
          
          const cardContent = `
            <h2>${medical.m_name}</h2>
            <p>Medical Center - ${medical.m_street_addr}, ${medical.m_city}, ${medical.m_state} ${medical.m_zip}</p>
            <p>${medical.m_phone}</p>
            <div class="socials">
              <a href="${medical.m_url}" target="_blank"><img src="/webicon.png" alt="website" width=50px></a>
              <a href="${medical.m_facebook}" id="fb" target="_blank"><img src="/fbicon.png" alt="facebook" width=40px></a>
              <a href="${medical.m_twitter}" id="twt" target="_blank"><img src="/twticon.png" alt="twitter" width=40px></a>
            </div>
            <div class="sociallink">
              <p><a href="${medical.m_url}" target="_blank">Website</a></p>
              <p><a href="${medical.m_facebook}" target="_blank">Facebook</a></p>
              <p><a href="${medical.m_twitter}" target="_blank">Twitter</a></p>
              </div>
          `;

          card.innerHTML = cardContent;
          medicalCardsContainer.appendChild(card);

          card.addEventListener('click', () => {
            const lat = parseFloat(card.dataset.lat);
            const long = parseFloat(card.dataset.long);

            card.classList.toggle('selected'); //color change test

            if(card.classList.contains('selected')) {
              const marker = new google.maps.Marker({
                position: {lat: lat, lng: long},
                map: map,
                title: medical.m_name
              });
              medicalMarkers.push(marker);
            }else {
              const markerIndex = medicalMarkers.findIndex(
                (marker) =>
                marker.getPosition().lat() === lat && marker.getPosition().lng() === long
              );
              if(markerIndex !== -1) {
                medicalMarkers[markerIndex].setMap(null);
                medicalMarkers.splice(markerIndex,1);
              }
            }
          });
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
            <p>Food Bank - ${food.fb_street_addr}, ${food.fb_city}, ${food.fb_state} ${food.fb_zip}</p>
            <p>${food.fb_phone}</p>
            <div class="socials">
              <a href="${food.fb_url}" target="_blank"><img src="/webicon.png" alt="website" width=50px></a>
              <a href="${food.fb_facebook}" id="fb" target="_blank"><img src="/fbicon.png" alt="facebook" width=40px></a>
              <a href="${food.fb_twitter}" id="twt" target="_blank"><img src="/twticon.png" alt="twitter" width=40px></a>
            </div>
            <div class="sociallink">
              <p><a href="${food.fb_url}" target="_blank">Website</a></p>
              <p><a href="${food.fb_facebook}" target="_blank">Facebook</a></p>
              <p><a href="${food.fb_twitter}" target="_blank">Twitter</a></p>
              </div>
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
          
          // const cardContent = `
          //   <h2>${volunteer.v_name}</h2>
          //   <p>Address: ${volunteer.v_street_addr}, ${volunteer.v_city}, ${volunteer.v_state} ${volunteer.v_zip}</p>
          //   <p>Phone: ${volunteer.v_phone}</p>
          //   <p>Website: <a href="${volunteer.v_url}" target="_blank">${volunteer.v_url}</a></p>
          //   <!-- add socials and email with icons -->
          // `;

          const cardContent = `
            <h2>${volunteer.v_name}</h2>
            <p>Organization - ${volunteer.v_street_addr}, ${volunteer.v_city}, ${volunteer.v_state} ${volunteer.v_zip}</p>
            <p>${volunteer.v_phone}</p>
            <div class="socials">
              <a href="${volunteer.v_url}" target="_blank"><img src="/webicon.png" alt="website" width=50px></a>
              <a href="${volunteer.v_facebook}" id="fb" target="_blank"><img src="/fbicon.png" alt="facebook" width=40px></a>
              <a href="${volunteer.v_twitter}" id="twt" target="_blank"><img src="/twticon.png" alt="twitter" width=40px></a>
            </div>
            <div class="sociallink">
              <p><a href="${volunteer.v_url}" target="_blank">Website</a></p>
              <p><a href="${volunteer.v_facebook}" target="_blank">Facebook</a></p>
              <p><a href="${volunteer.v_twitter}" target="_blank">Twitter</a></p>
              </div>
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

    //filters by type
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

    //filter by distance

    //fxn for calculating distance btwn user and location 
    function calculateDistance(lat1,long1,lat2,long2){
      const latDiff = lat2 - lat1;
      const longDiff = long2 - long1;
      const distance = Math.sqrt((latDiff*latDiff) + (longDiff*longDiff));
      return distance;
    }


    function filterDistance(selectedDistance) {
      const allCardsContainers = document.querySelectorAll('#shelter-cards, #hospital-cards, #food-cards, #volunteer-cards');
    
      allCardsContainers.forEach((cardsContainer) => {
        const cards = Array.from(cardsContainer.querySelectorAll('.card'));
    
        // Get all cards initially
        cards.forEach((card) => {
          card.style.display = 'block';
        });
    
        // Filter cards based on distance if selectedDistance is not 'all'
        if (selectedDistance !== 'all') {
          const filteredCards = cards.filter((card) => {
            const lat = parseFloat(card.dataset.lat);
            const long = parseFloat(card.dataset.long);
            const distance = calculateDistance(userLoc.lat, userLoc.long, lat, long);
    
            return distance <= parseInt(selectedDistance);
          });
    
          // Hide cards that are not in the filtered list
          cards.forEach((card) => {
            if (!filteredCards.includes(card)) {
              card.style.display = 'none';
            }
          });
        }
      });
    
      return 'Filter applied successfully';
    }
    
    function filterDistance(selectedDistance) {
      const allCardsContainers = document.querySelectorAll('#shelter-cards, #hospital-cards, #food-cards, #volunteer-cards');
      console.log("we're in the fxn");
    
      allCardsContainers.forEach((cardsContainer) => {
        const existingCardIds = new Set();
        const cards = Array.from(cardsContainer.querySelectorAll('.card'));
        console.log(`Before filtering - Container: ${cardsContainer.id}, Number of cards: ${cards.length}`);
    
        // Clear the container
        cardsContainer.innerHTML = '';
    
        // Sort and filter cards based on distance
        cards.sort((cardA, cardB) => {
            const latA = parseFloat(cardA.dataset.lat);
            const longA = parseFloat(cardA.dataset.long);
            const distanceA = calculateDistance(userLoc.lat, userLoc.long, latA, longA);
    
            const latB = parseFloat(cardB.dataset.lat);
            const longB = parseFloat(cardB.dataset.long);
            const distanceB = calculateDistance(userLoc.lat, userLoc.long, latB, longB);
    
            return distanceA - distanceB; // Sort in ascending order
          })
          .forEach((card) => {
            const lat = parseFloat(card.dataset.lat);
            const long = parseFloat(card.dataset.long);
            const distance = calculateDistance(userLoc.lat, userLoc.long, lat, long);
    
            if (distance <= parseInt(selectedDistance) || selectedDistance === "all") {
              const cardId = `${lat}-${long}`;
              if (!existingCardIds.has(cardId)) {
                cardsContainer.appendChild(card);
                existingCardIds.add(cardId);
              }
            }
          });
    
        // Show all cards
        cards.forEach((card) => {
          card.style.display = 'none';
        });
    
        console.log(`After filtering - Container: ${cardsContainer.id}, Number of cards: ${cardsContainer.querySelectorAll('.card').length}`);
      });
    
      return "Filter applied successfully";
    }
    
    function filterDistance(selectedDistance) {
      const allCardsContainers = document.querySelectorAll('#shelter-cards, #hospital-cards, #food-cards, #volunteer-cards');
      console.log("we're in the fxn");
    
      allCardsContainers.forEach((cardsContainer) => {
        const existingCardIds = new Set();
        const cards = Array.from(cardsContainer.querySelectorAll('.card'));
        console.log(`Before filtering - Container: ${cardsContainer.id}, Number of cards: ${cards.length}`);
    
        // Clear the container
        //cardsContainer.innerHTML = '';
    
        // Sort and filter cards based on distance
        cards.sort((cardA, cardB) => {
            const latA = parseFloat(cardA.dataset.lat);
            const longA = parseFloat(cardA.dataset.long);
            const distanceA = calculateDistance(userLoc.lat, userLoc.long, latA, longA);
    
            const latB = parseFloat(cardB.dataset.lat);
            const longB = parseFloat(cardB.dataset.long);
            const distanceB = calculateDistance(userLoc.lat, userLoc.long, latB, longB);
    
            return distanceA - distanceB; // Sort in ascending order
          })
          .forEach((card) => {
            const lat = parseFloat(card.dataset.lat);
            const long = parseFloat(card.dataset.long);
            const distance = calculateDistance(userLoc.lat, userLoc.long, lat, long);
    
            if (distance <= parseInt(selectedDistance) || selectedDistance === "all") {
              const cardId = `${lat}-${long}`;
              if (!existingCardIds.has(cardId)) {
                cardsContainer.appendChild(card);
                existingCardIds.add(cardId);
              }
            }
          });
    
        // Show all cards
        cards.forEach((card) => {
          card.style.display = 'block';
        });
    
        console.log(`After filtering - Container: ${cardsContainer.id}, Number of cards: ${cardsContainer.querySelectorAll('.card').length}`);
      });
    
      return "Filter applied successfully";
    }
    
    const distanceSelectElement = document.getElementById('distance');
    const typeSelectElement = document.getElementById('type');

    distanceSelectElement.addEventListener('change', () => {
      console.log("distance dropdown changed");
      filterDistance(distanceSelectElement.value);
    });
    typeSelectElement.addEventListener('change', () => {
      console.log("type dropdown changed");
      distanceSelectElement.value = 'all'; //Reset distance dropdown to "All"
      filterDistance(distanceSelectElement.value); //Apply filter
      console.log("DOES THIS WORK", filterDistance(distanceSelectElement.value));
    });
  });
