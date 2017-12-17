<center><h1>Movie Database project</h1> </center>

<center><h1>Description</h1> </center> 
<p><span style='color:red' >Movie Database</span> is a searchable database where a user, <span style='color:red' >Robot helper</span> can have many people enter profiles, pictures, and resumes for future searching. Similar in thought to and IMDB database, its overall goals is to link directors and actors in one database.</p>
<h6>What Movie Database can do?</h6>
Movie Database can do the following, so far:
<li>Enter profile, along with secure password </li>
<li>In a profile, a user can enter 5 pictures </li>
<li>A director can then use the internal search to set parameters on such things as height, skills, and location </li>
<li>A director, which can be an admin and an actor, can then email the list to each user which then sends a link, </li>
<li>   to the user to view the information the director is looking for, such as for a movie project </li>
<li>Texting and phone use for profiles is also available </li>
<li>Administrators can make other users administrators, users don't have the option to make themselves administrators </li>
<li> </li>

<center><h1>Usage</h1> </center> 
Robot helper is a work in progress. Consequently, it is not that easy for others developers to sinply add new feature to it unless they understand the logic of its Algorithm. We are still working on that!
However, developers can easily add new conversations by modifying a file called process.js.
Example: to add a conversation when users say hi Yuma or hi Angela, the developer needs to add this line to the questions object inside process.js
"hi&yuma,angela":{
   func:"speak",param:"Hello, how are you?",
},
<li><b>&</b><li> meaning that both word are require
<li><b>,</b></li> meaning either one is require
<li><b>func</b></li> let you specify which function you want to use. Here we are using the function speak because we want the system to speak back to us.
<li><b>param</b></li> is a parameter for the chosen function. Here we want the function speak to say "Hello, how are you?" when we say "hi Yuma or hi Angela" 
<h6>Some Available Function:</h6>
<li><b>show_help</b></li>
<li><b>analyze</b></li>
Example: "event,events&now": {
            func:"analyze",param_x:"events"
          },
          
<li><b>change_location</b></li>
 Example:   "about&page": {
            func:"change_location",param:"about",
        },

<li><b>tell_time</b></li>
  Example:     "what&time&is&it":{
                func:"tell_time",param:false,
              },
<li><b>tell_weather</b></li>
  Example: "tell,say,how&weather":{
                  func:"tell_weather",param:"x",
            },
<li><b>get_class</b></li>
Example: "class,course":{
                func:"get_class",param:"x",
           },
<li><b>get_location</b></li>
Example:    "where's":{
                func:"get_location",param:"x",
            },
<li><b>go_back</b></li>
Example: "go&back": {
            func:"go_back",param:false,
          },
<li><b>say_user_name</b></li>
Example:  "my&name":{
            func:"say_user_name",param:"my name is lassana",
           },
<center><h1>Voice Recognition Analytic </h1> </center> 
<h6>Problem</h6>
Building a voice assistant is not simple as it seems. As Bill Bryson said, “A computer is a stupid machine with the ability to do incredibly smart things, while computer programmers are smart people with the ability to do incredibly stupid things.”
A person needs to tell a computer what to do, how to do it, and when to do it, step by step with all the details.
The problem with voice recognition is that you never know what users are going to say, when they are going to say it, and how they are going to say it.
<h6>Solution</h6>
One solution was to apply some Data Analytic to get a meaning of what users may say to Robot Helper.
For an easy example there are many ways a person can ask for a class. i.e. "show my class business law", "display business law class", "class business law", "find business law class", "find my business law class" ,"show business law". Each one of these phrases will make sense to a person; however, the computer does not understand any of these phrases. The solution was to find at least some keywords, when users are asking about a class, will be always there. Here the word 'show', 'class', and 'business' are showing in most of them. Now Robot Helper may assume that when there is a word 'show' with a word 'class', a user is most likely talking about a class. After assuming that the user is looking for a class, Robot Helper will go and check in all available classes. If the name of any class appears in what the user said. Robot Helper is now confident that the user is asking about a class. Consequently, information about the class will be displayed if there is only one match. However if  there are more matches, Robot helper will display some options where the user can choose from. 

<center><h1>What's next </h1> </center> 
In the feature ,Robot Helper will be able to do the following:
<li>Give information about Point Park Bus Schedules</li>
<li>Tell Students About their Homework</li>
<li>Walk around Campus and Intearct with people</li>
<li>and more...<li>

<center><h1>Contributing</h1> </center> 
<li>Lassana Konate</li>
<li>Mattew Alexander</li>
