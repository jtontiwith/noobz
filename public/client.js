let mvpUserStories = [];
let seesDoes = [];
let userProject = {};
let requestUrl = "/projects";

//<button class="login" type="submit">Login</button>
//here we register and sign in a user
function registerAndOrLogin(user) {
  if(user) {
    $(`.js-register-and-login-form`).html(`
    <fieldset class="sign-in">
      <legend>Log in to n00bz</legend>
      <div>
        <label for="email">Email</label>
      </div>
      <div>
        <input name="username" type="email" id="email" value="${user.email}">
      </div>
      <p>
        <label for="password">Password</label>
        <input name="password" type="password" id="password">
      </p>
    </fieldset>
    <div class="row">
      <button class="login" type="submit">Login</button>
    </div>`);
    $(`.register-footer`).hide();
    $(`.login-register`).append(`<footer class="login-footer">You a n00b to n00bz? <a href="#" onclick="registerAndOrLogin();"> Sign up now</a></footer>`);
  } else { 
    $(`.js-register-and-login-form`).html(`
      <fieldset class="sign-up">
        <legend>Sign up for n00bz</legend>
        <p>
          <label for="email">Email</label>
          <input name="email" type="email" id="email" placeholder="email" required>
        </p>
        <p>
          <label for="password">Password</label>
          <input name="password" type="password" id="password" placeholder="password" required>
        </p>
        <p>
          <label for="firstName">First Name</label>
          <input name="firstName" type="text" id="firstName" placeholder="first name" required>
        </p>
        <p>
          <label for="lastName">Last Name</label>
          <input name="lastName" type="text" id="lastName" placeholder="lastname" required>
        </p>    
      </fieldset>
      <div class="row">
        <button class="register" type="submit">Register</button> 
      </div>`);
      $(`.login-footer`).hide();
      $(`.login-register`).append(`<footer class="register-footer">Already signed up <a id="login-link" href="#" onclick="getToLogin();">Log in to n00bz</a></footer>`)
       }
  }

  //pop the login form
  function getToLogin() {
    console.log('the login button is workin');
    $(`.js-register-and-login-form`).html(`
    <fieldset class="sign-in">
      <legend>Log in to n00bz</legend>
        <div>
          <label for="email">Email</label> 
          <input name="username" type="email" id="email" placeholder="email" required>
        </div>
        <div>
          <label for="password">Password</label>
          <input name="password" type="password" id="password" placeholder="password" required>
        </div>
      </div>
    </fieldset>
    <div class="row">
      <button class="login" type="submit">Login</button>
    </div>`);
    $(`.register-footer`).hide();
    $(`.login-register`).append(`<footer class="login-footer">You a n00b to n00bz? <a href="#" onclick="registerAndOrLogin();"> Sign up now</a></footer>`);
  }

//here we register or login a user depending on what they are doing
function postRegistrationOrLogin() {
  $(`.js-register-and-login-form`).on('submit', function(event) {
    event.preventDefault();
    let formArray = $(this).serializeArray();
    
    if(formArray.length === 4) {
      let userRegObject = {};
      
      for(let i = 0; i < formArray.length; i++) {
        userRegObject[formArray[i].name] = formArray[i]['value'];
      }
      console.log(userRegObject);
      
      $.ajax({
        url: "/api/users",
        type: "POST",
        data: JSON.stringify(userRegObject),
        success: function(data) {
          console.log(data)
          registerAndOrLogin(data);
          //getToLogin();
        },
        dataType: "json",
        contentType: "application/json"
      })
      //getToLogin();
    } else {
      console.log('something else')
      let userLoginObject = {};
      for(let i = 0; i < formArray.length; i++) {
        userLoginObject[formArray[i].name] = formArray[i]['value'];
      }
      console.log(userLoginObject);
      
      $.ajax({
        url: "/api/auth/login",
        type: "POST",
        data: JSON.stringify(userLoginObject),
        success: function(data) {
          console.log(data);
          localStorage.setItem('jwt', data.authToken);  
          localStorage.setItem('user_id', data.user_id);
          localStorage.setItem('user_email', data.email);
          //putting the ids of the user's prototype (if any)
          //into a comma separated string b/c localStorage only
          //stores strings
          let protoString = data.prototypes_id.join();  
          localStorage.setItem('prototype_ids', protoString);
          
        },
        dataType: "json",
        contentType: "application/json"
      })
      $(`html`).css("background", "none");
      showAndHideMain();
      $('.login-register, .centered-div').hide();
    }  
  });  
}

//if the user refreshes the SPA and themself back at the first screen
//we allow them to get back to their dashboard by clicking on the h1
function getToDashboard() {
  $('h1').on('click', function(event) {
    if(localStorage.user_id) {
      $(`html`).css("background", "none");
      showAndHideMain();
      $('.login-register, .centered-div').hide();
      $('.logo').remove();
    }
  });
}

//we also swap the text to the h1 to let them know it's a way
//to get back to their dashboard
function showBackToDash() {
  if(localStorage.user_id) {
    $('h1').text('n00bz Dashboard');
  }
}

//make the call to get a user's prototype projects
function getUserProjects() {
  $.ajax({
    url: `/projects/${localStorage.user_id}`,
    type: GET,
    success: function(data) { 
      console.log(data); // Set data that comes back from the server to 'text'
      $('.js-project-feed').hide();
      $('.js-personal-feed').append();
    },
    dataType: "json",
    contentType: "application/json"
  })
}

/* HERE STARTS THE MAIN FORM/FEATURE OF THE APP */
//here we pop an input field that ask the user to enter a name and 
//descriptive tagline for their app

function getProjectFromFounder() {
  $('.js-project-form').html(`
    <fieldset class="tagline-entry">
      <span>
        <label for="app-name">Your app's name</label>
        <input type="text" class="name-input" name="name" id="name-value" for="app-name" placeholder="ABC app">
      </span>
      <span>
        <label for="tagline-value">and tagline</label>
        <input type="text" class="tagline-input" name="tagline" id="tagline-value" placeholder="A minimalist tool for XYZ">
      </span>
      <button type="button" class="form-expand">Go!</button>
    </fieldset>
  `);
}
 
//after the user fills out their tagline they pop a longer 
//form to provide the info necessary to create an MVP
function expandFullProjectForm() {
  $('.js-project-form').on('click', '.form-expand', event =>  {
    console.log('ok, button click worked');
    let taglineInput = $('#tagline-value').val(); 
    let nameInput = $('#name-value').val();
    if(taglineInput == "" || nameInput == "") {
      alert('You have to submit both a name and tagline.');
    } else {
      let nameAndTagline = `${nameInput} - ${taglineInput}`; 
      userProject['shortDesc'] = nameAndTagline; 
      console.log(userProject);
      $('.tagline-entry').remove()
      $('.js-project-form').append(`
      <h3 class="js-name-and-tagline">${nameAndTagline}</h3>
      <fieldset class="long-desc">  
        <p class="textarea-parent">
          <label for="long-desc"></label>
          <textarea id="long-desc" rows="5" placeholder=" A longer 300-400 character description of your app" name="long-desc"></textarea>
        </p>
        </fieldset>
        <hr>
      <fieldset class="userstories">  
          <p>
            <label for="usPart1">I want</label>
            <input type="text" class="userstory-input" name="usPart1" id="usPart1">
            <label for="usPart2">so that</label>
            <input type="text" class="userstory-input" name="usPart2" id="usPart2">
            <button type="button" class="more-userstories">add</button>
          </p>
        <hr>  
        </fieldset>
        <fieldset>
          <legend>Userstories - <span>pick three or four</span></legend>
          <p>Userstories will go here. Write a bunch, pick just a few.</p>
          <ul class="userstory-list">
          </ul>
          <hr>
        </fieldset> 
        <fieldset class="sees-does">
          <div class="sees-does-outer-wrapper">
            <div class="sees-does-inner-wrapper">
              <div class="user-sees-div"><textarea id="user-sees" placeholder=" What the user sees..."></textarea></div>
              <div class="user-does-div"><textarea id="user-does" placeholder=" What the user does..."></textarea></div>
              <button type="button" class="more-screens">next screen</button>
            </div>
            <div style="display:inline-block;" class="user-see-do-results">
              <div id="inner-scroller"></div>
            </div>
          </div>
        </fieldset>
        <hr>
        <p><button class="save-proto" type="submit">save</button><button type="button" class="cancel">cancel</button></p>`);
      console.log('does this run?')
      //addUserStoryFields();
      //addSeeDoScreen();
      limitMvpUserstories();
      cancelAndClearForm();
      showTips();
    }
  });
}

//here's the UX flow when a use cancels the prototype design form
function cancelAndClearForm() {
  $('.js-project-form').on('click', '.cancel', function(event) {
    console.log('cancel button is registering');
    getProjectFromFounder();

  });
}

//here we append more fields for userstories if the user 
//wants to append more
let i = 0;

function addUserStoryFields() {
  $(".js-project-form, .edit-form").on('click', '.more-userstories', event => {
    i++;
    console.log('yup, the add button is working');
    let userStoryPart1 = $('#usPart1').val();
    let userStoryPart2 = $('#usPart2').val();
    //form validation
    if(userStoryPart1 && userStoryPart2 !== "") {
      let fullUserStory = `<li>
      <input type="checkbox" class="selectedUserstory" id="selectedUserstory${i}" name="selectedUserstory" value="I want ${userStoryPart1} so that ${userStoryPart2}">
      <label id="added-us" for="selectedUserstory${i}">I want ${userStoryPart1} so that ${userStoryPart2}</li></label>
     </li>` 
      $('.userstory-list').append(fullUserStory);
    } else {
      alert('One or both of your userstory fields are empty');
    }
    
    $('#usPart1').val('');
    $('#usPart2').val('');
  });
}

//limiting the number of userstories a user can actually select
function limitMvpUserstories() {
  $(`.userstory-list`).on('change', 'input', function(event) {
    console.log(this);
    //let checkedUserstories = $(`input[name="selectedUserstory"]:checked`).val();
    let checkedUserstories = $(this).parent().parent().find('input:checked') //.val();
    console.log(checkedUserstories);
    if(checkedUserstories.length <= 3) {
      mvpUserStories = [];
      checkedUserstories.each(function(item) {
        mvpUserStories.push($(this).val()); 
      })
    } else {
      alert('you can only have 3 mvp userstories');
      $(this).prop('checked', false);
    }
    
    console.log(checkedUserstories);
    console.log(mvpUserStories);
    userProject['userStories'] = mvpUserStories;
    console.log(userProject);
  });
}

//allow user to add another set of user sees / user does screens
function addSeeDoScreen() {
  $(".js-project-form, .edit-form").on('click', '.more-screens', event => {

    let userSees = $('#user-sees').val();
    let userDoes = $('#user-does').val();
    
    if(userSees && userDoes !== "") {
      console.log(`userSees is ${userSees} and userDoes is ${userDoes}`);
      $('#user-sees').val('');
      $('#user-does').val('');
      $('#inner-scroller').append(`
      <div style="display:inline-block;" class="sees-does-block">
        <div class="sees-result"><textarea class="user-sees-edit">${userSees}</textarea></div>
        <div class="does-result"><textarea class="user-does-edit">${userDoes}</textarea></div>
      </div>
      `);
    } else {
      alert('You have to define what the user sees and does at each screen');
    }  
  });  

}

//submit the prototype design to save in the db!
$('.js-project-form').submit(event => {
  event.preventDefault();
  let longProjDesc = $('#long-desc').val();
  userProject['longDesc'] = longProjDesc;
  userProject['user_id'] = localStorage.user_id;  
  userProject['email'] = localStorage.user_email;
  console.log(userProject);
  //grab all the user sees / user does screens and put them in a 
  //multi-demensional array
  let screens1DArray = [];
  $('.user-sees-edit, .user-does-edit').each(function() {
    screens1DArray.push($(this).val());
  });
  
  let screens2DArray = [];
  while(screens1DArray.length) {
    screens2DArray.push(screens1DArray.splice(0,2));
  }

  userProject['screens'] = screens2DArray;
  console.log(userProject);

    $.ajax({
      url: requestUrl,
      type: "POST",
      //data: JSON.stringify(userProject),
      data: JSON.stringify(userProject),
      headers: { "Authorization": 'Bearer ' + localStorage.jwt },
      success: function(data) { 
        //addNewClientProtoToFeed(data.id);
        addNewClientProtoToFeed();
        console.log('here is the response');
        console.log(data); // Set data that comes back from the server to 'text'
        $('.js-project-form').each(function(){
          this.reset();
        });
      },
      dataType: "json",
      contentType: "application/json"
    });
    console.log('right after the ajax call that does not work');
    getProjectFromFounder();
});

//get the list of the user's prototype designs so they can see
//what they just saved
function addNewClientProtoToFeed() {
  const urlWithID = `${requestUrl}/${localStorage.user_id}`;
  $.ajax({
    url: urlWithID,
    type: "GET",
    success: function(data) { 
      console.log('here is the response from getById!');
      console.log(data); 
      displayProjects(data);
    },
    dataType: "json",
    contentType: "application/json"
  });  
  $('.general').hide();
  $('.personal').show();
}

//get all the prototype design projects
function getRecentProjects(callBackFn) {
  $.ajax({
    url: requestUrl,
    type: "GET",
    success: function(data) { 
      console.log(data); // Set data that comes back from the server to 'text'
      callBackFn(data);
    },
    dataType: "json",
    contentType: "application/json"

  })
  $('.general').show();
  $('.personal').hide();
}

//making all the prototype design projects pretty for display
function displayProjects(data) {
  let projectsArray = [];

  for (index in data.clientProtos) {
    //the userstories and ux screens are stored in arrays of strings so we grab them out here
    let projectUserstories = data.clientProtos[index].userStories.map(userstory => `<dd>${userstory}</dd>`).join(' ');
    let projectScreens = data.clientProtos[index].screens.map(screen => {
     return `<div style="display:inline-block;" class="sees-does-block">
         <div class="sees-result">${screen[0]}</div>
         <div class="does-result">${screen[1]}</div>
      </div>`}).join(' ');
    //if the project is of the current user then show it with editing controls
    if(localStorage.user_id === data.clientProtos[index].user_id) {
    projectsArray.push(
      `<article class="prototype" role="prototype item">
          <dl class="js-client-project" id="${data.clientProtos[index].id}">
          <dt class="project-name-tagline">${data.clientProtos[index].shortDesc}</dt>
          <dt class="project-long-desc">${data.clientProtos[index].longDesc}</dt>
          <div class="detail-toggle">    
            <dt>User stories</dt>    
            ${projectUserstories}
            <dt class="dt-tag-user-screens">User screens</dt>
            ${projectScreens}
            <address class="founder-email"><span class="bold-wrapper">Founder contact:</span> ${data.clientProtos[index].email}</address>
          </div>
        </dl>
        <form class="js-publish publish-form" role="form">
          <fieldset id="${data.clientProtos[index].id}">
            <legend>Status</legend>
            <input class="js-make-public" type="radio" name="toggle-pub-priv" value="true"> public
            <label for="public">Public</label>
            <input class="js-make-public" type="radio" name="toggle-pub-priv" value="false"> private
            <label for="private">Private</label>
          </fieldset> 
        </form>
        <a class="edit-proto" data-id="${data.clientProtos[index].id}" href="#">edit</a> |
        <a class="delete-proto" data-id="${data.clientProtos[index].id}" href="#">delete</a>
      </article>`)         
    } else {
    projectsArray.push(
      `<article class="prototype" role="prototype item">
        <dl class="js-client-project" id="${data.clientProtos[index].id}">
        <dt class="project-name-tagline">${data.clientProtos[index].shortDesc}</dt>
        <dt class="project-long-desc">${data.clientProtos[index].longDesc}</dt>
        <div class="detail-toggle">
          <dt>User stories</dt>    
          ${projectUserstories}
          <dt class="dt-tag-user-screens">User screens</dt>
          ${projectScreens}
          <dd>${data.clientProtos[index].email}</dd>
        </div>
        </dl>
      </article>`)
    }
  }
  $('.js-project-feed').html(projectsArray);
  fullProjectDisplay();
  publishPrototypeToFeed();
  editPrototype(data);
  deletePrototype();
}

//edit a prototype
function editPrototype(savedProtos) {
  $('.edit-proto').on('click', function(event) {
    event.preventDefault();
    //looping through the prototypes and finding the one that the user 
    //wants to edit, i.e. the on with the id that matches the id they clicked
    for(let k = 0; k < savedProtos.clientProtos.length; k++) {
      
      if(savedProtos.clientProtos[k].id == this.dataset.id) {
        console.log(savedProtos.clientProtos[k]);
        let protoToEdit = savedProtos.clientProtos[k];

        userStoriesToEdit = protoToEdit.userStories.map(userStory => {
          return `<li>
          <input type="checkbox" class="selectedUserstory" id="selectedUserstory" name="selectedUserstory" checked>
          <label for="selectedUserstory"><input type="text" class="userstory-input" name="usComplete" id="usComplete" value="${userStory}"></label></li>`
        }).join(' ');

        userScreensToEdit = protoToEdit.screens.map(screen => {
          return `<div class="sees-does-inner-wrapper" style="display:inline-block;">
            <div class="user-sees-div"><textarea class="user-sees-edit">${screen[0]}</textarea></div>
            <div class="user-does-div"><textarea class="user-does-edit">${screen[1]}</textarea></div>
          </div>`    
        }).join(' ');        
        console.log(userScreensToEdit);
        
        $(`#${this.dataset.id}`).html(`
          <form class="edit-form" role="form">
            <fieldset class="tagline-entry">
              <label for="app-name">Your app's name</label>
              <input type="text" class="name-input" name="name" id="name-value" for="app-name" value="${protoToEdit.shortDesc}">
            </fieldset>
            <fieldset class="long-desc">  
              <p>
                <label for="long-desc">Longer description</label>
                <textarea rows="5" name="long-desc" id="long-desc">${protoToEdit.longDesc}</textarea>
              </p>
            </fieldset>
            <hr>
            <fieldset class="userstories">  
              <p>
                <label for="usPart1">I want</label>
                <input type="text" class="userstory-input" name="usPart1" id="usPart1">
                <label for="usPart2">so that</label>
                <input type="text" class="userstory-input" name="usPart2" id="usPart2">
                <button type="button" class="more-userstories">add</button>
              </p>
              <hr>  
            </fieldset>
            <fieldset>
              <legend>Userstories - <span>pick three or four</span></legend>
              <ul class="userstory-list">
                ${userStoriesToEdit}
              </ul>
              <hr>
            </fieldset> 
            <fieldset class="sees-does">
              <div class="sees-does-outer-wrapper">
                <div class="sees-does-inner-wrapper" style="display:inline-block;">
                  <div class="user-sees-div"><textarea id="user-sees" placeholder=" What the user sees..."></textarea></div>
                  <div class="user-does-div"><textarea id="user-does" placeholder=" What the user does..."></textarea></div>
                  <button type="button" class="more-screens">next screen</button>
                </div>
                <div class="user-see-do-results">
                  <div id="inner-scroller">
                    ${userScreensToEdit}
                  </div>
                </div>
              </div>
            </fieldset>
              <hr>
              <p><button class="update-proto" type="submit">update</button><button type="button" class="cancel">cancel</button></p>         
          </form>
        `);
        addUserStoryFields(); //need to bound the listener here 
        addSeeDoScreen(); //need to bound the listener here 
        updatePrototype();
        cancelProtoEdit();
      } 
    }
    
    console.log('we are now editing baby');
  })
}

//cancel the edit
function cancelProtoEdit() {
  $('.edit-form').on('click', '.cancel', function(event) {
    console.log($('.feed-subhead').text());
    addNewClientProtoToFeed();
  });
}

//submit the edit to update
function updatePrototype() {
  $('.edit-form').on('submit', function(event) {
    event.preventDefault();
    let updatedShortDesc = $(this).find('.name-input').val()
    let updatedLongDesc = $(this).find('#long-desc').val() 
    let protoToEditId = $(this).parent().attr('id');
    console.log(protoToEditId);
    let updatedUserStories = [];
    //grabbing any userstories added by the use during the editing process
    $('input[type="checkbox"]').each(function() {
      if(this.value != 'on' && this.checked) { //not sure why it's picking up these values
        updatedUserStories.push(this.value);
      }
    });
    //grabbing userstories that may have been edited since they are populated
    //in editable input fields, this also makes sure the checkbox associated with
    //said text input is checked as well and if so add it to the userstories array
    $('input[name="usComplete"]').each(function() {
      if($(this).parent().siblings('input[type="checkbox"]').prop('checked')) { 
        updatedUserStories.push(this.value);
      }
    });
    
    let updatedScreens1DArray = [];
    $('.user-sees-edit, .user-does-edit').each(function() {
      updatedScreens1DArray.push($(this).val());
    });
    
    let updatedScreens2DArray = [];
    while(updatedScreens1DArray.length) {
      updatedScreens2DArray.push(updatedScreens1DArray.splice(0,2));
    }

    const updateObject = {
        id: protoToEditId,
        shortDesc: updatedShortDesc,
        longDesc: updatedLongDesc,
        userStories: updatedUserStories,
        screens: updatedScreens2DArray
    }

    console.log(updateObject);

    $.ajax({
      url: `${requestUrl}/${protoToEditId}`, 
      type: "PUT",
      data: JSON.stringify(updateObject),
      headers: { "Authorization": 'Bearer ' + localStorage.jwt },
      success: function(data) { 
        console.log(data); // Set data that comes back from the server to 'text'
        addNewClientProtoToFeed();
      },
      dataType: "json",
      contentType: "application/json"
    });
  });

}

//delete a doc from the db
function deletePrototype() {
  $('.delete-proto').on('click', function(event) {
    event.preventDefault();
    let protoToDeleteId = $(this).attr('data-id');
    console.log(protoToDeleteId);
    
    let answer = confirm("Delete this prototype design forever?");

    if(answer) {
      $.ajax({
        url: `${requestUrl}/${protoToDeleteId}`, 
        type: "DELETE",
        //data: JSON.stringify(updateObject),
        headers: { "Authorization": 'Bearer ' + localStorage.jwt },
        success: function(data) { 
          console.log(data); // Set data that comes back from the server to 'text'
          addNewClientProtoToFeed();  
        },
        dataType: "json",
        contentType: "application/json"
      });
    }

  });
}

//make a prototype public to everyone!
function publishPrototypeToFeed() {
  
  $('.js-make-public').on('change', function(event) {

    let prototypeId = $(this).parent().attr('id'); //.id;
    let status = $(this).val();
    console.log(prototypeId);
    console.log(status);

    $.ajax({
      url: `${requestUrl}/${prototypeId}`, 
      type: "PUT",
      data: JSON.stringify({
        id: prototypeId,
        published: status}),
      headers: { "Authorization": 'Bearer ' + localStorage.jwt },
      success: function(data) { 
        console.log(data); // Set data that comes back from the server to 'text'
      },
      dataType: "json",
      contentType: "application/json"
    })
  });
}

//show and hide the full prototype design 
function fullProjectDisplay() {
  $('.prototype').on('click', 'dl', function(event) {
    console.log('yep, it is working');
    $(this).parent().find('.detail-toggle').toggle();
  });
}

//here we are calling getRecentProjects and passing it a callback
//function (in this case displayProjects) as an argument 
function getAndDisplayProjects() {
    console.log('something is happening');
    getRecentProjects(displayProjects);
}

//showin and hidin main
function showAndHideMain() {
  $('main').toggle();
}

//modal functionality 
function  modalToggle() {
  $('.modal-toggle').on('click', function(e) {
    e.preventDefault();
    console.log($(this).text());
    switch ($(this).text()) {
      case 'faq':
        $('.modal-heading').text('FAQ');
        $('.modal-content').html(`
        <h3 class="modal-subhead">Founder FAQ</h3>
        <ul class="modal-ul">
          <li><span>Do I really need a rough protoype?</span> Most ideas for digital products fail, it's best to test your idea with an inexpensive prototype before spending a bunch of money building something closer to a final product.</li>
          <li><span>Why do I have to fill out this silly form while referencing a few articles? Can't I just tell the n00b dev my idea?</span> No, you have to break down what's a mildly complex problem and map it thoughtfully. The better you are at that the smoother it goes.</li>
          <li><span>What if my idea gets stolen?</span> Growing a successful digital product is all about business execution, and you can't steal that.</li>
          <li><span>But I have the best idea ever. I just know it's gonna get stolen and the rapscallion who steals it will make millions. </span>Read <a href="https://doc4design.com/news/best-non-disclosure-agreement" target="_blank">this</a> to calm your nerves and if that doesn't work go elsewhere because n00bz is about <a href="http://ryanhoover.me/post/83426962555/why-you-should-build-your-product-in-public" target="blank">building in public</a>.</li>
          <li><span>Why don't I just hire a real professional developer and get it done?</span> Because that'd be like hiring an F1 mechanic to help you change a tire.</li>
          <li><span>What if I get sold a piece of junk?</span> We ensure n00b developers build your prototype to our minimum specs, and we are launching a revision service soon that will guarantee it.</li>
        </ul>
        <h3 class="modal-subhead">Developer FAQ</h3>
        <ul class="modal-ul">
          <li><span>Why do this?</span> If you have done a bunch of tutorials, taken some online course, etc. and you want to start solving some real problems with code then this is for you.</li>
          <li><span>Shouldn't I get paid more than $50-$150?</span> Yes! If your skillset is farther along that a n00b developer (someone that can hack something together, but is not job ready) then you should definitley be getting paid more, this it not for you.</li>
        </ul>
        `);
        break;
      case 'about':
        $('.modal-heading').text('ABOUT');
        $('.modal-content').html(`<p>
        n00bz serves two populations of people: non-technical founders and web developers
        that know enough to hack something together, but are not quite formal job ready. Non-technical
        founders get cheap prototypes (between $50 - $150 depending on scope) built and n00b developers 
        get experience working for a client on a real product instead of just doing another tutorial,
        a stipend, and (if deserving) a letter of recommendation.    
        </p>`);
        break;
      case 'near':
        $('.modal-heading').text('NEAR FUTURE');
        $('.modal-content').html(`<p>
        Right now we are just figuring out if this concept it worth a damn. If we make the
        judgement that it is, then we can imagine having more resources for founders and developers
        to move along their respective paths at a nice n00b rythm.     
        </p>`);
    }
    $('.modal').toggleClass('is-visible');
  });
}

//tips for the user functionality 
function showTips() {
  $('#name-value, #tagline-value').on('focus', function(event) {
    $('.tips').html('<p>Get some inspiration for a name and tagline, check out <a href="https://www.producthunt.com/" target="_blank">Product Hunt</a> or <a href="https://betalist.com/" target="_blank">BetaList</a></p>');
  });

  $('textarea#long-desc').on('focus', function(event) {
    $('.tips').html('</p>The CEO of Stack Overflow has timeless (and concise) advice for creating a great <a href="https://www.joelonsoftware.com/2002/05/09/product-vision/" target="_blank">product vision</a></p>');
  })

  $('#usPart1, #usPart2').on('focus', function(event) {
    $('.tips').html('<p>Writing good userstories is imperative for a product owner. Learn how or brush up with this <a href="https://www.mountaingoatsoftware.com/agile/user-stories" target="_blank">quick blog</a></p>');
  });

  $('textarea#user-sees, textarea#user-does').on('focus', function(event) {
    $('.tips').html('</p>Getting your UX/UI flows right is critical. Let Basecamp\'s head of Product Strategy give you a quick <a href="https://signalvnoise.com/posts/1926-a-shorthand-for-designing-ui-flows" target="_blank">refresher</a></p>');
  })

}

//logout
function logOut() {
  localStorage.clear();
  location.reload();
  console.log('you logged out');
}


$(() => {
  showAndHideMain();
  getToDashboard();
  postRegistrationOrLogin();
  getToLogin();
  getProjectFromFounder();
  addUserStoryFields();
  addSeeDoScreen(); 
  expandFullProjectForm();
  getAndDisplayProjects();
  modalToggle();
  showTips();  
  showBackToDash();
}); 




/*
Nice to haves:
-longish about with screenshots on a link from the homepage showing exping what it is
-you can't delete and or edit user stories you don't want
-password reset
-make it load with some fake data
-assign radio button based on db 
-our guarantee 
-transparent footer on homepage with info
-make sure project opens/closes when clicking anywhere
*/