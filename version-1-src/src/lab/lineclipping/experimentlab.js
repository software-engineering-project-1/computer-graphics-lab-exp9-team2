var experimentLab = function(objwindow,start,end){
            
             this.startOpcode = null;
             this.endOpcode = null;
             this.resultstart = [];
             this.resultend = [];
             this.slope = 0;
             this.sconst = 0;
             this.intersections_list = [];
             this.setpointcode =function(point)
			 {
				outcode = '';

				x = point[0];
				y = point[1];

				if(y > objwindow.ymax)
					outcode = outcode + '1';
				else
					outcode = outcode + '0';

				if(y < objwindow.ymin)
					outcode = outcode + '1';
				else
					outcode = outcode + '0';

				if(x > objwindow.xmax)
					outcode = outcode + '1';
				else
					outcode = outcode + '0';

				if(x < objwindow.xmin)
					outcode = outcode + '1';
				else
					outcode = outcode + '0';

				return outcode;
			 }
             this.clippingRequired=function(){
                if(this.startOpcode == '0000' && this.endOpcode == '0000' )
                   {
                       objwindow.cliplinedps.length=0;
                       objwindow.cliplinedps.push({x:parseInt(this.resultstart[0]),y:parseInt(this.resultstart[1])},{x:parseInt(this.resultend[0]),y:parseInt(this.resultend[1])});
                       return false;
                   }
                else if(((parseInt(this.startOpcode, 2) | parseInt(this.endOpcode,2)) != 15 ) &(parseInt(this.startOpcode, 2) & parseInt(this.endOpcode,2)) !=0 )
                    {
                        objwindow.clipdatadps.length =0;
                        objwindow.clipdatadps.push({x:parseInt(this.resultstart[0]),y:parseInt(this.resultstart[1])},{x:parseInt(this.resultend[0]),y:parseInt(this.resultend[1])});
                        return false;
                    }
                else
                    return true;
                
            }
            this.addintersectiondata = function(start,end,region)
            {
                this.intersections_list.push(new intersectdata(start.slice(),end.slice(),region))
               // this.intersections_list.push([start,end]);
            }
            this.dolineclipping = function(inpoint,pointopcode,region){
                
                var intersectcord = [];
                var point = [];
                    point = inpoint;
               // this.intersections_list.push([pointopcode,point]);
                console.log("first"+this.intersections_list);
                while(parseInt(pointopcode,2) != 0)
                    {
                       
                         if(pointopcode.charAt(0) == '1')
                               {
                                console.log(parseInt(pointopcode,2));
                                intersectcord.length =0;    
                                intersectcord[0] = Math.ceil((objwindow.ymax - this.sconst)/this.slope);
					            intersectcord[1] = objwindow.ymax;
                                //this.intersections_list.push([{x:parse.int(point[0]),y:point[1]},{x:intersectcord[0],y:intersectcord[1]}]);
                                this.addintersectiondata(point.slice(),intersectcord.slice(),region);
                                console.log("ymax"+point,intersectcord,region);
                                
                                point = intersectcord.slice();
                                pointopcode = this.setpointcode(point);   
                               }
                         if(pointopcode.charAt(1) == '1')
                             {
                                intersectcord.length =0;  
                                intersectcord[0] = Math.ceil((objwindow.ymin - this.sconst)/this.slope);
					            intersectcord[1] = objwindow.ymin;
                                this.addintersectiondata(point.slice(),intersectcord.slice(),region);
                                console.log("ymin"+point,intersectcord);
                                point = intersectcord.slice();
                          
                                pointopcode = this.setpointcode(point);  
                             }
                        if(pointopcode.charAt(2) == '1')
                            {
                                intersectcord.length =0; 
                                intersectcord[0] = objwindow.xmax;
					            intersectcord[1] = Math.ceil((this.slope * objwindow.xmax + this.sconst));
                                this.addintersectiondata(point.slice(),intersectcord.slice(),region);

                                console.log("xmax"+point.slice(),intersectcord.slice());
                                point = intersectcord.slice();
                               
                                pointopcode = this.setpointcode(point); 
                            }
                        if(pointopcode.charAt(3) == '1')
                            {
                                intersectcord.length =0; 
                                intersectcord[0] = objwindow.xmin;
					            intersectcord[1] = Math.ceil((this.slope * objwindow.xmin + this.sconst));
                                this.addintersectiondata(point.slice(),intersectcord.slice(),region);
                                console.log("xmin"+point,intersectcord);
                                point = intersectcord.slice();
                                
                                pointopcode = this.setpointcode(point); 
                            }
                        
                    }
                            
                      return  point.slice();
                              
            }
            this.startlineExperiment = function(){
                this.startOpcode = this.setpointcode(start);
                this.endOpcode = this.setpointcode(end);
                
                this.resultstart = start;
                this.resultend = end;
                this.intersections_list.length =0;
                objwindow.linedps.push({x:parseInt(start[0]),y:parseInt(start[1])},{x:parseInt(end[0]),y:parseInt(end[1])});
                objwindow.chart.render();
                console.log("drawnline");
                if(this.clippingRequired())
                    {
                         this.slope = (end[1]-start[1])/(end[0]-start[0]);

				         //find constant 'c' by substituting one of the end points for x and y
				         this.sconst = start[1] - this.slope*start[0];
                    
                         console.log("slope :"+ this.slope);
                         if(this.startOpcode == '0000')
                          {
                            this.resultend = this.dolineclipping(end,this.endOpcode,"end");
                             objwindow.cliplinedps.length =0;  
                             objwindow.cliplinedps.push({x:parseInt(start[0]),y:parseInt(start[1])},{x:parseInt(this.resultend[0]),y:parseInt(this.resultend[1])}); console.log("this.startOpcode is 0000");    
                              
                          }
                          else if(this.endOpcode == '0000')
                          {
                            this.resultstart = this.dolineclipping(start,this.startOpcode,"start");
                             objwindow.cliplinedps.length =0;    
                            objwindow.cliplinedps.push({x:parseInt(this.resultstart[0]),y:parseInt(this.resultstart[1])},{x:parseInt(end[0]),y:parseInt(end[1])});   
                            console.log("this.endOpcode is 0000");       
                          }
                          else
                          {
                            console.log("both are non 0000");  
                            this.resultstart = this.dolineclipping(start.slice(),this.startOpcode,"start");
                            this.resultend = this.dolineclipping(end.slice(),this.endOpcode,"end");
                            objwindow.cliplinedps.length =0;  
                            objwindow.cliplinedps.push({x:parseInt(this.resultstart[0]),y:parseInt(this.resultstart[1])},{x:parseInt(this.resultend[0]),y:parseInt(this.resultend[1])});  
                         }
                    }
             console.log(this.intersections_list);
            
            }
      };