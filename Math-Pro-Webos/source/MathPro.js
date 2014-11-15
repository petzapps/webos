var timer;
enyo.kind({
    name: "PetzMathProEnyo",
    kind: enyo.VFlexBox,
    flex: 1,
    components: [{
        kind: "ApplicationEvents",
        onWindowRotated: "windowRotated",
        onWindowParamsChange: "windowParamsChangeHandler"
    }, {
        name: "slidingPane",
        kind: "SlidingPane",
        flex: 1,
        onSelectView: "slidingSelected",
        components: [{
            name: "left",
            width: "200px",
            components: [{
                kind: "VFlexBox",
                className: "enyo-bg",
                flex: 1,
                components: [{
                    name: "header",
                    pack: "start",
                    kind: "Header",
                    height: "65px;",
                    className: "enyo-header-dark",
                    style:"background-color:#817339;color:black;margin:1px;",
                    components: [{
                        content: $L("Categories"),
                        style: "font-size: 0.9em;color:white;"
                    }]
                }, {
                    kind: "Scroller",
                    flex: 1,
                    components: [
                    //{name: "categorylist", kind: "VirtualList", onclick: "categorySelected", height: "600px;",  
                    {
                        name: "categorylist",
                        kind: "VirtualList",
                        reorderable: true,
                        onReorder: "reorderCategory",
                        onclick: "categorySelected",
                        height: "600px;",
                        onSetupRow: "setupRow",
                        components: [{
                            name: "listItem",
                            kind: "Item",
                            //onConfirm: "deleteCategoryItem",
                            layoutKind: "HFlexLayout",
                            components: [{
                                kind: enyo.HFlexBox,
                                flex: 1,
                                components: [{
                                    name: "catVal",
                                    flex: 2,
                                    style: "font-size: 0.9em;margin:10px;font-family:'Lucida Console';"
                                }, {
                                    name: "categoryimage",
                                    src: "images/fav32.png",
                                    kind: "Image",
                                    width: "32px",
                                    height: "32px",
                                    flex: 1,
                                    pack: "center"
                                }]
                            }]
                        }]
                    }]
                }, {
                    kind: "Toolbar",style:"background-color:#817339;color:black;margin:1px;",
                    components: [{
                        kind: "GrabButton"
                    }]
                }]
            }]
        }, {
            name: "middle",
            width: "200px",
            fixedWidth: true,
            /*peekWidth: 68,*/
            components: [{
                kind: "VFlexBox",
                className: "enyo-bg",
                flex: 1,
                components: [{
                    name: "siteheader",
                    pack: "start",
                    kind: "Header",
                    height: "65px;",
                    className: "enyo-header-dark",
                    style:"background-color:#817339;color:white;margin:1px;",
                    components: [{
                        content: $L("Chapters"),
						name:"chapterheader",
                        flex: 1,
                        style: "font-size: 0.9em;"
                    }]
                }, {
                    kind: "Scroller",
                    flex: 1,
                    components: [
                    //{name: "sitelist", kind: "VirtualList", onclick: "siteSelected", height: "600px;",  
                    {
                        name: "sitelist",
                        kind: "VirtualList",
                        reorderable: true,
                        onReorder: "reorderList",
                        onclick: "siteSelected",
                        height: "600px;",
                        onSetupRow: "setupSiteRow",
                        components: [{
                            name: "siteItem",
                            kind: "Item",
                            layoutKind: "HFlexLayout",
                            components: [{
                                kind: enyo.HFlexBox,
                                flex: 1,
                                components: [{
                                    name: "siteVal",
                                    flex: 2,
                                    style: "font-size: 0.9em;margin:10px;font-family:'Lucida Console';"
                                }, {
                                    name: "siteimage",
                                    kind: "Image",
                                    width: "32px",
                                    height: "32px",
                                    flex: 1,
                                    pack: "center"
                                }]
                            }]
                        }]
                    }]
                }, {
                    kind: "Toolbar",style:"background-color:#817339;color:black;margin:1px;",
                    components: [{
                        kind: "GrabButton"
                    }, {
                        caption: "",
                        flex: 1.0
                    }, {
                        kind: "ToolButtonGroup",
                        pack: "center",
                        components: [
							{
								kind: "Button",
								caption: $L("Start Test"),
								name: "startBtn",disabled: true, active: true,
								style: "margin:1px;font-size: 0.9em;",
								className: "enyo-button-affirmative",
								onclick: "startBtnClicked",
								flex: 1
							}
                        ]
                    }]
                }]
            }]
        }, {
            name: "right",
            flex: 1,
            dismissible: false,
            onHide: "rightHide",
            onShow: "rightShow",
            onResize: "slidingResize",
            components: [{
                kind: "VFlexBox",
                className: "enyo-bg",
                flex: 1,
                components: [
                {
                    name: "mainheader",
                    pack: "start",
                    kind: "Header",
                    height: "65px;",
                    className: "enyo-header-dark",
                    style:"background-color:#817339;color:black;margin:1px;",
                    components: [
					{
                        content: "",
                        flex: 5,
                    },
					{
						kind: "Button",
						caption: $L("Results History"), 
						name: "resultsBtn", disabled: false,
						style: "margin:1px;font-size: 0.9em;",
						className: "enyo-button-blue",
						onclick: "resultsBtnClicked",
						flex: 1.5
					}]
                },
				{name: "pane", kind: "Pane", flex: 1, style:"background-color:#448820",transitionKind: "enyo.transitions.LeftRightFlyin", //transitionKind: "enyo.transitions.Fade",
				components: [
					{kind: enyo.VFlexBox,flex:1,name: "defaultquizpage",  style:"background:url(images/background2.jpg);",
					components: [
						{content: "", flex:0.25,},
					]},
					{kind: enyo.VFlexBox,flex:1,name: "mainquizpage",style:"background:url(images/background2.jpg);",
					components: [
						{content: "", flex:0.25,},
						{kind: enyo.HFlexBox,flex:0.60,
							components: [
								{content: "", flex:1,},							
								{kind: enyo.HFlexBox,flex:3,
									components: [
										{content: "Time Left: ", flex:1,style:"font-size: 1.0em;margin:7px;margin-right:15px;"},
										{
											kind: "ToolButtonGroup",flex:1.1,
											pack: "center",
											components: [
											{icon: "images/orange_0_32.png",name: "time1",className: "enyo-radiobutton-dark enyo-grouped-toolbutton-dark"},
											{icon: "images/orange_0_32.png",name: "time2",className: "enyo-radiobutton-dark enyo-grouped-toolbutton-dark"},
											{icon: "images/orange_0_32.png",name: "time3",className: "enyo-radiobutton-dark enyo-grouped-toolbutton-dark"},
											]
										},	
										
								]},
								{content: "", flex:5,},
								{content: "", name:"probtracker", flex:1,},	
						]},
						{content: "", flex:2.5,},
						{kind: enyo.HFlexBox,flex:5,
								components: [
								{content: "", flex:1,},
								{kind: enyo.VFlexBox,flex:3.25,
								components: [
									{kind: enyo.HFlexBox,flex:1.5,
										components: [
										{content: "", flex:0.9,},
										{content: "", name:"problemContent", flex:2,style:"font-size: 1.8em;margin:10px;margin-right:25px;font-weight: bold"},
										{content: "", flex:0.2,},
									]},
									{kind: enyo.HFlexBox,flex:0.95,
									components: [
									{kind: "Button", name:"answer1", caption: "",onclick: "answer1Clicked",flex:1,style:"font-size: 1.8em;margin:10px;margin-right:20px;font-weight: bold"},
									{kind: "Button", name:"answer2", caption: "",onclick: "answer2Clicked",flex:1,style:"font-size: 1.8em;margin:10px;margin-right:20px;font-weight: bold"},
									]},
									{kind: enyo.HFlexBox,flex:0.95,
									components: [
									{kind: "Button", name:"answer3", caption: "",flex:1,onclick: "answer3Clicked",style:"font-size: 1.8em;margin:10px;margin-right:20px;font-weight: bold"},
									{kind: "Button", name:"answer4", caption: "",flex:1,onclick: "answer4Clicked",style:"font-size: 1.8em;margin:10px;margin-right:20px;font-weight: bold"},
									]},
									{content: "", flex:2,},
								]},
								{content: "", flex:1,},
								]
						},
						{content: "", flex:1,},
					]},
					{kind: enyo.VFlexBox,flex:1,name: "resultsquizpage",style:"background:url(images/background2.jpg);",
					components: [
						{content: "", flex:0.20,},
						{kind: enyo.HFlexBox,flex:0.60,
							components: [
								{content: "", flex:0.8,},							
								{kind: enyo.HFlexBox,flex:3,
									components: [
										{name: "solnSheetHdr", content: "Solution Sheet: ", flex:1,style:"font-size: 1.0em;margin:7px;margin-right:15px;font-weight: bold"},
								]},
								{content: "", flex:5,},
						]},
						{content: "", flex:0.4,},
						{kind: enyo.VFlexBox,flex:15,
						components: [
							{kind: enyo.HFlexBox,flex:1,
								components: [
								{content: "", flex:0.8,},
								{name:"contentScroller", kind: "Scroller", flex: 3,components: [
									{name:"resultcontent",content: "", allowHtml: true,autoFit: true,
										style:"padding: 5px;font-size: 0.9em;",},
								]},
								{content: "", flex:4,},
							]},
						]},						
						{content: "", flex:0.5,},
					]},
				]},
				{
                    kind: "Toolbar",style:"background-color:#817339",
                    components: [{
                        kind: "GrabButton",
                    }, 
					{
                        caption: "",
                        flex: 0.75
                    },{
                        content: "",name: "teststatus",
                        flex: 4,
                        style: "font-size: 0.9em;"
                    }, 
					{
                        caption: "",
                        flex: 3
                    },
					{
                        kind: "ToolButtonGroup",
                        pack: "center",
                        components: [
						{
							kind: "Button",
							caption: $L("Stop Test"), 
							name: "stopBtn", disabled: true, active: true,
							style: "margin:1px;font-size: 0.9em;",
							className: "enyo-button-negative",
							onclick: "stopBtnClicked",
							flex: 1
						}
                        ]
                    }, ]
                }]
            }]
        }]
    }, 
	{name: "resultDialog", kind: "ModalDialog", align: "start", width: "700px;",
		height: "530px;", flex : 1, components: [
			{kind: enyo.VFlexBox,flex:1, pack: "center", 
			components: [
			  {kind: "RowGroup", caption: "Results History", components: [
				{layoutKind: "HFlexLayout", className: "list_header", style:"background-color:#817339", components: [
					{content: "Chapter", flex : 1, style:"margin:10px;color:white;"},
					{content: "Date", flex : 1,style:"margin:10px;color:white;"},
					{content: "Difficulty", flex : 1.10,style:"margin:10px;color:white;"},
					{content: "Accuracy", flex : 1,style:"margin:10px;color:white;"},
					{content: "Time Taken", flex : 1,style:"margin:10px;color:white;"}
				]},
				{
				kind: "Scroller",
				flex: 1, height: "280px;",
				components: [
					{name: "resultlist", kind: "VirtualList", //onclick: "listSelected",
							  onSetupRow: "setupResultRow", style:"background-color:white;",
					components: [
						{name: "resultitem", kind: "SwipeableItem", layoutKind: "HFlexLayout", onConfirm: "deleteItem", components: [
							  {name: "chapterVal", flex : 0.9,style:"font-size: 0.9em;margin:5px;"},
							  {name: "dateVal", flex : 0.9,style:"font-size: 0.9em;margin:5px;"},
							  {name: "difficultyVal", flex : 1.2,style:"font-size: 0.9em;margin:5px;text-align: center;"},
							  {name: "accuracyVal", flex : 1.25,style:"font-size: 0.9em;margin:5px;"},
							  {name: "timeVal", flex : 0.75,style:"font-size: 0.9em;margin:5px;"},
						  ]}
					]}
				]}
			  ]},
			  {layoutKind: "HFlexLayout", components: [
					{content: "", flex:1,},
					{kind: "Button", caption: $L("Close"), flex: 1, style:"font-family:verdana;font-size:14px;font-weight:normal;color:white;background-color:#448820", onclick: "closeDialog"},		    	
					{content: "", flex:1,},
			  ]},
			]}
		]},
		{
			name : "makeSysSound",
			kind : "PalmService",
			service : "palm://com.palm.audio/systemsounds",
			method : "playFeedback",
			onSuccess : "makeSoundSuccess",
			onFailure : "makeSoundFailure"
		 },
		 {kind: "ModalDialog", name: "errorDialog", caption: "Error", components:[
			{name:"errorMessage", content: "", className: "enyo-text-error warning-icon"},
			{kind: "Button", caption: $L("OK"), onclick: "closeErrorPopup", style: "margin-top:10px"},
		]},
		{
        kind: "AppMenu",
        components: [{
            caption: "About",
            onclick: "openAbout"
        }, {
            caption: "Preferences",
            onclick: "openPreferences"
        }, {
            caption: "Help",
            components: [{
                caption: "Leave Review",
                onclick: "openCatalog"
            }, {
                caption: "Save / Restore Options",
                onclick: "openRestoreDialog"
            }, {
                caption: "Email Developer",
                onclick: "emailDeveloper"
            }, {
                caption: "More Apps",
                onclick: "openMoreAppDialog"
            },]
        }, ]
    }, {
        name: "aboutPopup",
        kind: "Popup",
        scrim: true,
        components: [{
            content: "Math Pro - " + enyo.fetchAppInfo().version,
            style: "text-align: center; font-size: larger;"
        }, {
            content: "<hr />",
            allowHtml: true
        }, {
            name: "aboutPopupText",
            content: "Math Pro is an app for improving your mathematical skills, have fun.",
            style: "text-align: center; font-size: smaller;"
        }, {
            content: "<hr />",
            allowHtml: true
        }, {
            kind: "Button",
            caption: "OK",
            onclick: "closeAboutPopup"
        }]
    }, {
        name: "restorePopup",
        kind: "Popup",
        scrim: true,
        width: "600px",
        components: [{
            content: "Math Pro does not have the capability to import Results History data now. However, there is a manual method of copying/restoring the results database, which is explained in detail below",
            allowHtml: true,
            style: "font-size: smaller;"
        }, {
            content: "<hr />",
            allowHtml: true
        }, {
            name: "restorePopupText",
            content: "<a href='http://petzapps.blogspot.com/2012/08/savingrestoring-math-pro-database.html'>Save / Restore Database</a>",
            allowHtml: true,
            style: "text-align: center;"
        }, {
            content: "<hr />",
            allowHtml: true
        }, {
            kind: "Button",
            caption: "OK",
            onclick: "closeRestorePopup"
        }]
    }, {
        name: "moreAppPopup",
        kind: "Popup",
        scrim: true,
        width: "600px",
        components: [{
            content: "More Apps from Me",
            allowHtml: true,
            style: "font-size: large;",
			style: "text-align: center;"
        }, {
            content: "<hr />",
            allowHtml: true
        }, {
            name: "restorePopupText1",
            content: "<img src='images/touchsurf.png' height='32' width='32' /> <a href='https://developer.palm.com/appredirect/?packageid=com.petzapps.touchsurf'>Touch Surf</a>",
            allowHtml: true,
            style: "text-align: center;"
        }, {
            name: "restorePopupText2",
            content: "<img src='images/enotes.png' height='32' width='32' /> <a href='https://developer.palm.com/appredirect/?packageid=com.petzapps.enotesenyo'>E Notes</a>",
            allowHtml: true,
            style: "text-align: center;"
        }, {
            content: "<hr />",
            allowHtml: true
        }, {
            kind: "Button",
            caption: "OK",
            onclick: "closeMoreAppPopup"
        }]
    },
    {
        name: "db",
        kind: "onecrayon.Database",
        database: 'ext:MathProDB',
        version: "",
        debug: false
    }, {
        name: "appMgrOpen",
        method: "open",
        kind: "enyo.PalmService",
        service: enyo.palmServices.application
    }, 
	{name: "preferencesPopup", kind: "Popup", scrim: true, onBeforeOpen: "beforePreferencesOpen", components: [
			{name: "preferencesHeader", style: "text-align: center;"},
			{content: "<hr>Settings<hr/>", style: "text-align: center;", allowHtml: true},
			{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
					{name: "prefDifficulty", kind: "ListSelector", label: "Difficulty (Numbers)", onChange: "difficultySelect", flex: 1, items: [
							{caption: "Easy (0-10)", value: 10,},
							{caption: "Medium (0-25)", value: 25,},
							{caption: "Hard (0-50)", value: 50,},
							{caption: "Expert (0-100)", value: 100,}
					]},
			]},
			{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
					{name: "prefNumQuestions", kind: "ListSelector", label: "# of Questions", onChange: "numQuestionsSelect", flex: 1, items: [
							{caption: "30", value: 30,},
							{caption: "50", value: 50,},
							{caption: "75", value: 75,},
					]},
			]},
			{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
					{name: "prefMaxTime", kind: "ListSelector", label: "Max. Time", onChange: "maxTimeSelect", flex: 1, items: [
							{caption: "1 min", value: 60,},
							{caption: "2 min", value: 120,},
							{caption: "3 min", value: 180,},
							{caption: "5 min", value: 300,},
					]},
			]},
			{kind: "Button", caption: "Save", onclick:"saveNewPreferences"}
	]}, ],
	resultsBtnClicked: function() {
		this.$.resultDialog.openAtCenter();
		try {
		 this.$.db.query('SELECT * FROM results order by rowID desc',
								{onSuccess: this.queryResultsResponse.bind(this)});
		}
		catch (e)
		{
			this.error("Error"+e);
		}
	},
	queryResultsResponse: function (results) {
        var list = [];
        //console.log("queryResponse data length: "+results.length);
        for (var i = 0; i < results.length; i++) {
            list[i] = results[i];
        }
        this.resultsdata = list; //set list to data
        this.$.resultlist.punt();
    },
	deleteItem: function(inSender, inIndex) {
		var record = this.resultsdata[inIndex];
		this.resultsdata.splice(inIndex, 1);
		var additionaldata;
		if (record) {
			//Delete item from DB
			var deletedb = this.$.db.getDelete("results",{"rowID":record.rowID});
			this.$.db.query(deletedb, additionaldata);
		}
		this.$.resultlist.punt();	
	},
	closeDialog: function () {
        this.$.resultDialog.close();
    },    
	startBtnClicked: function() {
		if(this.testinprogress) {
			this.showErrorDialog("Test is already in progress...");
			return;
		}
		
		this.$.pane.selectViewByName("mainquizpage");
		this.disableStart();
		this.enableStop();
		this.$.slidingPane.selectView(this.$.right);
		this.solnContent = "";
		this.testinprogress = true;
		this.probCounter = 1;
		this.correctCounter = 0;
		//Get problem configurations
		//Max Number
		this.maxnumber = parseInt(enyo.application.difficulty);
		//Max Questions
		this.maxquestions = enyo.application.numquestions;
		//Selected Category
		this.category = this.data[this.selectedRow].category_id;
		//Selected Chapter
		this.chapter = this.sitedata[this.selectedSiteRow].site_id;
        //Max Time
		this.intmaxtime = enyo.application.maxtime;
		this.maxtime = this.intmaxtime.toString();
		//Get the numbers and problem
		this.getTwoNumbers();		
		var currentDate = new Date();
		this.starttime = currentDate.getTime();
		//
		if(this.maxtime.length == 3) {
			this.$.time1.setIcon("images/orange_"+this.maxtime.charAt(0)+"_32.png");
			this.$.time2.setIcon("images/orange_"+this.maxtime.charAt(1)+"_32.png");
			this.$.time3.setIcon("images/orange_"+this.maxtime.charAt(2)+"_32.png");
		} else if (this.maxtime.length == 2) {
			this.$.time1.setIcon("images/orange_0_32.png");
			this.$.time2.setIcon("images/orange_"+this.maxtime.charAt(0)+"_32.png");
			this.$.time3.setIcon("images/orange_"+this.maxtime.charAt(1)+"_32.png");
		} else if (this.maxtime.length == 1) {
			this.$.time1.setIcon("images/orange_0_32.png");
			this.$.time2.setIcon("images/orange_0_32.png");
			this.$.time3.setIcon("images/orange_"+this.maxtime+"_32.png");
		}
		
		window.timer = window.setTimeout(enyo.bind(this, "timeReload"), 1000);	
	},
	getTwoNumbers: function() {
		if(this.probCounter > this.maxquestions) {
			var currentDate = new Date();
			var endtime = currentDate.getTime();
			this.timetakenresult = ((endtime - this.starttime) / 1000).toPrecision(4)+" sec";
			//Show results data
			this.showResultData();			
			return;
		}
		this.$.probtracker.setContent(this.probCounter +"/"+ this.maxquestions);
		
		this.firstNum = Math.floor(Math.random() * (this.maxnumber + 1));
		this.secondNum = Math.floor(Math.random() * (this.maxnumber + 1));
		//Make sure this.firstNum and this.secondNum do not both equal zero
		if ((this.firstNum == 0) && (this.secondNum == 0)) {
			while (this.firstNum == 0) {
				this.firstNum = Math.floor(Math.random() * (this.maxnumber + 1));
			}
		} 
		if ((this.category == "Multi" || this.category == "Div")
			&& ((this.firstNum == 0) || (this.secondNum == 0))) {
			while (this.firstNum == 0) {
				this.firstNum = Math.floor(Math.random() * (this.maxnumber + 1));
			}
			while (this.secondNum == 0) {
				this.secondNum = Math.floor(Math.random() * (this.maxnumber + 1));
			}
		}
		if(this.category == "Div") {
			this.expression = this.firstNum;
			this.firstNum = this.firstNum * this.secondNum;
		}
		//Get the problem
		this.getNextProblem();
	},
	getNextProblem: function() {
		//Get next problem using maxnumber, category and chapter
	  if (this.category == "Add") {
		this.add();
		this.solnContent += this.probCounter+") "+this.firstNum + " + "+this.secondNum+" = "+this.expression;
	  }
	  if (this.category == "Sub") {
		if (this.firstNum < this.secondNum) {
			var z = this.firstNum;
			this.firstNum = this.secondNum;
			this.secondNum = z;
		}
		this.subtract();
		this.solnContent += this.probCounter+") "+this.firstNum + " - "+this.secondNum+" = "+this.expression;
	  }
	  if (this.category == "Multi") {
		this.multiply();
		this.solnContent += this.probCounter+") "+this.firstNum + " x "+this.secondNum+" = "+this.expression;
	  }
	  if (this.category == "Div") {
		this.divide();
		this.solnContent += this.probCounter+") "+this.firstNum + " / "+this.secondNum+" = "+this.expression;
	  }
	  //If Mixed is selected,
	  if (this.category == "Mix") {
		var K = Math.floor(4 * Math.random());
		if (K == 0) {
			this.add();
			this.solnContent += this.probCounter+") "+this.firstNum + " + "+this.secondNum+" = "+this.expression;
		}
		if (K == 1) {
			if (this.firstNum < this.secondNum) {
				var z = this.firstNum;
				this.firstNum = this.secondNum;
				this.secondNum = z;
			}
			this.subtract();
			this.solnContent += this.probCounter+") "+this.firstNum + " - "+this.secondNum+" = "+this.expression;
		}
		if (K == 2) {
			if (((this.firstNum == 0) || (this.secondNum == 0))) {
				while (this.firstNum == 0) {
					this.firstNum = Math.floor(Math.random() * (this.maxnumber + 1));
				}
				while (this.secondNum == 0) {
					this.secondNum = Math.floor(Math.random() * (this.maxnumber + 1));
				}
			}
			this.multiply();
			this.solnContent += this.probCounter+") "+this.firstNum + " x "+this.secondNum+" = "+this.expression;
		}                                              
		if (K == 3) {
			if (((this.firstNum == 0) || (this.secondNum == 0))) {
				while (this.firstNum == 0) {
					this.firstNum = Math.floor(Math.random() * (this.maxnumber + 1));
				}
				while (this.secondNum == 0) {
					this.secondNum = Math.floor(Math.random() * (this.maxnumber + 1));
				}
			}
			this.expression = this.firstNum;
			this.firstNum = this.firstNum * this.secondNum;
			
			this.divide();
			this.solnContent += this.probCounter+") "+this.firstNum + " / "+this.secondNum+" = "+this.expression;
		}
	  }
	  this.probCounter += 1 ;
	},
	divide: function() {
		var temparr = [];
		var tempnum1;
		var tempnum2;
		if(this.chapter == "Ch1") {
			this.$.problemContent.setContent(this.firstNum + " / ? = "+this.expression);
			temparr[0] = this.secondNum;
		
			temparr[1] = Math.floor(Math.random() * (this.maxnumber + 1));
			while (this.secondNum == temparr[1]) {
				temparr[1] = Math.floor(Math.random() * (this.maxnumber + 1));
			}
				
			temparr[2] = Math.floor(Math.random() * (this.maxnumber + 1));
			while (this.secondNum == temparr[2] || temparr[1] == temparr[2]) {
				temparr[2] = Math.floor(Math.random() * (this.maxnumber + 1));
			}
		
			temparr[3] = Math.floor(Math.random() * (this.maxnumber + 1));
			while (this.secondNum == temparr[3] || temparr[1] == temparr[3] || temparr[2] == temparr[3]) {
				temparr[3] = Math.floor(Math.random() * (this.maxnumber + 1));
			}
		} else if(this.chapter == "Ch2") {
			this.$.problemContent.setContent(this.firstNum + " / "+this.secondNum+" = ?");
			temparr[0] = this.expression;
		
			temparr[1] = Math.floor(Math.random() * (this.maxnumber + 1));
			while (this.expression == temparr[1]) {
				temparr[1] = Math.floor(Math.random() * (this.maxnumber + 1));
			}
				
			temparr[2] = Math.floor(Math.random() * (this.maxnumber + 1));
			while (this.expression == temparr[2] || temparr[1] == temparr[2]) {
				temparr[2] = Math.floor(Math.random() * (this.maxnumber + 1));
			}
		
			temparr[3] = Math.floor(Math.random() * (this.maxnumber + 1));
			while (this.expression == temparr[3] || temparr[1] == temparr[3] || temparr[2] == temparr[3]) {
				temparr[3] = Math.floor(Math.random() * (this.maxnumber + 1));
			}
		} else if(this.chapter == "Ch3") {
			this.$.problemContent.setContent("? / ? = "+this.expression);
			temparr[0] = this.firstNum + " / "+this.secondNum;
						
			tempnum1 = Math.floor(Math.random() * (this.maxnumber + 1));
			tempnum2 = Math.floor(Math.random() * (this.maxnumber + 1));
			while (tempnum2 == 0 || (this.expression == (tempnum1 / tempnum2))) {
				tempnum1 = Math.floor(Math.random() * (this.maxnumber + 1));
				tempnum2 = Math.floor(Math.random() * (this.maxnumber + 1));
			}
			temparr[1] = tempnum1 + " / "+tempnum2;
			
			tempnum1 = Math.floor(Math.random() * (this.maxnumber + 1));
			tempnum2 = Math.floor(Math.random() * (this.maxnumber + 1));
			while (tempnum2 == 0 || (this.expression == (tempnum1 / tempnum2))) {
				tempnum1 = Math.floor(Math.random() * (this.maxnumber + 1));
				tempnum2 = Math.floor(Math.random() * (this.maxnumber + 1));
			}
			temparr[2] = tempnum1 + " / "+tempnum2;
			
			tempnum1 = Math.floor(Math.random() * (this.maxnumber + 1));
			tempnum2 = Math.floor(Math.random() * (this.maxnumber + 1));
			while (tempnum2 == 0 || (this.expression == (tempnum1 / tempnum2))) {
				tempnum1 = Math.floor(Math.random() * (this.maxnumber + 1));
				tempnum2 = Math.floor(Math.random() * (this.maxnumber + 1));
			}
			temparr[3] = tempnum1 + " / "+tempnum2;
		}
		
		this.getRandomNumbers();
		this.$.answer1.setCaption(""+temparr[this.randomarr[0]]);
		this.$.answer2.setCaption(""+temparr[this.randomarr[1]]);
		this.$.answer3.setCaption(""+temparr[this.randomarr[2]]);
		this.$.answer4.setCaption(""+temparr[this.randomarr[3]]);
	},
	multiply: function() {
		var temparr = [];
		var tempnum1;
		var tempnum2;
		this.expression = this.firstNum * this.secondNum;
		if(this.chapter == "Ch1") {
			this.$.problemContent.setContent(this.firstNum + " x ? = "+this.expression);
			temparr[0] = this.secondNum;
		
			temparr[1] = Math.floor(Math.random() * (this.maxnumber + 1));
			while (this.secondNum == temparr[1]) {
				temparr[1] = Math.floor(Math.random() * (this.maxnumber + 1));
			}
				
			temparr[2] = Math.floor(Math.random() * (this.maxnumber + 1));
			while (this.secondNum == temparr[2] || temparr[1] == temparr[2]) {
				temparr[2] = Math.floor(Math.random() * (this.maxnumber + 1));
			}
		
			temparr[3] = Math.floor(Math.random() * (this.maxnumber + 1));
			while (this.secondNum == temparr[3] || temparr[1] == temparr[3] || temparr[2] == temparr[3]) {
				temparr[3] = Math.floor(Math.random() * (this.maxnumber + 1));
			} 
		} else if(this.chapter == "Ch2") {
			this.$.problemContent.setContent(this.firstNum + " x "+this.secondNum+" = ?");
			temparr[0] = this.expression;
		
			temparr[1] = Math.floor(Math.random() * (this.maxnumber + 1));
			while (this.expression == temparr[1]) {
				temparr[1] = Math.floor(Math.random() * (this.maxnumber + 1));
			}
				
			temparr[2] = Math.floor(Math.random() * (this.maxnumber + 1));
			while (this.expression == temparr[2] || temparr[1] == temparr[2]) {
				temparr[2] = Math.floor(Math.random() * (this.maxnumber + 1));
			}
		
			temparr[3] = Math.floor(Math.random() * (this.maxnumber + 1));
			while (this.expression == temparr[3] || temparr[1] == temparr[3] || temparr[2] == temparr[3]) {
				temparr[3] = Math.floor(Math.random() * (this.maxnumber + 1));
			}
		} else if(this.chapter == "Ch3") {
			this.$.problemContent.setContent("? * ? = "+this.expression);
			temparr[0] = this.firstNum + " x "+this.secondNum;
						
			tempnum1 = Math.floor(Math.random() * (this.maxnumber + 1));
			tempnum2 = Math.floor(Math.random() * (this.maxnumber + 1));
			while (this.expression == (tempnum1 * tempnum2)) {
				tempnum1 = Math.floor(Math.random() * (this.maxnumber + 1));
				tempnum2 = Math.floor(Math.random() * (this.maxnumber + 1));
			}
			temparr[1] = tempnum1 + " x "+tempnum2;
			
			tempnum1 = Math.floor(Math.random() * (this.maxnumber + 1));
			tempnum2 = Math.floor(Math.random() * (this.maxnumber + 1));
			while (this.expression == (tempnum1 * tempnum2)) {
				tempnum1 = Math.floor(Math.random() * (this.maxnumber + 1));
				tempnum2 = Math.floor(Math.random() * (this.maxnumber + 1));
			}
			temparr[2] = tempnum1 + " x "+tempnum2;
			
			tempnum1 = Math.floor(Math.random() * (this.maxnumber + 1));
			tempnum2 = Math.floor(Math.random() * (this.maxnumber + 1));
			while (this.expression == (tempnum1 * tempnum2)) {
				tempnum1 = Math.floor(Math.random() * (this.maxnumber + 1));
				tempnum2 = Math.floor(Math.random() * (this.maxnumber + 1));
			}
			temparr[3] = tempnum1 + " x "+tempnum2;
		}
		
		this.getRandomNumbers();
		this.$.answer1.setCaption(""+temparr[this.randomarr[0]]);
		this.$.answer2.setCaption(""+temparr[this.randomarr[1]]);
		this.$.answer3.setCaption(""+temparr[this.randomarr[2]]);
		this.$.answer4.setCaption(""+temparr[this.randomarr[3]]);
	},
	subtract: function() {
		var temparr = [];
		var tempnum1;
		var tempnum2;
		this.expression = this.firstNum - this.secondNum;
		if(this.chapter == "Ch1") {
			this.$.problemContent.setContent(this.firstNum + " - ? = "+this.expression);
			temparr[0] = this.secondNum;
		
			temparr[1] = Math.floor(Math.random() * (this.maxnumber + 1));
			while (this.secondNum == temparr[1]) {
				temparr[1] = Math.floor(Math.random() * (this.maxnumber + 1));
			}
				
			temparr[2] = Math.floor(Math.random() * (this.maxnumber + 1));
			while (this.secondNum == temparr[2] || temparr[1] == temparr[2]) {
				temparr[2] = Math.floor(Math.random() * (this.maxnumber + 1));
			}
		
			temparr[3] = Math.floor(Math.random() * (this.maxnumber + 1));
			while (this.secondNum == temparr[3] || temparr[1] == temparr[3] || temparr[2] == temparr[3]) {
				temparr[3] = Math.floor(Math.random() * (this.maxnumber + 1));
			} 
		} else if(this.chapter == "Ch2") {
			this.$.problemContent.setContent(this.firstNum + " - "+this.secondNum+" = ?");
			temparr[0] = this.expression;
		
			temparr[1] = Math.floor(Math.random() * (this.maxnumber + 1));
			while (this.expression == temparr[1]) {
				temparr[1] = Math.floor(Math.random() * (this.maxnumber + 1));
			}
				
			temparr[2] = Math.floor(Math.random() * (this.maxnumber + 1));
			while (this.expression == temparr[2] || temparr[1] == temparr[2]) {
				temparr[2] = Math.floor(Math.random() * (this.maxnumber + 1));
			}
		
			temparr[3] = Math.floor(Math.random() * (this.maxnumber + 1));
			while (this.expression == temparr[3] || temparr[1] == temparr[3] || temparr[2] == temparr[3]) {
				temparr[3] = Math.floor(Math.random() * (this.maxnumber + 1));
			}
		} else if(this.chapter == "Ch3") {
			this.$.problemContent.setContent("? - ? = "+this.expression);
			temparr[0] = this.firstNum + " - "+this.secondNum;
						
			tempnum1 = Math.floor(Math.random() * (this.maxnumber + 1));
			tempnum2 = Math.floor(Math.random() * (this.maxnumber + 1));
			while (this.expression == (tempnum1 - tempnum2) || (tempnum1 - tempnum2) < 0) {
				tempnum1 = Math.floor(Math.random() * (this.maxnumber + 1));
				tempnum2 = Math.floor(Math.random() * (this.maxnumber + 1));
			}
			temparr[1] = tempnum1 + " - "+tempnum2;
			
			tempnum1 = Math.floor(Math.random() * (this.maxnumber + 1));
			tempnum2 = Math.floor(Math.random() * (this.maxnumber + 1));
			while (this.expression == (tempnum1 - tempnum2) || (tempnum1 - tempnum2) < 0) {
				tempnum1 = Math.floor(Math.random() * (this.maxnumber + 1));
				tempnum2 = Math.floor(Math.random() * (this.maxnumber + 1));
			}
			temparr[2] = tempnum1 + " - "+tempnum2;
			
			tempnum1 = Math.floor(Math.random() * (this.maxnumber + 1));
			tempnum2 = Math.floor(Math.random() * (this.maxnumber + 1));
			while (this.expression == (tempnum1 - tempnum2) || (tempnum1 - tempnum2) < 0) {
				tempnum1 = Math.floor(Math.random() * (this.maxnumber + 1));
				tempnum2 = Math.floor(Math.random() * (this.maxnumber + 1));
			}
			temparr[3] = tempnum1 + " - "+tempnum2;
		}
		
		this.getRandomNumbers();
		this.$.answer1.setCaption(""+temparr[this.randomarr[0]]);
		this.$.answer2.setCaption(""+temparr[this.randomarr[1]]);
		this.$.answer3.setCaption(""+temparr[this.randomarr[2]]);
		this.$.answer4.setCaption(""+temparr[this.randomarr[3]]);
	},
	add: function() {
		var temparr = [];
		var tempnum1;
		var tempnum2;
		this.expression = this.firstNum + this.secondNum;
		if(this.chapter == "Ch1") {
			this.$.problemContent.setContent(this.firstNum + " + ? = "+this.expression);
			temparr[0] = this.secondNum;
		
			temparr[1] = Math.floor(Math.random() * (this.maxnumber + 1));
			while (this.secondNum == temparr[1]) {
				temparr[1] = Math.floor(Math.random() * (this.maxnumber + 1));
			}
				
			temparr[2] = Math.floor(Math.random() * (this.maxnumber + 1));
			while (this.secondNum == temparr[2] || temparr[1] == temparr[2]) {
				temparr[2] = Math.floor(Math.random() * (this.maxnumber + 1));
			}
		
			temparr[3] = Math.floor(Math.random() * (this.maxnumber + 1));
			while (this.secondNum == temparr[3] || temparr[1] == temparr[3] || temparr[2] == temparr[3]) {
				temparr[3] = Math.floor(Math.random() * (this.maxnumber + 1));
			}
		} else if(this.chapter == "Ch2") {
			this.$.problemContent.setContent(this.firstNum + " + "+this.secondNum+" = ?");
			temparr[0] = this.expression;
		
			temparr[1] = Math.floor(Math.random() * (this.maxnumber + 1));
			while (this.expression == temparr[1]) {
				temparr[1] = Math.floor(Math.random() * (this.maxnumber + 1));
			}
				
			temparr[2] = Math.floor(Math.random() * (this.maxnumber + 1));
			while (this.expression == temparr[2] || temparr[1] == temparr[2]) {
				temparr[2] = Math.floor(Math.random() * (this.maxnumber + 1));
			}
		
			temparr[3] = Math.floor(Math.random() * (this.maxnumber + 1));
			while (this.expression == temparr[3] || temparr[1] == temparr[3] || temparr[2] == temparr[3]) {
				temparr[3] = Math.floor(Math.random() * (this.maxnumber + 1));
			}
		} else if(this.chapter == "Ch3") {
			this.$.problemContent.setContent("? + ? = "+this.expression);
			temparr[0] = this.firstNum + " + "+this.secondNum;
						
			tempnum1 = Math.floor(Math.random() * (this.maxnumber + 1));
			tempnum2 = Math.floor(Math.random() * (this.maxnumber + 1));
			while (this.expression == (tempnum1 + tempnum2)) {
				tempnum1 = Math.floor(Math.random() * (this.maxnumber + 1));
				tempnum2 = Math.floor(Math.random() * (this.maxnumber + 1));
			}
			temparr[1] = tempnum1 + " + "+tempnum2;
			
			tempnum1 = Math.floor(Math.random() * (this.maxnumber + 1));
			tempnum2 = Math.floor(Math.random() * (this.maxnumber + 1));
			while (this.expression == (tempnum1 + tempnum2)) {
				tempnum1 = Math.floor(Math.random() * (this.maxnumber + 1));
				tempnum2 = Math.floor(Math.random() * (this.maxnumber + 1));
			}
			temparr[2] = tempnum1 + " + "+tempnum2;
			
			tempnum1 = Math.floor(Math.random() * (this.maxnumber + 1));
			tempnum2 = Math.floor(Math.random() * (this.maxnumber + 1));
			while (this.expression == (tempnum1 + tempnum2)) {
				tempnum1 = Math.floor(Math.random() * (this.maxnumber + 1));
				tempnum2 = Math.floor(Math.random() * (this.maxnumber + 1));
			}
			temparr[3] = tempnum1 + " + "+tempnum2;
		}
	  
		this.getRandomNumbers();
		this.$.answer1.setCaption(""+temparr[this.randomarr[0]]);
		this.$.answer2.setCaption(""+temparr[this.randomarr[1]]);
		this.$.answer3.setCaption(""+temparr[this.randomarr[2]]);
		this.$.answer4.setCaption(""+temparr[this.randomarr[3]]);
	},
	getRandomNumbers: function() {
		this.randomarr = [];
		var found=false;
		while(this.randomarr.length < 4){
		  var randomnumber=Math.floor(Math.random()*4);
		  found=false;
		  for(var i=0;i<this.randomarr.length;i++){
			if(this.randomarr[i]==randomnumber)
				{found=true;break};
		  }
		  if(!found)this.randomarr[this.randomarr.length]=randomnumber;
		}
	},
	answer1Clicked: function() {
		this.selAnswer = this.$.answer1.getCaption();
		this.validateAnswer();		
	},
	answer2Clicked: function() {
		this.selAnswer = this.$.answer2.getCaption();
		this.validateAnswer();		
	},
	answer3Clicked: function() {
		this.selAnswer = this.$.answer3.getCaption();
		this.validateAnswer();		
	},
	answer4Clicked: function() {
		this.selAnswer = this.$.answer4.getCaption();
		this.validateAnswer();		
	},
	validateAnswer: function() {
		var image = "<img src='images/correct.png' alt=''/>";
		
		if(this.chapter == "Ch1") {
			if((""+this.secondNum) == this.selAnswer) {
				this.$.teststatus.setCaption("Correct");
				this.solnContent += " "+image+"<br><br>";
				this.correctCounter += 1;
				//this.$.correct.play();
				this.$.makeSysSound.call({"name": "appclose"});
				//Get the numbers and problem
				this.getTwoNumbers();
			} else {
				this.$.teststatus.setCaption("Wrong, correct answer is "+this.secondNum);
				image = "<img src='images/alert.png' alt=''/>";
				this.solnContent += " "+image+"<br><br>";
				//this.$.sound.play();
				this.$.makeSysSound.call({"name": "error_02"});
				//this.$.teststatus.setIcon("images/warning.png");					
				//Get the numbers and problem
				this.getTwoNumbers();
			}
		} else if(this.chapter == "Ch2") {
			if((""+this.expression) == this.selAnswer) {
				this.$.teststatus.setCaption("Correct");
				this.solnContent += " "+image+"<br><br>";
				this.correctCounter += 1;
				//this.$.correct.play();
				this.$.makeSysSound.call({"name": "appclose"});
				//Get the numbers and problem
				this.getTwoNumbers();
			} else {
				this.$.teststatus.setCaption("Wrong, correct answer is "+this.expression);
				image = "<img src='images/alert.png' alt=''/>";
				this.solnContent += " "+image+"<br><br>";
				//this.$.sound.play();
				this.$.makeSysSound.call({"name": "error_02"});
				//this.$.teststatus.setIcon("images/warning.png");					
				//Get the numbers and problem
				this.getTwoNumbers();
			}
		} else if(this.chapter == "Ch3") {
			var correctAns;
			if (this.category == "Add") {
				correctAns = (this.firstNum+" + "+this.secondNum);
			} else if (this.category == "Sub") {
				correctAns = (this.firstNum+" - "+this.secondNum);
			} else if (this.category == "Multi") {
				correctAns = (this.firstNum+" x "+this.secondNum);
			} else if (this.category == "Div") {
				correctAns = (this.firstNum+" / "+this.secondNum);
			} else if (this.category == "Mix") {
				correctAns = (this.firstNum+" / "+this.secondNum);
				if((this.firstNum+" + "+this.secondNum) == this.selAnswer
					|| (this.firstNum+" - "+this.secondNum) == this.selAnswer
					|| (this.firstNum+" x "+this.secondNum) == this.selAnswer
					|| (this.firstNum+" / "+this.secondNum) == this.selAnswer) {
					correctAns = this.selAnswer;
				}
			}
			if(correctAns == this.selAnswer) {
				this.$.teststatus.setCaption("Correct");
				this.solnContent += " "+image+"<br><br>";
				this.correctCounter += 1;
				//this.$.correct.play();
				this.$.makeSysSound.call({"name": "appclose"});
				//Get the numbers and problem
				this.getTwoNumbers();
			} else {
				this.$.teststatus.setCaption("Wrong, correct answer is "+this.expression);
				image = "<img src='images/alert.png' alt=''/>";
				this.solnContent += " "+image+"<br><br>";
				//this.$.sound.play();
				
				this.$.makeSysSound.call({"name": "error_02"});
				//Get the numbers and problem
				this.getTwoNumbers();
			}
		}
	},
	makeSoundSuccess: function(inSender, inResponse) {
		//console.log("Make sound success, results=" + enyo.json.stringify(inResponse));
	},          
	// Log errors to the console for debugging
	makeSoundFailure: function(inSender, inError, inRequest) {
		//console.log(enyo.json.stringify(inError));
	},
	timeReload: function() {
		//console.log("timeReload: "+this.intmaxtime);
		//console.log("maxtime: "+this.maxtime);
		this.intmaxtime -= 1;
		this.maxtime = this.intmaxtime.toString();
		if(this.intmaxtime == 0) {
			this.timetakenresult = enyo.application.maxtime+" sec";
			//Show results data
			this.showResultData();			
			return;
		}
		//console.log("this.maxtime.length: "+this.maxtime.length);
		if(this.maxtime.length == 3) {
			this.$.time1.setIcon("images/orange_"+this.maxtime.charAt(0)+"_32.png");
			this.$.time2.setIcon("images/orange_"+this.maxtime.charAt(1)+"_32.png");
			this.$.time3.setIcon("images/orange_"+this.maxtime.charAt(2)+"_32.png");
		} else if (this.maxtime.length == 2) {
			this.$.time1.setIcon("images/orange_0_32.png");
			this.$.time2.setIcon("images/orange_"+this.maxtime.charAt(0)+"_32.png");
			this.$.time3.setIcon("images/orange_"+this.maxtime.charAt(1)+"_32.png");
		} else if (this.maxtime.length == 1) {
			this.$.time1.setIcon("images/orange_0_32.png");
			this.$.time2.setIcon("images/orange_0_32.png");
			this.$.time3.setIcon("images/orange_"+this.maxtime+"_32.png");
		}
		window.timer = window.setTimeout(enyo.bind(this, "timeReload"), 1000);
	},
	showResultData: function () {
		var adddb = [];
		var currentDate = new Date();
		this.testinprogress = false;
		//Clear timer
		window.clearTimeout(window.timer);
		//Show results page
		this.$.pane.selectViewByName("resultsquizpage");
		this.$.solnSheetHdr.setContent("Solution Sheet: ");
		this.disableStop();
		this.enableStart();		
        this.$.resultcontent.setContent(this.solnContent);
		this.$.teststatus.setCaption("");
		this.accuracy = (this.correctCounter / enyo.application.numquestions) * 100;
		this.accuracyresult = this.accuracy.toPrecision(4)+ " % ("+this.correctCounter +"/"+ enyo.application.numquestions+")";
		console.log("this.accuracy: "+this.accuracyresult);
		console.log("Time Taken: "+this.timetakenresult);
		
		adddb[0] = this.$.db.getInsert("results",
					{"chapter": this.category+"_"+this.chapter,
					 "difficulty": "0-"+this.maxnumber.toFixed(0),
					 "accuracy": this.accuracyresult,
					 "time_taken": this.timetakenresult,
					 "added_date": currentDate.getTime()});					
		
		this.$.db.queries(adddb, {onSuccess: this.loadPrefInitDataResponse.bind(this)});
    },
	stopBtnClicked: function() {
		this.testinprogress = false;
		//Clear timer
		window.clearTimeout(window.timer);
		this.disableStop();
		this.enableStart();
		//reset time
		this.$.time1.setIcon("images/orange_0_32.png");
		this.$.time2.setIcon("images/orange_0_32.png");
		this.$.time3.setIcon("images/orange_0_32.png");
		//Show default page
		//this.$.pane.selectViewByName("defaultquizpage");
		this.$.pane.selectViewByName("resultsquizpage");
		this.$.solnSheetHdr.setContent("Solution Sheet: (Not Saved)");
		this.$.resultcontent.setContent(this.solnContent);
		this.$.teststatus.setCaption("");
	},
    inputChange: function (inSender, inEvent) {
        if (inEvent.keyCode == 13) {
            this.goToPageClicked();
        }
    },
    showErrorDialog: function (message) {
        this.$.errorDialog.openAtCenter();
        this.$.errorMessage.setContent(message);
    },
    closeErrorPopup: function () {
        this.$.errorDialog.close();
    },
    windowParamsChangeHandler: function () {
        var orient = enyo.getWindowOrientation();
        this.setListHeights(orient);
    },
    windowRotated: function (inSender, inEvent) {
        var orient = enyo.getWindowOrientation();
        this.setListHeights(orient);
    },
    setListHeights: function (orient) {
        if (orient == "up" || orient == "down") {
            this.$.slidingPane.selectView(this.$.left);
        } else {
            this.$.slidingPane.selectView(this.$.middle);
        }
    },
    saveNewPreferences: function () {
        //Get the user preferred values
		var difficulty = this.$.prefDifficulty.getValue();
		var numQ = this.$.prefNumQuestions.getValue();
		var maxTime = this.$.prefMaxTime.getValue();
		
		enyo.application.difficulty = parseInt(difficulty);
		enyo.application.numquestions = parseInt(numQ);
		enyo.application.maxtime = parseInt(maxTime);
		
		//Save to DB
		var dummydata;
		var updatedb = this.$.db.getUpdate("preferences",{"pref_value": difficulty},{"pref_type":"difficulty"});
		this.$.db.query(updatedb, dummydata);
		updatedb = this.$.db.getUpdate("preferences",{"pref_value": numQ},{"pref_type":"numquestions"});
		this.$.db.query(updatedb, dummydata);
		updatedb = this.$.db.getUpdate("preferences",{"pref_value": maxTime},{"pref_type":"maxtime"});
		this.$.db.query(updatedb, dummydata);
		//Close Popup
		this.$.preferencesPopup.close();
		
        enyo.windows.addBannerMessage($L("Preferences Saved"), "{}");
    },
    openPreferences: function () {
        try {
            this.$.preferencesPopup.openAtCenter();
            this.$.prefDifficulty.setValue(enyo.application.difficulty);
			this.$.prefNumQuestions.setValue(enyo.application.numquestions);
			this.$.prefMaxTime.setValue(enyo.application.maxtime);			
        } catch (e) {
            console.log("Error" + e);
        }
    },
    openLink: function (inSender, url) {
        //console.log("### Opening URL"+ url);
        // Launch default app for handling this url
        this.$.appMgrOpen.call({
            target: url,
            subscribe: false
        });
    },
    openEmailSuccess: function (inSender, inResponse) {
        //enyo.log("Open email success, results=" + enyo.json.stringify(inResponse));
    },
    openEmailFailure: function (inSender, inResponse) {
        //enyo.log("Open email failure, results=" + enyo.json.stringify(inResponse));
    },
    pageTitleChanged: function (inSender, inTitle, inUrl, inBack, inForward) {
        //console.log("#########pageTitleChanged: "+inUrl+" # "+inTitle+" # "+inBack+" # "+inForward);
        this.currentURL = enyo.string.escapeHtml(inUrl);
        this.title = inTitle || $L("Untitled");
        this.$.addressUrl.setValue(this.currentURL);
        /*if (!this.$.dialog.isOpen) {
			this.$.actionbar.setUrl(this.url);
			this.$.actionbar.setTitle(this.title);
		}
		this.gotHistoryState(inBack, inForward);*/
        //this.doPageTitleChanged(this.title, this.currentURL);
    },
    
    openAbout: function () {
        this.$.aboutPopup.openAtCenter();
    },
    openRestoreDialog: function () {
        this.$.restorePopup.openAtCenter();
    },
    closeRestorePopup: function () {
        this.$.restorePopup.close();
    },
	openMoreAppDialog: function () {
        this.$.moreAppPopup.openAtCenter();
    },
    closeMoreAppPopup: function () {
        this.$.moreAppPopup.close();
    },
    closeAboutPopup: function () {
        this.$.aboutPopup.close();
    },
    openDonate: function () {
        this.$.donatePopup.openAtCenter();
    },
    openCatalog: function () {
        var appInfo = enyo.fetchAppInfo();
        window.open("http://developer.palm.com/appredirect/?packageid=" + appInfo.id);
    },
    emailDeveloper: function () {
        var appInfo = enyo.fetchAppInfo();
        window.open("mailto:petzapps.help@gmail.com?subject=Math Pro Help - v" + appInfo.version);
    },
    closeEditCatDialog: function () {
        this.$.deditcat_name.setValue("");
        this.$.editcatmessage.setContent("");
        this.$.editCatDialog.close();
    },
    closeCatDialog: function () {
        this.$.dcat_name.setValue("");
        this.$.catmessage.setContent("");
        this.$.addCatDialog.close();
    },
    fullScreenClicked: function () {
        if (this.isFullScreen) {
            this.isFullScreen = false;
        } else {
            this.isFullScreen = true;
        }
        enyo.setFullScreen(this.isFullScreen);
    },
    /*facebookClicked: function() {
		//Check if site is selected, if not, return
		if(this.selectedSiteRow == null ||
			this.selectedSiteRow == -1) {
			this.$.errorExample.openAtCenter();
			return;
		}
		var record = this.sitedata[this.selectedSiteRow];
		var targetUrl = record.site_url;
		if(!this.handlePageTitleChanged) {
			targetUrl = this.handlePageTitleChanged;
		}
		this.$.launchBrowserCall.call({"id": "com.palm.app.enyo-facebook", "params":{type: "status",statusText: targetUrl}});
	},*/
    
    alphanumeric: function (alphane) {
        var numaric = alphane;
        for (var j = 0; j < numaric.length; j++) {
            var alphaa = numaric.charAt(j);
            var hh = alphaa.charCodeAt(0);
            if ((hh > 47 && hh < 58) || (hh > 64 && hh < 91) || (hh > 96 && hh < 123) || hh == 32) {} else {
                return false;
            }
        }
        return true;
    },

    closeEditDialog: function () {
        //Set blank for all input fields.
        //this.$.categoryListSelector.setValue("1");
        this.$.deditsite_name.setValue("");
        this.$.deditsite_url.setValue("");
        this.$.editsitemessage.setContent("");
        this.$.editSiteDialog.close();
    },
    create: function () {
        this.sitedata = [];
        this.selectedSiteRow = -1;
        this.inherited(arguments);
        this.currentURL;
        //console.log("In Create");
        //this.isFullScreen = true;
        //enyo.setFullScreen(this.isFullScreen);
        //if (window.PalmSystem) this.$.webView.clearCache();

        //This is not creating table first time
        //this.$.db.setSchemaFromURL("schemas/touchnet-schema.json", null);

    },
    ready: function () {
        try {
            //console.log("In Ready");
            enyo.application.formatter = new SimpleDateFormat("MMM d, yyyy h:mm a");
			
            //Create DB tables, if not exists
            this.createTables();
            this.testinprogress = false;
			this.loadInitGUIData();
			
			this.$.db.query('SELECT * FROM preferences',
								{onSuccess: this.loadPrefInitData.bind(this)});
        } catch (e) {
            this.error("Error" + e);
        }
    },
    loadPrefInitData: function (results) {
        var dummydata;
		var adddb = [];
		if(results.length == 0) {
			//console.log("Load pref init data");
			try {
				for (var i = 0; i < enyo.application.preferencedata.length; i++) {
				adddb[i] = this.$.db.getInsert("preferences",
							{"pref_type": enyo.application.preferencedata[i].pref_type,
							 "pref_value": enyo.application.preferencedata[i].pref_value});					
				}
				this.$.db.queries(adddb, {onSuccess: this.loadPrefInitDataResponse.bind(this)});
				enyo.application.difficulty = enyo.application.preferencedata[0].pref_value;
				enyo.application.numquestions = enyo.application.preferencedata[1].pref_value;
				enyo.application.maxtime = parseInt(enyo.application.preferencedata[2].pref_value);
			}
			catch (e)
			{
				console.error("Error"+e);
			}
		} else {
			//console.log("Load pref DB data");
			enyo.application.difficulty = parseInt(results[0].pref_value);
			enyo.application.numquestions = parseInt(results[1].pref_value);
			enyo.application.maxtime = parseInt(results[2].pref_value);
		}
    },
    loadPrefInitDataResponse: function () {
        //console.log("######## Preferences Data Inserted");
    },
    loadInitGUIData: function () {
        var dummydata;
        var results = [];
        var addsitedb = [];
        var addsitereorderdb = [];

        for (var i = 0; i < enyo.application.subjectsdata.length; i++) {
            results.push({
				"category_id": enyo.application.subjectsdata[i].subject_id,
                "category_name": enyo.application.subjectsdata[i].subject_name,
                "category_image": enyo.application.subjectsdata[i].subject_image
            });
        }
        //Check if table has any data
        //console.log("loadInitGUIData: count query: "+results.length);
        this.queryResponse(results);
    },
    createTables: function () {
        try {
            var preferences_column	=	[];
			var results_column	=	[];
			
			preferences_column.push({"column": "rowID", "type":"INTEGER", "constraints": ["PRIMARY KEY AUTOINCREMENT"]});
			preferences_column.push({"column": "pref_type", "type" : "TEXT", "constraints": ["NOT NULL"]});
			preferences_column.push({"column": "pref_value", "type" : "TEXT", "constraints": ["NOT NULL"]});
		
			var preferences_sql = this.$.db.getCreateTable("preferences",preferences_column,"true");
			this.$.db.query(preferences_sql);
			
			results_column.push({"column": "rowID", "type":"INTEGER", "constraints": ["PRIMARY KEY AUTOINCREMENT"]});
			results_column.push({"column": "chapter", "type" : "TEXT", "constraints": ["NOT NULL"]});
			results_column.push({"column": "difficulty", "type" : "TEXT", "constraints": ["NOT NULL"]});
			results_column.push({"column": "accuracy", "type" : "TEXT", "constraints": ["NOT NULL"]});
			results_column.push({"column": "time_taken", "type" : "TEXT", "constraints": ["NOT NULL"]});
			results_column.push({"column": "added_date", "type" : "DATETIME", "constraints": ["NOT NULL"]});
			
			var results_sql = this.$.db.getCreateTable("results",results_column,"true");
			this.$.db.query(results_sql);
			
        } catch (e) {
            console.error("Error" + e);
        }
    },
    queryResponse: function (results) {
        var list = [];
        //console.log("queryResponse data length: "+results.length);
        for (var i = 0; i < results.length; i++) {
            list[i] = results[i];
        }
        this.data = list; //set list to data
        this.$.categorylist.punt();
    },
	setupResultRow: function (inSender, inIndex) {
        //console.log("setupRow called: "+inIndex);
        if (this.resultsdata) {
            var record = this.resultsdata[inIndex]; //set data arry values to record
            if (record) {
                this.$.chapterVal.setContent(record.chapter);
				this.$.dateVal.setContent(enyo.application.formatter.format(new Date(record.added_date)));
				this.$.difficultyVal.setContent(record.difficulty);
				this.$.accuracyVal.setContent(record.accuracy);
				this.$.timeVal.setContent(record.time_taken);
                return true;
            }
        }
    },
    setupRow: function (inSender, inIndex) {
        //console.log("setupRow called: "+inIndex);
        if (this.data) {
            var record = this.data[inIndex]; //set data arry values to record
            if (record) {
                //console.log("setupRow rowID: "+record.rowID+" reorder id: "+record.reorder_id);
                this.$.catVal.setContent(record.category_name);
                this.$.categoryimage.setSrc(record.category_image);
                if (inIndex % 2 == 0) this.$.listItem.applyStyle("background-color", "#eee");
                else this.$.listItem.applyStyle("background-color", "white");
                var isRowSelected = (inIndex == this.selectedRow);
                if (isRowSelected) {
                    this.$.listItem.applyStyle("background-color", "#A0CFEC");
                    this.$.listItem.applyStyle("font-weight", "bold");
                } else {
                    this.$.listItem.applyStyle("font-weight", null);
                }
                return true;
            }
            /*else {
			this.sitedata = [];
			this.selectedSiteRow = -1;
			this.$.sitelist.refresh();
		  }*/
        }
    },
    categorySelected: function (inSender, inEvent) {
        var record = this.data[inEvent.rowIndex];
        var results = [];
        //var dummydata;
        this.selectedRow = inEvent.rowIndex;
        if (record) {
            //console.log("categorySelected called: "+record.category_name);
            var position = this.$.categorylist.$.scroller.$.scroll.y;
            this.$.categorylist.refresh();
            //this.scrollToIndex(inEvent.rowIndex);
            this.$.categorylist.$.scroller.$.scroll.setScrollPosition(position);
            this.selectedSiteRow = -1;
            //this.$.webView.setUrl("");
            try {
                //If Add selected
				if(record.category_id == "Add") {
					for (var i = 0; i < enyo.application.addchapterdata.length; i++) {
						results.push({
							"site_id": enyo.application.addchapterdata[i].subject_id,
							"site_name": enyo.application.addchapterdata[i].chapter_name,
							"site_image": enyo.application.addchapterdata[i].chapter_image
						});
					}
					this.$.chapterheader.setContent("Addition");
				} else if(record.category_id == "Sub") {
					for (var i = 0; i < enyo.application.subchapterdata.length; i++) {
						results.push({
							"site_id": enyo.application.subchapterdata[i].subject_id,
							"site_name": enyo.application.subchapterdata[i].chapter_name,
							"site_image": enyo.application.subchapterdata[i].chapter_image
						});
					}
					this.$.chapterheader.setContent("Subtraction");
				} else if(record.category_id == "Multi") {
					for (var i = 0; i < enyo.application.multichapterdata.length; i++) {
						results.push({
							"site_id": enyo.application.multichapterdata[i].subject_id,
							"site_name": enyo.application.multichapterdata[i].chapter_name,
							"site_image": enyo.application.multichapterdata[i].chapter_image
						});
					}
					this.$.chapterheader.setContent("Multiplication");
				} else if(record.category_id == "Div") {
					for (var i = 0; i < enyo.application.divchapterdata.length; i++) {
						results.push({
							"site_id": enyo.application.divchapterdata[i].subject_id,
							"site_name": enyo.application.divchapterdata[i].chapter_name,
							"site_image": enyo.application.divchapterdata[i].chapter_image
						});
					}
					this.$.chapterheader.setContent("Division");
				} else if(record.category_id == "Mix") {
					for (var i = 0; i < enyo.application.mixchapterdata.length; i++) {
						results.push({
							"site_id": enyo.application.mixchapterdata[i].subject_id,
							"site_name": enyo.application.mixchapterdata[i].chapter_name,
							"site_image": enyo.application.mixchapterdata[i].chapter_image
						});
					}
					this.$.chapterheader.setContent("Mixed");
				}
                this.categorySelectResponse(results);
            } catch (e) {
                console.log("Error" + e);
            }
            return;
        }
        this.$.categorylist.refresh();
    },
    categorySelectResponse: function (results) {
        var list = [];
        //console.log("site data length: "+results.length);
        for (var i = 0; i < results.length; i++) {
            list[i] = results[i];
        }
        this.sitedata = list;
        this.$.sitelist.punt();
		this.disableStart();
    },
    setupSiteRow: function (inSender, inIndex) {
        var record = "";
        //console.log("setupSiteRow: "+inIndex+" this.selectedSiteRow: "+this.selectedSiteRow);
        if (this.sitedata != null) {
            record = this.sitedata[inIndex];
        } 
		if(!this.selectedSiteRow) {
			this.disableStart();
		}
        if (record) {
            //console.log("siteRow: "+record.siteRowID+" : "+record.reorder_id);
            this.$.siteVal.setContent(record.site_name);
            this.$.siteimage.setSrc(record.site_image);
            if (inIndex % 2 == 0) this.$.siteItem.applyStyle("background-color", "#eee");
            else this.$.siteItem.applyStyle("background-color", "white");
            var isRowSelected = (inIndex == this.selectedSiteRow);
            //console.log("isRowSelected: "+isRowSelected);
            if (isRowSelected) {
                this.$.siteItem.applyStyle("background-color", "#A0CFEC");
                this.$.siteItem.applyStyle("font-weight", "bold");
            } else {
                this.$.siteItem.applyStyle("font-weight", null);
            }
            return true;
        }
    },
	siteSelected: function (inSender, inEvent) {
        var record = this.sitedata[inEvent.rowIndex];
        this.selectedSiteRow = inEvent.rowIndex;
        //console.log("siteSelected: "+this.selectedSiteRow);
        //this.$.webView.setUrl('');
        if (record) {
            var siteposition = this.$.sitelist.$.scroller.$.scroll.y;
            //console.log("siteSelected called: "+record.site_name);
            this.$.sitelist.refresh();
            this.$.sitelist.$.scroller.$.scroll.setScrollPosition(siteposition);
            try {
                //this.setSiteRowCalled = true;
                //this.$.webView.setUrl(record.site_url);
                //this.$.addressUrl.setValue(record.site_url);
                this.$.slidingPane.selectView(this.$.middle);
				this.enableStart();
            } catch (e) {
                console.log("ERROR!!! " + e);
            }
            return;
        }
        this.$.sitelist.refresh();
    },
	enableStart: function() {
		this.$.startBtn.setDisabled(false);
		//this.$.startBtn.setActive(true);
	},
	disableStart: function() {
		this.$.startBtn.setDisabled(true);
		//this.$.startBtn.setActive(true);
	},
    enableStop: function() {
		this.$.stopBtn.setDisabled(false);
		//this.$.startBtn.setActive(true);
	},
	disableStop: function() {
		this.$.stopBtn.setDisabled(true);
		//this.$.startBtn.setActive(true);
	},
	onError: function (inSender, inEvent) {
        //console.log("Web View ERROR!!! "+inEvent);
    },
    onComplete: function (inSender, inEvent) {
        this.$.webViewSpinner.hide();
    },
    onStopped: function (inSender, inEvent) {
        this.$.webViewSpinner.hide();
    },
    onStarted: function (inSender, inEvent) {
        this.$.webViewSpinner.show();
    },
    next: function () {
        this.$.slidingPane.next();
    },
    peekItemClick: function (inSender) {
        this.$.slidingPane.selectView(this.$.middle);
    },
    showRight: function () {
        this.$.right.setShowing(true);
    },
    hideRight: function () {
        this.$.right.setShowing(false);
    },
    slidingSelected: function (inSender, inSliding, inLastSliding) {
        //console.log("slidingSelected"+inSliding.id, (inLastSliding || 0).id);
    },
    slidingResize: function (inSender) {
        //console.log("slidingResize");
        //if (!!window.PalmSystem)
        //this.$.feedWebViewPane.$.currentFeedItemWebView.resize();
        //this.$.webView.resize();
    },
    rightHide: function () {
        //this.$.info.setContent("hide right");
    },
    rightShow: function () {
        //this.$.info.setContent("show right");
    },
    backHandler: function (inSender, e) {
        this.$.slidingPane.back(e);
    }
});