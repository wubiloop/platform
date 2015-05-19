<?php
require_once dirname(__FILE__) . '/IResponse.php';

/**
 * Class AbstractResponse
 */
abstract class AbstractResponse implements IResponse
{
    /**
     * @var null
     */
    protected $_errors = null;

    /**
     * @var null
     */
    protected $_data = null;

    /**
     * @param $arrErrors
     * @return bool
     */
    public function setErrors($arrErrors)
    {
        if (is_array($arrErrors)) {
            $this->_errors = $arrErrors;
            return true;
        }
        return false;
    }

    /**
     * @param $mData
     * @return bool
     */
    public function setData($mData)
    {
        if (isset($mData)) {
            $this->_data = $mData;
            return true;
        }
        return false;
    }

    /**
     * @throws Exception
     */
    public function renderResponse(){
        throw new Exception('Cannot use abstract method renderResponse of class AbstractResponse');
    }
}