var Iterator = function(items) {
         this.index = 0;
         this.items = items;
         this.first = function() {
            this.reset();
            return this.next();
          },
         this.next = function() {
            return this.items[this.index++];
          },
         this.hasNext= function() {
            return this.index < this.items.length;
          },
         this.reset= function() {
            this.index = 0;  
         },
         this.hasPrevious =function(){
            if(index == 0) return false;
             else
               return true;         
         }     
         this.previous = function(){
             this.index--;
             return this.items[index];
         }
         };