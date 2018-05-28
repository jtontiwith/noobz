let mvpUserStories = [];
let seesDoes = [];
let userProject = {};
let requestUrl = "/projects";


//here we register and sign in a user
function registerAndOrLogin(user) {
  if(user) {
    $(`.js-register-and-login-form`).html(`
    <fieldset class="sign-in">
      <legend>Login</legend>
      <p>
        <label for="email">Email</label>
        <input name="username" type="email" id="email" value="${user.email}">
      </p>
      <p>
        <label for="password">Password</label>
        <input name="password" type="password" id="password">
      </p>
    </fieldset>
    <button class="login" type="submit">Login</button>`);
  } else {
    $(`.js-register-and-login-form`).html(`
      <fieldset class="sign-up">
        <legend>Sign Up</legend>
        <p>
          <label for="email">Email</label>
          <input name="email" type="email" id="email">
        </p>
        <p>
          <label for="password">Password</label>
          <input name="password" type="password" id="password">
        </p>
        <p>
          <label for="firstName">First Name</label>
          <input name="firstName" type="text" id="firstName">
        </p>
        <p>
          <label for="lastName">Last Name</label>
          <input name="lastName" type="text" id="lastName">
        </p>    
      </fieldset>
      <button class="register" type="submit">Register</button>
      <button class="go-to-login" type="button">Login</button>`); 
    }
  }

  function getToLogin() {
    $(`.js-register-and-login-form`).on('click', '.go-to-login', function(event) {
      console.log('the login button is workin');
      $(`.js-register-and-login-form`).html(`
      <fieldset class="sign-in">
        <legend>Login</legend>
        <p>
          <label for="email">Email</label>
          <input name="username" type="email" id="email">
        </p>
        <p>
          <label for="password">Password</label>
          <input name="password" type="password" id="password">
        </p>
      </fieldset>
      <button class="login" type="submit">Login</button>`);
    });
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
          },
          dataType: "json",
          contentType: "application/json"
        })
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
            //putting the ids of the user's prototype (if any)
            //into a comma separated string b/c localStorage only
            //stores strings
            let protoString = data.prototypes_id.join();  
            localStorage.setItem('prototype_ids', protoString);
            
          },
          dataType: "json",
          contentType: "application/json"
        })
      }  
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
      <input type="text" name="name" id="name-value" for="app-name" placeholder="ABC app">
      <label for="tagline-value">and tagline</label>
      <input type="text" name="tagline" id="tagline-value" placeholder="A minimalist tool for XYZ">
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
        <p>
          <label for="long-desc"></label>
          <textarea type="text" name="long-desc" id="long-desc">
            A longer 300-400 character description of your app
          </textarea>
        </p>
        </fiedset>
        <hr>
      <fieldset class="userstories">  
          <p>
            <label for="usPart1">I want</label>
            <input type="text" name="usPart1" id="usPart1">
            <label for="usPart2">so that</label>
            <input type="text" name="usPart2" id="usPart2">
          </p>
          <p><button type="button" class="more-userstories">add</button></p>
        <hr>  
        </fieldset>
        <fieldset>
          <legend>Userstories - <span>pick three or four</span></legend>
          <ul class="userstory-list">
          </ul>
          <hr>
        </fieldset> 
        <fieldset class="sees-does">
          <div style="display: inline-block">
            <div style="border-bottom:1px solid black;"><textarea id="user-sees" placeholder="What the user sees..."></textarea></div>
            <div style="margin-top: 10px;"><textarea id="user-does" placeholder="What the user does..."></textarea></div>
            <button type="button" class="more-screens">next screen</button>
          </div>
        </fieldset>
        <p><button type="submit">Let's do this</button><button type="button" class="cancel">Nah, I'm good</button></p>`);
      console.log('does this run?')
      addUserStoryFields();
      addSeeDoScreen();
      limitMvpUserstories();
      cancelAndClearForm();
    }
  });
}

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
  $('.js-project-form').on('click', '.more-userstories', event => {
    i++;
    console.log('yup, the add button is working');
    let userStoryPart1 = $('#usPart1').val();
    let userStoryPart2 = $('#usPart2').val();
    
    
    //let fullUserStory = `<li>I want ${userStoryPart1} so that ${userStoryPart2}</li>`;
    //form validation
    if(userStoryPart1 && userStoryPart2 !== "") {
      let fullUserStory = `<li>
      <input type="checkbox" class="selectedUserstory" id="selectedUserstory${i}" name="selectedUserstory" value="I want ${userStoryPart1} so that ${userStoryPart2}">
      <label for="selectedUserstory${i}">I want ${userStoryPart1} so that ${userStoryPart2}</li></label>
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


function addSeeDoScreen() {
  $('.js-project-form').on('click', '.more-screens', event => {
   let userSees = $('#user-sees').val();
   let userDoes = $('#user-does').val();
    
    if(userSees && userDoes !== "") {
      const seesDoesSubArrays = [userSees, userDoes];
      seesDoes.push(seesDoesSubArrays);
      userProject['screens'] = seesDoes;
      console.log(`userSees is ${userSees} and userDoes is ${userDoes}`);
      $('#user-sees').val('');
      $('#user-does').val('');
      $('.sees-does').append(`
      <div class="sees-does-block" style="display: inline-block;">
        <div style="width:80px; border-bottom: 1px solid black;">${userSees}</div>
        <div style="width:80px; margin-top: 10px;">${userDoes}</div>
      </div>
      `);
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

  
  */
  for (index in data.clientProtos) {
    if(localStorage.user_id === data.clientProtos[index].user_id) {
    projectsArray.push(
      `<dl class="js-client-project" id="${data.clientProtos[index].id}" style="border: 1px solid black; margin-bottom: 10px;">
        <dt>${data.clientProtos[index].shortDesc}</dt>
        <dt>${data.clientProtos[index].longDesc}</dt>
        <div class="detail-toggle">    
          <dd>${data.clientProtos[index].userStories}</dd>
          <dd>${data.clientProtos[index].screens}</dd>
          <dd>${data.clientProtos[index].email}</dd>
        </div>
      </dl>
      <form class="js-publish" role="form">
        <fieldset>
          <legend>Status</legend>
          <input class="js-make-public" type="checkbox" id="${data.clientProtos[index].id}" name="public" value="public">
          <label for="${data.clientProtos[index].id}">Public</label>
        </fieldset>
      </form>
      `)         
    } else {
    projectsArray.push(
      `<dl class="js-client-project" id="${data.clientProtos[index].id}" style="border: 1px solid black; margin-bottom: 10px;">
        <dt>${data.clientProtos[index].shortDesc}</dt>
        <dt>${data.clientProtos[index].longDesc}</dt>
        <div class="detail-toggle">    
          <dd>${data.clientProtos[index].userStories}</dd>
          <dd>${data.clientProtos[index].screens}</dd>
          <dd>${data.clientProtos[index].email}</dd>
        </div>
      </dl>
      `)
    }
  }
  $('.js-project-feed').html(projectsArray);
  fullProjectDisplay();
  publishPrototypeToFeed();
}


function publishPrototypeToFeed() {
  $('.js-make-public').on('change', function(event) {
    //this is for setting the boolean to true/false and just making
    //it happen here in the client instead of playing around server side
    //just writing an iterator (j) and assigning true or false based on even
    //or odd numbers
    let j = 1;
    j++;
    let status; 
    j % 2 == 0 ? status = true : status = false;
    console.log(`making the prototype public...? ${status}`)
    let prototypeId = this.id;
    console.log(prototypeId);

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
  $('.js-client-project').on('click', 'dt', function(event) {
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



$(() => {
  registerAndOrLogin();
  postRegistrationOrLogin();
  getToLogin();
  getProjectFromFounder();
  expandFullProjectForm();
  getAndDisplayProjects();
}); 


/* NEXT MOVES
-DONE!! - button to cancel (puts the form back to original state) 
-DONE!!! - change tagline to elicit name and tagline, have placeholder show that
  -DONE!! -- might be able to have two fields that I sum to one on my end...good
- DONE email field (where devs should contact you)
-in the feed show tagline, first x characters of description, and have a
button to open up the rest
DONE!!! -what I am trying to do it have detail hidden and show/hide based on 
  when a user clicks the button 
DONE-when a user hits 'let's do this' I want to take that user to their 
dashboard and show them their prototypes
-I want a users prototypes to have a true/false field the user can toggle
publish the the prototype to the feed
-






Problems with the app you could solve:
-you can't edit the prototype draft after filling it out 
-you can't delete and or edit user stories you don't want
-you can just use it to create a prototype idea without publishing it
-




*/