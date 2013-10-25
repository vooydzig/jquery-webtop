
(function( $ ) {	
	$.fn.webtop = function(options) {
    	var opts = $.extend( {}, $.fn.webtop.defaults, options );
		return this.each(function () {
			initialize($(this), opts);
		});
		
		
    };
	
    $.fn.webtop.defaults = {
	    folderIcon: "static/img/folder.png",
       	imageIcon: "static/img/image.png",
       	linkIcon: "static/img/link.png",
	    defaultIcon: "static/img/default.png",
	    trashIcon: "static/img/trash.png",
	    
	    onDragStart: undefined,
	    onDragStop: undefined,
	    onFolderClicked: undefined,
	    onFolderDropped: undefined,
	    onTrashed: undefined,
	    data: [],
	    grid: false
   	};
   	
	$.fn.webtop.refresh = function(data) {
		console.log('this.opts');
	};

   	function initialize($item, opts) {
		addMainDesktop($item, opts);
    	$item.addClass('webtop');
	}
    
	function createIcon(item, opts) {
		var icon = "";
		if (item.type === "folder") {
			icon = opts.folderIcon;
		} else if (item.type === "image") {
			icon = opts.imageIcon;
		} else if (item.type === "text") {
			icon = opts.textIcon;
		} else if (item.type === "link") {
			icon = opts.linkIcon;
		} else {
			icon = opts.defaultIcon;
		}
		
		var link = "#";
		if (item.link !== undefined) {
			link = item.link;
		}
		
		var $icon = $('<div id="'+item.id+'" class="wt-icon wt-'+item.type+'"><a href="'+link+'"><img src="'+icon+'">'+item.name+'</a></div>');
		$icon.draggable({
    		grid: opts.grid,
    		containment: "parent",
		 	start: function(event, ui) {
	            ui.helper.bind("click.prevent",
	                function(event) { event.preventDefault(); });
	                
	            if(opts.onDragStart)
            		opts.onDragStart(item.id);
	        },
	        stop: function(event, ui) {
	        	setTimeout(function(){ui.helper.unbind("click.prevent");}, 300);
	            if(opts.onDragStop)
            		opts.onDragStop(item.id);
	        }
    	})
    	.click(function(e) {
			iconClickHandler(e, $(this), opts);
		});
		
		$icon.find('a').addClass('wt-label');
		
		if(item.position)
			$icon.css({'left': item.position[0], 'top': item.position[1]});
    			
		if($icon.hasClass('wt-folder')) {
			$icon.droppable({
	    		accept: ".wt-icon",
	    		drop: function (e, ui) {
	    			ui.draggable.detach();
	    			if(opts.onFolderDropped)
	    				opts.onFolderDropped($(this).attr('id'), ui.draggable.attr('id'));
	    		}
	    	});
		}
		
		return $icon;
	}
	
	function createTrashCan(icon) {
		return $('<div id="trash" class="wt-icon wt-trash"><img src="'+icon+'">Delete</div>')
			.droppable({
	    		accept: ".wt-icon",
	    		drop: function (e, ui) {
	    			ui.draggable.detach();
	    			
	    			if(opts.onTrashed)
	    				opts.onTrashed(ui.draggable.attr('id'));
	    		}
	    	});
	}
	
	function addMainDesktop($element, opts) {
		$element.append('<div class="wt-main"></div>');
		var $wtMain = $element.find('.wt-main');
		$wtMain.append(createTrashCan(opts.trashIcon));
			
		for(var i=0; i < opts.data.length; i++) {
			var elem = opts.data[i];
			$wtMain.append(createIcon(elem, opts));	
		}
	}
	
	function iconClickHandler(e, $item, opts) {
		var $a = $item.find('a');
		if ($a.attr('href').substring(0,1) === "#") {
			e.preventDefault();
			e.stopPropagation();
			if(opts.onFolderClicked)
				opts.onFolderClicked($item.attr('id'));
		}
	}
	
	
}( jQuery ));