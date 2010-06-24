# Tagginator for jQuery

Tagginator is a plugin that turns a checkbox list into a set of clickable tags. When used inside a form, you'll be able to handle the data as if it were from normal checkboxes, because it **is** from normal checkboxes!

## Usage

First of all, you need to make sure your HTML is structured properly. I would recommend the following setup:

<pre><code>&lt;ul&gt;
	&lt;li&gt;&lt;label&gt;&lt;input type="checkbox" name="tag" value="something" /&gt;something&lt;/label&gt;&lt;/li&gt;
	&lt;li&gt;&lt;label&gt;&lt;input type="checkbox" name="tag" value="something_else" /&gt;something_else&lt;/label&gt;&lt;/li&gt;
	&lt;li&gt;&lt;label&gt;&lt;input type="checkbox" name="tag" value="another_something" /&gt;another_something&lt;/label&gt;&lt;/li&gt;
&lt;/ul&gt;</code></pre>

Basically, you should have these things:

* A wrapping element (the `<ul>` in the example above). This is the selector you will cal Tagginator on.
* An element that contains the text and a checkbox (the `<label>` in the example).

To apply the Tagginator behaviors to the items, you would call the script like this:

<pre><code>$('ul').tagginator();</code></pre>

## Options

There are a few options that you can set with Tagginator. Here is the default options object:

<pre><code>{
	item: 'label',
	activeClass: 'active',
	disabledClass: 'disabled',
	max: null,
	disabledClick: null
}</code></pre>

Here's the breakdown of each option:

### item

This is the selector that Tagginator will use to act as the tag. It will only look for this selector inside the selector that you called Tagginator on. This will receive a class of _tagginator_ when the script is run, so that you can style appropriately (like hiding the checkbox once the script is executed).

### activeClass

When you click on a tag, this class will be added to it, so that you can do some cool styling.

### disabledClass

If you use the _max_ option, this class will be added to all tags that are not currently selected. This will prevent users from adding more tags than allowed, and you will be able to style these accordingly.

### max

You can specify a number here if you want to only allow the user to select a certain number of tags. Once the max is reached, the _disabledClass_ will be applied to all tags that have not been selected.

### disabledClick

If you specify a _max_ number of tags, and that limit is reached, all tags that are not selected will become disabled (meaning they won't do anything when you click on them). With this option, you can specify a callback function to do something else (show an alert, show/hide a `<div>`, or whatever). The function receives one argument, that represents the tag that was clicked.

So, using the example above, let's say we only want to allow the user to select one tag. If they select another one, we want to display the text of the disabled tag they clicked (I know, it doesn't really make sense, but I just want to demonstrate the functionality). We call Tagginator like this:

<pre><code>$('ul').tagginator({
	max: 1,
	disabledClick: function(tag) {
		alert($(tag).text());
	}
});</code></pre>