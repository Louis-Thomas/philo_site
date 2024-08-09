// Password can be saved by using the server, but will keep it here for now
const password = 'testword';
function checkPassword() {
    var userInput = prompt("Please enter the password:");
    console.log(password);
    if(userInput === password) {return true}; 
}
//Password activation should happen when loaded in 
window.onload = function() {
    if(checkPassword()) {
        document.getElementById("edit_box").style = "display.block"
    }

}
//Contains details for the submisson for the server.  
const submit_box = document.getElementById("submission_box")
function toggleVis(Boole){
    if(Boole) { submit_box.style.display = ""; }
    else {submit_box.style.display = "none"; }
}


//Creating an Article
async function CreateArticle() {
    var formData = new FormData(Form);

    const data = {
        title: formData.get("title"),
        author: (formData.get("authors")).split(", "),
        filePath: formData.get("filepath"),
        createdAt: new Date(),
        updatedAt: new Date()
    }

    $.ajax({
        type:"POST",
        url: "http://localhost:3000/create", 
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function() { alert('In Ajax'); }
    })    

}

//Find an Article using the name to get the id of it:
async function FindArticle() {
    var formData = new FormData(Form);
    const data = formData.get('title');
    const url = "http://localhost:3000/FindbyName/" + data;
    $.getJSON(url, function(result){
        console.log(result);
    })
}

//Update an Article
async function UpdateArticle() {
    var formData = new FormData(Form);

    const data = {
        _id: formData.get("id"),
        title: formData.get("title"),
        author: (formData.get("authors")).split(", "),
        filePath: formData.get("filepath"),
        createdAt: '',
        updatedAt: new Date(),
        password: formData.get("password")
    }

    $.ajax({
        url: "http://localhost:3000/update", 
        type:"PUT",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        error: function(errorThrown) {
            console.error('Error updating:', errorThrown);
        }
    })    

}

//Delete by getting the title
async function DeleteArticle() {
    var formData = new FormData(Data);
    const data = {
        title: formData.get("title"),
        password: formData.get("password")
    }

    $.ajax({
        url: "http://localhost:3000/update",
        type: "DELETE",
        data: JSON.stringify(data),
        error: function(errorThrown) {
            console.error('Error deleting', errorThrown)
        }
    })
}