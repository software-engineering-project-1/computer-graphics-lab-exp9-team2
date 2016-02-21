/*
coherlineclipping class implements Cohen-Sutherland algorithm.
Pre-condition: Canvas graph has already been drawn with window and line before creating coherlineclipping class
INPUT:
window coordinates
line coordinates

OutPut:
clipdata :line coordinates with in the window region
startintersectdata:removed line cordinates till startingpoint lies with in the window region 
endintersectdata:removed line coordinates till endingpoint lies with in the window region
------------------
Provided iterator functionality to see step by step  process of Cohen-Sutherland algorithm.
nextclippingaction
previousclippingaction
*/
var coherlineclipping=function(windowobj,lineobj)
         {
                
           this.windowcordinates = windowobj.windowregion;
           this.linecordinates =   lineobj.linecordinates;  
           
           this.startintersectdata= [];
           this.endintersectdata = [];
           this.clipdata =[];    
           
           this.startpointiterator=null;
           this.endpointiterator=null;  
           
           this.startpoint = [];
           this.endpoint = [];
           this.nanexpo = false;  
         
           // line slope
           if((this.linecordinates.xmax - this.linecordinates.xmin)==0) this.nanexpo = true;
           this.slope =(this.linecordinates.ymax - this.linecordinates.ymin)/(this.linecordinates.xmax - this.linecordinates.xmin);
                        
           //find constant 'c' by substituting one of the end points for x and y
           this.sconst = this.linecordinates.ymin - this.slope*this.linecordinates.xmin;
           
           //Find the opcode for the given point  
           this.setpointcode =function(point)
			 {
				outcode = '';

				x = point[0];
				y = point[1];

				if(y > this.windowcordinates.ymax)
					outcode = outcode + '1';
				else
					outcode = outcode + '0';

				if(y < this.windowcordinates.ymin)
					outcode = outcode + '1';
				else
					outcode = outcode + '0';

				if(x > this.windowcordinates.xmax)
					outcode = outcode + '1';
				else
					outcode = outcode + '0';

				if(x < this.windowcordinates.xmin)
					outcode = outcode + '1';
				else
					outcode = outcode + '0';

				return outcode.slice();
			 } 
             
           //Find both the points with in the window region or completely outside the window region
           this.clippingRequired=function(startOpcode,endOpcode)
             {
                if(startOpcode == '0000' && endOpcode == '0000' )
                   {
                       this.clipdata.push(this.linecordinates);
                       return false;
                   }
                else if(((parseInt(startOpcode, 2) | parseInt(endOpcode,2)) != 15 ) &(parseInt(startOpcode, 2) & parseInt(endOpcode,2)) !=0 )
                    {
                        this.startintersectdata.push(this.linecordinates);
                        return false;
                    }
                else
                    return true;
              }
           
             //update intersect data based on the point region
             this.updateintersectdata = function(region,point,intersectcord)
             {
                if(region === regionEnum.START)
                   this.startintersectdata.push(new coordinates(point[0],point[1],intersectcord[0],intersectcord[1]));
                else
                   this.endintersectdata.push(new coordinates(point[0],point[1],intersectcord[0],intersectcord[1]));
                    
             }
             //Clip the line till it finds the intersecting point of the window region             
             this.startclipping= function(inpoint,pointopcode,region)
             {
                var intersectcord = [];
                var point = [];
                point = inpoint;
                while(parseInt(pointopcode,2) != 0)
                    {
                      if(pointopcode.charAt(0) == '1')
                         {
                           intersectcord.length =0;
                           if(this.nanexpo)
                             intersectcord[0] = point[0];
                            else
                             intersectcord[0] =  (this.windowcordinates.ymax - this.sconst)/this.slope 
                            
					        intersectcord[1] = this.windowcordinates.ymax;
                            this.updateintersectdata(region,point.slice(),intersectcord.slice()); 
                            point = intersectcord.slice();
                            pointopcode = this.setpointcode(point);   
                          }
                         if(pointopcode.charAt(1) == '1')
                             {
                               
                                intersectcord.length =0;  
                                if(this.nanexpo)
                                  intersectcord[0] = point[0];
                                else
                                  intersectcord[0] =  (this.windowcordinates.ymin - this.sconst)/this.slope 
                                
					            intersectcord[1] = this.windowcordinates.ymin;
                                this.updateintersectdata(region,point.slice(),intersectcord.slice());  
                                point = intersectcord.slice();
                                pointopcode = this.setpointcode(point);  
                             }
                        if(pointopcode.charAt(2) == '1')
                            {
                                intersectcord.length =0; 
                                intersectcord[0] = this.windowcordinates.xmax;
					            intersectcord[1] = Math.ceil((this.slope * this.windowcordinates.xmax + this.sconst));
                                this.updateintersectdata(region,point.slice(),intersectcord.slice());  
                                point = intersectcord.slice();
                                pointopcode = this.setpointcode(point); 
                            }
                        if(pointopcode.charAt(3) == '1')
                            {
                                intersectcord.length =0; 
                                intersectcord[0] = this.windowcordinates.xmin;
					            intersectcord[1] = Math.ceil((this.slope * this.windowcordinates.xmin + this.sconst));
                                this.updateintersectdata(region,point.slice(),intersectcord.slice());  
                                point = intersectcord.slice();
                                pointopcode = this.setpointcode(point); 
                            }
                     }
                    return  point.slice();
                 }
                /*Algorithm process starts from here - 
                 ==> calculate the start and end point opcode 
                 ==> Find whether start and end point opcode lies with in or  out side the region
                 ==> if clipping is required find the line cordinates with in the region and cordinates lies outside*/
                this.startcoherProcess = function(){
                      var startcode = this.setpointcode([parseInt(this.linecordinates.xmin),parseInt(this.linecordinates.ymin)]);
                      var endcode = this.setpointcode([parseInt(this.linecordinates.xmax),parseInt(this.linecordinates.ymax)]);
                                      
                     if(this.clippingRequired(this.startcode,this.endcode))   
                        {
                        this.startpoint = this.startclipping([this.linecordinates.xmin,this.linecordinates.ymin],startcode.slice(),regionEnum.START);
                        this.endpoint = this.startclipping([this.linecordinates.xmax,this.linecordinates.ymax],endcode.slice(),regionEnum.END);
                        this.clipdata.push(new coordinates(this.startpoint[0],this.startpoint[1],this.endpoint[0],this.endpoint[1]))
                        }
                        console.log("clipdata"+this.clipdata.length);
                        console.log("enddata"+this.endintersectdata.length);
                        console.log("startdata"+this.startintersectdata.length);
                    }
                //return the dataseries object supported by canvasJS
                this.getdataserviesobj=function(linecord)
                {
                    var dataseriesobj =new dataseries(); 
                    dataseriesobj.adddatapoint(linecord.xmin,linecord.ymin);
                    dataseriesobj.adddatapoint(linecord.xmax,linecord.ymax);
                    dataseriesobj.addtype(canvasEnum.LINE_TYPE);
                    return dataseriesobj;
                }
                //Intializes the iterator
                this.startlineiterator=function(adapterobj)
                    {
                        if(this.lineiterator!=null)this.lineiterator=null;
                        if(this.startintersectdata.length ==0 && this.endintersectdata.length ==0)
                        {
                            dataseriesobj = this.getdataserviesobj(this.clipdata[0]);
                            dataseriesobj.addcolor(canvasEnum.LINE_COLOR_INSIDE);
                            adapterobj.addDatatoDataseries(dataseriesobj);
                            adapterobj.createchart();
                            adapterobj.draw();
                      
                        }
                        else if(this.clipdata.length ==0 )
                        {
                            dataseriesobj = this.getdataserviesobj(this.startintersectdata[0]);
                            dataseriesobj.addcolor(canvasEnum.LINE_COLOR_OUTSIDE);
                            adapterobj.addDatatoDataseries(dataseriesobj);
                            adapterobj.createchart();
                            adapterobj.draw();
                        }
                        else
                        {
                           if(this.startintersectdata.length > 0)
                              this.startpointiterator = new Iterator(this.startintersectdata.slice());
                           if(this.endintersectdata.length >0)
                              this.endpointiterator = new Iterator(this.endintersectdata.slice());
                        }
                    }
                //For previous operation - remove the already existing data points
                this.takeoutCanvasdataseries = function(adapterobj)
                {
                    datasize = adapterobj.dataseries.length;
                    if(adapterobj.dataseries[datasize-1].name === regionEnum.CLIP)
                      {
                        adapterobj.dataseries.pop();     
                        adapterobj.createchart();
                        adapterobj.draw();
                        return true;     
                      }
                     else
                         return false;
                      
                }
                
                this.previousclippingaction = function(adapterobj)
                {
                    
                    if((this.startpointiterator != null) && (this.endpointiterator != null))
                        {
                            if(this.endpointiterator.hasPrevious())
                            {
                              if(this.takeoutCanvasdataseries(adapterobj))
                              {
                                this.endpointiterator.previous();     
                              }
                               
                            }
                            else if(this.startpointiterator.hasPrevious())    
                            {
                               if(this.takeoutCanvasdataseries(adapterobj))
                                {
                                this.startpointiterator.previous();     
                                }
                            }
                        }
                    else if((this.endpointiterator != null) && (this.startpointiterator == null ))
                        {
                            if(this.endpointiterator.hasPrevious())
                            {
                              if(this.takeoutCanvasdataseries(adapterobj))
                              {
                                this.endpointiterator.previous();     
                              }
                            }
                        }
                    else if((this.startpointiterator != null) && (this.endpointiterator == null ))
                        {
                            
                            if(this.startpointiterator.hasPrevious())    
                            {
                                if(this.takeoutCanvasdataseries(adapterobj))
                                {
                                this.startpointiterator.previous();     
                                }
                            }
                        }
                }
                //add the dataseries object supported  by canvasJS
                this.addclipCanvasdataseries = function(dataseriesobj,adapterobj)
                {
                    dataseriesobj.addcolor(canvasEnum.LINE_COLOR_OUTSIDE);
                    dataseriesobj.addname(regionEnum.CLIP);
                    adapterobj.addDatatoDataseries(dataseriesobj);
                    adapterobj.createchart();
                    adapterobj.draw();   
                }
                //remove all dataseries and restart the clipping step
                this.removeclipCanvasdataseries = function(adapterobj)
                {
                    datasize = adapterobj.dataseries.length;
                    
                    while(adapterobj.dataseries[datasize-1].name === regionEnum.CLIP)
                    {
                      adapterobj.dataseries.pop();
                      datasize = adapterobj.dataseries.length;   
                    }
                    adapterobj.createchart();
                    adapterobj.draw();
                }
                this.nextclippingaction =function(adapterobj)
                   {
                     if((this.startpointiterator != null) && (this.endpointiterator != null))
                     {
                        if(this.startpointiterator.hasNext())
                            {
                              this.addclipCanvasdataseries(this.getdataserviesobj(this.startpointiterator.next()),adapterobj);
                            }
                         else if(this.endpointiterator.hasNext())
                           {
                              this.addclipCanvasdataseries(this.getdataserviesobj(this.endpointiterator.next()),adapterobj);
                           }
                         else 
                           {
                               this.removeclipCanvasdataseries(adapterobj);
                               this.startpointiterator.reset();
                               this.endpointiterator.reset();
                           }
                                               
                    }
                    else if((this.startpointiterator != null) && (this.endpointiterator == null ))
                    {
                         if(this.startpointiterator.hasNext())
                            {
                              this.addclipCanvasdataseries(this.getdataserviesobj(this.startpointiterator.next()),adapterobj);    
                            }
                        else{
                               this.removeclipCanvasdataseries(adapterobj);
                               this.startpointiterator.reset();
                            }
                    }
                    else if((this.endpointiterator !=null) && (this.startpointiterator == null))
                    {
                        if(this.endpointiterator.hasNext())
                           {
                              this.addclipCanvasdataseries(this.getdataserviesobj(this.endpointiterator.next()),adapterobj);
                           }
                         else 
                           {
                               this.removeclipCanvasdataseries(adapterobj);
                               this.endpointiterator.reset();
                            }
                   }
                }
            };
       