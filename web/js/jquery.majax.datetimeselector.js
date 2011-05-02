(function($) {
	$.widget('ui.majaxdatetimeselector', {
		version: '1.0.0',
		eventPrefix: 'majax.datetimeselector',
		options: {
			date_can_be_empty: false,
			time_can_be_empty: false,
			seconds: false,
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
			$(this.element).html('');

			this.options['date'] = $('<input size="10" type="text" id="'+this.options['id']+'_display" />');

			this.options['hours'] = $('<select id="'+this.options['id']+'_hours"></select>');
			if (this.options['time_can_be_empty'])
				this.options['hours'].append('<option value=""></option>');
			for(var i = 1; i < 13; i++)
				this.options['hours'].append('<option value="'+i+'">'+i+'</option>');

			this.options['minutes'] = $('<select id="'+this.options['id']+'_minutes"></select>');
			if (this.options['time_can_be_empty'])
				this.options['minutes'].append('<option value=""></option>');
			for(var i = 0; i < 60; i++)
				this.options['minutes'].append('<option value="'+i+'">'+this._zero_pad(i, 2)+'</option>');

			if (this.options['seconds'])
			{
				this.options['seconds'] = $('<select id="'+this.options['id']+'_seconds"></select>');
				if (this.options['time_can_be_empty'])
					this.options['seconds'].append('<option value=""></option>');
				for(var i = 0; i < 60; i++)
					this.options['seconds'].append('<option value="'+i+'">'+this._zero_pad(i, 2)+'</option>');
			}

			this.options['ampm'] = $('<select id="'+this.options['id']+'_ampm"></select>');
			if (this.options['time_can_be_empty'])
				this.options['ampm'].append('<option value=""></option>');
			this.options['ampm'].append('<option value="am">am</option>');
			this.options['ampm'].append('<option value="pm">pm</option>');
			
			var tfDisplayUpdate = function(widget) {
				return function() {
					widget._update_ctrls();
				}
			}

			this._ctrls_to_display();


			this.options['date'].change(tfDisplayUpdate(this));
			this.options['date'].datepicker(this.options['datepicker_opts']);

			this.options['hours'].change(tfDisplayUpdate(this));
			this.options['minutes'].change(tfDisplayUpdate(this));
			if (this.options['seconds'])
				this.options['seconds'].change(tfDisplayUpdate(this));
			this.options['ampm'].change(tfDisplayUpdate(this));


			$(this.element).append(this.options['date']);
			$(this.element).append(' ');
			$(this.element).append(this.options['hours']);
			$(this.element).append(':');
			$(this.element).append(this.options['minutes']);
			if (this.options['seconds'])
			{
				$(this.element).append(':');
				$(this.element).append(this.options['seconds']);
			}
			$(this.element).append(' ');
			$(this.element).append(this.options['ampm']);


			if (this.options['date_can_be_empty'] || this.options['time_can_be_empty'])
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
		_ctrls_to_display: function() {
                        
			var m, d, y;
			m = $('#'+this.options['id']+'_month').val();
			d = $('#'+this.options['id']+'_day').val();
			y = $('#'+this.options['id']+'_year').val();
			if (parseInt(m) > 0 && parseInt(d) > 0 && parseInt(y) > 0)
			{
				this.options['date'].val(this._zero_pad(m, 2)+'/'+this._zero_pad(d, 2)+'/'+y);
			}


			var hrs = $('#'+this.options['id']+'_hour').val();
			if (hrs != '')
			{
				hrs = parseInt(hrs);
				if (hrs < 12)
					this.options['ampm'].val('am');
				if (hrs >= 12)
				{
					this.options['ampm'].val('pm');
					if (hrs > 12)
						hrs = hrs - 12;
				}
				if (hrs == 0)
				{
					hrs = 12;
				}
				this.options['hours'].val(hrs);
			}

			var mins = $('#'+this.options['id']+'_minute').val();
			if (mins != '')
			{
				mins = parseInt(mins);
				this.options['minutes'].val(mins);
			}

			if (this.options['seconds'] && $('#'+this.options['id']+'_second').val() != '')
			{
				this.options['minutes'].val(parseInt($('#'+this.options['id']+'_second').val()));
			}
		},
		_clear_display: function() {
			if (this.options['date_can_be_empty'])
			{
				$('#'+this.options['id']+'_display').val('');
				$('#'+this.options['id']+'_month').val('');
				$('#'+this.options['id']+'_day').val('');
				$('#'+this.options['id']+'_year').val('');
			}
			if (this.options['time_can_be_empty'])
			{
				this.options['hours'].val('');
				this.options['minutes'].val('');
				if (this.options['seconds'])
					this.options['seconds'].val('');
				this.options['ampm'].val('');
			}

			this._update_ctrls();
		},
		_update_ctrls: function() {
			var val = this.options['date'].val();
			var vals = val.split('/');
			if ((val == '' || vals.length != 3) && this.options['date_can_be_empty'])
			{
				$('#'+this.options['id']+'_month').val('');
				$('#'+this.options['id']+'_day').val('');
				$('#'+this.options['id']+'_year').val('');
			}

			var m, d, y;
			m = vals[0];
			d = vals[1];
			y = vals[2];

			if (parseInt(m) > 0 && parseInt(d) > 0 && parseInt(y) > 0)
			{
				$('#'+this.options['id']+'_month').val(parseInt(m));
				$('#'+this.options['id']+'_day').val(parseInt(d));
				$('#'+this.options['id']+'_year').val(parseInt(y));
			}


			var ampm = this.options['ampm'].val();

			var hrs, mins, secs;
			if (ampm == 'am')
				hrs = 0;
			else
				hrs = 12;
			hrs += parseInt(this.options['hours'].val());
			if (hrs == 12)
				hrs = 0;
			if (hrs == 24)
				hrs = 12;

			mins = parseInt(this.options['minutes'].val());

			if (this.options['seconds'])
				secs = parseInt(this.options['seconds'].val());

			if (this.options['time_can_be_empty'] && this.options['ampm'].val() == '' && this.options['hours'].val() == '')
			{
				$('#'+this.options['id']+'_hour').val('');
				$('#'+this.options['id']+'_minute').val('');
				if (this.options['seconds'])
					$('#'+this.options['id']+'_second').val('');
			} else {
				$('#'+this.options['id']+'_hour').val(hrs);
				$('#'+this.options['id']+'_minute').val(mins);
				if (this.options['seconds'])
					$('#'+this.options['id']+'_second').val(secs);
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
			$('#'+this.options['id']).html('');
			$.Widget.prototype.destroy.call(this);
			return this;
		}
	});
})(jQuery);
