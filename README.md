# d3_visualization

* Summary
The Sustainable Development Solutions Network (SDSN) has created global happiness reports for the past several years. These reports allot happiness scores to 148 countries based on six factors: GDP per capita, social support and mobility, health, trust in government, freedom, and generosity. This visualization shows the change in these scores from the year 2015 to 2017 and highlights the countries that experienced a large change in their measured happiness.

* Design
    1. Chart type: After EDA of the world happiness data, I noticed that the happiness scores for most countries remained relatively the same; however, a few countries experienced large changes in happiness. I decided to show the change in happiness (Happiness Score) of all of the countries from 2015 to 2017 and highlight the countries that experienced that biggest changes. A simple and effective way of doing this is using Edward Tufte's Slopegraph.

    2. Visual Encodings:
        * Country: Shape (one line for each country)
        * Happiness score: Planar (y-axis)
        * Year: Planar (x-axis)
        * Change in happiness: Slope
        * Major change in happiness: Color

    3. Layout: The Slopegraph has three vertical invisible lines spaced evenly apart horizontally representing the three years (2015, 2016, 2017). Each country is represented by it's name next to each of the outside lines. The vertical positions of the countries are determined by their Happiness Score. The highest Happiness Score is at the top and each score is displayed next to the country's name. Each country's Happiness score is connected with a line between the three years. This line forms the slope that encodes change in happiness. Countries that experienced an increase in happiness of more than 10% have green colored slopes and countries with a decrease in happiness of more than 10% have red colored slopes. This is shown in a legend at the top of the page before the visualization.

    The user can toggle on/off specific countries by clicking named buttons at the top of the page or hovering on the country's slope. The user can also toggle off the year 2016 to make direct comparisons between 2015 and 2017.

* Feedback
    * Feedback #1
        + Be able to select more than one country at a time. _Fixed_
        + Names of a few countries do not completely fit on screen. _Fixed_
        + Increase font size and line thickness of selected country. _Fixed_
        + Deselect countries after mouse is moved away from the line or label. _Fixed_
        + Add a short description at the top of the page introducing the visualization and describing the filtering options. _Fixed_


* Resources
    * [World Happiness report: Helliwell, J., Layard, R., & Sachs, J. (2017). World Happiness Report 2017, New York: Sustainable Development Solutions Network.](http://worldhappiness.report/)
    * [2015 - 2016 World happiness data](https://www.kaggle.com/unsdsn/world-happiness)
    * [Slopegraph - Sundar's Block](https://bl.ocks.org/eesur/ee8d0ab88229d0e07f7f)
    * [Stack Overflow](https://www.stackoverflow.com)
    * [Udacity Data Analyst ND](https:www.udacity.com)
    * [Reusable D3 syntax](https://medium.freecodecamp.com/a-gentle-introduction-to-d3-how-to-build-a-reusable-bubble-chart-9106dc4f6c46)
