const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruits = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry',
	'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry',
	'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit',
	'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit',
	'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry',
	'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen',
	'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry',
	'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarin', 'Tangerine', 'Papaya',
	'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate',
	'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma',
	'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'
];
//1. First step is to define the search function that compares the string passed in to the fruits array above
function search(str) {
	//results is an empty array that will be filled with the potential options
	let results = [];
	//set the string to lowercase so that no matter the case, ALL matching results will return
	let lowerCasedString = str.toLowerCase();
	// using the map method to iterate over each element in the fruits array
	let lowerCasedFruits = fruits.map(fruit => {
		//creates a new array of objects that includes the original fruit name and the lowercased version
		return {
			//name is original with the capitalized first letter
			name: fruit,
			//lowerCasedName is changing the fruit to lowercase (to match the str passed in)
			lowerCasedName: fruit.toLowerCase()
		};
	})
	//iterate over all of the items in the lowercased fruits array of objects
	for (let fruit of lowerCasedFruits) {
		//if the individual element includes the string passed in,
		if (fruit.lowerCasedName.includes(lowerCasedString)) {
			//add the matching value connected to the 'name' property of the fruit
			// object to the end of the results array
			results.push(fruit.name);
		};
	};
	//returning updated results array which only includes the original fruit names
	return results;
}

//2. Second step creates a function where we trigger the search(str) function by a particular event 
function searchHandler(e) {
	//the value of our event (in this case, the input value into the search bar)
	let searchQuery = e.target.value;
	//triggers search(str) function with the value that is typed into the search bar
	let searchResults = search(searchQuery);
	//pass in searchResults and searchQuery as the parameters of showSuggestions function
	showSuggestions(searchResults, searchQuery);
}

//3.Third step shows the suggestions (list) depending on what is typed in the search bar (inputVal)
//takes in a results array (in this case it will be the array from the search function) and the user inputVal 
//(the input value the user has typed in from the search function)
function showSuggestions(results, inputVal) {
	//starts out the suggestions list empty every time we keypress (search handler below)
	suggestions.innerHTML = '';

	//defining a new regular expression which takes the inputVal and will compare it globally and case insensitively ('gi')
	const regex = new RegExp(inputVal, 'gi');
	//iterates over each element in the results array to add to the html 
	for (let result of results) {

		//we create a lew li element 
		const li = document.createElement('li');
		//we replace each letter that matches (regardless of case) with a bold version of said letter
		const boldText = result.replace(regex, '<strong class="bold">$&</strong>');
		//the text content of the li element is the current result value (with the bolded matching letters)
		li.innerHTML = boldText;
		//we append the newSuggestion li to the suggestions ul 
		suggestions.appendChild(li);
	}
	//show the suggestions list if there are results and inputVal is not empty
	if (results.length > 0 && inputVal !== '') {
		suggestions.style.display = 'block';
		//otherwise do not show the results array
	} else {
		suggestions.style.display = 'none';
	}
}
//4. Fourth step is to populate the search bar with what the user clicks on in the list of options
function useSuggestion(e) {
	//if the target that is an li element (a suggestion)
	if (e.target.tagName === 'LI') {
		//the new value/ text of the input (search bar) is the clicked li element
		input.value = e.target.textContent;
		//we then clear out the suggestions ul 
		suggestions.innerHTML = '';
	}
}

//when the user lets go of the key, the searchHandler function will trigger with whatever is typed into the input
input.addEventListener('keyup', searchHandler);
//when the user clicks on the suggestions ul, the useSuggestion function is triggered (to populate the search bar)
suggestions.addEventListener('click', useSuggestion);