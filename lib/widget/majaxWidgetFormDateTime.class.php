<?php
class majaxWidgetFormDateTime extends sfWidgetFormDateTime
{
  public function render($name, $value = null, $attributes = array(), $errors = array())
  {
    $sfContext = sfContext::getInstance();
    $resp = $sfContext->getResponse();
    $resp->addJavascript('/majaxWidgetsPlugin/js/jquery.majax.datetimeselector.js');

    

    $id = $this->generateId($name);
    $mid = $id.'_month';
    $did = $id.'_day';
    $yid = $id.'_year';
    $date_widget = $this->getOptionsFor('date');
    $time_widget = $this->getOptionsFor('time');

    $date_txt = (isset($date_widget['can_be_empty']) && $date_widget['can_be_empty'] == false) ? 'false' : 'true';
    $time_txt = (isset($time_widget['can_be_empty']) && $time_widget['can_be_empty'] == false) ? 'false' : 'true';
    $seconds = (isset($time_widget['with_seconds']) && $time_widget['with_seconds'] == true) ? 'true' : 'false';


    $display = '<div id="'.$id.'"></div>';
    $display .= '<div id="'.$id.'_ctrls">';
    $display .= parent::render($name, $value, $attributes, $errors);
    $display .= '</div>';
    $display .= '
<script type="text/javascript">
$(function() {
  $(\'#'.$id.'\').majaxdatetimeselector({date_can_be_empty: '.$date_txt.', time_can_be_empty: '.$time_txt.', seconds: '.$seconds.'});
});
</script>
';
    return $display;
  }
}
