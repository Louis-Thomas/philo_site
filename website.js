const article = document.querySelectorAll('.article');
const article_shell = document.getElementById("article_shell");

async function link_articles() {
    article.forEach(element => {
        element.addEventListener('click', async function() {
            console.log(element.value);
    
            localStorage.setItem('currentArticle', element.value); //This is done to pass the article information to the article website
    
            window.location.href = 'article.html';
        })    
    });
}

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

    //Should update if there is any changes to the articles.
    await del_articles()
    setTimeout(pop_articles(), 2000);
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

    //Should update if there is any changes to the articles.
    await del_articles()
    setTimeout(pop_articles(), 2000);
}

//Function checks database for articles and then populates the screen for how much articles there are.  
async function pop_articles() {
    const url = "http://localhost:3000/GetAll";
        console.log(url);
    $.getJSON(url, async function(result) {

        //Sort by the createAt date to put the latest first
        result.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        const article_box = document.getElementById("article_box");
        result.forEach(function(item, index){
            var btn = document.createElement("BUTTON");
                btn.class = "article";
            btn.textContent = item.title;
            article_box.append(btn);

            btn.addEventListener('click', async function() {
                console.log(btn.value);
        
                localStorage.setItem('currentArticle', JSON.stringify(item)); //This is done to pass the article information to the article website
        
                window.location.href = 'article.html';
            })    
        })
    })
}
async function del_articles() {
    const article_box = document.getElementById("article_box");
    while (article_box.firstChild) {
        article_box.removeChild(article_box.firstChild);
    }
}

window.onload = function() {
    pop_articles();

    //link_articles();
}