"use strict";


var DemoTrial = function (gridworld, initState, key_handler, initText, task_display, text_display) {
	this.gridworld = gridworld;
	this.initState = initState;
	this.task_display = document.getElementById('task_display');
	this.text_display = $(text_display);
	this.state = initState;
	this.key_handler = (function (context, key_handler) {
							return function (event) {
								key_handler.call(context, event);
							}
						})(this, key_handler);
	this.initText = initText;
    this.colors = [tutorial_color_1];
	this.draw_goals = true;

};

DemoTrial.prototype.start = function () {
	this.mdp = new ClientMDP(this.gridworld);
	this.painter = new GridWorldPainter(this);

    $(document).unbind();
	$(document).bind('keydown.gridworld', this.key_handler);

    trial_on = new Date().getTime();

	this.text_display.html(this.initText);
	this.painter.init(this.task_display);
	$(this.painter.paper.canvas).css({display : 'block', margin : 'auto'}); //center the task
	this.painter.drawState(this.state);
};

DemoTrial.prototype.end = function () {
	this.painter.remove();
	$(document).unbind('keydown.gridworld');
};

DemoTrial.prototype.reset = function () {
	// this.end();
	this.painter.remove();
	this.state = this.initState;


	this.mdp = new ClientMDP(this.gridworld);
	this.painter = new GridWorldPainter(this);

	$(document).unbind();
	$(document).bind('keydown.gridworld', this.key_handler);

	this.text_display.html(this.initText);
	this.painter.init(this.task_display);
	$(this.painter.paper.canvas).css({display : 'block', margin : 'auto'}); //center the task
	this.painter.drawState(this.state);

};

// use common mappings

var rh_demo_reachableGoal_1 = demo_responseHandlerGenerator(action_mapping_a);
var rh_demo_noReachableGoal_1 = demo_responseHandler_generator_noReachableAction(action_mapping_a);
var rh_demo_end = demo_responseHandler_generator_endDemo(action_mapping_a);

var rh_demo_reachableGoal_2 = demo_responseHandlerGenerator(action_mapping_b);
var rh_demo_noReachableGoal_2 = demo_responseHandler_generator_noReachableAction(action_mapping_b);

//
var demo_tile_size = 85;


var demo0 = new DemoTrial(
	//gridworld
	{
		height : 6,
		width : 6,
		walls : [],
		goals : [],
		tile_size: demo_tile_size,
		agents : [{name : 'agent1'}]
	},
	//initial state
	{
		agent1 : {name : 'agent1', location : [2,2], type : 'agent'}
	},
	function (event) {move_to_next_trial = true} // this needs to be a function of event
	,
	//initial text, display id, message id
	'See the circle in the center?<br> You control the circle and can move it to different places.With w,a,s,d ' +
	'<br><I><span style="color: #707070"> Press enter to continue</span></I>',
	'#task_display',
	'#trial_text'
);

var demo1 = new DemoTrial(
	//gridworld
	{
		height : 6,
		width : 6,
		walls : [[1,2,'down'],[1,1,'up'],
		[2, 2, 'down'], [2, 1, 'up']],
		goals : [],
		tile_size: demo_tile_size,
		agents : [{name : 'agent1'}]
	},
	//initial state
	{
		agent1 : {name : 'agent1', location : [2,2], type : 'agent'}
	},
	rh_demo_noReachableGoal_1
	,
	//initial text, display id, message id
	'The ' + instruction_set_a + ' keys move the circle around maze.<br> Try moving around! Be careful there are walls <br><br> ',
	'#task_display',
	'#trial_text'
);

var demo2 = new DemoTrial(
	//gridworld
	{
		height : 6,
		width : 6,
		walls : [],
		tile_size: demo_tile_size,
		goals : [{agent:'agent1', location: [4,4], label: 'Goal', display_label: 'Goal', value: 1}],
		agents : [{name : 'agent1'}]
	},
	//initial state
	{
		agent1 : {name : 'agent1', location : [0,0], type : 'agent'}
	},
	rh_demo_reachableGoal_1
	,
	//initial text, display id, message id
	'The colored tile is your goal.<br> Try going to your goal! <br>'
		//+' <span style="color: #707070">Use the ' + instruction_set_a + ' keys to move.</span>',
		+' <span style="color: #707070">Use the w,a,s,d keys to move.</span>',
	'#task_display',
	'#trial_text'
);

//
var demo3 = new DemoTrial(
	//gridworld
	{
		height : 6,
		width : 6,
		walls : [[0,0,'right'],[1,0,'left'],[0,1,'right'],[1,1,'left'],//[0,2,'right'],[1,2,'left'],
				 [2,2,'down'],[2,1,'up']],
		tile_size: demo_tile_size,
		goals : [{agent:'agent1', location: [0,0], label: 'Goal', display_label: 'Goal', value: 1}],
		agents : [{name : 'agent1'}]
	},
	//initial state
	{
		agent1 : {name : 'agent1', location : [2,0], type : 'agent'}
	},
	rh_demo_reachableGoal_1
	,
	//initial text, display id, message id
	'The wide black lines are walls. <br>These sometimes get in your way :( <br> '
		+' <span style="color: #707070">Use the w,a,s,d keys to move.</span>',
	'#task_display',
	'#trial_text'
);



var generate_demo4 = function(response_handler) {
	var demo = new DemoTrial(
		//gridworld
		{
			height : 6,
			width : 6,
			walls : [],
			goals : [
				{agent:'agent1', location: [1,3], label: 'A', display_label: 'A', value: 27},
				{agent:'agent1', location: [2,4], label: 'G', display_label: 'G', value: 20},
				{agent:'agent1', location: [3,2], label: 'U', display_label: 'U', value: 6}

			],
			tile_size: demo_tile_size,
			agents : [{name : 'agent1'}]
		},
		//initial state
		{
			agent1 : {name : 'agent1', location : [2,2], type : 'agent'}
		},
		response_handler
		,
		//initial text, display id, message id
		'Sometimes, the goals will say something important and have different rewards! <br><br>'
			+' <span style="color: #707070">Use the w,a,s,d keys to move.</span>',
		'#task_display',
		'#trial_text'
	);

	demo.colors = [tutorial_color_2]; // need some way to set the colors of the agent differently.
	return demo;
};
var demo4 = generate_demo4(rh_demo_reachableGoal_1);



var generate_demo5 = function(response_handler) {
	var demo = new DemoTrial(
		//gridworld
		{
			height : 6,
			width : 6,
			walls : [],
			tile_size: demo_tile_size,
			goals :  [
				{agent:'agent1', location: [0,3], label: '1', display_label: '1', value: 7},
				{agent:'agent1', location: [2,3], label: '4', display_label: '4', value: 20},
				{agent:'agent1', location: [4,3], label: '7', display_label: '7', value: 26}

			],
			agents : [{name : 'agent1'}]
		},
		//initial state
		{
			agent1 : {name : 'agent1', location : [2,2], type : 'agent'}
		},
		response_handler
		,
		//initial text, display id, message id
		'Sometimes, the goals will say something important and have different rewards! <br><br>'
			+' <span style="color: #707070">Use the w,a,s,d keys to move.</span>',
		'#task_display',
		'#trial_text'
	);

	demo.colors = [tutorial_color_2]; // need some way to set the colors of the agent differently.
	return demo;
};
var demo5 = generate_demo5(rh_demo_reachableGoal_1);

var generate_demo6 = function(response_handler) {
	var demo = new DemoTrial(
		//gridworld
		{
			height: 6,
			width: 6,
			//walls: [],
			walls: [[0, 0, 'right'], [1, 0, 'left'], [0, 1, 'right'], [1, 1, 'left'],[0,2,'right'],[1,2,'left'],
				[2, 2, 'down'], [2, 1, 'up']],
			tile_size: demo_tile_size,
			goals: [{agent: 'agent1', location: [4, 0], label: 'Goal', display_label: 'Goal', value: 1}],
			agents: [{name: 'agent1'}]
		},
		//initial state
		{
			agent1: {name: 'agent1', location: [3, 3], type: 'agent'}
		},
		response_handler
		,
		//initial text, display id, message id
		'Look! The goal has moved again!<br> Go to the goal<br>'
			+' <span style="color: #707070">Use the ' + instruction_set_a + ' keys to move.</span>',
		'#task_display',
		'#trial_text'
	);
	demo.draw_goals=true;
	return demo;
};

var demo6 = generate_demo6(rh_demo_reachableGoal_1);

var generate_demo8 = function(response_handler) {
	var demo = new DemoTrial(
		//gridworld
		{
			height: 6,
			width: 6,
			walls: [[1,2,'down'],[1,1,'up'],
				[2, 2, 'down'], [2, 1, 'up']],
			tile_size: demo_tile_size,
			goals: [
				{agent:'agent1', location: [1,3], label: 'X', display_label: 'X', value: 0},
				{agent:'agent1', location: [2,4], label: 'Y', display_label: 'Y', value: 1},
				{agent:'agent1', location: [3,2], label: 'Z', display_label: 'Z', value: 0}

			],
			agents: [{name: 'agent1'}]
		},
		//initial state
		{
			agent1: {name: 'agent1', location: [2, 1], type: 'agent'}
		},
		response_handler
		,
		//initial text, display id, message id
		'Now there are colored squares, each labeled with a letter.<br> The "<b>Y</b>" square is the goal. <br>' +
			'<span style="color: #707070">Use the ' + instruction_set_b + ' keys to move.</span>',
		'#task_display',
		'#trial_text'
	//demo.
	);
	demo.draw_goals=true;
	demo.colors = [tutorial_color_2]; // need some way to set the colors of the agent differently.
	return demo;
};
var demo8 = generate_demo8(rh_demo_reachableGoal_1);

var generate_demo9 = function(response_handler) {
	var demo = new DemoTrial(
		//gridworld
		{
			height: 5,
			width: 5,
			walls: [[1,3,'right'],[2, 3,'left'],
				[2, 2, 'down'], [2, 1, 'up']],
			tile_size: demo_tile_size,
			goals: [
				{agent:'agent1', location: [1,1], label: 'Goal', display_label: 'X', value: 1},
				{agent:'agent1', location: [1,3], label: 'Goal', display_label: 'Z', value: 0},
				{agent:'agent1', location: [3,0], label: 'Goal', display_label: 'Y', value: 0}
			],
			agents: [{name: 'agent1'}]
		},
		//initial state
		{
			agent1: {name: 'agent1', location: [3, 3], type: 'agent'}
		},
		response_handler
		,
		//initial text, display id, message id
		'Each color has a different goal. <br>This time, <b>X</b> marks the spot!<br>' +
		'<span style="color: #707070">Use the ' + instruction_set_a + ' keys to move.</span>',
		'#task_display',
		'#trial_text'
		//demo.
	);
	demo.draw_goals=true;
	demo.colors = [tutorial_color_1]; // need some way to set the colors of the agent differently.
	return demo;
};
var demo9 = generate_demo9(rh_demo_reachableGoal_1);


var endDemo = new DemoTrial(
	//gridworld
	{
		height : 5,
		width : 5,
		walls : [],
		goals : [],
		tile_size: demo_tile_size,
		agents : [{name : 'agent1'}]
	},
	//initial state
	{
		agent1 : {name : 'agent1', location : [2,2], type : 'agent'}
	},
	rh_demo_end
	,
	//initial text, display id, message id
	"That's how it works!!!<br>.~*`*~.~*`*~.~*`*~.~*`*~.<br>-=-=-=-=-=-=-=-=-=-=-=-",
	'#task_display',
	'#trial_text'
);


var demo_trials = [demo0,demo1,demo2,demo4,demo5,demo8, demo9, endDemo];
// var demo_trials = [demo8, endDemo];
