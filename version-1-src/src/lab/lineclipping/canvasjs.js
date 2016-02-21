


/*Class uses canvasjs library to draw the grpah and lines
  Input Data structure of canavas library will be in below format
   { 
   	title: {
			text: "Adding & Updating dataPoints"
		   },
		data: [
		{
			type: "line",
			dataPoints: [
				{ x:10 ,y: 10 },
				{ x:20, y: 20 },
				
			]
		}
		]
	});
    data will have dataseries and dataseries will have datapoints
*/
var canvasadapter = function(){
    
    this.fstring = null;
    this.dataseries = [];
    this.datacanvas = null;   
    this.chart = null;
    this.xaxis;
    this.yaxis;
    
    this.addtitle=function(graphtitle)    
    {
        this.fstring = {text:graphtitle};
    }
   
    this.graphsize = function(size)
    {
        this.xaxis = {minimum:0,maximum:size,viewportMinimum :0,viewportMaximum:size,gridThickness : 0};
        this.yaxis = {minimum:0,maxmimum:size,viewportMinimum :0,viewportMaximum:size};
    }
    
    this.addDatatoDataseries=function(clipdataseries)
    {
        this.dataseries.push(this.getdataseriesobject(clipdataseries));        
    }
    
    this.createchart=function(){
        
        //console.log(this.xaxis);
        datacanvas = { axisX:this.xaxis,
                       axisY:this.yaxis, 
                       title : this.fstring, 
                       data : this.dataseries
                     }
        this.chart = new CanvasJS.Chart("chartContainer",datacanvas);
        
    }
    this.getdataseriesobject=function(clipdataseries){
        return ({type: clipdataseries.type,
        dataPoints: clipdataseries.datapoints,
        indexlabel:clipdataseries.indexLabel});
    }
    this.draw=function()
    {
        this.chart.render();
    }
      
  };
  


var dataseries =function()
  {
      this.type = '';
      this.datapoints = [];
      this.color = '';
      this.indexLabel ;
      
      this.addtype=function(intype)
      {
          this.type = intype;
      }
      this.addcolor=function(colorstring)
      {
          this.color = colorstring;
          
      }
      this.adddatapoint=function(x1,y1)
       {
           this.datapoints.push({x:x1,y:y1});
       }
  };
