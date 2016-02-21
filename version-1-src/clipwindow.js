   var clipwindow = function(){
          this.chart =null;
          this.xmin = 0;
          this.xmax = 0;
          this.ymin = 0;
          this.ymax = 0;
          this.rowmindps = [];
          this.rowmaxdps = [];
          this.colmindps = [];
          this.colmaxdps = [];
          this.linedps =[];
          this.clipdatadps = [];
          this.cliplinedps = [];
          this.finalclipdps = [];
          this.clipdataenddps = [];
          this.initializechart = function (){
              this.chart = new CanvasJS.Chart("chartContainer", {
              axisX:{
                       minimum: 0,
                       maximum: 400
                  
                     },   
              axisY:{
                       minimum: 0,
                       maximum: 400,
                       gridThickness : 0
                    },
              data:[{
                      type: "line",
                      color: "DarkSlateBlue",
                      indexLabel: "ymin : {y}",
                      indexLabelOrientation: "vertical",
                      indexLabelFontSize: 12,
                      dataPoints: this.rowmindps
                    },
                    {
                      type: "line",
                      color: "DarkSlateBlue",
                      indexLabel: "ymax: {y}",
                      indexLabelOrientation: "vertical",
                      indexLabelFontSize: 12,    
                      dataPoints: this.rowmaxdps
                    },
                    {
                      type: "line",
                      color: "DarkSlateBlue",                            
                      indexLabel: "xmin: {x}",
                      indexLabelFontSize: 12,
                      dataPoints: this.colmindps
                    },
                    {
                      type: "line",
                      color: "DarkSlateBlue",
                      indexLabel: "xmax: {x}",
                      indexLabelFontSize: 12,  
                      dataPoints: this.colmaxdps
                    },
                    {
                      type: "line",
                      color: "CornflowerBlue",
                      indexLabel: "({x},{y})",
                      indexLabelFontSize: 12,    
                      dataPoints: this.linedps
                    },
                    {
                      type: "line",
                      color: "DimGray",
                      indexLabel: "({x},{y})",
                      indexLabelFontSize: 12,     
                      dataPoints: this.clipdatadps
                    },
                    {
                      type: "line",
                      indexLabel: "({x},{y})",
                      color: "FloralWhite", 
                      indexLabelFontSize: 12,     
                      dataPoints: this.finalclipdps
                    },
                    {
                      type: "line",
                      indexLabel: "({x},{y})",
                      color: "DimGray", 
                      indexLabelFontSize: 12,     
                      dataPoints: this.clipdataenddps
                    }
                   ]
             });     
               
      }
       this.drawcanvas= function(){      
                        
           this.rowmindps.length =0;
           this.rowmaxdps.length =0;
           this.colmindps.length =0;
           this.colmaxdps.length =0;
           this.linedps.length = 0;
           this.clipdatadps.length = 0;
           this.cliplinedps.length = 0;
           this.finalclipdps.length = 0;
           this.clipdataenddps.length = 0;  
           
           this.colmindps.push({x:this.xmin,y:0},{x:this.xmin,y:400});
           this.colmaxdps.push({x:this.xmax,y:0},{x:this.xmax,y:400});
           this.rowmindps.push({x:0,y:this.ymin},{x:400,y:this.ymin});
           this.rowmaxdps.push({x:0,y:this.ymax},{x:400,y:this.ymax});  
           
           this.chart.render();     
        }      
      this.defaultwindow = function(){
          
          document.getElementById("xmin").value = 100;
          document.getElementById("ymin").value = 100;
          document.getElementById("xmax").value = 300;
          document.getElementById("ymax").value = 300;
          this.xmin = parseInt(document.getElementById("xmin").value);
          this.xmax = parseInt(document.getElementById("xmax").value);
          this.ymin = parseInt(document.getElementById("ymin").value);
          this.ymax = parseInt(document.getElementById("ymax").value);
                    
          this.initializechart();
          this.drawcanvas();
      }
      
      this.updatewindow = function(){
                 console.log('update window');
                 if(parseInt(document.getElementById("xmin").value) <= parseInt(document.getElementById("xmax").value) && parseInt(document.getElementById("ymin").value) <= parseInt(document.getElementById("ymax").value))
                  {
                      
                      this.xmin = parseInt(document.getElementById("xmin").value);
                      this.xmax = parseInt(document.getElementById("xmax").value);
                      this.ymin = parseInt(document.getElementById("ymin").value);
                      this.ymax = parseInt(document.getElementById("ymax").value);
                      this.drawcanvas();
                      
                      return true;
                  }
               return false;
      }
      
      };