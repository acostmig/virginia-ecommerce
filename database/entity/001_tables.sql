CREATE TABLE IF NOT EXISTS `lbweb`.`Entity_Type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(128) NOT NULL,
  PRIMARY KEY (`id`, `Name`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `Name_UNIQUE` (`Name` ASC)
  )
  DEFAULT CHARACTER SET = utf8;




CREATE TABLE IF NOT EXISTS `lbweb`.`Entity` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Entity_Type_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `Entity_Entity_Type`
    FOREIGN KEY (`EntityTypeId`)
    REFERENCES `lbweb`.`Entity_Type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
  )
  DEFAULT CHARACTER SET = utf8;


CREATE TABLE IF NOT EXISTS `lbweb`.`Entity_Fields` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(256) NOT NULL,
  `Key` VARCHAR(256) NOT NULL,
  `Entity_Type_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `Entity_Fields_Entity_Type`
    FOREIGN KEY (`EntityTypeId`)
    REFERENCES `lbweb`.`Entity_Type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
  )
  DEFAULT CHARACTER SET = utf8;

CREATE TABLE `lbweb`.`Entity_Field_Values` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Entity_id` INT UNSIGNED NOT NULL,
  `Entity_Field_id` INT UNSIGNED NOT NULL,
  `Value` LONGTEXT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `Entity_Field_Values_Entity_Field_idx` (`Entity_Field_id` ASC),
  INDEX `Entity_Field_Value_Entity_idx` (`Entity_id` ASC),
  CONSTRAINT `Entity_Field_Values_Entity_Field`
    FOREIGN KEY (`Entity_Field_id`)
    REFERENCES `lbweb`.`Entity_Field` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Entity_Field_Value_Entity`
    FOREIGN KEY (`Entity_id`)
    REFERENCES `lbweb`.`Entity` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
  )
  DEFAULT CHARACTER SET = utf8;

