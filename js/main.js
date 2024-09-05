 // main Variables
 let input = document.querySelector(".get-repos input")
 let getButton = document.querySelector(".get-button");
 let reposData = document.querySelector(".show-data");

 getButton.onclick = function () {
    getrepos();
 }

 // Get Repos function
 function getrepos() {

   if(input.value === "") {  // if value is empty
       reposData.innerHTML = "<span>Please Write Github username.</span>";
   }else {
    fetch(`https://api.github.com/users/${input.value}/repos`)
        .then((response) => {
             return (response.json());
         })
       .then((data) => {

        // Empty the container
        reposData.innerHTML =""; 

        //Loop On data
        data.forEach(repo => {

            // create the Main Div element
            let maindiv = document.createElement("div")

            // create repo name text
            let repoName = document.createTextNode(repo.name);
            
            // Append The Text To Main Div
            maindiv.appendChild(repoName)

            // Create Repo URL Anchor
            let theUrl = document.createElement("a") ;

            // Create Repon Url Text
            let theUrlText = document.createTextNode("visit");

            // append the repo Url text To Anchor Tag
            theUrl.appendChild(theUrlText)
            
            // Add The Hypertext Reference "href"
            theUrl.href = `https://github.com/${input.value}/${repo.name}`

            // Set attribute Blank
            theUrl.setAttribute("target","_blank");

            // append URL Anchor to Main Div
            reposData.appendChild(theUrl)

            // Create Stars Count Span
            let starsSpan = document.createElement("span");

            // Create Stars Count Span
            let starsText = document.createTextNode(` stars ${repo.stargazers_count}`);

            // add Stars Count Text To stars span
            starsSpan.appendChild(starsText);
 
            // Append Stars count span to main Div
            maindiv.appendChild(starsSpan)

            // Add class on main div
            maindiv.className = "repo-box"

            // Append The Main Div To Container
            reposData.appendChild(maindiv);
           
        });

       })
   }

}