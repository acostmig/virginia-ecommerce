<?php



namespace app\src\controllers;

Class EntityController
{

    public function __construct($app)
    {
        $this ->app =$app;
        $this ->Service = $app['Entity'];

        
       
    }
    public function getEntity($request, $response, $props)
    {
        $results = ['id'=>$props['id']];
        $results += ['fields' => $this->Service->getEntity($props['id'])];

        if(empty($results['fields']))
        {
            return $this->app->response->withJson('Entity Not Found',404 );
        }
        $fields =[];
        foreach($results['fields'] as &$field)
        {
            if($field['key'] == 'imagePath')
            {
                $field['value']=  explode(';', $field['value']);
            }
            if($field['key'] == 'dropdown')
            {
                $field['value']=  json_decode ($field['value']);
            }
            $fields+=[$field['key']=>$field];
        }
        $results['fields'] = $fields;

        return $response->withJson($results);
    }


}