
function click_filter_element (event) {
 
    if (event.target.className === "filter_container") {
        event.target.classList.add("selected")
        event.target.classList.remove("filter_container")
         
    }
    else{
        event.target.classList.remove("selected")
        event.target.classList.add("filter_container")
    
}
    /*
      ARGUMENTS
        event: event-object created when user clicks on one of the filter elements.
  
      SIDE-EFFECTS
        Marks the clicked filter element as selected / unselected.
        Since a filter element will have changed after the click, the list of
        programmes must be updated.
  
        
      NO RETURN VALUE
  
    */
    
  }
  
  
  function create_filter_element (data) {

    let new_element = document.createElement("li")
    new_element.classList.add(data.class)
    new_element.textContent = data.textContent
    data.parent.append(new_element)
   
    new_element.addEventListener("click", click_filter_element)
    return new_element
    
    
    /*
      ARGUMENTS
        data: object that contains the following keys:
          class (string): a class-name given to the created element
          textContent (string): the text that the element contains
          parent (reference to HTML-element): the HTML-element that is the parent of the created element
  
        No control of arguments.
  
      SIDE-EFFECTS
        Creates a new dom-element with the tag "li".
        Gives the new dom-element the class contained in data.class
        Appends the new dom-element to the element referenced in data.parent
        Sets the text content of the new dom-element to data.textContent
        Sets the function click_filter_element as a listener to "click" for the new dom-element
  
      RETURN VALUE
        Returns a reference to the new dom-element
    */
  
  }
 
  
  function add_group_toggling (filter_container_dom) {
  
    /*
      ARGUMENT
        filter_container_dom: reference to a HTML-element that contains a set of fliter_elements
              Exempel: the <ul> that contains the filters for Language.
  
      SIDE EFFECTS
        The function makes sure that when the user clicks on filter_container_dom, all the
        filter_elements that it contains are selected / unselected.
        Since some filter elements will have changed after the click, the list of
        programmes must be updated.
  
      NO RETURN VALUE
  
    */
    
  }
  
  
  function toggle_cities (event) {
  
    /*
  
      ARGUMENTS
        This function does not take any arguments
  
      SIDE EFFECTS
        This function checks the state of the first city-filter-element (Madrid).
        If it is selected then it de-selects ALL city-filter-elements
        If it is de-selected then it selects ALL city-filter-elements 
  
      NO RETURN VALUE
  
    */
  
  }
  
  

  /*
  create_countries_cities_filters

  ARGUMENTS
  Does not take any arguments
  
  SIDE-EFFECTS
  Starts the function array_each with the COUNTRIES array, 
  and for every country, it calls the function "create_country"
 */

  /*
  create_country

  ARGUMENTS
  country: An object from the array "COUNTRIES" that contains all the data for each country
  
  SIDE_EFFECTS
  Creates a div, adds class "country" and "filter_container"
  Gives the div an id wich is the country.id and appends it to "#country_filter > ul"
  Gives the div an h1 with the name of the country and adds the ul class "filter_list"

  lets "cities" be the function array_filter with the CITIES array and a test_function
  and returns it if the city.countryID === country.id
  */

  /*
  create_city

  ARGUMENTS
  city: each city of the array "cities"

  SIDE-EFFECTS
  let dom be create_filter_element
  lets parent be "#country_${city.countryID} > ul"
  gives the class "selected"
  lets textContent = city.name

  gives dom the same id as city.id
  */

  function create_countries_cities_filters () {
    function create_country (country) {
      const dom = document.createElement("div");
      dom.classList.add("country");
      dom.classList.add("filter_container");
      dom.id = "country_" + country.id;
      document.querySelector("#country_filter > ul").append(dom);
      
      dom.innerHTML = `
        <h1>${country.name}</h1>
        <ul class="filter_list"></ul>
      `;
      
      const cities = array_filter(CITIES, test_function);
      function test_function (city) {
        return city.countryID === country.id;
      }
  
      array_each(cities, create_city);
    }
    function create_city (city) {
  
      const dom = create_filter_element({
        parent: document.querySelector(`#country_${city.countryID} > ul`),
        class: "selected",
        textContent: city.name,
      });
      dom.dataset.id = city.id;
  
    }
  
    array_each(COUNTRIES, create_country);
  }
  
  
  
  /*
  ARGUMENT
  create_information_filter: takes an array and a "filter name" 
  
  SIDE-EFFECTS
  calls upon the function array_each with the array and the function create_info
  */

  /*
  create_info
  ARGUMENT
  info: info which has acess to the objects information that is used for textContent and id

  SIDE-EFFECTS
  Places dom in the "filter_name"_filter > ul
  Adds the class selected
  adds textContent to info.name

  gives the dataset.id the same as info.id
  */

  function create_information_filter(array, filter_name){
    
    function create_info(info){
            const dom = create_filter_element({
                parent: document.querySelector(`#${filter_name}_filter > ul`),
                class: "selected",
                textContent: info.name,
            })
            dom.dataset.id = info.id;
            
        }
    array_each(array, create_info)
    }
  
   
  





  function create_programme (programme) {
    
    /*
  
      ARGUMENT
        programme (object): One of the objects from PROGRAMMES
  
      SIDE-EFFECTS
        This function creates the HTML-element that contains all the information
        about one programme, as seen in the video / image.
        
       
      NO RETURN VALUE
  
    */  

      
      
      let parent = document.querySelector("#programmes > ul")
      let div = document.createElement("div")
      div.classList.add("programme")
      let city = CITIES[UNIVERSITIES[programme.universityID].cityID].name
      let country = COUNTRIES[CITIES[UNIVERSITIES[programme.universityID].cityID].countryID].name
      let sun = CITIES[UNIVERSITIES[programme.universityID].cityID].sun
      
      
      
      div.innerHTML = `<div> <h3>${programme.name}</h3>
      
      ${UNIVERSITIES[programme.universityID].name}
       <br>
       ${city}   ${country}
      <br>
       ${LEVELS[programme.levelID - 1].name}, ${SUBJECTS[programme.subjectID].name}, ${LANGUAGES[programme.languageID].name}
        
          
       </div>
       <div class = "bottom_programme">${city}, sun-index: ${sun} </div> `
        
        
    
    parent.append(div)
}


  array_each(PROGRAMMES, create_programme)
  
  
  function update_programmes(){
    read_filters
    addEventListener("click", update_programmes)
    let program = read_filters(programmes)
    let list = document.querySelector("#programmes > ul")
    list.innerHTML = ""
    let p = document.querySelector("#programmes > p")
    if(program.length >= 1){
      p.innerHTML = ""
    } 
    else{
      p.textContent = "Inga program upfyller nuvarande filter."
    }
    array_each(program, create_programme)
    
    
    
    
  }

    /*
        NO ARGUMENTS
  
        SIDE EFFECTS
          This function updates the programmes shown on the page according to
          the current filter status (which filter elements are selected / unselected).
          It uses the function read_filters to know which programmes need to be included.
  
          VG: The top images (header) need to be updated here
  
        NO RETURN VALUE
  
    */
  

  
  

/*
ARGUMENT
The function does not take any arguments

SIDE-EFFECTS
The function starts by creating a variable Called city_selected_dom and it contains all the elements of #country_filter li.lelected

Then it creates an empty array and names it city_id_selected
Then the function array_each is called with city_selected_dom and the function callback_add_cityID as arguments

This function takes a dom_element as argument, creates the variable called id_as_interger and placed the dom_element.dataset.id in it
then it pushs the id_as_interger into the city_selected_dom array

Then it creates a empty array called universities
It loops through the city_selected_dom array and rename every object to city_id
Then in loops through the UNIVERSITIES array and rename every university to university
If the university.cityID is the same as city_id, it pushes the university into the universities array

Then the variable level_selected_dom is created and in it is all the elements in #level_filter li.selected
Then it creates a empty array called level_id_selected

Then it calls the function array_each with level_selected_dom and callback_add_levelID as arguments
The function takes a dom_element as argument 
It creates the variable id_as_interger and puts the dom_element.dataset.id in it
Then it pushes the id_as_interget into the level_id_selected array

Then it sets programmes equal to arrayfilter(programmes,test_function_level
Which calls upon the test_function_level function which checks if programme.levelID is included in level_id_selected and returns it

Then the function does the exact same thing as the level_selected_dom and level_id_selected but with languages and then with subjects.

Then it declares the variable search_string and puts every element in #search_field input.value in it
If search_string isn???t equal to ??????, then it sets programmes = array_filter with programmes and test_function as arguments
Which checks if the programme.name is included in search_string

Then the function returns the programmes array after checking all the different filters and added those that met the terms of the users chosen filters.
*/


  
  function read_filters () {
    
    const city_selected_dom = document.querySelectorAll("#country_filter li.selected");
  
    const city_id_selected = [];
    function callback_add_cityID (dom_element) {
      const id_as_integer = parseInt(dom_element.dataset.id);
      city_id_selected.push(id_as_integer);
    }
    array_each(city_selected_dom, callback_add_cityID);
  
    const universities = [];
    for (let i = 0; i < city_id_selected.length; i++) {
      const city_id = city_id_selected[i];
      for (let ii = 0; ii < UNIVERSITIES.length; ii++) {
        const university = UNIVERSITIES[ii];
        if (university.cityID === city_id) {
          universities.push(university);
        }
      }
    }
  
    let programmes = [];
    function callback_add_programmes (university) {
      const university_id = university.id;
      for (let i = 0; i < PROGRAMMES.length; i++) {
        const programme = PROGRAMMES[i];
        if (programme.universityID === university_id) {
          programmes.push(programme);
        }
      }
    }
    array_each(universities, callback_add_programmes);
  
  
  
    const level_selected_dom = document.querySelectorAll("#level_filter li.selected");
    const level_id_selected = [];
    function callback_add_levelID (dom_element) {
      const id_as_integer = parseInt(dom_element.dataset.id);
      level_id_selected.push(id_as_integer);
    }
    array_each(level_selected_dom, callback_add_levelID);
  
    function test_function_level (programme) {
      return level_id_selected.includes(programme.levelID);
    }
    programmes = array_filter(programmes, test_function_level);
  
  
  
    const language_selected_dom = document.querySelectorAll("#language_filter li.selected");
    const language_id_selected = [];
    function callback_add_languageID (dom_element) {
      const id_as_integer = parseInt(dom_element.dataset.id);
      language_id_selected.push(id_as_integer);
    }
    array_each(language_selected_dom, callback_add_languageID);
  
  
  
    function test_function_language (programme) {
      return language_id_selected.includes(programme.languageID);
    }
    programmes = array_filter(programmes, test_function_language);
  
  
  
    const subject_selected_dom = document.querySelectorAll("#subject_filter li.selected");
    const subject_id_selected = [];
    function callback_add_subjectID (dom_element) {
      const id_as_integer = parseInt(dom_element.dataset.id);
      subject_id_selected.push(id_as_integer);
    }
    array_each(subject_selected_dom, callback_add_subjectID);
  
  
  
    function test_function_subject (programme) {
      return subject_id_selected.includes(programme.subjectID);
    }
    programmes = array_filter(programmes, test_function_subject);
  
  
  
    const search_string = document.querySelector("#search_field input").value;
    if (search_string !== "") {
      function test_function (programme) {
        return programme.name.includes(search_string);
      }
      programmes = array_filter(programmes, test_function);
    }
  
    return programmes;

  }
  