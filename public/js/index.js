addbtns();

// TODO //
// change view for mobile
// host to firebase

function addbtns() {
    document.getElementById("bookid").focus();
    document.getElementById("footer").addEventListener("click", function () {
        window.open("https://github.com/SreejithKSGupta");
    });
    document.getElementById("bookid").addEventListener("keyup", function (event) {
        event.preventDefault();
        bookid = document.getElementById("bookid").value;
        if (!isNaN(bookid)) {
            if (bookid.length == 10 || bookid.length == 13) {
                document.getElementById("bookid").style.color = "green";
                document.getElementById("booknameipt").style.border = "10px solid #00ff00";
                document.getElementById("booknameipt").style.borderColor = "#c6fcd3";
            }
            else {
                document.getElementById("bookid").style.color = "black";
                document.getElementById("booknameipt").style.border = "10px solid #000000"
                document.getElementById("booknameipt").style.borderColor = "white";
            }
        }
        else {
            document.getElementById("bookid").style.color = "black";
            document.getElementById("booknameipt").style.border = "10px solid #000000"
            document.getElementById("booknameipt").style.borderColor = "white";
            if (event.code == "Enter") {
                getbookdata();
            }
        }
    });
    document.getElementById('schimg').addEventListener('click', function () {
        getbookdata();
    });
}

function getbookdata() {
    bookid = document.getElementById("bookid").value;
    document.getElementById("bookid").focus();
    document.getElementById('datapart').innerHTML = "";
    if (!isNaN(bookid) && (bookid.length == 10 || bookid.length == 13)) {
        var data = fetch("https://www.googleapis.com/books/v1/volumes?q=isbn:" + bookid);
        data.then(function (response) {
            return response.json();
        }).then(function (data) {
            if (data.totalItems == 0) {
                document.getElementById('datapart').innerHTML ="<div class='bookdata'><div class='ntfound' >No Books found for the ISBN number "+bookid+"</div></div>";
            }
            else {
                book = data.items[0].volumeInfo;
                setbookdata(book);
            }
        });
    }
    else {
        var data = fetch("https://www.googleapis.com/books/v1/volumes?q=" + bookid);
        data.then(function (response) {
            return response.json();
        }).then(function (data) {
            if (data.totalItems == 0) {
                document.getElementById('datapart').innerHTML = "<div class='bookdata'><div class='ntfound' >No Books found for the keyword "+bookid+"</div></div>";
            }
            else {
                for (var i = 0; i < data.items.length; i++) {
                    book = data.items[i].volumeInfo;
                    setbookdata(book);
              } }});}}

function setbookdata(book) {
    var bookname = book.title;
    var bookauthor = book.authors;
    var bookimg = (book.imageLinks.thumbnail || book.imageLinks.smallThumbnail || 'undefined');
    var bookdesc = book.description;
    var bookpub = book.publisher;
    var bookpubdate = book.publishedDate;
    var bookpage = book.pageCount;
    var booklang = book.language;
    var bookcat = book.categories;
    var bookrate = book.averageRating;
    var bookpreview = book.previewLink;
    var bookinfo = book.infoLink;

    if (bookimg == undefined) {
        bookimg = 'res/defbook.png';
    }
    if (bookdesc == undefined) {
        bookdesc = 'Not Available';
    }
    if (bookpub == undefined) {
        bookpub = 'Not Available';
    }
    if (bookpubdate == undefined) {
        bookpubdate = 'Not Available';
    }
    if (bookpage == undefined) {
        bookpage = 'Not Available';
    }
    if (booklang == undefined) {
        booklang = 'Not Available';
    }
    if (bookcat == undefined) {
        bookcat = 'Not Available';
    }
    if (bookrate == undefined) {
        bookrate = 'Not Available';
    }
    if (bookpreview == undefined) {
        bookpreview = 'Not Available';
    }
    if (bookinfo == undefined) {

        bookinfo = 'Not Available';
    }
    if (bookauthor == undefined) {
        bookauthor = 'Not Available';
    }
    if (bookdesc.length > 200) {
        bookdesc = bookdesc.substring(0, 200) + "...";
    }
    var bookdiv = '<div class="bookdata"><div class="bookimg"><img src="' + bookimg + '" alt="book image"><div class="btn" title="' + bookpreview + '" onclick="gotowindow()">Preview</div></div><div class="booktxt"><div class="bokkname">'+bookname+'</div> <div class="bookline bookauthor"><div>Author</div><div>' + bookauthor + '</div></div><div class="bookline bookpub"><div>Publisher</div><div>' + bookpub + '</div></div><div class="bookline bookpubdate"><div>Published Date</div><div>' + bookpubdate + '</div></div><div class="bookline bookpage"><div>Page Count</div><div>' + bookpage + '</div></div><div class="bookline booklang"><div>Language</div><div>' + booklang + '</div></div><div class="bookline bookcat"><div>Categories</div><div>' + bookcat + '</div></div><div class="bookline bookrate"><div>Rating</div><div>' + bookrate + '</div></div><div class="bookline bookdesc"><div>Description</div><div>' + bookdesc + '</div></div></div> </div>';
    document.getElementById('datapart').innerHTML += bookdiv;
}

function gotowindow() {
    window.open(this.book.previewLink);
}