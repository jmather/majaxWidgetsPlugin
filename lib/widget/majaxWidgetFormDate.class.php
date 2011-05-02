<?php
class majaxWidgetFormDate extends sfWidgetFormDate
{
  public function render($name, $value = null, $attributes = array(), $errors = array())
  {
    $sfContext = sfContext::getInstance();
    $resp = $sfContext->getResponse();
    $resp->addJavascript('/majaxWidgetsPlugin/js/jquery.majax.dateselector.js');

    

    $id = $this->generateId($name);
    $mid = $id.'_month';
    $did = $id.'_day';
    $yid = $id.'_year';

    $txt = ($this->getOption('can_be_empty') == true) ? 'true' : 'false';

    $display = '<div id="'.$id.'"></div>';
    $display .= '<div id="'.$id.'_ctrls">';
    $display .= parent::render($name, $value, $attributes, $errors);
    $display .= '</div>';
    $display .= '
<script type="text/javascript">
$(function() {
  $(\'#'.$id.'\').majaxdateselector({can_be_empty: '.$txt.'});
});
</script>
';
    return $display;
  }
}
