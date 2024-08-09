<body style = "font-family: Comic Sans MS">

# NOTES ON THE PHILOSOPHY ARTICLE SITE:

### Wordpress:
- Better mobile 

Using wordpress.org or wordpress.com  
Refer to requirements page: https://wordpress.org/about/requirements/

#### GOALS:
- Install wordpress 🔳
- Install mysql 🔳
- Install phpadmin 🔳
- Create the wordpress database 🔳

### Viewing of the Article:

- Using the google docs viewer could I potentially diplay a google docs view page using iframes on the website?
- Have to be pdf's there could be ways to hide the pdf elements can search if that's possible
- These articles should be stored in a server, can get to maynooth/philosophy department about what we can do?

- Say the website could use a function to send a query for a file from the server and then change sites that way?

Will need a JSON object from app.js to the server.js sent: 
```
request_obj = {Title: "Bruh",
Author: "Bruddha", 
Date: "Whenever",
look_for: "bruh.pdf"}
```
The server will have to handle multiple request for the one file. Store into a priority queue and then 
```
// Server-side request_form.js:
priority_queue  queue

queue.push(request_timeconnect); // Add a priority queue for faster clients 

if(requesut_obj.look_for != null) {sendfile(queue.pop())}
```

```
// Client-side
const article = fetch(url/requestform {obj}, fetchOptions)
```

### Article Data:

```
Sample_Article
```

>  17th June:

- We have a check system up to display what articles are up on the website
- So we have connection for editing done from the website to the server
- We have still have to do a good findbyName function, to edit and delete we need to use the ID's - which only exist in the database
- We have a rudamentary password system - handled by the server and 401 error if unauthorized.  
- We have a sort by date, to display the later ones the most. 

Still more to do but good nonetheless

</body>