/*
   ==>Adapter class to use the canvasJS library
   ==>Input Data structure of canavas library will be in below format
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
   
   ==> data will have dataseries and dataseries will have datapoints
*/    
var canvasadapter = function(){
    
    this.stitle = null;
    this.dataseries = [];
    this.datacanvas = null;   
    this.chart = null;
    this.xaxis=null;
    this.yaxis=null;
        
    
    this.addtitle=function(graphtitle)    
    {
        this.stitle = {text:graphtitle};
    }
   
    //Setting canvas graph size
    this.graphsize = function(size)
    {
        this.xaxis = {minimum:0,maximum: size,viewportMinimum :0,viewportMaximum:size,gridThickness : 0};
        this.yaxis = {minimum:0,maxmimum:size,viewportMinimum :0,viewportMaximum:size,gridThickness : 0};
    }
   
    //Adding drawable dataseries sets to canvas dataseries.
    this.addDatatoDataseries=function(clipdataseries)
    {
        this.dataseries.push(this.getdataseriesobject(clipdataseries));        
    }
    
    //with available canvas data create canvasjs object
    this.createchart=function(){
        
        
        datacanvas = { axisX:this.xaxis,
                       axisY:this.yaxis, 
                       title : this.stitle, 
                       data : this.dataseries
                     }
        this.chart = new CanvasJS.Chart("chartContainer",datacanvas);
        
    }
    //will return the dataseries object in the format expected by canvasjs    
    this.getdataseriesobject=function(clipdataseries)
    {
        return (
                {
                 name:clipdataseries.name,
                 type: clipdataseries.type,
                 color:clipdataseries.color,
                 dataPoints: clipdataseries.datapoints,
                 indexlabel:clipdataseries.indexLabel
                });
    }
   
    this.draw=function()
    {
        if(this.chart!=null)
          this.chart.render();
    }
    
    this.cleardataSeries=function()
    {
        this.dataseries = [];
        
    }
      
  };
      
