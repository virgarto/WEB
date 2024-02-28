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
  `id` INT NOT NULL,
  `LoIExtDetras` INT NULL,
  `LoIExtDelante` INT NULL,
  `LoIIntDetras` INT NULL,
  `LoIIntDelante` INT NULL,
  PRIMARY KEY (`id`));


CREATE TABLE entrenamiento_danza (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_pat INT FOREIGN KEY,

)

