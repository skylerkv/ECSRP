document.addEventListener('DOMContentLoaded', () => {
    // Fetch data from your shelter server
    fetch('http://localhost:3001/api/shelterData')
      .then((response) => response.json())
      .then((data) => {
        // Assuming 'data' is an array of shelter objects
  
        const shelterCardsContainer = document.getElementById('shelter-cards');
  
        data.forEach((shelter) => {
          // Create a div element for each shelter card
          const card = document.createElement('div');
          card.classList.add('card'); // Add CSS classes for styling
  
          // Create the content for the card
          const cardContent = `
            <h2>${shelter.name}</h2>
            <p>Address: ${shelter.address}, ${shelter.city}, ${shelter.state} ${shelter.zip_code}</p>
            <p>Phone: ${shelter.phone_number}</p>
            <!-- Add more information as needed -->
          `;
  
          // Set the card's innerHTML to the content
          card.innerHTML = cardContent;
  
          // Append the card to the container
          shelterCardsContainer.appendChild(card);
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
            <!-- Add more information as needed -->
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
    
  });
