import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Event } from '../../models/event';
import { SearchCriteria } from '../../models/event';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3TimeFormat from 'd3-time-format';
import * as d3timelines from 'd3-timelines';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    searchCriteria = new SearchCriteria();
    temperatures = [{'id': 0,'values': []}];
    positions: any[] = [];
    temperatureLine: any;
    data: any;
    svg: any;
    margin = {top: 20,right: 80,bottom: 30,left: 50};
    graphArea: any;
    width: number;
    height: number;
    xAxis;
    yAxis;
    chromaticColor;
    line;
    clinicName = '';
    legendColor;
    boxes = []
    events: Event[];

    constructor(private dashboardService: DashboardService) {}

    ngOnInit() {
        this.fetchBoxes();
    }

    fetchBoxes(){
        this.dashboardService.fetchBoxes().subscribe(data => {
            this.boxes = data.json();
            console.log(this.boxes);
            this.searchCriteria.boxId = this.boxes[0];
            this.fetchEvents();
        })
    }

    fetchEvents(startTime ? : string, endTime ? : string, boxId ? : number) {
    this.temperatures = [{
    'id': 101,
    'values': []
    }];
    this.positions = [];
    d3.selectAll("svg > *").remove();
    d3.select(".tooltip").remove();
    d3.selectAll("#timeline1 > *").remove();
    this.dashboardService.getEvents(this.searchCriteria.startTime, this.searchCriteria.endTime,
    this.searchCriteria.boxId).subscribe(data => {
    this.events = data.json();
    let positionEvents = [];
    this.events.forEach(element => {
        if (element.eventType === 'Position' && element.locationDTO) {
            positionEvents.push(element);
        } else if (element.eventType === 'Temperatur') {
            this.temperatures[0].values.push({
                'date': new Date(element.timestamp),
                'temperature': element.value
            });
        }
    });
    positionEvents.forEach(element => {
        this.positions.push({
            label1: element.locationDTO.clinicname,
            times: [{
            "starting_time": moment.tz(element.timestamp, "UTC").valueOf(),
            "ending_time": moment.tz(element.timestamp, "UTC").valueOf()
            }]
        });
    });
    this.data = this.temperatures.map((v) => v.values.map((v) => v.date))[0];
    this.initChart();
    this.drawAxis();
    this.drawPath();
    this.drawCircle();
    var self = this;
    var chart = d3timelines.timelines()
        .tickFormat({
            format: d3TimeFormat.timeFormat("%I:%M"),
            tickTime: d3timelines.timeHours,
            tickInterval: 1,
            tickSize: 30,
            xScale: 30
        })
        .hover(function(d, i, datum) {
            // d is the current rendering object
            // i is the index during d3 rendering
            // datum is the id object
            var colors = chart.colors();
            // div.find('.coloredDiv').css('background-color', colors(i))
            // div.find('#name').text(datum.label);
            self.legendColor = colors(i);
            self.clinicName = datum.label1;
        })
        .display("circle"); // toggle between rectangles and circles
        var svg = d3.select("#timeline1").append("svg").attr("width", 500)
            .datum(this.positions).call(chart);
        })
    }

    initChart(): void {
        this.svg = d3.select('svg');

        this.width = this.svg.attr('width') - this.margin.left - this.margin.right;
        this.height = this.svg.attr('height') - this.margin.top - this.margin.bottom;

        this.graphArea = this.svg.append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

        this.xAxis = d3Scale.scaleTime().range([0, this.width]);
        this.yAxis = d3Scale.scaleLinear().range([this.height, 0]);
        this.chromaticColor = d3Scale.scaleOrdinal(d3ScaleChromatic.schemeCategory10);

        this.line = d3Shape.line()
        // .curve(d3Shape.curveBasis)
        .x((d: any) => this.xAxis(d.date))
        .y((d: any) => this.yAxis(d.temperature));

        this.xAxis.domain(d3Array.extent(this.data, (d: Date) => d));

        this.yAxis.domain([
            d3Array.min(this.temperatures, function(c) {
                return d3Array.min(c.values, function(d) {
                return d.temperature;
                });
            }),
            d3Array.max(this.temperatures, function(c) {
                return d3Array.max(c.values, function(d) {
                return d.temperature;
                });
            })
        ]);

        this.chromaticColor.domain(this.temperatures.map(function(c) {
            return c.id;
        }));
    }

    private drawAxis(): void {
        this.graphArea.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + this.height + ')')
        .call(d3Axis.axisBottom(this.xAxis));

        this.graphArea.append('g')
        .attr('class', 'axis axis--y')
        .call(d3Axis.axisLeft(this.yAxis))
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        //.attr('fill', '#000')
        .text('Temperature, ºF');
    }
    
    private drawPath(): void {
        this.temperatureLine = this.graphArea.selectAll('.city')
        .data(this.temperatures)
        .enter().append('g')
        .attr('class', 'city');

        this.temperatureLine.append('path')
        .attr('class', 'line')
        .attr('d', (d) => this.line(d.values))
        .attr('fill', 'none')
        .style('stroke', (d) => this.chromaticColor(d.id));

        this.temperatureLine.append('text')
        .datum(function(d) {
            return {
                id: d.id,
                value: d.values[d.values.length - 1]
            };
        })
        // .attr('transform', (d) => 'translate(' + this.xAxis(d.date) + ',' + this.yAxis(d.temperature) + ')')
        .attr('x', 3)
        .attr('dy', '0.35em')
        .style('font', '10px sans-serif')
        .text(function(d) {
            return d.id;
        });
        this.temperatureLine.selectAll("circle")
        .data( function(d) {return(d.values);} )
        .enter()
        .append("circle")
        .attr("class","tipcircle")
        .attr("cx", (d,i) => this.xAxis(d.date))
        .attr("cy", (d,i) => this.yAxis(d.temperature))
        .attr("r",12)
        .style('opacity', 1e-6);
    }

    private drawCircle(): void {

        var divToolTip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 1e-6);
        
        this.temperatureLine.selectAll("circle").on("mouseover", function() { 
            divToolTip.style("opacity", 1);
            divToolTip.style("position", 'absolute');
            divToolTip.style("background", '#ddd');
        })
        .on("mouseout", function() { 
        divToolTip.style("opacity", 1e-6);
        })
        .on("mousemove", function(d) {
        var displayText = 'Temperature: '+d.temperature+'\n\n Date:'+moment(d.date).format('DD-MM-YYYY hh:mm:ss');
        divToolTip.text(displayText)
        .style("left", (d3.event.pageX + 15) + "px")
        .style("top", (d3.event.pageY - 10) + "px");
        });
    }
}
