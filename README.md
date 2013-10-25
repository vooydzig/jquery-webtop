# WebTop
---


WebTop is a jQuery plugin used to display Your data as a desktop in browser. It was first developed as my personal front page of the browser, and I used it instead of built-in bookmarks system. 

Tested in IE 10, FireFox, Chrome and Opera.

See the demo: [click here].


##Basic usage

The only WebTop dependency is jQuery itself, so make sure You import it before importing WebTop plugin.

	<script src="/path/to/jquery.js"></script>
	<script src="webtop.widget.js"></script>

Now You can run webtop() method on any empty div.

	$('.example-div').webtop();

And You're ready to go.

##Constructor options

###Data

**data**
Data is special argument used to insert data into Your very own web desktop. Data is array of objects with the following structure:

	{ 
		id: 0, 
		name: "", 
		type: "", 
		link: ""
	},

- **id** is unique item identifier. It could be either string or number
-  **name** is label displayed below the icon
-  **type** is on of the following: `folder, image, text, link`. Depending on type icon and behavior would be decided.
-  **link** is what will be added as `src` to Your icon.   

###Icons

Theses are pretty straightforward. Following are paths of icons used to represent different types of content. They all default to img/[type].png file. So, default folder icon would be img/folder.png. As I've said pretty straightforward. 

- folderIcon
- imageIcon
- linkIcon
- defaultIcon
- trashIcon
    
###Events

Also pretty straight forward. All of those events default to `undfined`. All of those require as their first argument JS event.

**onDragStart(event, item_id)**

Fired when user starts dragging icon. `item_id` is id of dragged item.
 
**onDragStop(event, item_id)**
Fired when user stops dragging icon. `item_id` is id of dragged item.

**onIconClicked(event, item_id)**
Fired when user starts clicks on non folder icon. `item_id` is id of clicked item.

**onFolderClicked(event, item_id)**
Fired when user starts clicks on folder icon. `item_id` is id of clicked item.

**onDroppedOnTrash(event, item_id)**
Fired when user drops item on trash. As usual `item_id` is id of dropped item.

**onDroppedOnFolder(event, folder__id, item_id)**
Fired when user drops item on folder(not trash). `folder_is` is(surprise, surprise!) id of a folder and `item_id` is id of dropped item.

###Other
**grid** passed as array `[x, y]` describes size of grid, that drag'n'drop should use. If `false` is passed no grid will be used.