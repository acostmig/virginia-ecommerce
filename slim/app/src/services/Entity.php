<?php

namespace app\src\services;
use PDO;


Class Entity
{

    public function __construct($app)
    {
        $this ->app =$app;
    }

    public function getEntity($entityID)
    {
    $query="SELECT  
            Entity_Field.id as `id`,
            Entity_Field.Name  as `name`,
            Entity_Field.Key as `key`,
            GROUP_CONCAT(distinct `Entity_Field_Values`.`id`  SEPARATOR ',')  as `Entity_Field_Values_id`,
            GROUP_CONCAT(distinct `Entity_Field_Values`.`Value`  SEPARATOR ';')  as `value`
            FROM Entity_Field
            LEFT JOIN Entity_Field_Values ON Entity_Field_Values.Entity_Field_id =Entity_Field.id
            LEFT JOIN Entity ON Entity_Field_Values.Entity_id = Entity.id
            where Entity.id LIKE :entityID
            GROUP BY Entity_Field.id;
            ";

            $sth = $this->app->db->prepare($query);
            $sth ->bindParam(':entityID', $entityID , PDO::PARAM_STR);
            $sth -> execute();
            return $sth->fetchAll();
    }
}
