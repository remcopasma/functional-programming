d3.json("log.json").then(function(data){
  window.data = data
  makeLineChart(data)
})

const svg = d3.select("body").append("svg")
const chart = svg
.append("g")
.attr("class","chart")
.attr("transform","translate(50,50)")
const height = 500;
const width = 1200;
const margin = {top: 50, bottom: 50, left: 50, right: 50}

let tooltip = d3.select("body")
                        .append("div")
                        .style("position", "absolute") 
                        .style("z-index", "10")
                        .style("visibility", "hidden")

function makeLineChart(data){ // Line chart aanmaken
        const parseDate = d3.timeParse("%Y")
       
       // x as 
        var xScale = d3.scaleTime()
                .domain( d3.extent(data,function(d){return parseDate (d.jaartal)})) 
                .range([0, width])
    
        // y as 
        var yScale = d3.scaleLinear()
                .domain([0, d3.max(data,function(d){return d.aantalBoeken})]) 
                .range([height, 0]) 
    
        var line = d3.line()
        .x(function(d, i) { return xScale(parseDate(d.jaartal)) }) 
        .y(function(d) { return yScale(d.aantalBoeken)}) 
        .curve(d3.curveMonotoneX) 

        chart.append('path')
        .attr("d", line(data))
        .attr('fill','none')
        .attr('stroke','red')

        chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

        chart.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale));

        chart.append("text")
        .text("Jaartal")
        .attr("class","labelx")

        chart.append("text")
        .text("Aantal Boeken")
        .attr("class","labely")

        chart.append("text")
        .text("Aantal engelse boeken vanaf het jaar 2010 gezocht op het woord music")
        .attr("class","titel")

        chart.selectAll(".dot")
        .data(data)
        .enter().append("circle") 
        .attr("class", "dot") 
        .attr("cx", function(d, i) { return xScale(parseDate(d.jaartal)) })
        .attr("cy", function(d) { return yScale(d.aantalBoeken)})
        .attr("r", 5)
        .on("mouseover", mouseOver)
        .on("mousemove", mouseMove)
        .on("mouseout", mouseOut)

        function mouseMove(){
                return tooltip.style("top", 
                (event.pageY-10)+"px").style("left",
                (event.pageX+10)+"px");
        }

        function mouseOver(d){
                return tooltip
                .style("visibility", "visible")
                .text(d.jaartal + " = " + d.aantalBoeken + ' Boeken'), 
                d3.select(this).attr('opacity', '0.5')
        
        }

        function mouseOut(){
                return tooltip.style("visibility", "hidden"),
                d3.select(this).attr('opacity', '1')
        } 

        // data manipulatie
        console.log(sortdata(data))
        }
       
        function sortdata(data){
        return data.sort(function(x, y){
                        return d3.ascending(x.aantalBoeken, y.aantalBoeken);
                })
        }