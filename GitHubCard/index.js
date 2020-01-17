/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/


/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/




/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/


const followersArray = [  
  'tetondan',
  'dustinmyers',
  'justsml',
  'luishrd',
  'bigknell',

];



function profileComp(gitHubProf){
  const parentCompCard = document.createElement('div');
  compImg = document.createElement('img');
  compCardInfo = document.createElement('div');
  compName = document.createElement('h3');
  compUserName = document.createElement('p');
  compLocat = document.createElement('p');
  compProfile = document.createElement('p');
  compProfUrl = document.createElement('a');
  compFollowers = document.createElement('p');
  compFollowing = document.createElement('p');
  compBio = document.createElement('p');

//classes
  parentCompCard.classList.add('card');
  compCardInfo.classList.add('card-info');
  compName.classList.add('name');
  compUserName.classList.add('username');

//appends
  parentCompCard.append(compImg);
  parentCompCard.append(compCardInfo);

  compCardInfo.append(compName);
  compCardInfo.append(compUserName);
  compCardInfo.append(compLocat);
  compCardInfo.append(compProfile);

  compProfile.append(compProfUrl);   //url appends to profile <p>
  
  compCardInfo.append(compFollowers);
  compCardInfo.append(compFollowing);
  compCardInfo.append(compBio);

  compImg.src = gitHubProf.avatar_url;
  compName.textContent = gitHubProf.name;
  compUserName.textContent = gitHubProf.login;
  compLocat.textContent = gitHubProf.location;      //targeting empty fields on created html and setting it up to recieve data in proper place
  compProfUrl.href = gitHubProf.html_url;
  compFollowers.textContent = `Followers: ${gitHubProf.followers}`;
  compFollowing.textContent = `Following: ${gitHubProf.following}`;
  compBio.textContent = `About me: ${gitHubProf.bio}`; // figure out how to display none 'if' null

 
  
return parentCompCard;   //return parent element created inside function
}

htmlCardsParent = document.querySelector('.cards')   // select and assign parent from the html doc that will adopt my component with data passed through

axios.get('https://api.github.com/users/HUGHIII') //calls api
.then(response => {                               //then we have info from api in function ready to be used
  //console.log(response.data);
  const componentData = profileComp(response.data)  // take my function with said data from api passed through as arguments and assign or condense it into variable componentData
  htmlCardsParent.append(componentData);            //and append it to the parent in the html.

})
.catch(error => {
  console.log('data not returned', error)
})

followersArray.map(currentValue => {                                                  //map through each user in followersArray and pass it to the template literal which completes the path
  axios.get(`https://api.github.com/users/${currentValue}`).then(apiResponse => {     //then take that data and pass it as arguments through profileComp function and condense it into followerData Variable
     const followerData = profileComp(apiResponse.data);                              // append that function to the appropriate html parent which we defined as htmlCardsParent
     htmlCardsParent.append(followerData);
  })
})

