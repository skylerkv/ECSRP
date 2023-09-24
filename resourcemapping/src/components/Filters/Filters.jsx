import React from 'react';
import './styles.css';

const Filters = () => {
    return (
        //ADD 'SEARCH' BUTTON SO USER CAN INPUT ALL FILTERS AND THEN GET RESULTS
        <div className='container'>
            <h4>Shelters, food banks, medical facilities, and volunteer organizations around you!</h4>
            <div class="formControl">
                <label for="type">Type</label>
                <select id="type" name="type">
                    <option value="Select">Select an option</option>
                    <option value="Shelters">Shelters</option>
                    <option value="FoodBanks">Food Banks</option>
                    <option value="MedicalFacilities">Medical Facilities</option>
                    <option value="VolunteerGroups">Volunteer Groups</option>
                </select>
            </div>
            <div class="formControl">
                <label for="type">Distance</label>
                <select id="type" name="type">
                    <option value="Select">Select an option</option>
                    <option value="5mi">5 miles</option>
                    <option value="10mi">10 miles</option>
                    <option value="15mi">15 miles</option>
                    <option value="20plusmi">20+ miles</option>
                </select>
            </div>
            <button class="searchButton">Search</button>
        </div>
    );
}
export default Filters;