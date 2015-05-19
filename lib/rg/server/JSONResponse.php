<?php
require_once dirname(__FILE__) . '/AbstractResponse.php';

/**
 * Class JSONResponse
 */
class JSONResponse extends AbstractResponse
{
    /**
     *
     */
    public function renderResponse()
    {
        $aResponse = array(
            'errors' => $this->_errors,
            'data' => $this->_data
        );

        exit(json_encode($aResponse));
    }
}