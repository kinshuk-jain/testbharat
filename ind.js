/* test js file*/

function doIt(){
   // alert("Yay!!");
}

/** Show the contents of my deqeue **/
function displayQueue(queue) {
    //hold 
    console.log(queue);
}

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
        node.next = this.head;
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
    /*
     * the node has been dequeued, its next pointer should point to nothing 
     */
    node.next = null;
    return node;
};

function controlQueue(){
    var q = new Queue();
    displayQueue(q);
}