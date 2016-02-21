/*
  drawLine class will draw the line in the canvas graph
  Input : 
  cordinates of a line
*/
var drawLine = function(pointcoord){
         this.linecordinates = pointcoord;
         this.setlinepoints = function(ax1,ay1,ax2,ay2)
         {
            this.linecordinates.setvalues(ax1,ay1,ax2,ay2);
         }
         
         this.getdataserviesobj = function()
           {
             var dataseriesobj =new dataseries();  
             dataseriesobj.addtype(canvasEnum.LINE_TYPE);
             dataseriesobj.addcolor(canvasEnum.LINE_COLOR);  
             return dataseriesobj;  
           }
         
         this.draw =function(drawobj)
          {
             console.log("draw");
             dataseriesobj = this.getdataserviesobj();
             dataseriesobj.adddatapoint(this.linecordinates.xmin,this.linecordinates.ymin);
             dataseriesobj.adddatapoint(this.linecordinates.xmax,this.linecordinates.ymax); 
             drawobj.addDatatoDataseries(dataseriesobj);  
          }
      
      };