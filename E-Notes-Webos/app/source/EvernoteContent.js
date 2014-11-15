enyo.kind({
	name: "com.petzapps.EvernoteContent",
	kind: enyo.VFlexBox,
	flex: 1,
	components: [
		{kind: "ApplicationEvents", onWindowRotated: "windowRotated", onWindowParamsChange: "windowParamsChangeHandler"},
		{name: "slidingPane", kind: "SlidingPane", flex: 1, onSelectView: "slidingSelected", components: [
			{name: "left", width: "230px", components: [
				{kind: "VFlexBox", name:"notebookBox",
					className: "enyo-bg", flex: 1, components: [						
						{name: "header", pack:"start", kind: "Header",height: "60px;", style:"background-color:#88cc70;color:black;margin:1px;",
						components: [
							{content: $L("Notebooks"),style:"font-size: 0.8em;"},
							{content: "", flex: 1},
							{kind: "ToolButtonGroup", pack:"center", components: [
								{icon: "images/folder_add.png", width:"45px", onclick: "addNotebookClicked",className: "enyo-radiobutton-dark"},
								{icon: "images/folder_edit.png", width:"45px", onclick: "editNotebookClicked", className: "enyo-radiobutton-dark"},
								{icon: "images/folder_heart.png", width:"45px", onclick: "setFavClicked", className: "enyo-radiobutton-dark"},
							]}
						]},
						{kind: "VFlexBox", name:"notebooklistBox",flex: 1, components: [
							{kind: "Scroller", flex: 1, components: [
								{kind: "Scrim", name:"notebookScrim",layoutKind: "VFlexLayout", align: "center", pack: "center", components: [
									{kind: "Spinner", name:"notebookSpinner"}
								]},  
								{name: "notebooklist", kind: "VirtualList", onclick: "notebookSelected", height: "290px;",  
								onSetupRow: "setupNotebookRow",style:"background-color:white;",
								components: [
									{name:"listItem", kind: "Item", onConfirm: "deleteNotebookItem", layoutKind: "HFlexLayout", 
										components: [
										  {kind: enyo.HFlexBox,flex:1,
											components: [
											  {name: "notebookVal", flex : 2,style:"font-size: 0.8em;margin:5px;"},
											  {name: "notebookImage",src: "images/folder_page.png",kind:"Image",width:"32px",height:"32px",
												flex : 1,pack:"center"}
										  ]}
									  ]}
								]}
							]}
						]},						
				]},				
				{kind: "VFlexBox", name:"tagBox",
					className: "enyo-bg", flex: 1, components: [
						{name: "theader", pack:"start", kind: "Header",height: "60px;", style:"background-color:#88cc70;color:black;margin:1px;",
						components: [
							{content: $L("Tags"),style:"font-size: 0.8em;"},
							{content: "", flex: 3},
							{kind: "ToolButtonGroup", pack:"center", components: [
								{name:"addtag", icon: "images/tag_blue_add.png", onclick: "addTagsBtnClicked", className: "enyo-radiobutton-dark enyo-grouped-toolbutton-dark"},
								{name:"edittag", icon: "images/tag_blue_edit.png", onclick: "editTagBtnClicked", className: "enyo-radiobutton-dark enyo-grouped-toolbutton-dark"},
							]}
						]},
						{kind: "VFlexBox", name:"taglistBox",flex: 1, components: [
							{kind: "Scroller", flex: 1, components: [
								{kind: "Scrim", name:"tagScrim", layoutKind: "VFlexLayout", align: "center", pack: "center", components: [
									{kind: "Spinner", name:"tagSpinner"}
								]},
								{name: "taglist", kind: "VirtualList", onclick: "tagSelected", height: "290px;",  
										onSetupRow: "setupTagRow",style:"background-color:white;",
								components: [
									{name:"tagListItem", kind: "Item", layoutKind: "HFlexLayout", components: [
										  {kind: enyo.HFlexBox,flex:1,
											components: [
											  {name: "tagVal", flex : 2,style:"font-size: 0.8em;margin:5px;"},
											  {name: "tagImage",src: "images/tag_blue.png",kind:"Image",width:"32px",height:"32px",
												flex : 1,pack:"center"}
										  ]}
									  ]}
								]}
							]}
						]},
						
				]},				
				{kind: "Toolbar", style:"background-color:#448820;",components: [
					{kind: "GrabButton"},
					{caption: "",flex:2},
					{kind: "ToolButtonGroup", pack:"center", components: [
						{name:"refreshnotes", icon: "images/page-refresh-icon.png", onclick: "refreshAllData", className: "enyo-radiobutton-dark enyo-grouped-toolbutton-dark"},
						{name:"resizenotebook", icon: "images/folder-delete-icon.png", onclick: "notebookHideBtnClicked", className: "enyo-radiobutton-dark enyo-grouped-toolbutton-dark"},
						{name:"resizetag", icon: "images/tag-hide.png", onclick: "tagArrowBtnClicked", className: "enyo-radiobutton-dark enyo-grouped-toolbutton-dark"},
					]}
				]}
			]},
			{name: "middle", width: "265px", fixedWidth: true, peekWidth: 68, components: [
				{kind: "VFlexBox",
					className: "enyo-bg", flex: 1, components: [
						{name: "siteheader", pack:"start", kind: "Header",height: "60px;",style:"background-color:#88cc70;margin:1px;",
						components: [					
							{kind: "ToolInput", name:"noteSearchTxt", height: "38px;",hint: "Search Note...",style:"color:black;",onkeypress: "inputChange"},
							{content: "", flex: 1},
							{kind: "ToolButtonGroup", pack:"center", components: [
								{icon: "images/magnifier.png", onclick: "searchNotesClicked", className: "enyo-radiobutton-dark enyo-grouped-toolbutton-dark"},
							]},
							{content: "", flex: 1},
						]},
						{kind: "Scroller", flex: 1, components: [
							{kind: "Scrim", name:"noteScrim", layoutKind: "VFlexLayout", align: "center", pack: "center", components: [
								{kind: "Spinner", name:"noteSpinner"}
							]},
							{name: "notelist", kind: "VirtualList", onclick: "noteSelected", height: "630px;", 
								onSetupRow: "setupNoteRow",style:"background-color:white;",
								components: [
									{name:"noteItem", kind: "SwipeableItem", layoutKind: "HFlexLayout",
										onConfirm: "deleteNoteItem", components: [
										{kind: enyo.VFlexBox,flex:1,
										components: [
										  {components: [
											   {name: "noteVal", flex : 2,style:"font-size: 0.8em;margin:2px;",className: 'enyo-text-subheader enyo-text-ellipsis'},
										  ]},
										  {components: [
											   {name: "noteCreateDate",style:"font-size: 0.61em;margin:2px;", content: "", className: 'enyo-text-ellipsis enyo-subtext'}
										  ]}
										]},
										{name: "noteImage",src: "images/page.png",kind:"Image",width:"32px",height:"32px",
											flex : 1,pack:"center"}
									  ]}
								]}
						]},
						{kind: "Toolbar", style:"background-color:#448820;", height: "55px;",components: [ //#88cc70;#448820
							{kind: "GrabButton"},
							{caption: "",flex:1},
							{kind: enyo.Spinner, name: "preWebViewSpinner",align: "right"},
							{content: "", flex: 5},
							{kind: "ToolButtonGroup", pack:"center", components: [
								{name:"previouspage", icon: "images/book_previous.png", 
										className: "enyo-radiobutton-dark enyo-grouped-toolbutton-dark",onclick: "previousClicked"},
								{name:"notescount", content: "0", className: "enyo-radiobutton-dark enyo-grouped-toolbutton-dark",},
								{name:"nextpage", icon: "images/book_next.png", 
										className: "enyo-radiobutton-dark enyo-grouped-toolbutton-dark",onclick: "nextClicked"},
							]},
							{content: "", flex: 6},
						]}
				]}
			]},
			{name: "right", flex: 1, dismissible: false, onHide: "rightHide", onShow: "rightShow", onResize: "slidingResize", components: [
				{kind: "VFlexBox",
					className: "enyo-bg", flex: 1, components: [
					{name: "noteheader", pack:"start", kind: "Header",height: "60px;", style:"background-color:#88cc70;color:black;margin:1px;",
						components: [
							{name: "addButton", kind: "Button",
									style:"margin: 0px 0px 0 0;min-width:40px;background-color:#88cc70;color:black;", 
									height:"22px", onclick: "addNoteClicked", components:[
								{kind: "HFlexBox", components: [
									{className:"header-addnote-icon"}, 
									{content:$L("New")}
								]}
							]},
							{content: "", flex: 0.1},
							{name: "emailButton", kind: "Button",
									style:"margin: 0px 0px 0 0;min-width:40px;background-color:#88cc70;color:black;", 
									height:"22px", onclick: "emailFileClicked", components:[
								{kind: "HFlexBox", components: [
									{className:"header-emailnote-icon"}, 
									{content:$L("Add by E-mail")}
								]}
							]},
							{content: "", flex: 3},
							{name: "editButton", kind: "Button", //className:"enyo-radiobutton-dark enyo-grouped-toolbutton-dark", 
									style:"margin: 0px 0px 0 0;min-width:40px;background-color:#88cc70;color:black;", 
									height:"22px", onclick: "editNoteClicked", components:[
								{kind: "HFlexBox", components: [
									{className:"header-editnote-icon"}, 
									{content:$L("Edit")}
								]}
							]},
					]},
					//{kind: enyo.Spinner, name: "webViewSpinner",align: "right"},
					{kind: "VFlexBox", style:"background-color: #F00;background: none;", components: [
						{name: "notesdetailbox", layoutKind: "HFlexLayout", align: "center",height: "33px;", style:"font-size: 0.58em;background-color:white;margin:1px;", components: [
							{name:"noteTitle",content: "",style:"font-size: 1.2em;margin:1px;",flex: 8 },
							{content: "", flex: 0.3},
							{kind: "ToolButtonGroup", flex: 2, pack:"center", components: [
								{name:"showdetail", content: "Show Details", onclick: "showDetailClicked", style:"background-color:#88cc70;color:white;margin:1px;"},
							]},
							//{content: "", flex: 6},
						]},
					]},
					{name: "notedetail", kind: "VFlexBox",className:"compose-header",  components: [
						{name: "notedetail1", kind: "HFlexBox",className: "enyo-row dotted-bottom", align: "center",height: "35px;", style:"font-size: 0.61em;margin:1px;", components: [
							{content: "Modified: ",style:"font-weight:bold;" },
							{content: "", flex: 0.10},
							{name:"updatedVal", content: "",style:"color: #1e5a90;" },
							{content: "", flex: 0.5},
							{content: "Created: ", style:"padding: 2px;font-weight:bold;"},
							{content: "", flex: 0.10},
							{name:"createdVal", content: "", style:"color: #1e5a90;"},
							{content: "", flex: 1},
							{kind: "ListSelector", label: "Attachments (0)", height:"30px", 
								name:"attachmentSelector", className:"attach-list-selector", 
								onSelect: "attachmentSelected", hideItem: true, flex: 2, items: []},
							{content: "", flex: 5},
						]},
						{name: "notedetail2", kind: "HFlexBox",className: "enyo-row dotted-bottom", align: "center",height: "35px;", style:"font-size: 0.62em;margin:1px;", components: [
							{content: "Tags: ", style:"padding: 2px;font-weight:bold;"},
							{content: "", flex: 0.10},
							{name:"tagsVal", content: "",style:"color: #1e5a90;" },
							{content: "", flex: 0.3},
							{content: "Source URL: ",style:"font-weight:bold;" },
							{content: "", flex: 0.10},
							{name:"noteUrlVal", content: "",allowHtml: true },
							{content: "", flex: 9},
						]},
					]},
					{name:"contentScroller", kind: "Scroller", flex: 1,style:"background-color:white;", components: [
						{name:"notecontent",content: "", allowHtml: true,autoFit: true,
							style:"padding: 5px;font-size: 0.75em;background-color:white;",},
					]},
					{kind: "Toolbar", style:"background-color:#448820;", components: [
						{kind: "GrabButton"},
						{caption: "",flex:0.13},
						{kind: enyo.Spinner, name: "webViewSpinner",align: "right"},
						{caption: "",flex:2},
						{kind: "ToolButtonGroup", pack:"center", components: [
							//{name:"emailNote", icon: "images/email3.png", 
							//		className: "enyo-radiobutton-dark enyo-grouped-toolbutton-dark",onclick: "emailNoteClicked"},
							{name:"fontResize", icon: "images/font_resize.png", 
									className: "enyo-radiobutton-dark enyo-grouped-toolbutton-dark",onclick: "fontResizeClicked"},
							{name:"lockScreen", icon: "images/lightbulb-icon.png", 
									className: "enyo-radiobutton-dark enyo-grouped-toolbutton-dark",onclick: "lockScreenClicked"},
						]},
					]}
				]}
			]},
			{kind: "AppMenu", components: [
				//{caption: "Refresh", onclick: "refreshAllData"},
				{caption: "Preferences", onclick: "openPreferences"},
				{caption: "Logout", onclick: "logoutClicked"},
				{caption: "Donate", onclick: "openDonate"},
				{caption: "Help", components: [
						{caption: "Help Topics", onclick: "openHelp"},
						{caption: "Leave Review", onclick: "openCatalog"},
						{caption: "Email Developer", onclick: "emailDeveloper"},
						{caption: "About", onclick: "openAbout"},
				]},
				{
					caption: "More Apps",
					onclick: "openMoreAppDialog"
				},
			]},
			{name: "preferencesPopup", kind: "Popup", scrim: true, onBeforeOpen: "beforePreferencesOpen", components: [
					{name: "preferencesHeader", style: "text-align: center;"},
					{content: "<hr/>", allowHtml: true},
					{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
							{name: "sortingPane", kind: "ListSelector", label: "Sort Notes By", onChange: "sortingPaneSelect", flex: 1, items: [
									{caption: "Date Created (desc)", value: 1,},
									{caption: "Date Created (asc)", value: 2,},
									{caption: "Date Updated (desc)", value: 3,},
									{caption: "Date Updated (asc)", value: 4,},
									{caption: "Title (asc)", value: 5,},
									{caption: "Title (desc)", value: 6,}
							]},
					]},
					{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
							{name: "notesPageAction", kind: "ListSelector", label: "Notes Per Page", onChange: "notesPerPageSelect", flex: 1, items: [
									{caption: "10", value: 10,},
									{caption: "15", value: 15,},
									{caption: "25", value: 25,},
							]},
					]},
					/*{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
							{content: "Debug mode", flex: 1},
							{name: "debug", kind: "ToggleButton", onChange: "debugToggle"},
					]},*/
					{kind: "Button", caption: "Save", onclick:"saveNewPreferences"}
			]},
			{kind: "ModalDialog", name: "emailNoteDialog", caption: "",width: "80%", height: "460px",style:"background-color:#88cc70;",components:[
					{name: "DesktopBackground2",	kind: "Control",className: "enyo-fit desktop-background",components: [
						{name: "composeMainBody2", kind: "VFlexBox", height:"100%", className:"compose-main-child", components: [
							{name: "sendHeader2", height:"59px", kind: "VFlexBox",  className: "compose-header-bar enyo-row", components: [
								{name:"tornPaperEffect2", height:"2px" },
								{content: "", flex: 1},
								{name: "sendHeaderContent2", style:"line-height:40px", kind: "HFlexBox", components: [
									{content: "E-mail Note",style:"color:white",},
									{name:"headerContent2", className:"header-content", content: "", flex: 1},
									{name: "cancelButton2", kind: "Button", className:"enyo-button-grey", style:"margin: 6px 8px 0 0;min-width:64px;", height:"20px", onclick: "onCancelEmailClick", components:[
										{kind: "HFlexBox", components: [
											{className:"header-cancel-icon"}, 
											{content:$L("Cancel")}
										]}
									]},
									{kind: "ActivityButton", name: "saveButton2",onclick: "sendEmailClicked", disabled: false, active: false,
											style:"margin: 6px 8px 0 0;min-width:64px;", width:"100px",height:"37px", className: "enyo-button-affirmative", caption: $L("Send")},
								]},
								{content: "", flex: 1}
							]},
							//{kind: "Spacer", height:"2px"},
							{kind: "VFlexBox", className:"compose-header", style:"background-color: #f1f1f1;", components: [
								{name:"subjectRow2", className: "enyo-row dotted-bottom", components: [
									{kind:"HFlexBox", height:"54px", name:"subjectBox", className: "subject-box", components:[
										{content: $L("To: "),//width:"70px",
											className:"compose-to-text"},
										{name: "titleInput2", autoCapitalize: "lowercase",spellcheck:false,flex: 10, style:"font-size:16px;", hint:"Comma separated Email Id(s)", kind: "Input",className:"enyo-middle",},
									]}
								]},
							]},
							{name: "composeScroller2", className:"compose-scroller", style: "background-color: white;", 
								kind: "Scroller", accelerated:false, autoHorizontal: false, horizontal: false,// autovertical: false, vertical: false,
								height:"100%", flex: 1, components: [
								{kind: "VFlexBox", components: [									
									{name: "bodyContainer2", style: " background-color: white; ", components: [
										{name: "emailNoteBodyInput", kind: "RichText", hint:"Enter Message...", placeholderClassName:"", flex: 1, styled: false, allowHtml: true,
											style: "padding:14px 14px 0px 14px; min-height: 50px; background-color: white;font-size: 0.70em;", //max-height: 220px; oninput: "changeHandler",
											height: "150px",autoLinking: true,},
									]}
								]}
							]},
						]},
					]}
			]},
			{kind: "ModalDialog", name: "addNoteDialog", caption: "",width: "85%", height: "95%",style:"background-color:#88cc70;",components:[
					{name: "DesktopBackground",	kind: "Control",className: "enyo-fit desktop-background",components: [
						{name: "composeMainBody", kind: "VFlexBox", height:"100%", className:"compose-main-child", components: [
							{name: "sendHeader", height:"59px", kind: "VFlexBox",  className: "compose-header-bar enyo-row", components: [
								{name:"tornPaperEffect", height:"2px" },
								{content: "", flex: 1},
								{name: "sendHeaderContent", style:"line-height:40px", kind: "HFlexBox", components: [
									{content: "New Note",style:"color:white",},
									{name:"headerContent", className:"header-content", content: "", flex: 1},
									{name: "cancelButton", kind: "Button", className:"enyo-button-grey", style:"margin: 6px 8px 0 0;min-width:64px;", height:"20px", onclick: "onCancelClick", components:[
										{kind: "HFlexBox", components: [
											{className:"header-cancel-icon"}, 
											{content:$L("Cancel")}
										]}
									]},
									{kind: "ActivityButton", name: "saveButton",onclick: "saveClicked", disabled: false, active: false,
											style:"margin: 6px 8px 0 0;min-width:64px;", width:"100px",height:"37px", className: "enyo-button-affirmative", caption: $L("Save")},
								]},
								{content: "", flex: 1}
							]},
							//{kind: "Spacer", height:"2px"},
							{kind: "VFlexBox", className:"compose-header", style:"background-color: #f1f1f1;", components: [
								{name:"subjectRow", className: "enyo-row dotted-bottom", components: [
									{kind:"HFlexBox", height:"54px", name:"subjectBox", className: "subject-box", components:[
										{content: $L("Title:"),//width:"70px",
											className:"compose-to-text"},
										{name: "titleInput", flex: 10, style:"font-size:16px;", hint:"Note Title...", kind: "Input", className:"enyo-middle",},
										{kind: "Button", width: "140px;",flex: 1, components: [
											{kind: "ListSelector", name: "notebookListSelector",  items: []}
										]},
									]}
								]},
							]},
							{kind: "HFlexBox", height:"54px",style:"background-color: #f1f1f1;", className:"compose-header dotted-bottom", components: [
								{kind: "Button", width: "130px;", components: [
									{kind: "ListSelector", name: "tagSelector", onSelect: "addTagSelected", items: []}
								]},	
								{content: "", flex: 0.1},
								{kind:"Input", flex: 7, name: "tagsAddedInput", disabled:false, hint:"Selected Tag(s)...",style:"margin:3px;"},
							]},
							{name: "composeScroller", className:"compose-scroller", style: "background-color: white;", 
								kind: "Scroller", //accelerated:false, 
								autoHorizontal: false, horizontal: false,// autovertical: false, vertical: false,
								height:"100%", flex: 1, components: [
								{kind: "VFlexBox", components: [									
									{name: "bodyContainer", style: " background-color: white; ", components: [
										{name: "addNoteBodyInput", kind: "RichText", hint:"", placeholderClassName:"", flex: 1, styled: false, allowHtml: true,
											style: "padding:14px 14px 0px 14px; min-height: 75px; background-color: white;font-size: 0.70em;", //max-height: 220px; oninput: "changeHandler",
											height: "460px",autoLinking: true,},
									]}
								]}
							]},
						]},
					]}
			]},
			{kind: "ModalDialog", name: "editNoteDialog", caption: "",width: "85%", height: "95%",style:"background-color:#88cc70;",components:[
					{name: "DesktopBackground1",	kind: "Control",className: "enyo-fit desktop-background",components: [
						{name: "composeEditBody", kind: "VFlexBox", height:"100%", className:"compose-main-child", components: [
							{name: "editHeader", height:"59px", kind: "VFlexBox",  className: "compose-header-bar enyo-row", components: [
								{name:"tornPaperEffect1", height:"2px" },
								{content: "", flex: 1},
								{name: "editHeaderContent", style:"line-height:40px", kind: "HFlexBox", components: [
									{content: "Edit Note",style:"color:white",},
									{name:"headerContent1", className:"header-content", content: "", flex: 1},
									{name: "cancelButton1", kind: "Button", className:"enyo-button-grey", style:"margin: 6px 8px 0 0;min-width:64px;", height:"20px", onclick: "onCancelEditClick", components:[
										{kind: "HFlexBox", components: [
											{className:"header-cancel-icon"}, 
											{content:$L("Cancel")}
										]}
									]},
									{kind: "ActivityButton", name: "editSaveButton",onclick: "saveEditClicked", disabled: false, active: false,
											style:"margin: 6px 8px 0 0;min-width:64px;", width:"100px",height:"37px", className: "enyo-button-affirmative", caption: $L("Save")},
								]},
								{content: "", flex: 1}
							]},
							{kind: "Spacer", height:"2px"},
							{kind: "VFlexBox", className:"compose-header", style:"background-color: #f1f1f1;", components: [
								{name:"subjectRow1", className: "enyo-row dotted-bottom", components: [
									{kind:"HFlexBox", height:"54px", name:"subjectBox1", className: "subject-box", components:[
										{content: $L("Title:"),//width:"70px",
											className:"compose-to-text"},
										{name: "editTitleInput", flex: 10, style:"font-size:16px;", hint:"Note Title...", kind: "Input", className:"enyo-middle",},
										{kind: "Button", width: "140px;",flex: 1, components: [
											{kind: "ListSelector", name: "notebookEditListSelector",  items: []}
										]},
									]}
								]},
							]},
							{kind: "HFlexBox", height:"54px",style:"background-color: #f1f1f1;", className:"compose-header dotted-bottom", components: [
								{kind: "Button", width: "130px;", components: [
									{kind: "ListSelector", name: "tagEditSelector", onSelect: "addEditTagSelected", items: []}
								]},	
								{content: "", flex: 0.1},
								{kind:"Input", flex: 7, name: "tagsAddedEditInput", disabled:false, hint:"Selected Tag(s)...",style:"margin:3px;"},
							]},
							{kind: "Spacer"},
							{name: "composeScroller1", className:"compose-scroller", style: "background-color: white;", kind: "Scroller", height:"100%", flex: "1", components: [
								{kind: "VFlexBox", components: [
									{name: "bodyEditContainer", style: " background-color: white; ", components: [
										{name: "editNoteBodyInput", kind: "RichText", hint:"", placeholderClassName:"", flex: 1, styled: false, allowHtml: true,
											style: "padding:14px 14px 0px 14px; min-height: 75px; background-color: white;font-size: 0.70em;", //oninput: "changeEditHandler",
											height: "500px",autoLinking: true,},
									]}
								]}
							]},
						]},
					]}
			]},
			{
					name: "db",
					kind: "onecrayon.Database",
					database: 'ext:ENotesEnyoDB1',
					//database: 'ext:ENotesEnyo3DB',
					version: "",
					debug: false
			},
			{
				  name : "downloadFile",
				  kind : "PalmService",
				  service : "palm://com.palm.downloadmanager/",
				  subscribe: true,
				  method : "download",
				  onSuccess : "downloadFinished",
				  onFailure : "downloadFail"
			 },
			 {
				  name : "downloadImageFile",
				  kind : "PalmService",
				  service : "palm://com.palm.downloadmanager/",
				  subscribe: true,
				  method : "download",
				  onSuccess : "downloadImageFinished",
				  onFailure : "downloadImageFail"
			 },
			 {
				  name : "downloadThumbImageFile",
				  kind : "PalmService",
				  service : "palm://com.palm.downloadmanager/",
				  subscribe: true,
				  method : "download",
				  onSuccess : "downloadThumbImageFinished",
				  onFailure : "downloadThumbImageFail"
			 },
			 {
				  name : "openFile",
				  kind : "PalmService",
				  service:"palm://com.palm.applicationManager/",
				  method: "open",
				  onSuccess : "fileOpenSuccess",
				  onFailure : "fileOpenFailure"
			 },
			 {
				  name : "tpOpenFile",
				  kind : "PalmService",
				  service:"palm://com.palm.applicationManager/",
				  method: "open",
				  onSuccess : "TPfileOpenSuccess",
				  onFailure : "TPfileOpenFailure"
			 },
			 {
				  name : "emailFile",
				  kind : "PalmService",
				  service:"palm://com.palm.applicationManager/",
				  method: "open",
				  onSuccess : "emailFileSuccess",
				  onFailure : "emailFileFailure"
			 },
			 {kind: "PalmService", name: "writeFile", service: "palm://com.petzapps.enotesenyo.service/",
				method: "writefile", subscribe: true, onSuccess: "fileCreated", onFailure: "fileCreationFail"},
			{name: "aboutPopup", kind: "Popup", scrim: true, components: [
				{content: enyo.fetchAppInfo().title+" - "+enyo.fetchAppInfo().version, style: "text-align: center; font-size: larger;"},
				{content: "<hr />", allowHtml: true},
				{name: "aboutPopupText", content: "This app is used for accessing the Evernote account from webOS", style: "text-align: center; font-size: smaller;"},
				{content: "<hr />", allowHtml: true},
				//{name: "aboutPopupText1", allowHtml: true, content: "Donations welcome:  <a href='http://paypal.com/cgi-bin/webscr?cmd=_donations&business=petropeter%40gmail%2ecom&lc=US&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted'>PayPal</a>", style: "text-align: center; font-size: smaller;"},				
				//{content: "<hr />", allowHtml: true},
				{name: "aboutPopupText2", allowHtml: true, content: "Icon Credits: Some of the icons are used from http://www.fatcow.com/free-icons", style: "text-align: center; font-size: smaller;"},
				{content: "<hr />", allowHtml: true},
				{kind: "Button", caption: "OK", onclick:"closeAboutPopup"}
			]},
			{name: "donatePopup", kind: "Popup", scrim: true, components: [
				{name: "donatePopupText1", allowHtml: true, content: "Donations welcome:  <a href='http://paypal.com/cgi-bin/webscr?cmd=_donations&business=petropeter%40gmail%2ecom&lc=US&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted'>PayPal</a>", style: "text-align: center; font-size: smaller;"},				
				{content: "<hr />", allowHtml: true},
				{kind: "Button", caption: "OK", onclick:"closeDonatePopup"}
			]},
			{name: "helpPopup", kind: "Popup", scrim: true, width: "60%", components: [
				{content: "E Notes - Help Topics",allowHtml: true, style: "text-align: center; font-size: larger;"},
				{content: "<hr />", allowHtml: true},
				{name: "helpPopupText", content: "<a href='http://petzapps.blogspot.com/2012/01/evernote-for-webos-help-topics.html'>Help Topics</a>", allowHtml: true,style: "text-align: center;"},
				{content: "<hr />", allowHtml: true},
				{kind: "Button", caption: "OK", onclick:"closeHelpPopup"}
			]},
			{kind: "ModalDialog", name: "errorDialog", caption: "Error", components:[
				{name:"errorMessage", content: "", className: "enyo-text-error warning-icon"},
				{kind: "Button", caption: $L("OK"), onclick: "closeErrorPopup", style: "margin-top:10px"},
			]},
			{kind: "ModalDialog", name: "errorExample", caption: "Error", components:[
				{name:"errorContent", content: $L("Search Text Not Entered"), className: "enyo-text-error warning-icon"},
				{kind: "Button", caption: $L("OK"), onclick: "closePopup", style: "margin-top:10px"},
			]},
			{kind: "ModalDialog", name: "emptyTitleErrorExample", caption: "Error", components:[
				{name:"errorContent", content: $L("Note Title is Mandatory"), className: "enyo-text-error warning-icon"},
				{kind: "Button", caption: $L("OK"), onclick: "closePopup", style: "margin-top:10px"},
			]},
			{kind: "ModalDialog", name: "dupTagErrorExample", caption: "Error", components:[
				{name:"errorContent", content: $L("Tag already selected"), className: "enyo-text-error warning-icon"},
				{kind: "Button", caption: $L("OK"), onclick: "closePopup", style: "margin-top:10px"},
			]},
			{kind: "ModalDialog", name: "attachedResourceViewer",width: "90%", height: "90%", caption: "", style:"background-color:#88cc70;", components:[
				{name: "ResourceBackground", kind: "Control",className: "enyo-fit desktop-background",components: [
					{kind: "PageHeader",flex: 1, pack: "center",height: "25px", style: "background-color:#88cc70;", 
						className: "header", components: [
							{content: "", align:"center", flex: 2},
							{name:"attachHeader", content: "Attachment Viewer", align:"center", flex: 3,style:"font-size: 0.9em;"},
							{content: "", align:"center", flex: 2},
					]},
					{name: "attachMainBody", flex: 1, kind: "VFlexBox", height:"73%", className:"compose-main-child", components: [
							{kind: "Spinner", name:"attachViewSpinner"},
							{kind: "Scroller", flex: 1, style:"background-color:white;", components: [
								{name: "resourceview", kind: "HtmlContent", flex: 1, minFontSize: 2,height: "100%",
									style:"padding: 5px;background-color:white;",
									className: "webview-body",
									enableJavascript: true,
									autoFit: true,
									fitRender: true,
									onLoadComplete: "onComplete", onLoadStopped: "onStopped", 
									onLoadStarted: "onStarted"
								}
							]},
							{name:"downloadMessage", content: "", style:"margin:1px;font-size: 0.8em;background-color:#88cc70;"},
					]},
					{kind: "Button", flex: 1,caption: $L("Close"),onclick: "closeResourcePopup", style: "margin-top:10px"},
				]},
			]},
			{kind: "ModalDialog", name: "tpAttachedResourceViewer",width: "90%", height: "90%", caption: "", style:"background-color:#88cc70;", components:[
				{name: "ResourceBackground1", kind: "Control",className: "enyo-fit desktop-background",components: [
					{kind: "PageHeader",flex: 1, pack: "center",height: "25px", style: "background-color:#88cc70;", 
						className: "header", components: [
							{content: "", align:"center", flex: 2},
							{name:"attachHeader1", content: "Attachment Viewer", align:"center", flex: 3,style:"font-size: 0.9em;"},
							{content: "", align:"center", flex: 2},
					]},
					{name: "attachMainBody1", flex: 1, kind: "VFlexBox", height:"75%", className:"compose-main-child", components: [
							{kind: "Spinner", name:"TPattachViewSpinner"},
							{kind: "Scroller", flex: 1, style:"background-color:white;", components: [
								{name: "tpresourceview", kind: "WebView", flex: 1, minFontSize: 2,height: "100%",
									style:"padding: 5px;background-color:white;",
									className: "webview-body",
									enableJavascript: true,
									autoFit: true,
									fitRender: true,
									onLoadComplete: "onTPComplete", onLoadStopped: "onTPStopped", 
									onLoadStarted: "onTPStarted"
								}
							]},
							{name:"TPdownloadMessage", content: "", style:"margin:1px;font-size: 0.8em;background-color:#88cc70;"},
					]},
					{kind: "Button", flex: 1,caption: $L("Close"),onclick: "TPcloseResourcePopup", style: "margin-top:10px"},
				]},
			]},
			{kind: "ModalDialog", name: "addTagDialog", style:"background-color:#88cc70;", caption: "Add Tag",width: "330px", components:[
				{kind: "Group", components: [
						{kind: "RowItem", layoutKind: "HFlexLayout",components: [
							{content: $L("Name"), flex: 2.5,style:"margin:15px;"},
							{name: "dtagname", hint: $L("Enter Name..."), autocorrect:false,
									width: "150px;", kind: "Input",style:"margin:4px;", flex: 1.2},
						]}
				]},
				{layoutKind: "HFlexLayout", components: [  
					{kind: "Button", caption: $L("Close"), flex: 1, onclick: "closeTagDialog"},
					{kind: "ActivityButton", name: "addTagButton",onclick: "addTagClicked", flex: 1, disabled: false, active: false,
											className: "enyo-button-affirmative", caption: $L("Add")},
				]},
				{ name: "tagmessage", content: "",style:"margin:1px;font-size: 0.8em;" }
			]},
			{kind: "ModalDialog", name: "editTagDialog", style:"background-color:#88cc70;", caption: "Edit Tag",width: "330px", components:[
				{kind: "Group", components: [
						{kind: "RowItem", layoutKind: "HFlexLayout",components: [
							{content: $L("Name"), flex: 2.5,style:"margin:15px;"},
							{name: "dedittagname", autocorrect:false,
									width: "150px;", kind: "Input",style:"margin:4px;", flex: 1.2},
						]}
				]},
				{layoutKind: "HFlexLayout", components: [  
					{kind: "Button", caption: $L("Cancel"), flex: 1, onclick: "closeEditTagDialog"},
					{kind: "ActivityButton", name: "editTagButton",onclick: "editTagClicked", flex: 1, disabled: false, active: false,
											className: "enyo-button-affirmative", caption: $L("Save")},
				]},
				{ name: "edittagmessage", content: "",style:"margin:1px;font-size: 0.8em;" }
			]},
			{kind: "ModalDialog", name: "addNbDialog", style:"background-color:#88cc70;", caption: "Add Notebook",width: "330px", components:[
				{kind: "Group", components: [
						{kind: "RowItem", layoutKind: "HFlexLayout",components: [
							{name: "dnbname", hint: $L("Enter Name..."), autocorrect:false,
									//width: "160px;", 
									kind: "Input",style:"margin:1px;", flex: 1},
						]},
						{kind: "RowItem", layoutKind: "HFlexLayout",components: [
							{content: $L("Default Notebook"),style:"margin:5px;"},
							{kind: "Spacer"},
							{name:"defNbBox", kind: "CheckBox"}
						]}
				]},
				{layoutKind: "HFlexLayout", components: [  
					{kind: "Button", caption: $L("Close"), flex: 1, onclick: "closeNbDialog"},
					{kind: "ActivityButton", name: "addNbButton",onclick: "addNbClicked", flex: 1, disabled: false, active: false,
											className: "enyo-button-affirmative", caption: $L("Add")},
				]},
				{ name: "nbmessage", content: "",style:"margin:1px;font-size: 0.8em;" }
			]},
			{kind: "ModalDialog", name: "editNbDialog", style:"background-color:#88cc70;", caption: "Edit Notebook",width: "330px", components:[
				{kind: "Group", components: [
						{kind: "RowItem", layoutKind: "HFlexLayout",components: [
							{name: "deditnbname", autocorrect:false,
									kind: "Input",style:"margin:1px;", flex: 1},
						]},
						{kind: "RowItem", layoutKind: "HFlexLayout",components: [
							{content: $L("Default Notebook"),style:"margin:5px;"},
							{kind: "Spacer"},
							{name:"defEditNbBox", kind: "CheckBox"}
						]}
				]},
				{layoutKind: "HFlexLayout", components: [  
					{kind: "Button", caption: $L("Close"), flex: 1, onclick: "closeEditNbDialog"},
					{kind: "ActivityButton", name: "editNbButton",onclick: "editNbClicked", flex: 1, disabled: false, active: false,
											className: "enyo-button-affirmative", caption: $L("Save")},
				]},
				{ name: "editnbmessage", content: "",style:"margin:1px;font-size: 0.8em;" }
			]},
			{kind: "ModalDialog", name: "passwordDialog", style:"background-color:#88cc70;", caption: "Enter Passphrase",width: "330px", components:[
				{kind: "Group", components: [
						{kind: "RowItem", layoutKind: "HFlexLayout",components: [
							{content: $L("Passcode"), flex: 2.5,style:"margin:15px;"},
							{name: "dpasscodename", autocorrect:false,
									width: "140px;", kind: "PasswordInput",style:"margin:4px;", flex: 1.2},
						]}
				]},
				{layoutKind: "HFlexLayout", components: [  
					{kind: "Button", caption: $L("Cancel"), flex: 1, onclick: "closePassDialog"},
					{kind: "ActivityButton", name: "showPassButton",onclick: "showCodeClicked", flex: 1, disabled: false, active: false,
											className: "enyo-button-affirmative", caption: $L("Submit")},
				]},
				{ name: "passmessage", content: "",style:"margin:1px;font-size: 0.8em;" }
			]},
			{kind: "ModalDialog", name: "decrContentViewer",width: "70%", height: "80%", caption: "", style:"background-color:#88cc70;", components:[
				{name: "ResourceBackground2", kind: "Control",className: "enyo-fit desktop-background",components: [
					{kind: "PageHeader",flex: 1, pack: "center",height: "25px", style: "background-color:#88cc70;", 
						className: "header", components: [
							{content: "", align:"center", flex: 1},
							{name:"decrContentHeader", content: "Content Viewer", align:"center", flex: 3,style:"font-size: 0.9em;"},
							{content: "", align:"center", flex: 1},
					]},
					{name: "attachMainBody2", flex: 1, kind: "VFlexBox", height:"60%", className:"compose-main-child", components: [
							//{kind: "Spinner", name:"attachViewSpinner"},
							{kind: "Scroller", flex: 1, style:"background-color:white;", components: [
								{name: "decrcontentview", kind: "HtmlContent", flex: 1, minFontSize: 2,height: "100%",
									style:"padding: 5px;background-color:white;",
									className: "webview-body",
									enableJavascript: true,
									autoFit: true,
									fitRender: true,
									//onLoadComplete: "onComplete", onLoadStopped: "onStopped", 
									//onLoadStarted: "onStarted"
								}
							]},
							//{name:"downloadMessage", content: "", style:"margin:1px;font-size: 0.8em;background-color:#88cc70;"},
					]},
					{kind: "Button", flex: 1,caption: $L("Close"),onclick: "closeDecrContentPopup", style: "margin-top:10px"},
				]},
			]},
			{kind: "Menu", components: [
				{caption: "Large", onclick: "largerFontClicked",style:"margin:1px;"},
				{caption: "Normal", onclick: "normalFontClicked",style:"margin:1px;"},
				{caption: "Small", onclick: "smallerFontClicked",style:"margin:1px;"},
			]},
			{
				 name: "launchBrowserCall",
				 kind: "PalmService",
				 service: "palm://com.palm.applicationManager/",
				 method: "launch",
				 onSuccess: "launchFinished",
				 onFailure: "launchFail",
				 onResponse: "gotResponse",
				 subscribe: true
			},
			{ name: "OAuth1", kind: "OAuth" },
			{ name: "webService3", kind: "WebService",
				onSuccess: "webService3AccessSuccess",
				onFailure: "webService3Failure",
				components: [
					{
						method: "GET",
						handleAs: "json",
						contentType: "application/x-www-form-urlencoded"
					}
				]
			},
			{
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
					content: "<img src='images/mathpro.png' height='32' width='32' /> <a href='https://developer.palm.com/appredirect/?packageid=com.petzapps.mathpro'>Math Pro</a>",
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
		]}
	],
	openMoreAppDialog: function () {
        this.$.moreAppPopup.openAtCenter();
    },
	closeMoreAppPopup: function () {
        this.$.moreAppPopup.close();
    },
	lockScreenClicked: function() {
		if (this.$.lockScreen.getIcon() == "images/lightbulb-on-icon.png") {
			this.$.lockScreen.setIcon("images/lightbulb-icon.png");
			enyo.windows.setWindowProperties(enyo.windows.getActiveWindow(), {"blockScreenTimeout" : false});
		}
		else {
			this.$.lockScreen.setIcon("images/lightbulb-on-icon.png");
			enyo.windows.setWindowProperties(enyo.windows.getActiveWindow(), {"blockScreenTimeout" : true});
		}
	},
	fontResizeClicked: function(inSender) {
		//console.log(inSender.id);
		this.$.menu.openAroundControl(inSender);
	},
	largerFontClicked: function() {
		this.$.notecontent.setStyle("padding: 5px;font-size: 1.15em;background-color:white;");
	},
	showDetailClicked: function() {
		if(this.detailShowed) {
			this.detailShowed = false;
			this.$.notedetail.hide();
			this.$.showdetail.setCaption("Show Details");
		} else {
			this.detailShowed = true;
			this.$.notedetail.show();
			this.$.showdetail.setCaption("Hide Details");
		}		
	},
	tagArrowBtnClicked: function() {
		if(this.tagsShowed) {
			this.tagsShowed = false;
			this.$.tagBox.hide();
			if(enyo.getWindowOrientation() == "up"
					|| enyo.getWindowOrientation() == "down") {
				this.$.notebooklist.setStyle("height:"+this.upheight);
			} else {
				this.$.notebooklist.setStyle("height:"+this.rightheight);
			}
			
			this.$.resizetag.setIcon("images/tag-show.png");
			this.$.notebooklist.refresh();
		} else {
			this.tagsShowed = true;
			this.$.tagBox.show();			
			if(enyo.getWindowOrientation() == "up"
					|| enyo.getWindowOrientation() == "down") {
					if(!this.notebooksShowed) {
						this.$.taglist.setStyle("height:"+this.upheight);
					} else {
						this.$.notebooklist.setStyle("height:"+this.uphalfheight);
						this.$.taglist.setStyle("height:"+this.uphalfheight);
					}
			} else {
					if(!this.notebooksShowed) {
						this.$.taglist.setStyle("height:"+this.rightheight);
					} else {
						this.$.notebooklist.setStyle("height:"+this.righthalfheight);
						this.$.taglist.setStyle("height:"+this.righthalfheight);
					}				
			}
			this.$.resizetag.setIcon("images/tag-hide.png");
			this.$.notebooklist.refresh();
			this.$.taglist.refresh();
		}		
	},
	notebookHideBtnClicked: function() {
		if(this.notebooksShowed) {
			this.notebooksShowed = false;
			this.$.notebookBox.hide();
			if(enyo.getWindowOrientation() == "up"
					|| enyo.getWindowOrientation() == "down") {
				this.$.taglist.setStyle("height:"+this.upheight);
			} else {
				this.$.taglist.setStyle("height:"+this.rightheight);
			}
			this.$.resizenotebook.setIcon("images/folders-icon.png");
			this.$.taglist.refresh();
		} else {
			this.notebooksShowed = true;
			this.$.notebookBox.show();
			if(enyo.getWindowOrientation() == "up"
					|| enyo.getWindowOrientation() == "down") {
					if(!this.tagsShowed) {
						this.$.notebooklist.setStyle("height:"+this.upheight);
					} else {
						this.$.notebooklist.setStyle("height:"+this.uphalfheight);
						this.$.taglist.setStyle("height:"+this.uphalfheight);
					}
			} else {
					if(!this.tagsShowed) {
						this.$.notebooklist.setStyle("height:"+this.rightheight);
					} else {
						this.$.notebooklist.setStyle("height:"+this.righthalfheight);
						this.$.taglist.setStyle("height:"+this.righthalfheight);
					}				
			}
			this.$.resizenotebook.setIcon("images/folder-delete-icon.png");
			this.$.taglist.refresh();
			this.$.notebooklist.refresh();
		}		
	},
	normalFontClicked: function() {
		this.$.notecontent.setStyle("padding: 5px;font-size: 0.75em;background-color:white;");
	},
	smallerFontClicked: function() {
		this.$.notecontent.setStyle("padding: 5px;font-size: 0.60em;background-color:white;");
	},
	openHelp: function() {
		this.$.helpPopup.openAtCenter();
	},
	closeHelpPopup: function() {
		this.$.helpPopup.close();
	},
	openCatalog: function() {
		var appInfo = enyo.fetchAppInfo();
		window.open("http://developer.palm.com/appredirect/?packageid="+appInfo.id);
	},
	emailDeveloper: function() {
		var appInfo = enyo.fetchAppInfo();
		//'mailto:' + mailto + '?subject='+mailSubject+'&body='+mailBody
		window.open("mailto:petzapps.help@gmail.com?subject=E Notes Help - v"+appInfo.version);
	},
	windowRotated: function(inSender, inEvent) {
		var orient = enyo.getWindowOrientation();
		this.setListHeights(orient);
	},
	windowParamsChangeHandler: function() {
		var orient = enyo.getWindowOrientation();
		this.setListHeights(orient);
	},
	setListHeights: function(orient) {
		this.upheight = '630px';//768
		this.uphalfheight = '290px';
		this.rightheight = '875px';//1024
		this.righthalfheight = '405px';
		this.orientation = orient;
		
		if(this.deviceName.indexOf("PRE3") != -1) {
				this.rightheight = '360px';
				this.righthalfheight = '150px';
				this.upheight = '650px';
				this.uphalfheight = '295px';
		}
		if(orient == "up"
			|| orient == "down") {
			this.$.notelist.setStyle("height:"+this.upheight);
			if(!this.tagsShowed) {
				this.$.notebooklist.setStyle("height:"+this.upheight);
			} else if(!this.notebooksShowed) {
				this.$.taglist.setStyle("height:"+this.upheight);
			} else {
				this.$.notebooklist.setStyle("height:"+this.uphalfheight);
				this.$.taglist.setStyle("height:"+this.uphalfheight);
			}
			this.$.slidingPane.selectView(this.$.left);
			this.$.notelist.refresh();
			this.$.notebooklist.refresh();
			this.$.taglist.refresh();
			
		} else {
			this.$.notelist.setStyle("height:"+this.rightheight);
			if(!this.tagsShowed) {
				this.$.notebooklist.setStyle("height:"+this.rightheight);
			} else if(!this.notebooksShowed) {
				this.$.taglist.setStyle("height:"+this.rightheight);
			} else {
				this.$.notebooklist.setStyle("height:"+this.righthalfheight);
				this.$.taglist.setStyle("height:"+this.righthalfheight);
			}
			this.$.slidingPane.selectView(this.$.middle);
			this.$.notelist.refresh();
			this.$.notebooklist.refresh();
			this.$.taglist.refresh();
			
		}
	},
	refreshAllData: function() {
		this.refreshNotesData();
		this.resetNoteDetail();
		this.detailShowed = false;
		this.$.notedetail.hide();
		this.$.showdetail.setCaption("Show Details");
	},
	logoutClicked: function() {
		//Delete login data from DB
		//console.log("Delete login data from DB");
		this.pars = {
			oauth_token: enyo.application.authToken
		};
		
		this.message3 = {action: Evernote.application.logoutUrl, method: "POST", parameters: [] };
		this.message3.parameters = this.pars;

		this.message3 = this.$.OAuth1.setTimestampAndNonce(this.message3);
		//this.message3 = this.$.OAuth1.sign(this.message3, this.accessor);
		this.message3.action = this.$.OAuth1.addToURL(this.message3.action, this.message3.parameters);
		
		this.$.webService3.setUrl(this.message3.action);
		this.$.webService3.setMethod(this.message3.method);
		
		this.$.webService3.call();
		
		var deletedb = [];
		deletedb[0] = this.$.db.getDelete("user_oauth",
						{"oauth_key": "oauth_token"});	
		deletedb[1] = this.$.db.getDelete("user_oauth",
						{"oauth_key": "edam_noteStoreUrl"});
		deletedb[2] = this.$.db.getDelete("user_oauth",
						{"oauth_key": "edam_webApiUrlPrefix"});
		deletedb[3] = this.$.db.getDelete("user_oauth",
						{"oauth_key": "edam_expires"});
		deletedb[4] = this.$.db.getDelete("user_oauth",
						{"oauth_key": "edam_shardId"});
		
		this.$.db.queries(deletedb, {onSuccess: this.deleteUserSuccess.bind(this)});
	},
	webService3AccessSuccess: function(inSender, inResponse, inRequest)
	{
		console.log("Service 3: "+inResponse);
	},
	webService3Failure: function(inSender, inResponse, inRequest)
	{
		console.log("webService2PostSuccess inResponse: "+inResponse);
	},
	deleteUserSuccess: function() {
		//console.log("deleteUserSuccess");
		this.notebookdata = null;
		this.tagsdata = null;
		this.notesdata = null;
		this.$.notebooklist.refresh();
		this.$.taglist.refresh();
		this.$.notelist.refresh();
		this.resetNoteDetail();
		this.detailShowed = false;
		this.$.notedetail.hide();
		this.$.showdetail.setCaption("Show Details");
		this.$.notecontent.setContent('');
		enyo.application.EvernoteInstance.showConnectMainView();
	},
	resetNoteDetail: function() {
		this.$.noteTitle.setContent('');
		this.$.updatedVal.setContent('');
		this.$.createdVal.setContent('');
		this.$.noteUrlVal.setContent('');
		this.$.tagsVal.setContent('');
		
		this.$.attachmentSelector.setLabel("Attachments (0)");
		var items = [];
		this.$.attachmentSelector.setItems( items );
	},
	openPreferences: function() {
		try{
			this.$.preferencesPopup.openAtCenter();
			//var selectdb = this.$.db.getSelect("preferences",null,{"pref_type":"notes_sort_order"});
			//this.$.db.query(selectdb, {onSuccess: this.getNotesSortOrderResponse.bind(this)});
			//var selectdb2 = this.$.db.getSelect("preferences",null,{"pref_type":"notes_per_page"});
			//this.$.db.query(selectdb2, {onSuccess: this.getNotesPerPageResponse.bind(this)});
			this.$.sortingPane.setValue(enyo.application.notesSortOrder);
			this.$.notesPageAction.setValue(enyo.application.notesPerPage);
		} catch(e) {
			console.log("Error"+e);
		}
	},
	getNotesSortOrderResponse : function(results)
	{
		this.$.sortingPane.setValue(results[0].pref_value);
	},
	getNotesPerPageResponse : function(results)
	{
		this.$.notesPageAction.setValue(results[0].pref_value);
	},
	saveNewPreferences: function() {
		//Get the user preferred values
		var sortingMethod = this.$.sortingPane.getValue();
		var notesPerPage = this.$.notesPageAction.getValue();
		enyo.application.notesSortOrder = parseInt(sortingMethod);
		AppUtils.setSortingOrder(sortingMethod);
		enyo.application.notesPerPage = parseInt(notesPerPage);
		//console.log("sortorder: "+enyo.application.sortorder+" notesPerPage: "+enyo.application.notesPerPage);
		//Save to DB
		var dummydata;
		var updatedb = this.$.db.getUpdate("preferences",{"pref_value": sortingMethod},{"pref_type":"notes_sort_order"});
		this.$.db.query(updatedb, dummydata);
		var updatedb = this.$.db.getUpdate("preferences",{"pref_value": notesPerPage},{"pref_type":"notes_per_page"});
		this.$.db.query(updatedb, dummydata);
		//Close Popup
		this.$.preferencesPopup.close();
		//Refresh Notes
		this.reloadNotes();
	},
	openAbout: function() {
		this.$.aboutPopup.openAtCenter();
	},
	closeAboutPopup: function() {
		this.$.aboutPopup.close();
	},
	openDonate: function() {
		this.$.donatePopup.openAtCenter();
	},
	closeDonatePopup: function() {
		this.$.donatePopup.close();
	},
	setFavClicked: function(inSender, inEvent) {
		var record = this.notebookdata[this.selectedNotebookRow]; 
		if (record) {
			if(record.name == "All Notes") {
				this.showErrorDialog("All Notes cannot be set as default Notebook");
				return;
			}
			
			//Load Notes
			var self = this;
			var onSuccess = function(data, transport) {
				self.showNotebookScrim(false);
				self.listNotebooks();
			};
			var onFailure = function(transport) {
				//console.log("Error: Error updating Notebook");
				this.showErrorDialog("Error while setting Notebook as default");
				this.showNotebookScrim(false);
			};
						
			var nb = new Notebook();
			nb.initialize(record.guid,record.name);
			nb.defaultNotebook = true;
			enyo.application.NoteStore.updateNotebook(onSuccess,onFailure,nb);
			this.showNotebookScrim(true);
		} else {
			this.showErrorDialog("No Notebook Selected");
		}
	},
	showErrorDialog: function(message) {
		this.$.errorDialog.openAtCenter();
		this.$.errorMessage.setContent(message);		
	},
	closeErrorPopup: function() {
		this.$.errorDialog.close();
	},
	addNotebookClicked: function() {
		this.$.addNbDialog.openAtCenter();
	},
	editNotebookClicked: function() {
		var record = this.notebookdata[this.selectedNotebookRow]; 
		if (record) {
			if(record.name == "All Notes") {
				this.showErrorDialog("Select a Notebook to Edit");
				return;
			}
			this.$.editNbDialog.openAtCenter();

			this.$.deditnbname.setValue(record.name);
			if(record.defaultNotebook) {
				this.$.defEditNbBox.setChecked(true);
			}
		} else {
			this.showErrorDialog("No Notebook Selected");
		}
	},
	showCodeClicked: function() {
		var passcode = this.$.dpasscodename.getValue();
	
		if(passcode.length == 0) {
			this.$.passmessage.setContent("Passphrase cannot be blank");
			this.$.passmessage.setStyle("margin:1px;font-size: 0.8em;color:red");
			return;
		}
		//console.log("Content to decrypt: "+this.currentPasscodeContent);
		if(!this.noteDecryptor){
			this.noteDecryptor = new NoteDecryptor();
		}
		var decrContent = this.noteDecryptor.decrypt(this.currentPasscodeContent, passcode);
		if(decrContent === null) {
			this.$.passmessage.setContent("Passphrase is invalid");
			this.$.passmessage.setStyle("margin:1px;font-size: 0.8em;color:red");
		} else {
			//console.log("Secret Content: "+decrContent);
			this.closePassDialog();
			this.$.decrContentViewer.openAtCenter();
			this.$.decrcontentview.setContent(decrContent);			
		}
		
	},
	closeNbDialog: function(inSender, inEvent) {
		this.$.dnbname.setValue("");
		this.$.nbmessage.setContent("");
		this.$.addNbButton.setDisabled(false);
		this.$.addNbButton.setActive(false);
		this.$.defNbBox.setChecked(false);
		this.$.addNbDialog.close();
	},
	closePassDialog: function(inSender, inEvent) {
		this.$.dpasscodename.setValue("");
		this.$.passmessage.setContent("");
		//this.$.addNbButton.setDisabled(false);
		//this.$.addNbButton.setActive(false);
		this.$.passwordDialog.close();
	},
	closeEditNbDialog: function(inSender, inEvent) {
		this.$.deditnbname.setValue("");
		this.$.editnbmessage.setContent("");
		this.$.editNbButton.setDisabled(false);
		this.$.editNbButton.setActive(false);
		this.$.defEditNbBox.setChecked(false);
		this.$.editNbDialog.close();
	},
	editNbClicked: function(inSender, inEvent) {
		  this.$.editnbmessage.setContent("");
		  var nbNameText = this.$.deditnbname.getValue();
		  if(nbNameText.length == 0) {
			this.$.editnbmessage.setContent("Notebook Name cannot be blank");
			this.$.editnbmessage.setStyle("margin:1px;font-size: 0.8em;color:red");
			return;
		  }
		  
		  var self = this;
		  var onSuccess = function(data, transport) {
				self.$.editNbButton.setDisabled(false);
				self.$.editNbButton.setActive(false);
				self.$.editnbmessage.setContent("Notebook Updated");
				self.$.editnbmessage.setStyle("margin:1px;font-size: 0.8em;color:green");
				self.listNotebooks();
		  };
		  var onFailure = function(transport) {
				self.$.editNbButton.setDisabled(false);
				self.$.editNbButton.setActive(false);
				self.$.editnbmessage.setContent("Error occured while updating a Notebook");
				self.$.editnbmessage.setStyle("margin:1px;font-size: 0.8em;color:red");
		  };
		  var record = this.notebookdata[this.selectedNotebookRow];
		  var nb = new Notebook();
		  nb.initialize(record.guid,nbNameText);
		  if(this.$.defEditNbBox.getChecked()) {
			nb.defaultNotebook = true;
		  }
		  enyo.application.NoteStore.updateNotebook(onSuccess,onFailure,nb);
		  this.$.editNbButton.setDisabled(true);
		  this.$.editNbButton.setActive(true);
	},
	addNbClicked: function(inSender, inEvent) {
		  this.$.nbmessage.setContent("");
		  var nbNameText = this.$.dnbname.getValue();
		  if(nbNameText.length == 0) {
			this.$.nbmessage.setContent("Notebook Name cannot be blank");
			this.$.nbmessage.setStyle("margin:1px;font-size: 0.8em;color:red");
			return;
		  }
		  
		  var self = this;
		  var onSuccess = function(note, transport) {
				self.addNbResponse();					
		  };
		  var onFailure = function(note, transport) {
				self.$.addNbButton.setDisabled(false);
				self.$.addNbButton.setActive(false);
				self.$.nbmessage.setContent("Error occured while adding a Notebook");
				self.$.nbmessage.setStyle("margin:1px;font-size: 0.8em;color:red");
		  };
		  var nb = new Notebook();
		  nb.initialize(null,nbNameText);
		  if(this.$.defNbBox.getChecked()) {
			nb.defaultNotebook = true;
		  }
		  enyo.application.NoteStore.createNotebook(onSuccess,onFailure,nb);			
		  this.$.addNbButton.setDisabled(true);
		  this.$.addNbButton.setActive(true);
	},
	addNbResponse: function() {
		this.$.addNbButton.setDisabled(false);
		this.$.addNbButton.setActive(false);
		this.$.nbmessage.setContent("Notebook Added");
		this.$.nbmessage.setStyle("margin:1px;font-size: 0.8em;color:green");
		this.listNotebooks();
	},
	listNotebooks: function() {
		//Load Notebooks with counts
		var self = this;
		var success4 = function(response) {
			self.listNotebooksResponse(response);
			self.showNotebookScrim(false);
		};
		var onFailure = function(transport) {
			//self.showErrorDialog("Failed to delete selected note");
			self.showAlertMessage.bind(self, "Failed to list Notebooks");
			self.showNotebookScrim(false);
		};
		enyo.application.NoteStore.listNotebooks(success4, onFailure, true);
		self.showNotebookScrim(true);
	},
	listTags: function() {
		var self = this;
		var success2 = function(response) {
			self.listTagsResponse(response);
			self.showTagScrim(false);	
		};
		var onFailure = function(transport) {
			//self.showErrorDialog("Failed to delete selected note");
			self.showAlertMessage.bind(self, "Failed to list Tags");
			self.showTagScrim(false);
		};
		enyo.application.NoteStore.listTags(success2, onFailure, true);
		self.showTagScrim(true);
	},
	addTagsBtnClicked: function() {
		this.$.addTagDialog.openAtCenter();
	},
	editTagBtnClicked: function() {
		var record = this.tagsdata[this.selectedTagRow]; 
		if (record) {
			this.$.editTagDialog.openAtCenter();
			this.$.dedittagname.setValue(record.name);
		} else {
			this.showErrorDialog("Select a Tag to Edit");
		}
	},
	closeEditTagDialog: function(inSender, inEvent) {
		this.$.dedittagname.setValue("");
		this.$.edittagmessage.setContent("");
		this.$.editTagButton.setDisabled(false);
		this.$.editTagButton.setActive(false);
		this.$.editTagDialog.close();
	},
	closeTagDialog: function(inSender, inEvent) {
		this.$.dtagname.setValue("");
		this.$.tagmessage.setContent("");
		this.$.addTagButton.setDisabled(false);
		this.$.addTagButton.setActive(false);
		this.$.addTagDialog.close();
	},
	editTagClicked: function(inSender, inEvent) {
		  this.$.edittagmessage.setContent("");
		  var tagNameText = this.$.dedittagname.getValue();
		  if(tagNameText.length == 0) {
			this.$.edittagmessage.setContent("Tag Name cannot be blank");
			this.$.edittagmessage.setStyle("margin:1px;font-size: 0.8em;color:red");
			return;
		  }
		  
		  var self = this;
		  var onSuccess = function(note, transport) {
				self.updateTagResponse();					
		  };
		  var onFailure = function(note, transport) {
				self.$.editTagButton.setDisabled(false);
				self.$.editTagButton.setActive(false);
				self.$.edittagmessage.setContent("Error occured while updating a Tag");
				self.$.edittagmessage.setStyle("margin:1px;font-size: 0.8em;color:red");
		  };
		  var record = this.tagsdata[this.selectedTagRow]; 
		  var tag = new Tag();
		  tag.initialize(record.guid,tagNameText);
		  enyo.application.NoteStore.updateTag(onSuccess,onFailure,tag);			
		  this.$.editTagButton.setDisabled(true);
		  this.$.editTagButton.setActive(true);
	},
	addTagClicked: function(inSender, inEvent) {
		  this.$.tagmessage.setContent("");
		  var tagNameText = this.$.dtagname.getValue();
		  if(tagNameText.length == 0) {
			this.$.tagmessage.setContent("Tag Name cannot be blank");
			this.$.tagmessage.setStyle("margin:1px;font-size: 0.8em;color:red");
			return;
		  }
		  
		  var self = this;
		  var onSuccess = function(note, transport) {
				self.addTagResponse();					
		  };
		  var onFailure = function(note, transport) {
				self.$.addTagButton.setDisabled(false);
				self.$.addTagButton.setActive(false);
				self.$.tagmessage.setContent("Error occured while adding a Tag");
				self.$.tagmessage.setStyle("margin:1px;font-size: 0.8em;color:red");
		  };
		  var tag = new Tag();
		  tag.initialize(null,tagNameText);
		  enyo.application.NoteStore.createTag(onSuccess,onFailure,tag);			
		  this.$.addTagButton.setDisabled(true);
		  this.$.addTagButton.setActive(true);
	},
	updateTagResponse: function() {
		this.$.editTagButton.setDisabled(false);
		this.$.editTagButton.setActive(false);
		this.$.edittagmessage.setContent("Tag Updated");
		this.$.edittagmessage.setStyle("margin:1px;font-size: 0.8em;color:green");
		//Refresh Tags
		this.listTags();
	},
	addTagResponse: function() {
		this.$.addTagButton.setDisabled(false);
		this.$.addTagButton.setActive(false);
		this.$.tagmessage.setContent("Tag Added");
		this.$.tagmessage.setStyle("margin:1px;font-size: 0.8em;color:green");
		//Refresh Tags
		this.listTags();
	},
	deleteNoteItem: function(inSender, inIndex) {
		// remove data
		var record = this.notesdata[inIndex];
		if (record) {
			//Delete Note from Evernote
			var self = this;
			var onSuccess = function(note, transport) {
					//self.showAlertMessage("ALERT: Note deleted successfully");
					enyo.windows.addBannerMessage($L("Note deleted successfully"),"{}");
					//Reset content
					self.$.notecontent.setContent('');
					//Refresh Notes
					self.refreshNotesData();
				};
			var onFailure = function(transport) {
				//self.showErrorDialog("Failed to delete selected note");
				self.showAlertMessage.bind(self, "Failed to delete selected note")
				self.showNoteScrim(false);
			};
			enyo.application.NoteStore.deleteNote(onSuccess,onFailure, record.guid);
			self.showNoteScrim(true);
		}
	},
	closePopup: function(inSender, inEvent) {
		inSender.parent.parent.parent.close();
	},
	closeResourcePopup: function(inSender, inEvent) {
		this.$.resourceview.setContent('');
		this.$.downloadMessage.setContent("");
		this.$.attachedResourceViewer.close();
	},
	closeDecrContentPopup: function(inSender, inEvent) {
		this.$.decrcontentview.setContent('');
		this.$.decrContentViewer.close();
	},
	TPcloseResourcePopup: function(inSender, inEvent) {
		this.$.tpresourceview.setUrl('');
		this.$.TPdownloadMessage.setContent("");
		this.$.tpAttachedResourceViewer.close();
	},
	attachmentSelected: function(inSender, inValue, inOldValue) {
		//console.log("attachmentSelected : inValue: "+inValue);
		//this.$.attachedResourceViewer.openAtCenter();
		
		var resourceGuid = this.resourceGuidPosnMap[inValue];	
		var resource = this.noteResourcesMap[resourceGuid];		
		var sharedBaseUrl = Evernote.application.secureHost + "/shard/" + enyo.application.shardId;
		this.isSetDownloadInProgress = true;
		if(this.deviceName.indexOf("PRE3") != -1
			|| this.deviceName.indexOf("PRE2") != -1) {
			this.$.attachedResourceViewer.openAtCenter();
			this.$.writeFile.call({ path: "/media/internal/evernotewebos/", guid: resourceGuid,
									authtoken: enyo.application.authToken,
									fileurl: sharedBaseUrl + '/res/' + resourceGuid,
									filename: resource.name,caller:"ATTACHMENT", mime:resource.mime});
			this.showAttachmentScrim(true);						
		} else {
			this.$.tpAttachedResourceViewer.openAtCenter();
			this.$.downloadFile.call({target: sharedBaseUrl + '/res/' + resourceGuid,
									mime:resource.mime, cookieHeader:"auth=" + enyo.application.authToken,
									subscribe:true, targetDir:"/media/internal/evernotewebos/",
									targetFilename:resource.name});
			this.showTPAttachmentScrim(true);
		}
		
	},
	downloadFinished : function(inSender, inResponse) {
	   //console.log("downloadFinished, results=" + enyo.json.stringify(inResponse));
	   if(! inResponse.completed) {
			if(this.isSetDownloadInProgress) {
				this.$.tpresourceview.setUrl(enyo.fetchAppRootPath()+'images/downloadinprogress.png');
				this.isSetDownloadInProgress = false;
			}
		} else if((inResponse.completed && inResponse.completionStatusCode == 200)) {
			this.showTPAttachmentScrim(false);
			this.$.TPdownloadMessage.setContent("Download Location: "+inResponse.target);
			var mime = inResponse.mimetype;
			if(mime.indexOf("image/") != -1
				|| mime.indexOf("text/plain") != -1) {
				this.$.tpresourceview.setUrl('file://'+inResponse.target);
				return;
			}
			//Handle Audio / Video / PDF Files
			this.$.tpOpenFile.call({target: 'file://'+inResponse.target});
		} else if((inResponse.completed && inResponse.completionStatusCode != 200)) {
			this.$.tpresourceview.setUrl(enyo.fetchAppRootPath()+'images/downloadfail.png');
		}
	},
	TPfileOpenSuccess : function(inSender, inResponse) {
		this.$.tpresourceview.setUrl(enyo.fetchAppRootPath()+'images/fileopened.png');
	},
	TPfileOpenFailure : function(inSender, inResponse) {
		this.$.tpresourceview.setUrl(enyo.fetchAppRootPath()+'images/fileopenfail.png');
	},
	fileOpenSuccess : function(inSender, inResponse) {
		//this.$.resourceview.setUrl(enyo.fetchAppRootPath()+'images/fileopened.png');
		var imgSrc = "<img src='"+enyo.fetchAppRootPath()+'images/fileopened.png'+"' />";
		this.$.resourceview.setContent(imgSrc);
	},
	fileOpenFailure : function(inSender, inResponse) {
		//this.$.resourceview.setUrl(enyo.fetchAppRootPath()+'images/fileopenfail.png');
		var imgSrc = "<img src='"+enyo.fetchAppRootPath()+'images/fileopenfail.png'+"' />";
		this.$.resourceview.setContent(imgSrc);
	},
	onTPComplete: function(inSender, inEvent) {
		this.showTPAttachmentScrim(false);
	},
	onTPStopped: function(inSender, inEvent) {
		this.showTPAttachmentScrim(false);
	},
	onTPStarted: function(inSender, inEvent) {
		this.showTPAttachmentScrim(true);
	},
	downloadFail : function(inSender, inResponse) {
	   //console.log("downloadFail, results=" + enyo.json.stringify(inResponse));
	},
	addTagSelected: function(inSender, inValue, inOldValue) {
		this.addNoteSelectedGuid = this.tagGuidPosnMap[inValue];
		this.addNoteSelectedTagName = this.tagGuidMap[this.addNoteSelectedGuid];
		var startswithStr = this.addNoteSelectedTagName+",";
		var selTags = this.$.tagsAddedInput.getValue();
		if(selTags.substring(0, startswithStr.length) === startswithStr
			|| selTags.indexOf(","+startswithStr) != -1) {
			this.$.dupTagErrorExample.openAtCenter();
			return;
		}
		//this.addNoteSelectedTagNames += this.addNoteSelectedTagName+",";		
		this.$.tagsAddedInput.setValue(selTags+startswithStr);
		
		//this.addNoteSelectedTagNamesList.push(this.addNoteSelectedTagName);
	},
	addEditTagSelected: function(inSender, inValue, inOldValue) {
		
		this.editNoteSelectedGuid = this.tagEditGuidPosnMap[inValue];
		this.editNoteSelectedTagName = this.tagGuidMap[this.editNoteSelectedGuid];
		var startswithStr = this.editNoteSelectedTagName+",";
		var selTags = this.$.tagsAddedEditInput.getValue();
		if(selTags.substring(0, startswithStr.length) === startswithStr
			|| selTags.indexOf(","+startswithStr) != -1) {
			this.$.dupTagErrorExample.openAtCenter();
			return;
		}
		//this.editNoteSelectedTagNames += this.editNoteSelectedTagName+",";		
		this.$.tagsAddedEditInput.setValue(selTags+startswithStr);
		
		//this.editNoteSelectedTagNamesList.push(this.editNoteSelectedTagName);
	},
	searchNotesClicked: function() {
		var searchText = this.$.noteSearchTxt.getValue();
		if(searchText.length == 0) {
			this.$.errorExample.openAtCenter();
			return;
		}
		
		var filter = new NoteFilter();
		filter.setOrder(enyo.application.sortorder);
		filter.setAscendingFlag(enyo.application.ascendingflag);
		//Adding filter
		if(this.selectedNotebookRow == -1 || this.selectedNotebookRow == 0 ||
			(this.notebookdata[this.selectedNotebookRow].name == "All Notes")) {
			//All Notes selected
		} else {
			var selNotebook = this.notebookdata[this.selectedNotebookRow];
			filter.setNotebook(selNotebook.guid);
		}
		if(this.selectedTagRow != -1) {
			var selTag = this.tagsdata[this.selectedTagRow];
			filter.setQueryString('tag:"'+selTag.name+'"');
		}
		//Set Search Text filter
		filter.setSearchString(searchText);
		var self = this;
		var onSuccess3 = function(noteList, transport) {
			enyo.application.LastNoteNumDisplayed = enyo.application.notesPerPage;
			enyo.application.TotalNotes = noteList.totalNotes;
			self.findNotesResponse(noteList);			
			self.showNoteScrim(false);
			self.setDefaultNoteCount();				
		};
		var onFailure = function(transport) {
				//self.showErrorDialog("Failed to delete selected note");
				self.showAlertMessage.bind(self, "Failed to get Note list");
				self.showNoteScrim(false);
			};
		enyo.application.NoteStore.findNotes(onSuccess3,onFailure, filter,
									0, enyo.application.notesPerPage);
		self.showNoteScrim(true);
	},
	nextClicked: function() {
		//Check Total Notes & Last Note Displayed
		//If offset value is less than total notes, find next set of notes
		//Check whether Notebook and Tag are selected, if yes, apply filter appropriately
		//console.log("enyo.application.LastNoteNumDisplayed: "+enyo.application.LastNoteNumDisplayed);
		//console.log("enyo.application.TotalNotes: "+enyo.application.TotalNotes);
		if(enyo.application.LastNoteNumDisplayed >= enyo.application.TotalNotes) {
			return;
		}
		
		var filter = new NoteFilter();
		filter.setOrder(enyo.application.sortorder);
		filter.setAscendingFlag(enyo.application.ascendingflag);
		//Adding filter
		if(this.selectedNotebookRow == -1 || this.selectedNotebookRow == 0 ||
			(this.notebookdata[this.selectedNotebookRow].name == "All Notes")) {
			//All Notes selected
		} else {
			var selNotebook = this.notebookdata[this.selectedNotebookRow];
			filter.setNotebook(selNotebook.guid);
		}
		if(this.selectedTagRow != -1) {
			var selTag = this.tagsdata[this.selectedTagRow];
			filter.setQueryString('tag:"'+selTag.name+'"');
		}
		var searchText = this.$.noteSearchTxt.getValue();
		if(searchText.length != 0) {
			filter.setSearchString(searchText);
		}
		var self = this;
		var onSuccess3 = function(noteList, transport) {
			var updateStr = (enyo.application.LastNoteNumDisplayed+1)+"-";
			enyo.application.LastNoteNumDisplayed += enyo.application.notesPerPage;
			enyo.application.TotalNotes = noteList.totalNotes;
			self.findNotesResponse(noteList);
			self.showNoteScrim(false);
			//Update notes count			
			if(enyo.application.LastNoteNumDisplayed >= enyo.application.TotalNotes) {
				updateStr += enyo.application.TotalNotes;
			} else {
				updateStr += enyo.application.LastNoteNumDisplayed;
			}
			self.$.notescount.setCaption(updateStr);
		};
		var onFailure = function(transport) {
				//self.showErrorDialog("Failed to delete selected note");
				self.showAlertMessage.bind(self, "Failed to get Note list");
				self.showNoteScrim(false);
			};
		enyo.application.NoteStore.findNotes(onSuccess3,onFailure, filter,
									enyo.application.LastNoteNumDisplayed, enyo.application.notesPerPage);
		self.showNoteScrim(true);
	},
	previousClicked: function() {
		//console.log("previousClicked: "+enyo.application.LastNoteNumDisplayed);
		//Check Last Note Displayed
		//If offset value is equal to per page size, return
		//Check whether Notebook and Tag are selected, if yes, apply filter appropriately
		if(enyo.application.LastNoteNumDisplayed == enyo.application.notesPerPage) {
			return;
		}
		
		var filter = new NoteFilter();
		filter.setOrder(enyo.application.sortorder);
		filter.setAscendingFlag(enyo.application.ascendingflag);
		//Adding filter
		if(this.selectedNotebookRow == -1 || this.selectedNotebookRow == 0 ||
			(this.notebookdata[this.selectedNotebookRow].name == "All Notes")) {
			//All Notes selected
		} else {
			var selNotebook = this.notebookdata[this.selectedNotebookRow];
			filter.setNotebook(selNotebook.guid);
		}
		if(this.selectedTagRow != -1) {
			var selTag = this.tagsdata[this.selectedTagRow];
			filter.setQueryString('tag:"'+selTag.name+'"');
		}
		var searchText = this.$.noteSearchTxt.getValue();
		if(searchText.length != 0) {
			filter.setSearchString(searchText);
		}
		var self = this;
		var onSuccess3 = function(noteList, transport) {
			enyo.application.LastNoteNumDisplayed -= enyo.application.notesPerPage;
			enyo.application.TotalNotes = noteList.totalNotes;
			self.findNotesResponse(noteList);
			self.showNoteScrim(false);
			var updateStr = (enyo.application.LastNoteNumDisplayed - enyo.application.notesPerPage + 1)
								+"-"+ enyo.application.LastNoteNumDisplayed;
			self.$.notescount.setCaption(updateStr);
		};
		var onFailure = function(transport) {
				//self.showErrorDialog("Failed to delete selected note");
				self.showAlertMessage.bind(self, "Failed to get Note list");
				self.showNoteScrim(false);
			};
		enyo.application.NoteStore.findNotes(onSuccess3,onFailure, filter,
									(enyo.application.LastNoteNumDisplayed - (enyo.application.notesPerPage*2)), enyo.application.notesPerPage);
		self.showNoteScrim(true);
	},
	editNoteClicked: function() {
		//Check if note selected, else show error
		if(this.selectedNoteRow == -1
			|| ! this.notesdata[this.selectedNoteRow]) {
			this.showErrorDialog("Select a Note to Edit");
			return;
		}
		//If note selected, get note content 
		//console.log("##### current note content: "+this.currentNote.content);
		//Get Content, Title, Notebook, Tags
		var title = this.currentNote.title;
		var content = this.currentNote.content;
		var notebookGuid = this.currentNote.notebookGuid;
		var tagGuids = this.currentNote.tagGuids;
		//.sourceURL
		
		this.$.editNoteDialog.openAtCenter();
		
		var items = [];
		var tagitems = [];
		for (var j=0; j < this.notebookdata.length; j++)
		{
			if(this.notebookdata[j].name != "All Notes") {
				items.push({"caption": this.notebookdata[j].name, "value": this.notebookdata[j].guid});
			}
		}
		this.$.notebookEditListSelector.setItems( items );
		this.$.notebookEditListSelector.setValue(notebookGuid);
		
		this.tagEditGuidPosnMap = {};
	  
		for (var i=0; i < this.tagsdata.length; i++)
		{
			tagitems.push({"caption": this.tagsdata[i].name, "value": this.tagsdata[i].guid});
			this.tagEditGuidPosnMap[i] = this.tagsdata[i].guid;
		}
		if(this.tagsdata && this.tagsdata.length > 0) {
			this.$.tagEditSelector.setItems( tagitems );
			this.$.tagEditSelector.setValue(this.tagsdata[0].guid);		
		}
		var editNoteSelectedGuid = '';
		var editNoteSelectedTagName = '';
		this.editNoteSelectedTagNames = '';
		this.editNoteSelectedTagNamesList = [];
		
		//console.log("tagGuids: "+JSON.stringify(tagGuids));
		for (var i=0; tagGuids !== null && i < tagGuids.list.length; i++)
		{
			editNoteSelectedTagName = this.tagGuidMap[tagGuids.list[i]];
			this.editNoteSelectedTagNames += editNoteSelectedTagName+",";		
			this.editNoteSelectedTagNamesList.push(editNoteSelectedTagName);
		}
		if(this.editNoteSelectedTagNames.length > 0)
			this.$.tagsAddedEditInput.setValue(this.editNoteSelectedTagNames);
		
		this.$.editTitleInput.setValue(title);
		var formattedContent = this.getFormattedEditContent(content);
		//console.log("editNoteClicked: formattedContent: "+formattedContent);
		this.$.composeScroller1.setScrollTop(0);
		this.$.composeScroller1.setScrollLeft(0);
		this.$.editNoteBodyInput.setValue(formattedContent);		
	},
	getFormattedEditContent: function(body) {
		var formattedContent = body;
		this.cryptContentTagsMap = {};
		var startIndex = body.indexOf('<en-note');
		formattedContent = body.substring(startIndex);
		var ennotePatt=/<en-note/g;
		var ennoteMatch = formattedContent.match(ennotePatt);
		if(ennoteMatch && ennoteMatch.length >= 1) {
				//console.log("ennoteMatch: "+ennoteMatch.length)
				var newContent = '';
				var tempContent = formattedContent;
				for(var i = 0; i < ennoteMatch.length; i++) {
					var startIndex = tempContent.indexOf('<en-note');
					var initContent = tempContent.substring(0,startIndex);
					newContent += initContent ;
					var remainingContent = tempContent.substring(startIndex);
					var endChar = remainingContent.indexOf('>');
					var firstNoteContent = remainingContent.substring(0,endChar);
					newContent += '';
					var nextContent = remainingContent.substring(endChar+1);
					tempContent = nextContent;
				}
				if(tempContent.length > 0)
					newContent += tempContent;
				formattedContent = newContent.replace(/<\/en-note>/g,'');
		}
		
		formattedContent = formattedContent.replace(/<en-todo checked="true"><\/en-todo>/g,"[x]");
		formattedContent = formattedContent.replace(/<en-todo checked='true'><\/en-todo>/g,"[x]");
		formattedContent = formattedContent.replace(/<en-todo><\/en-todo>/g,"[]");
		
		var encrPatt=/<en-crypt/g;
		var encrMatch = formattedContent.match(encrPatt);
		if(encrMatch && encrMatch.length >= 1) {
				//console.log("div Scenario: "+encrMatch.length)
				var newContent = '';
				var tempContent = formattedContent;
				for(var i = 0; i < encrMatch.length; i++) {
					var startIndex = tempContent.indexOf('<en-crypt');
					var initContent = tempContent.substring(0,startIndex);
					newContent += initContent ;
					//console.log("initContent: "+initContent);
					var remainingContent = tempContent.substring(startIndex);
					//console.log("remainingContent: "+remainingContent);
					var endChar = remainingContent.indexOf('>');
					var firstEncrContent = remainingContent.substring(0,endChar);
					var cryptContentTags = firstEncrContent+">";
					formattedContent = newContent.replace(/'/g,'');
					//console.log("firstEncrContent: "+firstEncrContent);
					var cryptContentKey = "[en-crypt-content"+i+"]";
					newContent += cryptContentKey;
					var nextContent = remainingContent.substring(endChar+1);
					//console.log("nextContent: "+nextContent);
					
					var encEndIndex = nextContent.indexOf('</en-crypt>');
					var encrContent = nextContent.substring(0,encEndIndex);
					cryptContentTags += encrContent+"</en-crypt>";
					this.cryptContentTagsMap[cryptContentKey] = cryptContentTags;
					//console.log("encrContent: "+encrContent);
					enyo.application.encrContentMap[i] = encrContent;
					nextContent = nextContent.substring(encEndIndex+11);
					//console.log("finalNextContent: "+nextContent);
					
					tempContent = nextContent;
				}
				if(tempContent.length > 0)
					newContent += tempContent;
				formattedContent = newContent;
				//console.log("newContent updated: "+newContent);
		}
		//console.log("this.cryptContentTagsMap: "+JSON.stringify(this.cryptContentTagsMap));
		return formattedContent;
	},
	getFormattedViewContent: function(body) {
		var formattedContent = body;
		enyo.application.encrContentMap = {};
		formattedContent = formattedContent.replace(/<en-todo checked="true"><\/en-todo>/g,this.checkedImage+" ");
		formattedContent = formattedContent.replace(/<en-todo checked='true'><\/en-todo>/g,this.checkedImage+" ");
		formattedContent = formattedContent.replace(/<en-todo><\/en-todo>/g,this.uncheckedImage+" ");
		//var testFormattedContent = formattedContent;
		var encrPatt=/<en-crypt/g;
		var encrMatch = formattedContent.match(encrPatt);
		if(encrMatch && encrMatch.length >= 1) {
				//console.log("div Scenario: "+encrMatch.length)
				var newContent = '';
				var tempContent = formattedContent;
				for(var i = 0; i < encrMatch.length; i++) {
					var startIndex = tempContent.indexOf('<en-crypt');
					var initContent = tempContent.substring(0,startIndex);
					newContent += initContent ;
					//console.log("initContent: "+initContent);
					var remainingContent = tempContent.substring(startIndex);
					//console.log("remainingContent: "+remainingContent);
					var endChar = remainingContent.indexOf('>');
					var firstEncrContent = remainingContent.substring(0,endChar);
					formattedContent = newContent.replace(/'/g,'');
					//console.log("firstEncrContent: "+firstEncrContent);
					newContent += "<button type='button' class='encr-button' onClick='new com.petzapps.EvernoteContent().buttonClicked("+i+")'><img src='images/lock-password.png' alt=''/></button>";
					var nextContent = remainingContent.substring(endChar+1);
					//console.log("nextContent: "+nextContent);
					
					var encEndIndex = nextContent.indexOf('</en-crypt>');
					var encrContent = nextContent.substring(0,encEndIndex);
					//console.log("encrContent: "+encrContent);
					enyo.application.encrContentMap[i] = encrContent;
					nextContent = nextContent.substring(encEndIndex+11);
					//console.log("finalNextContent: "+nextContent);
					
					tempContent = nextContent;
				}
				if(tempContent.length > 0)
					newContent += tempContent;
				formattedContent = newContent;
				//console.log("newContent updated: "+newContent);
		}
		return formattedContent;
	},
	buttonClicked: function(value) {
		//console.log("Button Clicked: "+enyo.application.encrContentMap[value]);
		this.currentPasscodeContent = enyo.application.encrContentMap[value];
		this.$.passwordDialog.openAtCenter();
	},
	emailFileClicked: function() {
		//var user = enyo.application.currentUser;
		//var email = user.attributes.incomingEmailAddress + "@m.evernote.com";
		
		//this.$.emailFile.call({"target" : "mailto: "+email});
		var params =  {
			"summary":"",
			"text":"", 
			"recipients":[{"type": "email",
				"contactDisplay":"Evernote", 
				"role":1}]
		};
		this.$.emailFile.call({"id": "com.palm.app.email", "params":params});
	},
	emailFileSuccess : function(inSender, inResponse) {
		//this.$.resourceview.setContent(enyo.fetchAppRootPath()+'images/fileopened.png');
	},
	emailFileFailure : function(inSender, inResponse) {
		//console.log("Faile to send File: "+enyo.json.stringify(inResponse));
		//this.$.resourceview.setContent(enyo.fetchAppRootPath()+'images/fileopenfail.png');
	},
	sendEmailClicked: function() {
		var emailIds = this.$.titleInput2.getValue();
		var message = '';
		if(emailIds.length == 0) {
			this.showErrorDialog("Email Id cannot be blank");
			return;
		}
		if(this.$.emailNoteBodyInput.getValue()) {
			message = this.$.emailNoteBodyInput.getValue();
		}
		var guid = this.currentNote.guid;
		var emailList = [];
		var selEmailList = [];
		emailList = emailIds.split(',');
		for (var i=0; i < emailList.length; i++)
		{
			if(emailList[i].length > 0) {
				selEmailList.push(emailList[i]);
				//console.log("email ids: "+emailList[i]);
			}
		}
		var noteEmailParams = new NoteEmailParameters();
		noteEmailParams.toAddresses = { javaClass: "java.util.ArrayList", list: selEmailList  };
		noteEmailParams.guid = guid;
		var formattedMessage = message.replace(/"/g,'\'');
		noteEmailParams.message = formattedMessage;
		
		var self = this;
		var onSuccess = function(note, transport) {
				enyo.windows.addBannerMessage($L("Note e-mailed successfully"),"{}");
				//Set blank for all input fields.
				self.resetEmailNoteData();
				self.$.emailNoteDialog.close();				
			};
		var onFailure = function(transport) {
				//console.log("createNote failure: "+JSON.stringify(transport));
				self.showErrorDialog("Failed to send Note, check e-mail id");
				self.$.saveButton2.setDisabled(false);
				self.$.saveButton2.setActive(false);
			};
		enyo.application.NoteStore.emailNote(onSuccess,onFailure, noteEmailParams);
		this.$.saveButton2.setDisabled(true);
		this.$.saveButton2.setActive(true);
	},
	emailNoteClicked: function() {
		//Check if note selected, else show error
		if(this.selectedNoteRow == -1
			|| ! this.notesdata[this.selectedNoteRow]) {
			this.showErrorDialog("Select a Note to Share by E-mail");
			return;
		}
		this.$.emailNoteDialog.openAtCenter();		
	},
	addNoteClicked: function() {
      this.$.addNoteDialog.openAtCenter();
	  var items = [];
	  var tagitems = [];
	  var defaultNotebookGuid = '';
	  for (var j=0; j < this.notebookdata.length; j++)
	  {
		if(this.notebookdata[j].name != "All Notes") {
			items.push({"caption": this.notebookdata[j].name, "value": this.notebookdata[j].guid});
			if(this.notebookdata[j].defaultNotebook != 'undefined'
					&& this.notebookdata[j].defaultNotebook) {
				defaultNotebookGuid = this.notebookdata[j].guid;
			}
		}
	  }
	  this.$.notebookListSelector.setItems( items );
	  this.$.notebookListSelector.setValue(defaultNotebookGuid);
	  
	  this.tagGuidPosnMap = {};
	  
	  for (var i=0; i < this.tagsdata.length; i++)
	  {
		tagitems.push({"caption": this.tagsdata[i].name, "value": this.tagsdata[i].guid});
		this.tagGuidPosnMap[i] = this.tagsdata[i].guid;
	  }
	  if(this.tagsdata && this.tagsdata.length > 0) {
		this.$.tagSelector.setItems( tagitems );
		this.$.tagSelector.setValue(this.tagsdata[0].guid);
	  }	  
	  this.$.composeScroller.setScrollTop(0);
	  this.$.composeScroller.setScrollLeft(0);
	  this.resetAddNoteData();
	},
	resetAddNoteData: function() {
		this.$.titleInput.setValue("");
		this.$.tagsAddedInput.setValue("");
		this.$.addNoteBodyInput.setValue("");
		this.addNoteSelectedTagNames = "";
		//this.addNoteSelectedTagGuids = [];
		this.addNoteSelectedTagNamesList = [];
		this.$.saveButton.setDisabled(false);
		this.$.saveButton.setActive(false);
	},
	resetEditNoteData: function() {
		this.$.editTitleInput.setValue("");
		this.$.tagsAddedEditInput.setValue("");
		this.$.editNoteBodyInput.setValue("");
		this.editNoteSelectedTagNames = "";
		//this.editNoteSelectedTagGuids = [];
		this.editNoteSelectedTagNamesList = [];
		this.$.editSaveButton.setDisabled(false);
		this.$.editSaveButton.setActive(false);
	},
	resetEmailNoteData: function() {
		this.$.titleInput2.setValue("");
		this.$.emailNoteBodyInput.setValue("");
		this.$.saveButton2.setDisabled(false);
		this.$.saveButton2.setActive(false);
	},
	onCancelClick: function() {
		//Set blank for all input fields.
		this.resetAddNoteData();
		this.$.addNoteDialog.close();		
	},
	onCancelEmailClick: function() {
		//Set blank for all input fields.
		this.resetEmailNoteData();
		this.$.emailNoteDialog.close();		
	},
	onCancelEditClick: function() {
		this.resetEditNoteData();
		this.$.editNoteDialog.close();
	},
	saveEditClicked: function() {
		
		//Get the Note field values
		var title = this.$.editTitleInput.getValue();
		var body = this.$.editNoteBodyInput.getValue();
		var notebook = this.$.notebookEditListSelector.getValue();
		//console.log("title: "+title+" notebook: "+this.notebookGuidMap[notebook]);
		
		if(title.length == 0) {
			this.$.emptyTitleErrorExample.openAtCenter();
			return;
		}
		//console.log("BEFORE formattedContent: "+body);
		var formattedContent = this.getFormattedContent(body);
		//console.log("SAVE formattedContent: "+formattedContent);
		//console.log("tagSelected : "+JSON.stringify(this.tagGuidMap));
		var formattedTitle = title.replace(/"/g,'\'');
		var noteContent = new Note();
		noteContent.initialize(this.currentNote.guid,formattedTitle,notebook,formattedContent);
		noteContent.created = this.currentNote.created;
		var tags = [];
		var selTags = [];
		if(this.$.tagsAddedEditInput.getValue().length > 0)
		{
			tags = this.$.tagsAddedEditInput.getValue().split(',');
			for (var i=0; i < tags.length; i++)
			{
				if(tags[i].length > 0) {
					selTags.push(tags[i]);
				}
			}
		}
		//noteContent.tagNames = { javaClass: "java.util.ArrayList", list: this.editNoteSelectedTagNamesList  };
		noteContent.tagNames = { javaClass: "java.util.ArrayList", list: selTags  };
		var self = this;
		var onSuccess = function(note, transport) {
				enyo.windows.addBannerMessage($L("Note updated successfully"),"{}");
				//Set blank for all input fields.
				self.resetEditNoteData();
				self.$.editNoteDialog.close();
				//Refresh Tag / Notebook Counts
				self.reloadTagNotebookCounts();
				
			};
		var onFailure = function(transport) {
				//console.log("createNote failure: "+JSON.stringify(transport));
				self.showErrorDialog("Failed to update a Note");
				self.$.editSaveButton.setDisabled(false);
				self.$.editSaveButton.setActive(false);
			};
		enyo.application.NoteStore.updateNote(onSuccess,onFailure, noteContent.toSubmittable());
		this.$.editSaveButton.setDisabled(true);
		this.$.editSaveButton.setActive(true);
	},
	reloadTagNotebookCounts: function() {
		var self = this;
		var success = function(response, transport) {
			self.tagNotebookCountsSuccess(response,transport);			
		};
		
		var filter = new NoteFilter();
		enyo.application.NoteStore.findNoteCounts(success, this.showAlertMessage.bind(this, "Failed to find Note Counts"), filter);
		
	},
	tagNotebookCountsSuccess: function(response, transport) {
		if(response.notebookCounts && response.notebookCounts.map)
			AppUtils.convertMapToObject(JSON.stringify(response.notebookCounts.map),"NOTEBOOK");
		if(response.tagCounts && response.tagCounts.map)
			AppUtils.convertMapToObject(JSON.stringify(response.tagCounts.map),"TAG");
		//Load Notebooks with counts
		this.listNotebooks();
		//Load Tags with counts
		var self = this;
		var success2 = function(response) {
			self.listTagsResponse(response);
			self.showTagScrim(false);
			//Refresh Note Content
			self.getNoteReuse(self.currentNote);
		};
		var onFailure = function(transport) {
			//self.showErrorDialog("Failed to delete selected note");
			self.showAlertMessage.bind(self, "Failed to list Tags");
			self.showTagScrim(false);
		};
		enyo.application.NoteStore.listTags(success2, onFailure, true);
		self.showTagScrim(true);
	},
	saveClicked: function() {
		
		//Get the Note field values
		var title = this.$.titleInput.getValue();
		var body = this.$.addNoteBodyInput.getValue();
		var notebook = this.$.notebookListSelector.getValue();
		//console.log("title: "+title+" notebook: "+this.notebookGuidMap[notebook]);
		
		if(title.length == 0) {
			this.$.emptyTitleErrorExample.openAtCenter();
			return;
		}
		var formattedContent = this.getFormattedContent(body);
		//console.log("formattedContent: "+formattedContent);
		var formattedTitle = title.replace(/"/g,'\'');
		var noteContent = new Note();
		noteContent.initialize(null,formattedTitle,notebook,formattedContent);
		var tags = [];
		var selTags = [];
		if(this.$.tagsAddedInput.getValue().length > 0)
		{
			tags = this.$.tagsAddedInput.getValue().split(',');
			for (var i=0; i < tags.length; i++)
			{
				if(tags[i].length > 0) {
					selTags.push(tags[i]);
				}
			}
		}
		//noteContent.tagNames = { javaClass: "java.util.ArrayList", list: this.addNoteSelectedTagNamesList  };
		noteContent.tagNames = { javaClass: "java.util.ArrayList", list: selTags  };
		var self = this;
		var onSuccess = function(note, transport) {
				//console.log("createNote success: "+JSON.stringify(note));
				enyo.windows.addBannerMessage($L("Note created successfully"),"{}");
				//Set blank for all input fields.
				self.resetAddNoteData();
				self.$.addNoteDialog.close();
				//Set black for search field
				self.$.noteSearchTxt.setValue("");
				//Refresh Notes
				self.refreshNotesData();
			};
		var onFailure = function(note, transport) {
				self.showErrorDialog("Failed to create a new Note");
				self.$.saveButton.setDisabled(false);
				self.$.saveButton.setActive(false);
			};
		enyo.application.NoteStore.createNote(onSuccess,onFailure, noteContent.toSubmittable());
		this.$.saveButton.setDisabled(true);
		this.$.saveButton.setActive(true);
	},
	refreshNotesData: function() {
		var self = this;
		var success = function(response, transport) {
			//console.log("findNoteCountsSuccess: "+JSON.stringify(response));
			self.findNoteCountsSuccess(response,transport);			
		};
		var filter = new NoteFilter();
		enyo.application.NoteStore.findNoteCounts(success, this.showAlertMessage.bind(this, "Failed to find Note Counts"), filter);
		
	},
	reloadNotes: function() {
		try{
			var self = this;
			var onSuccess5 = function(noteList, transport) {
				//console.log("findNotes success: "+JSON.stringify(transport));
				enyo.application.LastNoteNumDisplayed = enyo.application.notesPerPage;
				enyo.application.TotalNotes = noteList.totalNotes;
				self.findNotesResponse(noteList);			
				self.showNoteScrim(false);
				self.setDefaultNoteCount();				
			};
			//Add Fileter based on user preferred sort order
			var filter = new NoteFilter();
			//console.log("sortorder "+enyo.application.sortorder+" ascendingflag "+enyo.application.ascendingflag);
			filter.setOrder(enyo.application.sortorder);
			filter.setAscendingFlag(enyo.application.ascendingflag);
			//Adding filter
			if(this.selectedNotebookRow == -1 || this.selectedNotebookRow == 0 ||
				(this.notebookdata[this.selectedNotebookRow].name == "All Notes")) {
				//All Notes selected
			} else {
				var selNotebook = this.notebookdata[this.selectedNotebookRow];
				filter.setNotebook(selNotebook.guid);
			}
			if(this.selectedTagRow != -1) {
				var selTag = this.tagsdata[this.selectedTagRow];
				filter.setQueryString('tag:"'+selTag.name+'"');
			}
			var onFailure = function(transport) {
					//self.showErrorDialog("Failed to delete selected note");
					self.showAlertMessage.bind(self, "Failed to get Note list");
					self.showNoteScrim(false);
				};
			enyo.application.NoteStore.findNotes(onSuccess5,onFailure, filter,
										0, enyo.application.notesPerPage);
			self.showNoteScrim(true);
		}catch(e) {
			console.error("Error"+e);
		}
	},
	findNoteCountsSuccess: function(response, transport) {
		if(response.notebookCounts && response.notebookCounts.map)
			AppUtils.convertMapToObject(JSON.stringify(response.notebookCounts.map),"NOTEBOOK");
		if(response.tagCounts && response.tagCounts.map)
			AppUtils.convertMapToObject(JSON.stringify(response.tagCounts.map),"TAG");
		
		enyo.application.notebookCountsSize = AppUtils.getTotalNotes();
		//Load Notebooks with counts
		this.listNotebooks();
		//Load Tags with counts
		this.listTags();
		//Load Notes
		this.reloadNotes();
	},
	getFormattedContent: function(body) {
		var formattedContent = '';
		
		if(body.indexOf("<en-note") == -1) {
			formattedContent = "<?xml version='1.0' encoding='UTF-8'?>";
			formattedContent += "<!DOCTYPE en-note SYSTEM 'http://xml.evernote.com/pub/enml2.dtd'>";
			formattedContent += "<en-note>" + body;
			formattedContent += "</en-note>";
		} else {
			formattedContent = "<?xml version='1.0' encoding='UTF-8'?>";
			formattedContent += "<!DOCTYPE en-note SYSTEM 'http://xml.evernote.com/pub/enml2.dtd'>";
			formattedContent += body;
		}
		//console.log("Before Formatting: "+formattedContent);
		formattedContent = formattedContent.replace(/<br>/g,'<br/>');
		formattedContent = formattedContent.replace(/<br clear="none">/g,'<br clear=\'none\'/>');
		if(this.cryptContentTagsMap) {
			for (var tag in this.cryptContentTagsMap) {
				formattedContent = formattedContent.replace(tag,this.cryptContentTagsMap[tag]);
			}
			//console.log("formattedContent en-crypt updated: "+formattedContent);
		}
		
		formattedContent = formattedContent.replace(/"/g,'\'');
		//formattedContent = formattedContent.replace(/\n/g,'<br/>');
		formattedContent = formattedContent.replace(/\n/g,'');
		formattedContent = formattedContent.replace(/\[x\]/g,"<en-todo checked='true'><\/en-todo>");
		formattedContent = formattedContent.replace(/\[X\]/g,"<en-todo checked='true'><\/en-todo>");
		formattedContent = formattedContent.replace(/\[\]/g,"<en-todo><\/en-todo>");
		
		var enmediaPatt=/<en-media/g;
		var match = formattedContent.match(enmediaPatt);
		
		if(match && match.length > 1) {
				//console.log("Multiple Attachments Scenario: "+match.length)
				var newContent = '';
				var tempContent = formattedContent;
				for(var i = 0; i < match.length; i++) {
					var startIndex = tempContent.indexOf('<en-media');
					var initContent = tempContent.substring(0,startIndex);
					newContent += initContent ;
					//console.log("initContent: "+initContent);
					var remainingContent = tempContent.substring(startIndex);
					//console.log("remainingContent: "+remainingContent);
					var endChar = remainingContent.indexOf('>');
					var firstMediaContent = remainingContent.substring(0,endChar);
					//console.log("firstMediaContent: "+firstMediaContent);
					newContent += firstMediaContent + '/>';
					var nextContent = remainingContent.substring(endChar+1);
					//console.log("nextContent: "+nextContent);
					tempContent = nextContent;
				}
				if(tempContent.length > 0)
					newContent += tempContent;
				//console.log("newContent: "+newContent);
				formattedContent = newContent.replace(/<\/en-media>/g,'');
				//console.log("newContent updated: "+newContent);
		}
		
		var imgPatt=/<img/g;
		var imgMatch = formattedContent.match(imgPatt);
		if(imgMatch && imgMatch.length >= 1) {
				//console.log("IMG Scenario: "+imgMatch.length)
				var newContent = '';
				var tempContent = formattedContent;
				for(var i = 0; i < imgMatch.length; i++) {
					var startIndex = tempContent.indexOf('<img');
					var initContent = tempContent.substring(0,startIndex);
					newContent += initContent ;
					//console.log("initContent: "+initContent);
					var remainingContent = tempContent.substring(startIndex);
					//console.log("remainingContent: "+remainingContent);
					var endChar = remainingContent.indexOf('>');
					var firstImageContent = remainingContent.substring(0,endChar);
					//formattedContent = newContent.replace(/'/g,'');
					//console.log("firstImageContent: "+firstImageContent);
					newContent += firstImageContent + '></img>';
					var nextContent = remainingContent.substring(endChar+1);
					//console.log("nextContent: "+nextContent);
					tempContent = nextContent;
				}
				if(tempContent.length > 0)
					newContent += tempContent;
				//console.log("newContent: "+newContent);
				formattedContent = newContent;
				//console.log("newContent updated: "+newContent);
		}
		
		var divPatt=/<div/g;
		var divMatch = formattedContent.match(divPatt);
		if(divMatch && divMatch.length >= 1) {
				//console.log("div Scenario: "+divMatch.length)
				var newContent = '';
				var tempContent = formattedContent;
				//Replacing just first DIV
				for(var i = 0; i < (divMatch.length - (divMatch.length-1)); i++) {
					var startIndex = tempContent.indexOf('<div');
					var initContent = tempContent.substring(0,startIndex);
					newContent += initContent ;
					//console.log("initContent: "+initContent);
					var remainingContent = tempContent.substring(startIndex);
					//console.log("remainingContent: "+remainingContent);
					var endChar = remainingContent.indexOf('>');
					var firstDivContent = remainingContent.substring(0,endChar);
					//formattedContent = newContent.replace(/'/g,'');
					//console.log("firstDIVContent: "+firstDivContent);
					newContent += '<div>';
					var nextContent = remainingContent.substring(endChar+1);
					//console.log("nextContent: "+nextContent);
					tempContent = nextContent;
				}
				if(tempContent.length > 0)
					newContent += tempContent;
				//console.log("newContent: "+newContent);
				formattedContent = newContent;
				//console.log("newContent updated: "+newContent);
		}
				
		return formattedContent;
	},
	inputChange: function(source, event) {
		if (event.keyCode == 13) {
			this.searchNotesClicked();
		}
	},
	create: function() {
		this.inherited(arguments);
	},
	showNotebookScrim: function(inShowing) {
		this.$.notebookScrim.setShowing(inShowing);
		this.$.notebookSpinner.setShowing(inShowing);
	},
	showTagScrim: function(inShowing) {
		this.$.tagScrim.setShowing(inShowing);
		this.$.tagSpinner.setShowing(inShowing);
	},
	showNoteScrim: function(inShowing) {
		this.$.noteScrim.setShowing(inShowing);
		this.$.noteSpinner.setShowing(inShowing);
	},
	showAttachmentScrim: function(inShowing) {
		this.$.attachViewSpinner.setShowing(inShowing);
	},
	showTPAttachmentScrim: function(inShowing) {
		this.$.TPattachViewSpinner.setShowing(inShowing);
	},
	ready : function()
	{
		//this.deleteOldData();
		this.selectedNoteRow = -1;
		this.selectedNotebookRow = -1;
		this.selectedTagRow = -1;
		this.showNotebookScrim(true);
		this.showTagScrim(true);
		this.showNoteScrim(true);
		this.detailShowed = false;
		this.tagsShowed = true;
		this.notebooksShowed = true;
		this.$.notedetail.hide();
		this.createTables();
		enyo.application.formatter = new SimpleDateFormat("MMM d, yyyy h:mm a");
		this.checkedImage = "<img src='images/checkbox_checked.gif' width='16px' height='16px' />";
		this.uncheckedImage = "<img src='images/checkbox.jpg' width='16px' height='16px' />";
		//var paramString = window.PalmSystem && PalmSystem.launchParams || "{}";
		//var params = JSON.parse(paramString);
		//console.log("params: "+JSON.stringify(Object.keys(params)));
		//console.log("paramString: "+paramString.length);
		this.deviceInfo = enyo.fetchDeviceInfo();
		this.deviceName = "TOUCHPAD";
		//console.log("width: "+this.deviceInfo.screenWidth);
		if(this.deviceInfo.screenWidth == 1024) {
			this.deviceName = "TOUCHPAD";
		} else if (this.deviceInfo.screenWidth == 480) {
			this.deviceName = "PRE3";
		} else if (this.deviceInfo.screenWidth == 320) {
			this.deviceName = "PRE2";
		}
		//console.log("Device Name: "+this.deviceInfo.modelNameAscii);
		this.$.db.query('SELECT * FROM preferences',
								{onSuccess: this.loadPrefInitData.bind(this)});
		
	},
	getDBInstance: function() {
		return this.$.db;
	},
	storeLoginInfo: function(username, password) {
		//console.log("storeLoginInfo: password: "+password+" encoded: "+encoded);
		//Delete, if already exists
		var deletedb = this.$.db.getDelete("user_login",{"username":username});
		this.$.db.query(deletedb, {onSuccess: this.deleteOldUserInfoSuccess.bind(this,username,password)});	
		
	},
	deleteOldUserInfoSuccess : function(username,password) {
		//var base64 = new Base64();
		//var encoded = base64.encode(password);
		var enc = new Encryptor();
		var encoded = enc.encrypt(password,Evernote.application.enc_salt);
		
		//Add record
		var adddb = [];
		adddb[0] = this.$.db.getInsert("user_login",
					{"username": username,"password": encoded});					
		
		this.$.db.queries(adddb, {onSuccess: this.storeAuthTokenResponse.bind(this)});
	},
	storeAuthTokenResponse : function() {
		//console.log("######## Auth Token Data Inserted");
	},
	loadPrefInitData: function(results) {
		var dummydata;
		var adddb = [];
		var addsitedb = [];
		if(results.length == 0) {
			//console.log("Load pref init data");
			try {
				for (var i = 0; i < enyo.application.preferencedata.length; i++) {
				adddb[i] = this.$.db.getInsert("preferences",
							{"pref_type": enyo.application.preferencedata[i].pref_type,
							 "pref_value": enyo.application.preferencedata[i].pref_value});					
				}
				this.$.db.queries(adddb, {onSuccess: this.loadPrefInitDataResponse.bind(this)});
				enyo.application.notesSortOrder = enyo.application.preferencedata[0].pref_value;
				enyo.application.isLoggedIn = enyo.application.preferencedata[1].pref_value;
				enyo.application.notesPerPage = parseInt(enyo.application.preferencedata[2].pref_value);
			}
			catch (e)
			{
				console.error("Error"+e);
			}
		} else {
			//console.log("Load pref DB data");
			enyo.application.notesSortOrder = results[0].pref_value;
			enyo.application.isLoggedIn = results[1].pref_value;
			enyo.application.notesPerPage = parseInt(results[2].pref_value);
		}
		AppUtils.setSortingOrder(enyo.application.notesSortOrder);
		//console.log("notesSortOrder: "+enyo.application.notesSortOrder+" isLoggedIn: "+enyo.application.isLoggedIn+" notes per pasge: "+enyo.application.notesPerPage);
	},
	getIsLoggedIn : function() {
		return this.isLoggedIn;
	},
	setIsLoggedIn : function(value) {
		this.isLoggedIn = value;
	},
	loadPrefInitDataResponse : function() {
		//console.log("######## Preferences Data Inserted");
	},
	findNotesResponse : function(noteList)
	{
		//console.log("findNotesResponse: "+noteList.notes.list.length);
		var list = [];
	    for (var i = 0; i < noteList.notes.list.length; i++) {
		  list[i] = noteList.notes.list[i];
		}
		this.notesdata = list; //set list to data		
		this.selectedNoteRow = -1;
		this.$.notelist.punt();
	},
	setupNoteRow : function(inSender, inIndex)
	{
		if(this.notesdata) {
			var record = this.notesdata[inIndex]; //set data arry values to record
			if (record) {
			  //console.log("setupNoteRow guid: "+record.guid+" name: "+record.title);
			  this.$.noteVal.setContent(record.title);
			  var created = new Date(record.created);
			  var curr_date = created.getDate();
			  var curr_month = created.getMonth();
			  curr_month++;
			  var curr_year = created.getFullYear();
			  var crDateTimeStr = curr_month + "/" + curr_date + "/" + curr_year;
			  var updated = new Date(record.updated);
			  curr_date = updated.getDate();
			  curr_month = updated.getMonth();
			  curr_month++;
			  curr_year = updated.getFullYear();
			  var upDateTimeStr = curr_month + "/" + curr_date + "/" + curr_year;
			  var dateTimeStr = "Modified: "+upDateTimeStr+" Created: "+crDateTimeStr;
			  this.$.noteCreateDate.setContent(dateTimeStr);
			  if( inIndex % 2 == 0)
					this.$.noteItem.applyStyle("background-color", "#eee");
			  else
					this.$.noteItem.applyStyle("background-color", "white");
			  var isRowSelected = (inIndex == this.selectedNoteRow);
			  if (isRowSelected) {
				this.$.noteItem.applyStyle("background-color", "#A0CFEC");
				this.$.noteItem.applyStyle("font-weight", "bold");
			  } else {
				this.$.noteItem.applyStyle("font-weight", null);
			  }
			  return true;
			}
		}
	},
	noteSelected: function(inSender, inEvent) {
		var record = this.notesdata[inEvent.rowIndex]; 
		//var dummydata;
		//this.$.notedetail.show();
		this.selectedNoteRow = inEvent.rowIndex;
		if (record) {
			this.getNoteReuse(record);
		}
		this.$.notelist.refresh();
	},
	getNoteReuse: function(record) {
		//console.log("noteSelected called: "+record.guid);
		var position = this.$.notelist.$.scroller.$.scroll.y;
		this.$.notelist.refresh();
		//this.scrollToIndex(inEvent.rowIndex);
		this.$.notelist.$.scroller.$.scroll.setScrollPosition(position);
		//Get Note Content
		var self = this;
		var onSuccess = function(note, transport) {
			self.getNoteSuccess(note, transport);
			if(self.deviceName.indexOf("PRE3") != -1
				&& (enyo.getWindowOrientation() == "up"
					|| enyo.getWindowOrientation() == "down")) {
				self.$.slidingPane.selectView(self.$.right);
			} else if(self.deviceName.indexOf("PRE2") != -1) {
				self.$.slidingPane.selectView(self.$.right);
			}
		};
		enyo.application.NoteStore.getNote(onSuccess,this.showAlertMessage.bind(this, "Failed to get note content"),
									record.guid,true);
		if(this.deviceName.indexOf("PRE3") != -1
			|| this.deviceName.indexOf("PRE2") != -1) {
			this.$.preWebViewSpinner.show();
		}else {
			this.$.webViewSpinner.show();
		}
		this.$.slidingPane.selectView(this.$.middle);
	},
	getNoteSuccess: function(note, transport) {
		//console.log("getNote success: content: "+JSON.stringify(note));
		//console.log("getNote success: note created: "+noteList.created+" updated: "+noteList.updated);
		var items = [];
		this.noteResourcesMap = {};
		this.resourceGuidPosnMap = {};
		var mime;
		//var image = "images/compose-attach-icon.png";
		this.currentNote = note;
		var tagGuids = note.tagGuids;
		var tagNames = '';
		var srcUrl = note.attributes.sourceURL;
		var nullAttachCounter = 1;
		var attachName = '';
		var nullExt = '';
		//console.log("srcURL: "+srcUrl);
		if(srcUrl) {
			var formattedSrcUrl = "<a href='"+srcUrl+"'>"+srcUrl+"</a>";
			this.$.noteUrlVal.setContent(formattedSrcUrl);
		} else {
			this.$.noteUrlVal.setContent('');
		}
		this.$.noteTitle.setContent(note.title);
		this.$.createdVal.setContent(enyo.application.formatter.format(new Date(note.created)));
		this.$.updatedVal.setContent(enyo.application.formatter.format(new Date(note.updated)));
		//console.log("tagGuids.list.length: "+tagGuids.list.length);
		for (var i=0; tagGuids !== null && i < tagGuids.list.length; i++)
		{
			editNoteSelectedTagName = this.tagGuidMap[tagGuids.list[i]];
			tagNames += editNoteSelectedTagName+", ";
		}
		this.$.tagsVal.setContent(tagNames);
		
		var formattedViewContent = this.getFormattedViewContent(note.content);
		//console.log("formattedViewContent: "+formattedViewContent);
		//this.$.contentScroller.scrollTo(0, 0);
		this.$.contentScroller.setScrollTop(0);
		this.$.contentScroller.setScrollLeft(0);
		this.$.notecontent.setContent(formattedViewContent);
		try {
			if(note.resources) {
				for (var i = 0; i < note.resources.list.length; i++) {
					var resource = note.resources.list[i];
					//console.log("resource details: guid: "+resource.guid+" : "+resource.height+" : "+resource.width+" : "+resource.mime);
					//console.log("Attributes: name: "+resource.attributes.fileName+" size: "+resource.data.size+" : "+resource.mime);
					mime = resource.mime;
					if(mime.indexOf("image/") != -1) {
						nullExt = mime.substring(mime.indexOf("/")+1);
					} else if(mime.indexOf("application/pdf") != -1) {
						nullExt = "pdf";
					} else if(mime.indexOf("text/plain") != -1) {
						nullExt = "txt";
					}
					attachName = resource.attributes.fileName;
					if(attachName == null) {
						if(this.deviceName.indexOf("PRE3") != -1
							|| this.deviceName.indexOf("PRE2") != -1) {
							attachName = (new Date()).getTime()+"."+nullExt;
						} else {
							attachName = "Attachment-"+nullAttachCounter+"."+nullExt;
						}						
						nullAttachCounter += 1;
					}
					//Download Image
					this.downloadThumbImageFile(resource.guid);
					items.push({"icon": "file:///media/internal/evernotewebos/"+resource.guid+".jpg","caption": attachName+" ("+(resource.data.size / 1024).toFixed(2) +" KB)",
							"value": resource.guid,"style":"font-size:15px;"});
					this.noteResourcesMap[resource.guid] = {"mime": mime,"height": resource.height,"width": resource.width,
														"name": attachName,"size": resource.data.size};
					this.resourceGuidPosnMap[i] = resource.guid;
				}
				//console.log("resourceGuidPosnMap: "+JSON.stringify(this.resourceGuidPosnMap));
				//console.log("noteResourcesMap: "+JSON.stringify(this.noteResourcesMap));
				this.noteResourcesLength = note.resources.list.length;
				this.$.attachmentSelector.setLabel("Attachments ("+note.resources.list.length+")");
				
				var formattedResourceContent = this.showContentWithResources(formattedViewContent);
				this.$.notecontent.setContent(formattedResourceContent);
			} else {
				this.$.attachmentSelector.setLabel("Attachments (0)");
			}
		} catch (e)
		{	
			console.error("Error"+e);
		}
		this.$.attachmentSelector.setItems( items );
		if(this.deviceName.indexOf("PRE3") != -1
			|| this.deviceName.indexOf("PRE2") != -1) {
			this.$.preWebViewSpinner.hide();
		}else {
			this.$.webViewSpinner.hide();
		}
	},
	downloadThumbImageFile: function(resourceGuid) {
		var sharedBaseUrl = Evernote.application.secureHost + "/shard/" + enyo.application.shardId;
		//console.log("sharedBaseUrl: "+sharedBaseUrl+" Guid: "+resourceGuid);
		if(this.deviceName.indexOf("PRE3") != -1
			|| this.deviceName.indexOf("PRE2") != -1) {
			this.$.writeFile.call({ path: "/media/internal/evernotewebos/", guid: resourceGuid,
									authtoken: enyo.application.authToken,
									fileurl: sharedBaseUrl + '/thm/res/' + resourceGuid+".jpg?size=40",
									filename: resourceGuid+".jpg",caller:"THUMB", mime:"image/jpeg"});
		} else {
			this.$.downloadThumbImageFile.call({target: sharedBaseUrl + '/thm/res/' + resourceGuid+".jpg?size=40",
									cookieHeader:"auth=" + enyo.application.authToken,
									subscribe:true, targetDir:"/media/internal/evernotewebos/",
									targetFilename:resourceGuid+".jpg"});
		}
	},
	downloadThumbImageFinished : function(inSender, inResponse) {
	   //console.log("downloadThumbImageFinished, results=" + enyo.json.stringify(inResponse));
	   try {
		   if((inResponse.completed && inResponse.completionStatusCode == 200)) {
				//console.log("download complete for file: "+inResponse.target)
				this.$.attachmentSelector.setItems(this.$.attachmentSelector.getItems());
				this.$.webViewSpinner.hide();
			} else if((inResponse.completed && inResponse.completionStatusCode != 200)) {
				this.$.webViewSpinner.hide();
			} else {
				this.$.webViewSpinner.show();
			}
		} catch (e)
		{	
			console.error("Error"+e);
		}
	},
	downloadThumbImageFail : function(inSender, inResponse) {
	   this.$.webViewSpinner.hide();
	},
	showContentWithResources: function(note) {
		var enmediaPatt=/<en-media/g;
		var content = note;
		//console.log("showContentWithResources content: "+content);
		var match = content.match(enmediaPatt);
		//console.log("Multiple Attachments Scenario: "+match.length)
		var newContent = '';
		var tempContent = content;
		var mediaCounter = 0;
		var resourceGuid = '';
		var resource = null;
		var imgSrc = '';
		//var imageCounter = 0;
		if(match.length != this.noteResourcesLength) {
			return tempContent;
		}
		try {
			for(var i = 0; i < match.length; i++) {
				var startIndex = tempContent.indexOf('<en-media');
				var initContent = tempContent.substring(0,startIndex);
				newContent += initContent ;
				//console.log("initContent: "+initContent);
				var remainingContent = tempContent.substring(startIndex);
				//console.log("remainingContent: "+remainingContent);
				var endChar = remainingContent.indexOf('>');
				var mediaContent = remainingContent.substring(0,endChar+1);
				//console.log("MediaContent: "+mediaContent);
				if(mediaContent.indexOf('image/') != -1) {
					//imageCounter += 1;
					//Download Image
					this.downloadImageFile(mediaCounter);
					//Add Img Src Attribute
					resourceGuid = this.resourceGuidPosnMap[mediaCounter];		
					resource = this.noteResourcesMap[resourceGuid];
					var width = resource.width;
					var height = resource.height;
					if(parseInt(width) > 768 || parseInt(height) > 1024) {
						width = 1004;
						height = 748;
					}
					if(this.deviceName.indexOf("PRE3") != -1
						|| this.deviceName.indexOf("PRE2") != -1) {
						if(parseInt(width) == 1004 || parseInt(height) == 748) {
							width = 600;
							height = 400;
						}
					}
					imgSrc = "<img src='file:///media/internal/evernotewebos/"+resource.name+"' " 
									+"width='"+width+"px' height='"+height+"px' />";
					//console.log("imgSrc value: "+imgSrc);
					//Set in newContent
					newContent += imgSrc;
				} else {
					newContent += mediaContent;
				}
				var nextContent = remainingContent.substring(endChar+1);
				//console.log("nextContent: "+nextContent);
				tempContent = nextContent;
				mediaCounter += 1;
			}
			if(tempContent.length > 0)
				newContent += tempContent;
			newContent = newContent.replace(/<\/en-media>/g,'');
		} catch (e)
		{	
			console.error("Error"+e);
			return content;
		}
		//console.log("newContent updated: "+newContent);
		return newContent;
	},
	downloadImageFile: function(imagePosn) {
		var resourceGuid = this.resourceGuidPosnMap[imagePosn];
		if(resourceGuid != null) {
			var resource = this.noteResourcesMap[resourceGuid];		
			//console.log("downloadImageFile: resource details: name: "+resource.name);
			var sharedBaseUrl = Evernote.application.secureHost + "/shard/" + enyo.application.shardId;
			this.isSetDownloadImageInProgress = true;
			if(this.deviceName.indexOf("PRE3") != -1
				|| this.deviceName.indexOf("PRE2") != -1) {
				this.$.writeFile.call({ path: "/media/internal/evernotewebos/", guid: resourceGuid,
									authtoken: enyo.application.authToken,
									fileurl: sharedBaseUrl + '/res/' + resourceGuid,
									filename: resource.name,caller:"RESOURCE", mime:resource.mime});
			} else {
				this.$.downloadImageFile.call({target: sharedBaseUrl + '/res/' + resourceGuid,
										mime:resource.mime, 
										cookieHeader:"auth=" + enyo.application.authToken,
										subscribe:true, targetDir:"/media/internal/evernotewebos/",
										targetFilename:resource.name});
			}
			
			this.$.webViewSpinner.show();
		}
	},
	fileCreated: function(inSender, inResponse, inRequest) {
		//console.log("FILE CREATED...."+JSON.stringify(inResponse));
		if(inResponse.caller.indexOf("THUMB") != -1) {
			this.$.attachmentSelector.setItems(this.$.attachmentSelector.getItems());
			this.$.webViewSpinner.hide();
		} else if (inResponse.caller.indexOf("RESOURCE") != -1) {
			this.$.notecontent.setContent(this.$.notecontent.getContent());
			this.$.webViewSpinner.hide();
		} else if (inResponse.caller.indexOf("ATTACHMENT") != -1) {
			this.showAttachmentScrim(false);
			this.$.downloadMessage.setContent("Download Location: /media/internal/evernotewebos/"+inResponse.infilename);
			var mime = inResponse.mime;
			if(mime.indexOf("image/") != -1) {
				var imgSrc = "<img src='file:///media/internal/evernotewebos/"+inResponse.infilename+"' />";
				this.$.resourceview.setContent(imgSrc);
				return;
			} else if(mime.indexOf("text/plain") != -1) {
				var imgSrc = "<img src='"+enyo.fetchAppRootPath()+'images/fileopened.png'+"' />";
				this.$.resourceview.setContent(imgSrc);
				var targetUrl = 'file:///media/internal/evernotewebos/'+inResponse.infilename;
				this.$.launchBrowserCall.call({"id": "com.palm.app.browser",title: inResponse.infilename, "params":{"target": targetUrl}});
				return;
			}
			//Handle Audio / Video / PDF Files
			this.$.openFile.call({target: 'file:///media/internal/evernotewebos/'+inResponse.infilename});
		}
		
	},
	fileCreationFail: function(inSender, inResponse, inRequest) {
		console.log("FILE CREATION FAILED...."+JSON.stringify(inResponse));
		this.$.webViewSpinner.hide();
	},
	downloadImageFinished : function(inSender, inResponse) {
	   //console.log("downloadImageFinished, results=" + enyo.json.stringify(inResponse));
	   if((inResponse.completed && inResponse.completionStatusCode == 200)) {
			//console.log("download complete for file: "+inResponse.target)
			this.$.notecontent.setContent(this.$.notecontent.getContent());
			this.$.webViewSpinner.hide();
		} else if((inResponse.completed && inResponse.completionStatusCode != 200)) {
			this.$.webViewSpinner.hide();
		} else {
			this.$.webViewSpinner.show();
		}
	},
	downloadImageFail : function(inSender, inResponse) {
	   this.$.webViewSpinner.hide();
	},
	showAlertMessage: function(msg) {
		enyo.windows.addBannerMessage($L(msg),"{}");
	},
	listTagsResponse : function(data)
	{
		//console.log("listTagsResponse"+data.list.length);
		this.tagGuidMap = {};
		var adddb = [];
		var list = [];
		var order = function(a, b) {
			return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0);
		};
	   for (var i = 0; i < data.list.length; i++) {
		  list[i] = data.list[i];
		  this.tagGuidMap[list[i].guid] = list[i].name;
		}
		this.tagsdata = list.sort(order); //set sorted list to data
		this.$.taglist.punt();
		
	},
	setupTagRow : function(inSender, inIndex)
	{
		try{
			var tagCounts;
			var tagCount = 0;
			//console.log("setupNotebookRow");
			if(this.tagsdata) {
				var record = this.tagsdata[inIndex]; //set data arry values to record
				if (record) {
				  //console.log("setupTagRow guid: "+record.guid+" name: "+record.name);
				  if(enyo.application.tagCountsList) {
					 for (var i = 0; i < enyo.application.tagCountsList.length; i++) {
							tagCounts = enyo.application.tagCountsList[i];
							if(tagCounts.guid == record.guid) {
								tagCount = tagCounts.count;
								break;
							}
					 }
				  }
				  
				  this.$.tagVal.setContent(record.name+" ("+tagCount+")");
				  if( inIndex % 2 == 0)
						this.$.tagListItem.applyStyle("background-color", "#eee");
				  else
						this.$.tagListItem.applyStyle("background-color", "white");
				  var isRowSelected = (inIndex == this.selectedTagRow);
				  if (isRowSelected) {
					this.$.tagListItem.applyStyle("background-color", "#A0CFEC");
					this.$.tagListItem.applyStyle("font-weight", "bold");
				  } else {
					this.$.tagListItem.applyStyle("font-weight", null);
				  }
				  return true;
				}
			}
	  }catch (e)
      {
		 console.error("Error"+e);
      }
	},
	tagSelected: function(inSender, inEvent) {
		var record = this.tagsdata[inEvent.rowIndex]; 
		this.selectedTagRow = inEvent.rowIndex;
		//var query;
		//console.log("Tag Selected");
		if (record) {
			var position = this.$.taglist.$.scroller.$.scroll.y;
			this.$.taglist.refresh();
			this.$.taglist.$.scroller.$.scroll.setScrollPosition(position);
			this.selectedNoteRow = -1;
			this.$.noteSearchTxt.setValue("");
			this.$.taglist.refresh();
			
			//Load Notes
			var self = this;
			var onSuccess3 = function(noteList, transport) {
				//console.log("transport: "+JSON.stringify(transport));
				enyo.application.LastNoteNumDisplayed = enyo.application.notesPerPage;
				enyo.application.TotalNotes = noteList.totalNotes;
				self.findNotesResponse(noteList);			
				self.showNoteScrim(false);
				self.setDefaultNoteCount();		
				if(self.deviceName.indexOf("PRE3") != -1
					|| self.deviceName.indexOf("PRE2") != -1) {
					self.$.slidingPane.selectView(self.$.middle);
				}
			};
			//Add Fileter based on user preferred sort order
			var filter = new NoteFilter();
			filter.setOrder(enyo.application.sortorder);
			filter.setAscendingFlag(enyo.application.ascendingflag);
			//Adding filter
			//console.log("this.selectedNotebookRow: "+this.selectedNotebookRow);
			if(this.selectedNotebookRow == -1 || this.selectedNotebookRow == 0 ||
				(this.notebookdata[this.selectedNotebookRow].name == "All Notes")) {
				filter.setQueryString('tag:"'+record.name+'"');
			} else {
				//Notebook is selected
				var selNotebook = this.notebookdata[this.selectedNotebookRow];
				filter.setNotebook(selNotebook.guid);
				filter.setQueryString('tag:"'+record.name+'"');
			}
			var onFailure = function(transport) {
					//self.showErrorDialog("Failed to delete selected note");
					self.showAlertMessage.bind(self, "Failed to get Tag list");
					self.showNoteScrim(false);
				};
			enyo.application.NoteStore.findNotes(onSuccess3,onFailure, filter,
										0, enyo.application.notesPerPage);
			this.showNoteScrim(true);
		}		
	},
	setDefaultNoteCount: function() {
		var updateStr = "1-";
		if(enyo.application.TotalNotes == 0) {
			updateStr = "0";
		} else if(enyo.application.LastNoteNumDisplayed >= enyo.application.TotalNotes) {
			updateStr += enyo.application.TotalNotes;
		} else {
			updateStr += enyo.application.LastNoteNumDisplayed;
		}
		this.$.notescount.setCaption(updateStr);
	},
	listNotebooksResponse : function(data)
	{
		//console.log("listNotebooksResponse"+data.list.length);
		var list = [];
		this.notebookGuidMap = {};
		var inplist = [];
		list.push(({"guid":"A000000000"},{"name":$L('All Notes')}));
		var order = function(a, b) {
			return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0);
		};
		inplist = data.list.sort(order);
		for (var i = 0; i < inplist.length; i++) {
		  list[i+1] = inplist[i];
		  this.notebookGuidMap[inplist[i].guid] = inplist[i].name;
		}
		this.notebookdata = list; //set list to data
		//Set All Notes as default
		this.selectedNotebookRow = 0;
		this.$.notebooklist.punt();
	},
	setupNotebookRow : function(inSender, inIndex)
	{
		var nbCounts;
		var nbCount = 0;
		if(this.notebookdata) {
			var record = this.notebookdata[inIndex]; //set data arry values to record
			if (record) {
			  //console.log("setupNotebookRow guid: "+record.guid+" name: "+record.name);
			  if(record.name == "All Notes") {
				nbCount = enyo.application.notebookCountsSize;
			  } else {
				if(enyo.application.notebookCountsList) {
					for (var i = 0; i < enyo.application.notebookCountsList.length; i++) {
						nbCounts = enyo.application.notebookCountsList[i];
						//console.log("GUIDS: "+nbCounts.guid+" ## "+record.guid);
						if(nbCounts.guid == record.guid) {
							nbCount = nbCounts.count;
							break;
						}
					}
				}				
			  }
			  this.$.notebookVal.setContent(record.name+" ("+nbCount+")");
			  if(record.defaultNotebook != 'undefined'
					&& record.defaultNotebook) {
				this.$.notebookImage.setSrc("images/folder_heart.png");
			  }
			  if( inIndex % 2 == 0)
					this.$.listItem.applyStyle("background-color", "#eee");
			  else
					this.$.listItem.applyStyle("background-color", "white");
			  var isRowSelected = (inIndex == this.selectedNotebookRow);
			  if (isRowSelected) {
				this.$.listItem.applyStyle("background-color", "#A0CFEC");
				this.$.listItem.applyStyle("font-weight", "bold");
			  } else {
				this.$.listItem.applyStyle("font-weight", null);
			  }
			  return true;
			}
		}
	},
	notebookSelected: function(inSender, inEvent) {
		var record = this.notebookdata[inEvent.rowIndex]; 
		//var dummydata;
		this.selectedNotebookRow = inEvent.rowIndex;
		if (record) {
			//console.log("categorySelected called: "+record.category_name);
			var position = this.$.notebooklist.$.scroller.$.scroll.y;
			this.$.notebooklist.refresh();
			//this.scrollToIndex(inEvent.rowIndex);
			this.$.notebooklist.$.scroller.$.scroll.setScrollPosition(position);
			this.selectedNoteRow = -1;
			this.selectedTagRow = -1;
			this.$.noteSearchTxt.setValue("");
			this.$.notebooklist.refresh();
			this.$.taglist.refresh();
			
			//Load Notes
			var self = this;
			var onSuccess3 = function(noteList, transport) {
				//console.log("response: "+JSON.stringify(transport));
				enyo.application.LastNoteNumDisplayed = enyo.application.notesPerPage;
				enyo.application.TotalNotes = noteList.totalNotes;
				self.findNotesResponse(noteList);				
				self.showNoteScrim(false);
				self.setDefaultNoteCount();
				if(self.deviceName.indexOf("PRE3") != -1
					|| self.deviceName.indexOf("PRE2") != -1) {
					self.$.slidingPane.selectView(self.$.middle);
				}
			};
			//Add Fileter based on user preferred sort order
			var filter = new NoteFilter();
			filter.setOrder(enyo.application.sortorder);
			filter.setAscendingFlag(enyo.application.ascendingflag);
			//Adding filter			
			if(record.name == "All Notes") {
				//List All Notes
			} else {
				//Filter by Notebook
				//filter.setQueryString("notebook:"+record.name);
				filter.setNotebook(record.guid);
			}
			var onFailure = function(transport) {
					//self.showErrorDialog("Failed to delete selected note");
					self.showAlertMessage.bind(self, "Failed to get Note list");
					self.showNoteScrim(false);
				};
			enyo.application.NoteStore.findNotes(onSuccess3,onFailure, filter,
										0, enyo.application.notesPerPage);
			this.showNoteScrim(true);
		}
	},
	createTables: function() {
	try {
		var user_login_column	=	[];
		var preferences_column	=	[];
		var oauth_column	=	[];
		
		var notebooks_column	=	[];
		var tags_column	=	[];
		var notes_basic_data_column	=	[];
		var note_tags_column	=	[];
		
		oauth_column.push({"column": "rowID", "type":"INTEGER", "constraints": ["PRIMARY KEY AUTOINCREMENT"]});
		oauth_column.push({"column": "oauth_key", "type" : "TEXT", "constraints": ["NOT NULL"]});
		oauth_column.push({"column": "oauth_value", "type" : "TEXT", "constraints": ["NOT NULL"]});
		
		var oauth_sql = this.$.db.getCreateTable("user_oauth",oauth_column,"true");
		this.$.db.query(oauth_sql);
		
		user_login_column.push({"column": "rowID", "type":"INTEGER", "constraints": ["PRIMARY KEY AUTOINCREMENT"]});
		user_login_column.push({"column": "username", "type" : "TEXT", "constraints": ["NOT NULL"]});
		user_login_column.push({"column": "password", "type" : "TEXT", "constraints": ["NOT NULL"]});

		var user_login_sql = this.$.db.getCreateTable("user_login",user_login_column,"true");
		this.$.db.query(user_login_sql);
		
		preferences_column.push({"column": "rowID", "type":"INTEGER", "constraints": ["PRIMARY KEY AUTOINCREMENT"]});
		preferences_column.push({"column": "pref_type", "type" : "TEXT", "constraints": ["NOT NULL"]});
		preferences_column.push({"column": "pref_value", "type" : "TEXT", "constraints": ["NOT NULL"]});
		
		var preferences_sql = this.$.db.getCreateTable("preferences",preferences_column,"true");
		this.$.db.query(preferences_sql);
		//console.log("Tables Created");
	  }
      catch (e)
      {
		 console.error("Error"+e);
      }
   },
   onComplete: function(inSender, inEvent) {
		this.$.webViewSpinner.hide();
	},
	onStopped: function(inSender, inEvent) {
		this.$.webViewSpinner.hide();
	},
	onStarted: function(inSender, inEvent) {
		this.$.webViewSpinner.show();
	},
});