/*
drawingFacade Class defines a higher-level interface to canvas operations and makes the subsystems easier to use.
canvas operations - drawing window, drawing line, line clipping,providing iterator 
*/
var drawingFacade = function(){
          
         
          this.drawlineobj=null;
          this.drawWindowobj = null;
          this.adapterobj=null;
          this.lineclippingobj = null;
          this.lineiterator = null;
                     
          this.initialze=function(graphtype){
            this.adapterobj = new canvasadapter();
            if(graphtype ===GraphEnum.LINE)
                {
                    this.adapterobj.addtitle(canvasEnum.TITLE_LINECLIPPING);
                    this.adapterobj.graphsize(parseInt(GRAPH_SIZE));
                }
           }
                  
          this.updatewindow = function(regioncoord){
                 
                 if((regioncoord.xmin < regioncoord.xmax) && (regioncoord.ymin < regioncoord.ymax))
                  {
                    return true;
                  }
                 return false;
           }
          
          this.drawwindow = function(regioncoord){
             if(this.updatewindow(regioncoord))
             {             
               this.drawWindowobj =new drawWindow(regioncoord);  
               this.adapterobj.cleardataSeries();          
               
               this.drawWindowobj.draw(this.adapterobj);
               this.adapterobj.createchart();
               this.adapterobj.draw();
               return true;
             }
             else
             {
                 return false;
             }
          }
          
          this.drawline = function(pointcoord)
          {
              this.drawlineobj = null;
              this.drawlineobj = new drawLine(pointcoord);
              console.log(pointcoord);
              
              this.drawlineobj.draw(this.adapterobj);
              this.adapterobj.createchart();
              this.adapterobj.draw();
              //return drawlineobj;
          }
         
          this.dolineclipping =function()
          {
              if(this.lineclippingobj != null) 
                 this.lineclippingobj=null;
              if(this.drawWindowobj != null && this.drawlineobj != null)
                {
                 this.lineclippingobj = new coherlineclipping(this.drawWindowobj,this.drawlineobj);
                 this.lineclippingobj.startcoherProcess();
                 return true;    
                }
              else
                  {
                    return false;
                  }
              
          }
          
          this.startlineiterator=function()
          {
              if(this.lineclippingobj != null)
                {
                 this.lineclippingobj.startlineiterator(this.adapterobj);
                 return true;
                }
              else
               {
                return false;    
               }
             
          }
          
          this.nextAction=function()
          {
             if(this.lineclippingobj != null) 
               this.lineclippingobj.nextclippingaction(this.adapterobj);
              
          }
          
          this.previousAction =function()
          {
              if(this.lineclippingobj != null) 
                   this.lineclippingobj.previousclippingaction(this.adapterobj);
          }
          
          
      };