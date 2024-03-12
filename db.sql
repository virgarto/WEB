/* INSERTAMOS VALUES EN LA TABLA DE CATEGORIA */
INSERT INTO categoria (anyo, cat_2023, cat_2024, cat_2025) VALUES (2004, 'Senior', 'Senior', 'Senior');
INSERT INTO categoria (anyo, cat_2023, cat_2024, cat_2025) VALUES (2005, 'Junior', 'Senior', 'Senior');
INSERT INTO categoria (anyo, cat_2023, cat_2024, cat_2025) VALUES (2006, 'Junior', 'Junior', 'Senior');
INSERT INTO categoria (anyo, cat_2023, cat_2024, cat_2025) VALUES (2007, 'Juvenil', 'Junior', 'Junior');
INSERT INTO categoria (anyo, cat_2023, cat_2024, cat_2025) VALUES (2008, 'Cadete', 'Juvenil', 'Junior');
INSERT INTO categoria (anyo, cat_2023, cat_2024, cat_2025) VALUES (2009, 'Cadete', 'Cadete', 'Juvenil');
INSERT INTO categoria (anyo, cat_2023, cat_2024, cat_2025) VALUES (2010, 'Infantil', 'Cadete', 'Cadete');
INSERT INTO categoria (anyo, cat_2023, cat_2024, cat_2025) VALUES (2011, 'Infantil', 'Infantil', 'Cadete');
INSERT INTO categoria (anyo, cat_2023, cat_2024, cat_2025) VALUES (2012, 'Alevín', 'Infantil', 'Infantil');
INSERT INTO categoria (anyo, cat_2023, cat_2024, cat_2025) VALUES (2013, 'Alevín', 'Alevín', 'Infantil');
INSERT INTO categoria (anyo, cat_2023, cat_2024, cat_2025) VALUES (2014, 'Benjamin', 'Alevín', 'Alevín');
INSERT INTO categoria (anyo, cat_2023, cat_2024, cat_2025) VALUES (2015, 'Benjamin', 'Benjamin', 'Alevín');
INSERT INTO categoria (anyo, cat_2023, cat_2024, cat_2025) VALUES (2016, '', 'Benjamin', 'Benjamin');

CREATE TABLE `tfg`.`travelling` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `travellingB` INT NULL,
  `travelling1` INT NULL,
  `travelling2` INT NULL,
  `travelling3` INT NULL,
  `travelling4` INT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `tfg`.`cluster` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `clusterB` INT NULL,
  `cluster1` INT NULL,
  `cluster2` INT NULL,
  `cluster3` INT NULL,
  `cluster4` INT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `tfg`.`pattern_sequence` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `key_point1` INT NULL,
  `key_point2` INT NULL,
  `key_point3` INT NULL,
  `key_point4` INT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `tfg`.`art_foot_sequence` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ASqB` INT NULL,
  `ASq1` INT NULL,
  `ASq2` INT NULL,
  `ASq3` INT NULL,
  `ASq4` INT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `tfg`.`dance_step_sequence` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `DStepSqB` INT NULL,
  `DStepSq1` INT NULL,
  `DStepSq2` INT NULL,
  `DStepSq3` INT NULL,
  `DStepSq4` INT NULL,
  PRIMARY KEY (`id`));

  CREATE TABLE `tfg`.`footwork_sequence` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `FoSqB` INT NULL,
  `FoSq1` INT NULL,
  `FoSq2` INT NULL,
  `FoSq3` INT NULL,
  `FoSq4` INT NULL,
  PRIMARY KEY (`id`));

  CREATE TABLE `tfg`.`choreo_step_sequence` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ChStSq` INT NULL,
  PRIMARY KEY (`id`));

  CREATE TABLE `tfg`.`bracket_derecho` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `BrDExtDetras` INT NULL,
  `BrDExtDelante` INT NULL,
  `BrDIntDetras` INT NULL,
  `BrDIntDelante` INT NULL,
  PRIMARY KEY (`id`));

  CREATE TABLE `tfg`.`bracket_izquierdo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `BrIExtDetras` INT NULL,
  `BrIExtDelante` INT NULL,
  `BrIIntDetras` INT NULL,
  `BrIIntDelante` INT NULL,
  PRIMARY KEY (`id`));

  CREATE TABLE `tfg`.`counter_derecho` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `CoDExtDetras` INT NULL,
  `CoDExtDelante` INT NULL,
  `CoDIntDetras` INT NULL,
  `CoDIntDelante` INT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `tfg`.`counter_izquierdo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `CoIExtDetras` INT NULL,
  `CoIExtDelante` INT NULL,
  `CoIIntDetras` INT NULL,
  `CoIIntDelante` INT NULL,
  PRIMARY KEY (`id`));

  CREATE TABLE `tfg`.`rocker_derecho` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `RoDExtDetras` INT NULL,
  `RoDExtDelante` INT NULL,
  `RoDIntDetras` INT NULL,
  `RoDIntDelante` INT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `tfg`.`rocker_izq` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `RoIExtDetras` INT NULL,
  `RoIExtDelante` INT NULL,
  `RoIIntDetras` INT NULL,
  `RoIIntDelante` INT NULL,
  PRIMARY KEY (`id`));

  CREATE TABLE `tfg`.`loop_derecho` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `LoDExtDetras` INT NULL,
  `LoDExtDelante` INT NULL,
  `LoDIntDetras` INT NULL,
  `LoDIntDelante` INT NULL,
  PRIMARY KEY (`id`));

  CREATE TABLE `tfg`.`loop_izquierdo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `LoIExtDetras` INT NULL,
  `LoIExtDelante` INT NULL,
  `LoIIntDetras` INT NULL,
  `LoIIntDelante` INT NULL,
  PRIMARY KEY (`id`));


CREATE TABLE `tfg`.`entrenamiento_danza` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATE NOT NULL,
  `id_patinador` INT, 
  `id_art_foot_sq` INT,
  `id_bracket_der` INT,
  `id_bracket_izq` INT,
  `id_choreo_step_sq` INT,
  `id_cluster` INT,
  `id_counter_der` INT,
  `id_counter_izq` INT,
  `id_dance_step_sq` INT,
  `id_footwork_sq` INT,
  `id_loop_der` INT,
  `id_loop_izq` INT,
  `id_pattern_sq` INT,
  `id_rocker_der` INT,
  `id_rocker_izq` INT,
  `id_travelling` INT,
  PRIMARY KEY (`id`),
  CONSTRAINT `id_patinador`
    FOREIGN KEY (`id_patinador`)
    REFERENCES `tfg`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `id_art_foot_sq`
    FOREIGN KEY (`id_art_foot_sq`)
    REFERENCES `tfg`.`art_foot_sequence` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `id_bracket_der`
    FOREIGN KEY (`id_bracket_der`)
    REFERENCES `tfg`.`bracket_derecho` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `id_bracket_izq`
    FOREIGN KEY (`id_bracket_izq`)
    REFERENCES `tfg`.`bracket_izquierdo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `id_choreo_step_sq`
    FOREIGN KEY (`id_choreo_step_sq`)
    REFERENCES `tfg`.`choreo_step_sequence` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `id_cluster`
    FOREIGN KEY (`id_cluster`)
    REFERENCES `tfg`.`cluster` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `id_counter_der`
    FOREIGN KEY (`id_counter_der`)
    REFERENCES `tfg`.`counter_derecho` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `id_counter_izq`
    FOREIGN KEY (`id_counter_izq`)
    REFERENCES `tfg`.`counter_izquierdo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `id_dance_step_sq`
    FOREIGN KEY (`id_dance_step_sq`)
    REFERENCES `tfg`.`dance_step_sequence` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `id_footwork_sq`
    FOREIGN KEY (`id_footwork_sq`)
    REFERENCES `tfg`.`footwork_sequence` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `id_loop_der`
    FOREIGN KEY (`id_loop_der`)
    REFERENCES `tfg`.`loop_derecho` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `id_loop_izq`
    FOREIGN KEY (`id_loop_izq`)
    REFERENCES `tfg`.`loop_izquierdo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `id_pattern_sq`
    FOREIGN KEY (`id_pattern_sq`)
    REFERENCES `tfg`.`pattern_sequence` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `id_rocker_der`
    FOREIGN KEY (`id_rocker_der`)
    REFERENCES `tfg`.`rocker_derecho` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `id_rocker_izq`
    FOREIGN KEY (`id_rocker_izq`)
    REFERENCES `tfg`.`rocker_izq` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `id_travelling`
    FOREIGN KEY (`id_travelling`)
    REFERENCES `tfg`.`travelling` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE);

/***************************************************************/
/* Creamos una tabla intermedia para añadir los registros de   */
/* los fk en la tabla principal de entrenamiento_danza         */
/***************************************************************/
CREATE TABLE entrenamiento_danza_temp LIKE entrenamiento_danza;


/***************************************************************/
/* Creamos un nuevo trigger para que cada vez que se añada un  */
/* registro a la tabla de los elementos integrativos se añada  */
/* a la tabla de entrenamiento principal                       */
/***************************************************************/


CREATE TRIGGER agregar_id_travelling
AFTER INSERT ON travelling
FOR EACH ROW
  INSERT INTO entrenamiento_danza_temp (id_travelling) VALUES (NEW.id);

CREATE TRIGGER agregar_id_cluster
AFTER INSERT ON cluster
FOR EACH ROW
  INSERT INTO entrenamiento_danza_temp (id_cluster) VALUES (NEW.id);

CREATE TRIGGER agregar_id_art_foot_sq
AFTER INSERT ON art_foot_sequence
FOR EACH ROW
  INSERT INTO entrenamiento_danza_temp (id_art_foot_sq) VALUES (NEW.id);

CREATE TRIGGER agregar_id_bracket_derecho
AFTER INSERT ON bracket_derecho
FOR EACH ROW
  INSERT INTO entrenamiento_danza_temp (id_bracket_der) VALUES (NEW.id);

CREATE TRIGGER agregar_id_bracket_izquierdo
AFTER INSERT ON bracket_izquierdo
FOR EACH ROW
  INSERT INTO entrenamiento_danza_temp (id_bracket_izq) VALUES (NEW.id);

CREATE TRIGGER agregar_id_choreo_step
AFTER INSERT ON choreo_step_sequence
FOR EACH ROW
  INSERT INTO entrenamiento_danza_temp (id_choreo_step_sq) VALUES (NEW.id);

CREATE TRIGGER agregar_id_counter_derecho
AFTER INSERT ON counter_derecho
FOR EACH ROW
  INSERT INTO entrenamiento_danza_temp (id_counter_der) VALUES (NEW.id);

CREATE TRIGGER agregar_id_counter_izquierdo
AFTER INSERT ON counter_izquierdo
FOR EACH ROW
  INSERT INTO entrenamiento_danza_temp (id_counter_izq) VALUES (NEW.id);

CREATE TRIGGER agregar_id_dance_step
AFTER INSERT ON dance_step_sequence
FOR EACH ROW
  INSERT INTO entrenamiento_danza_temp (id_dance_step_sq) VALUES (NEW.id);

CREATE TRIGGER agregar_id_footwork_sq
AFTER INSERT ON footwork_sequence
FOR EACH ROW
  INSERT INTO entrenamiento_danza_temp (id_footwork_sq) VALUES (NEW.id);

CREATE TRIGGER agregar_id_loop_derecho
AFTER INSERT ON loop_derecho
FOR EACH ROW
  INSERT INTO entrenamiento_danza_temp (id_loop_der) VALUES (NEW.id);

CREATE TRIGGER agregar_id_loop_izquierdo
AFTER INSERT ON loop_izquierdo
FOR EACH ROW
  INSERT INTO entrenamiento_danza_temp (id_loop_izq) VALUES (NEW.id);

CREATE TRIGGER agregar_id_pattern_sequence
AFTER INSERT ON pattern_sequence
FOR EACH ROW
  INSERT INTO entrenamiento_danza_temp (id_pattern_sq) VALUES (NEW.id);

CREATE TRIGGER agregar_id_rocker_derecho
AFTER INSERT ON rocker_derecho
FOR EACH ROW
  INSERT INTO entrenamiento_danza_temp (id_rocker_der) VALUES (NEW.id);

CREATE TRIGGER agregar_id_rocker_izquierdo
AFTER INSERT ON rocker_izq
FOR EACH ROW
  INSERT INTO entrenamiento_danza_temp (id_rocker_izq) VALUES (NEW.id);

ALTER TABLE travelling AUTO_INCREMENT = 1;