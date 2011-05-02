(function($) {
        $.widget('ui.majaxdoubleselectlist', {
                version : '1.0.0',
                eventPrefix : 'majaxdoubleselectlist',
                options : {
                        values: {},
                        selected: new Array(),
                        maxsize: 10,
                        minsize: 3,
                        monitor_element: false
                },
                _create: function() {
                        var id = $(this.element).attr('id');
                        this.options['id'] = id;

                        this._rebuild_display();

                        $(this.element).css('display', 'none');

                        var cont = $('<table><tr><td valign="top">Available:<br /><span id="'+id+'_h1"></span></td><td id="'+id+'_ctrls" valign="middle"></td><td valign="top">Assigned:<br /><span id="'+id+'_h2"></span></td></tr></table>');
                        $(this.element).after(cont);
                        $('#'+id+'_h1').replaceWith(this.options['values_display']);
                        $('#'+id+'_h2').replaceWith(this.options['selected_display']);


                        var tfTransferClick = function(widget, from, to) {
                                return function() {
                                        var eles = $(':selected', from);
                                        if (eles.length > 0)
                                        {
                                                for(var i = 0; i < eles.length; i++)
                                                {
                                                        $(eles[i]).detach();
                                                        $(to).append(eles[i]);
                                                        $(eles[i]).removeAttr('selected');
                                                }

                                                $('option', widget.element).removeAttr('selected');

                                                widget._stop_monitor();

                                                eles = $('option', widget.options['selected_display']);
                                                for (var i = 0; i < eles.length; i++)
                                                {
                                                        $('option[value='+$(eles[i]).attr('value')+']', widget.element).attr('selected', true);
                                                }

                                                widget._start_monitor();
                                        }
                                        return false;
                                }
                        }


                        var ctrls = $('#'+id+'_ctrls');
                        var a = $('<a href="#">&gt;</a>');
                        a.button();
                        a.click(tfTransferClick(this, this.options['values_display'], this.options['selected_display']));
                        this.options['add_button'] = a;
                        ctrls.append(a);
                        ctrls.append('<br /><br />');
                        a = $('<a href="#">&lt;</a>');
                        a.button();
                        a.click(tfTransferClick(this, this.options['selected_display'], this.options['values_display']));
                        this.options['remove_button'] = a;
                        ctrls.append(a);

                        return this;
                },
                _rebuild_display: function() {
                        this._stop_monitor();

                        if (!this.options['values_display'])
                        {
                                this.options['values_display'] = $('<select multiple="multiple" id="'+id+'_values"></select>');
                                this.options['selected_display'] = $('<select multiple="multiple" id="'+id+'_selected"></select>');
                                this.options['values_display'].css('min-width', 150);
                                this.options['selected_display'].css('min-width',150);
                        } else {
                                this.options['values_display'].html('');
                                this.options['selected_display'].html('');
                        }

                        var ele = $(this.element);
                        var eles = $('option', ele);
                        for(var i = 0; i < eles.length; i++)
                        {
                                var eobj = $(eles[i]);
                                var eid = eobj.attr('value');
                                var ena = eobj.html();
                                this.options['values'][eid] = ena;
                                var eobjc = eobj.clone();
                                eobjc.removeAttr('selected');
                                this.options['values_display'].append(eobjc);
                                if (eobj.is(':selected'))
                                {
                                        eobjc.remove();
                                        eobjc = eobj.clone();
                                        eobjc.removeAttr('selected');
                                        this.options['selected'].push(eid);
                                        this.options['selected_display'].append(eobjc);
                                }
                        }

                        var siz = eles.length

                        if (siz > this.options['maxsize'])
                                siz = this.options['maxsize'];

                        if (siz < this.options['minsize'])
                                siz = this.options['minsize'];

                        this.options['values_display'].attr('size', siz);
                        this.options['selected_display'].attr('size', siz);

                        this._start_monitor();

                },
                _stop_monitor: function() {
                        if (this.options['monitor_timeout'])
                                clearInterval(this.options['monitor_timeout']);
                        this.options['last_monitor'] = '';
                },
                _start_monitor: function() {
                        if (this.options['monitor_element'] == false)
                        {
                                this._stop_monitor();
                                return;
                        }
                        this._stop_monitor();
                        var tfMonitorCaller = function(obj) {
                                return function() {
                                        obj._run_monitor();
                                }
                        }
                        this.options['last_monitor'] = $(this.element).html();
                        this.options['monitor_timeout'] = setInterval(tfMonitorCaller(this), 500);
                },
                _run_monitor: function() {
                        if (this.options['monitor_element'] == false)
                        {
                                this._stop_monitor();
                                return;
                        }
                        if (this.options['last_monitor'])
                        {
                                if (this.options['last_monitor'] != $(this.element).html())
                                {
                                        this._rebuild_display();
                                        this.options['last_monitor'] = $(this.element).html();
                                }
                        } else {
                                this.options['last_monitor'] = $(this.element).html();
                        }
                },
                destroy: function() {
                        var id = this.options['id'];
                        $.Widget.prototype.destroy.call( this );
                        return this;
                }
        });

})(jQuery);

