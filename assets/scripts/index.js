let xhr = new XMLHttpRequest();
let xhrRep = new XMLHttpRequest();

console.log(`${window.location.pathname.substring(1)}`);

xhr.onload = loadUserData;
xhr.open('GET', `https://api.github.com/users/${window.location.pathname.substring(1)}`);
xhr.setRequestHeader('Authorization', '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');
xhr.send();

xhrRep.onload = loadUserRepos;
xhrRep.open('GET', `https://api.github.com/users/${window.location.pathname.substring(1)}/repos`);
xhrRep.setRequestHeader('Authorization', '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');
xhrRep.send();

// ------------------------------------------------------------------------------------------------------------------ //

function loadUserData () {

    let elem_change;
    let data = JSON.parse(this.responseText);
    let plural = 's';

    // -------- //

    elem_change = document.getElementById('profile_img');
    elem_change.src = data.avatar_url;

    // -------- //

    elem_change = document.getElementById('profile_name');
    elem_change.innerHTML = data.name;

    // -------- //

    elem_change = document.getElementById('profile_user');
    elem_change.innerHTML = `<i class="fas fa-user"></i><a href="https://github.com/${data.login}" target="_blank">${data.login}</a>`;

    // -------- //

    elem_change = document.getElementById('profile_follow');
    plural = data.followers == 1 ? '' : 's';
    elem_change.innerHTML = `<a href="https://github.com/${data.login}?tab=followers" target="_blank"><b>${data.followers}</b> follower${plural}</a> · <a href="https://github.com/${data.login}?tab=following" target="_blank"><b>${data.following}</b> following</a>`;

    // -------- //

    elem_change = document.getElementById('profile_bio');
    elem_change.innerHTML = data.bio;

    // -------- //

    elem_change = document.getElementById('profile_org');

    if(data.company[0] == '@') elem_change.innerHTML = `<i class="far fa-building"></i><a href="https://github.com/${data.company.substring(1)}" target="_blank"><b>${data.company}</b></a>`;
    else elem_change.innerHTML = `<i class="far fa-building"></i>${data.company}`;

    // -------- //

    elem_change = document.getElementById('profile_location');
    elem_change.innerHTML = `<i class="fas fa-map-marker-alt"></i><a href="https://www.google.com/maps/place/${data.location}" target="_bl">${data.location}</a>`;
}

// ------------------------------------------------------------------------------------------------------------------ //

function loadUserRepos () {

    let text = '';
    let elem_change;
    let data = JSON.parse(this.responseText);
    let plural = 's';

    console.log(data);

    elem_change = document.getElementById('rep_rows');

    for(x = 0; x < data.length; x++)
    {
        let rep = data[x];
        let desc;
        let dateCreated = new Date(rep.created_at);
        let dateUpdated = new Date(rep.updated_at);

        if(rep.description == null) desc = "No description provided.";
        else desc = rep.description;

        text += `
        <span class="rep_card col-12 col-lg-6 d-flex justify-content-center">
            <div class="card bg-light mb-3">
                <div class="card-header rep_title">
                    <i class="rep_iconRep far fa-folder"></i><b>${rep.name}</b> 
                    <span class="rep_lang">${rep.language}</span>
                </div>
                <div class="card-body">
                    <p class="card-text">${desc}</p>
                    <p class="card-text rep_createdOn"><small class="text-muted">Created on: ${dateCreated.toLocaleString()}
                    </br>Updated on: ${dateUpdated.toLocaleString()}</small></p>
                    <span class="rep_link"><button class="btn"><a href="https://github.com/${rep.owner.login}/${rep.name}" target="_blank"><i class="fab fa-github"></i>View repository</a></button></span>
                    <span class="rep_link"><button class="btn"><a href="https://${rep.owner.login}.github.io/${rep.name}/" target="_blank"><i class="fas fa-tv"></i>View website</a></button></span>
                </div>
            </div>
        </span>`;
    }

    elem_change.innerHTML = text;
}