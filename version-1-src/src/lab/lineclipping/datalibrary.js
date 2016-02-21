      const CORD_ZERO = 0;
      const GRAPH_SIZE = 400;
      
      var GraphEnum = {
        LINE: 1,
        POLYGON: 2,
       
      }
      
      var WindowEnum = {
          DEFAULT : 1,
          UPDATE :  2
          
      }
      
      var regionEnum = {
          IN : 1,
          OUT: 2,
          START:3,
          END:4,
          CLIP:5
      }
      
      var canvasEnum = {
          TITLE_LINECLIPPING:"line clipping",
          LINE_TYPE : "line",
          WINDOWLINE_COLOR: "DarkSlateBlue",
          LINE_COLOR:"CornflowerBlue",
          LINE_COLOR_INSIDE:"ForestGreen",
          LINE_COLOR_OUTSIDE:"DimGray"
          
      }
      
      var coordinates = function(x1,y1,x2,y2)
      {
          this.xmin=x1;
          this.xmax=x2;
          this.ymin=y1;
          this.ymax=y2; 
          
          this.setvalues=function(x1,y1,x2,y2)
          {
              this.xmin = x1;
              this.ymin= y1;
              this.xmax = x2;
              this.ymax = y2;
          }
      };     
      
      var dataseries =function()
      {
      this.type = '';
      this.datapoints = [];
      this.color = '';
      this.indexLabel ;
      this.name='';
      
      this.addtype=function(intype)
      {
          this.type = intype;
      }
      this.addcolor=function(colorstring)
      {
          this.color = colorstring;
          
      }
      this.addname=function(namestr)
      {
          this.name = namestr;
      }
      this.adddatapoint=function(x1,y1)
       {
           this.datapoints.push({x:x1,y:y1});
       }
      
      };
  
      
      

