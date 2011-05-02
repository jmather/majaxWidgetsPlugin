<?php
class majaxWidgetFormSelectDoubleList extends sfWidgetFormSelectMany
{
  protected function configure($options = array(), $attributes = array())
  {
    $this->addOption('monitor_element', false);
    parent::configure($options, $attributes);
  }

  /**
   * @param  string $name        The element name
   * @param  string $value       The value selected in this widget
   * @param  array  $attributes  An array of HTML attributes to be merged with the default HTML attributes
   * @param  array  $errors      An array of errors for the field
   *
   * @return string An HTML tag string
   *
   * @see sfWidgetForm
   */
  public function render($name, $value = null, $attributes = array(), $errors = array())
  {
    $sfContext = sfContext::getInstance();
    $resp = $sfContext->getResponse();
    $resp->addJavascript('../majaxWidgetsPlugin/js/jquery.majax.doubleselectlist.js');

    $ret = parent::render($name, $value, $attributes, $errors);

    $id = $this->generateId($name);

    $monitor_element = ($this->getOption('monitor_element')) ? 'true' : 'false';

    $ret .= '
<script type="text/javascript">
$(function() {
 $(\'#'.$id.'\').majaxdoubleselectlist({monitor_element: '.$monitor_element.'});
});
</script>
';

    return $ret;
  }
}

