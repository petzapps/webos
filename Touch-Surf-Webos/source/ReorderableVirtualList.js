enyo.kind({
   name: "ReorderableVirtualList",
   kind: enyo.VirtualList,
   published: {
      highlightClassName:"enyo-held", // class for highlighting an item when you drag over it
      dragBackgroundColor:"rgba(30,30,30,0.8)", // background color for drag item
      reorderable:false,
   },
   events: {
      onReorder:"",
   },
   dragpulseJob:null,
   autoScrollStep:5,
   autoScrollDir:1,
   stopScrolling:false,
   dragging:false,
   held:false,
   dragNode:null,
   dragOver:false,
   lastIndex:-1,
   autoScrollEvent:null,
   contentOffsetTop:null,
   contentOffsetBottom:null,
   
   // separate mousehold from others to make it cancelable by item event handlers
   mouseholdHandler:function(inSender,e){
      if (this.reorderable) {
         if (!this.held && e.type == "mousehold") {
//            console.log("list mouse hold", e);
            this.held = true;
            if (!this.contentOffsetTop) {
               // This is here because I can't find a better place
               // This can't be done in create, since the correct node bounds aren't available at that time
               this.contentOffsetTop = enyo.dom.calcNodeOffset(this.$.scroller.hasNode()).top;
               this.contentOffsetBottom = this.contentOffsetTop + this.hasNode().clientHeight;
            }
            // clone the targeted node to create a drag object and set the appropriate attributes
            var n = this.$.list.fetchRowNode(this.$.list.fetchRowIndex());
            this.dragNode = n.cloneNode(true);
            this.dragNode.setAttribute("id", this.dragNode.getAttribute("id") + "_clone");
            this.dragNode.style.position = "absolute"; // position:absolute to float node over the list
            this.dragNode.style["pointer-events"] = "none"; // ignore mouse events
            // Do not change the sytle items above this line.
            
            this.dragNode.style.left = "10px";
            this.dragNode.style.top = e.pageY - this.contentOffsetTop - 20 + "px"; // e.pageY must be present in the calculation
            this.dragNode.style.width = n.offsetWidth + "px";
            this.dragNode.style.background = this.dragBackgroundColor;
            
            // add the clone to the DOM.  Make sure to add it outside of the scroller.
            this.$.scroller.$.content.hasNode().offsetParent.appendChild(this.dragNode);
         }
      }      
   },
   captureDomEvent:function(e){
      if (this.reorderable){
         var t = e.type;
         if (t == "mouserelease") {
//            this.log("mouserelease");
            this.held = false;
            if(!this.dragging && this.dragNode)
               this.$.scroller.$.content.hasNode().offsetParent.removeChild(this.dragNode);
         }
            
         if (this.held && t == "dragstart") {
            // Only start item dragging after the item has been held
//            this.log("dragstart");
            e.dragInfo = this.$.list.fetchRowIndex();
            this.dragging = true;
            return true;
         }
            
         if(this.dragging){
            switch(t){
               case "dragover":
                  // dragover is constantly fired when the drag object is moved over an item
                  // The if statement is an attempt to limit how often the instructions
                  // inside are executed. The are probably better ways to do this.
                  if (!this.dragOver) { 
                     this.dragOver = true;
                     // fetch the row node that contains the target of the event
                     this.lastIndex = this.$.list.fetchRowIndexByNode(e.target);
                     var n = this.$.list.fetchRowNode(this.lastIndex);
                     if (n) {
                        n.className = this.highlightClassName; // highlight the item
                     }else
                        this.lastIndex = -1;
                  }
                  break;
               case "autoscroll":
                  // When autoscrolling, dragover and dragout events do not fire on the items
                  // this the allows the highlighting to work correctly
                  var idx = this.$.list.fetchRowIndexByNode(e.target);
                  if (idx != this.lastIndex) {
                     if (this.lastIndex >= 0)
                        this.$.list.fetchRowNode(this.lastIndex).className = "";
                     this.lastIndex = idx;
                     var n = this.$.list.fetchRowNode(this.lastIndex);
                     if (n)
                        n.className = this.highlightClassName;
                  }
                  break;
               case "click":
                  // dragfinish happens before drop, so this.dragging can't be set in dragfinish
                  this.dragging = false;
                  return true;
               case "mousemove":
               //use mousemove instead of drag because drag won't be sent after the original item is disposed of
               //during autoscroll
				  //If block Added by petro, to avoid NullPointer for style
				  if(this.dragNode) {
					this.dragNode.style.top = e.pageY-this.contentOffsetTop-20+"px";
				  }
                  if(!this.dragpulseJob){
                     // Not autoscrolling. Check if drag object is within 20 pixels from the top or bottom of the list
                     if (e.pageY < this.contentOffsetTop + 20 || e.pageY > this.contentOffsetBottom - 20) {
                        if(e.pageY < this.contentOffsetTop + 20) // set the scroll direction
                           this.autoScrollDir = 1;
                        else
                           this.autoScrollDir = -1;
                        this.stopScrolling = false;
                        this.autoScrollStep = 5 * this.autoScrollDir; // this and the interval period below determines the scroll speed
                        this.autoScrollEvent = e;
                        this.dragpulseJob = setInterval(enyo.bind(this, "autoScroll"), 50); // start the timer for autoscroll. 50ms = 20fps
                     }
                  }else{
                     // Already autoscrolling. Check if the item left the autoscroll trigger area, or set the speed of the scroll
                     if (e.pageY > this.contentOffsetTop + 20 && e.pageY < this.contentOffsetBottom - 20) {
                        clearInterval(this.dragpulseJob);
                        this.autoScrollEvent = null;
                        this.dragpulseJob = null;
                     }
                     else if (e.pageY < this.contentOffsetTop + 10 || e.pageY > this.contentOffsetBottom - 10) {
                        this.autoScrollStep = 10 * this.autoScrollDir;
                     }else{
                        this.autoScrollStep = 5 * this.autoScrollDir;
                     }
                  }
                  break;
               case "dragout":
                  // un-highlight when the drag object leaves the item
                  if (this.dragOver) {
                     this.dragOver = false;
                     if(this.lastIndex >= 0)
                        this.$.list.fetchRowNode(this.lastIndex).className = "";
                  }
                  break;
               case "drop":
//                  this.log("drop",this.lastIndex,e.dragInfo)
                  if(this.lastIndex >= 0)
                     enyo.asyncMethod(this,"doReorder",this.lastIndex,e.dragInfo);
               case "dragfinish":
                  if (this.dragpulseJob) {
                     // stop the autoscroll timer
                     clearInterval(this.dragpulseJob);
                     this.dragpulseJob = null;
                  }
                  if (this.dragNode) {
                     // delete the dragobject
                     this.$.scroller.$.content.hasNode().offsetParent.removeChild(this.dragNode);
                     this.dragNode = null;
                  }
                  if(this.lastIndex >= 0)
                     this.$.list.fetchRowNode(this.lastIndex).className = ""; // un-highlight
                  this.lastIndex = -1;
                  break;
            }
         }
      }
   },
   autoScroll:function(){
      if(this.stopScrolling)
         return;
      this.$.scroller.$.scroll.y += this.autoScrollStep;
      if(this.$.scroller.$.scroll.y > 0 && this.autoScrollDir > 0){
         this.$.scroller.$.scroll.y = 0;
         this.stopScrolling = true;
      }else if(this.$.scroller.$.scroll.y < this.$.scroller.$.scroll.bottomBoundary && this.autoScrollDir < 0){
         this.$.scroller.$.scroll.y = this.$.scroller.$.scroll.bottomBoundary;
         this.stopScrolling = true;
      }
      this.$.scroller.scroll();
      if (this.autoScrollEvent) {
         // Dispatch an event so highlighting can change during autoscroll
         // I don't think every property is needed, but it doesn't hurt.
         enyo.dispatch({
            type: "autoscroll",
            dx: this.autoScrollEvent.dx,
            dy: this.autoScrollEvent.dy,
            pageX: this.autoScrollEvent.pageX,
            pageY: this.autoScrollEvent.pageY,
            horizontal: false,
            vertical: true,
            target: document.elementFromPoint(this.autoScrollEvent.pageX, this.autoScrollEvent.pageY),
            dragInfo: this.autoScrollEvent.dragInfo
         });
      }
   },
});