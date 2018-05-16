let mvpUserStories = [];
let seesDoes = [];
let userProject = {};
let requestUrl = "/projects";


const MOCK_PROJECTS = {
    "founderProjects": [
        {
            "id": "1111111",
            "shortDesc": "A simple way to snooze your tabs for later.",
            "longDesc": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
            "userStories": ["Sed ut perspiciatis unde omnis iste natus error", "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla", "Sed ut perspiciatis unde omnis iste natus error", "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla", "Sed ut perspiciatis unde omnis iste natus error", "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla", "Sed ut perspiciatis unde omnis iste natus error", "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla", "Sed ut perspiciatis unde omnis iste natus error", "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla", "Sed ut perspiciatis unde omnis iste natus error", "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla"],
            "screens": [["what the user sees", "what the user does"], ["what the user sees", "what the user does"], ["what the user sees", "what the user does"]]
        },
        {
            "id": "2222222",
            "shortDesc": "Modern discussion boards for your audience.",
            "longDesc": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
            "userStories": ["Sed ut perspiciatis unde omnis iste natus error", "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla", "Sed ut perspiciatis unde omnis iste natus error", "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla", "Sed ut perspiciatis unde omnis iste natus error", "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla", "Sed ut perspiciatis unde omnis iste natus error", "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla", "Sed ut perspiciatis unde omnis iste natus error", "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla", "Sed ut perspiciatis unde omnis iste natus error", "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla"],
            "screens": [["what the user sees", "what the user does"], ["what the user sees", "what the user does"], ["what the user sees", "what the user does"]]
        },
        {
            "id": "3333333",
            "shortDesc": "An app that makes you want to beat procrastination.",
            "longDesc": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
            "userStories": ["Sed ut perspiciatis unde omnis iste natus error", "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla", "Sed ut perspiciatis unde omnis iste natus error", "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla", "Sed ut perspiciatis unde omnis iste natus error", "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla", "Sed ut perspiciatis unde omnis iste natus error", "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla", "Sed ut perspiciatis unde omnis iste natus error", "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla", "Sed ut perspiciatis unde omnis iste natus error", "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla"],
            "screens": [["what the user sees", "what the user does"], ["what the user sees", "what the user does"], ["what the user sees", "what the user does"]]
        },
        {
            "id": "4444444",
            "shortDesc": "A simple, beautiful and agile project management software.",
            "longDesc": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
            "userStories": ["Sed ut perspiciatis unde omnis iste natus error", "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla", "Sed ut perspiciatis unde omnis iste natus error", "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla", "Sed ut perspiciatis unde omnis iste natus error", "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla", "Sed ut perspiciatis unde omnis iste natus error", "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla", "Sed ut perspiciatis unde omnis iste natus error", "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla", "Sed ut perspiciatis unde omnis iste natus error", "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla"],
            "screens": [["what the user sees", "what the user does"], ["what the user sees", "what the user does"], ["what the user sees", "what the user does"]]
        },
    ]

}

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
        <fieldset class="email-input">
          <p>
            <label for="email">Where can noob developers contact you?</label>
            <input type="email" name="email" id="email">
          </p>
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
  
  let emailInput = $('#email').val();
  
  if(emailInput == "") {
    alert('We need your email. Noobz devs have know where to find you');
  } else {
    userProject['email'] = emailInput;
    console.log(userProject);

    $.ajax({
      url: requestUrl,
      type: "POST",
      //data: JSON.stringify(userProject),
      data: JSON.stringify(userProject),
      success: function(data) { 
        addNewClientProtoToFeed(data.id);
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
    getProjectFromFounder();
  }
});

function addNewClientProtoToFeed(projectId) {
  const urlWithID = `${requestUrl}/${projectId}`;

  $.ajax({
    url: urlWithID,
    type: "GET",
    success: function(data) { 
      console.log('here is the response from getById!');
      console.log(data); // Set data that comes back from the server to 'text'
      $('.js-project-feed').append(
        '<p>' + data.shortDesc + '</p>');
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


Problems with the app you could solve:
-you can't edit the prototype draft after filling it out 
-you can't delete and or edit user stories you don't want
-you can just use it to create a prototype idea without publishing it
-




*/