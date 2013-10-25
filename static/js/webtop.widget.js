
(function( $ ) {
	$.widget("wt.webtop", {
		options: {
			folderIcon: "static/img/folder.png",
	       	imageIcon: "static/img/image.png",
	       	linkIcon: "static/img/link.png",
		    defaultIcon: "static/img/default.png",
		    trashIcon: "static/img/trash.png",
		    
		    onDragStart: undefined,
			onDragStop: undefined,
			onIconClicked: undefined,
		    onFolderClicked: undefined,
		    onDroppedOnTrash: undefined,
		    onDroppedOnFolder: undefined,
		    data: [],
		    grid: false
		},
		
		_create: function() {
			this._addMainDesktop(this.options.data);
	    	this.element.addClass('webtop');
		},
		
		_createIcon: function(item) {
			var icon = "";
			var opts = this.options;
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
	            		opts.onDragStart(event, item.id);
		        },
		        stop: function(event, ui) {
		        	setTimeout(function(){ui.helper.unbind("click.prevent");}, 300);
		            if(opts.onDragStop)
	            		opts.onDragStop(event, item.id);
		        }
	    	})
	    	.click(function(e) {
				iconClickHandler(e, $(this), opts);
			});
			
			$icon.find('a').addClass('wt-label');
			
			if(item.position) {
				$icon.css({'left': item.position[0], 'top': item.position[1]});
			} 	
			if($icon.hasClass('wt-folder')) {
				$icon.droppable({
		    		accept: ".wt-icon",
		    		drop: function (e, ui) {
		    			ui.draggable.detach();
		    			if(opts.onDroppedOnFolder)
		    				opts.onDroppedOnFolder(e, $(this).attr('id'), ui.draggable.attr('id'));
		    		}
		    	});
			}
			
			return $icon;
		},
		
		_createTrashIcon: function(icon) {
			var opts = this.options;
			return $('<div id="trash" class="wt-icon wt-trash"><img src="'+icon+'"><span class="wt-label">Delete</span></div>')
			.droppable({
	    		accept: ".wt-icon",
	    		drop: function (e, ui) {
	    			ui.draggable.detach();
	    			
	    			if(opts.onDroppedOnTrash)
	    				opts.onDroppedOnTrash(e, ui.draggable.attr('id'));
	    		}
	    	});
		},
		
		_addMainDesktop: function(data) {
			var opts = this.options;
			var $element = this.element;
			
			$element.append('<div class="wt-main"></div>');
			var $wtMain = $element.find('.wt-main');
			
			$wtMain.append(this._createTrashIcon(opts.trashIcon));
			this.refresh(data);
				
		},
		
		refresh: function(data) {
			var $wtMain = this.element.find('.wt-main');
			this.element.find('.wt-icon:not(.wt-trash)').remove();
			
			var itemsInARow = Math.floor(this.element.width() / 128);
			var auto_index = 0;
			for(var i=0; i < data.length; i++) {
				var element = data[i];
				if( element.position) {
					
				} else {
					var x = auto_index+1%itemsInARow;
					var y = Math.floor(auto_index/itemsInARow);
					element.position = [x * 128, y * 128];
					auto_index++;		
				}
				$wtMain.append(this._createIcon(element, this.options));	
			}
		},
	});

	function iconClickHandler(e, $item, opts) {
		e.preventDefault();
		e.stopPropagation();
		var $a = $item.find('a');
		if ($a.parent().hasClass('wt-folder')) {
			e.preventDefault();
			e.stopPropagation();
			if(opts.onFolderClicked)
				opts.onFolderClicked(e, $item.attr('id'));
		} else {
			if(opts.onIconClicked)
				opts.onIconClicked(e, $item.attr('id'));
		}
	}

	
}( jQuery ));