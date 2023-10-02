import axios from "axios";

const URL = 'https://homeless-shelter.p.rapidapi.com/location';

const options = {
//   method: 'GET',
//   url: 'https://homeless-shelter.p.rapidapi.com/location',
  params: {
    lat: '44.8113',
    lng: '-91.4985',
    radius: '5'
  },
  headers: {
    'X-RapidAPI-Key': '46a1a962e1mshd0ba9aa0189c60dp107b31jsnce41d8beec7c',
    'X-RapidAPI-Host': 'homeless-shelter.p.rapidapi.com'
  }
};

// try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
// } catch (error) {
// 	console.error(error);
// }

export const getSheltersData = async() => {
    try{
        const {data:{data}} = await axios.get(URL, options);

        return data;
    }catch (error) {
        console.log(error);
    }
}