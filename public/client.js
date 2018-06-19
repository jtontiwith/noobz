/* Clean up and finish list

Priorities:
  DONE-fix reg so works the same as signup
  DONE-organize side bar
  DONE-fix left column 
  DONE-organize links
  DONE-organize faq/modal pop
  DONE-fix "undefined" email or tie it to publish T/F status
  DONE-have relevant links/text pop on form field nav
  DONE-change trending proto designs on feed change
  DONE-fix the h1 it's harmless
  DONE-summaries of what to do based on where you are clicking
  DONE-maybe show one's own feed
  DONE-fill out faq
  DONE-fill out about
  DONEish-cancel an edit
  DONE-make feed look a little nicer
  DONE-delete a prototype
  -fix tests and make it deply to heroku
  -have the n00bz dashboard logo close/cancel the expanded form, with aleart?
  -hide edit link
  -add additional tests
  -make it responsive
 
  -developer FAQ
  -correct spelling errors


   -user sees / does on displayed prototype
  -delete a prototype
  -little bit of refactoring
  -fix left hand colum resize upoon feed item expand
  DONE-fix the else if thing

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


  function getToLogin() {
   // $(`.js-register-and-login-form`).on('click', '.go-to-login', function(event) {
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
   // });
  }

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


function getToDashboard() {
  $('h1').on('click', function(event) {
    $(`html`).css("background", "none");
    showAndHideMain();
    $('.login-register, .centered-div').hide();
    $('.logo').remove();
  });
  
}


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

//



//here we pop an input field that ask the user to enter a descriptive
//tagline for their app that's suppose to interest someone in knowing
//more about it

function getProjectFromFounder() {
  $('.js-project-form').html(`
    <fieldset class="tagline-entry">
      <label for="app-name">Your app's name</label>
      <input type="text" class="name-input" name="name" id="name-value" for="app-name" placeholder="ABC app">
      <label for="tagline-value">and tagline</label>
      <input type="text" class="name-input" name="tagline" id="tagline-value" placeholder="A minimalist tool for XYZ">
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
            <div class="sees-does-inner-wrapper" style="display:inline-block;">
              <div class="user-sees-div"><textarea id="user-sees" placeholder=" What the user sees..."></textarea></div>
              <div class="user-does-div"><textarea id="user-does" placeholder=" What the user does..."></textarea></div>
              <button type="button" class="more-screens">next screen</button>
            </div>
            <div style="display:inline-block;" class="user-see-do-results">
              <div class="inner-scroller"></div>
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

//<div style="border-bottom:1px solid black;"><textarea id="user-sees" placeholder="What the user sees..."></textarea></div>
//<div style="margin-top: 10px;"><textarea id="user-does" placeholder="What the user does..."></textarea></div>




function cancelAndClearForm() {
  $('.js-project-form').on('click', '.cancel', function(event) {
    console.log('cancel button is registering');
    //$(this).parent().parent().parent().find('.js-name-and-tagline').remove(); 
    //$(this).closest('form').find('.js-name-and-tagline').remove();
    //$(this).closest('form').find('.userstory-list').remove();
    //$(this).closest('form').find('.sees-does-block').remove();
    //$(this).closest('form').empty();
    //I am leaving in this commented code above to remind me what not
    //to do, and because I might be able to reuse some of it to make 
    //button that remove individual userstories or screens 
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
    
    
    //let fullUserStory = `<li>I want ${userStoryPart1} so that ${userStoryPart2}</li>`;
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
    //let userStoryPart1 = $(event.currentTarget).find('#usPart1').val();
  });
}

//touch on this with Luis
//is it that you run this on each one of them uniquely by feeding it in an parameter  
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
      //alert('you can only have 3 mvp userstories');
      //checkedUserstories.each(function(item) {
        //$(this).prop('checked', false);
             
      //})
      
    }

    /*
    mvpUserStories = [];
    checkedUserstories.each(function(item) {
      console.log(checkedUserstories.length);
      mvpUserStories.push($(this).val());
      

    })
*/

    console.log(checkedUserstories);
    
    //mvpUserStories.push(checkedUserstories);
    console.log(mvpUserStories);
    userProject['userStories'] = mvpUserStories;
    console.log(userProject);

    //const maxAllowed = 3;
    //let count = $(`input[name="selectedUserstory"]:checked`).length;
    //if(count > maxAllowed) {
      
      //alert('You can only choose 3');
    //}
  })
}

//I can continue to render the sees/does blocks in the template
//but I have to collect them and add them to the prototype object
//at the end in case they are edited 

function addSeeDoScreen() {
  $(".js-project-form, .edit-form").on('click', '.more-screens', event => {
   //FIX THIS, we have to wait on this and get them 
   //more in the way that the edit form does
   let userSees = $('#user-sees').val();
   let userDoes = $('#user-does').val();
    
    if(userSees && userDoes !== "") {
      //const seesDoesSubArrays = [userSees, userDoes];
      //seesDoes.push(seesDoesSubArrays);
      //userProject['screens'] = seesDoes;
      console.log(`userSees is ${userSees} and userDoes is ${userDoes}`);
      $('#user-sees').val('');
      $('#user-does').val('');
      $('.inner-scroller').append(`
      <div style="display:inline-block;" class="sees-does-block">
        <div class="sees-result"><textarea class="user-sees-edit">${userSees}</textarea></div>
        <div class="does-result"><textarea class="user-does-edit">${userDoes}</textarea></div>
      </div>
      `);
      /* here's the older static code
      $('.inner-scroller').append(`
      <div style="display:inline-block;" class="sees-does-block">
        <div class="sees-result">${userSees}</div>
        <div class="does-result">${userDoes}</div>
      </div>
      `);*/
    } else {
      alert('You have to define what the user sees and does at each screen');
    }  
  });  

}


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
    //so perhaps here there is a get request to get the
    //id of the user

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
      //success: postCallback(data),
      dataType: "json",
      contentType: "application/json"
    });
    console.log('right after the ajax call that does not work');
    getProjectFromFounder();
});

function addNewClientProtoToFeed() {
  const urlWithID = `${requestUrl}/${localStorage.user_id}`;

  $.ajax({
    url: urlWithID,
    type: "GET",
    success: function(data) { 
      console.log('here is the response from getById!');
      console.log(data); // Set data that comes back from the server to 'text'
      //How can I make this use existing infrastructure?
      displayProjects(data);
      //$('.js-project-feed').hide();
      //$('.js-personal-feed').html(
      //  '<p>' + data.shortDesc + '</p>');
    },
    dataType: "json",
    contentType: "application/json"
  });  
  $('.general').hide();
  $('.personal').show();
}


//here the callback is received and put within a setTimeout
//that waits one-tenth of a second and then fires displayProjects
//with the data

function getRecentProjects(callBackFn) {
    //setTimeout(function() {callBackFn(MOCK_PROJECTS)}, 100)
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
/*
function displayProjects(data) {
    for (index in data.clientProtos) {
        $('.js-project-feed').append(
          `<dl class="js-client-project" style="border: 1px solid black; margin-bottom: 10px;">
            <dt>${data.clientProtos[index].shortDesc}</dt>
            <dt>${data.clientProtos[index].longDesc}</dt>
            <div class="detail-toggle">    
              <dd>${data.clientProtos[index].userStories}</dd>
              <dd>${data.clientProtos[index].screens}</dd>
              <dd>${data.clientProtos[index].email}</dd>
            </div>
          </dl>`);
    }
    fullProjectDisplay();
} */

function displayProjects(data) {
  let projectsArray = [];
  //if data.clientProtos[index].published == false && l
  /*
  -I don't want all prototypes to be published to the feed automatically
  -I want all prototypes that have "published: true" to be public to the feed
  -I want logged in user's to be able to see their unpublished prototypes
  -so the states are logged-in user 

      <div style="display:inline-block;" class="sees-does-block">
        <div class="sees-result">sds</div>
        <div class="does-result">sds</div>
      </div>
    <dd>${data.clientProtos[index].screens}</dd>
  
      */
  for (index in data.clientProtos) {
    //the userstories and ux screens are stored in arrays of strings so we grab them out here
    let projectUserstories = data.clientProtos[index].userStories.map(userstory => `<dd>${userstory}</dd>`).join(' ');
    let projectScreens = data.clientProtos[index].screens.map(screen => {
     return `<div style="display:inline-block;" class="sees-does-block">
         <div class="sees-result">${screen[0]}</div>
         <div class="does-result">${screen[1]}</div>
      </div>`}).join(' ');
    
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
                <div style="display:inline-block;" class="user-see-do-results">
                  <div class="inner-scroller">
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

function cancelProtoEdit() {
  $('.edit-form').on('click', '.cancel', function(event) {
    console.log($('.feed-subhead').text());
    addNewClientProtoToFeed();
  });
}


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
    })


    
    //let addedScreens = [];
    //$('.user-does-edit').each(function() {

      //addedScreens.push($(this).text());
   //  });

    //console.log(addedScreens);
    console.log(updatedScreens2DArray);
    //console.log(this);
    console.log(updatedUserStories);
  });

}


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

//here we are wrapping an anonymous function, remeber that () => is
//the same as the function() {}, and calling the first function that
//starts the operation of the client

function showAndHideMain() {
  $('main').toggle();
}

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
        </ul>`);
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




$(() => {
  showAndHideMain();
  //registerAndOrLogin();
  getToDashboard();
  postRegistrationOrLogin();
  getToLogin();
  getProjectFromFounder();
  addUserStoryFields();
  addSeeDoScreen(); // don't think this matters but hey
  expandFullProjectForm();
  getAndDisplayProjects();
  modalToggle();
  showTips();  
}); 







/*

setInterval(function(){ 
  $(".bg").css("background-image", "url('/css/images/css.jpg')"); 
}, 3000);

function slider(){
  $('#cover').delay(3000).fadeOut(1000, function() {
      $('#cover').css("background-image", "url('images/classes-cover.jpg')");
      $('#cover').fadeIn(1000, function() {
          $('#cover').delay(3000).fadeOut(1000, function() {
              $('#cover').css("background-image", "url('images/contact_banner.png')");
              $('#cover').fadeIn(1000, slider);
          });
      });
  });

}   
slider();


var imgSrcs =[
  "images/class-banner/running-group_banner2.png",
  "images/class-banner/running-group_banner3.png",
  "images/class-banner/running-group_banner1.png",
];

$('#cover').delay(1000).fadeIn(1000, animateBackground());

function animateBackground() {

  window.setTimeout(function(){

      var url = imgSrcs[imgSrcs.push(imgSrcs.shift()) - 1];

      $('#cover').delay(4000).fadeOut(1000, function(){

          $(this).css("background-image", "url(" + url + ")")

      }).fadeIn(1000, animateBackground())

  });
}

*/

