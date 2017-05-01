# d3_visualization

* Summary
The Sustainable Development Solutions Network (SDSN) has created global happiness reports for the past several years. These reports allots happiness scores to 148 countries based on six factors: GDP per capita, social support and mobility, health, trust in government, freedom, and generosity. This visualization shows the change in these score from the year 2015 to 2017.

* Design
    1. Chart type: After EDA of the world happiness data, I decided to present
       the change in happiness (Happiness Score) of all of the countries from 2015 to 2017. A simple and effective way of doing this is using Edward
       Tufte's Slopegraph

    2. Visual Encodings:
        * Country: Shape (one line for each country)
        * Happiness score: Planar (y-axis)
        * Year: Planar (x-axis)
        * Change in happiness: Slope

    3. Layout: The Slopegraph has three vertical invisible lines spaced evenly
               apart horizontally representing the three years (2015, 2016, 2017). Each country is represented as a small dot on each of those lines. The positions of the countries are determined by their Happiness Score. The highest Happiness Score is at the top and each score is displayed next to the country's dot. Each country's Happiness score is connected with a line between the three years. This line forms the slope that encodes change in happiness.

               The user can toggle on/off specific countries by clicking named buttons on the top left corner of the page or the country's slope. The user can also toggle off the year 2016 to make direct comparisons between 2015 and 2017.

* Feedback
N/A for initial design

* Resources
    * [World Happiness report: Helliwell, J., Layard, R., & Sachs, J. (2017). World Happiness Report 2017, New York: Sustainable Development Solutions Network.](http://worldhappiness.report/)
    * [2015 - 2016 World happiness data](https://www.kaggle.com/unsdsn/world-happiness)
    * [Slopegraph - Sundar's Block](https://bl.ocks.org/eesur/ee8d0ab88229d0e07f7f)
    * [Stack Overflow](https://www.stackoverflow.com)
    * [Udacity Data Analyst ND](https:www.udacity.com)
    * [Reusable D3 syntax](https://medium.freecodecamp.com/a-gentle-introduction-to-d3-how-to-build-a-reusable-bubble-chart-9106dc4f6c46)
