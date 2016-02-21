/*
  draw Window class will draw the window in the canvas graph
  Input : 
   Co-ordinates of bottom left corner
   Co-ordinates of upper right corner
*/
var drawWindow = function(regioncoord)
      {
       
         this.windowregion = regioncoord;
         this.getdataserviesobj = function()
           {
             var dataseriesobj =new dataseries();  
             dataseriesobj.addtype(canvasEnum.LINE_TYPE);
             dataseriesobj.addcolor(canvasEnum.WINDOWLINE_COLOR);  
             return dataseriesobj;  
           }
          
          this.setwindowpoints = function(x1,y1,x2,y2)
          {
              this.windowregion.setvalues(x1,y1,x2,y2);
          }
          
          //Update the canvasobj with new window coordinates.
          this.draw = function(drawobj)
          {
             xmin = this.windowregion.xmin; 
             ymin = this.windowregion.ymin; 
             xmax = this.windowregion.xmax; 
             ymax = this.windowregion.ymax; 
    
             //xaxis line1  
             dataseriesobj = this.getdataserviesobj();
             dataseriesobj.adddatapoint(xmin,CORD_ZERO);
             dataseriesobj.adddatapoint(xmin,GRAPH_SIZE); 
             drawobj.addDatatoDataseries(dataseriesobj); 
             
             //xaxis line2 
             dataseriesobj = null;
             dataseriesobj = this.getdataserviesobj();
             dataseriesobj.adddatapoint(xmax,CORD_ZERO);
             dataseriesobj.adddatapoint(xmax,GRAPH_SIZE); 
             drawobj.addDatatoDataseries(dataseriesobj);
              
             //yaxis line1  
             dataseriesobj = null;
             dataseriesobj = this.getdataserviesobj();  
             dataseriesobj.adddatapoint(CORD_ZERO,ymin);
             dataseriesobj.adddatapoint(GRAPH_SIZE,ymin);  
             drawobj.addDatatoDataseries(dataseriesobj);
              
              //yaxis line2 
             dataseriesobj = null;
             dataseriesobj = this.getdataserviesobj();  
             dataseriesobj.adddatapoint(CORD_ZERO,ymax);
             dataseriesobj.adddatapoint(GRAPH_SIZE,ymax);  
             drawobj.addDatatoDataseries(dataseriesobj); 
            
         }
      };
