<?php
require_once dirname(__FILE__) . '/JSONResponse.php';

/**
 * Class Server
 */
class AbstractServer
{
    /**
     *
     */
    /*function __construct()
    {
        //echo "This is a server";
        // .. Do some logging (or whatever)
    }*/

    /**
     *
     */
    public function run()
    {
        //Create response object
        $response = new JSONResponse();

        //Set response errors
        $response->setErrors(
            array(
                'these' => array('are', 'my', 'errors')
            )
        );

        //Set response data
        $response->setData('Hey! Here is some data bitches!');

        //Render the response in the browser
        $response->renderResponse();
    }
}