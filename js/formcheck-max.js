var FormCheckMax = new Class({
	Extends: FormCheck,
	Implements: Options,
	
	/*
	Function: addError
		Private method

		Add error message
	*/
	addError : function(obj) {
		//determine position
		//var coord = obj.target ? document.id(obj.target).getCoordinates() : obj.getCoordinates();
		var coord;
		if(obj.target && typeOf($(obj.target)) != 'null') {
			coord = $(obj.target).getCoordinates();
		} else {
			coord = obj.getCoordinates();
		}

		if(!obj.element && this.options.display.indicateErrors != 0) {
			if (this.options.display.errorsLocation == 1) {
				var pos = (this.options.display.tipsPosition == 'left') ? coord.left : coord.right;
				var options = {
					'opacity' : 0,
					'position' : 'absolute',
					'float' : 'left',
					'left' : pos + this.options.display.tipsOffsetX
				};
				obj.element = new Element('div', {'class' : this.options.tipsClass, 'styles' : options}).inject(document.body, 'inside');
				this.addPositionEvent(obj);
			} else if (this.options.display.errorsLocation == 2){
				obj.element = new Element('div', {'class' : this.options.errorClass, 'styles' : {'opacity' : 0}}).inject(obj, 'before');
			} else if (this.options.display.errorsLocation == 3){
				obj.element = new Element('div', {'class' : this.options.errorClass, 'styles' : {'opacity' : 0}});
				//hack for position
				if(document.id('error-message-'+obj.get('name').replace(/\[\]/, '')) != null){
					obj.element.inject(document.id('error-message-'+obj.get('name').replace(/\[\]/, '')));
				}else{
					if ($type(obj.group) == 'object' || $type(obj.group) == 'collection')
						obj.element.injectAfter(obj.group[obj.group.length-1]);
					else
						obj.element.injectAfter(obj);
				}
				//end hack
			}
		}
		if (obj.element && obj.element != true) {
			obj.element.empty();
			//hack for title
			if((obj.get('title') != null) && (obj.get('title') != '')){
				obj.errors = [obj.get('title')];
			}
			//end hack
			if (this.options.display.errorsLocation == 1) {
				var errors = [];
				obj.errors.each(function(error) {
					errors.push(new Element('p').set('html', error));
				});
				var tips = this.makeTips(errors).inject(obj.element, 'inside');
				if(this.options.display.closeTipsButton) {
					tips.getElements('a.close').addEvent('mouseup', function(){
						this.removeError(obj, 'tip');
					}.bind(this));
				}
				obj.element.setStyle('top', coord.top - tips.getCoordinates().height + this.options.display.tipsOffsetY);
			} else {
				obj.errors.each(function(error) {
					new Element('p').set('html',error).inject(obj.element, 'inside');
				});
			}

			if (!this.options.display.fadeDuration || Browser.ie && Browser.version == 5 && this.options.display.errorsLocation < 2) {
				obj.element.setStyle('opacity', 1);
			} else {
				obj.fx = new Fx.Tween(obj.element, {
					'duration' : this.options.display.fadeDuration,
					'ignore' : true,
					'onStart' : function(){
						this.fxRunning = true;
					}.bind(this),
					'onComplete' : function() {
						this.fxRunning = false;
						if (obj.element && obj.element.getStyle('opacity').toInt() == 0) {
							obj.element.destroy();
							obj.element = false;
						}
					}.bind(this)
				});
				if(obj.element.getStyle('opacity').toInt() != 1) obj.fx.start('opacity', 1);
			}
		}
		if (this.options.display.addClassErrorToField && !obj.isChild){
			obj.addClass(this.options.fieldErrorClass);
			obj.element = obj.element || true;
		}

	}
});
/*
     FILE ARCHIVED ON 03:56:30 Oct 27, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 06:11:01 Apr 06, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 56.534 (3)
  esindex: 0.006
  captures_list: 110.826
  CDXLines.iter: 11.917 (3)
  PetaboxLoader3.datanode: 55.495 (4)
  exclusion.robots.fetch: 38.07 (2)
  exclusion.robots: 38.82
  exclusion.robots.policy: 0.369
  RedisCDXSource: 0.774
  PetaboxLoader3.resolve: 48.717
  load_resource: 77.546
*/