<?php

/**
 * Interface IResponse
 */
interface IResponse {

    /**
     * @param $arrErrors
     * @return mixed
     */
    public function setErrors($arrErrors);

    /**
     * @param $mData
     * @return mixed
     */
    public function setData($mData);

    /**
     * @return mixed
     */
    public function renderResponse();
}