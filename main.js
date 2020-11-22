$(document).ready(function(){
  

    $("#search-form").submit(function (event){
        event.preventDefault()
        var search = $("#search-text").val()
        var video = ''

        videoSearch(search)
    })
    function videoSearch(search){

        $.ajax({
            url:  "https://itunes.apple.com/search?term="+search,
            dataType: "jsonp",
            success: function( response ) {
                console.log( response );
                //clear results
            results.innerHTML = '';
            // loop through every music in the element by checking the song
            if(results.count ===0){
                showAlert('Nothing Found!','danger');
                return;
        
            }    
            const outputs = document.querySelector("#results");

            outputs.innerHTML = '';
            response.results.forEach(results => {    
                    //clear results
                    // loop through every music in the element by checking the song
                
                        const div = document.createElement("div");
                        div.classList.add("card");
                        div.innerHTML = 
                        `<img class="card-img-top" src=${results.artworkUrl100} alt="Album Artwork">
                        <div class="card-body">
                          <h5 class="card-title">${results.trackName}</h5>
                          <p class="card-text">${results.artistName}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item">${results.collectionName}</li>
                          <li class="list-group-item">${results.primaryGenreName} . ${results.releaseDate.split('-',1)}</li>
                
                          <li class="list-group-item">sample: <br>
                                <audio src =${results.previewUrl} controls='controls'>
                                </audio></li>
                        </ul>
                        <div class="card-body">
                          <a href=${results.trackViewUrl} class="card-link">Show in itunes</a>
                
                        </div>`;
                        outputs.appendChild(div);
                });
            }
        });
    }
})

