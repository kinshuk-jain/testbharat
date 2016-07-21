/** Implementing a Double Ended Queue - Deque **/

//The Queue
var Queue = function () {
    this.head = null;
    this.tail = null;
};

//Queue Node
var Node = function (data) {
    this.data = data;
    this.next = null;
};

//Enqueue at the end
Queue.prototype.enqueueEnd = function (data) {
    var node = new Node(data);
    
    if (this.head === null) {
        this.head = node;
        this.tail = node;
    } else {
        this.tail.next = node;
        this.tail = node;
    }
};

//Enqueue at the beginning 
Queue.prototype.enqueueStart = function (data) {
    var node = new Node(data);
    
    if (this.head === null) {
        this.head = node;
        this.tail = node;
    } else {
        this.node.next = this.head;
        this.head = node;
    }
};

//Dequeue from the beginning
Queue.prototype.dequeueStart = function () {
    try{
        if (this.head === null) {
            throw "Queue Underflow";
        } 
    } catch(e){
        //catch the undeflow exception;
        return undefined;
    }
    
    var node = this.head;
    
    //code for border case when there is only one element in the queue
    if(this.head === this.tail){
        this.head = this.tail = null;
    }else{
        this.head = this.head.next;
    }
    //the node has been dequeued, its next pointer should point to nothing
    node.next = null;
    return node;
};

//Dequeue from the End
Queue.prototype.dequeueEnd = function () {
    try{
        if(this.tail === null){
            throw "Queue Underflow";
        }
    } catch(e){
        //catch the undeflow exception;
        return undefined;
    }
    
    var node = this.tail;
    
    //code for border case when there is only one element in the queue
    if(this.head === this.tail){
        this.head = this.tail = null;
    }else{         
        var temp = this.head;
        while(temp.next !== this.tail)
            temp = temp.next;
        this.tail = temp;
        this.tail.next = null;
    }
    //the node has been dequeued, its next pointer should point to nothing
    node.next = null;
    return node;
};

/********************** Deque Implementation Ends ******************************************/

/** Show the contents of the deqeue **/
function displayQueue() {
    //hold 
}

//function to manage the deque. A temporary function. This functionality will be controlled by onScroll event
function controlQueue(){
    Q.enqueueEnd($("#post1"));
    Q.enqueueEnd($("#post2"));
    Q.enqueueEnd($("#post3"));
    //showComments();
}

/*
* if the user chooses to hide all comments after clicking on 'see all comments' at least
* once
*/
function showComments(isHidden){
    var count = Q.head;
    var kids;
    var numOfKids;
    
    kids = $(count.data[0]).children(".panel-footer")[0];
    numOfKids = $(kids).children("div").length;
    if((numOfKids>(numOfComments + 3)) && isHidden) {
        var temp = $(kids).children("div");
        temp = temp.slice(1, temp.length-5);
        //console.log(typeof temp);
        temp.hide();
    } else {
        var temp = $(kids).children("div");
        temp = temp.slice(1, temp.length-5);
        //console.log(typeof temp);
        temp.show();
    }
}


//brings in the reply box for the given cmtID
function replyBox(cmtID){
    var x = $("#"+cmtID+" div:last-child");
    
    var reply = '<div class="text-right"><textarea class="replyCommentArea" rows="2"></textarea> \
                 <br><button type="button" class="btn btn-primary btn-xs text-right">\ reply</button></div>';
    
    x.append(reply);
    
    //unbind event handler, to be bounded again after click on post
    x = $("#"+cmtID).children().children()[1];
    x = $(x).attr("id");
    $("#"+x).off("click");
}

var replyHandler = function(cmtID){  
    var x = $("#"+cmtID).children().children()[1];
    x = $(x).attr("id");
    $("#"+x).on("click", replyBox(cmtID));
};

function postReply(cmtID){
   var x = $("#"+cmtID).children().children()[1];
    x = $(x).attr("id");
    $("#"+x).on("click", replyHandler);
}

var scrollHandler = function(event){  
    var post = document.getElementById("post4");
    if(window.scrollY >= $(document).height() - 1200){
        //fetch next 20 posts
    }    
};




/*************************** Animation functions ***********************/

//smoothens the in-page anchor scrolling
function smoothCommentScroll() {
  $('a[href^="#"]:not([href="#"])').click(function(event) { 
      event.preventDefault();    
      var id = $(this.hash);
      if (id.length) {
        $('html, body').animate({
          scrollTop: id.offset().top - 150
        }, 1000);
        id.focus();
        return false;
      }                
   });
 }


function reportSpam(){
    $('[data-toggle="popover"]').popover(); 
}

/********* Counters functions returning unique IDs ****************/

//returns comment id
function getCmtID(){
    return String(postCounter) + (++commentCounter);
}
//returns post id
function getPostID(){
    return ++postCounter;
}
//returns comment hyperlink id
function getCommentButtonID(){
    return postCounter;
}
//returns see all comments id
function getSeeAllID(){
    return postCounter;
}
//returns post button id
function getPostButtonID(){
    return postCounter;
}
//returns comment text area id
function getCommentAreaID(){
    return postCounter;
}
//returns comment like button id
function getPostLikeButtonID(){
    return String(postCounter) + commentCounter;
}

/********* Counter functions end **********/



/********* Global Variables ***********/

//the global queue of posts
var Q = new Queue();
//number of comments to show when more than this
var numOfComments = 5;
//number of posts to be kept in queue while scrolling
var numOfPostsInQueue = 20;
//keeps a tally of the number of posts
var postCounter = 0;
//keeps track of whether the user is logged in
var notLogged = true;
//user id 
var user_ID;
/********************** Global Variable Declaration Ends *************************/