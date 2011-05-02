<?php
class majaxWidgetFormTime extends sfWidgetFormTime
{
  public function render($name, $value = null, $attributes = array(), $errors = array())
  {
    $sfContext = sfContext::getInstance();
    $resp = $sfContext->getResponse();
    $resp->addJavascript('/majaxWidgetsPlugin/js/jquery.majax.timeselector.js');

    

    $id = $this->generateId($name);
    $hid = $id.'_hour';
    $mid = $id.'_minute';
    $sid = $id.'_second';

    $txt = ($this->getOption('can_be_empty') == true) ? 'true' : 'false';

    $seconds = ($this->getOption('with_seconds') == true) ? 'true' : 'false';

    $display = '<div id="'.$id.'"></div>';
    $display .= '<div id="'.$id.'_ctrls">';
    $display .= parent::render($name, $value, $attributes, $errors);
    $display .= '</div>';
    $display .= '
<script type="text/javascript">
$(function() {
  $(\'#'.$id.'\').majaxtimeselector({can_be_empty: '.$txt.', with_seconds: '.$seconds.'});
});
</script>
';
    return $display;
  }
}
