(function($) {
	$.widget('ui.majaxdateselector', {
		version: '1.0.0',
		eventPrefix: 'majax.dateselector',
		options: {
			can_be_empty: false,
			datepicker_opts: {
				
			}
		},
		_create: function() {
			this.options['id'] = $(this.element).attr('id');
			this._hide_real_ctrls();
			this._build_facade();
			return this;
		},
		_build_facade: function() {
			$(this.element).html('<input size="10" type="text" id="'+this.options['id']+'_display" />');
			var tfDisplayUpdate = function(widget) {
				return function() {
					widget._update_ctrls(this.value);
				}
			}

			$('#'+this.options['id']+'_display').change(tfDisplayUpdate(this));

			var m, d, y;
			m = $('#'+this.options['id']+'_month').val();
			d = $('#'+this.options['id']+'_day').val();
			y = $('#'+this.options['id']+'_year').val();
			if (parseInt(m, 10) > 0 && parseInt(d, 10) > 0 && parseInt(y, 10) > 0)
			{
				$('#'+this.options['id']+'_display').val(this._zero_pad(m, 2)+'/'+this._zero_pad(d, 2)+'/'+y);
			}
			$('#'+this.options['id']+'_display').datepicker(this.options['datepicker_opts']);
			if (this.options['can_be_empty'])
			{
				$('#'+this.options['id']).append(' <input type="button" id="'+this.options['id']+'_empty" value="Clear" />');
				$('#'+this.options['id']+'_empty').button();
				var tfClear = function(widget) {
					return function() {
						widget._clear_display();
						return false;
					}
				}
				$('#'+this.options['id']+'_empty').click(tfClear(this));
			}
		},
		_zero_pad: function(num,count)
		{
			var numZeropad = num + '';
			while(numZeropad.length < count) {
				numZeropad = "0" + numZeropad;
			}
			return numZeropad;
		},
		_clear_display: function() {
			$('#'+this.options['id']+'_display').val('');
			$('#'+this.options['id']+'_month').val('');
			$('#'+this.options['id']+'_day').val('');
			$('#'+this.options['id']+'_year').val('');
		},
		_update_ctrls: function(val) {
			var vals = val.split('/');
			if ((val == '' || vals.length != 3) && this.options['can_be_empty'])
			{
				$('#'+this.options['id']+'_month').val('');
				$('#'+this.options['id']+'_day').val('');
				$('#'+this.options['id']+'_year').val('');
			}

			var m, d, y;
			m = vals[0];
			d = vals[1];
			y = vals[2];

			if (parseInt(m, 10) > 0 && parseInt(d, 10) > 0 && parseInt(y, 10) > 0)
			{
				$('#'+this.options['id']+'_month').val(parseInt(m, 10));
				$('#'+this.options['id']+'_day').val(parseInt(d, 10));
				$('#'+this.options['id']+'_year').val(parseInt(y, 10));
			}
		},
		_hide_real_ctrls: function() {
			$('#'+this.options['id']+'_ctrls').css('display', 'none');
		},
		_show_real_ctrls: function() {
			$('#'+this.options['id']+'_ctrls').css('display', null);
		},
		destroy: function() {
			this._show_real_ctrls();
			('#'+this.options['id']).html('');
			$.Widget.prototype.destroy.call(this);
			return this;
		}
	});
})(jQuery);
