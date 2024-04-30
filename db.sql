/***************************************************************/
/* Insertamos en la tabla de categoria la información          */
/* necesaria para calcular la categoria de los patinadores     */
/*  segun su año de nacimiento                                 */
/***************************************************************/
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

/***************************************************************/
/* Creamos las tablas para cada elemento integrativo de        */
/* modalidad danza                                             */  
/***************************************************************/
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

/***************************************************************/
/* Creamos una tabla para los entrenamientos de modalidad tipo */
/* danza                                                       */
/***************************************************************/
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
  `id_tres_der` INT,
  `id_tres_izq` INT,
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
    ON UPDATE CASCADE,
  CONSTRAINT `id_tres_der`
    FOREIGN KEY (`id_tres_der`)
    REFERENCES `tfg`.`tres_derecho` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `id_tres_izq`
    FOREIGN KEY (`id_tres_izq`)
    REFERENCES `tfg`.`tres_izquierdo` (`id`)
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

CREATE TRIGGER agregar_id_tres_der
AFTER INSERT ON tres_derecho
FOR EACH ROW
  INSERT INTO entrenamiento_danza_temp (id_tres_der) VALUES (NEW.id);

CREATE TRIGGER agregar_id_tres_izq
AFTER INSERT ON tres_izquierdo
FOR EACH ROW
  INSERT INTO entrenamiento_danza_temp (id_tres_izq) VALUES (NEW.id);

/***************************************************************/
/* Creamos las tablas para cada elemento integrativo de        */
/* modalidad libre                                             */  
/***************************************************************/
CREATE TABLE `tfg`.`upright_izquierdo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `upright` INT NULL,
  `forward` INT NULL,
  `layback` INT NULL,
  `sideways` INT NULL,
  `split` INT NULL,
  `torso` INT NULL,
  `biellman` INT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `tfg`.`upright_derecho` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `upright` INT NULL,
  `forward` INT NULL,
  `layback` INT NULL,
  `sideways` INT NULL,
  `split` INT NULL,
  `torso` INT NULL,
  `biellman` INT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `tfg`.`sit_izquierdo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sit` INT NULL,
  `forward` INT NULL,
  `sideways` INT NULL,
  `behind` INT NULL,
  `twist` INT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `tfg`.`sit_derecho` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sit` INT NULL,
  `forward` INT NULL,
  `sideways` INT NULL,
  `behind` INT NULL,
  `twist` INT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `tfg`.`camel_izquierdo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `exterior` INT NULL,
  `interior` INT NULL,
  `layover` INT NULL,
  `forward` INT NULL,
  `sideways` INT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `tfg`.`camel_izquierdo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `exterior` INT NULL,
  `interior` INT NULL,
  `layover` INT NULL,
  `forward` INT NULL,
  `sideways` INT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `tfg`.`heel_izquierdo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `heel` INT NULL,
  `forward` INT NULL,
  `sideways` INT NULL,
  `layover` INT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `tfg`.`heel_derecho` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `heel` INT NULL,
  `forward` INT NULL,
  `sideways` INT NULL,
  `layover` INT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `tfg`.`posiciones_avanzadas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `inverted` INT NULL,
  `broken` INT NULL,
  `bryant` INT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `tfg`.`saltos_simples` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `waltz_jump` INT NULL,
  `salchow` INT NULL,
  `toeloop` INT NULL,
  `flip` INT NULL,
  `lutz` INT NULL,
  `loop_simple` INT NULL,
  `thoren` INT NULL,
  `axel` INT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `tfg`.`saltos_dobles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `salchow_2` INT NULL,
  `toeloop_2` INT NULL,
  `flip_2` INT NULL,
  `lutz_2` INT NULL,
  `loop_2` INT NULL,
  `thoren_2` INT NULL,
  `axel_2` INT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `tfg`.`saltos_triples` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `salchow_3` INT NULL,
  `toeloop_3` INT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `tfg`.`discos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `corto` INT NULL,
  `largo` INT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `tfg`.`flexibilidad` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `split` INT NULL,
  `arco` INT NULL,
  PRIMARY KEY (`id`));

/***************************************************************/
/* Creamos una tabla para los entrenamientos de modalidad tipo */
/* libre                                                       */
/***************************************************************/
CREATE TABLE `tfg`.`entrenamiento_libre` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_patinador` INT NOT NULL,
  `fecha` DATE NULL,
  `id_upright_izq` INT NULL,
  `id_upright_der` INT NULL,
  `id_sit_izq` INT NULL,
  `id_sit_der` INT NULL,
  `id_camel_izq` INT NULL,
  `id_camel_der` INT NULL,
  `id_heel_izq` INT NULL,
  `id_heel_der` INT NULL,
  `id_saltos_simples` INT NULL,
  `id_saltos_dobles` INT NULL,
  `id_saltos_triples` INT NULL,
  `id_pos_avanzadas` INT NULL,
  `id_discos` INT NULL,
  `id_flexibilidad` INT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `id_upright_izq`
    FOREIGN KEY (`id_upright_izq`)
    REFERENCES `tfg`.`upright_izquierdo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `id_upright_der`
    FOREIGN KEY (`id_upright_der`)
    REFERENCES `tfg`.`upright_derecho` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `id_sit_izq`
    FOREIGN KEY (`id_sit_izq`)
    REFERENCES `tfg`.`sit_izquierdo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `id_sit_der`
    FOREIGN KEY (`id_sit_der`)
    REFERENCES `tfg`.`sit_derecho` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `id_camel_izq`
    FOREIGN KEY (`id_camel_izq`)
    REFERENCES `tfg`.`camel_izquierdo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `id_camel_der`
    FOREIGN KEY (`id_camel_der`)
    REFERENCES `tfg`.`camel_derecho` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `id_heel_izq`
    FOREIGN KEY (`id_heel_izq`)
    REFERENCES `tfg`.`heel_izquierdo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `id_heel_der`
    FOREIGN KEY (`id_heel_der`)
    REFERENCES `tfg`.`heel_derecho` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `id_saltos_simples`
    FOREIGN KEY (`id_saltos_simples`)
    REFERENCES `tfg`.`saltos_simples` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `id_saltos_dobles`
    FOREIGN KEY (`id_saltos_dobles`)
    REFERENCES `tfg`.`saltos_dobles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `id_saltos_triples`
    FOREIGN KEY (`id_saltos_triples`)
    REFERENCES `tfg`.`saltos_triples` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `id_pos_avanzadas`
    FOREIGN KEY (`id_pos_avanzadas`)
    REFERENCES `tfg`.`posiciones_avanzadas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `id_discos`
    FOREIGN KEY (`id_discos`)
    REFERENCES `tfg`.`discos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `id_flexibilidad`
    FOREIGN KEY (`id_flexibilidad`)
    REFERENCES `tfg`.`flexibilidad` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE);

/***************************************************************/
/* Creamos una tabla intermedia para añadir los registros de   */
/* los fk en la tabla principal de entrenamiento_danza         */
/***************************************************************/
CREATE TABLE `tfg`.`entrenamiento_libre_temp`LIKE `tfg`.`entrenamiento_libre`;

/***************************************************************/
/* Creamos un nuevo trigger para que cada vez que se añada un  */
/* registro a la tabla de los elementos integrativos se añada  */
/* a la tabla de entrenamiento principal                       */
/***************************************************************/
CREATE TRIGGER agregar_id_upright_izq
AFTER INSERT ON upright_izquierdo
FOR EACH ROW
  INSERT INTO entrenamiento_libre_temp (id_upright_izq) VALUES (NEW.id);

CREATE TRIGGER agregar_id_upright_der
AFTER INSERT ON upright_derecho
FOR EACH ROW
  INSERT INTO entrenamiento_libre_temp (id_upright_der) VALUES (NEW.id);

CREATE TRIGGER agregar_id_sit_izq
AFTER INSERT ON sit_izquierdo
FOR EACH ROW
  INSERT INTO entrenamiento_libre_temp (id_sit_izq) VALUES (NEW.id);
  
CREATE TRIGGER agregar_id_sit_der
AFTER INSERT ON sit_derecho
FOR EACH ROW
  INSERT INTO entrenamiento_libre_temp (id_sit_der) VALUES (NEW.id);
  
CREATE TRIGGER agregar_id_camel_izq
AFTER INSERT ON camel_izquierdo
FOR EACH ROW
  INSERT INTO entrenamiento_libre_temp (id_camel_izq) VALUES (NEW.id);
  
CREATE TRIGGER agregar_id_camel_der
AFTER INSERT ON camel_derecho
FOR EACH ROW
  INSERT INTO entrenamiento_libre_temp (id_camel_der) VALUES (NEW.id);
  
CREATE TRIGGER agregar_id_heel_izq
AFTER INSERT ON heel_izquierdo
FOR EACH ROW
  INSERT INTO entrenamiento_libre_temp (id_heel_izq) VALUES (NEW.id);  
  
CREATE TRIGGER agregar_id_heel_der
AFTER INSERT ON heel_derecho
FOR EACH ROW
  INSERT INTO entrenamiento_libre_temp (id_heel_der) VALUES (NEW.id);
  
CREATE TRIGGER agregar_id_saltos_simples
AFTER INSERT ON saltos_simples
FOR EACH ROW
  INSERT INTO entrenamiento_libre_temp (id_saltos_simples) VALUES (NEW.id);
  
  
CREATE TRIGGER agregar_id_saltos_dobles
AFTER INSERT ON saltos_dobles
FOR EACH ROW
  INSERT INTO entrenamiento_libre_temp (id_saltos_dobles) VALUES (NEW.id);
  
   
CREATE TRIGGER agregar_id_saltos_triples
AFTER INSERT ON saltos_triples
FOR EACH ROW
  INSERT INTO entrenamiento_libre_temp (id_saltos_triples) VALUES (NEW.id); 
  
CREATE TRIGGER agregar_id_pos_avanzadas
AFTER INSERT ON posiciones_avanzadas
FOR EACH ROW
  INSERT INTO entrenamiento_libre_temp (id_pos_avanzadas) VALUES (NEW.id); 
  
CREATE TRIGGER agregar_id_discos
AFTER INSERT ON discos
FOR EACH ROW
  INSERT INTO entrenamiento_libre_temp (id_discos) VALUES (NEW.id);
  
  
CREATE TRIGGER agregar_id_flexibilidad
AFTER INSERT ON flexibilidad
FOR EACH ROW
  INSERT INTO entrenamiento_libre_temp (id_flexibilidad) VALUES (NEW.id);



/***************************************************************/
/* Creamos una tabla para guardar las valoraciones base        */
/* de cada salto                                               */
/***************************************************************/
CREATE TABLE `tfg`.`saltos_base` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `salto_nombre` VARCHAR(45) NULL,
  `rating_base` FLOAT NULL,
  PRIMARY KEY (`id`));


INSERT INTO saltos_base (salto_nombre, rating_base) VALUES ('waltz_jump', 0.4);
INSERT INTO saltos_base (salto_nombre, rating_base) VALUES ('salchow', 0.6);
INSERT INTO saltos_base (salto_nombre, rating_base) VALUES ('toeloop', 0.6);
INSERT INTO saltos_base (salto_nombre, rating_base) VALUES ('flip', 0.8);
INSERT INTO saltos_base (salto_nombre, rating_base) VALUES ('lutz', 0.9);
INSERT INTO saltos_base (salto_nombre, rating_base) VALUES ('loop_simple', 0.9);
INSERT INTO saltos_base (salto_nombre, rating_base) VALUES ('thoren', 0.9);
INSERT INTO saltos_base (salto_nombre, rating_base) VALUES ('axel', 1.3);
INSERT INTO saltos_base (salto_nombre, rating_base) VALUES ('salchow_2', 1.7);
INSERT INTO saltos_base (salto_nombre, rating_base) VALUES ('toeloop_2', 1.7);
INSERT INTO saltos_base (salto_nombre, rating_base) VALUES ('flip_2', 2);
INSERT INTO saltos_base (salto_nombre, rating_base) VALUES ('lutz_2', 2.2);
INSERT INTO saltos_base (salto_nombre, rating_base) VALUES ('loop_2', 2.2);
INSERT INTO saltos_base (salto_nombre, rating_base) VALUES ('thoren_2', 2.2);
INSERT INTO saltos_base (salto_nombre, rating_base) VALUES ('axel_2', 6.1);
INSERT INTO saltos_base (salto_nombre, rating_base) VALUES ('salchow_3', 7);
INSERT INTO saltos_base (salto_nombre, rating_base) VALUES ('toeloop_3', 11.8);

/***************************************************************/
/* Creamos una tabla para guardar las valoraciones base        */
/* de cada nivel de la secuencia de pasos                      */
/***************************************************************/
CREATE TABLE `tfg`.`fosq_base` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nivel` VARCHAR(45) NULL,
  `rating_base` FLOAT NULL,
  PRIMARY KEY (`id`));

INSERT INTO `tfg`.`fosq_base` (nivel, rating_base) VALUES ('level_base', 1.8);
INSERT INTO `tfg`.`fosq_base` (nivel, rating_base) VALUES ('level_1', 2.3);
INSERT INTO `tfg`.`fosq_base` (nivel, rating_base) VALUES ('level_2', 3.3);
INSERT INTO `tfg`.`fosq_base` (nivel, rating_base) VALUES ('level_3', 3.9);
INSERT INTO `tfg`.`fosq_base` (nivel, rating_base) VALUES ('level_4', 4.4);

/***************************************************************/
/* Creamos una tabla para guardar las valoraciones base        */
/* de cada pirueta                                             */
/***************************************************************/
CREATE TABLE `tfg`.`spin_base` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `spin` VARCHAR(45) NULL,
  `rating_base` FLOAT NULL,
  PRIMARY KEY (`id`));

INSERT INTO `tfg`.`spin_base` (spin, rating_base) VALUES ('upright_spin', 0.5);
INSERT INTO `tfg`.`spin_base` (spin, rating_base) VALUES ('sit_spin', 0.8);
INSERT INTO `tfg`.`spin_base` (spin, rating_base) VALUES ('camel_back_spin', 1.0);
INSERT INTO `tfg`.`spin_base` (spin, rating_base) VALUES ('camel_forw_spin', 1.2);
INSERT INTO `tfg`.`spin_base` (spin, rating_base) VALUES ('heel_back_spin', 2.0);
INSERT INTO `tfg`.`spin_base` (spin, rating_base) VALUES ('broken_spin', 1.8);
INSERT INTO `tfg`.`spin_base` (spin, rating_base) VALUES ('inverted_spin', 2.8);

INSERT INTO `tfg`.`spin_base` (spin, rating_base) VALUES ('upright_biellman', 2.9);
INSERT INTO `tfg`.`spin_base` (spin, rating_base) VALUES ('upright_biellman_heel', 3.7);
INSERT INTO `tfg`.`spin_base` (spin, rating_base) VALUES ('upright_split', 1.75);
INSERT INTO `tfg`.`spin_base` (spin, rating_base) VALUES ('upright_torso', 1.7);
INSERT INTO `tfg`.`spin_base` (spin, rating_base) VALUES ('upright_layback', 1.6);
INSERT INTO `tfg`.`spin_base` (spin, rating_base) VALUES ('upright_forward', 1.5);
INSERT INTO `tfg`.`spin_base` (spin, rating_base) VALUES ('upright_heel', 0.75);
