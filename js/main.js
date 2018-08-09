// implement the slopegraph for this particular dataset of happiness scores

function main() {
    'use strict';

    // width of slopegraph
    var width = 300;
    // years to be shown from the data
    var keyValues = ['2015', '2016', '2017', '2018'];
    // implement a slider to allow users to select the percentage of happiness
    // increase or decrease
    var slider;
    // initial value of the slider
    var percentage = 10;
    // store tooltip
    var tooltip;
    // store chart
    var slopegraph;
    // track user interaction
    var state = {
        // pass the years to display from the data
        keys: keyValues,
        // track filtered years
        filter: [],
        // toggle specific countries
        navToggle: [],
        // track line selection
        highlight: [],
        // track happiness line selection in legend
        green: false,
        red: false
    };
    // for parsing percentage changes in happiness scores
    var formatPercent = d3.format(".1%");

    // track lines of countries with happiness increase/decrease > chosen amount
    var special_lines = {
        red: [],
        green: []
    }
    // check if any part of the graph is filtered
    var filtered = false;
    // find all the red and green lines corresponding to decreases/
    // increases in happiness
    function find_lines() {
        // reset line indices for reuse
        special_lines.green = [];
        special_lines.red = [];

        d3.selectAll('line')
            .each(function(d, i) {
                // find each line that has class of "green" or "red"
                // these classes were added during rendering in "slopey.js"
                if (d3.select(this).classed("green")) {
                    var clas = d3.select(this).attr("class").split("-");
                    // take last element in array of class string to identify
                    // the line number
                    special_lines.green.push(clas[clas.length-1]);
                } else if(d3.select(this).classed("red")) {
                    var clas = d3.select(this).attr("class").split("-");
                    special_lines.red.push(clas[clas.length-1]);
                }
            })
    }

    // update filtered variable if any part of the graph is filtered
    function checkFiltered() {
        if (state.highlight.length > 0 || state.red || state.green) {
            filtered = true;
        }
        else {
            filtered = false;
        }
    }

    // create slider for choosing happiness change rate and update with interaction
    function happinessSlider(data) {
        slider = d3.select("div#legend")
            .append("input")
            .attr("type", "range")
            .attr("min", "0")
            .attr("max", "30")
            .attr("step", "2")
            .attr("id", "percentage");

        update(percentage);

        d3.select("#percentage")
            .on("input", function() {
                update(+this.value);
                percentage = +this.value;
                render(data, keyValues, percentage);
                find_lines();
            });
    }

    // for updating happiness slider
    function update(value) {
        slider.attr("value", value);

        d3.selectAll("#perc-value")
            .attr("value", value + "%");
    }

    // filter based on user interaction
    function filterYear(data) {
        // initialize filter array as false which means not filtered out
        keyValues.forEach(function() {
            state["filter"].push(false);
        });
        d3.select('nav#year-filter').append('ul')
            .selectAll('li')
            .data(keyValues)
            .enter()
            .append('li')
            .on('click', function(d, i) {
                // if an inactive year is clicked
                checkFiltered();
                if (state.filter[i]) {
                    state.filter[i] = false;
                    d3.select(this).style('opacity', 1);
                    // add year to array
                    state.keys.push(d);
                    // keep array in chronological order
                    state.keys.sort();
                    // render with inclusion of the clicked year
                    render(data, state.keys, percentage);
                }
                // Disable the clicked year if
                // at least two other years are active
                else if (!state.filter[i] && state.keys.length > 2) {
                    state.filter[i] = true;
                    d3.select(this).style('opacity', 0.3);
                    state.keys.splice(i, 1);
                    state.keys.sort();
                    render(data, state.keys, percentage);
                }
            })
            .text(function(d) {return d;});
    }

    // highlight country buttons based on user interaction
    function filterCountry(data) {
        data.forEach(function(n) {
            state.navToggle.push(false);
        });

        d3.select('nav#country-filter')
            .append('ul')
            .selectAll('li')
            .data(data)
            .enter()
            .append('li')
            .attr('class', function(d, i) {return 'navAlt li-'+i;})
            .on('click', function(d, i) {
                // if the country is already part of the highlighted set
                if (state.navToggle[i]) {
                    state.navToggle[i] = false;
                    // the country's id must be filtered out of the highlight
                    // array so all other selections can be rendered
                    var index = state.highlight.indexOf(i)
                    state.highlight.splice(index, 1);
                    // graph will reset if at least one country isn't selected
                    if (state.highlight.length === 0) {
                        resetSelection();
                    } else {
                        // highlight the line, label, and country button of
                        // all remaining selected countries
                        highlightLine(state.highlight);
                        highlightNav(state.highlight);
                        highlightLabel(state.highlight);
                    }
                }
                // if the country is not part of the highlighted set when
                // its button is clicked
                else if (!state.navToggle[i]) {
                    state.navToggle[i] = true;
                    if (state.highlight.indexOf(i) === -1) {
                        state.highlight.push(i);
                    }
                    highlightLine(state.highlight);
                    highlightNav(state.highlight);
                    highlightLabel(state.highlight);
                }
                checkFiltered();
                updateReset();
            })
            .text(function(d) {return d["country"];});
    }

    // render the slopegraph
    function render(data, keys, perc) {
        resetSelection();
        // create chart
        // inherit all properties from the slopegraph d3 block created in
        // "main.js"
        slopegraph = slopey()
            .w(width)

            .margin({top: 30, bottom: 20, left: 100, right: 100})
            .gutter(25)
            .keyName('country')
            .keyValues(keys)
            .strokeColour('#8d9093')
            .percentage(perc)
            .on('_hover', function(d, i) {
                // only display the tooltip if graph is filtered
                if (filtered) {
                    tooltipOn(d3.event.pageX, d3.event.pageY, d);
                } else {
                    // highlight only the country currently hovered over
                    state.highlight = [i];
                    // reset country toggle so country buttons can be selected after
                    // other countries have been hovered over
                    state.navToggle.forEach(function(d, i) {
                        state.navToggle[i] = false;
                    });
                    // highlight line based on hovered cursor
                    highlightLine(state.highlight);
                    // highlight navigation pane related to highlighted line
                    highlightNav(state.highlight);
                    highlightLabel(state.highlight);
                    // show tooltip on mousehover
                    tooltipOn(d3.event.pageX, d3.event.pageY, d);
                }
            })
            .on('_moveaway',function() {
                tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
                if (!filtered) {
                    resetSelection(500);
                    state.highlight = [];
                }
            });

        // apply chart
        d3.select('section.slope')
            .datum(data)
            .call(slopegraph);

        // ensure highlight is maintained when graph is updated
        if (state.highlight.length > 0) {
            d3.selectAll('.elm').style('opacity', 0.2)
            .style('stroke-width', 1);
            highlightNav(state.highlight);
            highlightLabel(state.highlight);
            highlightLine(state.highlight);
        }
    }

    // highlight all selected lines in the highlight array
    function highlightLine(highlight) {
        d3.selectAll('.elm')
        .transition()
        .style('opacity', 0.1)
        .style('stroke-width', 1)

        var n = highlight.length;
        for (var i = 0; i < n; i++) {
            d3.selectAll('.sel-'+highlight[i]).transition()
            .style('opacity', 1).style('stroke-width', 3);
        }
    }

    // highlight all countries in navigation pane in the highlight array
    function highlightNav(highlight) {
        d3.selectAll('.navAlt').transition().style('opacity', 0.2);

        var n = highlight.length;
        for (var i = 0; i < n; i++) {
            d3.selectAll('.li-' + highlight[i]).transition()
            .style('opacity', 1);
        }
    }

    // enlarge labels of all selected countries in highlight array
    function highlightLabel(highlight) {
        d3.selectAll('.labels').transition().style('opacity', 0.2)
        .style('font-size', "9.5px").style('fill', '#B8CBED');

        highlight.forEach(function(d) {
            d3.selectAll('.lab-'+d).transition().style('opacity', 1)
            .style('font-size', "13px")
            .style('fill', '#5B6D8F')
        })
    }

    // reset the chart and clear any selections with default duration of 0
    function resetSelection(time=0) {
        d3.selectAll('.elm').transition().duration(time).style('opacity', 1)
        .style('stroke-width', 1);
        d3.selectAll('.navAlt').transition().duration(time).style('opacity', 1);
        d3.selectAll('.labels').transition().duration(time).style('font-size', "9.5px")
        .style("fill", "#B8CBED").style("opacity", 0.5);
    }

    // render tooltip when mouse hovered over line
    function tooltipOn(x, y, d) {
        // change tooltip information depending on which line is hovered over
        var percent_change;
        var information = "";
        for(var n=0; n < state.keys.length-1; n++){
            percent_change = state.keys[n]+": " + formatPercent((d[state.keys[n+1]] - d[state.keys[n]])/d[state.keys[n]]);
            // append information for multiple years
            information += (percent_change + "<br/>");
        }

        tooltip.transition()
                .duration(100)
                .style("opacity", 0.9);
        tooltip.html(d.country + "<br/>" + information)
                .style("left", (x+5) + "px")
                .style("top", (y-45) + "px");
    }

    // show all large happiness increases/decreases by clicking the legend
    function highlightSpecialLines() {
        // identify all lines
        find_lines();

        d3.select('.increase')
        .on('click', function() {
            // if the lines were already filtered out
            if (state.green) {
                resetSelection();
                state.green = false;
            } else {
                highlightNav(special_lines.green);
                highlightLine(special_lines.green);
                highlightLabel(special_lines.green);
                state.green = true;
            }
            // update graph filter status and reset button
            checkFiltered();
            updateReset();
        })

        d3.select('.decrease')
        .on('click', function() {
            if (state.red) {
                resetSelection();
                state.red = false;
            } else {
                state.red = true;
                highlightNav(special_lines.red);
                highlightLine(special_lines.red);
                highlightLabel(special_lines.red);
            }
            // determine if graph is filtered
            checkFiltered();
            updateReset();
        })
    }

    // give functionality to reset button
    function resetButton() {
        d3.select("div.reset")
            .append("li")
            .text("Reset")
            .on('click', function() {
                resetSelection();
                state.highlight = [];
                state.green = false;
                state.red = false;
                checkFiltered();
                updateReset();
            });
    }

    // update the appearance of the reset button depending on whether the graph
    // has been filtered
    function updateReset() {
        d3.select("div.reset")
            .style("opacity", function() {
                if (filtered) {
                    return 1;
                } else {
                    return 0.4;
                }
            })
            .style("width", function() {
                if (filtered) {
                    return "60px";
                } else {
                    return "35px";
                }
            })
    }

    d3.json("data/data.json", function(data) {
        data.forEach(function(d) {
        d["2015"] = +d["2015"];
        d["2016"] = +d["2016"];
        d["2017"] = +d["2017"];
        d["2018"] = +d["2018"];
    });
        // initial render of chart
        render(data, keyValues, percentage);
        // enable filtering of countries
        filterCountry(data);
        // filtering options for years
        filterYear(data);
        // enable the reset button functionality
        resetButton();
        // highlight lines for countries with specified happiness change
        highlightSpecialLines();
        // enable happiness level slider
        happinessSlider(data);
        // initiate the tooltip
        tooltip = d3.select("body").append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);
    })
};
