---
path: /build-github-contributions-with-css-grid
date: 2018-03-18T21:39:06.247Z
title: Build GitHub Contributions Layout with CSS Grid
tags:
  - css grid
  - web development
---
Here's what we're going to have built by the end of this tutorial:

![GitHub Contributions layout](/static/assets/chrome_2018-03-18_17-46-45.png)

There are plenty of ways to build what GitHub has (GitHub does it with SVG), but we'll build it with the new CSS layout tool, CSS grid. This tutorial will go over CSS grid basics and some neat tricks that utilize CSS grid's power. 

If you're anxious and just want to see the finished code, check it out [here on CodePen](https://codepen.io/nicholasjackson827/pen/yKVgwK).

## HTML

The first part is the markup. One caveat about CSS grid is that it forces you to "flatten" your HTML. Since `display: subgrid` isn't implemented yet, any items we want to position using grid must be siblings of one another. 

Here's a sample of what I think makes most sense:

```html
<div class="contributions">
  <div class="months">
    ...
  </div>
  <div class="days">
    ...
  </div>
  <div class="blocks">
    ...
  </div>
</div>
```

This would allow us to nicely separate the elements in the grid, but we lose a lot of control if we do that. So, instead, we're just going to have one parent element, `.contributions` and put everything inside that. 

We'll need content for each of the months, each of the days of the week shown (just 3 in this case), and a single block for each day of the year minus one (yes, 364 `div` elements!). We're only using 364 since that's nicely divisible by 7. We'll start out with simple layout that looks like this:

```html
<div class="contributions">
  <div class="spacer"></div>
  <div class="month">jan</div>
  <div class="month">feb</div>
  <div class="month">mar</div>
  <div class="month five-weeks">apr</div>
  <div class="month">may</div>
  <div class="month">jun</div>
  <div class="month five-weeks">jul</div>
  <div class="month">aug</div>
  <div class="month five-weeks">sep</div>
  <div class="month">oct</div>
  <div class="month">nov</div>
  <div class="month five-weeks">dec</div>
  <div class="day">mon</div>
  <div class="day">wed</div>
  <div class="day">fri</div>
  <div class="block"></div>
  ...
  <div class="block"></div>
</div>
```

Few things to note. I've added a `.spacer` element at the front that will work as the spacer in the upper left hand corner. I've added some classes to each of the elements so we can easily identify them. The `.five-weeks` is so we can easily identify the months that have 5 weeks instead of 4 so we can have them span 5 columns instead of just 4. And lastly, I've omitted the vast majority of the `.block` elements for brevity sake. To fill in the rest of them, if you're using [Emmet](https://emmet.io/) (which you should be!), you can just type `.block*365` and hit `TAB` to have it populate 364 `div` elements for you! Nifty. 

While it doesn't look like much, this is all the content we're going to need to create our beautiful layout! Next, the fun stuff. 

## Layout

For this section, I'll be using [Stylus](http://stylus-lang.com/), a CSS pre-processor. It essentially allows you to write CSS without curly braces, without colons, and allows things like nesting. It's not a must, but nice to have. 

### Making Rows and Columns

First thing's first, the grid! We can apply `display: grid` to the `.container` element, but nothing's going to happen. Why? We need to add some columns and rows! For the columns, we'll need a total of 53 (1 for the days of the week and 52 for each week of the year). For the rows, we'll need a total of 8 (1 for the months of the year and 7 for each day of the week). Here's how we can define that in CSS:

```stylus
.contributions
  display grid
  grid-template-columns 50px repeat(52, 20px)
  grid-template-rows 30px repeat(7, 20px)
```

If you inspect the grid with your dev tools (I'll be using [Firefox Developer Edition](https://www.mozilla.org/en-US/firefox/developer/) for its killer CSS grid features) and turn on outlines for your grid, you'll see we now have a nice table with 53 columns and 8 rows that looks something like this:

![null](/static/assets/firefox_2018-03-18_18-09-59.png)

All the words are on top of one another, but we'll fix that in a minute. Let's talk about how we defined the columns and rows. 

We defined the columns with `grid-template-columns 50px repeat(52, 20px)`. This tells the browser that we want some columns. The first column is going to be a static `50px` wide. Then, we use the `repeat()` function which prevents us from having to type `20px` 52 times. `repeat(52, 20px)` is the same as typing `20px 20px 20px ... 20px` 50 times. We defined the rows in a similar manner with `grid-template-rows 30px repeat(7, 20px)`. This means we want one row `30px` tall and 7 rows `20px` tall. You'll be able to see the extra tall first row and extra wide first column when inspecting the grid. This is to give us a bit of extra room for the labels. Now for the words!

### Placing the Text

Let's stretch out the month labels a bit so that they're not all on top of one another. Here's the layout we'll use for the months:

```stylus
.month
  grid-column-end span 4
  align-self center
```

Automagically, the browser spreads out our months across all of the rows, just like we need! The `grid-column-end` property defines where the cell in the grid should end. Instead of explicitly defining where the cell should end, we tell it to `span 4` which means stretch the cell out 4 columns wide. 

While this is great, not all months of the year have 4 weeks, some of them have 5. To solve that simple issue, remember that `.five-weeks` class we added to some months? That will come in handy to define which months need to be stretched across 5 columns instead of 4. Add the simple following snippet to handle this unique case:

```stylus
.five-weeks
  grid-column-end span 5
```

Now for the days of the week. We want to skip the first 2 rows. The first row is just a blank row, and since the weeks start with Sunday (in this case at least), we need to leave a gap for those. Also, we want to make sure the days stay in the first column.

```stylus
.day
  grid-row-end span 2
  grid-column 1
```

Nice! However, we need a little bit of extra space at the top and start at row 2 and not row 1. There's plenty of ways to do this, but I recommend adding a `.spacer` at the beginning to fill that space. We can make it span 2 columns with:

```stylus
.spacer
  grid-row 1 / span 2
```

We've got the basic shell at this point. It should look something like this:

![null](/static/assets/firefox_2018-03-18_18-27-52.png)

### Styling the Blocks

There are a few things we need to do to the blocks. We need to fill them in the grid, put some space between them, and color them. Let's start with the easiest part, coloring them. 

```stylus
.block
  background green
```

This causes some slightly unexpected behavior. What you get looks like the following:

![null](/static/assets/firefox_2018-03-18_18-32-04.png)

Instead of filling our grid in nicely in the empty cells, the browser starts at the very first cell that we haven't yet defined. Since we've defined items to go in the first 6 rows and the first column, it only has the last 2 rows to fill in the blocks! Fortunately, there's a neat feature of grid parent elements called `grid-auto-flow` that allows us to define how the browser fills in the cells. If we add `grid-auto-flow: dense` to the `.contributions` element, this tells the browser to fit in new elements as soon as it can. It's a complex (but powerful) attribute so I'd recommending checking out [the docs](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow). 

So all of our grid elements are filled in to the regions we want, but there's no spacing so it just looks like one big green rectangle. To fix that, let's add some gap between the cells with `grid-gap: 4px 4px` on the `.contributions` element. Your `.contributions` element should now look like this:

```stylus
.contributions
  display grid
  grid-template-columns 50px repeat(52, 20px)
  grid-template-rows 30px repeat(7, 20px)
  grid-auto-flow dense
  grid-gap 4px
```

and the output should look like this:

![](/static/assets/firefox_2018-03-18_18-40-14.png)

That's it for the grid aspects of the site! The rest will just be making it a bit prettier and closer to what GitHub has. 

### Few Little Details

There are a few things our layout is missing style-wise that the 
