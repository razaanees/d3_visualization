# d3_visualization

* Summary
The Sustainable Development Solutions Network (SDSN) has created global happiness reports for the past several years. These reports allot happiness scores to 148 countries based on six factors: GDP per capita, social support and mobility, health, trust in government, freedom, and generosity. This visualization shows the change in these scores from the year 2015 to 2017 and highlights the countries that experienced a large change in their measured happiness. It also shows that the happiest countries are stable.

* Design
    1. Chart type: After EDA of the world happiness data, I noticed that the happiness scores for most countries remained relatively the same; however, a few countries experienced large changes in happiness. I decided to show the change in happiness (Happiness Score) of all of the countries from 2015 to 2017 and highlight the countries that experienced that biggest changes. A simple and effective way of doing this is using Edward Tufte's Slopegraph.

    I made the legend interactive after reading all of the feedback to put a
    greater emphasis on countries that experienced large changes in happiness.
    Users can click the colored line in the legend to highlight corresponding
    countries in the slopegraph. The highlight also shows that the happiest
    countries remained stable and did not experience large increases or decreases in happiness.

    2. Visual Encodings:
        * Country: Shape (one line for each country)
        * Happiness score: Planar (y-axis)
        * Year: Planar (x-axis)
        * Change in happiness: Slope
        * Major change in happiness: Color

    3. Layout: The Slopegraph has three vertical invisible lines spaced evenly apart horizontally representing the three years (2015, 2016, 2017). Each country is represented by it's name next to each of the outside lines. The vertical positions of the countries are determined by their Happiness Score. The highest Happiness Score is at the top and each score is displayed next to the country's name. Each country's Happiness score is connected with a line between the three years. This line forms the slope that encodes change in happiness. Countries that experienced an increase in happiness of more than 10% have green colored lines and countries with a decrease in happiness of more than 10% have red colored lines. This is shown in a legend at the top of the page before the visualization.

    The user can toggle on/off specific countries by clicking named buttons at the top of the page or hovering on the country's line. The user can also toggle off the year 2016 to make direct comparisons between 2015 and 2017.

* Feedback
    * Feedback #1
        + Be able to select more than one country at a time. _Made state.highlight into an array instead of a bool_
        + Names of a few countries do not completely fit on screen. _Adjusted the dimensions of the slopegraph_
        + Increase font size and line thickness of selected country. _Fixed_
        + Deselect countries after mouse is moved away from the line or label. _Add a "mouseout" event to the label to reset the graph_
        + Add a short description at the top of the page introducing the visualization and describing the filtering options. _Implemented_
    * Feedback #2
        + Move the legend below the Country selection buttons. _Fixed_
        + Use different colors for Country selection buttons and Country labels because they are similar to the legend. _Switched color scheme to yellow and blue to avoid confusion with the legend colors_
        + Further decrease opacity of unselected Country labels and lines. _Decreased opacity of unselected lines from 0.3 to 0.2_
        + Make the instructions clearer. Start with instructions for selecting country rather than year in the top description. _Fixed_
        + "It's frustrating when I click the button of a country and then everything resets when I move my mouse down towards the lines." _This was being caused by a buffer region at the top that reset all selections on a mouseover event. A visible reset button was added instead of the buffer zone._
    * Feedback #3
        + Make the legend click-able (ie. all green lines should be highlighted if a user clicks on the green line in the legend) _Identified the colored lines by adding keywords into their class. Allowed interactive legend by highlighting those colored lines when the legend is clicked_
    * Feedback from Udacity reviewer
        + Put js code currently in "index.html" into another separate js file. _Implemented_
        + Change color of "year" filtering buttons. _Implemented_
        + Group countries by continents. _Tried grouping countries by continent in EDA but it created too much clutter and was not clear when large continents such as Asia were selected. Also got the impression that users are more interested in finding out about their own country or neighboring country than continent._
        + Let users decide the significance level of happiness increase or decrease. _Added a slider that adjusts the happiness increase/decrease percentage as chosen by the user_
        + Add tooltip that displays information when line is hovered over. _Added tooltip that displays country name and percentage change in happiness score._
    * Feedback #5
        + Re-click either of the happiness logos in the legend to un-filter. _Implemented_
        + Add "mouseout" event to unselect lines that were hovered over. _Added "mouseout" event with duration of 500 to allow for smooth transitions_
        + Stop lines from resetting when a selection has been made and the mouse is hovered over a line. _The hover will only display the tooltip when a selection has already been made_
        + Make reset button more prominent when a selection has been made. _Implemented_


* Resources
    * [World Happiness report: Helliwell, J., Layard, R., & Sachs, J. (2017). World Happiness Report 2017, New York: Sustainable Development Solutions Network.](http://worldhappiness.report/)
    * [2015 - 2016 World happiness data](https://www.kaggle.com/unsdsn/world-happiness)
    * [Slopegraph - Sundar's Block](https://bl.ocks.org/eesur/ee8d0ab88229d0e07f7f)
    * [Stack Overflow](https://www.stackoverflow.com)
    * [Udacity Data Analyst ND](https://www.udacity.com)
    * [Reusable D3 syntax](https://medium.freecodecamp.com/a-gentle-introduction-to-d3-how-to-build-a-reusable-bubble-chart-9106dc4f6c46)
    * [Sliders in D3](http://www.d3noob.org/2014/04/using-html-inputs-with-d3js.html)
