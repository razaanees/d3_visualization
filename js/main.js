// Multiple slogegraph chart code

var slopey = function() {
    "use strict";

    // dimensionality of slopegraph
    var w = 200, // width
        h = 500,
        margin = {top: 40, bottom: 40, left: 80, right: 80},
        gutter = 50,
        strokeColour = '#8d9093',
        keyValues = [],
        keyName = '',
        format = d3.format(''),
        sets;

    // map event variables to be returned
    var dispatch = d3.dispatch('_hover', "_moveaway");

    var svg, yScale;

    // values to be returned as d3 block for rendering slopegraph
    function exports(_selection) {
        _selection.each(function(data) {

            // get max and min data values
            var keyExtent = d3.extent(data, function(d){
                return d["2017"];
            });
            // adjust screen width for number of sets
            w = w * keyValues.length;
            // get number of sets
            sets = keyValues.length - 1;
            // use same scale for all sides
            yScale = d3.scale.linear()
                .domain(keyExtent)
                .range([h-margin.top, margin.bottom+8]);

            // reset graph
            d3.select(this).select('svg').remove();

            svg = d3.select(this)
                .append('svg')
                .attr('width', w)
                .attr('height', h);

            render(data,0);
        });
    }

    // apply each set of scores and start/end labels at the end
    function render(data, n) {
        if (n < keyValues.length-1) {
            lines(data, n);
            middleLabels(data, n);
            return render(data, n+1);
        }
        else {
            startLabels(data, n);
            endLabels(data, n);
            return n;
        }
    }

    // render connecting lines
    function lines (data, n) {

        var lines = svg
            .selectAll('.s-line-'+n)
            .data(data)
            .enter().append('line');

        lines.attr({
            x1: function () {
                if (n===0) {
                    return margin.left;
                }
                else {
                    return ((w/sets)*n) + margin.left/2;
                }
            },
            y1: function(d) {return yScale(d[keyValues[n]]);},
            x2: function () {
                if (n === sets-1) {
                    return w - margin.right;
                }
                else {
                    return ((w/sets)*(n+1)) - gutter;
                }
            },
            y2: function(d) {return yScale(d[keyValues[n+1]]);},
            // green stroke if happiness score increased by more than 10%
            // red stroke if happiness score decreased by more than 10%
            stroke: function(d) {
                if (d[keyValues[n+1]] > d[keyValues[n]]*1.1) {
                    return "#00802b";
                } else if (d[keyValues[n+1]] < d[keyValues[n]]/1.1) {
                    return "#af2f0c";
                } else {
                    return strokeColour;
                }
            },
            'stroke-width': 1,
            class: function(d, i) {
                if (d[keyValues[n+1]] > d[keyValues[n]]*1.1) {
                    return 'elm s-line- green ' + n + ' sel-' + i;
                } else if (d[keyValues[n+1]] < d[keyValues[n]]/1.1) {
                    return 'elm s-line- red ' + n + ' sel-' + i;
                }
                else {return 'elm s-line-' + n + ' sel-' + i;}
        }})
        // map "mouseover" event to an attribute of dispatch
        .on('mouseover', dispatch._hover);
    }

    // start labels to be applied at the beginning of chart
    function startLabels(data) {

        var startLabels = svg.selectAll('.l-labels')
            .data(data)
            .enter()
            .append('text')
            .attr({
                class: function(d,i) {return 'labels l-labels lab-'+i},
                x: margin.left - 3,
                y: function (d) {return yScale(d[keyValues[0]])+4;}
            })
            .text(function (d) {
                return d[keyName] + ' ' + format(d[keyValues[0]]);
            })
            .style('text-anchor', 'end')
            .style('opacity', 0.5)
            .on('mouseover', dispatch._hover)
            .on('mouseout', dispatch._moveaway);

        // starting year title
        svg.append('text')
            .attr({
                class: 's-title',
                x: margin.left - 3,
                y: margin.top/2 - 4
            })
            .text(keyValues[0] + " ↓")
            .style('text-anchor', 'end');
    }

    function middleLabels(data, n) {

        if (n !== sets-1) {
            var middleLabels = svg.selectAll('.m-labels-' + n)
                .data(data)
                .enter()
                .append('text')
                .attr({
                    class: function(d,i) {return 'labels m-labels-' + n +' lab-'+i;},
                    x: ((w/sets)*(n+1)) + 15,
                    y: function(d) {return yScale(d[keyValues[n+1]]) + 4;}
                })
                .text(function(d) {return format(d[keyValues[n+1]]);})
                .style('text-anchor', 'end')
                .style('opacity', 0.5)
                .on('mouseover', dispatch._hover)
                .on('mouseout', dispatch._moveaway);

        // year title at the top of the labels
        svg.append('text')
            .attr({
                class: 'm-title',
                x: ((w/sets)*(n+1)) +15,
                y: margin.top/2 - 4
            })
            .text(function(d) {
                return [keyValues[n+1]] + " ↓";
            })
            .style('text-anchor', 'end');
        }
    }

    function endLabels(data) {

        // get the last year in the data list-style
        var e = keyValues.length - 1;

        var endLabels = svg.selectAll('.e-labels-')
            .data(data).enter()
            .append('text')
            .attr({
                class: function(d,i) {
                    return "labels e-labels- lab-" + i;
                },
                x: w-margin.right + 4,
                y: function(d) {return yScale(d[keyValues[e]]);}
            })
            .text(function(d) {
                return d[keyName] + " " + format(d[keyValues[e]]);
            })
            .style('text-anchor', 'start')
            .style('opacity', 0.5)
            .on('mouseover', dispatch._hover)
            .on('mouseout', dispatch._moveaway);

        // year title on top
        svg.append('text')
            .attr({
                class: 'e-title',
                x: w-margin.right + 4,
                y: margin.top/2 - 4
            })
            .text(function (d){
                return keyValues[e] + " ↓";
            })
            .style("text-anchor", "start")
    }

    // allow chart dimensions to be altered in "index.html" or use default value
    exports.w = function(value) {
        if(!arguments.length) return w;
        w = value;
        return this;
    }

    exports.h = function(value) {
        if(!arguments.length) return h;
        h = value;
        return this;
    }

    exports.margin = function(value) {
        if(!arguments.length) return margin;
        margin = value;
        return this;
    }

    exports.gutter = function(value) {
        if(!arguments.length) return gutter;
        gutter = value;
        return this;
    }

    exports.format = function(value) {
        if(!arguments.length) return format;
        format = value;
        return this;
    }

    exports.strokeColour = function(value) {
        if(!arguments.length) return strokeColour;
        strokeColour = value;
        return this;
    }

    exports.keyValues = function(value) {
        if(!arguments.length) return keyValues;
        keyValues = value;
        return this;
    }

    exports.keyName = function(value) {
        if(!arguments.length) return keyName;
        keyName = value;
        return this;
    }

    d3.rebind(exports, dispatch, 'on');
    return exports;

};
